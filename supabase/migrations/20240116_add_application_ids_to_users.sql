-- Add application_ids column to public.users table to store application IDs
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS application_ids UUID[] DEFAULT '{}';

-- Create a function to add application ID when a new application is created
CREATE OR REPLACE FUNCTION public.handle_new_application()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.users
  SET application_ids = array_append(application_ids, NEW.id)
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to call the function when a new application is added
DROP TRIGGER IF EXISTS on_application_created ON public.applications;
CREATE TRIGGER on_application_created
  AFTER INSERT ON public.applications
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_application();

-- Create a function to remove application ID when an application is deleted
CREATE OR REPLACE FUNCTION public.handle_application_delete()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.users
  SET application_ids = array_remove(application_ids, OLD.id)
  WHERE id = OLD.user_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to call the function when an application is deleted
DROP TRIGGER IF EXISTS on_application_deleted ON public.applications;
CREATE TRIGGER on_application_deleted
  AFTER DELETE ON public.applications
  FOR EACH ROW EXECUTE FUNCTION public.handle_application_delete();
