const userID = 1

fetch('/api/users/friends/:' + userID)
  .then(response => response.json())
  .then(data => {
    // Use the returned user information
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });
