const axios = require("axios");
const a = async () => {
  const { data } = await axios.get("https://jeane.andikavikar135.repl.co/");
  console.log(data.length);
  const result = [
    {
      a: data.length + 1,
    },
  ];
  axios
    .post("https://jeane.andikavikar135.repl.co/", result)
    .then((result) => {
      process.cwd();
    })
    .catch((err) => {
      console.log(err.message);
    });
};
a().catch((err) => {
  console.log(err.message);
});
