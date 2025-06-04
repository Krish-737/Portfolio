/*
  # Add CV URL to About Table

  1. Changes
    - Add cv_url column to about table
    - Default to null for existing records
    - Not required field

  2. Security
    - Maintains existing RLS policies
*/

ALTER TABLE about
ADD COLUMN IF NOT EXISTS cv_url text;