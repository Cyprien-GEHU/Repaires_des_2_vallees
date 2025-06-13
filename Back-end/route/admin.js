const express = require('express');
const userControl = require('../controllers/user')
const articleControl = require('../controllers/article')
const agendaControl = require('../controllers/agenda')
const eventControl = require('../controllers/event')
const authToken = require('../middleware/authToken')
const router = express.Router();

//Router GET
router.get('/user', authToken, userControl.getAllUser);
router.get('/user/:id', authToken, userControl.getOneUser);
router.get('/article', authToken, articleControl.get_article);
router.get('/article/:id', authToken, articleControl.get_OneArticle);
router.get('/agenda', authToken, agendaControl.get_agenda)
router.get('/agenda/:id', authToken, agendaControl.get_OneAgenda);
router.get('/event', authToken, eventControl.get_event);
router.get('/event/:id', authToken, eventControl.get_OneEvent);

//Router POST
router.post('/user', authToken, userControl.create_user)
router.post('/article', authToken, articleControl.create_article);
router.post('/agenda', authToken, agendaControl.create_agenda);
router.post('/event', authToken, eventControl.create_event);

//Router PUT
router.put('/user/:id', authToken, userControl.update_user);
router.put('/article/:id', authToken, articleControl.update_article);
router.put('/agenda/:id', authToken, agendaControl.update_agenda);
router.put('/event/:id', authToken, eventControl.update_event);

//Router DELETE
router.delete('/user/:id', authToken, userControl.delete_user);
router.delete('/article/:id', authToken, articleControl.delete_article);
router.delete('/agenda/:id', authToken, agendaControl.delete_agenda);
router.delete('/event/:id', authToken, eventControl.delete_event);

module.exports = router;