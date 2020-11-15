const express = require('express');
const router = express.Router();
const ctrlAuth = require('../controllers/authentication_controller');

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.get('/logout', ctrlAuth.logout);

module.exports = router;