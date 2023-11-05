const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const CercaController = require('./controllers/CercaController');
const AutorController = require('./controllers/AutorController');
const EstaticoController = require('./controllers/EstaticoController');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

const cercaController = new CercaController();
const autorController = new AutorController();
const estaticoController = new EstaticoController();

app.get('/index', (req, res) => {
    res.render('index');
});

app.get('/triacontagono', (req, res) => {
    cercaController.get(req, res);
});

app.post('/triacontagono', (req, res) => {
    cercaController.post(req, res);
});

app.put('/triacontagono/:id', (req, res) => {
    cercaController.put(req, res);
});

app.delete('/triacontagono/:id', (req, res) => {
    cercaController.delete(req, res);
});

app.get('/autor', (req, res) => {
    autorController.index(req, res);
});

app.use((req, res) => {
    estaticoController.naoEncontrado(req, res);
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
