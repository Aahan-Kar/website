// 1. Connect to the server
var socket = io();

// 2. Get all form elements
var usernameInput = document.getElementById("username");
var colorInput = document.getElementById("color");
var messageBox = document.getElementsByTagName("textarea")[0];
var messagesDiv = document.getElementsByClassName("messages")[0];

// 3. Disable form reload
var allForms = document.getElementsByTagName("form");
for (var i = 0; i < allForms.length; i++) {
    allForms[i].onsubmit = function(event) {
        event.preventDefault();
    };
}

// 4. Send message
function sendMessage() {
    var msg = {
        username: usernameInput.value,
        color: colorInput.value,
        text: messageBox.value
    };

    socket.emit("message", msg);
    messageBox.value = "";
}

// 5. Press Enter to send message
messageBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});

// 6. Show incoming message
function displayMessage(data) {
    var line = document.createElement("div");

    var name = document.createElement("span");
    name.style.color = data.color;
    name.textContent = data.username + ": ";

    var text = document.createElement("span");
    text.textContent = data.text;

    line.appendChild(name);
    line.appendChild(text);

    messagesDiv.appendChild(line);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// 7. When server sends message, show it
socket.on("message", function(data) {
    displayMessage(data);
});
