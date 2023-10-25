const {map} = require("core-js/internals/array-iteration");
const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {cors: {
        origin: "http://localhost:8080",
    }
    // ...
});

io.on("connection", (socket) => {
    // console.log('connect'+socket.id);
    const room = new Map();
    let num = 0;
    socket.on('sendMessage', (message,room) =>{
        socket.to(room).emit('receiveMessage', message)

    })
    socket.on('joinRoom', (room) =>{
        socket.join(room)
    })
    socket.on('startChat',(userId)=>{
        room.set(userId,num);
        num++;
    });
    socket.on('findChat',(socketId,requestId)=>{
        socket.to(socketId).emit('RoomFound',room.get(requestId));
    })
});

httpServer.listen(3000);
