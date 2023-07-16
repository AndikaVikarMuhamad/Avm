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
const doujindesudl = () =>
  new Promise((resolve, reject) => {
    doujindesu("milf")
      .then(async (res) => {
        const { data } = await axios.get(
          "https://212.32.226.234/manga/adeyaka-nursing/"
        );
        // const { data } = await axios.get(pickRandom(res).link);
        // console.log(data);
        const C = cheerio.load(data);
        const datas = [];
        C(".widget_senction")
          .find("li")
          .each((i, e) => {
            const link = C(e).find(".chright > .linkdl > a").attr("href");
          });
        console.log(C);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

module.exports = doujindesu;
// doujindesu("Adeyaka nursing")
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
// doujindesudl();

const doujindl = (link) =>
  new Promise((resolve, reject) => {
    axios
      .get(link)
      .then((response) => {
        const C = cheerio.load(response.data);
        const datas = [];
        C(".main > #anu > img").each((i, e) => {
          const img = C(e).attr("src");
          datas.push(img);
        });
        console.log(response.data);
        console.log(C("#anu").text());
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

// doujindl("https://212.32.226.234/2022/04/28/adeyaka-nursing/");
