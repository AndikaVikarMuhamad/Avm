const htmlToText = require("html-to-text");
const cheerio = require("cheerio");
const axios = require("axios");
const { pickRandom } = require("./allfunc");

const cerpen = (q, func) =>
  new Promise((resolve, reject) => {
    for (var i in q) {
      func(i, q[i]);
    }
    const tema = [
      "cerpen-bahasa-inggris",
      "cerpen-cinta",
      "cerpen-cinta-dalam-hati-terpendam",
      "cerpen-persahabatan",
      "cerpen-kisah-nyata",
      "cerpen-pendidikan",
      "cerpen-jepang",
      "cerpen-gokil",
      "cerpen-patah-hati",
      "cerpen-renungan",
    ];
    const kategori = pickRandom(tema);
    const halaman = Math.floor(Math.random() * 30);
    axios
      .get(`http://cerpenmu.com/category/${kategori}/page/${halaman}`, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
        },
      })
      .then((response) => {
        const html = response.data;
        const C = cheerio.load(html);
        C("#content > article").each(async (i, el) => {
          const link = C(el).find("h2 > a").attr("href");
          const { data } = await axios.get(link);
          const CC = cheerio.load(data);
          const text = htmlToText.fromString(CC.html(), {
            noLinkBrackets: true,
            ignoreHref: true,
            ignoreImage: true,
          });
          const result = text
            .split("kamu dapat")[0]
            .split("Kontak Kami")[1]
            .trim();
          resolve(result);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports = cerpen;
