require("dotenv").config();

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const TIMEOUT_MS = Number(process.env.OPENROUTER_TIMEOUT_MS) || 120000;

// Erro próprio para carregar o status HTTP e a resposta da OpenRouter
class OpenRouterError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status || 500;
    this.response = { data: data || { message } };
  }
}

module.exports = class openrouter {
  // Recebe só o prompt atual OU o histórico completo (messages)
  static async chatCompletion({ prompt, messages }) {
    if (!process.env.OPENROUTER_API_KEY) {
      throw new OpenRouterError("OPENROUTER_API_KEY não configurada no .env", 500);
    }

    const chatMessages =
      Array.isArray(messages) && messages.length > 0
        ? messages
        : [{ role: "user", content: prompt }];

    // Cancela a requisição se passar do tempo limite
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const response = await fetch(OPENROUTER_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.OPENROUTER_SITE_URL || "http://localhost:3000",
          "X-Title": "ChatGPT Clone",
        },
        body: JSON.stringify({
          model: process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini",
          messages: [
            { role: "system", content: "Você é um assistente útil. Responda em português." },
            ...chatMessages,
          ],
        }),
        signal: controller.signal,
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const msg = data?.error?.message || `Erro HTTP ${response.status}`;
        throw new OpenRouterError(msg, response.status, data);
      }

      return data.choices?.[0]?.message?.content || "";
    } catch (error) {
      if (error.name === "AbortError") {
        throw new OpenRouterError(`Tempo limite de ${TIMEOUT_MS} ms excedido`, 504);
      }
      throw error;
    } finally {
      clearTimeout(timer);
    }
  }
};
