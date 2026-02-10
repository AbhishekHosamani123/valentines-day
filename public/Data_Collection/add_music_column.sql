-- Add music_url column to valentines table
ALTER TABLE valentines 
ADD COLUMN music_url text;

-- (Optional) Update existing rows to have default music if needed, 
-- but NULL is fine (we will handle it in frontend code to fallback to default)
