-- Lock down user_roles writes: only admins (or service role which bypasses RLS) can INSERT/UPDATE/DELETE.
-- The existing permissive ALL policy 'user_roles_admin_all' lets admins through; this RESTRICTIVE
-- policy ensures that authenticated non-admins cannot self-assign roles.
CREATE POLICY "user_roles_write_admin_only"
ON public.user_roles
AS RESTRICTIVE
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

-- Lock down orders writes: prevent authenticated users from inserting/updating/deleting orders
-- with arbitrary user_id. Orders are created server-side via the Stripe webhook using service_role
-- (which bypasses RLS). Admins retain full access via existing 'orders_admin_all' policy.
CREATE POLICY "orders_write_admin_only"
ON public.orders
AS RESTRICTIVE
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));
