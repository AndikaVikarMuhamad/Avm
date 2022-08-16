let axios = require("axios");
let cheerio = require("cheerio");

const chara = (search) =>
  new Promise((resolve, reject) => {
    axios
      .get(
        `https://www.anime-planet.com/characters/all?sort=likes&order=desc&name=${search}`
      )
      .then((response) => {
        const html = response.data;
        const C = cheerio.load(html);
        const data = [];
        C("#siteContainer >table > tbody > tr").each((i, el) => {
          const name = C(el).find(".name").text();
          const img = C(el).find("img").attr("src");
          const gender = C(el)
            .find(".tableCharInfo > :nth-child(2) > ul > :nth-child(1) > a")
            .text();
          const haircolor = C(el)
            .find(".tableCharInfo > :nth-child(2) > ul > :nth-child(2) > a")
            .text()
            .replace("Hair", "")
            .trim();
          const result = {
            name,
            img,
            gender,
            haircolor,
          };
          data.push(result);
        });
        if (data.length === 0) {
          const name = C("#siteContainer > h1").text();
          const img = C(".mainEntry").find("img").attr("src");
          const gender = C("section.entryBar > :nth-child(1)")
            .text()
            .replace("Gender: ", "")
            .trim();
          const haircolor = C("section.entryBar > :nth-child(2)")
            .text()
            .replace("Hair Color: ", "")
            .trim();
          const result = {
            name,
            img,
            gender,
            haircolor,
          };
          resolve(result);
        }
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports = chara;
