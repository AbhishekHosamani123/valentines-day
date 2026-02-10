
-- Create a secure function to mark a valentine as paid
-- This bypasses RLS policies because it is SECURITY DEFINER
create or replace function mark_as_paid(v_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  update valentines
  set payment_status = 'paid'
  where id = v_id;
end;
$$;
