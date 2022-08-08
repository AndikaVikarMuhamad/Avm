const express = require("express");
const eru = express();
const port = 3000;
const api = require("./route/api");
const short = require("./route/short");

eru.use(express.static(__dirname + "/public"));
eru.use("/api", api);
eru.use("/short", short);

//     Landing page
eru.get("/", (req, res) => {
  res.sendFile("views/landing.html", { root: __dirname });
});
// docs
eru.get("/docs", (req, res) => {
  res.sendFile("views/docs.html", { root: __dirname });
});

// 404
eru.use("/", (req, res) => {
  res.status(404);
  res.sendFile("views/404.html", { root: __dirname });
});

eru.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
