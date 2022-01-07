const express = require("express");
const path = require("path");
require("dotenv").config();
const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + "/dist/coda-test-angular"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/coda-test-angular/index.html"));
});

app.listen(process.env.PORT || 8080);
