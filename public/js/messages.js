
document.getElementById("submitMessage").addEventListener("click", function () {
    var message = document.getElementById("messageInput").value;
    // document.getElementById("messageBoard").innerHTML += "<div class='message-card'><p class='message-content'>" + message + "</p></div>";
    document.getElementById("messageInput").value = "";

});

