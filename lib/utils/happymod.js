const axios = require("axios");
const cheerio = require("cheerio");

const happymod = (search) =>
  new Promise((resolve, reject) => {
    axios
      .get(`https://happymod.com/search.html?q=${search}`)
      .then(async (response) => {
        const html = response.data;
        const C = cheerio.load(html);
        const data = [];
        C(".container-left > section").each((i, el) => {
          const title = C(el).find("h3").text();
          const img = C(el)
            .find(".pdt-app-box > a > img")
            .attr("data-original");
          const rating = C(el).find(".a-search-num").text();
          const result = {
            title,
            img,
            rating,
          };
          data.push(result);
          //   console.log(result);
        });
        if (data.length === 0) {
          const error = {
            message: "apk tidak di temukan",
          };
          reject(error);
        }
        resolve(data);
      })
      .catch(reject);
  });
module.exports = happymod;
