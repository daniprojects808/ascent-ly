ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS is_archived BOOLEAN DEFAULT false;
