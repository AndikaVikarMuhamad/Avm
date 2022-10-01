const axios = require("axios");
const cheerio = require("cheerio");

const adikfilm = (search) =>
  new Promise(async (resolve, reject) => {
    axios
      .get(
        `https://adikfilm.cfd/?s=${search}&post_type%5B%5D=post&post_type%5B%5D=tv`
      )
      .then(async (response) => {
        const html = response.data;
        const C = cheerio.load(html);
        const data = [];
        C(
          ".site > #content > .container > .row > #primary > main > #gmr-main-load > article"
        ).each((i, e) => {
          const title = C(e)
            .find(".gmr-box-content > .item-article > .entry-header > h2")
            .text()
            .trim();
          const genre = C(e)
            .find(
              ".gmr-box-content > .item-article > .entry-header > .gmr-movie-on"
            )
            .text()
            .trim();
          const img = C(e).find("a > img").attr("src");
          const rating = C(e).find(".gmr-rating-item").text().trim();
          const duration = C(e).find(".gmr-duration-item").text().trim();
          const result = {
            title,
            genre,
            img,
            rating,
            duration,
          };
          data.push(result);
        });
        if (data.length === 0) {
          const error = {
            message: "Doujin tidak di temukan",
          };
          reject(error);
        }
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports = adikfilm;
// adikfilm("beast")
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
