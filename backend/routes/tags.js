const express = require('express')
const router = express.Router()
 
const ProductController = require('../controllers/tags')

router.get('/alltags',ProductController.getAllTags)
router.get('/:slug',ProductController.getSingleTag)

module.exports = router