express = require("express")

app = express()

app.get("/", (req, res) => {
  res.sendFile(__dirname+"/index.html")
})

app.listen(8000, () => "Started")
