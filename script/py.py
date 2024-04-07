from pymongo import MongoClient

# URL de conexão ao MongoDB
uri = "mongodb://localhost:27017/"

# Conectar ao MongoDB
client = MongoClient(uri)

# Acesse o banco de dados
db = client["meuBancoDeDados"]

# Acesse a coleção de animes
collection = db["animes"]

# Atualizar cada documento na coleção 'animes' para excluir os primeiros caracteres do campo 'img'
# Atualizar cada documento na coleção 'animes' para adicionar "http://localhost:3001/Capas/" ao início do campo 'img'
resultado = collection.update_many({}, [{"$set": {"img": {"$concat": ["http://localhost:3001/Capas/", "$img"]}}}])
'''
nomes = ['D.C.: Da Capo','El Hazard: The Wanderers','Soukyuu no Fafner: Dead Aggressor','Kidou Senshi Gundam 0080: Pocket no Naka no Sensou',	"Kidou Senshi Gundam 0083: Stardust Memory",
         'El Hazard 2: The Magnificent World',   
         ]

for anime in nomes:
    resultado = collection.delete_one({"nome": f"{anime}"})
    print("Documento removido com sucesso." if resultado.deleted_count > 0 else "Nenhum documento removido.")
    
'''
print(f"{resultado.modified_count} documentos foram atualizados com sucesso.")

client.close()

