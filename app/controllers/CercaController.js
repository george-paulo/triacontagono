const Cerca = require('../lib/triacontagono/Cerca');
const CercaDao = require('../lib/triacontagono/CercaDao');

class CercaController {
    constructor() {
        this.cercaDao = new CercaDao(); 
    }

    get(req, res) {
        res.render('triacontagono', {
            nome: '', 
            tipo: '',
            lado: '',
            area: '',
            mensagem: '',
            motivo: ''
        });
    }

    post(req, res) {
        const { nome, tipo, lado } = req.body;

        if (isNaN(lado)) {
            return res.render('triacontagono', {
                nome,
                tipo,
                lado: 'Valor inválido',
                area: 'Valor inválido',
                mensagem: 'O valor do lado não é um número válido.',
                motivo: 'Calcule a Área de uma cerca em forma de triacontagono. Se a Área for maior que 200 metros quadrados, é uma cerca grande. Se for menor que 200 metros quadrados, é uma cerca pequena.'
            });
        } else {
            const area = Cerca.calcularArea(lado);
            const mensagem = area > 200 ? 'É uma cerca grande.' : 'É uma cerca pequena';
            const motivo = 'Calcule a Área de uma cerca em forma de triacontagono. Se a Área for maior que 200 metros quadrados, é uma cerca grande. Se for menor que 200 metros quadrados, é uma cerca pequena.';
        
            res.render('triacontagono', {
                nome,
                tipo,
                lado,
                area,
                mensagem,
                motivo
            });
        }
    }

    put(req, res) {
        const { nome, tipo, lado } = req.body;
        const id = req.params.id;

        if (isNaN(lado)) {
            return res.status(400).json({ mensagem: 'O valor do lado não é um número válido.' });
        } else {
            const area = Cerca.calcularArea(lado);
            const mensagem = area > 200 ? 'É uma cerca grande.' : 'É uma cerca pequena';
            const motivo = 'Calcule a Área de uma cerca em forma de triacontagono. Se a Área for maior que 200 metros quadrados, é uma cerca grande. Se for menor que 200 metros quadrados, é uma cerca pequena.';

            res.status(200).json({
                nome,
                tipo,
                lado,
                area,
                mensagem,
                motivo,
            });
        }
    }

    delete(req, res) {
        const id = req.params.id;
        res.status(200).json({ mensagem: 'Cerca excluída com sucesso' });
    }
}

module.exports = CercaController;
