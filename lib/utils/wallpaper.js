const cheerio = require("cheerio");
const axios = require("axios");

const { pickRandom } = require("./allfunc");

const swallpaper = (search) =>
  new Promise((resolve, reject) => {
    axios
      .get(`https://wall.alphacoders.com/search.php?search=${search}`)
      .then((response) => {
        const html = response.data;
        const C = cheerio.load(html);
        const data = [];
        C(".thumb-container-big ").each((i, e) => {
          const link = C(e).find("a").attr("href");
          const result = `https://wall.alphacoders.com${link}`;
          data.push(result);
        });
        resolve(pickRandom(data));
      })
      .catch((err) => {
        reject(err);
      });
  });

const wallpaper = (search) =>
  new Promise((resolve, reject) => {
    swallpaper(search)
      .then(async (link) => {
        const response = await axios.get(link);
        const html = response.data;
        const C = cheerio.load(html);
        const img = C(".main-content").attr("src");
        resolve({ img });
      })
      .catch((err) => {
        reject(err);
      });
  });

// wallpaper("anime")
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

module.exports = wallpaper;
