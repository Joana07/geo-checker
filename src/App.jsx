import { useState } from "react";

const GREEN = "#2d6a4f";
const GREEN_LT = "#52b788";
const CREAM = "#faf8f4";
const CREAM2 = "#f3f0ea";
const DARK = "#1a1a1a";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
  
  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  .geo-wrap {
    font-family: 'Inter', sans-serif;
    background: ${CREAM};
    min-height: 100vh;
    color: ${DARK};
  }

  .geo-header {
    background: #fff;
    border-bottom: 1px solid #e8e8e2;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .geo-logo {
    font-family: 'Inter', sans-serif;
    font-weight: 800;
    font-size: 17px;
    color: ${DARK};
    text-decoration: none;
  }
  .geo-logo span { color: ${GREEN}; }

  .geo-badge {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: ${GREEN};
    background: rgba(45,106,79,0.08);
    padding: 4px 12px;
    border-radius: 100px;
  }

  .geo-hero {
    text-align: center;
    padding: 4rem 2rem 2rem;
    max-width: 680px;
    margin: 0 auto;
  }

  .geo-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: ${GREEN};
    margin-bottom: 1rem;
  }
  .geo-tag::before { content: ''; width: 16px; height: 2px; background: ${GREEN}; display: inline-block; }

  .geo-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(32px, 5vw, 52px);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.5px;
    margin-bottom: 1rem;
    color: ${DARK};
  }
  .geo-title em { font-style: italic; color: ${GREEN}; }

  .geo-sub {
    font-size: 16px;
    color: #555;
    line-height: 1.8;
    margin-bottom: 2.5rem;
  }

  .geo-form {
    display: flex;
    gap: 10px;
    max-width: 560px;
    margin: 0 auto 1rem;
  }

  .geo-input {
    flex: 1;
    padding: 14px 18px;
    border: 2px solid #e0ddd6;
    background: #fff;
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    color: ${DARK};
    outline: none;
    border-radius: 8px;
    transition: border-color 0.2s;
  }
  .geo-input:focus { border-color: ${GREEN}; }
  .geo-input::placeholder { color: #aaa; }

  .geo-btn {
    background: ${GREEN};
    color: #fff;
    border: none;
    padding: 14px 28px;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.2s;
    white-space: nowrap;
  }
  .geo-btn:hover:not(:disabled) { background: #40916c; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(45,106,79,0.25); }
  .geo-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  .geo-note {
    font-size: 12px;
    color: #aaa;
    text-align: center;
  }

  .platforms {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;
    flex-wrap: wrap;
  }
  .platform {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: 500;
    color: #666;
    background: #fff;
    border: 1px solid #e0ddd6;
    padding: 6px 14px;
    border-radius: 100px;
  }

  /* LOADING */
  .loading {
    text-align: center;
    padding: 3rem 2rem;
    max-width: 480px;
    margin: 0 auto;
  }
  .loading-spinner {
    width: 48px;
    height: 48px;
    border: 3px solid #e0ddd6;
    border-top-color: ${GREEN};
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 1.5rem;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-steps { display: flex; flex-direction: column; gap: 8px; margin-top: 1.5rem; }
  .loading-step {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    color: #888;
    padding: 8px 16px;
    border-radius: 6px;
    background: #fff;
    border: 1px solid #e8e8e2;
    transition: all 0.3s;
  }
  .loading-step.active { color: ${GREEN}; border-color: ${GREEN}; background: rgba(45,106,79,0.04); font-weight: 500; }
  .loading-step-dot { width: 8px; height: 8px; border-radius: 50%; background: #ddd; flex-shrink: 0; }
  .loading-step.active .loading-step-dot { background: ${GREEN}; animation: pulse 1s ease infinite; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

  /* RESULTS */
  .results { max-width: 800px; margin: 0 auto; padding: 0 2rem 4rem; }

  .score-card {
    background: ${GREEN};
    border-radius: 16px;
    padding: 2.5rem;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    color: #fff;
  }
  .score-circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 3px solid rgba(255,255,255,0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: rgba(255,255,255,0.1);
  }
  .score-num { font-size: 36px; font-weight: 800; line-height: 1; }
  .score-label { font-size: 10px; letter-spacing: 1px; text-transform: uppercase; opacity: 0.7; margin-top: 2px; }
  .score-info h2 { font-size: 22px; font-weight: 700; margin-bottom: 6px; }
  .score-info p { font-size: 14px; opacity: 0.75; line-height: 1.6; }
  .score-grade {
    margin-left: auto;
    font-size: 64px;
    font-weight: 800;
    opacity: 0.2;
    font-family: 'Playfair Display', serif;
  }

  .checks-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 1.5rem;
  }
  .check-card {
    background: #fff;
    border: 1px solid #e8e8e2;
    border-radius: 10px;
    padding: 1.25rem;
    transition: all 0.2s;
  }
  .check-card:hover { border-color: #c0c0c0; box-shadow: 0 4px 14px rgba(0,0,0,0.06); }
  .check-header { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
  .check-icon { font-size: 18px; }
  .check-title { font-size: 13px; font-weight: 600; flex: 1; }
  .check-status {
    font-size: 11px;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 100px;
    letter-spacing: 0.3px;
  }
  .status-good { background: rgba(45,106,79,0.1); color: ${GREEN}; }
  .status-warn { background: rgba(234,179,8,0.1); color: #854d0e; }
  .status-bad { background: rgba(220,38,38,0.08); color: #b91c1c; }
  .check-desc { font-size: 12px; color: #666; line-height: 1.6; }

  .recs-card {
    background: #fff;
    border: 1px solid #e8e8e2;
    border-radius: 12px;
    padding: 1.75rem;
    margin-bottom: 1.5rem;
  }
  .recs-title { font-size: 16px; font-weight: 700; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 8px; }
  .rec-item {
    display: flex;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid #f0f0ec;
  }
  .rec-item:last-child { border-bottom: none; padding-bottom: 0; }
  .rec-num { width: 24px; height: 24px; background: ${GREEN}; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; margin-top: 1px; }
  .rec-text { font-size: 13px; color: #333; line-height: 1.7; }
  .rec-text strong { color: ${DARK}; font-weight: 600; }

  .cta-card {
    background: linear-gradient(135deg, #1a3528 0%, ${GREEN} 60%, #1e3d2a 100%);
    border-radius: 12px;
    padding: 2rem;
    text-align: center;
    color: #fff;
  }
  .cta-card h3 { font-size: 20px; font-weight: 700; margin-bottom: 8px; }
  .cta-card p { font-size: 14px; opacity: 0.65; margin-bottom: 1.5rem; line-height: 1.6; }
  .cta-btns { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
  .cta-btn-primary { background: #fff; color: ${GREEN}; padding: 11px 26px; border-radius: 8px; font-size: 14px; font-weight: 700; text-decoration: none; display: inline-block; transition: all 0.2s; cursor: pointer; border: none; }
  .cta-btn-primary:hover { background: ${CREAM2}; transform: translateY(-1px); }
  .cta-btn-secondary { background: transparent; color: rgba(255,255,255,0.8); border: 1.5px solid rgba(255,255,255,0.3); padding: 10px 24px; border-radius: 8px; font-size: 14px; font-weight: 500; text-decoration: none; display: inline-block; transition: all 0.2s; cursor: pointer; }
  .cta-btn-secondary:hover { border-color: rgba(255,255,255,0.7); color: #fff; }

  .new-check { text-align: center; margin-top: 1.5rem; }
  .new-check button { background: none; border: none; color: ${GREEN}; font-size: 14px; font-weight: 600; cursor: pointer; text-decoration: underline; }

  @media(max-width: 600px) {
    .geo-form { flex-direction: column; }
    .checks-grid { grid-template-columns: 1fr; }
    .score-card { flex-direction: column; text-align: center; }
    .score-grade { display: none; }
  }
`;

const LOADING_STEPS = [
  "Fetching website data...",
  "Checking schema markup & structured data...",
  "Analyzing AI crawler access...",
  "Evaluating E-E-A-T signals...",
  "Generating GEO score & recommendations...",
];

export default function GEOChecker() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadStep, setLoadStep] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const analyzeGEO = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setResult(null);
    setError("");
    setLoadStep(0);

    // Simulate loading steps
    for (let i = 0; i < LOADING_STEPS.length; i++) {
      setLoadStep(i);
      await new Promise(r => setTimeout(r, 900));
    }

    try {
      const domain = url.replace(/^https?:\/\//, "").replace(/\/$/, "").split("/")[0];

      const prompt = `You are a GEO (Generative Engine Optimization) expert. Analyze the website "${domain}" for AI search engine optimization.

Based on what you know or can reasonably infer about this domain, provide a detailed GEO audit.

Respond ONLY with a valid JSON object, no markdown, no backticks, no explanation outside the JSON:

{
  "score": <number 0-100>,
  "grade": "<A/B/C/D/F>",
  "summary": "<2 sentence summary of GEO status>",
  "checks": [
    {"icon": "🔍", "title": "Schema Markup", "status": "<good|warn|bad>", "desc": "<specific finding>"},
    {"icon": "🤖", "title": "AI Crawler Access", "status": "<good|warn|bad>", "desc": "<specific finding>"},
    {"icon": "📋", "title": "E-E-A-T Signals", "status": "<good|warn|bad>", "desc": "<specific finding>"},
    {"icon": "💬", "title": "ChatGPT Visibility", "status": "<good|warn|bad>", "desc": "<specific finding>"},
    {"icon": "🔮", "title": "Perplexity Indexing", "status": "<good|warn|bad>", "desc": "<specific finding>"},
    {"icon": "📝", "title": "Content Structure", "status": "<good|warn|bad>", "desc": "<specific finding>"}
  ],
  "recommendations": [
    "<specific actionable recommendation 1>",
    "<specific actionable recommendation 2>",
    "<specific actionable recommendation 3>",
    "<specific actionable recommendation 4>",
    "<specific actionable recommendation 5>"
  ]
}`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }]
        })
      });

      const data = await response.json();
      const text = data.content?.[0]?.text || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResult({ ...parsed, domain });
    } catch (e) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const reset = () => {
    setResult(null);
    setUrl("");
    setError("");
  };

  const getScoreBg = (score) => {
    if (score >= 75) return "#2d6a4f";
    if (score >= 50) return "#854d0e";
    return "#b91c1c";
  };

  return (
    <>
      <style>{style}</style>
      <div className="geo-wrap">
        <header className="geo-header">
          <a href="https://joanadhimitri.com" className="geo-logo">
            Joana<span>Dhimitri</span>
          </a>
          <span className="geo-badge">Free GEO Tool</span>
        </header>

        {!loading && !result && (
          <div className="geo-hero">
            <div className="geo-tag">AI Search Visibility</div>
            <h1 className="geo-title">
              Is your site visible to<br /><em>AI search engines?</em>
            </h1>
            <p className="geo-sub">
              Google is not the only search engine anymore. Check if ChatGPT, Perplexity,
              Gemini, and Claude can find, read, and cite your website.
            </p>
            <div className="geo-form">
              <input
                className="geo-input"
                type="text"
                placeholder="yourdomain.com"
                value={url}
                onChange={e => setUrl(e.target.value)}
                onKeyDown={e => e.key === "Enter" && analyzeGEO()}
              />
              <button className="geo-btn" onClick={analyzeGEO} disabled={!url.trim()}>
                Check now →
              </button>
            </div>
            <p className="geo-note">Free · No signup required · Results in ~10 seconds</p>
            <div className="platforms">
              <span className="platform">💬 ChatGPT</span>
              <span className="platform">🔮 Perplexity</span>
              <span className="platform">✨ Gemini</span>
              <span className="platform">🟠 Claude</span>
            </div>
          </div>
        )}

        {loading && (
          <div className="loading" style={{ maxWidth: 480, margin: "3rem auto", padding: "0 2rem" }}>
            <div className="loading-spinner" />
            <p style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>Analyzing {url}</p>
            <p style={{ fontSize: 13, color: "#888", marginBottom: "1.5rem" }}>
              Running GEO audit across 6 checkpoints...
            </p>
            <div className="loading-steps">
              {LOADING_STEPS.map((step, i) => (
                <div key={i} className={`loading-step ${i === loadStep ? "active" : ""}`}>
                  <div className="loading-step-dot" />
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div style={{ textAlign: "center", padding: "2rem", color: "#b91c1c" }}>
            <p>{error}</p>
            <button onClick={reset} style={{ marginTop: 12, color: GREEN, background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>
              Try again
            </button>
          </div>
        )}

        {result && (
          <div className="results">
            <div className="score-card" style={{ background: `linear-gradient(135deg, #1a3528, ${getScoreBg(result.score)})` }}>
              <div className="score-circle">
                <div className="score-num">{result.score}</div>
                <div className="score-label">GEO Score</div>
              </div>
              <div className="score-info">
                <h2>{result.domain}</h2>
                <p>{result.summary}</p>
              </div>
              <div className="score-grade">{result.grade}</div>
            </div>

            <div className="checks-grid">
              {result.checks?.map((check, i) => (
                <div key={i} className="check-card">
                  <div className="check-header">
                    <span className="check-icon">{check.icon}</span>
                    <span className="check-title">{check.title}</span>
                    <span className={`check-status status-${check.status}`}>
                      {check.status === "good" ? "✓ Good" : check.status === "warn" ? "⚠ Weak" : "✗ Missing"}
                    </span>
                  </div>
                  <p className="check-desc">{check.desc}</p>
                </div>
              ))}
            </div>

            <div className="recs-card">
              <div className="recs-title">
                🎯 Top recommendations for {result.domain}
              </div>
              {result.recommendations?.map((rec, i) => (
                <div key={i} className="rec-item">
                  <div className="rec-num">{i + 1}</div>
                  <p className="rec-text" dangerouslySetInnerHTML={{
                    __html: rec.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                  }} />
                </div>
              ))}
            </div>

            <div className="cta-card">
              <h3>Want me to fix all of this?</h3>
              <p>
                I implement GEO, Technical SEO, and AI optimization — not just audit and report.
                Most issues above can be resolved within a week.
              </p>
              <div className="cta-btns">
                <a href="mailto:joanadhimitri1@gmail.com" className="cta-btn-primary">
                  Get in touch →
                </a>
                <a href="https://joanadhimitri.com/services#ai-seo" className="cta-btn-secondary">
                  Learn about GEO
                </a>
              </div>
            </div>

            <div className="new-check">
              <button onClick={reset}>← Check another website</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
