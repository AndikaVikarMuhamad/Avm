const axios = require("axios");
const cheerio = require("cheerio");
const request = require("request");

const attp = (q) =>
  new Promise((resolve, reject) => {
    axios
      .get("https://id.bloggif.com/text")
      .then(async (response) => {
        const html = response.data;
        const C = cheerio.load(html);
        const type = C("#middle > .wrapper > #right > #content > form").attr(
          "action"
        );
        const color = [
          "57A7FF",
          "47FF75",
          "97FF4D",
          "EB19FF",
          "000000",
          "FFFFFF",
        ];
        const options = {
          method: "POST",
          url: `https://id.bloggif.com${type}`,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
          },
          formData: {
            target: 1,
            text: q,
            glitter_id: Math.floor(Math.random() * 2821),
            font_id: "elegance",
            size: 50,
            bg_color: color[Math.floor(Math.random() * color.length)],
            transparent: 1,
            border_color: color[Math.floor(Math.random() * color.length)],
            border_width: 2,
            shade_color: color[Math.floor(Math.random() * color.length)],
            shade_width: 1,
            angle: 0,
            text_align: "center",
          },
        };
        request(options, async (err, res, b) => {
          if (err) return new Error(error);
          const C = cheerio.load(b);
          const url = C(
            "#middle > .wrapper > #right > #content > div.box > a"
          ).attr("href");
          const result = {
            url: `https://id.bloggif.com${url}`,
          };
          resolve(result);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
module.exports = attp;
