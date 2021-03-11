const { Socket } = require("dgram");
const express = require ("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const port = 3000;

io.on('connection', (socket) => {
    var link = "";  //novo
    console.log('A user connected');
    socket.on("join", msg => { //novo
        link = msg; //novo
        console.log(link); //novo
        socket.join(link); //novo
    }); //novo
    // console.log("teste1"); //novo
    // console.log(link+"ttt"); //novo
    socket.on("chat message", msg => {
        console.log(msg);
        //enviando para todos na sala (room) 'link', com exceção do remetente
        socket.to(link).emit("chatMessage", "( ID:"+socket.id+") "+msg); //novo
        // enviando para todos na sala (room) 'link', incluindo o remetente
        // io.sockets.in(link).emit("chatMessage", "( ID:"+socket.id+") "+msg); //novo
        //O servidor envia para todos não se procupa com grupos
        // io.emit("chatMessage", "( ID:"+socket.id+") "+msg);
    });
});

server.listen(port, () => {
    console.log('Listenieng on port: ' + port);
});