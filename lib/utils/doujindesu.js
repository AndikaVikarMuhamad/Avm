const axios = require("axios");
const cheerio = require("cheerio");

const doujindesu = (search) =>
  new Promise(async (resolve, reject) => {
    axios
      .get(`https://212.32.226.234/?s=${search}`)
      .then(async (response) => {
        const html = response.data;
        const C = cheerio.load(html);
        const data = [];
        C(
          ".site-content > #container > #content > #primary > #main > article"
        ).each((i, e) => {
          const title = C(e).find(".title > h2").text().trim();
          const img = C(e).find(".content-thumb > img").attr("src");
          const score = C(e).find(".score").text().trim();
          const result = {
            title,
            img,
            score,
          };
          data.push(result);
        });
        if (data.length === 0) {
          const error = {
            error: "Doujin tidak di temukan",
          };
          resolve(error);
        }
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports = doujindesu;
