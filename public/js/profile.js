// Code to display a message when a card is clicked
function showMessage(message) {
  alert(message);
}

// Code to add click event listener to all the cards
document.addEventListener("DOMContentLoaded", function() {
  var cards = document.querySelectorAll(".card");
  
  // Add click event listener to each card
  cards.forEach(function(card) {
    card.addEventListener("click", function() {
      var message = card.querySelector(".card-text").textContent;
      showMessage(message);
    });
  });
});
