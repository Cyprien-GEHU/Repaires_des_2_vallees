const express = require("express");
const router = express.Router();
const userController = require('../controllers/user')

// get all user
router.get('/', userController.getAllUser);

// Get the user
router.get('/:id',userController.getOneUser );

// Modify this account
router.put('/:id', userController.create_user);

// Delete this account
router.delete('/:id', userController.delete_user);

module.exports = router;