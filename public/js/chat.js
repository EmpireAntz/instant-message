console.log('running')
document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
socket.on('connect', () => {
  console.log('Connected to the server via Socket.IO!');
});
  
fetch('/api/users/friendsroom')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    console.log(data[0].name)
    for (let i = 0; i < data.length; i++) {

        document.getElementById('form').addEventListener('submit', sendMessage);
      
        socket.emit('join room', `${data[0].friends[i].friendships.friendshipId}`); 
        socket.on('new message', (message) => {
            console.log('New message received:', message);
            appendMessage(message);
          });
          
          function appendMessage(message) {
            console.log('Appending message:', message);
            console.log(message)
            const messageBoard = document.getElementById('messageBoard');
            if (messageBoard) {
              const messageElement = document.createElement('p');
              messageElement.textContent = `${message.userName}: ${message.messageText}`;
              messageBoard.appendChild(messageElement);
            } else {
              console.error('Message board not found');
            }
          }
      
        function sendMessage(event) {
          event.preventDefault();
          const messageInput = document.getElementById('messageInput');
          const messageText = messageInput.value;
          messageInput.value = '';
      
          socket.emit('chat message', {
            chatId: `${data[0].friends[i].friendships.friendshipId}`,
            messageText: messageText,
            userName: data[0].name
          });
        }
    }
  });
  })