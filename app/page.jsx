"use client";

import "./globals.css";
import { useState, useRef, useEffect } from "react";

export default function StorageAllyLanding() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    facility: "",
    units: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(
              (prev) => new Set([...prev, entry.target.dataset.section])
            );
          }
        });
      },
      { threshold: 0.15 }
    );
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);

  const addRef = (id) => (el) => {
    if (el) {
      el.dataset.section = id;
      sectionRefs.current[id] = el;
    }
  };

  const isVisible = (id) => visibleSections.has(id);

  const handleSubmit = async () => {
    setErrorMsg("");
    if (!formData.name || !formData.email) {
      setErrorMsg("Name and email are required.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Something went wrong.");
      }
      setSubmitted(true);
    } catch (err) {
      setErrorMsg(err.message || "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const features = [
    {
      title: "Competitor Pricing Intelligence",
      desc:
        "See what every facility within 15 miles charges — updated weekly. Know when they raise, lower, or run promos before your occupancy tells you.",
    },
    {
      title: "Maintenance Tracking",
      desc:
        "Never miss a gate inspection, camera audit, or pest treatment again. Automated schedules for everything that breaks a facility's reputation when ignored.",
    },
    {
      title: "Financial Benchmarking",
      desc:
        "Upload your P&L and instantly see how your revenue per square foot, expense ratio, and NOI margin compare to industry benchmarks.",
    },
    {
      title: "Marketing Engine",
      desc:
        "Occupancy dropping? StorageAlly generates your action plan — blog posts, Facebook updates, Google Business posts, rate increase letters — ready to publish.",
    },
    {
      title: "AI Operations Assistant",
      desc:
        "Ask anything. \"Should I raise my 10x10 rates?\" \"What's my revenue trend?\" \"Draft a rate increase letter.\" Answers grounded in your actual facility.",
    },
    {
      title: "SOP & Training System",
      desc:
        "Bring on new help without two weeks of training. Your assistant knows your processes, vendors, and tenants — it trains the next person for you.",
    },
  ];

  const painPoints = [
    {
      stat: "37%+",
      label: "of all storage space is controlled by the top 5 REITs",
      sub: "They have revenue management teams. You have a to-do list.",
    },
    {
      stat: "$4,300",
      label: "average annual revenue left on the table",
      sub: "by operators who don't track competitor rates monthly.",
    },
    {
      stat: "77%",
      label: "national average occupancy in Q4 2025",
      sub: "If you're above 90%, you're probably underpriced.",
    },
  ];

  const coreTiers = [
    {
      name: "Intel",
      price: 49,
      tagline: "Know your market",
      features: [
        "Weekly competitor pricing brief",
        "Rate recommendations vs. local market",
        "National & regional benchmarks",
        "Seasonal demand signals",
      ],
      voice: "Missed-call text-back",
      voiceSoon: true,
      highlight: false,
    },
    {
      name: "Operations",
      price: 99,
      tagline: "Run the facility",
      features: [
        "Everything in Intel",
        "Maintenance tracking & reminders",
        "Marketing engine (blog, social, email)",
        "Tenant & rate-increase templates",
        "AI operations assistant",
      ],
      voice: "AI voicemail triage",
      voiceSoon: true,
      highlight: true,
    },
    {
      name: "Platform",
      price: 199,
      tagline: "See every number",
      features: [
        "Everything in Operations",
        "Financial benchmarking (P&L analysis)",
        "Revenue per sq ft / NOI tracking",
        "Revenue modeling & rate scenarios",
        "Unlimited document uploads",
      ],
      voice: "Live AI receptionist + vendor escalation",
      voiceSoon: true,
      highlight: false,
    },
    {
      name: "Multi-Facility",
      price: 299,
      tagline: "For growing operators",
      features: [
        "Everything in Platform",
        "Up to 5 locations",
        "Consolidated reporting",
        "Priority support",
      ],
      voice: "Voice across all facilities",
      voiceSoon: true,
      highlight: false,
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#faf9f7",
        color: "#1e293b",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* ── Nav ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: "16px 40px",
          background: "rgba(250,249,247,0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(212,208,200,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
              color: "#1e293b",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            StorageAlly
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <button
            className="nav-link"
            onClick={() =>
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Features
          </button>
          <button
            className="nav-link"
            onClick={() =>
              document
                .getElementById("pricing")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Pricing
          </button>
          <button
            className="nav-link"
            onClick={() =>
              document
                .getElementById("why")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Why StorageAlly
          </button>
          <button
            className="nav-link"
            onClick={() =>
              document
                .getElementById("waitlist")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Join Waitlist
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "120px 40px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, #1e3a5f0a, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, #d4a85310, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          className="hero-grid"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: 60,
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ marginBottom: 20, animation: "fadeUp 0.8s ease" }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "6px 14px",
                  background: "#1e3a5f11",
                  border: "1px solid #1e3a5f22",
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#1e3a5f",
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.3px",
                }}
              >
                Built by an operator, for operators
              </span>
            </div>

            <h1
              style={{
                fontSize: 52,
                fontWeight: 800,
                lineHeight: 1.1,
                color: "#0f172a",
                letterSpacing: "-1.5px",
                marginBottom: 24,
                fontFamily: "'Source Serif 4', Georgia, serif",
                animation: "fadeUp 0.8s ease 0.1s backwards",
              }}
            >
              Stop guessing.
              <br />
              <span style={{ color: "#1e3a5f" }}>Start knowing.</span>
            </h1>

            <p
              style={{
                fontSize: 19,
                lineHeight: 1.7,
                color: "#475569",
                maxWidth: 520,
                marginBottom: 36,
                fontFamily: "'Source Serif 4', Georgia, serif",
                animation: "fadeUp 0.8s ease 0.2s backwards",
              }}
            >
              StorageAlly is the AI-powered operations partner that independent
              self-storage owners wish they had. Competitor intel, maintenance
              tracking, marketing, and financial benchmarking — in one place,
              for what your PMS costs.
            </p>

            <div
              style={{
                display: "flex",
                gap: 16,
                alignItems: "center",
                animation: "fadeUp 0.8s ease 0.3s backwards",
                flexWrap: "wrap",
              }}
            >
              <button
                className="cta-btn"
                onClick={() =>
                  document
                    .getElementById("waitlist")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Join the Early Access List
              </button>
              <span
                style={{
                  fontSize: 13,
                  color: "#94a3b8",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                No credit card required
              </span>
            </div>
          </div>

          {/* Hero visual */}
          <div
            style={{
              background: "linear-gradient(135deg, #111827, #1a2744)",
              borderRadius: 20,
              padding: 28,
              border: "1px solid #1e3a5f33",
              boxShadow:
                "0 32px 80px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.05) inset",
              transform: "perspective(1000px) rotateY(-2deg) rotateX(1deg)",
              animation: "fadeIn 1s ease 0.4s backwards",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#ef4444",
                }}
              />
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#f59e0b",
                }}
              />
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#22c55e",
                }}
              />
              <span
                style={{
                  marginLeft: 8,
                  fontSize: 11,
                  color: "#64748b",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                storageally.ai / monday-brief
              </span>
            </div>

            <div
              style={{
                background: "#0c1a3a",
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: "#64748b",
                  fontFamily: "'DM Sans', sans-serif",
                  marginBottom: 6,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                Monday Morning Brief
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#cbd5e1",
                  lineHeight: 1.6,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                <strong style={{ color: "#f1f5f9" }}>
                  You're leaving ~$4,320/yr on the table.
                </strong>{" "}
                Three nearby competitors raised 10x10 rates this week. Your
                rate is now $21 below market.
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              {[
                {
                  label: "Occupancy",
                  value: "87%",
                  sub: "vs 77% national",
                  color: "#22c55e",
                },
                {
                  label: "Avg Rate",
                  value: "$98",
                  sub: "vs $119 national",
                  color: "#f59e0b",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    background: "#111827",
                    borderRadius: 10,
                    padding: 14,
                    border: "1px solid #1e293b",
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: "#64748b",
                      fontFamily: "'DM Sans', sans-serif",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      marginBottom: 4,
                    }}
                  >
                    {s.label}
                  </div>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: "#f1f5f9",
                      fontFamily: "'Source Serif 4', Georgia, serif",
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#94a3b8",
                      fontFamily: "'DM Sans', sans-serif",
                      marginTop: 2,
                    }}
                  >
                    {s.sub}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 12,
                background: "#111827",
                borderRadius: 10,
                padding: 12,
                display: "flex",
                alignItems: "center",
                gap: 8,
                border: "1px solid #7f1d1d",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#ef4444",
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  color: "#fca5a5",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Gate inspection overdue · 14 days
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pain Points ── */}
      <section
        id="why"
        style={{ padding: "100px 40px", background: "#f4f2ee" }}
        ref={addRef("stats")}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            className={`reveal ${isVisible("stats") ? "visible" : ""}`}
            style={{ textAlign: "center", marginBottom: 60 }}
          >
            <div className="divider" style={{ margin: "0 auto 20px" }} />
            <h2
              style={{
                fontSize: 38,
                fontWeight: 700,
                letterSpacing: "-1px",
                marginBottom: 16,
                fontFamily: "'Source Serif 4', Georgia, serif",
              }}
            >
              The REITs have teams.
              <br />
              You have a to-do list.
            </h2>
            <p
              style={{
                fontSize: 17,
                color: "#64748b",
                maxWidth: 600,
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Public Storage, Extra Space, and CubeSmart run revenue management
              algorithms. Meanwhile, most independent operators track rates on
              sticky notes.
            </p>
          </div>

          <div
            className="stats-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}
          >
            {painPoints.map((p, i) => (
              <div
                key={i}
                style={{
                  background: "white",
                  borderRadius: 16,
                  padding: "36px 32px",
                  border: "1px solid #e8e5e0",
                  opacity: isVisible("stats") ? 1 : 0,
                  transform: isVisible("stats")
                    ? "translateY(0)"
                    : "translateY(20px)",
                  transition: `all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${
                    i * 0.15
                  }s`,
                }}
              >
                <div className="stat-num" style={{ marginBottom: 12 }}>
                  {p.stat}
                </div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#0f172a",
                    marginBottom: 8,
                  }}
                >
                  {p.label}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "#64748b",
                    lineHeight: 1.6,
                  }}
                >
                  {p.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section
        id="features"
        style={{ padding: "100px 40px" }}
        ref={addRef("features")}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            className={`reveal ${isVisible("features") ? "visible" : ""}`}
            style={{ textAlign: "center", marginBottom: 60 }}
          >
            <div className="divider" style={{ margin: "0 auto 20px" }} />
            <h2
              style={{
                fontSize: 38,
                fontWeight: 700,
                letterSpacing: "-1px",
                marginBottom: 16,
                fontFamily: "'Source Serif 4', Georgia, serif",
              }}
            >
              Everything you need.
              <br />
              Nothing you don't.
            </h2>
            <p
              style={{
                fontSize: 17,
                color: "#64748b",
                maxWidth: 560,
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              StorageAlly replaces the spreadsheets, sticky notes, call-arounds,
              and guesswork. One place to actually run the business.
            </p>
          </div>

          <div
            className="features-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}
          >
            {features.map((f, i) => (
              <div
                key={i}
                style={{
                  background: "white",
                  border: "1px solid #e8e5e0",
                  borderRadius: 16,
                  padding: "32px 28px",
                  opacity: isVisible("features") ? 1 : 0,
                  transform: isVisible("features")
                    ? "translateY(0)"
                    : "translateY(20px)",
                  transition: `all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${
                    i * 0.1
                  }s`,
                }}
              >
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: "#0f172a",
                    marginBottom: 10,
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "#64748b",
                    lineHeight: 1.7,
                  }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section
        id="pricing"
        style={{ padding: "100px 40px", background: "#f4f2ee" }}
        ref={addRef("pricing")}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            className={`reveal ${isVisible("pricing") ? "visible" : ""}`}
            style={{ textAlign: "center", marginBottom: 60 }}
          >
            <div className="divider" style={{ margin: "0 auto 20px" }} />
            <h2
              style={{
                fontSize: 38,
                fontWeight: 700,
                letterSpacing: "-1px",
                marginBottom: 16,
                fontFamily: "'Source Serif 4', Georgia, serif",
              }}
            >
              Pricing built for operators,
              <br />
              not enterprise.
            </h2>
            <p
              style={{
                fontSize: 17,
                color: "#64748b",
                maxWidth: 620,
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Start where you are. Upgrade when you outgrow it. No contracts,
              no activation fees, cancel anytime. Voice AI features roll out to
              each tier through 2026.
            </p>
          </div>

          <div
            className="pricing-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 20,
            }}
          >
            {coreTiers.map((tier, i) => (
              <div
                key={tier.name}
                style={{
                  background: tier.highlight
                    ? "linear-gradient(135deg, #1e3a5f, #0f2744)"
                    : "white",
                  borderRadius: 16,
                  padding: "32px 26px",
                  border: tier.highlight
                    ? "1px solid #1e3a5f"
                    : "1px solid #e8e5e0",
                  boxShadow: tier.highlight
                    ? "0 16px 48px rgba(30, 58, 95, 0.25)"
                    : "0 2px 12px rgba(0,0,0,0.03)",
                  position: "relative",
                  opacity: isVisible("pricing") ? 1 : 0,
                  transform: isVisible("pricing")
                    ? "translateY(0)"
                    : "translateY(24px)",
                  transition: `all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${
                    i * 0.1
                  }s`,
                }}
              >
                {tier.highlight && (
                  <div
                    style={{
                      position: "absolute",
                      top: -12,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "#d4a853",
                      color: "#0f172a",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.5px",
                      padding: "5px 14px",
                      borderRadius: 12,
                      textTransform: "uppercase",
                    }}
                  >
                    Most Popular
                  </div>
                )}
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: tier.highlight ? "#d4a853" : "#1e3a5f",
                    fontFamily: "'JetBrains Mono', monospace",
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                    marginBottom: 8,
                  }}
                >
                  {tier.name}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: tier.highlight ? "#94a3b8" : "#64748b",
                    marginBottom: 20,
                    fontFamily: "'Source Serif 4', Georgia, serif",
                    fontStyle: "italic",
                  }}
                >
                  {tier.tagline}
                </div>
                <div
                  style={{
                    marginBottom: 24,
                    display: "flex",
                    alignItems: "baseline",
                    gap: 4,
                  }}
                >
                  <span
                    style={{
                      fontSize: 40,
                      fontWeight: 800,
                      color: tier.highlight ? "white" : "#0f172a",
                      fontFamily: "'Source Serif 4', Georgia, serif",
                      letterSpacing: "-1.5px",
                    }}
                  >
                    ${tier.price}
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      color: "#94a3b8",
                    }}
                  >
                    /month
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginBottom: 16,
                  }}
                >
                  {tier.features.map((f, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        fontSize: 13.5,
                        color: tier.highlight ? "#cbd5e1" : "#475569",
                        lineHeight: 1.5,
                      }}
                    >
                      <span
                        style={{
                          color: tier.highlight ? "#d4a853" : "#1e3a5f",
                          fontWeight: 700,
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      >
                        ✓
                      </span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                {/* Voice row */}
                <div
                  style={{
                    padding: "12px 0",
                    marginBottom: 18,
                    borderTop: tier.highlight
                      ? "1px dashed #d4a85344"
                      : "1px dashed #c4a96866",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                      fontSize: 12.5,
                      color: tier.highlight ? "#d4a853" : "#8a6c1a",
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{ flexShrink: 0, marginTop: 1 }}>📞</span>
                    <div>
                      <div style={{ fontWeight: 600, marginBottom: 2 }}>
                        {tier.voice}
                      </div>
                      {tier.voiceSoon && (
                        <div
                          style={{
                            fontSize: 10.5,
                            fontFamily: "'JetBrains Mono', monospace",
                            letterSpacing: "0.5px",
                            textTransform: "uppercase",
                            opacity: 0.85,
                          }}
                        >
                          Rolling out 2026
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    document
                      .getElementById("waitlist")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  style={{
                    width: "100%",
                    padding: "12px 20px",
                    background: tier.highlight ? "#d4a853" : "transparent",
                    color: tier.highlight ? "#0f172a" : "#1e3a5f",
                    border: tier.highlight ? "none" : "1.5px solid #1e3a5f",
                    borderRadius: 10,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "all 0.2s",
                  }}
                >
                  Join Waitlist
                </button>
              </div>
            ))}
          </div>

          <p
            style={{
              textAlign: "center",
              marginTop: 32,
              fontSize: 13,
              color: "#94a3b8",
              maxWidth: 640,
              margin: "32px auto 0",
              lineHeight: 1.6,
            }}
          >
            Early-access operators lock in launch pricing for life.
          </p>
        </div>
      </section>

      {/* ── Who It's For ── */}
      <section
        style={{
          padding: "100px 40px",
          background: "linear-gradient(135deg, #0f172a, #1a2744)",
        }}
        ref={addRef("who")}
      >
        <div
          style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}
          className={`reveal ${isVisible("who") ? "visible" : ""}`}
        >
          <div
            className="divider"
            style={{
              margin: "0 auto 20px",
              background: "linear-gradient(90deg, #d4a853, #c49b3a)",
            }}
          />
          <h2
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: "white",
              letterSpacing: "-0.5px",
              marginBottom: 16,
              fontFamily: "'Source Serif 4', Georgia, serif",
            }}
          >
            Built by someone who's managed
            <br />
            21 locations and 1,500+ leases.
          </h2>
          <p
            style={{
              fontSize: 18,
              color: "#94a3b8",
              lineHeight: 1.8,
              maxWidth: 680,
              margin: "0 auto 40px",
            }}
          >
            StorageAlly wasn't designed by a tech company that Googled
            "self-storage." It was built by an operator who got tired of
            spreadsheets.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
              textAlign: "left",
            }}
          >
            {[
              {
                title: "Single-Facility Owners",
                desc:
                  "You're wearing every hat. StorageAlly is the operations partner that doesn't need a salary.",
              },
              {
                title: "2–5 Location Operators",
                desc:
                  "Scaling without the enterprise tools. One dashboard, every facility, every number.",
              },
              {
                title: "New Facility Buyers",
                desc:
                  "Just acquired a facility? StorageAlly onboards your operation in minutes, not months.",
              },
            ].map((w, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 16,
                  padding: "28px 24px",
                  opacity: isVisible("who") ? 1 : 0,
                  transform: isVisible("who")
                    ? "translateY(0)"
                    : "translateY(16px)",
                  transition: `all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${
                    i * 0.15
                  }s`,
                }}
              >
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "white",
                    marginBottom: 10,
                  }}
                >
                  {w.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "#94a3b8",
                    lineHeight: 1.6,
                  }}
                >
                  {w.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section style={{ padding: "100px 40px" }} ref={addRef("how")}>
        <div
          style={{ maxWidth: 800, margin: "0 auto" }}
          className={`reveal ${isVisible("how") ? "visible" : ""}`}
        >
          <div className="divider" style={{ margin: "0 auto 20px" }} />
          <h2
            style={{
              fontSize: 36,
              fontWeight: 700,
              letterSpacing: "-1px",
              marginBottom: 48,
              textAlign: "center",
              fontFamily: "'Source Serif 4', Georgia, serif",
            }}
          >
            Simple enough to use Monday morning.
          </h2>

          {[
            {
              num: "01",
              title: "Tell us about your facility",
              desc:
                "Unit mix, address, current rates. Ten-minute onboarding form gets your facility into StorageAlly.",
            },
            {
              num: "02",
              title: "Get your first weekly brief",
              desc:
                "Every Monday, StorageAlly delivers competitor moves, rate recommendations, and the action list for your week.",
            },
            {
              num: "03",
              title: "Ask your assistant anything",
              desc:
                "Upload documents, ask questions, generate marketing content. It knows your facility and your market.",
            },
            {
              num: "04",
              title: "Watch your revenue grow",
              desc:
                "Operators who track competitor rates raise prices 3–7% per year. That's $3–$8k per facility, every year.",
            },
          ].map((step, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 28,
                marginBottom: 40,
                alignItems: "flex-start",
                opacity: isVisible("how") ? 1 : 0,
                transform: isVisible("how")
                  ? "translateX(0)"
                  : "translateX(-20px)",
                transition: `all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${
                  i * 0.12
                }s`,
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 32,
                  fontWeight: 700,
                  color: "#d4a853",
                  lineHeight: 1,
                  flexShrink: 0,
                  width: 60,
                }}
              >
                {step.num}
              </div>
              <div>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#0f172a",
                    marginBottom: 8,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: 16,
                    color: "#64748b",
                    lineHeight: 1.7,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Waitlist Form ── */}
      <section
        id="waitlist"
        style={{ padding: "100px 40px", background: "#f4f2ee" }}
        ref={addRef("form")}
      >
        <div
          style={{ maxWidth: 560, margin: "0 auto" }}
          className={`reveal ${isVisible("form") ? "visible" : ""}`}
        >
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="divider" style={{ margin: "0 auto 20px" }} />
            <h2
              style={{
                fontSize: 36,
                fontWeight: 700,
                letterSpacing: "-1px",
                marginBottom: 16,
                fontFamily: "'Source Serif 4', Georgia, serif",
              }}
            >
              Get early access.
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "#64748b",
                lineHeight: 1.7,
              }}
            >
              We're opening StorageAlly to a small group of independent
              operators first. Join the waitlist and we'll reach out personally.
            </p>
          </div>

          {!submitted ? (
            <div
              style={{
                background: "white",
                borderRadius: 20,
                padding: 36,
                border: "1px solid #e8e5e0",
                boxShadow: "0 8px 32px rgba(0,0,0,0.04)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#475569",
                      marginBottom: 6,
                    }}
                  >
                    Name *
                  </label>
                  <input
                    className="input-field"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#475569",
                      marginBottom: 6,
                    }}
                  >
                    Email *
                  </label>
                  <input
                    className="input-field"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="you@yourfacility.com"
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#475569",
                      marginBottom: 6,
                    }}
                  >
                    Facility name
                  </label>
                  <input
                    className="input-field"
                    value={formData.facility}
                    onChange={(e) =>
                      setFormData({ ...formData, facility: e.target.value })
                    }
                    placeholder="Acme Self Storage"
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#475569",
                      marginBottom: 6,
                    }}
                  >
                    Number of units
                  </label>
                  <input
                    className="input-field"
                    value={formData.units}
                    onChange={(e) =>
                      setFormData({ ...formData, units: e.target.value })
                    }
                    placeholder="120"
                  />
                </div>
                {errorMsg && (
                  <div
                    style={{
                      padding: "10px 14px",
                      background: "#fef2f2",
                      border: "1px solid #fecaca",
                      borderRadius: 8,
                      color: "#991b1b",
                      fontSize: 13,
                    }}
                  >
                    {errorMsg}
                  </div>
                )}
                <button
                  className="cta-btn"
                  style={{
                    marginTop: 8,
                    opacity: submitting ? 0.6 : 1,
                    cursor: submitting ? "wait" : "pointer",
                  }}
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  {submitting ? "Submitting…" : "Join the Waitlist"}
                </button>
                <p
                  style={{
                    fontSize: 12,
                    color: "#94a3b8",
                    textAlign: "center",
                  }}
                >
                  No credit card required. We'll reach out personally when your
                  spot opens up.
                </p>
              </div>
            </div>
          ) : (
            <div
              style={{
                background: "white",
                borderRadius: 20,
                padding: 48,
                border: "1px solid #e8e5e0",
                textAlign: "center",
                boxShadow: "0 8px 32px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#0f172a",
                  marginBottom: 12,
                  fontFamily: "'Source Serif 4', Georgia, serif",
                }}
              >
                You're on the list.
              </h3>
              <p
                style={{
                  fontSize: 16,
                  color: "#64748b",
                  lineHeight: 1.7,
                }}
              >
                We'll reach out personally to get you set up. In the meantime,
                keep an eye on your inbox.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          padding: "60px 40px 40px",
          borderTop: "1px solid #e8e5e0",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            className="footer-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 40,
              marginBottom: 40,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: "linear-gradient(135deg, #1e3a5f, #0f2744)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#d4a853",
                    fontSize: 12,
                    fontWeight: 700,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  SA
                </div>
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#1e293b",
                  }}
                >
                  StorageAlly
                </span>
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: "#64748b",
                  lineHeight: 1.7,
                }}
              >
                AI-powered operations partner for independent self-storage
                owners. Built by an operator, for operators.
              </p>
            </div>
            <div>
              <h4
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#1e293b",
                  marginBottom: 16,
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                Product
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {[
                  "Market Intelligence",
                  "Maintenance Tracking",
                  "Financial Benchmarking",
                  "Marketing Engine",
                  "AI Assistant",
                  "Voice AI (Coming 2026)",
                ].map((f) => (
                  <span key={f} style={{ fontSize: 14, color: "#64748b" }}>
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#1e293b",
                  marginBottom: 16,
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                Contact
              </h4>
              <p
                style={{
                  fontSize: 14,
                  color: "#64748b",
                  lineHeight: 1.8,
                }}
              >
                hello@storageally.ai
                <br />
                Tecumseh, Michigan
              </p>
            </div>
          </div>
          <div
            style={{
              borderTop: "1px solid #e8e5e0",
              paddingTop: 24,
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 13, color: "#94a3b8" }}>
              © {new Date().getFullYear()} StorageAlly. All rights reserved.
            </span>
            <span style={{ fontSize: 13, color: "#94a3b8" }}>
              A JRL Consulting LLC company.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
