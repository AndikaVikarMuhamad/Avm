const express = require("express");
const eru = express();
const port = 3000;
const api = require("./route/api");
const short = require("./route/short");

eru.use(express.static(__dirname + "/public"));
eru.use("/api", api);
eru.use("/short", short);

//     Landing page
eru.get("/", (req, res) => {
  res.sendFile("views/landing.html", { root: __dirname });
});
//     Landing page

eru.get("/tes", (req, res) => {
  const { spawn } = require("child_process");
  const py = spawn("python", ["tes.py"]);
  py.stdout.on("data", (data) => {
    // console.log(data.toString());
    res.send(data.toString());
  });
  py.stderr.on("data", (data) => {
    console.log(`stderr: ${data}`);
  });
  // py.on("close", (code) => {
  //   console.log(`child process exited with code ${code}`);
  // });
});

eru.get("/", (req, res) => {
  res.sendFile("views/landing.html", { root: __dirname });
});
// docs
eru.get("/docs", (req, res) => {
  res.sendFile("views/docs.html", { root: __dirname });
});

// wallpaper
eru.get("/wallpaper", (req, res) => {
  res.sendFile("views/wallpaper.html", { root: __dirname });
});
// 404
eru.use("/", (req, res) => {
  res.status(404);
  res.sendFile("views/404.html", { root: __dirname });
});

eru.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
