const axios = require("axios");

const pickRandom = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};
const search = (array, key, value) => {
  return array.filter((object) => {
    return object[key] === value;
  });
};
const getBuffer = async (url, options) => {
  try {
    options ? options : {};
    const res = await axios({
      method: "get",
      url,
      headers: {
        DNT: 1,
        "Upgrade-Insecure-Request": 1,
      },
      ...options,
      responseType: "arraybuffer",
    });
    return res.data;
  } catch (err) {
    console.log(`Error : ${err}`);
  }
};

module.exports = { pickRandom, search, getBuffer };
