const Canvas = require("canvas");
const { exec } = require("child_process");
const fs = require("fs");

const gay = (link) =>
  new Promise(async (resolve, reject) => {
    try {
      const bg = await Canvas.loadImage("./assets/img/gay.png");
      const img = await Canvas.loadImage(link);
      const canvas = Canvas.createCanvas(480, 480);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, 480, 480);
      ctx.drawImage(bg, 0, 0, 480, 480);
      resolve(canvas.toBuffer());
    } catch (err) {
      reject(err);
    }
  });

const ads = (link) =>
  new Promise(async (resolve, reject) => {
    try {
      const bg = await Canvas.loadImage("./assets/img/ad.png");
      const img = await Canvas.loadImage(link);
      const canvas = Canvas.createCanvas(550, 474);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 150, 75, 230, 230);
      ctx.drawImage(bg, 0, 0, 550, 474);
      resolve(canvas.toBuffer());
    } catch (err) {
      reject(err);
    }
  });

const jail = (link) =>
  new Promise(async (resolve, reject) => {
    try {
      const bg = await Canvas.loadImage("./assets/img/jail.png");
      const img = await Canvas.loadImage(link);
      const canvas = Canvas.createCanvas(500, 500);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, 500, 500);
      ctx.drawImage(bg, 0, 0, 500, 500);
      resolve(canvas.toBuffer());
    } catch (err) {
      reject(err);
    }
  });

const affect = (link) =>
  new Promise(async (resolve, reject) => {
    try {
      const bg = await Canvas.loadImage("./assets/img/affect.png");
    } catch (err) {
      reject(err);
    }
  });
// affect();
// jail("https://i.imgur.com/m2rLEIo.jpeg")
//   .then((result) => {
//     console.log(result);
//     fs.writeFileSync("./tes.png", result);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
// const a = () => {
//   return !0;
// };
// const b = affect();
// console.log(a());
