
1. Cria o Dockerfile, a receita de bolo para criar a imagem Docker Exemplo:


```dockerfile
# 1. Imagem base: Usamos uma imagem oficial do Python 3.11
FROM python:3.11-slim

# 2. Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# 3. Copia o arquivo de dependências para o contêiner
COPY ./backend/requirements.txt .

# 4. Instala as dependências do Python
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copia todo o código do backend para dentro do contêiner
COPY ./backend .

# 6. Expõe a porta 8000 para que possamos acessar a API de fora
EXPOSE 8000

# 7. Comando para iniciar a API quando o contêiner for executado
#    --host 0.0.0.0 é crucial para que o Docker consiga expor a porta
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
```

-----

2. : O Maestro da Orquestra (docker-compose.yml)

Agora, na mesma pasta, crie o arquivo mais importante: **`docker-compose.yml`**. Ele vai definir e conectar nossos serviços (`api` e `db`).

Cole o seguinte conteúdo nele:

```yaml
version: '3.8'

services:
  # Serviço da API em Python (FastAPI)
  api:
    build: .
    container_name: meu_corre_api
    ports:
      - "8000:8000"
    volumes:
      # Mapeia o código local para o contêiner para live-reloading
      - ./backend:/app
    environment:
      # Variáveis de ambiente para conectar ao banco de dados
      - DATABASE_URL=postgresql://user:password@db:5432/meudb
    depends_on:
      - db

  # Serviço do Banco de Dados (PostgreSQL)
  db:
    image: postgres:15-alpine
    container_name: meu_corre_db
    ports:
      # Expõe a porta do DB para podermos conectar com o DBeaver, por exemplo
      - "5432:5432"
    volumes:
      # Garante que os dados do banco não sejam perdidos ao reiniciar
      - postgres_data:/var/lib/postgresql/data/
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=meudb

# Define o volume para persistência dos dados do banco
volumes:
  postgres_data:
```

-----

### Passo 4: O Código Inicial da API

Agora vamos criar os arquivos Python dentro da pasta `backend`.

1.  **`backend/requirements.txt`**: Liste as bibliotecas que a API precisa.

    ```txt
    fastapi
    uvicorn[standard]
    sqlalchemy
    psycopg2-binary
    ```

2.  **`backend/main.py`**: Crie um ponto de partida para a API, só para testar.

    ```python
    from fastapi import FastAPI

    app = FastAPI(
        title="Meu Corre | Vendas na Mão",
        version="0.1.0"
    )

    @app.get("/")
    def read_root():
        return {"status": "API 'Meu Corre' no ar!", "ambiente": "Docker"}

    ```

Sua estrutura de pastas final deve estar assim:

```
meu-corre/
├── backend/
│   ├── main.py
│   └── requirements.txt
├── Dockerfile
└── docker-compose.yml
```

-----

### Passo 5: Colocando Tudo para Rodar\!

Na pasta raiz do projeto  e rode o seguinte comando:

```bash
docker-compose up --build
```

  * `--build`: Força o Docker a construir a imagem da sua API pela primeira vez.
  * `up`: Sobe (inicia) os contêineres definidos no `docker-compose.yml`.

