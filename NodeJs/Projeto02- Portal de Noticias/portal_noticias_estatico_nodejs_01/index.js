// Importa o framework Express, que facilita a criação de servidores HTTP no Node.js
const express = require('express');

// Importa o body-parser, um middleware usado para processar dados enviados no corpo das requisições
var bodyParser = require('body-parser');

// Importa o módulo 'path', que auxilia na manipulação de caminhos de arquivos e diretórios
const path = require('path');

// Inicializa o aplicativo Express
const app = express();

// Configura o middleware body-parser para lidar com JSON
app.use(bodyParser.json());  // Permite que o servidor aceite requisições com JSON no corpo

// Configura o middleware body-parser para processar dados enviados via formulário (application/x-www-form-urlencoded)
app.use(bodyParser.urlencoded({
  extended: true  // Se true, permite objetos e arrays complexos no corpo da requisição
}));

// Configuração do mecanismo de visualização (view engine) para renderizar arquivos HTML usando EJS
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Define um diretório público para servir arquivos estáticos (CSS, imagens, scripts, etc.)
app.use('/public', express.static(path.join(__dirname, 'public')));

// Define o diretório onde as views (páginas) HTML estarão localizadas
app.set('views', path.join(__dirname, '/pages'));

// Rota principal ('/') que responde às requisições GET
app.get('/', (req, res) => {
    
    // Verifica se há um parâmetro 'busca' na URL (req.query.busca)
    if (req.query.busca == null) {
        // Renderiza a página 'home.html' dentro da pasta definida em app.set('views')
        res.render('home', {});
    } else {
        // Retorna uma mensagem simples com o termo buscado
        res.send('Você buscou: ' + req.query.busca);
    }
});

// Rota dinâmica que captura um parâmetro na URL (:slug)
app.get('/:slug', (req, res) => {
    // Envia de volta o valor do parâmetro da URL (ex: /nodejs responderia "nodejs")
    res.send(req.params.slug);
});

// Inicia o servidor na porta 5000 e exibe uma mensagem no console quando está rodando
app.listen(5000, () => {
    console.log('server rodando!');
});
