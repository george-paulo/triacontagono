class EstaticoController {
    naoEncontrado(req, res) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write(`<!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
        </head>
        <body>
            <h1>Não encontrado!</h1>
        </body>
        </html>`);
        res.end();
    }
}

module.exports = EstaticoController;
