const express = require("express");
const router = express.Router();

//Router GET
router.get('/admin/user');
router.get('/admin/user/:id');
router.get('/admin/article');
router.get('/admin/article/:id');
router.get('/admin/agenda');
router.get('/admin/agenda/:id');
router.get('/admin/event');
router.get('/admin/event/:id');

//Router POST
router.post('/admin/user');
router.post('/admin/article');
router.post('/admin/agenda');
router.post('/admin/event');

//Router PUT
router.put('/admin/user/:id');
router.put('/admin/article/:id');
router.put('/admin/agenda/:id');
router.put('/admin/event/:id');

//Router DELETE
router.delete('/admin/user/:id');
router.delete('/admin/article/:id');
router.delete('/admin/agenda/:id');
router.delete('/admin/event/:id');

module.exports = router;