const mongoose = require('mongoose')

// connect MongoDB
const dbUrl = 'mongodb://localhost:27017/marketplaceDB'
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err => console.log(err))

const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: String,
    categorized: [{
        type: Schema.Types.ObjectId,
        ref: "product"
    }]
})

// Create Model
const Category = mongoose.model("category", categorySchema)

// Exports Model
module.exports = Category

