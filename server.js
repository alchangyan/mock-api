const express = require("express");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();
const port = process.env.PORT;
const pathPrefix = process.env.PATH_PREFIX;

app.all(`${pathPrefix}/:file`, (req, res) => {
  const delay = Number(req.query.delay) || 0;
  const fb = req.query.fb;

  fs.readFile(
    path.join(__dirname, `./data/${req.params.file}.json`),
    (err, data) => {
      if (err) {
        console.log(err);
        let fbRes;

        switch (fb) {
          case "a":
            fbRes = [];
            break;
          case "o":
            fbRes = {};
            break;
          case "b":
            fbRes = false;
            break;
          case "n":
            fbRes = null;
            break;
          default:
            fbRes = [];
            break;
        }

        res.send(fbRes);
      } else {
        setTimeout(() => {
          res.header("Content-Type", "application/json");
          res.send(data);
        }, delay);
      }
    }
  );
});

app.listen(port, () => console.log(`Server running on localhost:${port}`));
