const { server } = require('./app');
const io = require("socket.io")(server, {
    cors: {
        origin: "http://192.168.1.125:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

function useSocket() {
    io.on('connection', (socket) => {
        console.log('user connected');
        socket.on('join', (chatRoom) => {
            console.log('user join ::', chatRoom);
            socket.join(chatRoom);
        });

        socket.on('sendMessage', ({ room, user, message }, callback) => {
            io.to(room).emit('messages', { user: user, message: message, room: room });
            callback();
        });

    });
}
exports.useSocket = useSocket