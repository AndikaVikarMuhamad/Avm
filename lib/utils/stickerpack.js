const axios = require("axios");
const cheerio = require("cheerio");
const { search } = require("mal-scraper");

const stickerpack = (search) =>
  new Promise((resolve, reject) => {
    axios
      .get(`https://getstickerpack.com/stickers?query=${search}`)
      .then((response) => {
        const html = response.data;
        const C = cheerio.load(html);
        const data = [];
        C("#stickerPacks > .container > :nth-child(3) > div").each((i, el) => {
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
            error: "Pack tidak di temukan",
          };
          resolve(error);
        }
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports = stickerpack;

// stickerpack("anime").then((data) => {
//   console.log(data);
// });
