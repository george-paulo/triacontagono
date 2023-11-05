const express = require('express');
const app = express();
const CercaController = require('./controllers/CercaController');
const AutorController = require('./controllers/AutorController');
const EstaticoController = require('./controllers/EstaticoController');
const bodyParser = require('body-parser');
const Cerca = require('./lib/triacontagono/Cerca');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

const PORT = 3000;

const cercaController = new CercaController();
const autorController = new AutorController();
const estaticoController = new EstaticoController();

app.get('/index', (req, res) => {
    res.render('index');
});

app.get('/triacontagono', cercaController.get);

app.post('/triacontagono', cercaController.post);

// Rota PUT para atualizar os dados da cerca
app.put('/triacontagono/:id', cercaController.put);

// Rota DELETE para excluir uma cerca
app.delete('/triacontagono/:id', cercaController.delete);

app.get('/autor', (req, res) => {
    autorController.index(req, res);
});

app.use((req, res) => {
    estaticoController.naoEncontrado(req, res);
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});