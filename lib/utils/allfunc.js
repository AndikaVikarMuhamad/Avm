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
async function decodeSnap(...args) {
  /*
   * referensi https://github.com/bochilteam
   */
  function _0xe78c(d, e, f) {
    var g =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/".split(
        ""
      );
    var h = g.slice(0, e);
    var i = g.slice(0, f);
    var j = d
      .split("")
      .reverse()
      .reduce(function (a, b, c) {
        if (h.indexOf(b) !== -1) return (a += h.indexOf(b) * Math.pow(e, c));
      }, 0);
    var k = "";
    while (j > 0) {
      k = i[j % f] + k;
      j = (j - (j % f)) / f;
    }
    return k || "0";
  }

  function _0xc60e(h, u, n, t, e, r) {
    r = "";
    for (var i = 0, len = h.length; i < len; i++) {
      var s = "";
      while (h[i] !== n[e]) {
        s += h[i];
        i++;
      }
      for (var j = 0; j < n.length; j++) {
        s = s.replace(new RegExp(n[j], "g"), j.toString());
      }
      r += String.fromCharCode(_0xe78c(s, e, 10) - t);
    }
    return decodeURIComponent(encodeURIComponent(r));
  }
  return _0xc60e(...args);
}

module.exports = { pickRandom, search, getBuffer, decodeSnap };
