const http = require('http');
const url = require('url');

const PORT = 3000;
const server = http.createServer(function (req, res) {
    const parsedUrl = url.parse(req.url, true);
    const pathName = parsedUrl.pathname;

    if (pathName === '/index') {
        index(req, res);
    } else if (pathName === '/triacontagono') {
        nomeSeuProblema(req, res, parsedUrl.query);
    } else if (pathName === '/autor') {
        autor(req, res);
    } else {
        naoEncontrado(req, res);
    }
});

function index(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    </head>
    <body>`);
    res.write('<h1>Problema: Calcular Área de Cerca Q</h1>');
    res.write('<p>Descrição do problema:</p>');
    res.write('<p>Calcule a área de uma cerca em forma de triacontágono. Se a área for maior que 200 metros quadrados, é uma cerca grande. Se for menor que 200 metros quadrados, é uma cerca pequena.</p>');
    res.write('<form action="/triacontagono" method="get">');
    res.write('<label>');
    res.write('<span>Nome</span>');
    res.write('<input name="nome">');
    res.write('</label>');
    res.write('<label>');
    res.write('<span>Tipo</span>');
    res.write('<input name="tipo">');
    res.write('</label>');
    res.write('<label>');
    res.write('<span>Lado</span>');
    res.write('<input name="lado">');
    res.write('</label>');
    res.write('<button>Calcular</button>');
    res.write('</form>');
    res.write(`</body>
    res.write('<footer>');
    res.write('<p>Desenvolvido Por George Paulo</p>');
    res.write('</footer>');
    </html>`);
    res.end();
}

function cercaQ(req, res, query) {
    const nome = query.nome;
    const tipo = query.tipo;
    const lado = parseFloat(query.lado);
    const area = (30 * lado * lado) / (4 * (1 / Math.tan(Math.PI / 30)));
    const motivo = "Calcule a área de uma cerca em forma de triacontágono. Se a área for maior que 200 metros quadrados, é uma cerca grande. Se for menor que 200 metros quadrados, é uma cerca pequena.";

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    </head>
    <body>`);
    res.write(`<h1>Problema: Calcular Área de Cerca</h1>`);
    res.write(`<p>Nome: ${nome}</p>`);
    res.write(`<p>Tipo: ${tipo}</p>`);
    res.write(`<p>Lado: ${lado}</p>`);
    res.write(`<p>Área: ${area} metros quadrados</p>`);
    res.write(`<p>Explicação da conta:</p>`);
    res.write(`<p>${motivo}</p>`);
    res.write(`</body>
    res.write('<footer>');
    res.write('<p>Desenvolvido Por George Paulo</p>');
    res.write('</footer>');
    </html>`);
    res.end();
}

function autor(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    </head>
    <body>`);
    res.write('<h1>Autor</h1>');
    res.write('<p>Nome: George Paulo</p>');
    res.write('<h2>Formações acadêmicas:</h2>');
    res.write('<ul>');
    res.write('<li>Técnico em Informártica para Internet</li>');
    res.write('<li>Instituo Federal do Ceará</li>');
    res.write('</ul>');
    res.write('<h2>Experiências profissionais:</h2>');
    res.write('<ul>');
    res.write('<li>Militar do Exército Brasileiro</li>');
    res.write('<li>Trabalhando atualmente com infraestruturada de TI</li>');
    res.write('</ul>');
    res.write(`</body>
    res.write('<footer>');
    res.write('<p>Desenvolvido Por George Paulo</p>');
    res.write('</footer>');
    </html>`);
    res.end();
}

function naoEncontrado(req, res) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    </head>
    <body>`);
    res.write('<h1>Não encontrado!</h1>');
    res.write(`</body>
    res.write('<footer>');
    res.write('<p>Desenvolvido Por George Paulo</p>');
    res.write('</footer>');
    </html>`);
    res.end();
}

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
