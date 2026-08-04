-- Run this in Supabase SQL Editor to create the contacts table:
-- Go to: SQL Editor > New Query > Paste this > Run

CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  inquiry_type TEXT NOT NULL DEFAULT 'general',
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for contact form)
CREATE POLICY "Allow anonymous inserts" ON contacts
  FOR INSERT WITH CHECK (true);

-- Allow authenticated reads (for you to view submissions)
CREATE POLICY "Allow authenticated reads" ON contacts
  FOR SELECT USING (true);

-- Create index for faster queries
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX idx_contacts_status ON contacts(status);
