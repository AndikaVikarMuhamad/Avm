const axios = require("axios");
const cheerio = require("cheerio");
const { pickRandom } = require("./allfunc");

const stickerpacklink = (search) =>
  new Promise((resolve, reject) => {
    axios
      .get(`https://getstickerpack.com/stickers?query=${search}`)
      .then((response) => {
        const html = response.data;
        const C = cheerio.load(html);
        const data = [];
        C("#stickerPacks > .container > .row > div").each((i, el) => {
          const link = C(el).find("a").attr("href");
          const img = C(el).find("img").attr("src");
          const title = C(el).find(".title").text();
          const author = C(el).find(".username").text();
          const result = {
            title,
            author,
            link,
            img,
          };
          data.push(result);
          //   console.log(result);
        });
        if (data.length === 0) {
          const error = {
            message: "pack tidak di temukan",
          };
          reject(error);
        }
        const filter = data.filter((item) => item.link !== undefined);
        resolve(filter);
      })
      .catch((err) => {
        reject(err);
      });
  });
// stickerpacklink("anime").then((data) => {
//   console.log(data);
// });

const stickerpack = (search) =>
  new Promise((resolve, reject) => {
    stickerpacklink(search)
      .then(async (datas) => {
        const result = pickRandom(datas);
        const getsticker = await axios.get(result.link);
        const html = getsticker.data;
        const C = cheerio.load(html);
        const title = C("#intro").find("h1").text();
        const author = C("#intro").find("h5").text();
        const data = [];
        C(".container > .row > .sticker-pack-cols").each((i, el) => {
          const url = C(el).find("img").attr("data-src-large");
          data.push(url);
        });
        if (data.length === 0) {
          const error = {
            message: "pack tidak di temukan",
          };
          reject(error);
        }
        const filter = data.filter((item) => item !== undefined);
        const final = {
          title,
          author,
          link: result.link,
          result: filter,
        };
        resolve(final);
      })
      .catch((err) => {
        reject(err);
      });
  });

const stickerpackdl = (url) =>
  new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        const html = response.data;
        const C = cheerio.load(html);
        const data = [];
        C(".container > .row > .sticker-pack-cols").each((i, el) => {
          const url = C(el).find("img").attr("data-src-large");
          data.push(url);
        });
        if (data.length === 0) {
          const error = {
            message: "pack tidak di temukan",
          };
          reject(error);
        }
        const final = data.filter((item) => item !== undefined);
        resolve(final);
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports = { stickerpacklink, stickerpackdl, stickerpack };
