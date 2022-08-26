const express = require('express')
const router = express.Router()
 
const ProductController = require('../controllers/category')
 
router.get('/category/:slug',ProductController.getSingleCategory)

module.exports = router