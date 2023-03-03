const axios = require("axios");
const fs = require("fs");
const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {});

server.listen(7777);

console.log("Servidor à escuta na porta 7777!");
