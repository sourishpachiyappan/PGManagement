const express = require("express");
const cors = require("cors");

const connectDB = require("./db");
const config = require("./config/config");

// const { Tenant, Manager, SuperAdmin } = require("./models/User");
// const tenantRoutes = require("./routes/tenantRoutes");
// const authRoutes = require("./routes/authRoutes");
// const pgRoutes = require("./routes/pgRoutes");

const { createAdmin } = require("./services/userService");

const app = express();
app.use(express.json());
app.use(cors());

const startServer = async () => {
  try {
    await connectDB();
    await createAdmin(config.adminUser);

    app.use("/api/auth", require('./controllers/auth/routes'));
    app.use("/api/manager", require('./controllers/manager/routes'))

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });

  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
