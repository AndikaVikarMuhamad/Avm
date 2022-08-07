AOS.init({
  once: true,
  duration: 1000,
});

const today = new Date();
const date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
// const day = document.querySelector(".day");
// const month = document.querySelector(".month");
// month.innerHtml = today.getMonth() + 1;
// const hari = document.querySelector(".today-date");
//document.querySelector(".today-date").innerHTML = date;
document.querySelector(".month").innerHTML = today.getMonth() + 1;
document.querySelector(".day").innerHTML = today.getDate();
console.log(date);
