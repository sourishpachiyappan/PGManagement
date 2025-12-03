// server.js
const express = require("express");
const connectDB = require("./db");
const cors = require("cors"); // Import cors middleware
const { Tenant, Manager, SuperAdmin } = require("./models/User"); // Import the newly created models
const tenantRoutes = require("./routes/tenantRoutes"); // Import tenant routes
const authRoutes = require("./routes/authRoutes"); // Import auth routes

const app = express();
app.use(express.json());
app.use(cors()); // Use cors middleware

// Connect to MongoDB
connectDB();

// Use tenant routes
app.use('/api/tenants', tenantRoutes);

// Use auth routes
app.use('/api/auth', authRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
