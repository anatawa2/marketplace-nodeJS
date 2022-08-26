const mongoose = require('mongoose')

// connect MongoDB
const dbUrl = 'mongodb://localhost:27017/marketplaceDB'
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err => console.log(err))

const Schema = mongoose.Schema

// date.toUTCString()            // Tue, 12 May 2020 23:50:21 GMT
// date.toLocaleDateString()     // 5/12/2020
// date.toLocaleTimeString()     // 6:50:21 PM

const productSchema = new Schema({
    name: String,
    desc: String,
    price: Number,
    slug: String,
    owner: String,
    images: [{ type: String, default: null }],
    date: String,
    category: String,
    condition: String,
}, { timestamps: true, })

// Create Model
const Product = mongoose.model("product", productSchema)

// Exports Model
module.exports = Product

// Create method
module.exports.saveProduct = function (model, data) {
    model.save(data)
}
