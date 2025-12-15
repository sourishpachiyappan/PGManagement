const express = require('express');
const router = express.Router();

const { validateLogin, handleLogin } = require('./login')
const { validateSignup, handleSignup } = require('./signup')

router.post('/login', validateLogin, handleLogin);
router.post('/signup', validateSignup, handleSignup);

module.exports = router;
