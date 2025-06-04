/*
  # Add Tech News Table

  1. New Tables
    - `tech_news` table for displaying latest tech news
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - url (text)
      - publishedAt (timestamptz)
      - source (text)
      - imageUrl (text)

  2. Security
    - Enable RLS
    - Add policies for public read access and admin management
*/

CREATE TABLE IF NOT EXISTS tech_news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  url text NOT NULL,
  publishedAt timestamptz NOT NULL DEFAULT now(),
  source text NOT NULL,
  imageUrl text NOT NULL
);

-- Enable RLS
ALTER TABLE tech_news ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access" ON tech_news
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users full access" ON tech_news
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);