import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Chat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");

  // Load old messages
  useEffect(() => {
    fetch("http://localhost:5000/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  // Listen for real-time messages
  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = async () => {
    if (!text.trim()) return;

    // Save to backend DB
    const res = await fetch("http://localhost:5000/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sender: "You", text }),
    });

    const savedMessage = await res.json();

    // Emit real-time message
    socket.emit("sendMessage", savedMessage);

    setText("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>QuickChat</h2>

      {/* Chat window */}
      <div
        style={{
          width: "100%",
          height: "300px",
          border: "1px solid #aaa",
          overflowY: "auto",
          padding: "10px",
          marginBottom: "20px",
        }}
      >
        {messages.map((msg, index) => (
          <p key={index}><b>{msg.sender}:</b> {msg.text}</p>
        ))}
      </div>

      {/* Input box */}
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        style={{ padding: 10, width: "70%" }}
      />

      <button onClick={sendMessage} style={{ padding: 10, marginLeft: 10 }}>
        Send
      </button>
    </div>
  );
};

export default Chat;
