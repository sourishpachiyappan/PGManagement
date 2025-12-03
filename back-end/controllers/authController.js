const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Tenant, Manager, SuperAdmin } = require('../models/User');

// Register a new user (Tenant, Manager, or SuperAdmin)
const signup = async (req, res) => {
  const { email, password, userType, ...userData } = req.body;

  try {
    // Check if user already exists
    let existingUser;
    if (userType === 'tenant') {
      existingUser = await Tenant.findOne({ email });
    } else if (userType === 'manager') {
      existingUser = await Manager.findOne({ email });
    } else if (userType === 'super-admin') {
      existingUser = await SuperAdmin.findOne({ email });
    }

    if (existingUser) {
      return res.status(400).json({ message: `User with email ${email} already exists.` });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser;
    if (userType === 'tenant') {
      newUser = new Tenant({ ...userData, email, password: hashedPassword });
    } else if (userType === 'manager') {
      newUser = new Manager({ ...userData, email, password: hashedPassword });
    } else if (userType === 'super-admin') {
      newUser = new SuperAdmin({ ...userData, email, password: hashedPassword });
    } else {
      return res.status(400).json({ message: 'Invalid user type provided.' });
    }

    await newUser.save();

    // Create a token for the new user (optional for signup, but good for immediate login)
    const token = jwt.sign({ id: newUser._id, userType: userType }, process.env.JWT_SECRET, {
      expiresIn: '1d', // Token valid for 1 day
    });

    res.status(201).json({
      message: `${userType} registered successfully`,
      user: {
        id: newUser._id,
        email: newUser.email,
        userType: userType,
        ...userData // Include other relevant user data
      },
      token,
    });
  } catch (error) {
    console.error(`Error during ${userType} signup:`, error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Log in a user
const login = async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    let user;
    if (userType === 'tenant') {
      user = await Tenant.findOne({ email });
    } else if (userType === 'manager') {
      user = await Manager.findOne({ email });
    } else if (userType === 'super-admin') {
      user = await SuperAdmin.findOne({ email });
    } else {
      return res.status(400).json({ message: 'Invalid user type provided.' });
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, userType: userType }, process.env.JWT_SECRET, {
      expiresIn: '1d', // Token valid for 1 day
    });

    res.status(200).json({
      message: 'Logged in successfully',
      user: {
        id: user._id,
        email: user.email,
        userType: userType,
        name: user.name, // Assuming all user types have a 'name' field
        // Add other relevant user data you want to send to the frontend
      },
      token,
    });
  } catch (error) {
    console.error(`Error during ${userType} login:`, error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  signup,
  login,
};
