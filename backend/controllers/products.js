const Product = require('../models/Product')
const Tag = require('../models/Tag')
const User = require('../models/User')
const { slugify } = require('../utils/stringUtil')

module.exports.addProduct = async (req, res) => {

    try {
        if (!req.body) throw 'data is required'
        const data = await req.body
        if (!data.name) throw 'name is required'
        if (!data.desc) throw 'desc is required'
        if (!data.price) throw 'price is required'
        // if (!req.files) throw 'image is required' 

        let image = []
        // for (i of req.files) {
        //     image.push(i.filename)
        //     console.log(i.filename);
        // }
        const user = await User.findOne({ email: req.user.email })
        const addProduct = new Product({
            name: data.name,
            desc: data.desc,
            price: data.price,
            image: image

        })
        // tagged to product
        if (data.tagList) {
            for (let t of data.tagList) {
                let tagExists = await Tag.findOne({ name: t })
                let newTag
                if (!tagExists) {
                    newTag = await new Tag({ name: t })
                    newTag.tagged.push(addProduct)
                    newTag.save()

                } else {
                    tagExists.tagged.push(addProduct)
                    tagExists.save()
                }
                addProduct.tagList.push(t)
            }
        }

        // name + last 4 char of _id to making slug
        addProduct.slug = slugify(addProduct.name, addProduct._id)
        addProduct.owner = user._id
        addProduct.save()

        // user own this product
        user.list.push(addProduct)
        user.save()

        res.status(201).json(addProduct)

    } catch (err) {
        res.status(404).json({ err })
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
        res.status(404).json({ err })
    }
}
module.exports.getListByUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.slug })
        const list = await Product.find({ owner: user._id }) //.select('name')        

        console.log(user.list.toString().split(","))

        if (!user) throw 'No such user found'

        user.password = undefined
        user.token = req.header('Authorization').split(' ')[1]
        return res.status(200).json({ list })

    } catch (err) {
        res.json({ err })
    }
}

module.exports.getSingleProduct = async (req, res) => {
    try {
        // const user = await User.findOne({ email: req.user.email })
        const item = await Product.findOne({ slug: req.params.slug })
        res.json( item )


    } catch (err) {
        res.json({ err })
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
            { name: name, desc: desc, price: price, slug: slug, image: image, tagList: myTag },
            { new: true }, (err, data) => {
                if (err) throw 'error'
                else return res.json({ data })

            })

    } catch (err) {
        res.json({ err })
    }
}

module.exports.delProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug })
        //verify user
        const user = await User.findOne({ email: req.user.email })
        if ((user._id).toString() != product.owner) {
            res.status(403);
            throw new Error('You must be the owner to delete this product');
        }

        // delete product in tagged
        if (product.tagList) {
            for (let t of product.tagList) {
                let tag = await Tag.findOne({ name: t }) // obj x
                let x = []
                for (i of tag.tagged) x.push(i) // push obj => array               
                x.forEach((id, index) => {
                    if (id.toString() == product._id.toString()) {
                        tag.tagged.splice(index) // delete current tag at index position
                        tag.save()
                    }
                })
            }
        }
        // delete product in User
        if (product.owner == user._id.toString()) { // compare prod and owner
            let u = user.list.toString().split(",") // array of list in User
            u.forEach((id, index) => {
                if (id == product._id.toString()) {
                    user.list.splice(index) // delete current tag at index position
                    user.save()
                }
            })
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
            console.log(err)
        }

        // delete product
        Product.findOneAndDelete({ slug: req.params.slug }, (err, data) => {
            if (err) throw 'error'
            else return res.json("delete succesful")
        })

    } catch (err) {
        res.json({ err })
    }
}

