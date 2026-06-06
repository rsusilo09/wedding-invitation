#!/usr/bin/env node
// Optional helper to run SQL migration files against a Postgres connection.
// Usage: SUPABASE_DB_URL="postgres://user:pass@host:port/db" node scripts/run_migrations.js

const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

const MIGRATIONS_DIR = path.join(__dirname, '..', 'supabase', 'migrations');

async function main() {
  const dbUrl = process.env.SUPABASE_DB_URL;
  if (!dbUrl) {
    console.error('Please set SUPABASE_DB_URL environment variable (Postgres connection string).');
    process.exit(1);
  }

  const files = fs.readdirSync(MIGRATIONS_DIR).filter((f) => f.endsWith('.sql')).sort();
  const client = new Client({ connectionString: dbUrl });
  await client.connect();

  try {
    for (const file of files) {
      const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), 'utf8');
      console.log('Running', file);
      await client.query(sql);
    }
    console.log('Migrations applied.');
  } catch (err) {
    console.error('Migration failed:', err.message);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

main();
