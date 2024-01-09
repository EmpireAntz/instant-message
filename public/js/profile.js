fetch('/api/users/friends')
  .then(response => response.json())
  .then(data => {
    // Use the returned user information
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });