const mongoose = require('mongoose');

// Tenant Schema
const tenantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: String, required: true },
  gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
  age: { type: Number, required: true },
  address: { type: String, required: true },
  mobile_no: { type: String, required: true },
  aadhar_no: { type: String, required: true, unique: true },
  type: { type: String, required: true, enum: ['student', 'professional'] },
  profile_pic: { type: String },
  joining_date: { type: String, required: true },
  leaving_date: { type: String },
  college_or_company_name: { type: String, required: true },
  college_or_company_address: { type: String, required: true },
  guardian_name: { type: String, required: true },
  guardian_mobile: { type: String, required: true },
  room_type: { type: String, required: true, enum: ['single', 'double', 'triple'] },
  advance: { type: Number, required: true },
  rent: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String } // In a real application, ensure this is hashed
});

// Manager Schema
const managerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  aadhar_no: { type: String, required: true, unique: true },
  profile_pic: { type: String },
  mobile_no: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String } // In a real application, ensure this is hashed
});

// SuperAdmin Schema
const superAdminSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  aadhar_no: { type: String, required: true, unique: true },
  profile_pic: { type: String },
  mobile_no: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String } // In a real application, ensure this is hashed
});

const Tenant = mongoose.model('Tenant', tenantSchema);
const Manager = mongoose.model('Manager', managerSchema);
const SuperAdmin = mongoose.model('SuperAdmin', superAdminSchema);

module.exports = { Tenant, Manager, SuperAdmin };
