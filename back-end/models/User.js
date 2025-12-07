const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date },
  gender: { type: String, enum: ["male", "female", "other"] },
  age: { type: Number },
  address: { type: String },
  mobile_no: { type: String, required: true },
  aadhar_no: { type: String, unique: true, required: true },

  type: { type: String, enum: ["student", "professional"], required: true },

  profile_pic: { type: String }, // URL

  joining_date: { type: Date, required: true },
  leaving_date: { type: Date },

  college_or_company_name: { type: String },
  college_or_company_address: { type: String },

  guardian_name: { type: String },
  guardian_mobile: { type: String },

  room_type: { type: String, enum: ["single", "double", "triple"] },

  advance: { type: Number, default: 0 },
  rent: { type: Number, required: true },

  room_id: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  pg_id: { type: mongoose.Schema.Types.ObjectId, ref: "PG" },
}, { timestamps: true });

const PGSchema = new mongoose.Schema({
  owner_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
  manager_id: { type: mongoose.Schema.Types.ObjectId, ref: "Manager" },

  name: { type: String, required: true },
  description: { type: String },
  location: { type: String, required: true },

  pg_type: { type: String, enum: ["boys", "girls", "unisex"] },

  total_inmates: { type: Number, default: 0 },
  occupied_inmates: { type: Number, default: 0 },

  no_of_rooms: { type: Number, required: true },

  room_count_per_each_sharing: {
    single: { type: Number, default: 0 },
    double: { type: Number, default: 0 },
    triple: { type: Number, default: 0 },
  },

  ac_type: { type: String, enum: ["ac", "non_ac"] },

}, { timestamps: true });

const roomSchema = new mongoose.Schema({
  pg_id: { type: mongoose.Schema.Types.ObjectId, ref: "PG", required: true },

  room_type: { type: String, enum: ["single", "double", "triple"], required: true },

  filled_count: { type: Number, default: 0 },

  tenants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tenant" }],
}, { timestamps: true });

const managerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  aadhar_no: { type: String, required: true, unique: true },
  profile_pic: { type: String }, // URL
  mobile_no: { type: String, required: true },

  pg_id: { type: mongoose.Schema.Types.ObjectId, ref: "PG" },
}, { timestamps: true });

const superAdminSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  password: { type: String, required: true }, 
  // should be hashed before saving (bcrypt)

  mobile_no: { type: String, required: true },

  role: { type: String, enum: ["super_admin"], default: "super_admin" },

  profile_pic: { type: String }, // URL (optional)

  permissions: {
    manage_pgs: { type: Boolean, default: true },
    manage_owners: { type: Boolean, default: true },
    manage_managers: { type: Boolean, default: true },
    manage_tenants: { type: Boolean, default: true },
    manage_rooms: { type: Boolean, default: true },
    full_access: { type: Boolean, default: true }
  },

  status: { type: String, enum: ["active", "inactive"], default: "active" },

}, { timestamps: true });

const Tenant = mongoose.model('Tenant', tenantSchema);
const Manager = mongoose.model('Manager', managerSchema);
const SuperAdmin = mongoose.model('SuperAdmin', superAdminSchema);
const PG = mongoose.model('PG', PGSchema);
const Room = mongoose.model('Room', roomSchema);

module.exports = { Tenant, Manager, SuperAdmin, PG, Room };
