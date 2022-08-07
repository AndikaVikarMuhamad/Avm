let axios = require("axios");
let cheerio = require("cheerio");
const fetch = require("node-fetch");
const qs = require("qs");
const request = require("request");
const htmlToText = require("html-to-text");

function cerpen(q, func) {
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
  const url = `http://cerpenmu.com/category/${kategori}/page/${halaman}`;
  request.get(
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64; rv:74.0) Gecko/20100101 Firefox/74.0",
      },
      url: url,
    },
    function (err, res, b) {
      const $ = cheerio.load(b);
      const cerpen = [];
      $('article[class="post"] > h2 > a').each(function (item, err) {
        cerpen[item] = $(this).attr("href");
      });
      const nomorlink = Math.floor(Math.random() * 10);
      const url = cerpen[nomorlink];
      request.get(
        {
          headers: { "content-type": "application/x-www-form-urlencoded" },
          url: url,
        },
        function (err, res, b) {
          const $ = cheerio.load(b);
          const text = htmlToText.fromString($.html(), {
            noLinkBrackets: true,
            ignoreHref: true,
            ignoreImage: true,
          });
          func(text.split("kamu dapat")[0].split("Kontak Kami")[1]);
        }
      );
    }
  );
}

function chara(q) {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://www.anime-planet.com/characters/all?name=${q}`)
      .then(({ data }) => {
        const hasil = [];
        const $ = cheerio.load(data);
        $("#siteContainer > table > tbody > tr").each(function (a, b) {
          result = {
            character: $(b).find("> td.tableCharInfo > a").text(),
            link:
              "https://www.anime-planet.com" +
              $(b).find("> td.tableCharInfo > a").attr("href"),
            thumbnail: $(b)
              .find("> td.tableAvatar > a > img")
              .attr("src")
              .startsWith("https://")
              ? $(b).find("> td.tableAvatar > a > img").attr("src")
              : "https://www.anime.planet.com" +
                $(b).find("> td.tableAvatar > a > img").attr("src"),
          };
          hasil.push(result);
        });
        resolve(hasil);
      })
      .catch(reject);
  });
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = { cerpen, chara };
