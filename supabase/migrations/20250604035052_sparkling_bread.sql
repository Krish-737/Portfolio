/*
  # Initial Schema Setup

  1. New Tables
    - `projects` table for portfolio projects
      - id (uuid, primary key)
      - title (text)
      - description (text) 
      - image (text) - URL to project image
      - tags (text[]) - Array of technology tags
      - github (text) - GitHub repository URL
      - live_url (text) - Live demo URL
      - created_at (timestamptz)
      - updated_at (timestamptz)

    - `about` table for personal information
      - id (uuid, primary key)
      - name (text)
      - email (text)
      - location (text)
      - bio (text)
      - experience (text)
      - profile_image (text)
      - created_at (timestamptz)
      - updated_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage content
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image text NOT NULL,
  tags text[] NOT NULL DEFAULT '{}',
  github text,
  live_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create about table
CREATE TABLE IF NOT EXISTS about (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  location text NOT NULL,
  bio text NOT NULL,
  experience text NOT NULL,
  profile_image text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE about ENABLE ROW LEVEL SECURITY;

-- Create policies for projects
CREATE POLICY "Allow public read access" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users full access" ON projects
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for about
CREATE POLICY "Allow public read access" ON about
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users full access" ON about
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_about_updated_at
  BEFORE UPDATE ON about
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();