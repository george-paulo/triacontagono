const fs = require('fs');
const ejs = require('ejs');

const utils = {
    decodeUrl: function (url) {
        let properties = url.split('&');
        let query = {};
        for (let property of properties) {
            let [variable, value] = property.split('=');
            query[variable] = value;
        }
        return query;
    },

    renderEjs: function (res, file, data) {
        fs.readFile(file, 'utf-8', (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Erro interno.');
                return;
            }
            const rendered = ejs.render(content, data);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(rendered);
        });
    },

    renderJSON: function (res, data, status = 200) {
        res.writeHead(status, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(data));
        res.end();
    },

    getCorpo: function(req) {
        return new Promise((resolve, reject) => {
            let corpoTexto = '';
            let i = 0;
            req.on('data', function(pedaco) {
                corpoTexto += pedaco;
                console.log(i++, corpoTexto);
            });
            req.on('end', () => {
                let corpo = utils.decodificarUrl(corpoTexto);
                resolve(corpo);
            });
        });
    },

    decodificarUrl: function(url) {
        let propriedades = url.split('&');
        let query = {};
        for (let propriedade of propriedades) {
            let [variavel, valor] = propriedade.split('=');
            query[variavel] = valor;
        }
        return query;
    }
};

module.exports = utils;