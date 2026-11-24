import "./ChatMessage.css";

function ChatMessage({ message }) {
  const isAssistant = message.role === "assistant";

  return (
    <div className={`chat-message ${isAssistant ? "chatgpt" : ""}`}>
      <div className="chat-message-center">
        <div className={`avatar ${isAssistant ? "chatgpt" : ""}`}>
          {isAssistant ? "AI" : "Eu"}
        </div>
        <div className="message">{message.content}</div>
      </div>
    </div>
  );
}

export default ChatMessage;
