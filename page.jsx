"use client";

import "../globals.css";
import { useState } from "react";

export default function AppGate() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const expected = process.env.NEXT_PUBLIC_APP_PASSWORD;
    if (password === expected) {
      setUnlocked(true);
      setError("");
    } else {
      setError("Incorrect password.");
    }
  };

  if (unlocked) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#faf9f7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: 640,
            textAlign: "center",
            background: "white",
            padding: 48,
            borderRadius: 20,
            border: "1px solid #e8e5e0",
            boxShadow: "0 8px 32px rgba(0,0,0,0.04)",
          }}
        >
          <div
            className="divider"
            style={{
              margin: "0 auto 20px",
              width: 60,
              height: 3,
              background: "linear-gradient(90deg, #d4a853, #c49b3a)",
              borderRadius: 2,
            }}
          />
          <h1
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "#0f172a",
              marginBottom: 16,
              fontFamily: "'Source Serif 4', Georgia, serif",
              letterSpacing: "-0.5px",
            }}
          >
            Demo coming soon.
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "#64748b",
              lineHeight: 1.7,
              marginBottom: 24,
            }}
          >
            The StorageAlly product demo will be embedded here. This is where
            the six-tab React app (Overview, Market Intel, Maintenance,
            Financials, Marketing, Assistant) will live.
          </p>
          <a
            href="/"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              background: "transparent",
              color: "#1e3a5f",
              border: "1.5px solid #1e3a5f",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            ← Back to home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1a2744 50%, #0f2744 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 420,
          width: "100%",
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 20,
          padding: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "linear-gradient(135deg, #1e3a5f, #0f2744)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#d4a853",
              fontSize: 14,
              fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            SA
          </div>
          <span
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "white",
            }}
          >
            StorageAlly
          </span>
        </div>

        <h1
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: "white",
            marginBottom: 8,
            fontFamily: "'Source Serif 4', Georgia, serif",
          }}
        >
          Early Access
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "#94a3b8",
            marginBottom: 28,
            lineHeight: 1.6,
          }}
        >
          Enter your access code to preview the StorageAlly demo.
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Access code"
          style={{
            width: "100%",
            padding: "14px 16px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 10,
            color: "white",
            fontSize: 15,
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: 16,
            outline: "none",
          }}
        />

        {error && (
          <div
            style={{
              padding: "10px 14px",
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: 8,
              color: "#fca5a5",
              fontSize: 13,
              marginBottom: 16,
            }}
          >
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "14px 20px",
            background: "#d4a853",
            color: "#0f172a",
            border: "none",
            borderRadius: 10,
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: 16,
          }}
        >
          Unlock Demo
        </button>

        <p style={{ fontSize: 13, color: "#64748b", textAlign: "center" }}>
          Don't have access?{" "}
          <a
            href="/#waitlist"
            style={{
              color: "#d4a853",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Join the waitlist
          </a>
        </p>
      </div>
    </div>
  );
}
