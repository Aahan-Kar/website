from flask import Flask, send_from_directory
from flask_socketio import SocketIO, emit

# Make the web app
app = Flask(__name__, static_folder=".", static_url_path="")

# Add real-time ability
socketio = SocketIO(app, cors_allowed_origins="*")

# Send index.html when someone visits the site
@app.route("/")
def index():
    return send_from_directory(".", "index.html")

# Handle chat messages from any user
@socketio.on("message")
def handle_message(data):
    # Send the same message to EVERY connected user
    emit("message", data, broadcast=True)

# Run the server
if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000)
