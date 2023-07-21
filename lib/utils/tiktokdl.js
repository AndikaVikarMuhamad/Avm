const axios = require("axios");
const cheerio = require("cheerio");
const FormData = require("form-data");

const tiktokdl = (url) =>
  new Promise(async (resolve, reject) => {
    try {
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
          message: "No media found",
        });
      }
    } catch (err) {
      reject(err);
    }
  });

const tiktokdlv2 = (url) =>
  new Promise(async (resolve, reject) => {
    axios
      .post(`https://api.tikmate.app/api/lookup?url=${url}`)
      .then((response) => {
        const raw = response.data;
        const result = {
          author: raw.author_name + " (@" + raw.author_id + ")",
          publish: raw.create_time,
          likes: raw.like_count,
          comments: raw.comment_count,
          shares: raw.share_count,
          videoSD:
            "https://tikmate.app/download/" + raw.token + "/" + raw.id + ".mp4",
          videoHD:
            "https://tikmate.app/download/" +
            raw.token +
            "/" +
            raw.id +
            ".mp4?hd=1",
        };
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });

const tiktokdlv3 = (url) =>
  new Promise((resolve, reject) => {
    axios
      .get("https://ttsave.app/download-tiktok-slide")
      .then(async (response) => {
        const html = response.data;
        const startTag = "axios.post('";
        const endTag = "', {";
        const startIndex = html.indexOf(startTag) + startTag.length;
        const endIndex = html.indexOf(endTag);
        const tkn = html.substring(startIndex, endIndex);
        const { data } = await axios
          .post(tkn, {
            id: url,
          })
          .catch(reject);
        const C = cheerio.load(data);
        const nickname = C("h2.font-extrabold.text-xl.text-center").text();
        const desc = C("p.text-gray-600.px-2").text().trim();
        const views = C(
          "div.flex.flex-row.items-center.justify-center > :nth-child(1) > span"
        ).text();
        const likes = C(
          "div.flex.flex-row.items-center.justify-center > :nth-child(2) > span"
        ).text();
        const comments = C(
          "div.flex.flex-row.items-center.justify-center > :nth-child(3) > span"
        ).text();
        const saved = C(
          "div.flex.flex-row.items-center.justify-center > :nth-child(4) > span"
        ).text();
        const shares = C(
          "div.flex.flex-row.items-center.justify-center > :nth-child(5) > span"
        ).text();
        const temp = [];
        C("#button-download-ready > a ").each((i, e) => {
          temp.push(C(e).attr("href"));
        });
        let result = {
          nickname,
          desc,
          views,
          likes,
          comments,
          saved,
          shares,
        };
        if (temp.length < 3) {
          result.type = "video";
          result.no_wm = temp[0];
          result.wm = temp[1];
        } else {
          let images = [];
          const img = temp.filter((v) => /jpeg/.test(v));
          for (let i = 0; i < img.length - 1; i++) {
            images.push(img[i]);
          }
          const mp3 = temp.filter((v) => /mp3/.test(v))[0];
          result.type = "slide";
          result.images = images;
          result.mp3 = mp3;
        }
        if (!desc && !views) {
          reject({
            message: "Not found :D",
          });
        }
        resolve(result);
      })
      .catch((err) => {
        resolve(err);
      });
  });
// tiktokdlv5("https://www.tiktok.com/@cekala/video/7251823389374041345")
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

module.exports = { tiktokdl, tiktokdlv2, tiktokdlv3 };
// 1663479480.8176
// 1663479560.7845
// https://www.tiktok.com/@cekala/video/7218930293556743430
// https://www.tiktok.com/@cekala/video/7251823389374041345 <--- Slide
