import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oxsibufwcpukalwyjqfx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94c2lidWZ3Y3B1a2Fsd3lqcWZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjU0MDA0OTUsImV4cCI6MTk4MDk3NjQ5NX0.8XDLOafsF7FxlB3f4p87ImbsnfbWQC7RWl_SdCAlQ4M';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

