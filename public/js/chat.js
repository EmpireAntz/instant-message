document.addEventListener('DOMContentLoaded', () => {
  const socket = io();

  const path = window.location.pathname;
  const pathParts = path.split('/');
  const friendshipId = pathParts[pathParts.length - 1];

  socket.on('connect', () => {
   
  });

  fetch('/api/users/friendsroom')
    .then(response => response.json())
    .then(data => {
      
      for (let i = 0; i < data.length; i++) {
        socket.emit('join room', friendshipId);
       
        socket.on('new message', (message) => {
          
          appendMessage(message);
        });
      }

      document.getElementById('form').addEventListener('submit', sendMessage);

      function appendMessage(message) {
        
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
      
        fetch(`/messages/${friendshipId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ messageText })
        })
        .then(response => response.json())
        .then(data => {
         
          socket.emit('chat message', data);
        })
        .catch(error => console.error('Error:', error));
      }
    });
});