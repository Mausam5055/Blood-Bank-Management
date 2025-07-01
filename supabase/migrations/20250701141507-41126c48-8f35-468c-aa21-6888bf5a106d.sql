
-- Create a table for user-submitted events
CREATE TABLE public.user_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  address TEXT,
  organizer TEXT NOT NULL,
  expected_donors INTEGER DEFAULT 50,
  contact_email TEXT,
  contact_phone TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.user_events ENABLE ROW LEVEL SECURITY;

-- Create policies for user_events
CREATE POLICY "Users can view all user events" 
  ON public.user_events 
  FOR SELECT 
  USING (true);

CREATE POLICY "Users can create their own events" 
  ON public.user_events 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own events" 
  ON public.user_events 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own events" 
  ON public.user_events 
  FOR DELETE 
  USING (auth.uid() = user_id);
