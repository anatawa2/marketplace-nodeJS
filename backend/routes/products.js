const express = require('express')
const router = express.Router()

// Middleware
const { authByToken } = require('../utils/auth')
const ProductController = require('../controllers/products')
const { uploadProd } = require('../utils/multer')

router.get('/', ProductController.getRandom)
router.get('/user/:slug', ProductController.getListByUser)
router.get('/product/:slug', ProductController.getSingleProduct)
router.post('/product/add', authByToken, uploadProd.array('images', 7), ProductController.addProduct)
router.patch('/product/update/:slug', authByToken, uploadProd.array('images', 7), ProductController.updateProduct)
router.delete('/product/delete/:slug', authByToken, ProductController.delProduct)

module.exports = router