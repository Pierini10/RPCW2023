var express = require('express');
var router = express.Router();
var Pessoa = require('../controllers/pessoa')

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Pessoa.list()
    .then(pessoas => {
      res.render('index', { plist: pessoas, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de Pessoas"})
    })
});

/* GET Student Form. */
router.get('/Pessoas/registo', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  res.render('addPessoaForm', {d: data})
});

/* GET Student page. */
router.get('/Pessoas/:idPessoa', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Pessoa.getPessoa(req.params.idPessoa)
    .then(Pessoa => {
      res.render('pessoa', { a: Pessoa, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo de Pessoa"})
    })
});

/* GET Student Update Form. */
router.get('/Pessoas/edit/:idPessoa', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Pessoa.getPessoa(req.params.idPessoa)
    .then(Pessoa => {
      res.render('updatePessoaForm', {a: Pessoa, d: data})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo de Pessoa"})
    })
});

/* GET Student Delete Form. */
router.get('/Pessoas/delete/:idPessoa', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Pessoa.getPessoa(req.params.idPessoa)
    .then(Pessoa => {
      res.render('deletePessoaForm', {a: Pessoa, d: data})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo de Pessoa"})
    })
});

/* GET Delete Confirmation */
router.get('/Pessoas/delete/:idPessoa/confirm', (req,res)=>{
  Pessoa.deletePessoa(req.params.idPessoa)
    .then(resposta => {
      res.redirect('/')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo de Pessoa"})
    })
})

// POST Student Form Data
router.post('/Pessoas/registo', (req,res) => {
  var data = new Date().toISOString().substring(0, 16)
  Pessoa.addPessoa(req.body)
    .then(Pessoa => {
      res.render('addPessoaConfirm', {a: Pessoa})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro no armazenamento do registo de Pessoa"})
    })
})

// POST Student Update Form
router.post('/Pessoas/edit', (req,res) => {
  var data = new Date().toISOString().substring(0, 16)
  Pessoa.updatePessoa(req.body)
    .then(Pessoa => {
      res.render('updatePessoaConfirm', {a: Pessoa})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na alteração do registo de Pessoa"})
    })
})

module.exports = router;
