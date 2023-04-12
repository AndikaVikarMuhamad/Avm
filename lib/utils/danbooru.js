const axios = require("axios");
const cheerio = require("cherio");
const { pickRandom } = require("./allfunc");

// Gtw caramya supaya ga ribet nya
// tapi ini cara ribet nya
// males mikir cara cepet awokaoawkok
// explicit
// safe
// questionable

const danbooru = (tags, rating = "questionable") =>
  new Promise((resolve, reject) => {
    axios
      .get(
        `https://danbooru.donmai.us/posts?tags=rating%3A${rating}+${tags}&z=5`
      )
      .then(async (response) => {
        const html = response.data;
        const C = cheerio.load(html);
        const get_pages = C(
          ".paginator.numbered-paginator > :nth-child(8)"
        ).text();
        let pages;
        if (Number(get_pages) >= 1000) {
          pages = Math.floor(Math.random() * 1000);
        } else if (Number(get_pages) <= 1000) {
          pages = Math.floor(Math.random() * Number(get_pages));
        } else {
          reject({
            message: "Not found",
          });
        }

        const { data } = await axios.get(
          `https://danbooru.donmai.us/posts?page=${pages}&tags=rating%3A${rating}+${tags}`
        );
        const CC = cheerio.load(data);
        const datas = [];
        CC("article").each((i, e) => {
          const img = C(e).find("a").attr("href");
          datas.push(`https://danbooru.donmai.us` + img);
        });
        const result = pickRandom(datas);
        const ajg = await axios.get(result);
        const CCC = cheerio.load(ajg.data);
        const img = CCC("#content > .image-container > picture")
          .find("img")
          .attr("src");
        resolve({
          link: result,
          img,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
module.exports = danbooru;

// danbooru("milf")
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
