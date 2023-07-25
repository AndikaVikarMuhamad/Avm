const axios = require("axios");
const cheerio = require("cheerio");

const komiku = (search) =>
  new Promise(async (resolve, reject) => {
    axios
      .get(`https://data.komiku.id/cari/?post_type=manga&s=${search}`)
      .then(async (response) => {
        const html = response.data;
        const C = cheerio.load(html);
        const data = [];
        C(".perapih > section > .daftar > .bge").each((i, e) => {
          const title = C(e).find("h3").text().trim();
          const title_id = C(e).find(".judul2").text();
          const spoiler = C(e).find("p").text().replace("\n", "").trim();
          const img = C(e).find("img").attr("data-src");
          const link = C(e).find(".kan > a").attr("href");
          const terbaru = C(e)
            .find(":nth-child(5) > a > span:nth-child(2)")
            .text();
          const result = {
            title,
            title_id,
            spoiler,
            img,
            link,
            terbaru,
          };
          data.push(result);
        });
        if (data.length === 0) {
          const error = {
            message: "manga tidak di temukan",
          };
          reject(error);
        }
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
const komikudl = (url) =>
  new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        const html = response.data;
        const C = cheerio.load(html);
        const title = C("#Judul > h1").text().trim();
        const img = [];
        C("#Baca_Komik > img").each((i, e) => {
          img.push(C(e).attr("src"));
        });
        const result = {
          title,
          img,
        };
        resolve(result);
      })
      .catch((err) => {
        resolve(err);
      });
  });
// komiku("one piece").then((res) => {
//   console.log(res);
// });
const komikudetail = (url) =>
  new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        const html = response.data;
        const C = cheerio.load(html);
        // Gtw cara yang gampangnya gimamana :v
        const title = C("#Judul > :nth-child(1)").text().trim();
        const title_id = C("#Judul > :nth-child(2)").text().trim();
        const sinopsis = C("p.desc").text().trim();
        const img = C(".ims > img").attr("src");
        const komikus = C(
          "#Informasi > table.inftable > tbody > :nth-child(4) > :nth-child(2)"
        )
          .text()
          .trim();
        const status = C(
          "#Informasi > table.inftable > tbody > :nth-child(5) > :nth-child(2)"
        )
          .text()
          .trim();
        const jenis = C(
          "#Informasi > table.inftable > tbody > :nth-child(2) > :nth-child(2)"
        )
          .text()
          .trim();
        const genres = [];
        C("ul.genre > li").each((i, e) => {
          genres.push(C(e).text());
        });
        const lel = [];
        C("#Daftar_Chapter > tbody > tr").each((i, e) => {
          const chapter = C(e).find(".judulseries > a").attr("title");
          const link =
            "https://komiku.id" + C(e).find(".judulseries > a").attr("href");
          const upload_date = C(e).find(".tanggalseries").text().trim();
          lel.push({ chapter, upload_date, link });
        });
        const chapter_list = lel.filter((v) => v.chapter != undefined);
        const result = {
          title,
          title_id,
          jenis,
          status,
          komikus,
          img,
          sinopsis,
          genres,
          chapter_list,
        };
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
module.exports = { komiku, komikudl, komikudetail };
