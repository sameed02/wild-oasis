import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ftaexbbuvmhnasffxffa.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0YWV4YmJ1dm1obmFzZmZ4ZmZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYwMTU3NTEsImV4cCI6MjAyMTU5MTc1MX0.P0A7WsdI4mOEVv0i64aFulVCYph2yrq--6SEQIKyJ0M";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
