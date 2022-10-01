const Canvas = require("canvas");
const fs = require("fs");

Canvas.registerFont("./assets/font/edosz.ttf", { family: "edosz" });
Canvas.registerFont("./assets/font/peteroy.ttf", { family: "peteroy" });
Canvas.registerFont("./assets/font/Minecraft.ttf", { family: "minecraft" });

const welcome = (img, nama, groupname) =>
  new Promise(async (resolve, reject) => {
    try {
      const bg = await Canvas.loadImage("./assets/img/welcome.jpg");
      const pp = await Canvas.loadImage(img);
      const name = nama.length > 12 ? nama.slice(0, 12) + "" : nama;
      const canvas = Canvas.createCanvas(1280, 720);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(bg, 0, 0, 1280, 720);
      ctx.drawImage(pp, 416, 137, 445, 445);
      ctx.textAlign = "center";
      ctx.font = '40px "edosz"';
      ctx.fillText(name, 640, 630);
      ctx.font = '60px "edosz"';
      ctx.fillStyle = "#151c1a";
      ctx.fillText(`selamat datang di ${groupname}`, 640, 70);
      resolve(canvas.toBuffer());
    } catch (err) {
      reject(err);
    }
  });

const welcomev2 = (img, nama) =>
  new Promise(async (resolve, reject) => {
    try {
      const bg = await Canvas.loadImage("./assets/img/welcome2.jpg");
      const pp = await Canvas.loadImage(img);
      const name = nama.length > 20 ? nama.slice(0, 20) + "" : nama;
      const canvas = Canvas.createCanvas(680, 336);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(bg, 0, 0, 680, 336);
      ctx.save();
      ctx.beginPath();
      ctx.arc(340, 118, 90, 0, Math.PI * 2, true);
      ctx.stroke();
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(pp, 240, 28, 200, 200);
      ctx.restore();
      ctx.textAlign = "center";
      // ctx.font = '40px "Unitalic"';
      ctx.font = "40px brush";
      ctx.fillStyle = "#000";
      ctx.fillText(name, 340, 290);
      resolve(canvas.toBuffer());
    } catch (err) {
      reject(err);
    }
  });

module.exports = {
  welcome,
  welcomev2,
};

// welcomev2(
//   "https://pict.sindonews.net/dyn/360/pena/news/2022/05/15/700/769971/6-serial-anime-yang-produksinya-dibuat-2-studio-berbeda-ayl.jpg",
//   "123456789012345678901234567890"
// )
//   .then((img) => {
//     console.log(img);
//     fs.writeFileSync("./welcome.png", img);
//   })
//   .catch((err) => console.log(err));
// const name = "andika";
// // console.log(name.slice(0, 2));
// console.log(name.split("\n"));
