-- Create wishes table in married schema
CREATE TABLE IF NOT EXISTS married.wishes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name text NOT NULL,
  message text NOT NULL,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_married_wishes_created_at ON married.wishes (created_at DESC);
