const Cerca = require('../lib/triacontagono/Cerca');

class CercaController {
    cercaQ(req) {
        const query = req.body;
        const nome = query.nome;
        const tipo = query.tipo;
        const lado = parseFloat(query.lado);

        if (isNaN(lado)) {
            return {
                error: 'O valor do lado não é um número válido.',
            };
        } else {
            const area = Cerca.calcularArea(lado);
            const mensagem = area > 200 ? 'É uma cerca grande.' : 'É uma cerca pequena';
            const motivo = 'Calcule a Área de uma cerca em forma de triacontagono. Se a Área for maior que 200 metros quadrados, É uma cerca grande. Se for menor que 200 metros quadrados, É uma cerca pequena.';
            
            return {
                data: {
                    nome,
                    tipo,
                    lado,
                    area,
                    mensagem,
                    motivo,
                },
            };
        }
    }
}
module.exports = CercaController;