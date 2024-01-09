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
// Functionality for changing profile avatar bear 
var imageIndex = 0;
var images = ["/images/purple-bear.jpg", "/images/pink-bear.jpg", "/images/green-bear.jpg", "/images/blue-bear.jpg"];

document.getElementById("currentImage").addEventListener("click", changeImage);

function changeImage() {
  var image = document.getElementById("currentImage");
  imageIndex = (imageIndex + 1) % images.length;
  
  image.src = images[imageIndex];
}

