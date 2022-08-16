const body = document.querySelector("body");
const img = document.getElementById("myimg");
const bg = [
  {
    color: "#aff0e4",
    image:
      "https://cdn.discordapp.com/attachments/959416699461963837/1008570465599639592/404_1.gif",
  },
  {
    color: "#000000",
    image:
      "https://cdn.discordapp.com/attachments/959416699461963837/1008570831611375646/404_2.gif",
  },
  {
    color: "#ffffff",
    image:
      "https://cdn.discordapp.com/attachments/959416699461963837/1008570832156639322/404_3.gif",
  },
  {
    color: "#14aa84",
    image:
      "https://cdn.discordapp.com/attachments/959416699461963837/1008570832492167199/404_4.gif",
  },
  {
    color: "#eae9e8",
    image:
      "https://cdn.discordapp.com/attachments/959416699461963837/1008570832949350541/404_5.gif",
  },
  {
    color: "#f4aaaa",
    image:
      "https://cdn.discordapp.com/attachments/959416699461963837/1008570833259741245/404_6.gif",
  },
  {
    color: "#e9fe6f",
    image:
      "https://cdn.discordapp.com/attachments/959416699461963837/1008570833540751513/404_7.gif",
  },
];
const background = bg[Math.floor(Math.random() * bg.length)];
body.style.backgroundColor = `${background.color}`;
img.src = `${background.image}`;
console.log(background);
