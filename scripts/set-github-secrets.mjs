#!/usr/bin/env node
/**
 * One-off helper — set GitHub Actions secrets via API.
 * Usage: GITHUB_PAT=ghp_... node scripts/set-github-secrets.mjs
 */
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const sodium = require('libsodium-wrappers');

const REPO = 'farukzahra/astro';
const PAT = process.env.GITHUB_PAT;
if (!PAT) {
  console.error('Set GITHUB_PAT');
  process.exit(1);
}

const headers = {
  Authorization: `token ${PAT}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
};

async function gh(path, options = {}) {
  const res = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: { ...headers, ...options.headers },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${options.method || 'GET'} ${path} → ${res.status}: ${text}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

async function setSecret(name, value) {
  await sodium.ready;
  const { key, key_id } = await gh(`/repos/${REPO}/actions/secrets/public-key`);
  const messageBytes = sodium.from_string(value);
  const keyBytes = sodium.from_base64(key, sodium.base64_variants.ORIGINAL);
  const encryptedBytes = sodium.crypto_box_seal(messageBytes, keyBytes);
  const encrypted_value = sodium.to_base64(encryptedBytes, sodium.base64_variants.ORIGINAL);

  await gh(`/repos/${REPO}/actions/secrets/${name}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ encrypted_value, key_id }),
  });
  console.log(`OK ${name}`);
}

async function setVariable(name, value) {
  await gh(`/repos/${REPO}/actions/variables/${name}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ value }),
  }).catch(async () => {
    await gh(`/repos/${REPO}/actions/variables`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, value }),
    });
  });
  console.log(`OK var ${name}`);
}

const deployKey = readFileSync('C:/repo/financeiro/planos/vps-secrets/deploy_key', 'utf8');

await setSecret('VPS_HOST', '66.23.231.218');
await setSecret('VPS_USER', 'root');
await setSecret('VPS_PORT', '22');
await setSecret('DEPLOY_PATH', '/opt/tech-blog');
await setSecret('VPS_SSH_KEY', deployKey);
await setVariable('WEB_PORT', '8085');

console.log('Secrets configured.');
