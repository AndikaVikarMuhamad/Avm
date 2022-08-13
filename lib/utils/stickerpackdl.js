const axios = require("axios");
const cheerio = require("cheerio");

const stickerpackdl = (url) =>
  new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(async (response) => {
        const html = response.data;
        const C = cheerio.load(html);
        const data = [];
        C(".container > .row > div").each((i, el) => {
          const url = C(el).find("img").attr("data-src-large");
          //   console.log({ url });
          const result = {
            url,
          };
          data.push(result);
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

module.exports = stickerpackdl;
