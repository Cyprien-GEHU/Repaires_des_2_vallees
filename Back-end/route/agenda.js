const express = require('express');
const router = express.Router();

// GET all activity on agenda
router.get('/', (req, res) => {
    res.send('list of all article');
});

// GET one activity on the agenda
router.get('/:id')

module.exports = router;