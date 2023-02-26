const http = require("http");
const fs = require("fs");

async function sendHTML(err, data, res) {
  res.writeHead(200, "text/html");

  if (err) {
    res.write("Erro: " + err);
  } else {
    res.write(data);
  }

  res.end();
}

const server = http.createServer(function (req, res) {
  if (req.url === "/") {
    fs.readFile("index.html", (err, data) => sendHTML(err, data, res));
  } else {
    const path = req.url.substring(1);
    fs.readFile(`files/html/arq${path}.html`, (err, data) => sendHTML(err, data, res));
  }
});

server.listen(7777);

console.log("Servidor à escuta na porta 7777...");
