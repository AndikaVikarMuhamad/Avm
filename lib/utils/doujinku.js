const axios = require("axios");
const cheerio = require("cherio");

const doujinkudl = (url) =>
  new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        const html = response.data;
        const startTag = "<script>ts_reader.run(";
        const endTag = "});</script>";
        const startIndex = html.indexOf(startTag) + startTag.length;
        const endIndex = html.indexOf(endTag) + 1;
        const data = html.substring(startIndex, endIndex);
        const img = JSON.parse(data).sources;
        resolve(img);
      })
      .catch((err) => {
        reject(err);
      });
  });

const doujinkusearch = (query) =>
  new Promise((resolve, reject) => {
    axios
      .get(`https://doujinku.co/?s=${query}`)
      .then((response) => {
        const html = response.data;
        const C = cheerio.load(html);
        const data = [];
        C(".listupd > .bs").each((i, e) => {
          const title = C(e).find(".tt").text().trim();
          const rating = C(e).find(".numscore").text();
          const img = C(e).find("img").attr("src");
          const link = C(e).find("a").attr("href");
          const result = {
            title,
            rating,
            link,
            img,
          };
          data.push(result);
        });
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });

const doujinkudetail = (url) =>
  new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        const html = response.data;
        const C = cheerio.load(html);
        const title = C("h1.entry-title").text();
        const alt_title = C(".infox > :nth-child(3) > span").text();
        const synopis = C(".entry-content > p").text();
        const released = Number(
          C(".infox > :nth-child(5) > :nth-child(1) > span").text().trim()
        );
        const author = C(".infox > :nth-child(5) > :nth-child(2) > span")
          .text()
          .trim();
        const updated_on = C(".infox > :nth-child(8) > :nth-child(2) > span")
          .text()
          .trim();
        const genres = [];
        C(".infox > :nth-child(9) > .mgen > a").each((i, e) => {
          genres.push(C(e).text());
        });
        const chapter_list = [];
        C(".eplister#chapterlist > ul > li").each((i, e) => {
          const chapter = C(e).find(".chapternum").text();
          const upload_date = C(e).find(".chapterdate").text();
          const link = C(e).find("a").attr("href");
          chapter_list.push({ chapter, upload_date, link });
        });
        const result = {
          title,
          alt_title,
          synopis,
          released,
          author,
          updated_on,
          genres,
          chapter_list,
        };
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports = { doujinkudl, doujinkudetail, doujinkusearch };
