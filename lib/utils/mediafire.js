const axios = require("axios");
const cheerio = require("cheerio");
const urlExist = require("url-exist");

const mediafire = (search) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${search}`)
      .then(async (response) => {
        const html = response.data;
        const C = cheerio.load(html);
        const link = C("#downloadButton").attr("href");
        const link2 = C("#download_link > a.retry").attr("href");
        const size = C(".dl-info")
          .find(".details > :nth-child(1) > span")
          .text();
        const uploaded = C(".dl-info")
          .find(".details > :nth-child(2) > span")
          .text();
        const filetype = C(".dl-info")
          .find(".filetype > :nth-child(2)")
          .text()
          .replace("(", "")
          .replace(")", "")
          .replace(".", "");
        const name = C(".dl-info").find(".filename").text();
        const result = {
          name,
          link,
          link2,
          size,
          uploaded,
          filetype,
        };
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });

// mediafire(
//   "https://www.mediafir.com/file/pwxob70rpgma9lz/GBWhatsApp_v8.75%2528Tutorial_Yud%2529.apk/file"
// )
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

module.exports = mediafire;
