const mongoose = require('mongoose')

// connect MongoDB
const dbUrl = 'mongodb://localhost:27017/marketplaceDB'
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err => console.log(err))

const Schema = mongoose.Schema

const chatSchema = new Schema({
    chat_room: String,
    messages: [{
        type: String,
        default: null
    }]
})

// Create Model
const Chat = mongoose.model("chat", chatSchema)

// Exports Model
module.exports = Chat

