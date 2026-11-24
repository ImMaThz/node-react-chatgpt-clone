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

Pré-requisito: Node.js 18 ou superior e uma chave da [OpenAI](https://openai.com/pt-BR/).

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

Este projeto foi desenvolvido durante a [Formação ChatGPT for Devs da DIO](https://web.dio.me/track/formacao-chatgpt-devs), com o professor Felipe Silva Aguiar.
