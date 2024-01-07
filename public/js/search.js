
// Get the form element
const form = document.querySelector('.search-form');

// Add event listener to form submit event
form.addEventListener('submit', function(event) {
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
      console.log('User found:', user);
      // Here you could update the DOM with the user information
      // For example: document.getElementById('user-info').textContent = JSON.stringify(user, null, 2);
    } else {
      console.log('User not found');
      // Update the DOM to show that the user was not found
      // For example: document.getElementById('user-info').textContent = 'User not found.';
    }
  } catch (error) {
    console.error('Error searching user:', error);
    // Update the DOM to show the error
    // For example: document.getElementById('user-info').textContent = 'An error occurred while searching.';
  }
}


