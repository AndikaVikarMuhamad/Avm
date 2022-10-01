// Config
const dotenv = require("dotenv");
dotenv.config();
const myurl = process.env.Baseurl;

//All node modules
// Main module
const __path = process.cwd();
const rateLimit = require("express-rate-limit");
const axios = require("axios");
const fs = require("fs");
const express = require("express");
const eru = express.Router();
const canvafy = require("canvafy");

//external module
const yts = require("yt-search");
const { promisify } = require("util");
const thiccysapi = require("@phaticusthiccy/open-apis");
const bt = require("@bochilteam/scraper");
const Artbreeder = new thiccysapi.Artbreeder(5, "all");
const { Brainly } = require("brainly-scraper-v2");
const brain = new Brainly("id");
const Gis = require("g-i-s");
const gis = promisify(Gis);
const malScraper = require("mal-scraper");
const Scathach = require("scathach-api");
const hentai = new Scathach();
const gplay = require("google-play-scraper");
const knights = require("knights-canvas");
const DIG = require("discord-image-generation");
const fietu = require("fietu");
const { CanvasSenpai } = require("canvas-senpai");
const canva = new CanvasSenpai();
const urlExist = require("url-exist");
const { Cabul } = require("cabul");
const reddit = new Cabul();

// My scraper
const ShortUrl = require("../lib/utils/short");
const cerpen = require("../lib/utils/cerpen");
const attp = require("../lib/utils/attp");
const { otakudesu, otakudesudl } = require("../lib/utils/otakudesu");
const mediafire = require("../lib/utils/mediafire");
const komiku = require("../lib/utils/komiku");
const adikfilm = require("../lib/utils/adikfilm");
const kuyhaa = require("../lib/utils/kuyhaa");
const doujindesu = require("../lib/utils/doujindesu");
const chara = require("../lib/utils/chara");
const { wallhaven } = require("../lib/utils/wallpaper");
const igstalk = require("../lib/utils/igstalk");
const { getNhentai, getRandom } = require("../lib/utils/nhentai");
const { tiktokdl, tiktokdlv4, tiktokdlv3 } = require("../lib/utils/tiktokdl");
const { sfilemobile, sfilemobiledl } = require("../lib/utils/sfilemobile");
const { pickRandom, getBuffer, search } = require("../lib/utils/allfunc");
const {
  stickerpack,
  stickerpackdl,
  stickerpacklink,
} = require("../lib/utils/stickerpack");

// Limiter 1 menit 100 req
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: {
    status: false,
    error: "Hmmmm kok spam",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

eru.use(limiter);

eru.use(async (req, res, next) => {
  try {
    const { data } = await axios.get("https://ipapi.co/json/");
    const result = {
      ip: data.ip,
      path: req.path,
      query: req.query,
      method: req.method,
      useragent: req.get("User-Agent"),
    };
    axios
      .post("https://jean.andikavikar135.repl.co/posts", result)
      .then((data) => {
        console.log(data.status);
      })
      .catch((err) => {
        console.log(err.message);
      });
    next();
  } catch (err) {
    console.log(err.message);
    next();
  }
});

//=========================================Random===========================================\\
// eru.get("/games/tebakbendera2", async (req, res) => {
//   const bendera = fs.readFileSync("./lib/json/tebakbendera.json");
//   const data = JSON.parse(bendera);
//   const result = pickRandom(data);
//   res.json(result);
// });

eru.get("/random/cerpen", async (req, res) => {
  cerpen()
    .then((data) => {
      res.json({
        result: data,
      });
    })
    .catch((err) => {
      res.json({
        error: err.message,
      });
    });
});

eru.get("/random/quotes", (req, res) => {
  const quote = fs.readFileSync("./lib/json/quote.json");
  const datas = JSON.parse(quote);
  const result = pickRandom(datas);
  res.json({
    by: result.author,
    quotes: result.quotes,
  });
});

// =======================================================Sementara==========================================================

eru.get("/anime/wait", async (req, res) => {
  if (!req.query.url)
    return res.json({
      error: "URL tidak ditemukan",
    });
  axios
    .get(`https://api.trace.moe/search?anilistInfo&url=${req.query.url}`)
    .then((data) => {
      const datas = data.data.result;
      const result = datas.map((item) => {
        return {
          title: item.anilist.title.romaji,
          title_english: item.anilist.title.english,
          episode: item.episode,
          similarity: item.similarity,
          image: item.image,
        };
      });
      res.json(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
        message: "URL tidak ditemukan",
      });
    });
});
// ==============================================Selesai tes=============================\\

// ===============================================information============================\\

// minecraft server
eru.get("/information/java", async (req, res) => {
  if (!req.query.ip)
    return res.json({
      error: "Masukkan ip server",
    });
  axios
    .get(`https://api.mcsrvstat.us/2/${req.query.ip}`)
    .then((datas) => {
      const data = datas.data;
      if (data.online == false)
        return res.json({ ip: req.query.ip, status: "Offline" });
      else {
        const result = {
          ip: req.query.ip,
          hostname: data.hostname,
          version: data.version,
          online: data.players.online,
          max: data.players.max,
          icon: `https://api.mcsrvstat.us/icon/${req.query.ip}`,
        };
        res.json(result);
      }
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});

eru.get("/information/bedrock", async (req, res) => {
  if (!req.query.ip)
    return res.json({
      error: "Masukkan ip server",
    });
  axios
    .get(`https://api.mcsrvstat.us/bedrock/2/${req.query.ip}`)
    .then((datas) => {
      const data = datas.data;
      if (data.online == false)
        return res.json({ ip: req.query.ip, status: "Offline" });
      else {
        const result = {
          ip: req.query.ip,
          port: data.port,
          gamemode: data.gamemode,
          version: data.version,
          online: data.players.online,
          max: data.players.max,
        };
        res.json(result);
      }
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});

//otakudesu
eru.get("/information/otakudesu", async (req, res) => {
  if (!req.query.q)
    return res.json({
      status: false,
      error: "Masukan querynya",
    });
  otakudesu(req.query.q)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});
eru.get("/information/otakudesudl", async (req, res) => {
  if (!req.query.url)
    return res.json({
      status: false,
      error: "Masukan querynya",
    });
  otakudesudl(req.query.url)
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});

// yt

eru.get("/information/yts", async (req, res) => {
  if (!req.query.q)
    return res.json({
      status: false,
      Error: "Masukan Query",
    });
  await yts(req.query.q)
    .then((data) => {
      const videos = data.videos.slice();
      const result = videos.map((item) => {
        return {
          Title: item.title,
          Views: item.views,
          Author: item.author.name,
          Duration: item.duration.timestamp,
          Publish: item.ago,
          Thumbnail: item.thumbnail,
        };
      });
      res.json(result);
    })
    .catch((err) => {
      res.json({
        error: err.message,
        status: false,
      });
    });
});

// myanimelist
eru.get("/information/anime", async (req, res) => {
  if ((!req.query.q, !req.query.type))
    return res.json({ status: false, error: "Masukan Query" });
  else if (req.query.type == "full") {
    malScraper
      .getInfoFromName(req.query.q)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json({
          error: err.message,
          status: false,
        });
      });
  } else if (req.query.type == "simple") {
    malScraper
      .getInfoFromName(req.query.q)
      .then((data) => {
        const chara = data.characters.map((item) => {
          return {
            name: item.name,
            image: item.picture,
            role: item.role,
          };
        });
        const result = {
          title: data.title,
          synopsis: data.synopsis,
          image: data.picture,
          characters: chara,
        };
        res.json(result);
      })
      .catch((err) => {
        res.json({
          error: err.message,
          status: false,
        });
      });
  } else {
    res.json({
      error: "Invalid type",
    });
  }
});

eru.get("/information/malsearch", async (req, res) => {
  if (!req.query.q) return res.json({ status: false, error: "Masukan Query" });
  malScraper
    .getResultsFromSearch(req.query.q)
    .then((data) => {
      const result = data.map((item) => {
        return {
          title: item.name,
          image: item.image_url,
          type: item.payload.media_type,
          aired: item.payload.aired,
          score: item.payload.score,
          status: item.payload.status,
        };
      });
      res.json(result);
    })
    .catch((err) => {
      res.json({
        error: err.message,
        status: false,
      });
    });
});

eru.get("/information/animeseason", async (req, res) => {
  if ((!req.query.tahun, !req.query.season))
    return res.json({ status: false, error: "Masukan query tahun dan season" });

  malScraper
    .getSeason(req.query.tahun, req.query.season)
    .then((data) => {
      const tv = data.TV;
      const result = tv.map((item) => {
        return {
          title: item.title,
          image: item.picture,
          score: item.score,
        };
      });
      res.json(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});

// stalker

eru.get("/information/malstalk", async (req, res) => {
  if (!req.query.name)
    return res.json({ status: false, error: "Masukan namanya" });
  malScraper
    .getWatchListFromUser(req.query.name, "anime")
    .then((data) => {
      const result = data.map((item) => {
        const genres = item.genres
          .map((genre) => {
            return genre.name;
          })
          .join(",");
        if (item.numWatchedEpisodes == item.animeNumEpisodes)
          return {
            Title: item.animeTitle,
            TitleEng: item.animeTitleEng,
            Type: item.animeMediaTypeString,
            Genres: genres,
            Watch: "Finished watching by user",
            WatchEpisode: item.numWatchedEpisodes,
            TotalEpisode: item.animeNumEpisodes,
            ScoreGiven: item.score,
            Image: item.animeImagePath,
          };
        if (item.numWatchedEpisodes !== item.animeNumEpisodes)
          return {
            Title: item.animeTitle,
            Title_eng: item.animeTitleEng,
            Type: item.animeMediaTypeString,
            Genres: genres,
            Watch: "Curently watching by user",
            Watch_episode: item.numWatchedEpisodes,
            Total_episode: item.animeNumEpisodes,
            Score_given: item.score,
            Image: item.animeImagePath,
          };
      });
      if (!result.length)
        return res.json({ status: false, error: "User tidak ditemukan" });
      res.json(result);
    })
    .catch((err) => {
      res.json({
        error: err.message,
        status: false,
        message: "User tidak ditemukan",
      });
    });
});

eru.get("/information/gitstalk", async (req, res) => {
  if (!req.query.name)
    return res.json({ status: false, error: "Masukan nama" });
  thiccysapi
    .github_user(req.query.name)
    .then((data) => {
      const languages = data.languages.most_used_languages
        .map((item) => {
          return item.language;
        })
        .join(", ");
      const result = {
        Username: data.user.username,
        Name: data.user.name,
        Bio: data.user.bio,
        Followers: data.user.followers,
        Following: data.user.following,
        Created: data.user.created_at,
        Avatar: data.user.avatar,
        Repositories: data.user.repositories,
        Used_space: data.repositories.used_space,
        languages,
      };
      res.json(result);
    })
    .catch((err) => {
      res.redirect(`/information/gitstalk2?${req.query.name}`);
      res.json({
        error: err.message,
        status: false,
      });
    });
});

eru.get("/information/gitstalk2", async (req, res) => {
  if (!req.query.name)
    return res.json({ status: false, error: "Masukan nama" });
  axios
    .get(`https://api.github.com/users/${req.query.name}`)
    .then((datas) => {
      const data = datas.data;
      const result = {
        Name: data.login,
        Avatar: data.avatar_url,
        Url: data.html_url,
        Bio: data.bio,
        Repos: data.public_repos,
        Created: data.created_at,
      };
      res.json(result);
    })
    .catch((err) => {
      res.json({
        error: err.message,
        status: false,
      });
    });
});

eru.get("/information/igstalk", async (req, res) => {
  if (!req.query.username)
    return res.json({ status: false, error: "Masukan username" });
  igstalk(req.query.username)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
        message: "Profile private atau tidak pernah ada",
      });
    });
});
//brainly
eru.get("/information/brainly", async (req, res) => {
  if (!req.query.q) return res.json({ status: false, error: "Masukan query" });
  brain
    .search(req.query.q)
    .then((data) => {
      const datas = pickRandom(data);
      const result = datas.answers.map((item) => {
        if ((!datas.question.attachments.length, !item.attachments.length))
          return {
            Pertanyaan: datas.question.content,
            Jawaban: item.content,
          };
        if (datas.question.attachments.length && item.attachments.length)
          return {
            Pertanyaan: datas.question.content,
            Attachment: datas.question.attachments,
            Jawaban: item.content,
            Jawaban_img: item.attachments,
          };
        if (datas.question.attachments.length && !item.attachments.length)
          return {
            Pertanyaan: datas.question.content,
            Attachment: datas.question.attachments,
            Jawaban: item.content,
          };
        if (!datas.question.attachments.length && item.attachments.length)
          return {
            Pertanyaan: datas.question.content,
            Jawaban: item.content,
            Jawaban_img: item.attachments,
          };
      });
      res.json(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: err.message,
      });
    });
});
// Movie
eru.get("/information/bioskopnow", async (req, res) => {
  bt.bioskopNow()
    .then((data) => {
      const result = pickRandom(data);
      res.json(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});
eru.get("/information/bioskop", async (req, res) => {
  bt.bioskop()
    .then((data) => {
      const result = pickRandom(data);
      res.json(data);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});
// News
eru.get("/information/liputan6", async (req, res) => {
  bt.liputan6()
    .then((data) => {
      const result = pickRandom(data);
      res.json(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});
eru.get("/information/cnbindonesia", async (req, res) => {
  bt.cnbindonesia()
    .then((data) => {
      const result = pickRandom(data);
      res.json(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});
eru.get("/information/antaranews", async (req, res) => {
  bt.antaranews()
    .then((data) => {
      const result = pickRandom(data);
      res.json(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});
eru.get("/information/kompas", async (req, res) => {
  bt.kompas()
    .then((data) => {
      const result = pickRandom(data);
      res.json(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});
// jadwal
eru.get("/information/jadwalsholat", async (req, res) => {
  if (!req.query.q) return res.json({ error: "Masukan query" });
  bt.jadwalsholat(req.query.q)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});
// Playstore
eru.get("/information/playstore", async (req, res) => {
  if (!req.query.q) return res.json({ status: false, error: "Masukan Query" });
  gplay
    .search({
      term: req.query.q,
      lang: "id",
      num: 2,
    })
    .then((data) => {
      // result = data.map((item) => {
      //   return {
      //     Title: item.title,
      //     Developer: item.developer,
      //     appId: item.appId,
      //     price: item.price,
      //     icon: item.icon,
      //     score: item.score,
      //   };
      // });
      res.json(data);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});

// Cuaca

eru.get("/information/cuaca", async (req, res) => {
  if (!req.query.lokasi)
    return res.json({ status: false, error: "Masukan lokasinya" });
  axios
    .get(
      `https://api.weatherapi.com/v1/forecast.json?key=a5a6bc21da734aa495f15121220207&q=${req.query.lokasi}`
    )
    .then((datas) => {
      const data = datas.data;
      if (data.error) return res.json({ error: "Lokasi tidak di temukan" });
      const { name, region, country } = data.location;
      const { temp_c, wind_mph, humidity, feelslike_c } = data.current;
      const { text } = data.current.condition;
      res.json({
        lokasi: name,
        provinsi: region,
        negara: country,
        suhu: `${temp_c}°C`,
        kecepatanAngin: `${wind_mph} m/s`,
        kelembapan: `${humidity}%`,
        TerasaSeperti: `${feelslike_c}°C`,
        kondisi: text,
      });
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});
// Covid
eru.get("/information/covid", async (req, res) => {
  axios
    .get(`https://data.covid19.go.id/public/api/update.json`)
    .then((datas) => {
      const data = datas.data;
      const { jumlah_odp, jumlah_pdp, total_spesimen, total_spesimen_negatif } =
        data.data;
      const {
        jumlah_positif,
        jumlah_meninggal,
        jumlah_sembuh,
        jumlah_dirawat,
      } = data.update.penambahan;
      const {
        jumlah_positif: jumlah_positif2,
        jumlah_dirawat: jumlah_dirawat2,
        jumlah_sembuh: jumlah_sembuh2,
        jumlah_meninggal: jumlah_meninggal2,
      } = data.update.total;
      res.json({
        jumlah_odp,
        jumlah_pdp,
        total_spesimen,
        total_spesimen_negatif,
        jumlah_positif,
        jumlah_dirawat,
        jumlah_sembuh,
        jumlah_meninggal,
        total_positif: jumlah_positif2,
        total_dirawat: jumlah_dirawat2,
        total_sembuh: jumlah_sembuh2,
        total_meninggal: jumlah_meninggal2,
      });
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});

// komiku
eru.get("/information/komiku", async (req, res) => {
  if (!req.query.q) return res.json({ status: false, error: "Masukan Query" });
  komiku(req.query.q)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});

// doujindesu
eru.get("/information/doujindesu", async (req, res) => {
  if (!req.query.q) return res.json({ status: false, error: "Masukan Query" });
  doujindesu(req.query.q)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});
//kuyhaa
eru.get("/information/kuyhaa", async (req, res) => {
  if (!req.query.q) return res.json({ status: false, error: "Masukan Query" });
  kuyhaa(req.query.q)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});

//adikfilm
eru.get("/information/adikfilm", async (req, res) => {
  if (!req.query.q) return res.json({ status: false, error: "Masukan Query" });
  adikfilm(req.query.q)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});
eru.get("/information/character", async (req, res) => {
  if (!req.query.q) return res.json({ status: false, error: "Masukan Query" });
  chara(req.query.q)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});

eru.get("/information/stickerpacklink", async (req, res) => {
  if (!req.query.q) {
    res.json({
      status: false,
      error: "Masukan query",
    });
  }
  stickerpacklink(req.query.q)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

//==============================================================Text Maker=========================================\\
// attp
eru.get("/textpro/attp", async (req, res) => {
  if (!req.query.text) return res.json({ status: false, error: "No text" });
  attp(req.query.text)
    .then(async (data) => {
      const result = await getBuffer(data.url);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});
// Text pro
eru.get("/textpro/devilwings", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-neon-devil-wings-text-effect-online-free-1014.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/orange", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-a-3d-orange-juice-text-effect-online-1084.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/valentine", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-realistic-golden-text-effect-on-red-sparkles-online-1082.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/blackpink", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-neon-light-blackpink-logo-text-effect-online-1081.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/blackpink2", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-a-blackpink-logo-decorated-with-roses-online-free-1080.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/bussines-sign", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/3d-business-sign-text-effect-1078.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/diamond", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-a-quick-sparkling-diamonds-text-effect-1077.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/golden", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/free-creative-3d-golden-text-effect-online-1075.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/carved", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-carved-stone-text-effect-online-1074.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/stone", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-a-3d-stone-text-effect-online-for-free-1073.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/glass", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-3d-style-glass-text-effect-online-1072.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/luxury", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-a-3d-luxury-metallic-text-effect-for-free-1071.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/white-gold", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/elegant-white-gold-3d-text-effect-online-free-1070.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/girrafe", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-3d-giraffe-text-effect-online-1069.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/arcane", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-text-effects-arcane-tv-series-online-1067.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/batman", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/make-a-batman-logo-online-free-1066.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/circle-neon", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-neon-light-on-brick-wall-online-1062.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/neon-light", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-glowing-neon-light-text-effect-online-free-1061.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/ancient", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/3d-golden-ancient-text-effect-online-free-1060.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/led-display", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/color-led-display-screen-text-effect-1059.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/neon-display", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-gradient-neon-light-text-effect-online-1085.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/summer-beach", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-a-summer-text-effect-with-a-palm-tree-1083.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/summer-time", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-a-summer-neon-light-text-effect-online-1076.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/sliced-text", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-light-glow-sliced-text-effect-online-1068.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/neon-glitch", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/neon-light-glitch-text-generator-online-1063.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/christmas-tree", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/christmas-tree-text-effect-online-free-1057.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/candy", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-christmas-candy-cane-text-effect-1056.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/3d-christmas", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/3d-christmas-text-effect-by-name-1055.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/sparkle-christmas", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/sparkles-merry-christmas-text-effect-1054.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/3d-deepsea", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-3d-deep-sea-metal-text-effect-online-1053.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/america", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-american-flag-3d-text-effect-online-1051.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/future", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-3d-sci-fi-text-effect-online-1050.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/3d-rainbow", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/3d-rainbow-color-calligraphy-text-effect-1049.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/3d-pipe", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-3d-water-pipe-text-effects-online-1048.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/pencil", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-a-sketch-text-effect-online-1044.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/blue-circuit", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-blue-circuit-style-text-effect-online-1043.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/space", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-space-text-effects-online-free-1042.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/metallic", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-a-metallic-text-effect-free-online-1041.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/fiction", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-science-fiction-text-effect-online-free-1038.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/demon", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-green-horror-style-text-effect-online-1036.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/transformer", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-a-transformer-text-effect-online-1035.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/berry", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-berry-text-effect-online-free-1033.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/thunder", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/online-thunder-text-effect-generator-1031.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/magma", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-a-magma-hot-text-effect-online-1030.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/3d-stone", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/3d-stone-cracked-cool-text-effect-1029.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/3d-neon", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-3d-neon-light-text-effect-online-1028.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/glitch", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-impressive-glitch-text-effects-online-1027.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/neon", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-a-futuristic-technology-neon-light-text-effect-1006.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/snow-effect", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-snow-text-effects-for-winter-holidays-1005.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/cloud", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-a-cloud-text-effect-on-the-sky-online-1004.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/sand", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/write-in-sand-summer-beach-free-online-991.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/sand2", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/sand-writing-text-effect-online-990.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/3d-sand", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/sand-engraved-3d-text-effect-989.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/sand3", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-a-summery-sand-writing-text-effect-988.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/3d-glue", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-3d-glue-text-effect-with-realistic-style-986.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/metal-dark", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/metal-dark-gold-text-effect-984.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/1917", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/1917-style-text-effect-online-980.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/minion", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/minion-text-effect-3d-online-978.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/holographic", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/holographic-3d-text-effect-975.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});

eru.get("/textpro/metal-purple", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/metal-purple-dual-effect-973.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/deluxe-silver", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/deluxe-silver-text-effect-970.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/break-wall", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/break-wall-text-effect-871.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/honey", async (req, res) => {
  thiccysapi
    .textpro("https://textpro.me/honey-text-effect-868.html", req.query.text)
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/dropwater", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/dropwater-text-effect-872.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/horor-blood", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/horror-blood-text-effect-online-883.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/toxic", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/toxic-text-effect-online-901.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/equalizer", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/rainbow-equalizer-text-effect-902.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/3d-underwater", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/3d-underwater-text-effect-generator-online-1013.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/3d-paper", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/online-multicolor-3d-paper-cut-text-effect-1016.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/water-color", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-a-free-online-watercolor-text-effect-1017.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/3d-metal", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-a-3d-glossy-metal-text-effect-1019.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/broken-glass", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/broken-glass-text-effect-free-online-1023.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/3d-gradient", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/online-3d-gradient-text-effect-generator-1020.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/art-paper", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-art-paper-cut-text-effect-online-1022.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/embossed", async (req, res) => {
  thiccysapi
    .textpro(
      "https://textpro.me/create-embossed-text-effect-on-cracked-surface-1024.html",
      req.query.text
    )
    .then(async (data) => {
      const result = await getBuffer(data);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "masukan textnya",
        error: err.message,
      });
    });
});
eru.get("/textpro/asw", async (req, res) => {});
// ==================================================MAKER==================================================\\
eru.get("/canvas/tweet", async (req, res) => {
  try {
    if ((!req.query.avatar, !req.query.name, !req.query.text))
      return res.json({
        status: false,
        error: "Masukan url foto",
      });
    const tweet = await new fietu.Tweet()
      .setAvatar(encodeURIComponent(req.query.avatar))
      .setUsername(req.query.name)
      .setNickname(req.query.name)
      .setText(req.query.text)
      .render();
    const img = Buffer.from(tweet, "base64");
    res.setHeader("Content-Type", "image/png");
    res.send(img);
  } catch (err) {
    res.json({
      status: false,
      error: err.message,
    });
  }
});
eru.get("/canvas/blur", async (req, res) => {
  try {
    if (!req.query.image_url)
      return res.json({
        status: false,
        error: "Masukan url foto",
      });
    const result = await new DIG.Blur().getImage(req.query.image_url);
    res.setHeader("Content-Type", "image/png");
    res.send(result);
  } catch (err) {
    res.json({
      status: false,
      message: "Gambar tidak ada",
      error: err.message,
    });
  }
});

eru.get("/canvas/gay", async (req, res) => {
  try {
    if (!req.query.image_url)
      return res.json({
        status: false,
        error: "Masukan url foto",
      });
    const result = await new DIG.Gay().getImage(req.query.image_url);
    res.setHeader("Content-Type", "image/png");
    res.send(result);
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    });
  }
});
eru.get("/canvas/greyscale", async (req, res) => {
  try {
    if (!req.query.image_url)
      return res.json({
        status: false,
        error: "Masukan url foto",
      });
    const result = await new DIG.Greyscale().getImage(req.query.image_url);
    res.setHeader("Content-Type", "image/png");
    res.send(result);
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    });
  }
});
eru.get("/canvas/invert", async (req, res) => {
  try {
    if (!req.query.image_url)
      return res.json({
        status: false,
        error: "Masukan url foto",
      });
    const result = await new DIG.Invert().getImage(req.query.image_url);
    res.setHeader("Content-Type", "image/png");
    res.send(result);
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    });
  }
});
eru.get("/canvas/sepia", async (req, res) => {
  try {
    if (!req.query.image_url)
      return res.json({
        status: false,
        error: "Masukan url foto",
      });
    const result = await new DIG.Sepia().getImage(req.query.image_url);
    res.setHeader("Content-Type", "image/png");
    res.send(result);
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    });
  }
});
eru.get("/canvas/triggered", async (req, res) => {
  try {
    if (!req.query.image_url)
      return res.json({
        status: false,
        error: "Masukan url foto",
      });
    const result = await new DIG.Triggered().getImage(req.query.image_url);
    res.setHeader("Content-Type", "image/png");
    res.send(result);
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    });
  }
});
eru.get("/canvas/ads", async (req, res) => {
  try {
    if (!req.query.image_url)
      return res.json({
        status: false,
        error: "Masukan url foto",
      });
    const result = await new DIG.Ad().getImage(req.query.image_url);
    res.setHeader("Content-Type", "image/png");
    res.send(result);
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    });
  }
});
eru.get("/canvas/batslap", async (req, res) => {
  try {
    if ((!req.query.image_url, !req.query.image_url2))
      return res.json({
        status: false,
        error: "Masukan url foto",
      });
    const result = await new DIG.Batslap().getImage(
      req.query.image_url,
      req.query.image_url2
    );
    res.setHeader("Content-Type", "image/png");
    res.send(result);
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    });
  }
});
eru.get("/canvas/beautiful", async (req, res) => {
  try {
    if (!req.query.image_url)
      return res.json({
        status: false,
        error: "Masukan url foto",
      });
    const result = await new DIG.Beautiful().getImage(req.query.image_url);
    res.setHeader("Content-Type", "image/png");
    res.send(result);
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    });
  }
});
eru.get("/canvas/bed", async (req, res) => {
  try {
    if ((!req.query.image_url, !req.query.image_url2))
      return res.json({
        status: false,
        error: "Masukan url foto",
      });
    const result = await new DIG.Bed().getImage(
      req.query.image_url,
      req.query.image_url2
    );
    res.setHeader("Content-Type", "image/png");
    res.send(result);
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    });
  }
});
eru.get("/canvas/paint", async (req, res) => {
  try {
    if (!req.query.image_url)
      return res.json({
        status: false,
        error: "Masukan url foto",
      });
    const result = await new DIG.Bobross().getImage(req.query.image_url);
    res.setHeader("Content-Type", "image/png");
    res.send(result);
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    });
  }
});
eru.get("/canvas/stonk", async (req, res) => {
  try {
    if (!req.query.image_url)
      return res.json({
        status: false,
        error: "Masukan url foto",
      });
    const result = await new DIG.ConfusedStonk().getImage(req.query.image_url);
    res.setHeader("Content-Type", "image/png");
    res.send(result);
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    });
  }
});
eru.get("/canvas/delete", async (req, res) => {
  try {
    if (!req.query.image_url)
      return res.json({
        status: false,
        error: "Masukan url foto",
      });
    const result = await new DIG.Delete().getImage(req.query.image_url);
    res.setHeader("Content-Type", "image/png");
    res.send(result);
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    });
  }
});
eru.get("/canvas/doublestonk", async (req, res) => {
  try {
    if ((!req.query.image_url, !req.query.image_url2))
      return res.json({
        status: false,
        error: "Masukan url foto",
      });
    const result = await new DIG.DoubleStonk().getImage(
      req.query.image_url,
      req.query.image_url2
    );
    res.setHeader("Content-Type", "image/png");
    res.send(result);
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    });
  }
});
eru.get("/canvas/facepalm", async (req, res) => {
  try {
    if (!req.query.image_url)
      return res.json({
        status: false,
        error: "Masukan url foto",
      });
    const result = await new DIG.Facepalm().getImage(req.query.image_url);
    res.setHeader("Content-Type", "image/png");
    res.send(result);
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    });
  }
});
eru.get("/canvas/hitler", async (req, res) => {
  try {
    if (!req.query.image_url)
      return res.json({
        status: false,
        error: "Masukan url foto",
      });
    const result = await new DIG.Hitler().getImage(req.query.image_url);
    res.setHeader("Content-Type", "image/png");
    res.send(result);
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    });
  }
});
eru.get("/canvas/jail", async (req, res) => {
  try {
    if (!req.query.image_url)
      return res.json({
        status: false,
        error: "Masukan url foto",
      });
    const result = await new DIG.Jail().getImage(req.query.image_url);
    res.setHeader("Content-Type", "image/png");
    res.send(result);
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    });
  }
});
eru.get("/canvas/Karaba", async (req, res) => {
  try {
    if (!req.query.image_url)
      return res.json({
        status: false,
        error: "Masukan url foto",
      });
    const result = await new DIG.Karaba().getImage(req.query.image_url);
    res.setHeader("Content-Type", "image/png");
    res.send(result);
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    });
  }
});
eru.get("/canvas/Kiss", async (req, res) => {
  try {
    if ((!req.query.image_url, !req.query.image_url2))
      return res.json({
        status: false,
        error: "Masukan url foto",
      });
    const result = await new DIG.Kiss().getImage(
      req.query.image_url,
      req.query.image_url2
    );
    res.setHeader("Content-Type", "image/png");
    res.send(result);
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    });
  }
});
eru.get("/canvas/Mms", async (req, res) => {
  try {
    if (!req.query.image_url)
      return res.json({
        status: false,
        error: "Masukan url foto",
      });
    const result = await new DIG.Mms().getImage(req.query.image_url);
    res.setHeader("Content-Type", "image/png");
    res.send(result);
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    });
  }
});
eru.get("/canvas/NotStonk", async (req, res) => {
  try {
    if (!req.query.image_url)
      return res.json({
        status: false,
        error: "Masukan url foto",
      });
    const result = await new DIG.NotStonk().getImage(req.query.image_url);
    res.setHeader("Content-Type", "image/png");
    res.send(result);
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    });
  }
});
eru.get("/canvas/Poutine", async (req, res) => {
  try {
    if (!req.query.image_url)
      return res.json({
        status: false,
        error: "Masukan url foto",
      });
    const result = await new DIG.Poutine().getImage(req.query.image_url);
    res.setHeader("Content-Type", "image/png");
    res.send(result);
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    });
  }
});
eru.get("/canvas/Rip", async (req, res) => {
  try {
    if (!req.query.image_url)
      return res.json({
        status: false,
        error: "Masukan url foto",
      });
    const result = await new DIG.Rip().getImage(req.query.image_url);
    res.setHeader("Content-Type", "image/png");
    res.send(result);
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    });
  }
});
eru.get("/canvas/Spank", async (req, res) => {
  try {
    if ((!req.query.image_url, !req.query.image_url2))
      return res.json({
        status: false,
        error: "Masukan url foto",
      });
    const result = await new DIG.Spank().getImage(
      req.query.image_url,
      req.query.image_url2
    );
    res.setHeader("Content-Type", "image/png");
    res.send(result);
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    });
  }
});
eru.get("/canvas/Tatoo", async (req, res) => {
  try {
    if (!req.query.image_url)
      return res.json({
        status: false,
        error: "Masukan url foto",
      });
    const result = await new DIG.Tatoo().getImage(req.query.image_url);
    res.setHeader("Content-Type", "image/png");
    res.send(result);
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    });
  }
});
eru.get("/canvas/Thomas", async (req, res) => {
  try {
    if (!req.query.image_url)
      return res.json({
        status: false,
        error: "Masukan url foto",
      });
    const result = await new DIG.Thomas().getImage(req.query.image_url);
    res.setHeader("Content-Type", "image/png");
    res.send(result);
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    });
  }
});
eru.get("/canvas/Trash", async (req, res) => {
  try {
    if (!req.query.image_url)
      return res.json({
        status: false,
        error: "Masukan url foto",
      });
    const result = await new DIG.Trash().getImage(req.query.image_url);
    res.setHeader("Content-Type", "image/png");
    res.send(result);
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    });
  }
});

//welcome
eru.get("/canvas/welcome", async (req, res) => {
  if ((!req.query.desk, !req.query.avatar, !req.query.groupname))
    return res.json({ status: false, error: "Masukan query yang benar" });
  try {
    const welcome = await new canvafy.WelcomeLeave()
      .setAvatar(encodeURIComponent(req.query.avatar))
      .setBackground(
        "image",
        "https://img.freepik.com/premium-vector/pixel-art-lake-house-wallpaper-with-wooden-deck-trees-8bit-background_360488-394.jpg?w=2000"
      )
      .setTitle(req.query.groupname)
      .setDescription(req.query.desk)
      .setBorder("#2a2e35")
      .setAvatarBorder("#2a2e35")
      .setOverlayOpacity(0.3)
      .build();
    const data = welcome.toBuffer();
    res.setHeader("Content-Type", "image/png");
    res.send(data);
  } catch (err) {
    res.json({ error: err.message });
  }
});
eru.get("/canvas/welcome2", async (req, res) => {
  try {
    if (
      (!req.query.username,
      !req.query.groupname,
      !req.query.membercount,
      !req.query.avatar,
      !req.query.groupicon)
    )
      return res.json({ status: false, error: "Masukan query" });
    const image = await new knights.Welcome()
      .setUsername(req.query.username)
      .setGuildName(req.query.groupname)
      .setGuildIcon(req.query.groupicon)
      .setMemberCount(req.query.membercount)
      .setAvatar(req.query.avatar)
      .setBackground(
        "https://img.freepik.com/premium-vector/pixel-art-lake-house-wallpaper-with-wooden-deck-trees-8bit-background_360488-394.jpg?w=2000"
      )
      .toAttachment();
    const data = image.toBuffer();
    res.setHeader("Content-Type", "image/png");
    res.send(data);
  } catch (err) {
    console.log(err);
    res.json({
      status: false,
      message: "Ada params yang kosong",
      error: err.message,
    });
  }
});
eru.get("/canvas/welcome3", async (req, res) => {
  try {
    const bg = [
      "https://cdn.discordapp.com/attachments/724098180989879072/724098180989879072.png",
    ];
    const image = await new knights.Welcome()
      .setUsername(req.query.username)
      .setGuildName(req.query.groupname)
      .setGuildIcon(req.query.groupicon)
      .setMemberCount(req.query.membercount)
      .setAvatar(req.query.avatar)
      .setBackground(
        "https://c4.wallpaperflare.com/wallpaper/712/851/599/artistic-pixel-art-8-bit-wallpaper-preview.jpg"
      )
      .toAttachment();
    const data = image.toBuffer();
    res.setHeader("Content-Type", "image/png");
    res.send(data);
  } catch (err) {
    res.json({ status: false, error: err.message });
  }
});
//leave

eru.get("/canvas/leave", async (req, res) => {
  if ((!req.query.desk, !req.query.avatar, !req.query.groupname))
    return res.json({ status: false, error: "Masukan query yang benar" });
  try {
    const welcome = await new canvafy.WelcomeLeave()
      .setAvatar(req.query.avatar)
      .setBackground(
        "image",
        "https://c4.wallpaperflare.com/wallpaper/712/851/599/artistic-pixel-art-8-bit-wallpaper-preview.jpg"
      )
      .setTitle(req.query.groupname)
      .setDescription(req.query.desk)
      .setBorder("#2a2e35")
      .setAvatarBorder("#2a2e35")
      .setOverlayOpacity(0.3)
      .build();
    const data = welcome.toBuffer();
    res.setHeader("Content-Type", "image/png");
    res.send(data);
  } catch (err) {
    res.json({ status: false, error: err.message });
  }
});
//rank
eru.get("/canvas/rank", async (req, res) => {
  if (
    (!req.query.name,
    !req.query.avatar,
    !req.query.needxp,
    !req.query.currxp,
    !req.query.level)
  )
    return res.json({ status: false, error: "Masukan query yang benar" });
  try {
    const image = await new knights.Rank()
      .setAvatar(req.query.avatar)
      .setUsername(req.query.name)
      .setBg("https://i.ibb.co/4YBNyvP/images-76.jpg")
      .setNeedxp(req.query.needxp)
      .setCurrxp(req.query.currxp)
      .setLevel(req.query.level)
      .setRank("https://i.ibb.co/Wn9cvnv/FABLED.png")
      .toAttachment();
    const data = image.toBuffer();
    res.setHeader("Content-Type", "image/png");
    res.send(data);
  } catch (err) {
    res.json({ status: false, error: err.message });
  }
});
eru.get("/canvas/Rank2", async (req, res) => {
  try {
    if (
      (!req.query.name,
      !req.query.level,
      !req.query.rank,
      !req.query.currxp,
      !req.query.needxp,
      !req.query.avatar)
    )
      return res.json({ status: false, error: "Masukan query yang benar" });
    const data = await canva.rankcard({
      link: "https://i.pinimg.com/originals/76/0e/d7/760ed7f52c90870503762ac92db92adc.jpg",
      name: req.query.name,
      discriminator: " ",
      level: req.query.level,
      rank: req.query.rank,
      currentXP: req.query.currxp,
      fullXP: req.query.needxp,
      avatar: req.query.avatar,
    });
    res.setHeader("Content-Type", "image/png");
    res.send(data);
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    });
  }
});
eru.get("/canvas/levelup", async (req, res) => {
  if (!req.query.avatar) return res.json({ error: "Masukan url foto" });
  try {
    const image = await new knights.Up()
      .setAvatar(req.query.avatar)
      .toAttachment();
    data = image.toBuffer();
    res.setHeader("Content-Type", "image/png");
    res.send(data);
  } catch (err) {
    res.json({ status: false, error: err.message });
  }
});
// eru.get("/canvas/rank3", async (req, res) => {
//   if (
//     //   !req.query.name,
//     // !req.query.avatar,
//     // !req.query.needxp,
//     // !req.query.currxp,
//     // !req.query.level,
//     !req.query.rank
//   )
//     return res.json({ error: "Masukan query" });
//   try {
//     const ranka = req.query.rank;
//     const rank = await new canvafy.Rank()
//       .setAvatar(req.query.avatar)
//       .setBackground(
//         "image",
//         "https://th.bing.com/th/id/R.248b992f15fb255621fa51ee0ca0cecb?rik=K8hIsVFACWQ8%2fw&pid=ImgRaw&r=0"
//       )
//       .setUsername(req.query.name)
//       .setStatus("online")
//       .setLevel(7)
//       .setRank(")
//       .setCurrentXp(700)
//       .setRequiredXp(1000)
//       .build();
//     const data = rank.toBuffer();
//     res.setHeader("Content-Type", "image/png");
//     res.send(data);
//   } catch (err) {
//     res.json({ error: err.message });
//   }
// });

// effect
eru.get("/canvas/affect", async (req, res) => {
  if (!req.query.image_url)
    return res.json({ status: false, error: "Masukan url foto" });
  try {
    const affect = await canvafy.Image.affect(req.query.image_url);
    const data = affect.toBuffer();
    res.setHeader("Content-Type", "image/png");
    res.send(data);
  } catch (err) {
    res.json({ status: false, error: err.message });
  }
});
eru.get("/canvas/hornycard", async (req, res) => {
  if (!req.query.image_url)
    return res.json({ status: false, error: "Masukan url foto" });
  try {
    const image = await new knights.Horny()
      .setAvatar(req.query.image_url)
      .toBuild();
    data = image.toBuffer();
    res.setHeader("Content-Type", "image/png");
    res.send(data);
  } catch (err) {
    res.json({ status: false, error: err.message });
  }
});
eru.get("/canvas/jojocard", async (req, res) => {
  if (!req.query.image_url) return res.json({ error: "Masukan url foto" });
  try {
    const image = await new knights.Jo()
      .setImage(req.query.image_url)
      .toBuild();
    data = image.toBuffer();
    res.setHeader("Content-Type", "image/png");
    res.send(data);
  } catch (err) {
    res.json({ error: err.message });
  }
});
eru.get("/canvas/patrick", async (req, res) => {
  if (!req.query.image_url) return res.json({ error: "Masukan url foto" });
  try {
    const image = await new knights.Patrick()
      .setAvatar(req.query.image_url)
      .toAttachment();
    data = image.toBuffer();
    res.setHeader("Content-Type", "image/png");
    res.send(data);
  } catch (err) {
    res.json({ error: err.message });
  }
});
eru.get("/canvas/bonk", async (req, res) => {
  if ((!req.query.image_url, !req.query.image_url2))
    return res.json({ error: "Masukan url foto" });
  try {
    const image = await new knights.Bonk()
      .setAvatar1(req.query.image_url)
      .setAvatar2(req.query.image_url2)
      .toBuild();
    data = image.toBuffer();
    res.setHeader("Content-Type", "image/png");
    res.send(data);
  } catch (err) {
    res.json({ error: err.message });
  }
});
eru.get("/canvas/burn", async (req, res) => {
  if (!req.query.image_url) return res.json({ error: "Masukan url foto" });
  try {
    const image = await new knights.Burn()
      .setAvatar(req.query.image_url)
      .toAttachment();
    data = image.toBuffer();
    res.setHeader("Content-Type", "image/png");
    res.send(data);
  } catch (err) {
    res.json({ error: err.message });
  }
});
//===================================================Download===================================================\\
// yt
// eru.get("/download/ytm2", async (req, res) => {
//   let info = await ytdl.getInfo("https://www.youtube.com/watch?v=8l14WXHJx1Y");
//   let audioFormats = ytdl.filterFormats(info.formats, "audioonly");
//   console.log("Formats with only audio: " + audioFormats.length);
//   res.json(audioFormats);
// });
eru.get("/download/ytmp3", (req, res) => {
  if (!req.query.url) return res.json({ error: "Masukan URL" });
  bt.youtubedlv2(req.query.url)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});
eru.get("/download/ytmp4", async (req, res) => {
  if (!req.query.url) return res.json({ error: "Masukan URL" });
  thiccysapi
    .insta_post(req.query.url)
    .then(async (data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});
eru.get("/download/play", async (req, res) => {
  if (!req.query.q) return res.json({ error: "No query" });
  yts(req.query.q)
    .then(async (data) => {
      const url = data.videos[0].url;
      const result = await thiccysapi.insta_post(url);
      res.json(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});
eru.get("/download/playmp4", async (req, res) => {
  if (!req.query.q) return res.json({ error: "No query" });
  yts(req.query.q)
    .then(async (data) => {
      const url = data.videos[0].url;
      const result = await thiccysapi.insta_post(url);
      res.json(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});
/*
// tiktok
eru.get("/download/tiktok", async (req, res) => {
  if (!req.query.url) return res.json({ error: "Masukan URL" });
  thiccysapi
    .tiktok(req.query.url)
    .then((data) => {
      res.json(data.server1);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
        message: "URL tidak valid",
      });
    });
});

eru.get("/download/tiktok3", async (req, res) => {
  bt.tiktokdl(req.query.url)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
        message: "URL tidak valid",
      });
    });
});
*/
eru.get("/download/tiktok", async (req, res) => {
  if (!req.query.url) return res.json({ error: "Masukan URL" });
  tiktokdlv3(req.query.url)
    .then((data) => {
      res.json(data);
    })
    .catch((_) => {
      tiktokdl(req.query.url)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.json({
            status: false,
            error: err.message,
          });
        });
    });
});
eru.get("/download/tiktokv2", async (req, res) => {
  if (!req.query.url) return res.json({ error: "Masukan URL" });
  tiktokdlv4(req.query.url)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});
// eru.get("/download/tiktok", async (req, res) => {
//   if (!req.query.url) return res.json({ error: "Masukan URL" });
//   tiktokdl(req.query.url)
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       res.json({
//         status: false,
//         error: err.message,
//       });
//     });
// });
// ig
eru.get("/download/ig", async (req, res) => {
  if (!req.query.url) return res.json({ error: "Masukan URL" });
  thiccysapi
    .insta_post(req.query.url)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});

eru.get("/download/igstory", async (req, res) => {
  if (!req.query.name) return res.json({ error: "Masukan username" });
  bt.instagramStory(req.query.name)
    .then((data) => {
      const result = data.results.map((item) => {
        return {
          url: item.url,
          type: item.type,
        };
      });
      res.json(result);
    })
    .catch((err) => {
      console.log(err.message);
      res.json({
        message: "Username tidak valid atau tidak ada story",
      });
    });
});
eru.get("/download/igstory2", async (req, res) => {
  if (!req.query.name) return res.json({ error: "Masukan username" });
  thiccysapi
    .insta_story(req.query.name)
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});

// fb
eru.get("/download/fb", async (req, res) => {
  if (!req.query.url) return res.json({ error: "Masukan URL" });
  thiccysapi
    .insta_post(req.query.url)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});
// mediafire
eru.get("/download/mediafire", async (req, res) => {
  if (!req.query.url) return res.json({ error: "Url tidak ada" });
  mediafire(req.query.url)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
        message: "url tidak valid",
      });
    });
});

// aio
eru.get("/download/savefrom", async (req, res) => {
  if (!req.query.url) return res.json({ error: "Url tidak ada" });
  bt.savefrom(req.query.url)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      bt.aiovideodl(req.query.url)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.json({
            status: false,
            error: "url tidak valid",
            message: err.message,
          });
        });
    });
});
// sfilemobi
eru.get("/download/sfilemobidl", async (req, res) => {
  if (!req.query.url) {
    res.json({
      status: false,
      error: "Masukan query url",
    });
  }
  sfilemobiledl(req.query.url)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});

eru.get("/download/sfilemobi", async (req, res) => {
  if (!req.query.q) {
    res.json({
      status: false,
      error: "Masukan query",
    });
  }
  sfilemobile(req.query.q)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});

eru.get("/download/stickerpackdl", async (req, res) => {
  if (!req.query.url) {
    res.json({
      status: false,
      error: "Masukan query url",
    });
  }
  stickerpackdl(req.query.url)
    .then((data) => {
      res.json({
        result: data,
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

eru.get("/download/stickerpack", async (req, res) => {
  if (!req.query.q) {
    res.json({
      status: false,
      error: "Masukan query",
    });
  }
  stickerpack(req.query.q)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

// =============================================================END Download======================================= \\
//===================================================================NSFW===========================================================\\

eru.get("/h/nhentai", (req, res) => {
  if (!req.query.code || isNaN(req.query.code) || req.query.code.length > 6)
    return res.json({ status: false, error: "Format salah" });
  getNhentai(req.query.code)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});

eru.get("/h/hentai/:type", async (req, res) => {
  reddit
    .hentai(req.params.type, "hot")
    .then(async (data) => {
      const result = await getBuffer(data.data.url);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        error: err.message,
      });
    });
});
eru.get("/h/irl/:type", async (req, res) => {
  reddit
    .irl(req.params.type, "hot")
    .then(async (data) => {
      const result = await getBuffer(data.data.url);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        error: err.message,
        status: false,
      });
    });
});
eru.get("/h/meme/:type", async (req, res) => {
  reddit
    .meme(req.params.type, "hot")
    .then(async (data) => {
      const result = await getBuffer(data.data.url);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        error: err.message,
        status: false,
      });
    });
});

eru.get("/h/hololive", async (req, res) => {
  hentai
    .getHololive()
    .then(async (data) => {
      const result = await getBuffer(
        `https://external-content.duckduckgo.com/iu/?u=${data.image}`
      );
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        error: err.message,
        status: false,
      });
    });
});
eru.get("/h/fgo", async (req, res) => {
  hentai
    .getFgo()
    .then(async (data) => {
      const result = await getBuffer(
        `https://external-content.duckduckgo.com/iu/?u=${data.image}`
      );
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        error: err.message,
        status: false,
      });
    });
});

eru.get("/h/genshin", async (req, res) => {
  hentai
    .getGenshin()
    .then(async (data) => {
      const result = await getBuffer(
        `https://external-content.duckduckgo.com/iu/?u=${data.image}`
      );
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});
eru.get("/h/azurlane", async (req, res) => {
  hentai
    .getAzur()
    .then(async (data) => {
      const result = await getBuffer(
        `https://external-content.duckduckgo.com/iu/?u=${data.image}`
      );
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});
eru.get("/h/arknights", async (req, res) => {
  hentai
    .getArknights()
    .then(async (data) => {
      const result = await getBuffer(
        `https://external-content.duckduckgo.com/iu/?u=${data.image}`
      );
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});
eru.get("/h/fireemblem", async (req, res) => {
  hentai
    .getFireEmblem()
    .then(async (data) => {
      const result = await getBuffer(
        `https://external-content.duckduckgo.com/iu/?u=${data.image}`
      );
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});
eru.get("/h/girlfrontline", async (req, res) => {
  hentai
    .getGirlsFrontline()
    .then(async (data) => {
      const result = await getBuffer(
        `https://external-content.duckduckgo.com/iu/?u=${data.image}`
      );
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});
eru.get("/h/kancolle", async (req, res) => {
  hentai
    .getKancolle()
    .then(async (data) => {
      const result = await getBuffer(
        `https://external-content.duckduckgo.com/iu/?u=${data.image}`
      );
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});

eru.get("/im/smug", async (req, res) => {
  hentai
    .getReaction("smug")
    .then(async (data) => {
      const result = await getBuffer(data.url);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});
eru.get("/h/rule34", async (req, res) => {
  hentai
    .searchR34(req.query.q)
    .then(async (data) => {
      const image = pickRandom(data.clean_image);
      const result = await getBuffer(image);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});
eru.get("/he/:id", async (req, res) => {
  axios
    .get(`https://api.waifu.pics/nsfw/${req.params.id}`)
    .then(async (datas) => {
      const data = datas.data;
      const result = await getBuffer(data.url);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});
//===================================================================End NSFW===========================================================\\
// ===================================================================Game===========================================================\\
eru.get("/games/tebakgame", (req, res) => {
  const quote = fs.readFileSync("./lib/json/tebakgame.json");
  const datas = JSON.parse(quote);
  const result = pickRandom(datas);
  res.json(result);
});
eru.get("/games/tebakgambar", async (req, res) => {
  bt.tebakgambar()
    .then((data) => {
      const result = {
        img: data.img,
        jawaban: data.jawaban,
        deskripsi: data.deskripsi,
      };
      res.json(result);
    })
    .catch((err) => {
      res.json({
        error: err.message,
        status: false,
      });
    });
});
eru.get("/games/asahotak", async (req, res) => {
  bt.asahotak()
    .then((data) => {
      const result = {
        soal: data.soal,
        jawaban: data.jawaban,
      };
      res.json(result);
    })
    .catch((err) => {
      res.json({
        error: err.message,
        status: false,
      });
    });
});
eru.get("/games/caklontong", async (req, res) => {
  bt.caklontong()
    .then((data) => {
      const { soal, jawaban, deskripsi } = data;
      res.json({
        soal,
        jawaban,
        deskripsi,
      });
    })
    .catch((err) => {
      res.json({
        error: err.message,
        status: false,
      });
    });
});
eru.get("/games/family100", async (req, res) => {
  bt.family100()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        error: err.message,
        status: false,
      });
    });
});
eru.get("/games/siapakahaku", async (req, res) => {
  bt.siapakahaku()
    .then((data) => {
      const result = {
        soal: data.soal,
        jawaban: data.jawaban,
      };
      res.json(result);
    })
    .catch((err) => {
      res.json({
        error: err.message,
        status: false,
      });
    });
});
eru.get("/games/susunkata", async (req, res) => {
  bt.susunkata()
    .then((data) => {
      const result = {
        soal: data.soal,
        tipe: data.tipe,
        jawaban: data.jawaban,
      };
      res.json(result);
    })
    .catch((err) => {
      res.json({
        error: err.message,
        status: false,
      });
    });
});

eru.get("/games/tebakbendera", async (req, res) => {
  const bendera = fs.readFileSync("./lib/json/tebakbendera.json");
  const data = JSON.parse(bendera);
  const result = pickRandom(data);
  res.json(result);
});

eru.get("/games/tebakkimia", async (req, res) => {
  bt.tebakkimia()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        error: err.message,
        status: false,
      });
    });
});

eru.get("/games/tebakkata", async (req, res) => {
  bt.tebakkata()
    .then((data) => {
      const result = {
        soal: data.soal,
        jawaban: data.jawaban,
      };
      res.json(result);
    })
    .catch((err) => {
      res.json({
        error: err.message,
        status: false,
      });
    });
});

eru.get("/games/tebaklirik", async (req, res) => {
  bt.tebaklirik()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        error: err.message,
        status: false,
      });
    });
});
eru.get("/games/tebaktebakan", async (req, res) => {
  bt.tebaktebakan()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        error: err.message,
        status: false,
      });
    });
});
eru.get("/games/tekateki", async (req, res) => {
  bt.tekateki()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});

//===============================================Random Image====================================================================\\
// Anime image
eru.get("/image/sfw/:id", async (req, res) => {
  axios
    .get(`https://api.waifu.pics/sfw/${req.params.id}`)
    .then(async (datas) => {
      const data = datas.data;
      const result = await getBuffer(data.url);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});

// Google image
eru.get("/image/gis", async (req, res) => {
  if (!req.query.q) return res.json({ error: "Masukan Query" });
  gis(req.query.q)
    .then(async (data) => {
      const { url } = pickRandom(data);
      const result = await getBuffer(url);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});
eru.get("/image/gis-json", async (req, res) => {
  if (!req.query.q) return res.json({ error: "Masukan Query" });
  gis(req.query.q)
    .then(async (data) => {
      const result = pickRandom(data);
      res.json(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});
eru.get("/image/artbreader", async (req, res) => {
  if (!req.query.q) {
    Artbreeder.random()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json({
          status: false,
          error: err.message,
        });
      });
  } else {
    Artbreeder.search(req.query.q)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json({
          status: false,
          error: err.message,
        });
      });
  }
});

// pinterest
eru.get("/image/pinterest", async (req, res) => {
  if (!req.query.q) return res.json({ error: "Masukan query" });
  await bt
    .pinterest(req.query.q)
    .then(async (data) => {
      const result = await getBuffer(pickRandom(data));
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: err.message,
      });
    });
});
// sticker tele
eru.get("/image/stickerTelegram", async (req, res) => {
  if (!req.query.q) return res.json({ error: "Masukan query" });
  bt.stickerTelegram(req.query.q)
    .then(async (data) => {
      const result = pickRandom(data);
      res.json({
        title: result.title,
        link: result.link,
        sticker: result.stickers,
      });
    })
    .catch((err) => {
      res.json({
        status: false,
        message: err.message,
      });
    });
});
//wallpaper
eru.get("/image/wallpaper", async (req, res) => {
  if (!req.query.q) {
    res.json({
      status: false,
      error: "Masukan query",
    });
  }
  wallhaven(req.query.q)
    .then(async (data) => {
      const result = await getBuffer(data.img);
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        error: err.message,
      });
    });
});

eru.get("/image/wallpaper2", async (req, res) => {
  if (!req.query.q) return res.json({ error: "Masukan query" });
  bt.wallpaperv2(req.query.q)
    .then(async (data) => {
      const result = await getBuffer(pickRandom(data));
      res.setHeader("Content-Type", "image/png");
      res.send(result);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: err.message,
      });
    });
});

//===============================================End Random Image=============================\\
//===============================================Tools=======================================\\
eru.get("/tools/urlshort", async (req, res) => {
  if (!req.query.url) return res.json({ error: "Masukan url" });
  else {
    const check = await ShortUrl.findOne({ full: req.query.url });
    const exist = await urlExist(req.query.url);
    if (!exist) return res.json({ error: "URL tidak valid" });
    if (check)
      return res.json({
        link: `${myurl}/${check.short}`,
        id: check.short,
      });
    const link = await ShortUrl.create({ full: req.query.url });
    const result = {
      link: `${myurl}/${link.short}`,
      id: link.short,
    };
    res.json(result);
  }
});

//===============================================End Tools=======================================\\

eru.use(express.static(__path + "/public"));
eru.use(function (req, res) {
  res.status(404);

  res.sendFile(__path + "/views/404.html");
});

module.exports = eru;
