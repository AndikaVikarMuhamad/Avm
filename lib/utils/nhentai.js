const axios = require("axios");
const extension = {
  g: "gif",
  j: "jpg",
  p: "png",
};

const getNhentai = (code) =>
  new Promise((resolve, reject) => {
    axios
      .get(`http://138.2.77.198:3002/api/gallery/${code}`, {
        headers: {
          cookie:
            "cf_chl_2=995f8b195b8cbc2;cf_chl_prog=x15;cf_clearance=7miqp5aVb5RnyVaZc6cEPaQlMNqi6hveVJvmpCNt5Sw-1661256657-0-150;csrftoken=XUR2maFwvSkOXZjkLxyrOG0RhQCUiRqgtDX7uNIoyPE2vj1yDq1HkFvyASBpyl64;sessionid=lrq6toi6bh3j371r6x2vuous3asu2bjs;",
        },
      })
      .then((response) => {
        const data = response.data;
        const gallery =
          "https://external-content.duckduckgo.com/iu/?u=https://i.nhentai.net/galleries";
        const img = data.images.pages;
        const images = Object.keys(img).map((key) => img[parseInt(key)].t);
        const imageList = [];
        for (let i = 0; i < images.length; i++) {
          const link = `${gallery}/${data.media_id}/${i + 1}.${
            extension[images[i]]
          }`;
          imageList.push(link);
        }
        const title = data.title.pretty;
        const title_eng = data.title.english;
        const title_japan = data.title.japanese;

        const tag = data.tags;
        const tags = Object.keys(tag).map((key) => tag[parseInt(key)].name);
        const languages = tag.find((tag) => tag.type === "language");
        const language = languages ? languages.name : "";

        const result = {
          title,
          title_eng,
          title_japan,
          language,
          tags,
          img: imageList,
        };
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });

const getRandom = () =>
  new Promise(async (resolve, reject) => {
    try {
      const end = 1234;
      const start = 567890;
      const random = Math.floor(Math.random() * (end - start + 1)) + start;
      const hentai = await getNhentai(random);
      resolve(hentai);
    } catch (error) {
      const end = 1234;
      const start = 567890;
      const random = Math.floor(Math.random() * (end - start + 1)) + start;
      const hentai = await getNhentai(random);
      resolve(hentai);
    }
  });
module.exports = { getNhentai, getRandom };
