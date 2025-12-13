const express = require('express');
const router = express.Router();

const { verifyToken, verifyRole } = require('../authController')
const { validateCreate, handleCreate } = require('./create')
const { getPgDetails, listPGs } = require('./pgList')

router.post('/create', verifyToken, verifyRole(['admin']), validateCreate, handleCreate)
router.get('/', verifyToken, verifyRole(['admin']), getPgDetails)
router.get('/list', verifyToken, verifyRole(['admin']), listPGs)

module.exports = router;