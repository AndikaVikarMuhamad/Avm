const axios = require("axios");
const cheerio = require("cheerio");

const kuyhaa = (search) =>
  new Promise((resolve, reject) => {
    axios
      .get(`https://www.kuyhaa-me.com/search/${search}`)
      .then((response) => {
        const html = response.data;
        const C = cheerio.load(html);
        const data = [];
        C("#container > .wrap > #main > #primary > #content > .post").each(
          (i, e) => {
            const title = C(e).find("h2").text().trim();
            const info = C(e).find("p").text().trim();
            const publish = C(e).find(".byline > time").text().trim();
            const category = C(e).find(".byline > .category").text().trim();
            const link = C(e).find("h2 > a").attr("href");
            const result = {
              title,
              info,
              publish,
              category,
              link,
            };
            data.push(result);
          }
        );
        if (data.length === 0) {
          const error = {
            message: "data tidak di temukan",
          };
          reject(error);
        }
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports = kuyhaa;
