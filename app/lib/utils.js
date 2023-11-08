const fs = require('fs');
const ejs = require('ejs');

const utils = {
    
    decodificarUrl: function (url) {
        const propriedades = url.split('&');
        const query = {};
        for (const propriedade of propriedades) {
            const [variavel, valor] = propriedade.split('=');
            query[variavel] = valor;
        }
        return query;
    },

    
    renderizarEjs: function (res, arquivo, dados) {
        const texto = fs.readFileSync(arquivo, 'utf-8');
        const html = ejs.render(texto, dados);

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(html);
        res.end();
    },

    
    renderizarJSON: function (res, dados, status = 200) {
        res.writeHead(status, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(dados));
        res.end();
    },

    
    getCorpo: function (req) {
        return new Promise((resolve, reject) => {
            let corpoTexto = '';
            req.on('data', function (pedaco) {
                corpoTexto += pedaco;
            });
            req.on('end', () => {
                
                resolve(corpoTexto);
            });
        });
    },
};

module.exports = utils;