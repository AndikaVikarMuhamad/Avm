const body = document.querySelector("body");
const img = document.getElementById("myimg");
const bg = [
  {
    color: "#aff0e4",
    image: "assets/404_1.gif",
  },
  {
    color: "#000000",
    image: "assets/404_2.gif",
  },
  {
    color: "#ffffff",
    image: "assets/404_3.gif",
  },
  {
    color: "#14aa84",
    image: "assets/404_4.gif",
  },
  {
    color: "#eae9e8",
    image: "assets/404_5.gif",
  },
  {
    color: "#f4aaaa",
    image: "assets/404_6.gif",
  },
  {
    color: "#e9fe6f",
    image: "assets/404_7.gif",
  },
];
const background = bg[Math.floor(Math.random() * bg.length)];
body.style.backgroundColor = `${background.color}`;
img.src = `${background.image}`;
console.log(background);
