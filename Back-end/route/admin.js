const express = require('express');
const userControl = require('../controllers/user')
const articleControl = require('../controllers/article')
const agendaControl = require('../controllers/agenda')
const eventControl = require('../controllers/event')
const router = express.Router();

//Router GET
router.get('/user', userControl.getAllUser);
router.get('/user/:id', userControl.getOneUser);
router.get('/article', articleControl.get_article);
router.get('/article/:id', articleControl.get_OneArticle);
router.get('/agenda', agendaControl.get_agenda)
router.get('/agenda/:id', agendaControl.get_OneAgenda);
router.get('/event', eventControl.get_event);
router.get('/event/:id', eventControl.get_OneEvent);

//Router POST
router.post('/user', userControl.create_user)
router.post('/article', articleControl.create_article);
router.post('/agenda', agendaControl.create_agenda);
router.post('/event', eventControl.create_event);

//Router PUT
router.put('/user/:id', userControl.update_user);
router.put('/article/:id', articleControl.update_article);
router.put('/agenda/:id', agendaControl.update_agenda);
router.put('/event/:id', eventControl.update_event);

//Router DELETE
router.delete('/user/:id', userControl.delete_user);
router.delete('/article/:id', articleControl.delete_article);
router.delete('/agenda/:id', agendaControl.delete_agenda);
router.delete('/event/:id', eventControl.delete_event);

module.exports = router;