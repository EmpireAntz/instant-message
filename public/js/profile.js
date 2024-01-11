
fetch('/api/users/friends')
  .then(response => response.json())
  .then(data => {
    // Use the returned user information
    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);
      console.log(data[i].name);
      const card = document.createElement('div');
      card.classList.add('user-card');
    
      // Update the card's content with the user's information
      card.innerHTML = `
        <h2>${data[i].name}</h2>
        <a class="font-styling" href="/messages/${data[i].friendships.id}">Chat now!</a>
        <!-- Add more user information as needed -->
        <!-- You can also add styling to the card using CSS -->
        <style>
        .user-card {
          background-color: #b24df1;
          padding: 10px;
          border: 5px solid-black;
          border-radius: 20px;
          margin-bottom: 10px;
      }
          }
        </style>
      `;
    
      // Append the card to a container element in the DOM
      const container = document.getElementById('friends-container');
      container.appendChild(card);
    }
  })
  .catch(error => {
    console.error(error);
  });


// Functionality for changing profile avatar bear 
var imageIndex = 0;
var images = ["/images/purple-bear.jpg", "/images/pink-bear.jpg", "/images/green-bear.jpg", "/images/blue-bear.jpg"];

document.getElementById("currentImage").addEventListener("click", changeImage);

function changeImage() {
  var image = document.getElementById("currentImage");
  imageIndex = (imageIndex + 1) % images.length;
  
  image.src = images[imageIndex];
}

