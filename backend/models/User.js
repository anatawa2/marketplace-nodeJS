const mongoose = require('mongoose')

// connect MongoDB
const dbUrl = 'mongodb://localhost:27017/marketplaceDB'
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err => console.log(err))

const Schema = mongoose.Schema


const userSchema = new Schema({
    email: String,
    password: String,
    name: String,
    bio: String,
    avatar: String,
    token: String,
    date: String,
    product_lists: [{
        type: Schema.Types.ObjectId,
        ref: "product"
    }],
    chat_lists: [{
        type: Schema.Types.ObjectId,
        ref: "inbox"
    }]
})

// Create Model
const User = mongoose.model("user", userSchema)

// Exports Model
module.exports = User

// Create method
module.exports.saveUser = function (model, data) {
    model.save(data)
}
