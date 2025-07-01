const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth');

// creation of a user
router.post('/signin', authController.signin);

// connexion tot his account
router.post('/login', authController.login);

router.get('/logout', authController.logout);

module.exports = router;
