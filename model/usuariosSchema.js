const mongoose = require('mongoose');

const usuariosSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    sobrenome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    }
});

const usuarios = mongoose.model('Usuarios', usuariosSchema);

module.exports = usuarios;
