// Make an API request to fetch the data from the server
fetch('/api/users/friends')
  .then((response) => response.json())
  .then((data) => {
    // Loop through the data and create HTML cards
    data.forEach((friend) => {
      const friendName = friend.name;
      const friendEmail = friend.email;

      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <h3>${friendName}</h3>
        <p>Email: ${friendEmail}</p>
      `;

      // Append the card to the DOM or perform any other desired action
      const container = document.getElementById('friends-container');
      container.appendChild(card);
    });
  })
  .catch((error) => {
    console.log('Error retrieving friend data:', error);
  });