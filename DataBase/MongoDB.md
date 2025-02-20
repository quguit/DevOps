1. Iniciar o serviço do MongoDB (caso não esteja rodando)
# sudo systemctl start mongod

2. Para verificar se o serviço está ativo:
# sudo systemctl status mongod

3. Abrir o terminal do MongoDB
# mongosh

4. Criar um banco de dados caso ja exista ele ascessa o banco 
# use <meuDatabase>;

5. Criar uma collection, pode ser aspas simples ou dupla
# db.createCollection('minhacollection'); 

6. Inserindo um documento diretamente e criando uma collection
# db.minhacollection.insertOne({ nome: "Guilherme", idade:25});
# db.collection("Posts").insertOne({ *conteudo aqui* })


7. ver collections criadas
# show collection

8. visualizar documentos dentro de collections
# db.minhacollection.find().pretty();

9. deletar o documento onde tem o nome = Guilherme
# db.minhaCollection.deleteOne({nome:Guilherme})
# db.minhaCollection.deleteOne({id:ObjectOd("4646455")})

