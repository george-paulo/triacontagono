require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const CercaController = require('./controllers/CercaController');
const AutorController = require('./controllers/AutorController');
const EstaticoController = require('./controllers/EstaticoController');
const AuthController = require('./controllers/AuthController'); // Importe o AuthController

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

const cercaController = new CercaController();
const autorController = new AutorController();
const estaticoController = new EstaticoController();
const authController = new AuthController(); // Instancie o AuthController

app.get('/', (req, res) => {
    estaticoController.naoEncontrado(req, res);
});

app.post('/triacontagono', (req, res) => {
    cercaController.inserir(req, res);
});

app.get('/index', (req, res) => {
    res.render('index');
});

app.get('/triacontagono', (req, res) => {
    cercaController.index(req, res);
});

app.post('/triacontagono', (req, res) => {
    cercaController.calcularArea(req, res);
});

app.put('/triacontagono/:id', (req, res) => {
    cercaController.alterar(req, res);
});

app.delete('/triacontagono/:id', (req, res) => {
    cercaController.apagar(req, res);
});

app.get('/autor', (req, res) => {
    autorController.index(req, res);
});

app.get('/login', authController.index);

app.post('/logar', authController.logar);

app.use((req, res) => {
    estaticoController.naoEncontrado(req, res);
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
