
-- Restrict SECURITY DEFINER function execution to internal use only
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO service_role;

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- Tighten leads insert policy: require a non-empty contact field
DROP POLICY IF EXISTS "leads_insert_anyone" ON public.leads;
CREATE POLICY "leads_insert_validated" ON public.leads
  FOR INSERT TO anon, authenticated
  WITH CHECK (contact IS NOT NULL AND length(trim(contact)) BETWEEN 3 AND 200);
