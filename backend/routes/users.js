const express = require('express')
const router = express.Router()

// Middleware
const { authByToken } = require('../utils/auth')
const UserController = require('../controllers/users')
const { uploadDis } = require('../utils/multer')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/setting', authByToken, UserController.setting)
router.patch('/setting', authByToken, uploadDis.single('image'), UserController.updateSetting,)
// router.delete('/delete',authByToken,UserController.delete) 

module.exports = router