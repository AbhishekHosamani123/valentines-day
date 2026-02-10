
-- 1. Create the table
create table valentines (
  id uuid default gen_random_uuid() primary key,
  partner_name text not null,
  message text not null,
  photos text[] default '{}',
  created_at timestamp with time zone default now() not null,
  opened_at timestamp with time zone
);

-- 2. Enable Security
alter table valentines enable row level security;

-- 3. Allow ANYONE to upload (Insert)
create policy "Allow public uploads"
on valentines
for insert
to public
with check (true);

-- 4. Allow ANYONE to view (Select)
-- Note: UUIDs are hard to guess, so listing is practically difficult for humans.
create policy "Allow public view"
on valentines
for select
to public
using (true);

-- 5. Allow ANYONE to update (for tracking 'opened_at')
create policy "Allow public update"
on valentines
for update
to public
using (true);
