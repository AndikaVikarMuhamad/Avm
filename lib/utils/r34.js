const axios = require("axios");

const { pickRandom } = require("./allfunc");

// const tes = () => {
//   axios
//     .get("https://rule34.xxx/index.php?page=post&s=list&tags=mother")
//     .then((response) => {
//       const html = response.data;
//       const C = cheerio.load(html);
//       const data = [];
//       C(".image-list > .thumb").each((i, e) => {
//         const a = C(e).find("a").attr("href");
//         console.log(a);
//       });
//       // console.log(html);
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// };
const r34 = (tags, rating = "Questionable") =>
  new Promise((resolve, reject) => {
    axios
      .get(
        `https://rule34.xxx?page=dapi&s=post&q=index&limit=100&tags=${encodeURI(
          `${tags}+rating:${rating}`
        )}&json=1`
      )
      .then((response) => {
        const res = pickRandom(response.data);
        // console.log(res);
        if (!res) {
          reject({
            status: false,
            message: "Not Found",
          });
        }
        resolve({
          status: true,
          img: res.file_url,
          tags: res.tags,
          source: res.source,
          upload_by: res.owner,
        });
      })
      .catch((err) => {
        reject(err.message);
      });
  });

// tes("pregnant")
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
module.exports = r34;
