//node server which will handle socket io connections

const io = require('socket.io')(8000)
const users = {};

io.on('connection' , socket =>{ // whenever the connections starts it starts to listen eeach and every instance to the
    // server now after that we will listen all the incoming events through the socket . If any new user joins ,
    // let other users connected to the server know!

    socket.on('new-user-joined' , nam=>{   // name given by developer
        console.log("New user" , nam);
        users[socket.id] = nam;
        socket.broadcast.emit('user-joined' , nam);  // emit this event to the client.js
    });
       // If someone sends the message broadcast it to other people
    socket.on('send' , message=>{      // name given by developer
        socket.broadcast.emit('receive' , {message : message , nam: users[socket.id]})
    }); 
     // If some one leaves the chat . let others know!
    socket.on('disconnect' , message=>{ // disconnect is a built in event predefined name
        socket.broadcast.emit('left' , users[socket.id]);
        delete users[socket.id];
    });
})