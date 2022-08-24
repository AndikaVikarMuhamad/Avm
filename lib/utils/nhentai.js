const axios = require("axios");
const Pdf = require("url-pdf");
const { getBuffer } = require("./allfunc");
const fs = require("fs");

const getNhentai = (url) =>
  new Promise(async (resolve, reject) => {
    try {
      const extension = {
        g: "gif",
        j: "jpg",
        p: "png",
      };
      const { data } = await axios.get(url, {
        headers: {
          cookie:
            "cf_chl_2=995f8b195b8cbc2;cf_chl_prog=x15;cf_clearance=7miqp5aVb5RnyVaZc6cEPaQlMNqi6hveVJvmpCNt5Sw-1661256657-0-150;csrftoken=XUR2maFwvSkOXZjkLxyrOG0RhQCUiRqgtDX7uNIoyPE2vj1yDq1HkFvyASBpyl64;sessionid=lrq6toi6bh3j371r6x2vuous3asu2bjs;",
        },
      });
      const gallery = "https://i.nhentai.net/galleries";
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

      const a = ["https://i.nhentai.net/galleries/33035/1.jpg"];
      Pdf(a, "a.pdf");
      const result = {
        title,
        title_eng,
        title_japan,
        language,
        tags,
        img: imageList,
      };
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });

// getNhentai("http://138.2.77.198:3002/api/gallery/416724")
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

const a = async (url) => {
  const data = await getBuffer(url);
  console.log(data);
  fs.writeFileSync("a.png", data);
};
// a("https://i3.nhentai.net/galleries/987560/2.jpg");
