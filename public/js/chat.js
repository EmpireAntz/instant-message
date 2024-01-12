console.log('running')
document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
socket.on('connect', () => {
  console.log('Connected to the server via Socket.IO!');
});
  
fetch('/api/users/friends')
  .then(response => response.json())
  .then(data => {
    for (let i = 0; i < data.length; i++) {

        document.getElementById('form').addEventListener('submit', sendMessage);
      
        socket.emit('join room', `${data[i].friendships.friendshipId}`); // This should be dynamically assigned based on the chatId of the current room
        socket.on('new message', (message) => {
            console.log('New message received:', message);
            appendMessage(message);
          });
          
          function appendMessage(message) {
            console.log('Appending message:', message);
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
            chatId: `${data[i].friendships.friendshipId}`,
            messageText: messageText
          });
        }
    }
  });
  })