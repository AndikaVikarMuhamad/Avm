const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("../lib/utils/short");
const eru = express();
const urlExist = require("url-exist");
const baseUrl = "http://localhost:3000";
mongoose.connect(
  "mongodb+srv://andika:eAswHY3K9gd4ByNV@cluster0.plr9pio.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

eru.use(express.urlencoded({ extended: false }));

eru.get("/db", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.json(shortUrls);
});
eru.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  const id = shortUrls.map((url) => {
    return {
      link: `${baseUrl}/short/${url.short}`,
      url: url.full,
      id: url.short,
    };
  });
  res.json(id);
});

eru.get("/remove", async (req, res) => {
  if (!req.query.id) return res.status(404).send("Masukan ID");
  const check = await ShortUrl.findOne({ short: req.query.id });
  if (!check) return res.status(404).send("ID tidak ditemukan");
  await ShortUrl.deleteOne({ short: req.query.id });
  res.send("Berhasil dihapus");
});
eru.get("/create", async (req, res) => {
  const check = await ShortUrl.findOne({ full: req.query.url });
  const exist = await urlExist(req.query.url);
  if (!exist) return res.json({ error: "URL tidak ditemukan" });
  else if (!req.query.url) return res.send("Masukan url");
  else if (check)
    return res.json({
      link: `${baseUrl}/short/${check.short}`,
      id: check.short,
    });
  const link = await ShortUrl.create({ full: req.query.url });
  const result = {
    link: `${baseUrl}/short/${link.short}`,
    id: link.short,
  };
  res.json(result);
});

eru.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.send(404);
  shortUrl.save();
  res.redirect(shortUrl.full);
});

module.exports = eru;
