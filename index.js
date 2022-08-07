const express = require("express");
const app = express();
const port = 3000;
const api = require("./route/api");
const short = require("./route/short");
app.use(express.static(__dirname + "/public"));
app.use("/api", api);
app.use("/short", short);
// Landing page
app.get("/", (req, res) => {
  res.sendFile("views/landing.html", { root: __dirname });
});

app.get("/docs", (req, res) => {
  res.sendFile("views/docs.html", { root: __dirname });
});
app.use("/", (req, res) => {
  res.status(404);
  res.sendFile("views/404.html", { root: __dirname });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
