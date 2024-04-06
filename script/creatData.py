import requests
from googletrans import Translator
from pymongo import MongoClient
import string

# URL de conexão ao MongoDB
uri = "mongodb://localhost:27017/"

# Conectar ao MongoDB
client = MongoClient(uri)

# Acesse o banco de dados
db = client["meuBancoDeDados"]

# Acesse a coleção de animes
collection = db["animes"]

# Crie um objeto Translator
tradutor = Translator()



def remover_pontuacao(texto):
    # Cria uma tabela de tradução que mapeia todos os caracteres de pontuação para None
    tabela = str.maketrans('', '', string.punctuation)
    # Aplica a tradução utilizando a tabela criada
    texto_sem_pontuacao = texto.translate(tabela)
    return texto_sem_pontuacao





for i in range(100,111,1):
    # URL da API que você deseja chamar
    url = f'https://kitsu.io/api/edge/anime/{i}/'

    # Realiza a requisição GET para a URL especificada
    response = requests.get(url)

    # Verifica se a requisição foi bem-sucedida (código de status 200)
    if response.status_code == 200:
        # Recupera os dados da resposta da API (em formato JSON, por exemplo)
        dados = response.json()
        nomeAnime = dados['data']['attributes']['titles']['en_jp']
        #print('nome',nomeAnime)

        synopsis =  dados['data']['attributes']['synopsis']
        synopsis_traduzido = tradutor.translate(synopsis, src='en', dest='pt')
        #print('synopsis', synopsis_traduzido.text)

        img =  dados['data']['attributes']['posterImage']['small']
        img = requests.get(img)

        nomeImg = nomeAnime.replace(" ","")
        nomeImg = remover_pontuacao(nomeImg)
        if img.status_code == 200:
            with open(f'./Capas/{nomeImg}.jpg', 'wb') as arquivo:
                arquivo.write(img.content)
                #print('Imagem baixada com sucesso!')
        else:
            continue

        datalancamento =  dados['data']['attributes']['startDate'][:4]
        #print('data',datalancamento)
        
        #print(dados['data']["relationships"]['episodes']['links']['self'])
        episodeos = requests.get(dados['data']["relationships"]['episodes']['links']['self'])
        quantidadeEpisodeos = 0
        if episodeos.status_code == 200:
            episodeos = episodeos.json()
            quantidadeEpisodeos = len(episodeos['data'])


        anime = {
                "nome": nomeAnime,
                "ano_lancamento": datalancamento ,
                "descricao": synopsis_traduzido.text ,
                "img":"http://localhost:3000/Capas/" + nomeImg +".jpg",
                "Legendado-episodios":quantidadeEpisodeos,
                "Dublado-episodios" :0
        }
        
        # Insira o anime na coleção
        result = collection.insert_one(anime)

        # Imprima o ID do anime inserido
        print("Anime inserido com ID:", result.inserted_id)


    else:
        # Caso a requisição não tenha sido bem-sucedida, exibe uma mensagem de erro
        print('Erro ao realizar a requisição:', response.status_code)
