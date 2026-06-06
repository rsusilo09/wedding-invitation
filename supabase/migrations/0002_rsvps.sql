-- Create married schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS married;

-- Create rsvps table in married schema
CREATE TABLE IF NOT EXISTS married.rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  status text NOT NULL CHECK (status IN ('attending', 'not_attending')),
  person integer NOT NULL DEFAULT 1,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_married_rsvps_created_at ON married.rsvps (created_at DESC);
