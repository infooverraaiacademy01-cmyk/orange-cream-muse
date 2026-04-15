
CREATE TABLE public.feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  learner_name TEXT,
  learner_year_group TEXT,
  subjects TEXT,
  learning_goals TEXT,
  session_preference TEXT,
  additional_info TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit feedback"
ON public.feedback
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Anyone can read feedback"
ON public.feedback
FOR SELECT
TO anon, authenticated
USING (true);
