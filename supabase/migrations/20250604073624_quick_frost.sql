/*
  # Add Tech News Table

  1. New Tables
    - `tech_news` table for storing latest tech news
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - url (text)
      - publishedat (timestamptz)
      - source (text)
      - imageurl (text)

  2. Security
    - Enable RLS
    - Add policies for public read access and authenticated user management
*/

-- Create tech_news table if it doesn't exist
CREATE TABLE IF NOT EXISTS tech_news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  url text NOT NULL,
  publishedat timestamptz NOT NULL DEFAULT now(),
  source text NOT NULL,
  imageurl text NOT NULL
);

-- Enable RLS if not already enabled
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'tech_news' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE tech_news ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Create policies if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'tech_news' 
    AND policyname = 'Allow public read access'
  ) THEN
    CREATE POLICY "Allow public read access" ON tech_news
      FOR SELECT USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'tech_news' 
    AND policyname = 'Allow authenticated users full access'
  ) THEN
    CREATE POLICY "Allow authenticated users full access" ON tech_news
      FOR ALL TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;