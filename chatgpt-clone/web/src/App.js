import { useEffect, useRef, useState } from "react";
import "./App.css";
import SideMenu from "./components/SideMenu/Sidemenu";
import ChatMessage from "./components/ChatMessage/ChatMessage";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function App() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  // Rola para a última mensagem sempre que o chat muda
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog, loading]);

  function handleNewChat() {
    setChatLog([]);
    setInput("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const newLog = [...chatLog, { role: "user", content: text }];
    setChatLog(newLog);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/prompt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Envia o histórico para a IA lembrar do contexto da conversa
        body: JSON.stringify({ messages: newLog }),
      });
      const result = await response.json();

      const content = result.success
        ? result.data
        : `⚠️ Erro: ${result.error || "falha na requisição"}`;

      setChatLog([...newLog, { role: "assistant", content }]);
    } catch (error) {
      setChatLog([
        ...newLog,
        { role: "assistant", content: "⚠️ Não foi possível conectar ao servidor." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="App">
      <SideMenu onNewChat={handleNewChat} />

      <section className="chatbox">
        <div className="chat-log">
          {chatLog.length === 0 && (
            <div className="empty-state">
              <h1>ChatGPT Clone</h1>
              <p>Digite uma pergunta abaixo para começar.</p>
            </div>
          )}

          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}

          {loading && (
            <ChatMessage message={{ role: "assistant", content: "Digitando..." }} />
          )}
          <div ref={endRef} />
        </div>

        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input
              className="chat-input-textarea"
              placeholder="Envie uma mensagem..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              autoFocus
            />
            <button type="submit" className="send-button" disabled={loading || !input.trim()}>
              ➤
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default App;
