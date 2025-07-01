
-- Create donors table
CREATE TABLE public.donors (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  full_name text NOT NULL,
  blood_group text NOT NULL,
  age integer NOT NULL,
  phone_number text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  availability boolean DEFAULT true,
  pdf_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create requests table
CREATE TABLE public.requests (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  blood_group_needed text NOT NULL,
  location text NOT NULL,
  contact_details text NOT NULL,
  message text,
  status text DEFAULT 'active',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.requests ENABLE ROW LEVEL SECURITY;

-- RLS policies for donors table (publicly viewable, users can insert their own)
CREATE POLICY "Anyone can view donors" 
  ON public.donors 
  FOR SELECT 
  TO public
  USING (true);

CREATE POLICY "Users can insert their own donor record" 
  ON public.donors 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own donor record" 
  ON public.donors 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own donor record" 
  ON public.donors 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- RLS policies for requests table (publicly viewable, users can manage their own)
CREATE POLICY "Anyone can view requests" 
  ON public.requests 
  FOR SELECT 
  TO public
  USING (true);

CREATE POLICY "Users can insert their own requests" 
  ON public.requests 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own requests" 
  ON public.requests 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own requests" 
  ON public.requests 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create storage bucket for donor PDFs
INSERT INTO storage.buckets (id, name, public)
VALUES ('donor-pdfs', 'donor-pdfs', true);

-- Storage policies for donor PDFs
CREATE POLICY "Anyone can view donor PDFs" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'donor-pdfs');

CREATE POLICY "Authenticated users can upload donor PDFs" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (bucket_id = 'donor-pdfs' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own donor PDFs" 
  ON storage.objects 
  FOR UPDATE 
  USING (bucket_id = 'donor-pdfs' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own donor PDFs" 
  ON storage.objects 
  FOR DELETE 
  USING (bucket_id = 'donor-pdfs' AND auth.uid()::text = (storage.foldername(name))[1]);
