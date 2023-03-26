var Pessoa = require('../models/pessoa');

// Pessoa list
module.exports.list = () => {
    return Pessoa.find()
        .sort({ nome: 1 })
        .then((docs) => {
            return docs;
        })
        .catch((erro) => {
            return erro;
        });
};

module.exports.getPessoa= (id) => {
    return Pessoa.find({ id: id })
        .then((Pessoa) => {
            return Pessoa;
        })
        .catch((erro) => {
            return erro;
        });
};

module.exports.addPessoa = (a) => {
    return Pessoa.create(a)
        .then((Pessoa) => {
            return Pessoa;
        })
        .catch((erro) => {
            return erro;
        });
};

module.exports.updatePessoa = (a) => {
    return Pessoa.updateOne({ id: a.id }, a)
        .then((Pessoa) => {
            return Pessoa;
        })
        .catch((erro) => {
            return erro;
        });
};

module.exports.deletePessoa = (id) => {
    return Pessoa.deleteOne({ id: id })
        .then((Pessoa) => {
            return Pessoa;
        })
        .catch((erro) => {
            return erro;
        });
};
