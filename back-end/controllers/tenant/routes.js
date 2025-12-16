const express = require('express');
const router = express.Router();

const { verifyToken, verifyRole } = require('../authController')
const { listTenants, getTenantDetails } = require('./tenantList')
const { validateLogin, handleLogin } = require('./login')

router.post('/login', validateLogin, handleLogin);
router.get('/list', verifyToken, verifyRole(['admin', 'manager']), listTenants)
router.get('/', verifyToken, verifyRole(['admin', 'manager']), getTenantDetails)

module.exports = router;