const mongoose = require('mongoose');
const Anime = require('./models/anime');

mongoose.connect('mongodb://localhost:27017/meuBancoDeDados', { useNewUrlParser: true, useUnifiedTopology: true });

async function obterAnimes() {
    try {
        return await Anime.find();
    } catch (error) {
        console.error('Erro ao obter os animes:', error);
        throw error;
    }
}

module.exports = { obterAnimes };
