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
        console.log('user connect');
        socket.on('join', room => {
            console.log('user join: ' + room);
            thisRoom = room
            socket.join(room);
        });

        socket.on('sendMessage', ({ user, message }, callback) => {
            thisUser = user
            io.to(thisRoom).emit('message', { user: user, message: message });
            callback();
        });

    });
}
exports.useSocket = useSocket