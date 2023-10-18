const ejs = require('ejs');
const fs = require('fs');

const utils = {
    renderizarEjs: function (res, arquivo, dados) {
        const texto = fs.readFileSync(arquivo, 'utf-8');
        const html = ejs.render(texto, dados);

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(html);
        res.end();
    }
};

module.exports = utils;
