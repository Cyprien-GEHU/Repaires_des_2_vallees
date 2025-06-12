const agendaControl = require('../controllers/agenda')
const express = require('express');
const router = express.Router();

// GET all activity on agenda
router.get('/', agendaControl.get_agenda);

// GET one activity on the agenda
router.get('/:id', agendaControl.get_OneAgenda);

module.exports = router;