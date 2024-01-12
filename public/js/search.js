// Function to add the searched email to the friends list
async function addFriend(friendEmail) {
  try {
    const response = await fetch('/api/users/addFriend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any needed headers like authorization tokens
      },
      body: JSON.stringify({ friendEmail })
    });

    if (response.ok) {
      const result = await response.json();
      // console.log(result.message);
      // Update the UI to show the new friend
    } else {
      console.error('Failed to add friend:', response.statusText);
      // Handle errors in the UI
    }
  } catch (error) {
    console.error('Error adding friend:', error);
    // Handle errors in the UI
  }
}

// Get the form element
const form = document.querySelector('.search-form');

// Add event listener to form submit event
form.addEventListener('submit', function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the value of the email input field
  const email = document.getElementById('user-search').value;

  // Perform the search logic with the email value
  searchUserByEmail(email);
});

// Function to perform the search logic
async function searchUserByEmail(email) {
  // Update the endpoint to the one you've set up on the server for searching by email
  try {
    const response = await fetch(`/api/users/searchByEmail?email=${encodeURIComponent(email)}`, {
      method: 'GET', // Specify the method
      headers: {
        'Content-Type': 'application/json',
        // If your API requires authentication, you'll need to include the necessary headers here
        // 'Authorization': 'Bearer YOUR_TOKEN_HERE'
      }
    });

    if (response.ok) {
      const user = await response.json();
      // console.log('User found:', user);

      // Remove the old card if it exists
      const oldCard = document.querySelector('.user-card');
      if (oldCard) {
        oldCard.remove();
      }

      // Create a new card element
      const card = document.createElement('div');
      card.classList.add('user-card');

      // Update the card's content with the user's information
      card.innerHTML = `
      <div class="row">
        <div class="d-flex justify-content-center align-items-center" style="height: 30vh;">
          <div class="card p-3">
            <div class="card-body">
              <h2>${user.name}</h2>
              <p>Email: ${user.email}</p>
              <button class="btn-primary"id="addBtn">Add</button>
            </div>
          </div>
        </div>
      </div>
      `;

      // Append the card to a container element in the DOM
      const container = document.getElementById('user-container');
      container.appendChild(card);
      document.getElementById("addBtn").addEventListener("click", function () {
        // Get the searched email
        var searchedEmail = document.getElementById('user-search').value;

        // Add the searched email to the friends list
        addFriend(searchedEmail);
      });
    } else {
      // console.log('User not found');
      // Update the DOM to show that the user was not found
      // For example: document.getElementById('user-info').textContent = 'User not found.';
    }
  } catch (error) {
    console.error('Error searching user:', error);
    // Update the DOM to show the error
    // For example: document.getElementById('user-info').textContent = 'An error occurred while searching.';
  }
}

// Functionality for changing profile avatar bear 
var imageIndex = 0;
var images = ["/images/purple-bear.jpg", "/images/pink-bear.jpg", "/images/green-bear.jpg", "/images/blue-bear.jpg"];

document.getElementById("currentImage").addEventListener("click", changeImage);

function changeImage() {
  var image = document.getElementById("currentImage");
  imageIndex = (imageIndex + 1) % images.length;

  image.src = images[imageIndex];
}