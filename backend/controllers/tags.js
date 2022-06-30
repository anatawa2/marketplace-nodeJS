const Tag = require('../models/Tag')
const Product = require('../models/Product')

module.exports.getAllTags = async (req, res) => {
    try {
        const getTags = await Tag.find();
        console.log(getTags);
        const tags = []
        if (getTags)
            for (let tag of getTags) {
                tags.push(tag.name)
            }
        res.status(200).json({ tags })
    } catch (e) {
        res.status(422).json({ errors: { body: [e.message] } })
    }
}

module.exports.getSingleTag = async (req, res) => {
    try {
        const tags = await Tag.findOne({ name: req.params.slug })
        const ids = tags.tagged.toString().split(',') 
        const list = []

        for (i in ids) {
            let product = await Product.findOne({ _id: ids[i] })
            if (product !== null){ 
                list.push(product.slug)
            }
        }          
        

        res.json({ list })

    } catch (e) {
        res.status(422).json({ errors: { body: [e.message] } })
    }
}

