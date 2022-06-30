const mongoose = require('mongoose')

// connect MongoDB
const dbUrl = 'mongodb://localhost:27017/marketplaceDB'
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err => console.log(err))

const Schema = mongoose.Schema

const productSchema = new Schema({
    name: String,
    desc: String,
    price: String,
    slug: String,
    owner: String,
    image: [{ type: String, default: null }],
    date: { type: Date, default: Date.now },
    tagList: [{ type: String, default: null }]
})

// Create Model
const Product = mongoose.model("product", productSchema)

// Exports Model
module.exports = Product

// Create method
module.exports.saveProduct = function (model, data) {
    model.save(data)
}
