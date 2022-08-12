const User = require('../models/User')
const Chat = require('../models/Chat')

module.exports.onChatRoom = async (req, res) => {

    try {

        const user = await User.findOne({ email: req.user.email })
        const recipient = await User.findById({ _id: req.params.id }) //crash if not found 

        // find ROOM by recipient id
        let [chatRoom] = user?.chat_lists.filter(val => val.user == req.params.id)
        if (chatRoom === undefined) {
            chatRoom = `_${user._id}_${recipient._id}`
            // Create new room & Add chatRoom to both chatter
            let newChatRoom = new Chat({ chat_room: chatRoom })
            user.chat_lists.push({ room: chatRoom, user: recipient._id })
            recipient.chat_lists.push({ room: chatRoom, user: user._id })
            user.save()
            recipient.save()
            newChatRoom.save()
            console.log('save');
        }
        const chatLists = user.chat_lists

        return res.json({
            status: "ok",
            chatLists: chatLists,
            chatRoom: (chatRoom.room || chatRoom)
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
        let chatHistory = await Chat.findOne({ chat_room: chatRoom })

        if (!chatHistory) chatHistory = new Chat({ chat_room: chatRoom })
        chatHistory.messages.push(messages)
        chatHistory.save()

        return res.json({ status: "ok" })

    } catch (error) {
        res.status(422).json({ err: err })
    }

}

module.exports.myInbox = async (req, res) => {

    try {

        const user = await User.findOne({ email: req.user.email })

        const lists = user.chat_lists
        let filterLists = lists.filter(list => list.start === false)

        return res.json({ status: "ok", chatLists: filterLists })

    } catch (error) {
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

