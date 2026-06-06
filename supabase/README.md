Supabase setup and migrations
=============================

This folder contains SQL migrations to create the minimal schema needed for RSVP and Wishes persistence.

Files:
- `0001_extensions.sql` — enables `pgcrypto` for `gen_random_uuid()`.
- `0002_rsvps.sql` — creates the `rsvps` table.
- `0003_wishes.sql` — creates the `wishes` table.

Quick setup (Supabase project)
------------------------------
1. Create a Supabase project at https://app.supabase.com.
2. In the project, open the SQL Editor and run each file in order, or use the Supabase CLI to apply migrations.

Using Supabase CLI (recommended for CI):

Install CLI: https://supabase.com/docs/guides/cli

From this repo root:

```bash
supabase login
supabase link --project-ref <your-project-ref>
supabase db push --file supabase/migrations
```

Alternatively, run files manually in SQL editor.

Environment variables for deployment (Netlify)
--------------------------------------------
- `SUPABASE_URL` — your Supabase project URL (found in Project Settings).
- `SUPABASE_SERVICE_ROLE_KEY` — the Service Role key (sensitive). Set this as a Netlify environment variable (not exposed to client). Use this key only on server-side code.

Server-side usage
-----------------
The app already includes `lib/supabase.ts` that reads `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. Ensure these env vars are configured in Netlify (or your hosting provider) for API routes to use Supabase.

Notes
-----
- The service role key allows insert/select operations from server environments. Do NOT expose it to client-side code.
- After running migrations, you can inspect tables in Supabase Table Editor.
