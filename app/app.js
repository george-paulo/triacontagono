const http = require('http');
const express = require('express');
const CercaController = require('./controllers/CercaController');
const EstaticoController = require('./controllers/EstaticoController');
const AutorController = require('./controllers/AutorController');
const CercaDao = require('./lib/triacontagono/CercaDao');

const cercaDao = new CercaDao();
const cercaController = new CercaController(cercaDao);
const estaticoController = new EstaticoController();
const autorController = new AutorController();

const PORT = 3000;

const server = http.createServer((req, res) => {
    const { url, method } = req;
    const urlList = url.split('/');
    const path = urlList[1];

    if (path === 'index') {
        cercaController.index(req, res);
    } else if (path === 'triacontagono' && method === 'GET') {
        cercaController.listar(req, res);
    } else if (path === 'triacontagono' && method === 'POST') {
        cercaController.criar(req, res);
    } else if (path === 'triacontagono' && method === 'PUT') {
        cercaController.atualizar(req, res);
    } else if (path === 'triacontagono' && method === 'DELETE') {
        cercaController.deletar(req, res);
    } else if (path === 'autor') {
        autorController.index(req, res);
    } else {
        estaticoController.naoEncontrado(req, res);
    }
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
