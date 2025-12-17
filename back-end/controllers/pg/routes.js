const express = require('express');
const router = express.Router();

const { verifyToken, verifyRole } = require('../authController')
const { validateCreate, handleCreate } = require('./create')
const { getPgDetails, listPGs, getPgMenu } = require('./pgList')

router.post('/create', verifyToken, verifyRole(['admin']), validateCreate, handleCreate)
router.get('/', verifyToken, verifyRole(['admin', 'manager']), getPgDetails)
router.get('/list', verifyToken, verifyRole(['admin', 'manager']), listPGs)
router.get('/menu', verifyToken, verifyRole(['admin', 'manager', 'tenant']), getPgMenu)

module.exports = router;