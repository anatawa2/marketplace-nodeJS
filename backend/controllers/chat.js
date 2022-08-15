const User = require('../models/User')
const Inbox = require('../models/Inbox')
const Chat = require('../models/Chat')

//with userID
module.exports.onChatRoom = async (req, res) => {

    try {

        const user = await User.findOne({ email: req.user.email })
        const recipient = await User.findById({ _id: req.params.id }) //crash if not found 
        if (user._id == req.params.id) return //cant talk to myself

        const chatLists = user.chat_lists
        let currentRoom = ''
        let inbox = []

        if (chatLists != '') {
            for (room in chatLists) {
                let list = await Inbox.findOne({ _id: chatLists[room] })
                if (list !== null && list?.sent) inbox.push(list)
                if (list.user == req.params.id) currentRoom = list.chat_room
            }
        }

        let chatHistory = []
        if (!!currentRoom) {
            chatHistory = await Chat.findOne({ chat_room: currentRoom })
            // set user to seen
            let inbox = await Inbox.findOne({ chat_room: currentRoom })
            inbox.seen = true
            // inbox.save()

        } else {
            // Create new room & Add Inbox into both chatter
            currentRoom = `_${user._id}_${recipient._id}`

            let newChatRoom = new Chat({ chat_room: currentRoom })
            let newInboxUser = new Inbox({ chat_room: currentRoom, user: recipient._id })
            let newInboxRecipient = new Inbox({ chat_room: currentRoom, user: user._id })

            newChatRoom.save()
            newInboxUser.save()
            newInboxRecipient.save()

            user.chat_lists.push(newInboxUser)
            recipient.chat_lists.push(newInboxRecipient)
            user.save()
            recipient.save()
        }

        return res.json({
            status: "ok",
            me: user._id.toString(),
            inbox: inbox,
            chatRoom: currentRoom,
            chatHistory: chatHistory?.messages
        })

    } catch (err) {
        res.status(422).json({ err: err })
    }
}

module.exports.sendMessages = async (req, res) => {

    try {
        // create chat_history if messages have send
        const chatRoom = req.body.chatRoom
        const messages = req.body.messages

        const id1 = chatRoom.split('_')[1] // qop
        const id2 = chatRoom.split('_')[2] // moon

        // fresh inbox
        // switch id
        const sender = await Inbox.findOne({ chat_room: chatRoom, user: id2 }) //qop
        const recipient = await Inbox.findOne({ chat_room: chatRoom, user: id1 }) //moon

        // who's sent last message
        const { name: name1, avatar: avatar1, _id: _id1 } = await User.findOne({ _id: id1 })
        const { name: name2, avatar: avatar2, _id: _id2 } = await User.findOne({ _id: id2 })

        sender.owner = _id1
        sender.name = name2
        sender.avatar = avatar2
        sender.sentBy = messages.user
        sender.sent = messages.message

        recipient.owner = _id2
        recipient.name = name1
        recipient.avatar = avatar1
        recipient.sentBy = messages.user
        recipient.sent = messages.message

        // sender.save()
        // recipient.save()

        // History
        let saveHistory = await Chat.findOne({ chat_room: chatRoom })
        if (!saveHistory) {
            saveHistory = new Chat({ chat_room: chatRoom })
        }
        saveHistory.messages.push(messages)
        // saveHistory.save()

        return res.json({ status: "ok" })

    } catch (err) {
        res.status(422).json({ err: err })
    }

}

module.exports.myInbox = async (req, res) => {

    try {
        const { chat_lists } = await User.findOne({ email: req.user.email })

        let inbox = []
        if (chat_lists != '') {
            for (room in chat_lists) {
                let user = await Inbox.findOne({ _id: chat_lists[room] })
                if (user !== null && user?.sent) inbox.push(user)
            }
        }
        return res.json({ status: "ok", inbox: inbox })

    } catch (err) {
        res.status(422).json({ err: err })
    }


}

module.exports.chatNotify = async (req, res) => {

    try {
        const { chat_lists } = await User.findOne({ email: req.user.email })

        let inbox = []
        if (chat_lists != '') {
            for (room in chat_lists) {
                let user = await Inbox.findOne({ _id: chat_lists[room] })
                if (user?.sent && user?.seen === false) inbox.push(user)
            }
        }
        return res.json({ status: "ok", inbox: inbox })

    } catch (err) {
        res.status(422).json({ err: err })
    }
}

module.exports.clickToSeen = async (req, res) => {

    try {
        const user = await User.findOne({ email: req.user.email })
        const chat = await Inbox.findOne({ owner: user._id, chat_room: req.body.room })
        console.log(chat);
        chat.seen = true
        chat.save()
        return res.json({ status: "ok" })

    } catch (err) {
        res.status(422).json({ err: err })
    }
}

// module.exports.chatapp = () => {
//     io.on('connection', (socket) => {

//         socket.on('chat message', (msg) => {

//             io.emit('chat message', msg);

//         });

//     });
// }

