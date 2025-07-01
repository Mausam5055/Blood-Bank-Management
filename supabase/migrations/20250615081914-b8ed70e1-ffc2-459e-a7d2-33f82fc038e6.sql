
-- Add more fields to the donors table
ALTER TABLE public.donors 
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS last_donation_date DATE,
ADD COLUMN IF NOT EXISTS medical_conditions TEXT,
ADD COLUMN IF NOT EXISTS emergency_contact TEXT,
ADD COLUMN IF NOT EXISTS weight DECIMAL(5,2),
ADD COLUMN IF NOT EXISTS height DECIMAL(5,2);

-- Add more fields to the requests table
ALTER TABLE public.requests 
ADD COLUMN IF NOT EXISTS patient_age INTEGER,
ADD COLUMN IF NOT EXISTS hospital_name TEXT,
ADD COLUMN IF NOT EXISTS doctor_name TEXT,
ADD COLUMN IF NOT EXISTS urgency_level TEXT DEFAULT 'normal',
ADD COLUMN IF NOT EXISTS units_needed INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS required_by_date DATE,
ADD COLUMN IF NOT EXISTS medical_condition TEXT,
ADD COLUMN IF NOT EXISTS relation_to_patient TEXT;

-- Update donors table to ensure proper data types
ALTER TABLE public.donors 
ALTER COLUMN phone_number TYPE TEXT,
ALTER COLUMN email TYPE TEXT;

-- Update requests table to ensure proper data types
ALTER TABLE public.requests 
ALTER COLUMN contact_details TYPE TEXT;
