const http = require("http");
const axios = require("axios");
const template = require("./template");
const static = require("./static.js");
const { parse } = require("querystring");

function collectRequestBodyData(request, callback) {
  if (request.headers["content-type"] === "application/x-www-form-urlencoded") {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk.toString();
    });
    request.on("end", () => {
      callback(parse(body));
    });
  } else {
    callback(null);
  }
}

function homePage(res, d, edit) {
  axios
    .get("http://localhost:3000/todo")
    .then((response) => {
      var todo = response.data;

      axios
        .get("http://localhost:3000/done")
        .then((response) => {
          var done = response.data;
          // Render page with the student's list
          res.writeHead(200, {
            "Content-Type": "text/html;charset=utf-8",
          });
          if (edit) {
            res.write(template.homePage(todo, done, d, edit));
          } else {
            res.write(template.homePage(todo, done, d));
          }
          res.end();
        })
        .catch(function (erro) {
          res.writeHead(200, {
            "Content-Type": "text/html;charset=utf-8",
          });
          res.write(
            "<p>Não foi possível obter a lista de realizados... Erro: " + erro
          );
          res.end();
        });
    })
    .catch(function (erro) {
      res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
      res.write("<p>Não foi possível obter a lista de ToDo... Erro: " + erro);
      res.end();
    });
}

// Server creation
var todoServer = http.createServer(function (req, res) {
  // Logger: what was requested and when it was requested
  var d = new Date().toISOString().substring(0, 16);
  console.log(req.method + " " + req.url + " " + d);

  // Handling request
  if (static.staticResource(req)) {
    static.serveStaticResource(req, res);
  } else {
    switch (req.method) {
      case "GET":
        if (req.url == "/") {
          homePage(res, d);
        } else {
          res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
          res.write("<p>Unsupported page!</p>");
          res.end();
        }
        break;
      case "POST":
        if (req.url == "/") {
          const url = "http://localhost:3000/";

          collectRequestBodyData(req, (result) => {
            if (result) {
              console.log(result.type);
              switch (result.type) {
                case "NEW":
                  const todo = {
                    what: result.what,
                    who: result.who,
                    dateDued: result.dateDued,
                  };

                  axios.post(url + "todo", todo).then((response) => {
                    homePage(res, d);
                  });
                  break;

                case "DONE":
                  axios
                    .get(url + "todo/" + result.id)
                    .then((response) => {
                      var todo = response.data;
                      // Render page with the student's list

                      axios
                        .delete(url + "todo/" + result.id)
                        .then((response) => {
                          axios
                            .post(url + "done", {
                              what: todo.what,
                              who: todo.who,
                              dateDued: todo.dateDued,
                            })
                            .then((response) => {
                              homePage(res, d);
                            });
                        });
                    })
                    .catch(function (erro) {
                      res.writeHead(200, {
                        "Content-Type": "text/html;charset=utf-8",
                      });
                      res.write(
                        "<p>Não foi possível obter o valor pretendido... Erro: " +
                          erro
                      );
                      res.end();
                    });

                  break;

                case "UNDONE":
                  axios
                    .get(url + "done/" + result.id)
                    .then((response) => {
                      var done = response.data;
                      // Render page with the student's list

                      axios
                        .delete(url + "done/" + result.id)
                        .then((response) => {
                          axios
                            .post(url + "todo", {
                              what: done.what,
                              who: done.who,
                              dateDued: done.dateDued,
                            })
                            .then((response) => {
                              homePage(res, d);
                            });
                        });
                    })
                    .catch(function (erro) {
                      res.writeHead(200, {
                        "Content-Type": "text/html;charset=utf-8",
                      });
                      res.write(
                        "<p>Não foi possível obter o valor pretendido... Erro: " +
                          erro
                      );
                      res.end();
                    });

                  break;

                case "REMOVEU":
                  axios
                    .delete("http://localhost:3000/todo/" + result.id)
                    .then((response) => {
                      homePage(res, d);
                    });

                  break;

                case "REMOVED":
                  axios
                    .delete("http://localhost:3000/done/" + result.id)
                    .then((response) => {
                      homePage(res, d);
                    });

                  break;

                case "EDITD":
                  axios
                    .get(url + "done/" + result.id)
                    .then((response) => {
                      var done = response.data;
                      // Render page with the student's list
                      homePage(res, d, {
                        type: "EDITD",
                        what: done.what,
                        id: done.id,
                        who: done.who,
                        dateDued: done.dateDued,
                      });
                    })
                    .catch(function (erro) {
                      res.writeHead(200, {
                        "Content-Type": "text/html;charset=utf-8",
                      });
                      res.write(
                        "<p>Não foi possível obter o valor pretendido... Erro: " +
                          erro
                      );
                      res.end();
                    });

                  break;

                case "EDITU":
                  axios
                    .get(url + "todo/" + result.id)
                    .then((response) => {
                      var todo = response.data;
                      // Render page with the student's list
                      homePage(res, d, {
                        type: "EDITU",
                        what: todo.what,
                        id: todo.id,
                        who: todo.who,
                        dateDued: todo.dateDued,
                      });
                    })
                    .catch(function (erro) {
                      res.writeHead(200, {
                        "Content-Type": "text/html;charset=utf-8",
                      });
                      res.write(
                        "<p>Não foi possível obter o valor pretendido... Erro: " +
                          erro
                      );
                      res.end();
                    });

                  break;

                case "EDITUC":
                  const todoN = {
                    id: result.id,
                    what: result.what,
                    who: result.who,
                    dateDued: result.dateDued,
                  };

                  axios
                    .put(url + "todo/" + result.id, todoN)
                    .then((response) => {
                      homePage(res, d);
                    });

                  break;

                case "EDITDC":
                  const doneN = {
                    id: result.id,
                    what: result.what,
                    who: result.who,
                    dateDued: result.dateDued,
                  };

                  axios
                    .put(url + "done/" + result.id, doneN)
                    .then((response) => {
                      homePage(res, d);
                    });

                  break;

                default:
                    res.writeHead(201, { "Content-Type": "text/html;charset=utf-8" });
              res.write("<p>Undefined type ...</p>");
              res.end();
                  break;
              }
            } else {
              res.writeHead(201, { "Content-Type": "text/html;charset=utf-8" });
              res.write("<p>Unable to collect data from body...</p>");
              res.end();
            }
          });
        } else {
          res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
          res.write("<p>Unsupported POST request: " + req.url + "</p>");
          res.write('<p><a href="/">Return</a></p>');
          res.end();
        }
        break;
      default:
        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        res.write("<p>" + req.method + " unsupported in this server.</p>");
        res.end();
    }
  }
});

todoServer.listen(7777, () => {
  console.log("Servidor à escuta na porta 7777...");
});
