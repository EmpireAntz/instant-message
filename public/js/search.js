
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
  // Perform the search logic here
  // You can make an API request or search through a list of users
  try {
    const response = await fetch(`/users?email=${email}`);
    if (response.ok) {
      const user = await response.json();
      console.log('User found:', user);
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.error('Error searching user:', error);
  }

  // Example: Log the email value to the console
  //console.log('Searching for user with email:', email);
}


