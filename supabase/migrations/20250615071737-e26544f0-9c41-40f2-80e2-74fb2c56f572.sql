
-- First, let's check and fix the RLS policies for donors table
DROP POLICY IF EXISTS "Users can insert their own donor records" ON public.donors;
DROP POLICY IF EXISTS "Anyone can view donors" ON public.donors;

-- Create policies that allow insertion and viewing
CREATE POLICY "Enable insert for authenticated users only" ON public.donors
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable read access for all users" ON public.donors
FOR SELECT TO public
USING (true);

-- Fix the RLS policies for requests table
DROP POLICY IF EXISTS "Users can insert their own requests" ON public.requests;
DROP POLICY IF EXISTS "Anyone can view requests" ON public.requests;

-- Create policies that allow insertion and viewing
CREATE POLICY "Enable insert for authenticated users only" ON public.requests
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable read access for all users" ON public.requests
FOR SELECT TO public
USING (true);

-- Also create a storage bucket for donor PDFs if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('donor-pdfs', 'donor-pdfs', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for the donor-pdfs bucket
INSERT INTO storage.objects (bucket_id, name, owner, metadata) 
SELECT 'donor-pdfs', '', auth.uid(), '{}'::jsonb 
WHERE FALSE; -- This is just to create the structure

-- Policy to allow authenticated users to upload files
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Allow authenticated uploads to donor-pdfs'
    ) THEN
        EXECUTE 'CREATE POLICY "Allow authenticated uploads to donor-pdfs" ON storage.objects
        FOR INSERT TO authenticated
        WITH CHECK (bucket_id = ''donor-pdfs'')';
    END IF;
END $$;

-- Policy to allow public access to view files
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Allow public access to donor-pdfs'
    ) THEN
        EXECUTE 'CREATE POLICY "Allow public access to donor-pdfs" ON storage.objects
        FOR SELECT TO public
        USING (bucket_id = ''donor-pdfs'')';
    END IF;
END $$;
