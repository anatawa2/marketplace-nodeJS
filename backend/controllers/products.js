const Product = require('../models/Product')
const Category = require('../models/Category')
const User = require('../models/User')
const { slugify } = require('../utils/stringUtil')

module.exports.addProduct = async (req, res) => {

    let a = new Date(Date.now())
    let dateUTC = a.toUTCString().slice(0, 16)

    try {

        if (!req.body) throw 'data is required'
        const data = await req.body
        if (!data.name) throw 'name is required'
        if (!data.desc) throw 'desc is required'
        if (!data.price) throw 'price is required'
        if (!data.category) throw 'category is required'
        if (!data.condition) throw 'condition is required'
        if (!req.files) throw 'image is required'

        let image = []
        for (i of req.files) {
            image.push(i.filename)
        } 
        const user = await User.findOne({ email: req.user.email })
        const addProduct = new Product({
            name: data.name,
            desc: data.desc,
            price: data.price,
            category: data.category,
            condition: data.condition,
            date: dateUTC,
            image: image
        })

        // tagged to product 
        let categoryExists = await Category.findOne({ name: data.category })
        if (categoryExists) {
            categoryExists.categorized.push(addProduct)
            categoryExists.save()
        } else {
            let newCategory = await new Category({ name: data.category })
            newCategory.categorized.push(addProduct)
            newCategory.save()
        }

        // name + last 4 char of _id to making slug
        addProduct.slug = slugify(addProduct.name, addProduct._id)
        addProduct.owner = user._id
        addProduct.save()

        // user own this product
        user.list.push(addProduct)
        user.save()

        res.status(201).json({ status: "ok" })

    } catch (err) {
        res.status(404).json({ err: err })
    }

}
module.exports.getRandom = async (req, res) => {
    try {
        //get all user  
        User.find((err, user) => {
            if (user) {
                for (i of user) { // i => each USER 
                    Product.find({ owner: i._id }, (err, data) => {
                        if (data == "") { }
                        else res.json(data)
                    })
                }
            }
            else throw 'errz'
        })
    } catch (err) {
        res.status(404).json({ err: err })
    }
}
module.exports.getListByUser = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.params.slug })
        if (!user) throw 'No such user found'
        
        const list = await Product.find({ owner: user._id })
        
        user.password = undefined
        console.log(user); 
        return res.status(200).json({ status: 'ok', list: list, user: user })

    } catch (err) {
        res.json({ err: err })
    }
}

module.exports.getSingleProduct = async (req, res) => {
    try {
        // const user = await User.findOne({ email: req.user.email })
        const item = await Product.findOne({ slug: req.params.slug })
        if (!item) throw 'no item'

        const user = await User.findOne({ _id: item.owner }).select('name').select('avatar')
        console.log(item);
        res.json({ status: 'ok', item: item, user: user })


    } catch (err) {
        res.json({ err: err })
    }
}

module.exports.updateProduct = async (req, res) => {

    try {

        // if (!req.body) throw 'Field is required'
        const data = req.body // name : macbook
        const slugInfo = req.params.slug;

        // get req data        
        const product = await Product.findOne({ slug: slugInfo })
        if (!product) throw 'No such item found'

        // verify user 
        const user = await User.findOne({ email: req.user.email })
        if ((user._id).toString() != product.owner) {
            res.status(403);
            throw new Error('You must be the owner to modify this product');
        }

        //storing new data to var
        const name = data.name ? data.name : product.name
        const desc = data.desc ? data.desc : product.desc
        const price = data.price ? data.price : product.price
        const slug = slugify(name, product._id)
        let myTag = product.tagList
        let image = product.image

        // delete&put file in localfolder
        if (req.files) {
            let fs = require('fs');
            image = []
            for (p of product.image) {
                try {
                    let filePath = `../frontend/public/images/products/${p}`
                    fs.unlinkSync(filePath);
                } catch (err) {
                    console.log(err);
                }
            }
            for (p of req.files) {
                image.push(p.filename)
            }
        }
        // add tag to product         
        if (data.tagList) {
            myTag = []
            for (let t of data.tagList) {
                let tagExists = await Tag.findOne({ name: t })
                let newTag
                if (!tagExists) {
                    newTag = await new Tag({ name: t })
                    newTag.tagged.push(product)
                    newTag.save()

                } else {
                    for (check of tagExists.tagged) {
                        if (check != product.id) {
                            tagExists.tagged.push(product)
                            tagExists.save()
                            break
                        }
                    }
                }
                myTag.push(t)
                console.log(myTag);
            }
        }

        Product.findOneAndUpdate({ slug: slugInfo },
            {
                name: name, desc: desc, price: price,
                slug: slug, image: image, tagList: myTag
            },
            { new: true }, (err, data) => {
                if (err) throw 'error'
                else return res.json({ data })

            })

    } catch (err) {
        res.json({ err: err })
    }
}

module.exports.delProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug })
        if (!product) throw 'Not found product to delete.'
        //verify user
        const user = await User.findOne({ email: req.user.email })
        if ((user._id).toString() != product.owner) {
            res.status(403)
            throw 'You must be the owner to delete this product'
        }

        // delete product in category 
        let myCategory = await Category.findOne({ name: product.category })
        let thisCategory = myCategory.categorized
        let index = thisCategory.indexOf(product._id.toString())
        myCategory.categorized.splice(index)
        myCategory.save()

        // delete product in User
        if (product.owner == user._id.toString()) { // compare prod and owner
            let userList = user.list.toString().split(",") // array of list in User
            let index = userList.indexOf(product._id.toString())
            console.log('index', index);
            user.list.splice(index)
            user.save()
            console.log('save');
        }

        // delete file in folder
        let fs = require('fs');
        try {
            for (p of product.image) {
                let filePath = `../frontend/public/images/products/${p}`
                fs.unlinkSync(filePath);
            }
        }
        catch (err) {
            console.log(err);
        }

        // delete product
        Product.findOneAndDelete({ slug: req.params.slug }, (err, data) => {
            if (!err) res.json({ status: "ok", message: "Delete succesful!" })
            else throw 'not found item'
        })

    } catch (err) {
        res.json({ err: err })
    }
}

