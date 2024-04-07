from pymongo import MongoClient

# Conectar ao banco de dados local
client_local = MongoClient('mongodb://localhost:27017/')
db_local = client_local['meuBancoDeDados']

# Conectar ao MongoDB Atlas (banco de dados remoto)
client_remoto = MongoClient('mongodb+srv://ansderson84001:alh84001@cluster0.i9u9cjb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db_remoto = client_remoto['test']

dados_locais = db_local['animes'].find()
if dados_locais:
    # Assumindo que a coleção no banco remoto também se chama 'usuarios'
    resultado = db_remoto['animes'].insert_many(dados_locais)
    print(f"Documentos inseridos: {len(resultado.inserted_ids)}")
else:
    print("Nenhum documento para inserir.")