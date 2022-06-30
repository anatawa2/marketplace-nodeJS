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
    image: String,
    token: String,
    date: { type: Date, default: Date.now },
    list: [{
        type: Schema.Types.ObjectId,
        ref: "product"
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
