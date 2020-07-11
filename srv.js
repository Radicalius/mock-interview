express = require("express")
http = require("http")
socketio = require("socket.io")
exec = require('child_process').exec
fs = require('fs')

app = express()
srv = http.createServer(app)
io = socketio(srv)

file = "<insert code here>"

app.get("/", (req, res) => {
  res.sendFile(__dirname+"/index.html")
})

io.on("connection", function(client) {
  client.on("get", function(data) {
    client.emit("file", file)
  })

  client.on("edit", function(data) {
    file = data
    client.broadcast.emit("file", data)
  })

  client.on("run", function(data) {
    fs.writeFile("prog.py", file, function(err) {
      exec("python prog.py", function(error, stdout, stderr){
        client.emit("results", {
          output: stdout,
          error: stderr
        })
        client.broadcast.emit("results", {
          output: stdout,
          error: stderr
        })
      })
    })
  })

})

srv.listen(8001)
