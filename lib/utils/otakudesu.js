const axios = require("axios");
const cheerio = require("cheerio");

const otakudesu = (search) =>
  new Promise(async (resolve, reject) => {
    axios
      .get(`https://otakudesu.video/?s=${search}&post_type=anime`)
      .then(async (response) => {
        const html = response.data;
        const C = cheerio.load(html);
        const data = [];
        C(
          ".wowmaskot  > #venkonten > .vezone > .venser > .venutama > .page > .chivsrc > li"
        ).each((i, e) => {
          const title = C(e).find("h2").text().trim();
          const link = C(e).find("h2 > a").attr("href");
          const img = C(e).find("img").attr("src");
          const genre = C(e)
            .find(":nth-child(3)")
            .text()
            .replace("Genres", "")
            .replace(":", "")
            .trim();
          const score = C(e)
            .find(":nth-child(5)")
            .text()
            .replace("Rating", "")
            .replace("Shounen", "")
            .replace("School", "")
            .replace(":", "")
            .replace("Romance", "")
            .replace("Supernatural", "")
            .replace("Magic", "")
            .replace("Ecchi", "")
            .replace("Seinen", "")
            .replace("Harem", "")
            .replace("Slice of Life", "")
            .replace("Drama", "")
            .replace("Shoujo", "")
            .trim();
          // const link = C(e).find("a").attr("href");
          const status = C(e)
            .find(":nth-child(4)")
            .text()
            .replace("Status", "")
            .replace(":", "")
            .replace("Shounen", "")
            .replace("School", "")
            .replace("Romance", "")
            .replace("Supernatural", "")
            .replace("Magic", "")
            .replace("Ecchi", "")
            .replace("Seinen", "")
            .replace("Harem", "")
            .replace("Slice of Life", "")
            .replace("Drama", "")
            .replace("Shoujo", "")
            .trim();
          const result = {
            title,
            img,
            genre,
            score,
            status,
            link,
          };
          data.push(result);
        });
        if (data.length === 0) {
          const error = {
            message: "Anime tidak di temukan",
          };
          reject(error);
        }
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
const otakudesudl = (url) =>
  new Promise(async (resolve, reject) => {
    axios
      .get(url)
      .then(async (response) => {
        const html = response.data;
        const C = cheerio.load(html);
        const title = C("#venkonten").find("h1").text().trim();
        const low = C("#venkonten")
          .find("li:nth-child(1) > a:nth-child(2)")
          .attr("href");
        const medium = C("#venkonten")
          .find("li:nth-child(2) > a:nth-child(2)")
          .attr("href");
        const high = C("#venkonten")
          .find("li:nth-child(2) > a:nth-child(2)")
          .attr("href");
        const result = {
          title,
          low,
          medium,
          high,
        };
        resolve(result);
        // console.log(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
module.exports = { otakudesu, otakudesudl };
