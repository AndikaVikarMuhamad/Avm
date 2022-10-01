const axios = require("axios");
const cheerio = require("cheerio");

const quotes = (input) =>
  new Promise(async (resolve, reject) => {
    try {
      const d = await axios.get(
        "https://jagokata.com/kata-bijak/kata-cinta.html"
      );
      const CC = cheerio.load(d.data);
      const b = CC("#content-container > .paginate > :nth-child(2)").text();
      const c = CC("#content-container > .paginate > :nth-child(3)").text();
      const result = c / b;
      const pages = Math.floor(Math.random() * result + 1);
      const response = await axios.get(
        `https://jagokata.com/kata-bijak/kata-cinta.html?page=${pages}`
      );
      const html = response.data;
      const C = cheerio.load(html);
      const data = [];
      C("#citatenrijen > li").each((i, e) => {
        const author = C(e).find(".auteurfbnaam").text();
        const bio = C(e).find(".auteur-beschrijving").text();
        const quote = C(e).find(".fbquote").text();
        data.push({
          author,
          bio,
          quote,
        });
      });
      const filter = data.filter((item) => item.author !== "");
      resolve(filter);
    } catch (err) {
      reject(err);
    }
  });
// quotes();
module.exports = quotes;
/*
    axios
      .get("https://jagokata.com/kata-bijak/kata-napoleon.html")
      .then((response) => {
        const html = response.data;
        const C = cheerio.load(html);
        const data = [];
        C("#citatenrijen > li").each((i, e) => {
          const author = C(e).find(".auteurfbnaam").text();
          const bio = C(e).find(".auteur-beschrijving").text();
          const quote = C(e).find(".fbquote").text();
          data.push({
            author,
            bio,
            quote,
          });
        });
        const filter = data.filter((item) => item.author !== "");
        console.log(filter);
      })
      .catch((err) => {
        reject(err);
      });*/
// let myHeart = ["ky", "l4"];

// for (let people in myHeart) {
//   myHeart[people] = "Kato megumi";
// }

// console.log(myHeart);
