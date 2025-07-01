const express = require('express');

const router = express.Router();
const eventControl = require('../controllers/event');

// GET all event
router.get('/', eventControl.get_event);

// GET one event
router.get('/:id', eventControl.get_OneEvent);

module.exports = router;
