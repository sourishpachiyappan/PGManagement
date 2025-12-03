const bcrypt = require('bcryptjs');
const { Tenant } = require('../models/User');

const createTenant = async (req, res) => {
  try {
    let { password, ...tenantData } = req.body;

    // Hash password if provided
    let hashedPassword;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const newTenant = new Tenant({
      ...tenantData,
      password: hashedPassword,
    });

    await newTenant.save();
    res.status(201).json({ message: 'Tenant created successfully', tenant: newTenant });
  } catch (error) {
    console.error('Error creating tenant:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find();
    res.status(200).json(tenants);
  } catch (error) {
    console.error('Error fetching tenants:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getTenantById = async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    res.status(200).json(tenant);
  } catch (error) {
    console.error('Error fetching tenant by ID:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateTenant = async (req, res) => {
  try {
    let { password, ...tenantData } = req.body;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      tenantData.password = await bcrypt.hash(password, salt);
    }

    const updatedTenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      tenantData,
      { new: true, runValidators: true }
    );

    if (!updatedTenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    res.status(200).json({ message: 'Tenant updated successfully', tenant: updatedTenant });
  } catch (error) {
    console.error('Error updating tenant:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteTenant = async (req, res) => {
  try {
    const deletedTenant = await Tenant.findByIdAndDelete(req.params.id);
    if (!deletedTenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    res.status(200).json({ message: 'Tenant deleted successfully' });
  } catch (error) {
    console.error('Error deleting tenant:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createTenant,
  getTenants,
  getTenantById,
  updateTenant,
  deleteTenant,
};
