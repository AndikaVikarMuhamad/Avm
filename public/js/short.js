// const input = document.querySelector(".search-bar");
const input = document.querySelector(".short-button");
const link = document.querySelector(".search-bar");
const short = document.querySelector(".short");
const old = document.querySelector(".link-old");
const muncul = document.querySelector(".link");

input.onclick = async () => {
  fetch(`/short/create?url=${link.value}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const error = data.error;
      if (error) {
        muncul.classList.remove("hide");
        short.innerHTML = data.error;
      } else {
        muncul.classList.remove("hide");
        short.innerHTML = data.link;
        short.href = data.link;
      }
    });

};
link.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    input.click();
  }
});
