const axios = require("axios");
const fs = require("fs");
const http = require("http");
const pages = require("./pages");
const url = require("url");

function listaTodosSexos(pessoas) {
  let sexos = [];

  for (let i = 0; i < pessoas.length; i++) {
    const sexo = pessoas[i].sexo;

    if (!sexos.includes(sexo)) {
      sexos.push(sexo);
    }
  }

  return sexos;
}

function listaTodosDesportos(pessoas) {
  let desportos = [];

  for (let i = 0; i < pessoas.length; i++) {
    const pDesportos = pessoas[i].desportos;

    for (let j = 0; j < pDesportos.length; j++) {
      const desporto = pDesportos[j];

      if (!desportos.includes(desporto)) {
        desportos.push(desporto);
      }
    }
  }

  return desportos;
}

function listaTopProfissoes(pessoas) {
  let profissoes = [];

  for (let i = 0; i < pessoas.length; i++) {
    const profissao = pessoas[i].profissao;

    const index = profissoes.findIndex((e) => e.key === profissao);

    if (index == -1) {
      profissoes.push({ key: profissao, value: 1 });
    } else {
      profissoes[index].value += 1;
    }
  }

  profissoes = profissoes.sort((p1, p2) => (p1.value < p2.value ? 1 : -1));
  profissoes = profissoes.slice(0, 10);
  profissoes = profissoes.map((e) => e.key);

  return profissoes;
}

function filtraPessoasDesporto(pessoas, desporto) {
  let res = [];

  for (let i = 0; i < pessoas.length; i++) {
    const element = pessoas[i];

    if (element.desportos.includes(desporto)) {
      res.push(element);
    }
  }

  return res;
}

const server = http.createServer((req, res) => {
  const dicURL = url.parse(req.url, true);
  const partsURL = url.parse(req.url, true).pathname.split("/");

  if (dicURL.pathname == "/") {
    fs.readFile("src/index.html", (err, data) => {
      res.writeHead(200, "text/html");

      if (err) {
        res.write("Erro: " + err);
      } else {
        res.write(data);
      }

      res.end();
    });
  } else if (dicURL.pathname == "/pessoas") {
    axios
      .get("http://localhost:3000/pessoas")
      .then((resp) => {
        const pessoas = resp.data;
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(pages.pessoas(pessoas, "Todas as pessoas"));
      })
      .catch((erro) => {
        console.log("Erro: " + erro);
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end("ERRO: " + erro);
      });
  } else if (dicURL.pathname == "/sexo") {
    axios
      .get("http://localhost:3000/pessoas")
      .then((resp) => {
        const pessoas = resp.data;
        const sexos = listaTodosSexos(pessoas);

        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(pages.indice(sexos, "Sexos", dicURL.pathname));
      })
      .catch((erro) => {
        console.log("Erro: " + erro);
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end("ERRO: " + erro);
      });
  } else if (dicURL.pathname == "/desporto") {
    axios
      .get("http://localhost:3000/pessoas")
      .then((resp) => {
        const pessoas = resp.data;
        const desportos = listaTodosDesportos(pessoas);

        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(pages.indice(desportos, "Desportos", dicURL.pathname));
      })
      .catch((erro) => {
        console.log("Erro: " + erro);
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end("ERRO: " + erro);
      });
  } else if (dicURL.pathname == "/profissao") {
    axios
      .get("http://localhost:3000/pessoas")
      .then((resp) => {
        const pessoas = resp.data;
        const profissoes = listaTopProfissoes(pessoas);

        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(pages.indice(profissoes, "Top 10 profissões", dicURL.pathname));
      })
      .catch((erro) => {
        console.log("Erro: " + erro);
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end("ERRO: " + erro);
      });
  } else if (
    dicURL.pathname == "/w3.css" ||
    partsURL[partsURL.length - 1] == "w3.css"
  ) {
    fs.readFile("src/w3.css", (err, data) => {
      res.writeHead(200, "text/css");

      if (err) {
        res.write("Erro: " + err);
      } else {
        res.write(data);
      }

      res.end();
    });
  } else if (
    partsURL.length == 3 &&
    partsURL[0] == "" &&
    partsURL[1] == "pessoa"
  ) {
    axios
      .get(`http://localhost:3000/pessoas/${partsURL[2]}`)
      .then((resp) => {
        const pessoa = resp.data;

        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(pages.pessoa(pessoa));
      })
      .catch((erro) => {
        console.log("Erro: " + erro);
        console.log("COISAS ");
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end("ERRO: " + erro);
      });
  } else if (
    partsURL.length == 3 &&
    partsURL[0] == "" &&
    partsURL[1] == "sexo"
  ) {
    axios
      .get(`http://localhost:3000/pessoas?sexo=${partsURL[2]}`)
      .then((resp) => {
        const pessoas = resp.data;

        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(pages.pessoas(pessoas, `Sexo ${partsURL[2]}`));
      })
      .catch((erro) => {
        console.log("Erro: " + erro);
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end("ERRO: " + erro);
      });
  } else if (
    partsURL.length == 3 &&
    partsURL[0] == "" &&
    partsURL[1] == "desporto"
  ) {
    axios
      .get(`http://localhost:3000/pessoas`)
      .then((resp) => {
        const pessoas = resp.data;
        const pessoasDesp = filtraPessoasDesporto(pessoas, partsURL[2]);

        res.writeHead(200, {
          "Content-Type": "text/html; charset=utf-8",
        });
        res.end(pages.pessoas(pessoasDesp, `Desporto ${partsURL[2]}`));
      })
      .catch((erro) => {
        console.log("Erro: " + erro);
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end("ERRO: " + erro);
      });
  } else if (
    partsURL.length == 3 &&
    partsURL[0] == "" &&
    partsURL[1] == "profissao"
  ) {
    axios
      .get(`http://localhost:3000/pessoas?profissao=${partsURL[2]}`)
      .then((resp) => {
        const pessoas = resp.data;

        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(pages.pessoas(pessoas, `Profissão ${partsURL[2]}`));
      })
      .catch((erro) => {
        console.log("Erro: " + erro);
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end("ERRO: " + erro);
      });
  } else {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end("ERRO: Operação não suportada");
  }
});

server.listen(7777);

console.log("Servidor à escuta na porta 7777!");
