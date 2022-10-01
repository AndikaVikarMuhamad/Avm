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

const tiktokdlv3 = (url) =>
  new Promise(async (resolve, reject) => {
    axios
      .post("https://ttsave.app/")
      .then((results) => {
        const $ = cheerio.load(results.data);
        const element = $("body > script:nth-child(3)").html();
        const searchToken = element?.search("initToken");
        const token = element?.substring(searchToken + 13).split(`'`)[0];
        const formdata = new FormData();
        formdata.append("id", url);
        formdata.append("token", token);
        formdata.append("mode", "video");
        axios({
          method: "POST",
          url: "https://ttsave.app/id/download.php",
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36",
            ...formdata.getHeaders(),
          },
          data: formdata,
        }).then(({ data }) => {
          const C = cheerio.load(data);
          const result = {
            views: C(
              "body > div.flex.flex-col.items-center.justify-center.mt-2.mb-5 > div.flex.flex-row.items-center.justify-center.gap-2.mt-2 > div:nth-child(1) > span"
            ).text(),
            likes: C(
              "body > div.flex.flex-col.items-center.justify-center.mt-2.mb-5 > div.flex.flex-row.items-center.justify-center.gap-2.mt-2 > div:nth-child(2) > span"
            ).text(),
            comments: C(
              "body > div.flex.flex-col.items-center.justify-center.mt-2.mb-5 > div.flex.flex-row.items-center.justify-center.gap-2.mt-2 > div:nth-child(3) > span"
            ).text(),
            share: C(
              "body > div.flex.flex-col.items-center.justify-center.mt-2.mb-5 > div.flex.flex-row.items-center.justify-center.gap-2.mt-2 > div:nth-child(4) > span"
            ).text(),
            caption: C(
              "body > div.flex.flex-col.items-center.justify-center.mt-2.mb-5 > p.text-gray-600.px-2.text-center.break-all.w-3\\/4"
            ).text(),
            profile: {
              username: C(
                "body > div.flex.flex-col.items-center.justify-center.mt-2.mb-5 > a.font-extrabold.text-blue-400.text-xl.mb-2"
              ).text(),
              name: C(
                "body > div.flex.flex-col.items-center.justify-center.mt-2.mb-5 > div:nth-child(1) > h2"
              ).text(),
              url: C(
                "body > div.flex.flex-col.items-center.justify-center.mt-2.mb-5 > a.font-extrabold.text-blue-400.text-xl.mb-2"
              ).attr("href"),
              img: C(
                "body > div.flex.flex-col.items-center.justify-center.mt-2.mb-5 > a.flex.flex-col.justify-center.items-center > img"
              ).attr("src"),
            },
            sound: {
              title: C(
                "body > div.flex.flex-col.items-center.justify-center.mt-2.mb-5 > div.flex.flex-row.items-center.justify-center.gap-1.mt-5.w-3\\/4 > span"
              ).text(),
              url: C("#button-download-ready > a:nth-child(3)").attr("href"),
            },
            link: {
              nowm: C("#button-download-ready > a:nth-child(1)").attr("href"),
              wm: C("#button-download-ready > a:nth-child(2)").attr("href"),
              thumbnail: C("#button-download-ready > a:nth-child(5)").attr(
                "href"
              ),
            },
          };
          resolve(result);
        });
      })
      .catch((err) => reject(err));
  });

/*
const ttsave = (url) =>
  new Promise(async (resolve, reject) => {
    try {
      const tkn = await axios.get("https://ttsave.app/");
      const C = cheerio.load(tkn.data);
      const element = C("body").find("#container").html();
      // const searchToken = element?.search("initToken");
      // const token = element?.substring(searchToken + 13).split(`'`)[0];
      console.log(element);
    } catch (error) {
      reject(error);
    }
    const tiktokdlv2 = (url) =>
  new Promise(async (resolve, reject) => {
    const gettkn = await axios.get(`https://snaptik.app/en`);
    const tkn = cheerio.load(gettkn.data)("input[name='token']").val();
    const cookie = gettkn.headers["set-cookie"][0].split(";")[0];
    const { data, request } = await axios.get(`https://snaptik.app/abc.php`, {
      method: "GET",
      params: {
        url: url,
        lang: "ID",
        token: tkn,
      },
    });
    // console.log(data);
    var decodeParams = data
      .split("))</script>")[0]
      .split("decodeURIComponent(escape(r))}(")[1]
      ?.split(",")
      ?.map((v) => v.replace(/^"/, "").replace(/"$/, "").trim());
    var decode = await decodeSnap(...decodeParams);
    var result = decode
      .split("; elem.innerHTML = \\'")?.[1]
      .split("\\'; parent.ga(")?.[0]
      ?.replace(/\\(\\)?/g, "");
    var C = cheerio.load(result);
    var snaptik_middle = C(".snaptikvid > div.snaptik-middle");
    var d = C("#download-block > .abuttons").find("a");
    var no_watermark2 = d.eq(1).attr("href");
    var no_watermark = d.eq(0).attr("href");
    var nowm = d.eq(3).attr("href");
    const nick = snaptik_middle.find("h3").text();
    console.log(request);
  });
  });*/

const tiktokdlv4 = (url) =>
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
// tiktokdlv4(
//   "https://www.tiktok.com/@nelfaexe/video/7129545566362619162?is_from_webapp=1&sender_device=pc&web_id=7105016410178356737"
// )
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

module.exports = { tiktokdl, tiktokdlv4, tiktokdlv3 };
// 1663479480.8176
// 1663479560.7845
