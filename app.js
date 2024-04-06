const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3000;
const Anime = require("./model/animeSchema")

app.use(express.static(path.join(__dirname, '/Capas')));

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/meuBancoDeDados', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conectado com sucesso ao MongoDB');
    })
    .catch(error => {
        console.error('Erro ao conectar ao MongoDB:', error);
    });

    
// Rota para acessar as imagens
app.get('/Capas/:nomeArquivo', (req, res) => {
    const nomeArquivo = req.params.nomeArquivo;
    res.sendFile(path.join(__dirname, 'Capas', nomeArquivo));
});


// Rota para adicionar um novo anime
app.post('/animes', async (req, res) => {
        const novoAnime = new Anime({
            "nome": req.body.nome,
            "ano_lancamento":  req.body.ano_lancamento,
            "descricao":req.body.descricao ,
            "img":req.body.img,
            "Legendado-episodios":req.body.Legendado_episodios,
            "Dublado-episodios":req.body.Dublado_episodios
        });
        await novoAnime.save()
        .then(data=>{
            res.json(data);
        })
        .catch(err =>{
            res.json({message: err});
            console.log(err)
        });
});

// Rota para pegar todos os animes 
app.get('/animes', async (req, res) => {
    const animes = await Anime.find();
    res.json(animes);
});

app.listen(port, () => {
    console.log(`Servidor Express em execução em http://localhost:${port}`);
});
