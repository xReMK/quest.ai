import React, { useState } from "react";
import DashboardCosmosWallpaper from "../animations/DashboardCosmosWallpaper";
import Sidebar from "../pages/Sidebar";
import questLogo from "../assets/quest-ai-blacBG.png"; // Add this import

function PromptBox({ onSubmit, loading, centered }) {
  const [input, setInput] = useState("");
  return (
    <form
      className="dashboard-prompt-box"
      style={{
        width: centered ? 700 : 700,
        // Vertically center in 2nd fifth of the page
        position: centered ? "absolute" : "relative",
        left: centered ? "50%" : undefined,
        top: centered ? "20%" : undefined, // 2nd fifth (20% from top)
        transform: centered ? "translate(-50%, 0)" : undefined,
        margin: centered ? "0 auto" : "0 auto 2.5rem auto",
        background: "#131111ff", // Slightly greyer black
        borderRadius: "1.2rem",
        boxShadow: "0 2px 16px #000a",
        padding: "1.2rem 2rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        zIndex: 2,
        bottom: centered ? undefined : "2.5rem",
        right: 0,
      }}
      onSubmit={e => {
        e.preventDefault();
        if (input.trim()) {
          onSubmit(input);
          setInput("");
        }
      }}
    >
      <input
        type="text"
        placeholder="Start your quest"
        value={input}
        onChange={e => setInput(e.target.value)}
        style={{
          flex: 1,
          background: "transparent",
          border: "none",
          outline: "none",
          color: "#fff",
          fontSize: "1.25rem",
          padding: "0.8rem 0",
        }}
        disabled={loading}
        onKeyDown={e => {
          if (e.key === "Enter" && !loading && input.trim()) {
            e.preventDefault();
            onSubmit(input);
            setInput("");
          }
        }}
      />
    </form>
  );
}

function DashboardHeader() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "2.5rem", // Reduced gap
      marginBottom: "1.2rem", // Reduced gap
      zIndex: 2,
      position: "relative"
    }}>
      <div style={{ width: 80, height: 80, marginBottom: 8, background: "transparent" }}>
        {/* <YourLogoComponent /> */}
      </div>
      <img
        src={questLogo}
        alt="quest.ai"
        style={{
          width: "300px",
          height: "auto",
          display: "block",
          marginTop : "12px",
          marginLeft : "12rem",
        }}
      />
    </div>
  );
}
function ChatWindow({ messages }) {
  return (
    <div
      className="dashboard-chat-window"
      style={{
        width: 540,
        margin: "2rem auto 0 auto",
        background: "#18191c",
        borderRadius: "1.2rem",
        boxShadow: "0 2px 16px #000a",
        padding: "1.5rem",
        minHeight: "220px",
        color: "#fff",
        zIndex: 2,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "1.2rem"
      }}
    >
      {messages.map((msg, idx) => (
        <div
          key={idx}
          style={{
            alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
            background: msg.role === "user" ? "#232428" : "#23242822",
            borderRadius: "1rem",
            padding: "0.8rem 1.2rem",
            maxWidth: "80%",
            fontSize: "1.08rem",
            color: "#fff"
          }}
        >
          {msg.content}
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [promptFired, setPromptFired] = useState(false);

  const handleQuery = async (query) => {
    setLoading(true);
    setMessages(prev => [...prev, { role: "user", content: query }]);
    setPromptFired(true);
    try {
      const res = await fetch("http://localhost:8080/api/ai/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: query })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply || "No response." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: "Network error. Please try again." }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden" }}>
      <DashboardCosmosWallpaper />
      <Sidebar />
      <div style={{ marginLeft: 250, position: "relative", zIndex: 1, height: "100vh" }}>
        <DashboardHeader />
        {!promptFired ? (
          <PromptBox onSubmit={handleQuery} loading={loading} centered={true} />
        ) : (
          <>
            <div
              style={{
                width: 700,
                margin: "0 auto",
                marginTop: "0",
                position: "relative",
                zIndex: 2,
                height: "calc(100vh - 180px - 110px)", // header + promptbox height
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <ChatWindow messages={messages} />
            </div>
            <PromptBox onSubmit={handleQuery} loading={loading} centered={false} />
          </>
        )}
      </div>
    </div>
  );
}