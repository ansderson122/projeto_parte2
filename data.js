const mongoose = require('mongoose');
const Anime = require('./model/animeSchema');
const Usuarios = require('./model/usuariosSchema')

const dbURI = 'mongodb+srv://ansderson84001:alh84001@cluster0.i9u9cjb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado com sucesso ao MongoDB'))
  .catch(err => console.log(err));

async function obterAnimes() {
    try {
        return await Anime.find();
    } catch (error) {
        console.error('Erro ao obter os animes:', error);
        throw error;
    }
}

async function cadastrarAnime(dadosAnime) {
    try {
        const novoAnime = new Anime({
            "nome": dadosAnime.nome,
            "ano_lancamento":  dadosAnime.ano_lancamento,
            "descricao":dadosAnime.descricao ,
            "img":dadosAnime.img,
            "Legendado-episodios":dadosAnime.Legendado_episodios,
            "Dublado-episodios":dadosAnime.Dublado_episodios
        });
        await novoAnime.save();
        console.log('Anime cadastrado com sucesso:', novoAnime);
        return novoAnime;
    } catch (error) {
        console.error('Erro ao cadastrar o anime:', error);
        throw novoAnime;
    }
}

async function cadastrarUsuarios(dadosUsuarios) {
    try {
        const novoUsuarios = new Usuarios({
            "nome": dadosUsuarios.nome,
            "sobrenome": dadosUsuarios.sobrenome,
            "email": dadosUsuarios.email,
            "senha": dadosUsuarios.senha,
        });
        await novoUsuarios.save();
        console.log('Usuario cadastrado com sucesso:', novoUsuarios);
        return novoUsuarios;
    } catch (error) {
        console.error('Erro ao cadastrar o anime:', error);
        throw error;
    }
}

const autenticarUsuario = async (email, senha) => {
    try {
 
        // Buscar o usuário pelo email no banco de dados
        const usuario = await Usuarios.findOne({ email });
        console.log(usuario)
  
        // Verificar se o usuário existe
        if (!usuario) {
            return null; 
        }
  
        const senhaCorreta = senha.toString() === usuario.senha
 
        // Verificar se as senhas correspondem
        if (!senhaCorreta) {
            return null; 
        }
  
      return usuario;
    } catch (error) {
      throw new Error('Erro ao autenticar usuário:', error);
    }
  };


module.exports = { obterAnimes,cadastrarAnime,cadastrarUsuarios,autenticarUsuario };
