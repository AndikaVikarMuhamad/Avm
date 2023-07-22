const axios = require("axios");
const cheerio = require("cheerio");
const { pickRandom } = require("./allfunc");

const doujindesu = (search) =>
  new Promise(async (resolve, reject) => {
    axios
      .get(`https://212.32.226.234/?s=${search}`)
      .then(async (response) => {
        const html = response.data;
        const C = cheerio.load(html);
        const data = [];
        C("article").each((i, e) => {
          const title = C(e).find(".title").text().trim();
          const img = C(e).find("img").attr("src");
          const score = C(e).find(".score").text().trim();
          const link = C(e).find("a").attr("href");
          const type = C(e).find(".type").text().trim();
          const result = {
            title,
            type,
            score,
            img,
            link: `https://212.32.226.234${link}`,
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
const doujindesudl = (url) =>
  new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(async (response) => {
        const html = response.data;
        const title = cheerio.load(html)("h1").text();
        const id = cheerio.load(html)("#reader").attr("data-id");
        const { data } = await axios(
          "https://212.32.226.234/themes/ajax/ch.php",
          {
            method: "POST",
            headers: {
              Referer: "https://212.32.226.234/",
              "Content-Type": "application/x-www-form-urlencoded",
            },
            data: new URLSearchParams(
              Object.entries({
                id: id,
              })
            ),
          }
        );
        const C = cheerio.load(data);
        const img = [];
        C("img").each((i, e) => {
          img.push(C(e).attr("src"));
        });
        const result = { title, img };
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports = { doujindesu, doujindesudl };
// doujindesu("Adeyaka nursing")
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
// doujindesudl();
