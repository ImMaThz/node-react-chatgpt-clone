# ChatGPT Clone — Node + React

Clone do ChatGPT feito no laboratório da DIO, com back-end em **Node.js/Express** e front-end em **React**. As respostas vêm da **OpenRouter** (modelo padrão: `openai/gpt-4o-mini`).

Projeto de referência: [felipeAguiarCode/node-react-chatgpt-clone](https://github.com/felipeAguiarCode/node-react-chatgpt-clone)

## Estrutura

```
server/                 → API (Express)
  .env.example
  src/
    config/openrouter.js        → chamada à OpenRouter (fetch + timeout)
    controllers/prompt-controller.js
    routes.js                   → POST /api/prompt, GET /api/health
    app.js / server.js
web/                    → interface (React)
  public/index.html
  src/
    App.js / App.css            → tela do chat
    components/
      ChatMessage/              → balão de mensagem
      SideMenu/                 → menu lateral ("Novo chat")
```

## Como rodar

Pré-requisito: Node.js 18 ou superior e uma chave da [OpenRouter](https://openrouter.ai/keys).

**1. Back-end**
```bash
cd server
npm install
cp .env.example .env     # no Windows: copy .env.example .env
# edite o .env e cole sua OPENROUTER_API_KEY
npm run dev              # http://localhost:5000
```

**2. Front-end** (em outro terminal)
```bash
cd web
npm install
npm start                # http://localhost:3000
```

## API

`POST /api/prompt`

```json
{ "messages": [{ "role": "user", "content": "Olá!" }] }
```
ou apenas `{ "prompt": "Olá!" }`.

Resposta: `{ "success": true, "data": "Olá! Como posso ajudar?" }`

## Variáveis de ambiente (server/.env)

| Variável | Descrição | Padrão |
|---|---|---|
| `OPENROUTER_API_KEY` | Sua chave da OpenRouter | — |
| `OPENROUTER_MODEL` | Modelo usado | `openai/gpt-4o-mini` |
| `PORT` | Porta da API | `5000` |
| `OPENROUTER_TIMEOUT_MS` | Tempo limite da chamada | `120000` |

> ⚠️ Nunca suba o arquivo `.env` para o GitHub — ele já está no `.gitignore`.
