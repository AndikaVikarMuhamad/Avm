// const axios = require("axios");
// const cheerio = require("cheerio");

// const ytdl = (url) =>
//   new Promise(async (resolve, reject) => {
//     const ytIdRegex =
//       /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/;
//     const ytId = ytIdRegex.exec(url);
//     const id = "https://youtu.be/" + ytId[1];
//     let formdata = {
//       id,
//       q_auto: 0,
//       ajax: 1,
//     };
//     let status = await axios.post(
//       "https://www.y2mate.com/mates/en68/analyze/ajax",
//       {
//         headers: {
//           accept: "*/*",

//           "accept-language": "en-US,en;q=0.9",

//           "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//         },
//         body: new URLSearchParams(Object.entries(formdata)),
//       }
//     );
//     console.log(status);
//   });

// ytdl("https://www.youtube.com/watch?v=TFHCew8DnC0&list=RDZGgRsQACsok&index=2");
