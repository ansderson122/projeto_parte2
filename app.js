const express = require('express');
const path = require('path');

const app = express();
const port = 3001;
const { obterAnimes,cadastrarAnime,cadastrarUsuarios,autenticarUsuario } = require('./data');
const cors = require('cors');
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(cors()); 
app.use(express.static(path.join(__dirname, '/Capas')));


// Rota para acessar as imagens
app.get('/Capas/:nomeArquivo', (req, res) => {
    const nomeArquivo = req.params.nomeArquivo;
    res.sendFile(path.join(__dirname, 'Capas', nomeArquivo));
});


// Rota para adicionar um novo anime
app.post('/animes', async (req, res) => {
    try {
        const anime = await cadastrarAnime(req.body);
        res.json(anime);
    } catch (error) {
        console.error('Erro ao cadastrar o anime:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

// Rota para pegar todos os animes 
app.get('/animes', async (req, res) => {
    try {
        const animes = await obterAnimes();
        const destaques = [ 16, 5, 11, 4, 15, 2, 13, 7, 9 ]
        const assistidos = [ 13, 5, 4, 2, 7, 10, 12, 14, 9 ]
        const assistatambem = [13,18,12,6,19,1,17,3,16,7,8,11,10,15,14,4,9,20,5,2]
        res.json([animes,destaques,assistidos,assistatambem]);
    } catch (error) {
        console.error('Erro ao obter os animes:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

// Rota para cadastra usuários 
app.post('/usuarios', async (req,res) =>{
    try {
        const usuario = await cadastrarUsuarios(req.body);
        res.json(usuario);
    } catch (error) {
        console.error('Erro ao cadastrar o usuarios:', error);
        res.status(500).send('Erro interno do servidor');
    }
})

// Rota para autenticar usuários
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;
  
    try {
      const usuario = await autenticarUsuario(email, senha);
      console.log(usuario)  
      if (!usuario) {
        return res.status(401).json({ message: 'Email ou senha incorretos' });
      }
  
      res.status(200).json({ message: 'Login bem-sucedido' });
    } catch (error) {
      console.error('Erro ao autenticar usuário:', error);
      res.status(500).json({ message: 'Erro ao autenticar usuário' });
    }
  });
  

app.listen(port, () => {
    console.log(`Servidor Express em execução em http://localhost:${port}`);
});
