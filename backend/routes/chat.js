// const Product = require('../models/Product')
// const Category = require('../models/Category')

const express = require('express')
const router = express.Router()

const ChatController = require('../controllers/chat')

router.get('/chat', ChatController.chatApp)
router.get('/profile/chat', ChatController.onChatRoom)

module.exports = router