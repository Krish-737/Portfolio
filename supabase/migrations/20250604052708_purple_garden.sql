/*
  # Add Messages Table

  1. New Tables
    - `messages` table for contact form submissions
      - id (uuid, primary key)
      - name (text)
      - email (text)
      - subject (text)
      - message (text)
      - created_at (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for public insert and admin read access
*/

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public to insert messages"
  ON messages
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read messages"
  ON messages
  FOR SELECT
  TO authenticated
  USING (true);