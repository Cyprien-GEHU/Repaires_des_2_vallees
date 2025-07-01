const express = require('express');
const upload = require('../middleware/multer_confing');
const userControl = require('../controllers/user');
const articleControl = require('../controllers/article');
const agendaControl = require('../controllers/agenda');
const eventControl = require('../controllers/event');
const authToken = require('../middleware/authToken');

const router = express.Router();

// Router GET
router.get('/user', authToken, userControl.getAllUser);
router.get('/user/:id', authToken, userControl.get_OneUserAdmin);
router.get('/article', authToken, articleControl.get_article);
router.get('/article/:id', authToken, articleControl.get_OneArticleAdmin);
router.get('/agenda', authToken, agendaControl.get_agenda);
router.get('/agenda/:id', authToken, agendaControl.get_OneAgendaAdmin);
router.get('/event', authToken, eventControl.get_event);
router.get('/events/:id', authToken, eventControl.get_OneEventAdmin);

// Router POST
router.post('/user', authToken, userControl.create_user);
router.post('/article', authToken, upload.single('image'), articleControl.create_article);
router.post('/agenda', authToken, upload.none(), agendaControl.create_agenda);
router.post('/event', authToken, upload.single('image'), eventControl.create_event);

// Router PUT
router.put('/user/:id', authToken, userControl.update_user);
router.put('/article/:id', authToken, upload.single('image'), articleControl.update_article);
router.put('/agenda/:id', authToken, upload.none(), agendaControl.update_agenda);
router.put('/event/:id', authToken, upload.single('image'), eventControl.update_event);

// Router DELETE
router.delete('/user/:id', authToken, userControl.delete_user);
router.delete('/articles/:id', authToken, articleControl.delete_article);
router.delete('/agenda/:id', authToken, agendaControl.delete_agenda);
router.delete('/events/:id', authToken, eventControl.delete_event);

module.exports = router;
