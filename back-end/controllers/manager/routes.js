const express = require('express');
const router = express.Router();

const { verifyToken, verifyRole } = require('../authController')
const { validateCreate, handleCreate } = require('./create')
const { getManager, listManagers } = require('./managerList')

router.post('/create', verifyToken, verifyRole(['admin']), validateCreate, handleCreate)
router.get('/list', verifyToken, listManagers)
router.get('/', verifyToken, getManager)
// router.put('/update')
// router.put('/delete')

module.exports = router;