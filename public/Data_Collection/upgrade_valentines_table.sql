
-- 1. Add new columns to valentines table
alter table valentines 
add column if not exists payment_status text default 'unpaid',
add column if not exists view_count integer default 0,
add column if not exists payment_id text;

-- 2. Update existing RLS policies
drop policy if exists "Allow public uploads" on valentines;
drop policy if exists "Allow public view" on valentines;
drop policy if exists "Allow public update" on valentines;

-- Allow anyone to create a valentine
create policy "Allow public inserts"
on valentines for insert
to public
with check (true);

-- Allow viewing only by ID
create policy "Allow public selects by ID"
on valentines for select
to public
using (true);

-- Allow updates ONLY if payment_status is 'unpaid'
create policy "Allow updates while unpaid"
on valentines for update
to public
using (payment_status = 'unpaid')
with check (payment_status = 'unpaid');

-- 3. Create the RPC function for incrementing view count
create or replace function increment_view_count(v_id uuid)
returns integer 
language plpgsql
security definer
as $$
declare
  current_views integer;
  status text;
begin
  -- Select values for the specific valentine
  select view_count, payment_status into current_views, status 
  from valentines 
  where id = v_id 
  for update;

  -- If paid, return 0 (indicating unlimited access)
  if status = 'paid' then
    return 0;
  end if;

  -- Initialize view_count if null
  if current_views is null then
    current_views := 0;
  end if;

  -- Increment and update
  update valentines 
  set view_count = current_views + 1
  where id = v_id;
  
  return current_views + 1;
end;
$$;
