-- Create emails table with the required schema
CREATE TABLE IF NOT EXISTS public.emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  sent_date TIMESTAMP WITH TIME ZONE NOT NULL,
  replies TEXT DEFAULT '', -- Pipe-separated replies
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('urgent', 'high', 'medium', 'low')),
  sentiment TEXT DEFAULT 'neutral' CHECK (sentiment IN ('positive', 'negative', 'neutral')),
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'archived')),
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_emails_sender ON public.emails(sender);
CREATE INDEX IF NOT EXISTS idx_emails_sent_date ON public.emails(sent_date DESC);
CREATE INDEX IF NOT EXISTS idx_emails_status ON public.emails(status);
CREATE INDEX IF NOT EXISTS idx_emails_priority ON public.emails(priority);
CREATE INDEX IF NOT EXISTS idx_emails_sentiment ON public.emails(sentiment);

-- Enable RLS (Row Level Security)
ALTER TABLE public.emails ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is an email dashboard, we'll allow read access)
-- In production, you might want to add user authentication and restrict access
CREATE POLICY "Allow public read access to emails" ON public.emails FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to emails" ON public.emails FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access to emails" ON public.emails FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access to emails" ON public.emails FOR DELETE USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_emails_updated_at BEFORE UPDATE ON public.emails
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
