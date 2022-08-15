const mongoose = require('mongoose')

// connect MongoDB
const dbUrl = 'mongodb://localhost:27017/marketplaceDB'
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err => console.log(err))

const Schema = mongoose.Schema

const inboxSchema = new Schema({
    user: String,
    name: String,
    chat_room: String,
    avatar: String,
    sentBy: String,
    sent: String,
    owner: String,
    seen: { type: Boolean, default: false }
}, { timestamps: true })

// Create Model
const Chat = mongoose.model("inbox", inboxSchema)

// Exports Model
module.exports = Chat

