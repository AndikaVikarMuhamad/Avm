const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("../lib/utils/short");
const eru = express();
const urlExist = require("url-exist");
const __path = process.cwd();
const dotenv = require("dotenv");
dotenv.config();

const myurl = process.env.Baseurl;

eru.use(express.static(__path + "/public"));
eru.use(express.urlencoded({ extended: false }));
// Pake aja
mongoose.connect(
  "mongodb+srv://andika:eAswHY3K9gd4ByNV@cluster0.plr9pio.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

eru.get("/", (req, res) => {
  res.sendFile(__path + "/views/short.html");
});

eru.get("/db", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.json(shortUrls);
});

eru.get("/list", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  const id = shortUrls.map((url) => {
    return {
      link: `${myurl}/${url.short}`,
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
  if (!req.query.url)
    return res.json({
      error: "Masukan URL",
    });
  else {
    const check = await ShortUrl.findOne({ full: req.query.url });
    const exist = await urlExist(req.query.url);
    if (!exist) return res.json({ error: "URL tidak ditemukan" });
    if (check)
      return res.json({
        link: `${myurl}/${check.short}`,
        id: check.short,
      });
    const link = await ShortUrl.create({ full: req.query.url });
    const result = {
      link: `${myurl}/${link.short}`,
      id: link.short,
    };
    res.json(result);
  }
});
module.exports = eru;
// Adeyaka nursing