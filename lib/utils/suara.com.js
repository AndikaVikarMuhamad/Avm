const axios = require("axios");
const cheerio = require("cheerio");

const suara = () =>
  new Promise((resolve, reject) => {
    axios
      .get("https://www.suara.com/news/news-category/nasional")
      .then(async (response) => {
        const html = response.data;
        const C = cheerio.load(html);
        const data = [];
        C("#main-content")
          .find("li")
          .each((i, e) => {
            const img = C(e).find("img").attr("src");
            const title = C(e).find("img").attr("alt");
            const spoiler = C(e).find("p.ellipsis2").text();
            const result = {
              title,
              spoiler,
              img,
            };
            data.push(result);
            // console.log(result);
          });
        if (data.length === 0) {
          const error = {
            message: "Berita tidak di temukan",
          };
          reject(error);
        }
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
const suarainternasional = () =>
  new Promise((resolve, reject) => {
    axios
      .get("https://www.suara.com/news/news-category/internasional")
      .then(async (response) => {
        const html = response.data;
        const C = cheerio.load(html);
        const data = [];
        C("#main-content")
          .find("li")
          .each((i, e) => {
            const img = C(e).find("img").attr("src");
            const title = C(e).find("img").attr("alt");
            const spoiler = C(e).find("p.ellipsis2").text();
            const result = {
              title,
              spoiler,
              img,
            };
            data.push(result);
            // console.log(result);
          });
        if (data.length === 0) {
          const error = {
            message: "Berita tidak di temukan",
          };
          resolve(error);
        }
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports = { suara, suarainternasional };
