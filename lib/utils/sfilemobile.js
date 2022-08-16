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
            error: "Data tidak di temukan",
          };
          resolve(error);
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
        const downloaded = C(".w3-content > :nth-child(6)")
          .text()
          .replace("\n", "");
        const uploaded = C(".w3-content > :nth-child(5)")
          .text()
          .replace("\n", "");
        const result = [];
        const data = {
          title,
          link,
          downloaded,
          uploaded,
        };
        result.push(data);
        if (result.length === 0) {
          const error = {
            error: "Data tidak di temukan",
          };
          resolve(error);
        }
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports = { sfilemobile, sfilemobiledl };
