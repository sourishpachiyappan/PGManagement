const express = require("express");
const cors = require("cors");

const connectDB = require("./db");
const config = require("./config/config");

const { createAdmin } = require("./services/userService");

const app = express();
app.use(express.json());

// CORS FIX
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const startServer = async () => {
  try {
    await connectDB();
    await createAdmin(config.adminUser);

    // Routes
    app.use("/api/auth", require("./controllers/auth/routes"));
    app.use("/api/manager", require("./controllers/manager/routes"));
    app.use("/api/pg", require("./controllers/pg/routes"));

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
