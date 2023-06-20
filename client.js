const socket = io('http://localhost:8000')  // connecting server through the script used in index.html file

//Get DOM elements in respective Js variable
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

//Audio that will play on recieving messages
var audio = new Audio('ting.mp3');

//Function which will append event info to the container
const append = (message , position) =>{
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if(position == 'left'){
    audio.play();
  }

}

//Ask new user for his / her name and let the server know
const nam  = prompt("Enter your name to join the chat");
socket.emit('new-user-joined' ,nam);

//If a new user joins, recieve his /her name from the server
socket.on('user-joined' , nam=>{
  append(`${nam} joined the chat` , 'right')
})

//If server sends a message, receive it 
socket.on('receive' , data=>{
  append(`${data.nam}: ${data.message}` , 'left')
})

//If a user leaves the chat append the info to the container
socket.on('left' , nam=>{
  append(`${nam} has left the chat` , 'right')
})


//If the form get submitted , send  message to the server
form.addEventListener('submit' , (e)=>{
  e.preventDefault();
  const message = messageInput.value;
  append(`You : ${message}` , 'right');
  socket.emit('send' , message);
  messageInput.value=  '';

})