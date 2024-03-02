// import fs = require("fs");
// import http = require("http");
// import path = require("path");
import fs = require("node:fs");
import http = require("node:http");
import path from "node:path";

http
  .createServer((req, res) => {
    setTimeout(() => {
      console.log("hello");
    }, 1000); // Node에서는 setTimeout의 return값이  NodeJS.Timeout으로 되어있음
    window.setTimeout(() => {}, 1000); // 브라우저에서는 setTimeout의 return값이 number로 되어있는데

    fs.readFile(path.join(__dirname, "index.html"), (err, data) => {
      res.writeHead(200);
      res.end(data);
    });
  })
  .listen(8080, () => {
    console.log("서버 시작됨");
  });
