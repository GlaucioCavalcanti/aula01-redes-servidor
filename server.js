const http = require('node:http');
const PORT = 3000;

const server = http.createServer((req, res) => {
  // Define o cabeçalho padrão para respostas JSON
  res.setHeader('Content-Type', 'application/json');

  // Rota 1: Raiz
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200);
    return res.end(JSON.stringify({ mensagem: 'ola, back-end!' }));
  }

  // Rota 2: Status
  if (req.method === 'GET' && req.url === '/status') {
    res.writeHead(200);
    return res.end(JSON.stringify({ status: 'ok', uptime: process.uptime() }));
  }

  // Rota de fallback: Qualquer URL não mapeada (como /xyz)
  res.writeHead(404);
  return res.end(JSON.stringify({ erro: 'Rota não encontrada' }));
});

server.listen(PORT, () => console.log(`Rodando em http://localhost:${PORT}`));