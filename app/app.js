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

app.get('/triacontagono', (req, res) => {
    res.render('triacontagono', {
        nome: '', 
        lado: '',
        area: '',
        mensagem: '',
        motivo: ''
    });
});

app.post('/triacontagono', (req, res) => {
    const { nome, lado } = req.body;

    if (isNaN(lado)) {
        return res.render('triacontagono', {
            nome,
            lado: 'Valor inválido',
            area: 'Valor inválido',
            mensagem: 'O valor do lado não é um número válido.',
            motivo: 'Calcule a Área de uma cerca em forma de triacontagono. Se a Área for maior que 200 metros quadrados, É uma cerca grande. Se for menor que 200 metros quadrados, É uma cerca pequena.'
        });
    } else {
        const area = Cerca.calcularArea(lado);
        const mensagem = area > 200 ? 'É uma cerca grande.' : 'É uma cerca pequena';
        const motivo = 'Calcule a Área de uma cerca em forma de triacontagono. Se a Área for maior que 200 metros quadrados, É uma cerca grande. Se for menor que 200 metros quadrados, É uma cerca pequena.';

        res.render('triacontagono', {
            nome,
            lado,
            area,
            mensagem,
            motivo
        });
    }
});

app.get('/autor', (req, res) => {
    autorController.index(req, res);
});

app.use((req, res) => {
    estaticoController.naoEncontrado(req, res);
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
