import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

/** @returns {Record<string, string>} */
export function loadSecrets() {
  const env = { ...process.env };
  const file = resolve(root, 'secrets.local.md');
  if (!existsSync(file)) return env;

  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (value && env[key] === undefined) env[key] = value;
  }
  return env;
}

export function requireSecret(env, key) {
  const value = env[key]?.trim();
  if (!value) {
    throw new Error(`Missing ${key}. Set in secrets.local.md or environment.`);
  }
  return value;
}

export { root };
