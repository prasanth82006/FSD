const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const auth = require('../middleware/auth');

router.post('/', auth, messageController.sendMessage);
router.get('/', auth, messageController.getConversations);
router.get('/unread', auth, messageController.getUnreadCount);
router.get('/:conversationId', auth, messageController.getMessages);

module.exports = router;
