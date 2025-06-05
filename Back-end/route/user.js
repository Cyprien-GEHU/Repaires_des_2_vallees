const express = require("express");
const router = express.Router();
const userController = require('../controllers/user')

// get all user
router.get('/', userController.getAllUser);

// Get the user
router.get('/:id',userController.getOneUser );

// Modify this account
router.put('/:id');

// Delete this account
router.delete('/:id')

module.exports = router;