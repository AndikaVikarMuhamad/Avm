const axios = require("axios");
const cheerio = require("cheerio");

const sfilemobile = (search) =>
  new Promise((resolve, reject) => {
    axios
      .get(`https://sfile.mobi/search.php?q=${search}&search=Search`)
      .then((response) => {
        const html = response.data;
        const C = cheerio.load(html);
        const data = [];
        C(".w3-content")
          .find(".list")
          .each((i, e) => {
            const link = C(e).find("a").attr("href");
            const title = C(e).find("a").text();
            const result = {
              title,
              link,
            };
            data.push(result);
          });
        if (data.length === 0) {
          const error = {
            message: "Data tidak di temukan",
          };
          reject(error);
        }
        resolve(data);
      })
      .catch((err) => {
        resolve(err);
      });
  });

const sfilemobiledl = (url) =>
  new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        const html = response.data;
        const C = cheerio.load(html);
        const title = C(".w3-content").find("h1").text();
        const link = C(".w3-content").find("#download").attr("href");
        const result = {
          title,
          link,
        };
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports = {
  sfilemobile,
  sfilemobiledl,
};
