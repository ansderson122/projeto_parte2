from pymongo import MongoClient

# URL de conexão ao MongoDB
uri = "mongodb://localhost:27017/"

# Conectar ao MongoDB
client = MongoClient(uri)

# Acesse o banco de dados
db = client["meuBancoDeDados"]

# Acesse a coleção de animes
collection = db["animes"]
nomes = ['D.C.: Da Capo','El Hazard: The Wanderers','Soukyuu no Fafner: Dead Aggressor','Kidou Senshi Gundam 0080: Pocket no Naka no Sensou',	"Kidou Senshi Gundam 0083: Stardust Memory",
         'El Hazard 2: The Magnificent World',   
         ]

for anime in nomes:
    resultado = collection.delete_one({"nome": f"{anime}"})
    print("Documento removido com sucesso." if resultado.deleted_count > 0 else "Nenhum documento removido.")
