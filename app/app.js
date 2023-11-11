const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const CercaController = require('./controllers/CercaController');
const AutorController = require('./controllers/AutorController');
const EstaticoController = require('./controllers/EstaticoController');
const AuthController = require('./controllers/AuthController');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

const cercaController = new CercaController();
const autorController = new AutorController();
const estaticoController = new EstaticoController();
const authController = new AuthController();

const server = http.createServer((req, res) => {
    let [url, queryString] = req.url.split('?');
    let urlList = url.split('/');
    url = urlList[1];
    let metodo = req.method;

    if (url == 'index') {
        cercaController.index(req, res);
    } else if (url == 'media') {
        cercaController.calcularArea(req, res);
    } else if (url == 'triacontagono' && metodo == 'POST') {
        cercaController.inserir(req, res);
    } else if (url == 'triacontagono' && metodo == 'GET') {
        cercaController.index(req, res);
    } else if (url == 'triacontagono' && metodo == 'PUT') {
        cercaController.alterar(req, res);
    } else if (url == 'triacontagono' && metodo == 'DELETE') {
        cercaController.apagar(req, res);
    } else if (url == 'autor') {
        autorController.index(req, res);
    } else if (url == 'login' && metodo == 'GET') {
        authController.index(req, res);
    } else if (url == 'logar' && metodo == 'POST') {
        authController.logar(req, res);
    } else {
        estaticoController.naoEncontrado(req, res);
    }
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
