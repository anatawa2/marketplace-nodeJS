const Product = require('../models/Product')
const Category = require('../models/Category')

module.exports.getSingleCategory = async (req, res) => {
    try {
        const category = await Category.findOne({ name: req.params.slug })
        if (!category) throw 'not-found'
        const ids = category.categorized.toString().split(',')
        const list = [] 

        if (ids != '') {
            for (item in ids) {
                let product = await Product.findOne({ _id: ids[item] })
                if (product !== null) list.push(product)

            }
        } 
        res.json({ status: 'ok', list: list })

    } catch (err) {
        res.status(422).json({ err: err })
    }
} 


