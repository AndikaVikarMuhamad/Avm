const cheerio = require("cheerio");
const axios = require("axios");

const { pickRandom } = require("./allfunc");

const alphacoders = (search) =>
  new Promise(async (resolve, reject) => {
    try {
      const searching = await axios.get(
        `https://wall.alphacoders.com/search.php?search=${search}`
      );
      const list = [];
      const CC = cheerio.load(searching.data);
      CC(".thumb-container-big ").each((i, e) => {
        const link = CC(e).find("a").attr("href");
        const result = `https://wall.alphacoders.com${link}`;
        list.push(result);
      });
      if (list.length >= 1) {
        const { data } = await axios.get(pickRandom(list));
        const C = cheerio.load(data);
        const img = C(".main-content").attr("src");
        resolve({ img });
      } else
        reject({
          message: "Result tidak ditemukan",
        });
    } catch (err) {
      reject(err);
    }
  });
const wallhaven = (search) =>
  new Promise(async (resolve, reject) => {
    try {
      const searching = await axios.get(
        `https://wallhaven.cc/search?q=${search}&categories=110&purity=110&sorting=random&order=desc`
      );
      const list = [];
      const CC = cheerio.load(searching.data);
      CC(".thumb-listing-page > ul > li").each((i, e) => {
        const link = CC(e).find("a").attr("href");
        list.push(link);
      });
      if (list.length >= 1) {
        const { data } = await axios.get(pickRandom(list));
        const C = cheerio.load(data);
        const img = C("#main").find("img").attr("src");
        resolve({ img });
      } else {
        reject({
          message: "Result tidak ditemukan",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
// wallhaven("anime")
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
// alphacoders("anime")
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

module.exports = { wallhaven, alphacoders };
