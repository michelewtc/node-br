const http = require('http')

http.createServer((request, response) => {
    response.end('Hello Node.js !!!')
    })
    .listen(5000, () => console.log('o servidor esta rodando !'))