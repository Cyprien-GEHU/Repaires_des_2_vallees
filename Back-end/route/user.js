const express = require('express');

const router = express.Router();
const userController = require('../controllers/user');
const authToken = require('../middleware/authToken');

// Get the user
router.get('/:id', authToken, userController.getOneUser);

// Modify this account
router.put('/:id', authToken, userController.create_user);

// Delete this account
router.delete('/:id', authToken, userController.delete_user);

module.exports = router;
