const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
var message_recieve_audio = new Audio('sound/whatsapp_notification.mp3');
var disconnect_audio = new Audio('sound/disconnect.mp3');
var new_user_joined_audio = new Audio('sound/joined.wav');

const append = (string_message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = string_message;
    messageElement.classList.add('message'); //here message is a string that is defined in css as a class
    messageElement.classList.add(position); //here position is variable, position can have 2 val = 'left' or 'right'
    messageContainer.append(messageElement);
}

const name = prompt('Enter your name');
socket.emit('new-user-joined', name);
append(`You (${name}) joined the chat`, 'center-message');




form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
});

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'center-message');
    new_user_joined_audio.play();
});


socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');
    message_recieve_audio.play();
});

socket.on('left', name => {
    append(`${name} left the chat`, 'center-message');
    disconnect_audio.play();
});

