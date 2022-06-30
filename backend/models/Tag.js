const mongoose = require('mongoose')

// connect MongoDB
const dbUrl = 'mongodb://localhost:27017/marketplaceDB'
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err => console.log(err))

const Schema = mongoose.Schema

const tagSchema = new Schema({
    name: String,
    tagged: [{
        type: Schema.Types.ObjectId,
        ref: "product"
    }]
})

// Create Model
const Tag = mongoose.model("tag", tagSchema)

// Exports Model
module.exports = Tag

