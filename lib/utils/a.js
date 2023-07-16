const { default: axios } = require("axios");

const a = () => {
  axios("https://sd.nigga.no/render", {
    method: "POST",
  })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
};
a();
