INSERT INTO storage.buckets (id, name, public)
VALUES ('chat-attachments', 'chat-attachments', true);

CREATE POLICY "Authenticated users can upload" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'chat-attachments');

CREATE POLICY "Anyone can read attachments" ON storage.objects
FOR SELECT TO public
USING (bucket_id = 'chat-attachments');

CREATE POLICY "Anon users can upload" ON storage.objects
FOR INSERT TO anon
WITH CHECK (bucket_id = 'chat-attachments');