//node server which will handle socket.io connections
// const io = require('socket.io')(8000)  //this was giving me cors error
//so i used this code
const io = require("socket.io")(8000, {
    cors: {
        origin: "http://localhost:5500",
        methods: ["GET", "POST"]
    }
});


const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        // console.log(name, 'joined the chat');
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})