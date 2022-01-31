let express = require("express");
let path = require('path');
let app = express();

app.use(express.static(path.join(__dirname, "public")));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));


/* GET users listing. */
app.get("/", function (req, res) {
  res.send("respond with a resource");
});

const port = process.env.PORT || 3000;
const hostname = process.env.hostname || "localhost";

app.listen(port, ()=> {
    console.log(`Running server on http://${hostname}:${port}`);
});