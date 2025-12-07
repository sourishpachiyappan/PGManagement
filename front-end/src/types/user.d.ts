// src/types/user.d.ts

export interface TenantUser {
  name: string;
  dob: string;
  gender: 'male' | 'female' | 'other'; // Assuming specific values for gender
  age: number;
  address: string;
  mobile_no: string;
  aadhar_no: string;
  type: 'student' | 'professional'; // Renamed from 'student / professional' to 'type'
  profile_pic?: string; // Optional
  joining_date: string;
  leaving_date?: string; // Optional
  college_or_company_name: string;
  college_or_company_address: string;
  guardian_name: string;
  guardian_mobile: string;
  room_type: 'single' | 'double' | 'triple'; // Assuming specific values for room_type
  advance: number;
  rent: number;
  email: string;
  password?: string; // Password should ideally not be stored directly or passed around
}

export interface ManagerUser {
  id: string;
  name: string;
  aadhar_no: string;
  profile_pic?: string; // Optional
  mobile_no: string;
  email: string;
  password?: string; // Password should ideally not be stored directly or passed around
}

export interface SuperAdminUser {
  id: string;
  name: string;
  aadhar_no: string;
  profile_pic?: string; // Optional
  mobile_no: string;
  email: string;
  password?: string; // Password should ideally not be stored directly or passed around
}


export interface PG {
  _id: string; // Mongoose adds _id
  owner_id?: string;
  manager_id?: string;
  name: string;
  description?: string;
  location: string;
  pg_type?: "boys" | "girls" | "unisex";
  total_inmates: number; 
  occupied_inmates: number; 
  no_of_rooms: number;
  room_count_per_each_sharing?: {
    single: number;
    double: number;
    triple: number;
  };
  ac_type?: "ac" | "non_ac";
  createdAt: string;
  updatedAt: string;
  // Assuming 'status' will be derived or added if necessary
}
