const express = require('express');
const router = express.Router();

const { validateLogin, handleLogin } = require('./login')

router.post('/login', validateLogin, handleLogin);

module.exports = router;
