// const axios = require("axios");
// const cheerio = require("cheerio");

// const otakudesudl = (url) =>
//   new Promise(async (resolve, reject) => {
//     axios
//       .get(url)
//       .then(async (response) => {
//         const html = response.data;
//         const C = cheerio.load(html);
//         const title = C("#venkonten").find("h1").text().trim();
//         const low = C("#venkonten")
//           .find("li:nth-child(1) > a:nth-child(2)")
//           .attr("href");
//         const medium = C("#venkonten")
//           .find("li:nth-child(2) > a:nth-child(2)")
//           .attr("href");
//         const high = C("#venkonten")
//           .find("li:nth-child(2) > a:nth-child(2)")
//           .attr("href");
//         const result = {
//           title,
//           low,
//           medium,
//           high,
//         };
//         if (data.length === 0) {
//           const error = {
//             message: "data tidak di temukan",
//           };
//           reject(error);
//         }
//         resolve(result);
//         // console.log(result);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });

// module.exports = otakudesudl;
