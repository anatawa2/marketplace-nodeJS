const express = require('express')
const router = express.Router()

const { authByToken } = require('../utils/auth')
const ChatController = require('../controllers/chat')

router.get('/notify', authByToken, ChatController.chatNotify)
router.get('/inbox', authByToken, ChatController.myInbox)
router.get('/inbox/:id', authByToken, ChatController.onChatRoom)
router.post('/inbox/:id/send', authByToken, ChatController.sendMessages)
router.post('/seenchat', authByToken, ChatController.clickToSeen)

module.exports = router