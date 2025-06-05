const express = require('express');
const router = express.Router();
const user = require('../models/user')

//Router GET
router.get('/user');
router.get('/user/:id');
router.get('/article');
router.get('/article/:id');
router.get('/agenda')
router.get('/agenda/:id');
router.get('/event');
router.get('/event/:id');

//Router POST
router.post('/user')
router.post('/article');
router.post('/agenda');
router.post('/event');

//Router PUT
router.put('/user/:id');
router.put('/article/:id');
router.put('/agenda/:id');
router.put('/event/:id');

//Router DELETE
router.delete('/user/:id');
router.delete('/article/:id');
router.delete('/agenda/:id');
router.delete('/event/:id');

module.exports = router;