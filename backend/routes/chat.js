const express = require('express')
const router = express.Router()

const { authByToken } = require('../utils/auth')
const ChatController = require('../controllers/chat')

router.get('/chat', authByToken, ChatController.myInbox)
router.get('/notify', authByToken, ChatController.chatNotify)
router.get('/chat/:id', authByToken, ChatController.onChatRoom)
router.post('/chat/:id/send', authByToken, ChatController.sendMessages)
router.post('/seenchat', authByToken, ChatController.clickToSeen)

module.exports = router