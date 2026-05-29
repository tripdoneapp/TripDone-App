import { useState } from "react";

const API_KEY = "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";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0a0f; color: #e8e0d5; font-family: 'DM Sans', sans-serif; min-height: 100vh; }
  .app { min-height: 100vh; background: #0a0a0f; position: relative; overflow-x: hidden; }
  .app::before { content: ''; position: fixed; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(ellipse at 60% 20%, rgba(180,140,80,0.06) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(100,120,160,0.05) 0%, transparent 50%); pointer-events: none; z-index: 0; }
  .hero { position: relative; z-index: 1; padding: 80px 40px 60px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .logo { font-family: 'Cormorant Garamond', serif; font-size: clamp(48px, 8vw, 96px); font-weight: 300; letter-spacing: 0.15em; color: #e8e0d5; line-height: 1; margin-bottom: 12px; }
  .logo span { color: #c9a84c; }
  .tagline { font-size: 13px; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(232,224,213,0.4); font-weight: 300; }
  .form-section { position: relative; z-index: 1; max-width: 760px; margin: 0 auto; padding: 60px 40px; }
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
  .form-group { display: flex; flex-direction: column; gap: 8px; }
  .form-group.full { grid-column: 1 / -1; }
  label { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(232,224,213,0.45); font-weight: 400; }
  input, select, textarea { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); color: #e8e0d5; padding: 14px 18px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 300; outline: none; transition: border-color 0.3s, background 0.3s; border-radius: 2px; width: 100%; }
  input:focus, select:focus, textarea:focus { border-color: rgba(201,168,76,0.4); background: rgba(255,255,255,0.05); }
  select option { background: #1a1a24; }
  textarea { resize: vertical; min-height: 90px; }
  .generate-btn { width: 100%; padding: 18px; background: linear-gradient(135deg, #c9a84c, #a8863a); color: #0a0a0f; border: none; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; transition: opacity 0.3s, transform 0.2s; border-radius: 2px; margin-top: 8px; }
  .generate-btn:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
  .generate-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
  .loading { text-align: center; padding: 80px 40px; position: relative; z-index: 1; }
  .loading-ring { width: 48px; height: 48px; border: 1px solid rgba(201,168,76,0.2); border-top-color: #c9a84c; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 24px; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading p { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 300; font-style: italic; color: rgba(232,224,213,0.5); letter-spacing: 0.05em; }
  .itinerary { position: relative; z-index: 1; max-width: 860px; margin: 0 auto; padding: 60px 40px; }
  .itinerary-header { margin-bottom: 60px; padding-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .itinerary-header h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(32px, 5vw, 56px); font-weight: 300; letter-spacing: 0.05em; color: #e8e0d5; margin-bottom: 8px; }
  .itinerary-header h2 span { color: #c9a84c; font-style: italic; }
  .itinerary-meta { font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(232,224,213,0.35); }
  .day-card { margin-bottom: 48px; display: grid; grid-template-columns: 80px 1fr; gap: 32px; animation: fadeUp 0.5s ease forwards; opacity: 0; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .day-number { padding-top: 4px; }
  .day-num-label { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(201,168,76,0.6); display: block; margin-bottom: 4px; }
  .day-num-value { font-family: 'Cormorant Garamond', serif; font-size: 48px; font-weight: 300; color: rgba(232,224,213,0.15); line-height: 1; }
  .day-content { border-left: 1px solid rgba(255,255,255,0.06); padding-left: 32px; }
  .day-title { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 400; color: #e8e0d5; margin-bottom: 16px; letter-spacing: 0.02em; }
  .day-text { font-size: 15px; font-weight: 300; line-height: 1.8; color: rgba(232,224,213,0.7); white-space: pre-wrap; }
  .reset-btn { display: inline-flex; align-items: center; gap: 8px; background: none; border: 1px solid rgba(255,255,255,0.1); color: rgba(232,224,213,0.5); padding: 12px 24px; font-family: 'DM Sans', sans-serif; font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; cursor: pointer; transition: all 0.3s; border-radius: 2px; margin-top: 40px; }
  .reset-btn:hover { border-color: rgba(201,168,76,0.4); color: #c9a84c; }
  .error { background: rgba(180,60,60,0.1); border: 1px solid rgba(180,60,60,0.2); color: #e07070; padding: 16px 20px; border-radius: 2px; font-size: 14px; margin-top: 16px; }
  @media (max-width: 600px) { .hero { padding: 60px 24px 40px; } .form-section { padding: 40px 24px; } .form-grid { grid-template-columns: 1fr; } .itinerary { padding: 40px 24px; } .day-card { grid-template-columns: 1fr; gap: 12px; } .day-content { border-left: none; border-top: 1px solid rgba(255,255,255,0.06); padding-left: 0; padding-top: 16px; } }
`;

function parseDays(text) {
  const lines = text.split("\n");
  const days = [];
  let current = null;
  for (const line of lines) {
    const m = line.match(/^#+\s*Day\s+(\d+)[:\s-]*(.*)$/i) || line.match(/^\*\*Day\s+(\d+)[:\s-]*(.*)\*\*$/i) || line.match(/^Day\s+(\d+)[:\s-]*(.*)$/i);
    if (m) { if (current) days.push(current); current = { num: m[1], title: m[2].trim() || `Day ${m[1]}`, content: "" }; }
    else if (current) current.content += line + "\n";
  }
  if (current) days.push(current);
  return days.length === 0 ? [{ num: "1", title: "Your Itinerary", content: text }] : days;
}

export default function App() {
  const [form, setForm] = useState({ destination: "", startDate: "", endDate: "", travelers: "2", style: "balanced", notes: "" });
  const [state, setState] = useState("idle");
  const [days, setDays] = useState([]);
  const [tripInfo, setTripInfo] = useState({});
  const [error, setError] = useState("");
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const generate = async () => {
    if (!form.destination || !form.startDate || !form.endDate) { setError("Please fill in destination and dates."); return; }
    setError(""); setState("loading");
    const nights = Math.round((new Date(form.endDate) - new Date(form.startDate)) / 86400000);
    const prompt = `Create a detailed day-by-day travel itinerary for ${form.destination}.\nTrip: ${form.startDate} to ${form.endDate} (${nights} nights), ${form.travelers} traveller(s).\nTravel style: ${form.style}.\n${form.notes ? `Special requests: ${form.notes}` : ""}\n\nFormat each day exactly like this:\nDay 1: [Evocative Title]\n[Detailed paragraph]\n\nWrite ${nights + 1} days total. Be vivid and specific.`;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json", "x-api-key": API_KEY, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" }, body: JSON.stringify({ model: "claude-haiku-4-5-20251001", max_tokens: 4000, messages: [{ role: "user", content: prompt }] }) });
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      const text = data.content.map(b => b.text || "").join("");
      setDays(parseDays(text));
      setTripInfo({ destination: form.destination, start: form.startDate, end: form.endDate, travelers: form.travelers });
      setState("done");
    } catch (e) { setError("Something went wrong. Check your API key and try again."); setState("idle"); }
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="app">
        <div className="hero">
          <div className="logo">TRIP<span>DONE</span></div>
          <div className="tagline">AI-Powered Travel Itineraries</div>
        </div>
        {state === "idle" && (
          <div className="form-section">
            <div className="form-grid">
              <div className="form-group full"><label>Destination</label><input placeholder="e.g. Tokyo, Japan" value={form.destination} onChange={e => set("destination", e.target.value)} /></div>
              <div className="form-group"><label>Start Date</label><input type="date" value={form.startDate} onChange={e => set("startDate", e.target.value)} /></div>
              <div className="form-group"><label>End Date</label><input type="date" value={form.endDate} onChange={e => set("endDate", e.target.value)} /></div>
              <div className="form-group"><label>Travellers</label><select value={form.travelers} onChange={e => set("travelers", e.target.value)}>{[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n===1?"person":"people"}</option>)}</select></div>
              <div className="form-group"><label>Travel Style</label><select value={form.style} onChange={e => set("style", e.target.value)}><option value="balanced">Balanced</option><option value="luxury">Luxury</option><option value="budget">Budget</option><option value="adventure">Adventure</option><option value="cultural">Cultural</option><option value="family">Family</option><option value="romantic">Romantic</option><option value="foodie">Foodie</option></select></div>
              <div className="form-group full"><label>Special Requests (optional)</label><textarea placeholder="e.g. vegetarian food, no early mornings..." value={form.notes} onChange={e => set("notes", e.target.value)} /></div>
            </div>
            {error && <div className="error">{error}</div>}
            <button className="generate-btn" onClick={generate}>Plan My Trip →</button>
          </div>
        )}
        {state === "loading" && (<div className="loading"><div className="loading-ring"></div><p>Crafting your perfect itinerary…</p></div>)}
        {state === "done" && (
          <div className="itinerary">
            <div className="itinerary-header"><h2><span>{tripInfo.destination}</span></h2><div className="itinerary-meta">{tripInfo.start} → {tripInfo.end} · {tripInfo.travelers} traveller{tripInfo.travelers>1?"s":""}</div></div>
            {days.map((day, i) => (
              <div className="day-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="day-number"><span className="day-num-label">Day</span><span className="day-num-value">{day.num}</span></div>
                <div className="day-content"><div className="day-title">{day.title}</div><div className="day-text">{day.content.trim()}</div></div>
              </div>
            ))}
            <button className="reset-btn" onClick={() => { setState("idle"); setDays([]); }}>← Plan Another Trip</button>
          </div>
        )}
      </div>
    </>
  );
}