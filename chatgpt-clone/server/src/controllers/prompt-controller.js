const openrouter = require("../config/openrouter");

module.exports = {
  // POST /api/prompt  -> body: { prompt } ou { messages: [{ role, content }] }
  async sendText(req, res) {
    const { prompt, messages } = req.body || {};

    if (!prompt && !(Array.isArray(messages) && messages.length)) {
      return res.status(400).json({ success: false, error: "Envie um prompt." });
    }

    try {
      const answer = await openrouter.chatCompletion({ prompt, messages });
      return res.status(200).json({ success: true, data: answer });
    } catch (error) {
      console.error("Erro OpenRouter:", error.response?.data || error.message);
      return res.status(error.status || 500).json({
        success: false,
        error: error.message || "Erro no servidor",
      });
    }
  },
};
