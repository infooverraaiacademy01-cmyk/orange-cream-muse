-- Reset admin password to Drdeji24$. and ensure admin role
UPDATE auth.users 
SET encrypted_password = crypt('Drdeji24$.', gen_salt('bf')),
    email_confirmed_at = COALESCE(email_confirmed_at, now()),
    updated_at = now()
WHERE email = 'info@bpanacea.co.uk';

INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role FROM auth.users WHERE email = 'info@bpanacea.co.uk'
ON CONFLICT DO NOTHING;