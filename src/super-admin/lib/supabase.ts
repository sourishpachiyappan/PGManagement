import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Manager {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar_color: string;
  created_at: string;
  updated_at: string;
}

export interface PG {
  id: string;
  name: string;
  location: string;
  current_occupancy: number;
  total_capacity: number;
  status: string;
  manager_id: string;
  created_at: string;
  updated_at: string;
  managers?: Manager;
}

export interface Subscription {
  id: string;
  client_name: string;
  plan: string;
  price: number;
  properties_count: number;
  renewal_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  pg_id: string;
  amount: number;
  tenants_count: number;
  payment_date: string;
  status: string;
  created_at: string;
  pgs?: PG;
}
