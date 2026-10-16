# Laboratório 01: Infraestrutura de Redes e Arquitetura Web

Este repositório documenta a execução prática de diagnósticos de conectividade, inspeção de tráfego HTTP, consumo de APIs RESTful e a implementação de um servidor HTTP nativo com Node.js.

---

## Exercício 1: Diagnóstico de Conectividade e Roteamento (ICMP, DNS e Traceroute)

Análise comparativa de resolução de nomes, latência de ida e volta (RTT) e quantitativo de saltos até a borda de aplicação.

| Destino | IP Resolvido (`nslookup` / `ping`) | Latência Média (`ping`) | Total de Saltos (`tracert`) | Borda / Ponto de Troca de Tráfego Observado |
| :--- | :--- | :--- | :--- | :--- |
| **`google.com`** | `172.217.172.142` | 33 ms | 10 saltos | Ponto de Troca de Tráfego / Core Sudeste |
| **`bbc.co.uk`** | `151.101.128.81` | 15 ms | 10 saltos | CDN Edge Cache (Fastly) / Polo Regional |

> **Nota técnica:** A menor latência observada para o domínio internacional (`bbc.co.uk`) decorre da entrega de conteúdo via servidores de borda (Edge Caching / Anycast) situados geograficamente mais próximos à origem do tráfego do que o ponto de presença do Google consultado.

---

## Exercício 2: Inspeção de Tráfego HTTP e Análise no DevTools

### 1. Chamada via CLI (`curl -v`)
* **Endpoint:** `https://httpbin.org/get`
* **Método:** `GET`
* **Status HTTP:** `200 OK`
* **Request Headers:** `Host`, `User-Agent: curl/8.13.0`, `Accept: */*`
* **Response Headers:** `Content-Type: application/json`, `Server: gunicorn/19.9.0`, `Access-Control-Allow-Origin: *`

### 2. Inspeção via Navegador (Aba Network / DevTools)
* **Portal Analisado:** `https://g1.globo.com`
* **Total de Requisições:** 252 requisições
* **Maior Recurso Transferido:** Script JavaScript de aplicação (`310 kB`)
* **Status != 200 Identificado:** Requisições bloqueadas/suprimidas por mecanismos de proteção contra rastreamento retornando status vazio / `0 B`.

---

## Exercício 3: Consumo de APIs RESTful via Postman

Validação de requisições, métodos HTTP e códigos de status em endpoints públicos:

1. **GET ViaCEP (CEP Válido):** Status `200 OK` com retorno estruturado de logradouro, bairro, cidade e UF.
2. **GET JSONPlaceholder (`/posts/1`):** Status `200 OK` retornando objeto mock com identificador único.
3. **POST JSONPlaceholder (`/posts`):** Status `201 Created` retornando payload ecoado com atributo `"id": 101`.
4. **GET JSONPlaceholder (`/posts/9999`):** Status `404 Not Found` decorrente da inexistência do identificador no banco de dados.
5. **GET ViaCEP (CEP Inválido `123`):** Status `400 Bad Request` indicando rejeição por validação sintática prévia da URI.

---

## Exercício 4: Servidor HTTP Nativo com Node.js

Implementação de um servidor HTTP utilizando a biblioteca padrão `node:http`, sem dependências externas de frameworks, com mapeamento de rotas e monitoramento de tempo de atividade (*uptime*).

### Estrutura de Rotas

* `GET /`: Retorna `200 OK` com mensagem de boas-vindas em JSON.
* `GET /status`: Retorna `200 OK` com status da aplicação e `process.uptime()`.
* Fallback (rotas inexistentes como `/xyz`): Retorna `404 Not Found` estruturado.

### Execução e Testes

```bash
# Iniciar o servidor
node server.js

# Testar rota raiz
curl -i localhost:3000/

# Testar rota de status
curl -i localhost:3000/status

# Testar rota inexistente
curl -i localhost:3000/xyz