const express = require('express');
const {
  createTenant,
  getTenants,
  getTenantById,
  updateTenant,
  deleteTenant,
} = require('../controllers/tenantController');

const router = express.Router();

// Route to create a new tenant 
router.post('/', createTenant);

// Route to get all tenants
router.get('/', getTenants);

// Route to get a single tenant by ID
router.get('/:id', getTenantById);

// Route to update a tenant by ID
router.put('/:id', updateTenant);

// Route to delete a tenant by ID
router.delete('/:id', deleteTenant);

module.exports = router;
