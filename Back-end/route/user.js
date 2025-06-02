const express = require("express");
const router = express.Router();

// Get the user
router.get('/user/:id')

// Create a USER
router.post('/user');

// Modify this account
router.put('/user/:id');

// Delete this account
router.delete('/user/:id')

module.exports = router;