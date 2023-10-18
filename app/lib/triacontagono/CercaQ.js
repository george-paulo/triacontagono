const math = require('mathjs');

class CercaQ {
    static calcularArea(lado) {
        const pi = math.pi;
        const area = (30 * lado * lado) / (4 * (1 / math.tan(pi / 30)));
        return area;
    }
}

module.exports = CercaQ;