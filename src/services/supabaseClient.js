 import { createClient } from '@supabase/supabase-js';
 
 const supabaseUrl = 'https://ouddlxyatabmwnxvkcyg.supabase.co';
 const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91ZGRseHlhdGFibXdueHZrY3lnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NDc5NjEsImV4cCI6MjA2MzMyMzk2MX0.Ykme9B3w4etSpJteEippK3QTIy36T8sNlAxiswK4QK8';
 
 const supabase = createClient(supabaseUrl, supabaseAnonKey);
 
 export default supabase;
 
