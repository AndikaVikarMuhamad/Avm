const axios = require("axios");
const cheerio = require("cheerio");

const komiku = (search) =>
  new Promise(async (resolve, reject) => {
    axios
      .get(`https://data.komiku.id/cari/?post_type=manga&s=${search}`)
      .then(async (response) => {
        const html = response.data;
        const C = cheerio.load(html);
        const data = [];
        C(".perapih > section > .daftar > .bge").each((i, e) => {
          const title = C(e).find("h3").text().trim();
          const title_id = C(e).find(".judul2").text();
          const spoiler = C(e).find("p").text().replace("\n", "").trim();
          const img = C(e).find("img").attr("data-src");
          const terbaru = C(e)
            .find(":nth-child(5) > a > span:nth-child(2)")
            .text();
          const result = {
            title,
            title_id,
            spoiler,
            img,
            terbaru,
          };
          data.push(result);
        });
        if (data.length === 0) {
          const error = {
            message: "manga tidak di temukan",
          };
          reject(error);
        }
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });

// komiku("one piece").then((res) => {
//   console.log(res);
// });

module.exports = komiku;
