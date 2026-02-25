-- Add is_favorited column to applications table
ALTER TABLE public.applications
ADD COLUMN IF NOT EXISTS is_favorited BOOLEAN DEFAULT false;

-- Create index for faster filtering by favorites
CREATE INDEX IF NOT EXISTS applications_is_favorited_idx ON public.applications(is_favorited);
