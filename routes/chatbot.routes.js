const router = require('express').Router();
const ChatBotController = require('../controllers/chat.controller');

router.post('/send', ChatBotController.sendChat);

module.exports = router;