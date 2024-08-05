import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://eojgunculvtkuxaxdgmj.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvamd1bmN1bHZ0a3V4YXhkZ21qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI4NTQxNTUsImV4cCI6MjAzODQzMDE1NX0.hw0yIYj5bx6HVpVNNkwp8gvVD6UrgVWN8aaaOhfz_qE";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
