#!/usr/bin/env node
/**
 * One-time LinkedIn OAuth — opens browser, saves refresh token + person URN to secrets.local.md
 *
 * Prerequisites:
 * 1. App has BOTH products:
 *    - "Sign In with LinkedIn using OpenID Connect"
 *    - "Share on LinkedIn"
 * 2. Auth tab → Redirect URL: http://localhost:8787/callback
 *
 * Usage: npm run linkedin:auth
 */
import { createServer } from 'node:http';
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { resolve } from 'node:path';
import { loadSecrets, requireSecret, root } from './lib/secrets.mjs';

const SCOPES = ['openid', 'profile', 'email', 'w_member_social'];
const secretsFile = resolve(root, 'secrets.local.md');

const SCOPE_HELP = `
unauthorized_scope_error — your app is missing a LinkedIn Product.

In https://www.linkedin.com/developers/apps → your app → Products, enable BOTH:

  1. "Sign In with LinkedIn using OpenID Connect"  → openid, profile, email
  2. "Share on LinkedIn"                           → w_member_social

Wait until both show as Added (not Pending), then run: npm run linkedin:auth
`.trim();

function openBrowser(url) {
  try {
    if (process.platform === 'win32') {
      execSync(`start "" "${url}"`, { shell: 'cmd.exe', stdio: 'ignore' });
    } else if (process.platform === 'darwin') {
      execSync(`open "${url}"`, { stdio: 'ignore' });
    } else {
      execSync(`xdg-open "${url}"`, { stdio: 'ignore' });
    }
  } catch {
    console.log('Open this URL in your browser:\n', url);
  }
}

async function exchangeCode(env, code) {
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: requireSecret(env, 'LINKEDIN_REDIRECT_URI'),
    client_id: requireSecret(env, 'LINKEDIN_CLIENT_ID'),
    client_secret: requireSecret(env, 'LINKEDIN_CLIENT_SECRET'),
  });

  const res = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  if (!res.ok) {
    throw new Error(`Token exchange failed (${res.status}): ${await res.text()}`);
  }
  return res.json();
}

async function fetchPersonUrn(accessToken) {
  const res = await fetch('https://api.linkedin.com/v2/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) {
    throw new Error(`userinfo failed (${res.status}): ${await res.text()}`);
  }
  const data = await res.json();
  if (!data.sub) throw new Error('userinfo missing sub claim');
  return `urn:li:person:${data.sub}`;
}

function upsertSecrets(tokens, personUrn) {
  let content = readFileSync(secretsFile, 'utf8');
  const refresh = tokens.refresh_token ?? '';
  const access = tokens.access_token ?? '';
  content = content.replace(
    /^LINKEDIN_REFRESH_TOKEN=.*$/m,
    `LINKEDIN_REFRESH_TOKEN=${refresh}`,
  );
  content = content.replace(/^LINKEDIN_ACCESS_TOKEN=.*$/m, `LINKEDIN_ACCESS_TOKEN=${access}`);
  if (!content.includes('LINKEDIN_ACCESS_TOKEN=')) {
    content = content.replace(
      /^LINKEDIN_REFRESH_TOKEN=.*$/m,
      `LINKEDIN_REFRESH_TOKEN=${refresh}\nLINKEDIN_ACCESS_TOKEN=${access}`,
    );
  }
  content = content.replace(/^LINKEDIN_PERSON_URN=.*$/m, `LINKEDIN_PERSON_URN=${personUrn}`);
  writeFileSync(secretsFile, content, 'utf8');
}

const env = loadSecrets();
const clientId = requireSecret(env, 'LINKEDIN_CLIENT_ID');
const clientSecret = requireSecret(env, 'LINKEDIN_CLIENT_SECRET');
const redirectUri = requireSecret(env, 'LINKEDIN_REDIRECT_URI');

const authUrl = new URL('https://www.linkedin.com/oauth/v2/authorization');
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('client_id', clientId);
authUrl.searchParams.set('redirect_uri', redirectUri);
authUrl.searchParams.set('scope', SCOPES.join(' '));
authUrl.searchParams.set('state', crypto.randomUUID());
authUrl.searchParams.set('prompt', 'consent');

console.log('LinkedIn OAuth — waiting for callback on', redirectUri);
console.log('Required Products: OpenID Connect + Share on LinkedIn');
console.log('Scopes:', SCOPES.join(', '));
console.log('Ensure redirect URL is listed in Auth settings.\n');

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', `http://localhost:8787`);
  if (url.pathname !== '/callback') {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  const error = url.searchParams.get('error');
  const errorDesc = url.searchParams.get('error_description') ?? '';
  if (error) {
    console.error(`LinkedIn error: ${error}${errorDesc ? ` — ${errorDesc}` : ''}`);
    if (error === 'unauthorized_scope_error') {
      console.error('\n' + SCOPE_HELP);
    }
    res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(
      `<h1>LinkedIn error: ${error}</h1><p>${errorDesc}</p>` +
        (error === 'unauthorized_scope_error'
          ? `<pre>${SCOPE_HELP.replace(/</g, '&lt;')}</pre>`
          : ''),
    );
    server.close();
    process.exit(1);
    return;
  }

  const code = url.searchParams.get('code');
  if (!code) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Missing code');
    return;
  }

  try {
    const tokens = await exchangeCode(env, code);
    const personUrn = await fetchPersonUrn(tokens.access_token);
    upsertSecrets(tokens, personUrn);

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(
      '<h1>LinkedIn connected</h1><p>You can close this tab and return to the terminal.</p>',
    );

    console.log('\nSuccess!');
    console.log('Person URN:', personUrn);
    console.log('Refresh token saved to secrets.local.md');
    console.log('\nNext: npm run linkedin:post -- --slug <article-id>');
    server.close();
    process.exit(0);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(String(err));
    console.error(err);
    server.close();
    process.exit(1);
  }
});

server.listen(8787, () => {
  openBrowser(authUrl.toString());
});

setTimeout(() => {
  console.error('Timeout — no callback received in 5 minutes.');
  server.close();
  process.exit(1);
}, 5 * 60 * 1000);
