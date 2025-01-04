const express = require('express');
const app = express();
const http=require('http');

const server = http.createServer(app);

const path=require('path');
const socketio=require('socket.io');
const io=socketio(server);


let users={};

io.on('connection',(socket)=>{
    console.log("connection established")
    socket.on('send-msg',(data)=>{
        //console.log(data)
        io.emit('recieve-msg',{msg:data.msg,username:users[socket.id]})
    })
    socket.on('login',(data)=>{
        users[socket.id]=data.username;

    })
});
app.use('/',express.static(path.join(__dirname,'public')))


let PORT=3000;
server.listen(PORT,()=>{
    console.log(`server conncted at port: ${PORT}`)
})

