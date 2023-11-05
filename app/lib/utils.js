const fs = require('fs');
const ejs = require('ejs');

const utils = {
    decodeUrl: function (url) {
        const properties = url.split('&');
        const query = {};
        for (const property of properties) {
            const [variable, value] = property.split('=');
            query[variable] = value;
        }
        return query;
    },

    renderEjs: function (res, file, data) {
        const text = fs.readFileSync(file, 'utf-8');
        const html = ejs.render(text, data);

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(html);
        res.end();
    },

    renderJSON: function (res, data, status = 200) {
        res.writeHead(status, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(data));
        res.end();
    },

    getRequestBody: function (req) {
        return new Promise((resolve, reject) => {
            let bodyText = '';
            let i = 0;
            req.on('data', function (chunk) {
                bodyText += chunk;
                console.log(i++, bodyText);
            });
            req.on('end', () => {
                const body = utils.decodeUrl(bodyText);

                resolve(body);
            });
        });
    },
};

module.exports = utils;