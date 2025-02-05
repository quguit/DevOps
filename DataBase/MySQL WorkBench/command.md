# Relatório: Comandos para Gerenciamento do MySQL no Docker e Nativo

## 📌 1. Instalação do Docker no Zorin OS
Se o Docker ainda não estiver instalado, execute os seguintes comandos:

```bash
sudo apt update
sudo apt install -y docker.io docker-compose
```

Verifique se o Docker está rodando:
```bash
sudo systemctl start docker
sudo systemctl enable docker
docker --version
```

Se quiser rodar o Docker sem precisar do `sudo`, adicione o seu usuário ao grupo Docker:
```bash
sudo usermod -aG docker $USER
```
**Reinicie o sistema para aplicar as mudanças.**

---

## 🔹 2. Criando um Container MySQL no Docker
Crie um container MySQL rodando na porta padrão `3306`:

```bash
docker run -d --name mysql-server \
  -e MYSQL_ROOT_PASSWORD=senha123 \
  -e MYSQL_DATABASE=meubanco \
  -e MYSQL_USER=usuario \
  -e MYSQL_PASSWORD=senhauser \
  -p 3306:3306 \
  mysql:latest
```

**Explicação dos parâmetros:**
- `-d`: Roda o container em segundo plano.
- `--name mysql-server`: Nome do container.
- `-e MYSQL_ROOT_PASSWORD=senha123`: Define a senha do root.
- `-e MYSQL_DATABASE=meubanco`: Cria um banco de dados automaticamente.
- `-e MYSQL_USER=usuario`: Cria um usuário novo.
- `-e MYSQL_PASSWORD=senhauser`: Define a senha do usuário.
- `-p 3306:3306`: Mapeia a porta do MySQL no container para a máquina host.
- `mysql:latest`: Usa a imagem mais recente do MySQL.

---

## 🔹 3. Criando Outra Instância do MySQL
Se precisar rodar **duas versões diferentes do MySQL** ao mesmo tempo, basta mudar o nome do container e a porta. Exemplo:

```bash
docker run -d --name mysql-server2 \
  -e MYSQL_ROOT_PASSWORD=outrasenha \
  -e MYSQL_DATABASE=outrobanco \
  -e MYSQL_USER=outro_usuario \
  -e MYSQL_PASSWORD=outrasenhauser \
  -p 3307:3306 \
  mysql:5.7
```

Aqui estamos rodando um **MySQL 5.7** na porta `3307`, sem interferir no outro container.

---

## 🔹 4. Acessando o Banco de Dados no Container
Para conectar ao container MySQL via terminal:

```bash
docker exec -it mysql-server mysql -u root -p
```

Ou, se estiver rodando a segunda instância (na porta `3307`):

```bash
docker exec -it mysql-server2 mysql -u root -p
```

---

## 🔹 5. Gerenciamento dos Containers
### 🔄 Ver todos os containers rodando:
```bash
docker ps
```

### 🛑 Parar um container:
```bash
docker stop mysql-server
```

### ▶️ Iniciar um container parado:
```bash
docker start mysql-server
```

### ❌ Remover um container:
```bash
docker rm -f mysql-server
```

### 🔄 Reiniciar um container:
```bash
docker restart mysql-server
```

### 📌 Ver logs do MySQL no Docker:
```bash
docker logs mysql-server
```

---

## 🔹 6. Comandos para MySQL Nativo (Sem Docker)
Se você instalou o MySQL diretamente no seu sistema operacional, utilize os comandos abaixo para gerenciá-lo.

### 📌 Verificar se o MySQL está rodando:
```bash
sudo systemctl status mysql
```

### ▶️ Iniciar o MySQL:
```bash
sudo systemctl start mysql
```

### 🛑 Parar o MySQL:
```bash
sudo systemctl stop mysql
```

### 🔄 Reiniciar o MySQL:
```bash
sudo systemctl restart mysql
```

### 🚀 Habilitar o MySQL na inicialização do sistema:
```bash
sudo systemctl enable mysql
```

### 🚫 Desabilitar o MySQL na inicialização do sistema:
```bash
sudo systemctl disable mysql
```

### 🔄 Acessar o MySQL via Terminal:
```bash
mysql -u root -p
```

### 🗄 Criar um novo banco de dados:
```sql
CREATE DATABASE nome_do_banco;
```

### 🛠 Criar um novo usuário e conceder permissões:
```sql
CREATE USER 'usuario'@'localhost' IDENTIFIED BY 'senha';
GRANT ALL PRIVILEGES ON nome_do_banco.* TO 'usuario'@'localhost';
FLUSH PRIVILEGES;
```

### 🗑 Remover um banco de dados:
```sql
DROP DATABASE nome_do_banco;
```

### 🗂 Listar todos os bancos de dados:
```sql
SHOW DATABASES;
```

---

## 🛑 Conclusão
Com esses comandos, você pode instalar e gerenciar o MySQL tanto no **Docker** quanto de forma **nativa** no sistema operacional. Agora você pode rodar e administrar múltiplas instâncias do MySQL com facilidade. 🚀

