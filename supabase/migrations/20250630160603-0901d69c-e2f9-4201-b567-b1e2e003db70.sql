
-- Create a table for event registrations
CREATE TABLE public.event_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  event_id INTEGER NOT NULL,
  event_title TEXT NOT NULL,
  event_date TEXT NOT NULL,
  event_location TEXT NOT NULL,
  event_organizer TEXT NOT NULL,
  registration_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'registered',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to ensure users can only see their own registrations
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to SELECT their own registrations
CREATE POLICY "Users can view their own event registrations" 
  ON public.event_registrations 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to INSERT their own registrations
CREATE POLICY "Users can create their own event registrations" 
  ON public.event_registrations 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to UPDATE their own registrations
CREATE POLICY "Users can update their own event registrations" 
  ON public.event_registrations 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy that allows users to DELETE their own registrations
CREATE POLICY "Users can delete their own event registrations" 
  ON public.event_registrations 
  FOR DELETE 
  USING (auth.uid() = user_id);
