const express = require('express');
const router = express.Router();

const { verifyToken, verifyRole } = require('../authController')
const { listTenants, getTenantDetails } = require('./tenantList')
const { validateLogin, handleLogin } = require('./login')
const { validateUpdateStatus, handleUpdateStatus } = require('./updateStatus')

router.post('/login', validateLogin, handleLogin);
router.get('/list', verifyToken, verifyRole(['admin', 'manager']), listTenants)
router.get('/', verifyToken, verifyRole(['admin', 'manager']), getTenantDetails)
router.put('/update-status', verifyToken, verifyRole(['manager']), validateUpdateStatus, handleUpdateStatus)

module.exports = router;