const axios = require("axios");
const cheerio = require("cheerio");
const request = require("request");

const tiktokdl = (url) =>
  new Promise(async (resolve, reject) => {
    const tkn = await axios.get(
      `https://downvideo.quora-wiki.com/tiktok-video-downloader#url=${url}`
    );
    const C = cheerio.load(tkn.data);
    const token = C("#token").val();
    const head = {
      url: url,
      token: token,
    };
    const { data } = await axios.request(
      "https://downvideo.quora-wiki.com/system/action.php",
      {
        method: "post",
        data: new URLSearchParams(Object.entries(head)),
      }
    );
    if (data.medias.length > 0) {
      const title = data.title;
      const thumb = data.thumbnail;
      const media = data.medias;
      const video = media.find((media) => media.quality === "hd");
      const audio = media.find((media) => media.extension === "mp3");
      const result = {
        title,
        thumb,
        video: video.url,
        audio: audio.url,
      };
      resolve(result);
    } else {
      reject({
        error: "No media found",
      });
    }
  });

// tiktokdl(
//   "https://www.tiktk.com/@nelfaexe/video/7129545566362619162?is_from_webapp=1&sender_device=pc&web_id=7105016410178356737"
// )
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
