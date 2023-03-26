const mangoose = require('mangoose');

var moradaSchema = new mangoose.Schema({
    cidade: String,
    distrito: String,
});

var atributoSchema = new mangoose.Schema({
    fumador: Boolean,
    gosta_cinema: Boolean,
    gosta_viajar: Boolean,
    acorda_cedo: Boolean,
    gosta_ler: Boolean,
    gosta_musica: Boolean,
    gosta_comer: Boolean,
    gosta_animais_estimacao: Boolean,
    gosta_dancar: Boolean,
    comida_favorita: String,
});

var pessoaSchema = new mangoose.Schema({
    nome: String,
    idade: Number,
    sexo: String,
    morada: moradaSchema,
    desportos: [String],
    atributos: atributoSchema,
});

module.exports = mongoose.model('pessoa', pessoaSchema);
