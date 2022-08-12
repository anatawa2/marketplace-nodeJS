const express = require('express')
const router = express.Router()

const { authByToken } = require('../utils/auth')
const ChatController = require('../controllers/chat')

router.get('/chat/:id', authByToken, ChatController.onChatRoom)
router.get('/chat', authByToken, ChatController.myInbox)
router.post('/chat/:id/send', authByToken, ChatController.sendMessages)

module.exports = router