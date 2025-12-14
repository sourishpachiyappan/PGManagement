const express = require('express');
const router = express.Router();

const { verifyToken, verifyRole } = require('../authController')
const { validateCreate, handleCreate } = require('./create')
const { getManager, listManagers, listManagersName } = require('./managerList')
const { validateUpdate, handleUpdate } = require('./update')

router.post('/create', verifyToken, verifyRole(['admin']), validateCreate, handleCreate)
router.put('/update/:id', verifyToken, verifyRole(['admin']), validateUpdate, handleUpdate)
router.get('/list', verifyToken, listManagers)
router.get('/', verifyToken, getManager)
router.get('/nameList', verifyToken, listManagersName);
// router.put('/update')
// router.put('/delete')

module.exports = router;