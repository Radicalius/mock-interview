express = require("express")
http = require("http")
socketio = require("socket.io")

app = express()
srv = http.createServer(app)
io = socketio(srv)

app.get("/", (req, res) => {
  res.sendFile(__dirname+"/index.html")
})

file = "<insert code here>"

io.on("connection", function(client) {
  client.on("get", function(data) {
    client.emit("file", file)
  })
  client.on("edit", function(data) {
    console.log(data)
    if (!data.backspace) {
        file += data.value;
    } else {
      file = file.slice(0,-1)
    }
    client.broadcast.emit("update", data)
  })
})

srv.listen(8000)
