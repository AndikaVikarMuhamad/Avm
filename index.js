const express = require("express");
const eru = express();
const port = 3000 || 3001;
const api = require("./route/api");
const ShortUrl = require("./lib/utils/short");
const short = require("./route/short");
const cors = require("cors");

eru.use(express.static(__dirname + "/public"));
eru.use("/api", api);
eru.use("/short", short);

// Landing page

eru.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/landing.html");
});
// docs
eru.get("/docs", (req, res) => {
  res.sendFile("views/docs.html", { root: __dirname });
  console.log(req.get("host"));
});

eru.use(cors());
// 404

eru.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.send(404);
  shortUrl.save();
  res.redirect(shortUrl.full);
});

eru.use("/", (req, res) => {
  res.status(404);
  res.sendFile("views/404.html", { root: __dirname });
});

eru.listen(port, () => {
  console.log(`Online on localhost:${port}`);
}).keepAliveTimeout = 61 * 1000;
