const mongoose = require('mongoose');

// Defina o esquema para os animes
const animeSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    ano_lancamento: {
        type: Number,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    legendado_episodios:{
        type: Number,
        required: true
    },
    dublado_episodios: {
        type: Number,
        required: true
    },
});

// Crie o modelo 'Anime' com base no esquema
const Anime = mongoose.model('Anime', animeSchema);

module.exports = Anime;
