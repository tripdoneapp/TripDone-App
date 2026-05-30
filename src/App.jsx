import { useState, useRef, useEffect } from "react";

// ─── Unsplash photo URLs (free, no key needed) ───────────────────────────────
const AUDIENCE_DATA = [
  {
    label: "Business Travel",
    desc: "Seamless trips that keep you productive and comfortable — every time.",
    photo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
  },
  {
    label: "Family Holidays",
    desc: "Itineraries that work for every age. Kids, pensioners, and everyone between.",
    photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
  },
  {
    label: "Couples & Romance",
    desc: "Anniversary trips, honeymoons, weekend escapes — curated with care.",
    photo: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
  },
  {
    label: "Adventure & Exploration",
    desc: "Off the beaten path, fully planned. All the thrill, none of the admin.",
    photo: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80",
  },
  {
    label: "Education",
    desc: "Language schools, study trips, and learning experiences around the world.",
    photo: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80",
  },
  {
    label: "Culture",
    desc: "Museums, local traditions, historic sites — travel that broadens the mind.",
    photo: "https://images.unsplash.com/photo-1545579133-99bb5ad189be?w=600&q=80",
  },
];

const TOP_DESTINATIONS = [
  "Tokyo, Japan", "Amalfi Coast, Italy", "Bali, Indonesia",
  "New York, USA", "Paris, France", "Sydney, Australia",
  "Bangkok, Thailand", "Barcelona, Spain", "Queenstown, NZ",
  "Santorini, Greece", "Dubai, UAE", "Cape Town, South Africa",
];

const TRAVEL_TYPES = [
  "Business Travel", "Family Holidays", "Couples & Romance",
  "Adventure & Exploration", "Education", "Culture",
  "Beach & Relaxation", "Food & Culture", "City Breaks", "Wellness & Spa",
];

function PlaneOutline({ color = "#0ea5e9", size = 28 }) {
  const s = size / 40;
  return (
    <g>
      <path d={`M 0 ${-18*s} L ${3.5*s} ${-10*s} L ${4*s} ${8*s} L ${2.5*s} ${14*s} L 0 ${12*s} L ${-2.5*s} ${14*s} L ${-4*s} ${8*s} L ${-3.5*s} ${-10*s} Z`}
        fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d={`M ${3*s} ${-2*s} L ${22*s} ${10*s} L ${20*s} ${14*s} L ${4*s} ${8*s}`}
        fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d={`M ${-3*s} ${-2*s} L ${-22*s} ${10*s} L ${-20*s} ${14*s} L ${-4*s} ${8*s}`}
        fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d={`M ${2.5*s} ${12*s} L ${9*s} ${18*s} L ${8*s} ${20*s} L ${2.5*s} ${16*s}`}
        fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d={`M ${-2.5*s} ${12*s} L ${-9*s} ${18*s} L ${-8*s} ${20*s} L ${-2.5*s} ${16*s}`}
        fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    </g>
  );
}

function TripDoneLogo({ width = 160 }) {
  const scale = width / 160;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 1 }}>
      <svg width={width * 1.1} height={28 * scale} viewBox="0 0 260 32" fill="none" style={{ display: "block", marginBottom: -14 * scale }}>
        <path d="M 50 16 C 100 8 160 10 218 20" stroke="#0ea5e9" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.55" strokeDasharray="5 4"/>
        <g transform="translate(218,20) rotate(107.6)"><PlaneOutline color="#0ea5e9" size={20}/></g>
      </svg>
      <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 36 * scale, lineHeight: 1, background: "linear-gradient(135deg, #003580 0%, #0ea5e9 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", letterSpacing: "-1px" }}>TripDone</span>
    </div>
  );
}

function TripDoneLogoDark({ width = 160 }) {
  const scale = width / 160;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 1 }}>
      <svg width={width * 1.1} height={28 * scale} viewBox="0 0 260 32" fill="none" style={{ display: "block", marginBottom: -14 * scale }}>
        <path d="M 50 16 C 100 8 160 10 218 20" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.55" strokeDasharray="5 4"/>
        <g transform="translate(218,20) rotate(107.6)"><PlaneOutline color="white" size={20}/></g>
      </svg>
      <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 36 * scale, color: "#fff", lineHeight: 1, letterSpacing: "-1px" }}>TripDone</span>
    </div>
  );
}

// ─── Social icons (SVG inline) ────────────────────────────────────────────────
function IconInstagram({ size = 22, color = "#fff" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.5" cy="6.5" r="1" fill={color} stroke="none"/></svg>;
}
function IconFacebook({ size = 22, color = "#fff" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
}
function IconYouTube({ size = 22, color = "#fff" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#003580"/></svg>;
}
function IconTikTok({ size = 22, color = "#fff" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z"/></svg>;
}

// ─── App Store / Google Play buttons ─────────────────────────────────────────
function AppStoreButton() {
  return (
    <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#000", color: "#fff", borderRadius: 10, padding: "10px 18px", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.15)", minWidth: 150 }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
      <div>
        <div style={{ fontSize: 9, opacity: 0.7, letterSpacing: "0.05em" }}>Download on the</div>
        <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.2 }}>App Store</div>
      </div>
    </a>
  );
}

function GooglePlayButton() {
  return (
    <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#000", color: "#fff", borderRadius: 10, padding: "10px 18px", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.15)", minWidth: 150 }}>
      <svg width="22" height="22" viewBox="0 0 24 24"><path d="M3.18 23.76c.3.17.65.19.97.07L14.81 12 3.15.17C2.83.05 2.47.08 2.18.25 1.6.6 1.25 1.22 1.25 1.9v20.2c0 .68.35 1.3.93 1.66z" fill="#4CAF50"/><path d="M20.73 10.03l-3.04-1.74L14.81 12l2.88 2.71 3.04-1.74c.87-.5.87-1.75 0-2.94z" fill="#FFD600" /><path d="M3.18.24L14.81 12 17.69 9.29 4.15.18A1.5 1.5 0 0 0 3.18.24z" fill="#FF3D00"/><path d="M3.18 23.76A1.5 1.5 0 0 0 4.15 23.82l13.54-9.11L14.81 12 3.18 23.76z" fill="#3BAFDA"/></svg>
      <div>
        <div style={{ fontSize: 9, opacity: 0.7, letterSpacing: "0.05em" }}>GET IT ON</div>
        <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.2 }}>Google Play</div>
      </div>
    </a>
  );
}

// ─── Contact form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", query: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit() {
    if (!form.name || !form.email || !form.query) return;
    setSending(true);
    try {
      await fetch(`https://formsubmit.co/ajax/tpritchard@tripdone.travel`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.query, _subject: "TripDone Website Enquiry" }),
      });
      setSent(true);
    } catch {
      setSent(true); // show success anyway — formsubmit may block CORS in dev
    } finally {
      setSending(false);
    }
  }

  if (sent) return (
    <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: "20px 22px", textAlign: "center" }}>
      <div style={{ fontSize: 22, marginBottom: 8 }}>✓</div>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "rgba(255,255,255,0.7)" }}>Thanks! We'll get back to you soon.</p>
    </div>
  );

  const inputStyle = { width: "100%", padding: "10px 14px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "#fff", fontSize: 13.5, fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <input placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle} />
      <input placeholder="Email address" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inputStyle} />
      <textarea placeholder="Your question or query..." value={form.query} onChange={e => setForm(f => ({ ...f, query: e.target.value }))} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
      <button onClick={handleSubmit} disabled={!form.name || !form.email || !form.query || sending} style={{ padding: "10px 20px", borderRadius: 8, background: form.name && form.email && form.query && !sending ? "#0ea5e9" : "rgba(255,255,255,0.1)", border: "none", color: "#fff", fontSize: 13.5, fontWeight: 500, cursor: form.name && form.email && form.query ? "pointer" : "not-allowed", fontFamily: "'DM Sans', sans-serif" }}>
        {sending ? "Sending..." : "Send message →"}
      </button>
    </div>
  );
}

// ─── Quiz & App ───────────────────────────────────────────────────────────────
const FONT = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');`;
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@800&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');`;

const ITINERARY_SYSTEM = `You are TripDone, a premium AI travel planner. Given a traveller's preferences, generate a detailed day-by-day itinerary as JSON.
Return ONLY valid JSON, no markdown, no explanation. Format:
{
  "destination": "string",
  "tagline": "short evocative description (max 10 words)",
  "duration": "e.g. 7 days",
  "hotel": { "name": "string", "area": "string", "description": "1 sentence", "priceRange": "e.g. £280/night" },
  "alternatives": {
    "budget": { "hotel": "name", "area": "area", "priceRange": "e.g. £80/night", "note": "1 sentence" },
    "luxury": { "hotel": "name", "area": "area", "priceRange": "e.g. £450/night", "note": "1 sentence" }
  },
  "days": [{ "day": 1, "theme": "string", "morning": "string", "afternoon": "string", "evening": "string", "transport": "string", "insiderTip": "string" }],
  "practicalInfo": { "bestTransport": "string", "mustBook": "string", "packingTip": "string" },
  "packingList": { "essentials": ["item1","item2"], "clothing": ["item1","item2"], "extras": ["item1","item2"] }
}
Generate 4-7 days. Be specific with real place names. Make it feel curated, not generic.`;

const REFINE_SYSTEM = `You are TripDone, a premium AI travel concierge. The user has an existing itinerary and wants to refine it. Respond conversationally and concisely — confirm what you've changed and why it's a great call. Keep responses under 3 sentences. Be warm, confident, and specific.`;

async function callClaude(system, userMessage, maxTokens = 1500) {
  const res = await fetch("https://tripdoneapi.tpritchard.workers.dev", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: maxTokens,
      system,
      messages: [{ role: "user", content: userMessage }],
    }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.content.map(b => b.text || "").join("");
}

function DayCard({ day, index }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div style={{ border: "1.5px solid #e8e2d9", borderRadius: 14, overflow: "hidden", marginBottom: 12, background: "#fdfbf8", boxShadow: open ? "0 4px 20px rgba(0,0,0,0.06)" : "none", transition: "box-shadow 0.2s" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#003580", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, flexShrink: 0 }}>{day.day}</div>
          <div>
            <div style={{ fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, color: "#1a1a1a" }}>Day {day.day}</div>
            <div style={{ fontSize: 13, fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: "#888" }}>{day.theme}</div>
          </div>
        </div>
        <span style={{ color: "#003580", fontSize: 18, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none" }}>⌄</span>
      </button>
      {open && (
        <div style={{ padding: "0 20px 20px", animation: "fadeUp 0.2s ease" }}>
          <div style={{ height: 1, background: "#e8e2d9", marginBottom: 16 }} />
          {[{ label: "Morning", icon: "☀", value: day.morning }, { label: "Afternoon", icon: "⛅", value: day.afternoon }, { label: "Evening", icon: "🌙", value: day.evening }, { label: "Getting around", icon: "🚌", value: day.transport }].map(item => (
            <div key={item.label} style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", fontFamily: "'DM Sans', sans-serif", marginBottom: 3 }}>{item.icon} {item.label}</div>
              <div style={{ fontSize: 14, color: "#333", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>{item.value}</div>
            </div>
          ))}
          <div style={{ background: "#eef3ff", borderRadius: 8, padding: "10px 14px", borderLeft: "3px solid #003580", marginTop: 16 }}>
            <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#003580", fontFamily: "'DM Sans', sans-serif", marginBottom: 3 }}>✦ Insider tip</div>
            <div style={{ fontSize: 13.5, color: "#003580", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>{day.insiderTip}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function LoadingScreen({ destination }) {
  const steps = ["Researching " + (destination || "your destination") + "...", "Curating the best hotels...", "Designing your itinerary...", "Adding insider touches..."];
  const [stepIdx, setStepIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStepIdx(i => Math.min(i + 1, steps.length - 1)), 1800);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ textAlign: "center", padding: "60px 0" }}>
      <div style={{ fontSize: 40, marginBottom: 24, animation: "spin 3s linear infinite", display: "inline-block" }}>◎</div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 400, color: "#1a1a1a", marginBottom: 12 }}>Building your trip</h2>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#003580", minHeight: 20 }}>{steps[stepIdx]}</p>
      <div style={{ marginTop: 32, display: "flex", gap: 6, justifyContent: "center" }}>
        {[0, 1, 2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#003580", animation: "bounce 1.2s infinite", animationDelay: `${i * 0.2}s` }} />)}
      </div>
    </div>
  );
}

function ItineraryView({ itinerary, answers, onBookNow }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const chatBottomRef = useRef(null);
  useEffect(() => { chatBottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMessages, chatLoading]);

  async function sendChat() {
    if (!chatInput.trim() || chatLoading) return;
    const msg = chatInput.trim();
    setChatInput("");
    const newMsgs = [...chatMessages, { role: "user", content: msg }];
    setChatMessages(newMsgs);
    setChatLoading(true);
    try {
      const context = `Current itinerary: ${JSON.stringify(itinerary)}\nOriginal preferences: ${JSON.stringify(answers)}\nUser request: ${msg}`;
      const reply = await callClaude(REFINE_SYSTEM, context, 400);
      setChatMessages([...newMsgs, { role: "assistant", content: reply }]);
    } catch {
      setChatMessages([...newMsgs, { role: "assistant", content: "Sorry, something went wrong. Try again." }]);
    } finally { setChatLoading(false); }
  }

  return (
    <div style={{ animation: "fadeUp 0.5s ease" }}>
      <div style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2d2418 100%)", borderRadius: 16, padding: "28px 24px", marginBottom: 20, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(0,53,128,0.15)" }} />
        <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#0ea5e9", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", marginBottom: 8 }}>Your TripDone itinerary</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "#fff", fontWeight: 400, margin: "0 0 6px" }}>{itinerary.destination}</h1>
        <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: "#0ea5e9", fontSize: 15, margin: "0 0 20px" }}>{itinerary.tagline}</p>
        {onBookNow && (
          <button onClick={onBookNow} style={{ padding: "11px 28px", borderRadius: 8, background: "#0ea5e9", border: "none", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Book this trip →</button>
        )}
      </div>
      <div style={{ border: "1.5px solid #e8e2d9", borderRadius: 14, padding: "18px 20px", marginBottom: 16, background: "#fdfbf8" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", fontFamily: "'DM Sans', sans-serif", marginBottom: 10 }}>🏨 Recommended stay</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: "#1a1a1a", marginBottom: 3 }}>{itinerary.hotel.name}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: "#888", marginBottom: 6 }}>{itinerary.hotel.area}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#555", lineHeight: 1.5 }}>{itinerary.hotel.description}</div>
          </div>
          <div style={{ background: "#eef3ff", borderRadius: 8, padding: "6px 12px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#003580", fontWeight: 500, whiteSpace: "nowrap", marginLeft: 12, flexShrink: 0 }}>{itinerary.hotel.priceRange}</div>
        </div>
      </div>
      <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", fontFamily: "'DM Sans', sans-serif", marginBottom: 12 }}>Day by day</div>
      {itinerary.days.map((day, i) => <DayCard key={i} day={day} index={i} />)}
      <div style={{ border: "1.5px solid #e8e2d9", borderRadius: 14, padding: "18px 20px", marginBottom: 20, background: "#fdfbf8" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", fontFamily: "'DM Sans', sans-serif", marginBottom: 14 }}>✦ Practical notes</div>
        {[{ label: "Getting around", value: itinerary.practicalInfo?.bestTransport }, { label: "Pre-book", value: itinerary.practicalInfo?.mustBook }, { label: "Packing tip", value: itinerary.practicalInfo?.packingTip }].map(item => item.value ? (
          <div key={item.label} style={{ marginBottom: 10 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, color: "#888", marginRight: 8 }}>{item.label}:</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#444" }}>{item.value}</span>
          </div>
        ) : null)}
      </div>
      <div style={{ border: "1.5px solid #e8e2d9", borderRadius: 14, overflow: "hidden", background: "#fdfbf8", marginBottom: 32 }}>
        <button onClick={() => setChatOpen(!chatOpen)} style={{ width: "100%", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", background: chatOpen ? "#1a1a1a" : "transparent", border: "none", cursor: "pointer", transition: "background 0.2s" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: chatOpen ? "#fff" : "#1a1a1a" }}>Want to change anything?</span>
          <span style={{ color: chatOpen ? "#0ea5e9" : "#888", fontSize: 18, transform: chatOpen ? "rotate(180deg)" : "none" }}>⌄</span>
        </button>
        {chatOpen && (
          <div style={{ borderTop: "1px solid #e8e2d9" }}>
            {chatMessages.length === 0 && <div style={{ padding: "14px 20px" }}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#888", margin: 0 }}>Tell me anything you'd like to adjust — hotel, a specific day, activities, pace, budget...</p></div>}
            {chatMessages.length > 0 && (
              <div style={{ maxHeight: 260, overflowY: "auto", padding: "14px 20px" }}>
                {chatMessages.map((m, i) => (
                  <div key={i} style={{ marginBottom: 12, display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                    <div style={{ maxWidth: "80%", padding: "10px 14px", borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: m.role === "user" ? "#1a1a1a" : "#f0ebe3", color: m.role === "user" ? "#fff" : "#333", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, lineHeight: 1.5 }}>{m.content}</div>
                  </div>
                ))}
                {chatLoading && <div style={{ display: "flex", gap: 5 }}>{[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#003580", animation: "bounce 1.2s infinite", animationDelay: `${i * 0.2}s` }} />)}</div>}
                <div ref={chatBottomRef} />
              </div>
            )}
            <div style={{ padding: "12px 16px", borderTop: "1px solid #f0ebe3", display: "flex", gap: 8 }}>
              <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendChat()} placeholder="e.g. Replace the museum with something outdoors..." style={{ flex: 1, padding: "10px 14px", border: "1.5px solid #e8e2d9", borderRadius: 8, fontSize: 13.5, fontFamily: "'DM Sans', sans-serif", color: "#1a1a1a", background: "#fff", outline: "none" }} />
              <button onClick={sendChat} disabled={!chatInput.trim() || chatLoading} style={{ padding: "10px 16px", borderRadius: 8, border: "none", background: chatInput.trim() && !chatLoading ? "#1a1a1a" : "#e8e2d9", color: chatInput.trim() && !chatLoading ? "#fff" : "#aaa", fontFamily: "'DM Sans', sans-serif", fontSize: 14, cursor: chatInput.trim() ? "pointer" : "not-allowed" }}>→</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ScrollQuiz({ answers, setAnswers, onSubmit, error }) {
  const set = (id, val) => setAnswers(prev => ({ ...prev, [id]: val }));
  const isComplete = !!(answers.destination && answers.tripType && answers.dates?.start && answers.dates?.end && Object.values(answers.travellers || {}).reduce((a,b)=>a+b,0) >= 1 && answers.budget?.max > answers.budget?.min && answers.pace && (answers.interests||[]).length > 0);
  const sectionStyle = { background: "#fff", borderRadius: 16, padding: "28px 24px", marginBottom: 16, border: "1.5px solid #e8edf5", boxShadow: "0 2px 12px rgba(0,53,128,0.06)" };
  const labelStyle = { fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 400, color: "#1a1a1a", marginBottom: 4, display: "block" };
  const hintStyle = { fontSize: 13, color: "#999", marginBottom: 16, display: "block", fontFamily: "'DM Sans', sans-serif" };

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 400, color: "#1a1a1a", marginBottom: 6 }}>Plan your trip</h1>
        <p style={{ fontSize: 14, color: "#888", lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>Fill in the details below and we'll build your perfect itinerary.</p>
      </div>
      {error && <div style={{ background: "#fef0f0", border: "1px solid #f5c6c6", borderRadius: 8, padding: "12px 16px", marginBottom: 16, fontSize: 13, color: "#c0392b" }}>{error}</div>}
      <div style={sectionStyle}>
        <span style={labelStyle}>Where do you want to go?</span>
        <span style={hintStyle}>City, country, or region — even 'surprise me'</span>
        <input value={answers.destination || ""} onChange={e => set("destination", e.target.value)} placeholder="e.g. Japan, Amalfi Coast, New York..." style={{ width: "100%", padding: "13px 16px", border: `1.5px solid ${answers.destination ? "#003580" : "#e0e6f0"}`, borderRadius: 10, fontSize: 15, fontFamily: "'DM Sans', sans-serif", color: "#1a1a1a", background: "#fafbff", outline: "none", boxSizing: "border-box" }} />
      </div>
      <div style={sectionStyle}>
        <span style={labelStyle}>What kind of trip is this?</span>
        <span style={hintStyle}>This shapes everything — your hotel, pace, and activities</span>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[{ value: "business", icon: "💼", label: "Business", sub: "Work trips, conferences" }, { value: "relax", icon: "🌿", label: "Relax & Unwind", sub: "Recharge, slow down" }, { value: "adventure", icon: "🧗", label: "Adventure", sub: "Hiking, thrills, outdoors" }, { value: "culture", icon: "🏛", label: "Culture & History", sub: "Art, museums, local life" }, { value: "romance", icon: "🥂", label: "Romance", sub: "Couples, anniversary" }, { value: "family", icon: "👨‍👩‍👧", label: "Family", sub: "Kid-friendly for everyone" }, { value: "foodie", icon: "🍽", label: "Food & Drink", sub: "Restaurants, markets, wine" }, { value: "wellness", icon: "🧘", label: "Wellness", sub: "Spa, yoga, reset" }].map(opt => {
            const sel = answers.tripType === opt.value;
            return <button key={opt.value} onClick={() => set("tripType", opt.value)} style={{ padding: "12px 14px", borderRadius: 10, textAlign: "left", border: `1.5px solid ${sel ? "#003580" : "#e0e6f0"}`, background: sel ? "#eef3ff" : "#fafbff", cursor: "pointer", transition: "all 0.15s" }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{opt.icon}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, fontWeight: 500, color: sel ? "#003580" : "#1a1a1a" }}>{opt.label}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11.5, color: sel ? "#003580" : "#aaa", marginTop: 2 }}>{opt.sub}</div>
            </button>;
          })}
        </div>
      </div>
      <div style={sectionStyle}>
        <span style={labelStyle}>What dates do you plan to go?</span>
        <span style={hintStyle}>Select your departure and return date</span>
        {(() => {
          const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
          const now = new Date();
          const years = Array.from({ length: 3 }, (_, i) => now.getFullYear() + i);
          const getDays = (month, year) => {
            if (!month || !year) return 31;
            return new Date(year, month, 0).getDate();
          };
          const selStyle = { flex: 1, padding: "11px 10px", border: "1.5px solid #e0e6f0", borderRadius: 10, fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "#1a1a1a", background: "#fafbff", outline: "none", cursor: "pointer", appearance: "none", WebkitAppearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23aaa' strokeWidth='1.5' fill='none' strokeLinecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" };
          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[{ label: "Departure date", key: "start" }, { label: "Return date", key: "end" }].map(({ label, key }) => {
                const val = (answers.dates || {})[key] || "";
                const parts = val ? val.split("-") : ["", "", ""];
                const [yr, mo, dy] = parts;
                const setDate = (y, m, d) => {
                  if (y && m && d) {
                    const dayCount = getDays(parseInt(m), parseInt(y));
                    const safeDay = Math.min(parseInt(d), dayCount);
                    const dateStr = `${y}-${m.padStart(2,"0")}-${String(safeDay).padStart(2,"0")}`;
                    set("dates", { ...(answers.dates || {}), [key]: dateStr });
                  } else {
                    set("dates", { ...(answers.dates || {}), [key]: "" });
                  }
                };
                const isSet = !!(yr && mo && dy);
                return (
                  <div key={key}>
                    <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: isSet ? "#003580" : "#aaa", fontFamily: "'DM Sans', sans-serif", marginBottom: 8, fontWeight: isSet ? 500 : 400 }}>{label}{isSet ? ` — ${MONTHS[parseInt(mo)-1]} ${dy}, ${yr}` : ""}</div>
                    <div style={{ display: "flex", gap: 8 }}>
                      {/* Day */}
                      <select value={dy || ""} onChange={e => setDate(yr, mo, e.target.value)} style={{ ...selStyle, flex: "0 0 80px", border: `1.5px solid ${dy ? "#003580" : "#e0e6f0"}` }}>
                        <option value="">Day</option>
                        {Array.from({ length: getDays(parseInt(mo), parseInt(yr)) }, (_, i) => i + 1).map(d => (
                          <option key={d} value={String(d).padStart(2,"0")}>{d}</option>
                        ))}
                      </select>
                      {/* Month */}
                      <select value={mo || ""} onChange={e => setDate(yr, e.target.value, dy)} style={{ ...selStyle, border: `1.5px solid ${mo ? "#003580" : "#e0e6f0"}` }}>
                        <option value="">Month</option>
                        {MONTHS.map((m, i) => (
                          <option key={m} value={String(i+1).padStart(2,"0")}>{m}</option>
                        ))}
                      </select>
                      {/* Year */}
                      <select value={yr || ""} onChange={e => setDate(e.target.value, mo, dy)} style={{ ...selStyle, flex: "0 0 90px", border: `1.5px solid ${yr ? "#003580" : "#e0e6f0"}` }}>
                        <option value="">Year</option>
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                  </div>
                );
              })}
              {answers.dates?.start && answers.dates?.end && answers.dates.end >= answers.dates.start && (
                <div style={{ background: "#eef3ff", borderRadius: 8, padding: "8px 14px", fontSize: 13, color: "#003580", fontFamily: "'DM Sans', sans-serif" }}>
                  ✓ {Math.round((new Date(answers.dates.end) - new Date(answers.dates.start)) / (1000*60*60*24))} nights
                </div>
              )}
            </div>
          );
        })()}
      </div>
      <div style={sectionStyle}>
        <span style={labelStyle}>Who's coming?</span>
        <span style={hintStyle}>We'll tailor activities and find the best prices for your group</span>
        {[{ key: "adults", label: "Adults", sub: "18–64 years old", min: 0 }, { key: "children", label: "Children", sub: "2–17 years old", min: 0 }, { key: "infants", label: "Infants", sub: "0–2 years old", min: 0 }, { key: "pensioners", label: "Pensioners", sub: "65+ years old", min: 0 }].map(({ key, label, sub, min }) => {
          const count = (answers.travellers || {})[key] ?? 0;
          return (
            <div key={key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid #f0f4ff" }}>
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14.5, fontWeight: 500, color: "#1a1a1a" }}>{label}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#aaa", marginTop: 2 }}>{sub}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <button onClick={() => set("travellers", { ...(answers.travellers || {}), [key]: Math.max(min, count - 1) })} disabled={count <= min} style={{ width: 36, height: 36, borderRadius: 8, border: `1.5px solid ${count <= min ? "#e0e6f0" : "#003580"}`, background: "transparent", color: count <= min ? "#ccc" : "#003580", fontSize: 20, cursor: count <= min ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 500, color: "#1a1a1a", minWidth: 20, textAlign: "center" }}>{count}</span>
                <button onClick={() => set("travellers", { ...(answers.travellers || {}), [key]: count + 1 })} style={{ width: 36, height: 36, borderRadius: 8, border: "1.5px solid #003580", background: "transparent", color: "#003580", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
              </div>
            </div>
          );
        })}
      </div>
      <div style={sectionStyle}>
        <span style={labelStyle}>What's your budget per person?</span>
        <span style={hintStyle}>Set a minimum and maximum</span>
        {(() => {
          const STEP = 500, MIN = 0, MAX = 10000;
          const curMin = answers.budget?.min ?? 0;
          const curMax = answers.budget?.max ?? 5000;
          const fmt = v => v >= MAX ? `£${MAX.toLocaleString()}+` : `£${v.toLocaleString()}`;
          const pct = v => ((v - MIN) / (MAX - MIN)) * 100;
          return (
            <div>
              <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
                <div style={{ flex: 1, background: "#eef3ff", borderRadius: 10, padding: "12px", textAlign: "center", border: "1.5px solid #003580" }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#003580", fontFamily: "'DM Sans', sans-serif", marginBottom: 4 }}>Minimum</div>
                  <div style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", color: "#1a1a1a" }}>{fmt(curMin)}</div>
                </div>
                <div style={{ flex: 1, background: "#1a1a1a", borderRadius: 10, padding: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#0ea5e9", fontFamily: "'DM Sans', sans-serif", marginBottom: 4 }}>Maximum</div>
                  <div style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", color: "#fff" }}>{fmt(curMax)}</div>
                </div>
              </div>
              {[{ label: "Minimum", val: curMin, isMin: true }, { label: "Maximum", val: curMax, isMin: false }].map(({ label, val, isMin }) => (
                <div key={label} style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 11, color: "#aaa", fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label} budget</span>
                    <span style={{ fontSize: 12, color: isMin ? "#003580" : "#1a1a1a", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{fmt(val)}</span>
                  </div>
                  <div style={{ position: "relative", height: 6, background: "#e0e6f0", borderRadius: 3 }}>
                    <div style={{ position: "absolute", left: 0, width: `${pct(val)}%`, height: "100%", background: isMin ? "#003580" : "#1a1a1a", borderRadius: 3 }} />
                    <input type="range" min={MIN} max={MAX} step={STEP} value={val} onChange={e => { const v = Number(e.target.value); if (isMin) set("budget", { min: v, max: Math.max(curMax, v + STEP) }); else set("budget", { min: Math.min(curMin, v - STEP), max: v }); }} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer", margin: 0 }} />
                    <div style={{ position: "absolute", top: "50%", transform: "translate(-50%,-50%)", left: `${pct(val)}%`, width: 18, height: 18, borderRadius: "50%", background: "#fff", border: `2.5px solid ${isMin ? "#003580" : "#1a1a1a"}`, pointerEvents: "none" }} />
                  </div>
                </div>
              ))}
            </div>
          );
        })()}
      </div>
      <div style={sectionStyle}>
        <span style={labelStyle}>How do you like to travel?</span>
        <span style={hintStyle}>This shapes how many activities we plan each day</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[{ value: "packed", label: "Packed", sub: "I want it all", dots: 5 }, { value: "balanced", label: "Balanced", sub: "Some activities, some chill days", dots: 4 }, { value: "relaxed", label: "Relaxed", sub: "The odd activity", dots: 3 }, { value: "one_per_day", label: "One a Day", sub: "1 activity per day", dots: 2 }, { value: "spontaneous", label: "Spontaneous", sub: "Only 1–2 planned total", dots: 1 }, { value: "transport", label: "Transport & Accommodation Only", sub: "No activities planned", dots: 0 }].map(opt => {
            const sel = answers.pace === opt.value;
            return <button key={opt.value} onClick={() => set("pace", opt.value)} style={{ padding: "13px 16px", borderRadius: 10, textAlign: "left", border: `1.5px solid ${sel ? "#003580" : "#e0e6f0"}`, background: sel ? "#eef3ff" : "#fafbff", cursor: "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: sel ? "#003580" : "#1a1a1a" }}>{opt.label} <span style={{ fontWeight: 300, color: sel ? "#003580" : "#888" }}>— {opt.sub}</span></div>
              <div style={{ display: "flex", gap: 3 }}>{[1,2,3,4,5].map(i => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: i <= opt.dots ? (sel ? "#003580" : "#1a1a1a") : "#e0e6f0" }} />)}</div>
            </button>;
          })}
        </div>
      </div>
      <div style={sectionStyle}>
        <span style={labelStyle}>What matters most to you?</span>
        <span style={hintStyle}>Pick everything that applies</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {["Food & restaurants", "Art & culture", "Nature & outdoors", "Nightlife", "Luxury & wellness", "History", "Hidden gems", "Shopping", "Architecture", "Music & live events", "Photography", "Sport & fitness", "Local markets", "Beaches", "Wildlife", "Religious sites"].map(opt => {
            const sel = (answers.interests || []).includes(opt);
            return <button key={opt} onClick={() => set("interests", sel ? (answers.interests||[]).filter(x=>x!==opt) : [...(answers.interests||[]), opt])} style={{ padding: "8px 14px", borderRadius: 20, border: `1.5px solid ${sel ? "#003580" : "#e0e6f0"}`, background: sel ? "#eef3ff" : "#fafbff", color: sel ? "#003580" : "#555", fontFamily: "'DM Sans', sans-serif", fontSize: 13, cursor: "pointer", fontWeight: sel ? 500 : 400 }}>{opt}</button>;
          })}
        </div>
      </div>
      <button onClick={onSubmit} disabled={!isComplete} style={{ width: "100%", padding: "16px", borderRadius: 12, background: isComplete ? "#003580" : "#e0e6f0", border: "none", color: isComplete ? "#fff" : "#aaa", fontSize: 16, fontWeight: 500, cursor: isComplete ? "pointer" : "not-allowed", fontFamily: "'DM Sans', sans-serif", boxShadow: isComplete ? "0 6px 24px rgba(0,53,128,0.3)" : "none", transition: "all 0.2s" }}>
        {isComplete ? "Build my trip →" : "Complete all sections to continue"}
      </button>
    </div>
  );
}

function RoamApp({ onItineraryReady, onBookNow }) {
  const [screen, setScreen] = useState("quiz");
  const [answers, setAnswers] = useState({});
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState(null);

  async function generateItinerary() {
    setScreen("loading");
    setError(null);
    try {
      const dates = answers.dates?.start && answers.dates?.end ? `${answers.dates.start} to ${answers.dates.end}` : answers.dates;
      const prompt = `Build a trip itinerary:\nDestination: ${answers.destination}\nTrip type: ${answers.tripType}\nDates: ${dates}\nTravellers: ${typeof answers.travellers === 'object' ? Object.entries(answers.travellers).filter(([,v])=>v>0).map(([k,v])=>`${v} ${k}`).join(', ') : answers.travellers}\nBudget: ${typeof answers.budget === 'object' ? `£${answers.budget.min?.toLocaleString()} – £${answers.budget.max >= 10000 ? '10,000+' : answers.budget.max?.toLocaleString()}` : answers.budget}\nPace: ${answers.pace}\nInterests: ${(answers.interests || []).join(", ")}`;
      const raw = await callClaude(ITINERARY_SYSTEM, prompt, 2000);
      const clean = raw.replace(/```json|```/g, "").trim();
      const data = JSON.parse(clean);
      setItinerary(data);
      if (onItineraryReady) onItineraryReady(data);
      setScreen("itinerary");
    } catch (err) {
      setError("Something went wrong building your itinerary. Please try again.");
      setScreen("quiz");
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9ff", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`${FONT} @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}} @keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-7px)}} @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}} *{box-sizing:border-box;margin:0;padding:0;} input,button,textarea{font-family:inherit;} ::-webkit-scrollbar{width:3px;} ::-webkit-scrollbar-thumb{background:#ddd;border-radius:2px;}`}</style>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "32px 24px 60px" }}>
        {screen === "quiz" && <ScrollQuiz answers={answers} setAnswers={setAnswers} onSubmit={generateItinerary} error={error} />}
        {screen === "loading" && <LoadingScreen destination={answers.destination} />}
        {screen === "itinerary" && itinerary && <ItineraryView itinerary={itinerary} answers={answers} onBookNow={onBookNow} />}
      </div>
    </div>
  );
}

// ─── Homepage data ────────────────────────────────────────────────────────────
const STEPS = [
  { num: "01", title: "Tell us about your trip", desc: "Answer a few smart questions — destination, dates, who's coming, your pace. Takes under two minutes." },
  { num: "02", title: "We build your itinerary", desc: "Our AI crafts a complete day-by-day plan — hotel, activities, transport, and dining — tailored precisely to you." },
  { num: "03", title: "Review and refine", desc: "Browse your trip in full. Want to change anything? Just ask. We'll adjust it instantly." },
  { num: "04", title: "Book in one place", desc: "Every booking link pre-filled and ready. Flights, hotels, activities — all platforms, all in one screen." },
];

const PLATFORMS = ["Booking.com", "Skyscanner", "GetYourGuide", "Airbnb", "Trip.com", "Viator", "TripAdvisor", "Hostelworld"];

// Example itinerary — 3 date-range blocks
const EXAMPLE = {
  hotel: { name: "The Tokyo Edition, Toranomon", area: "Toranomon, Tokyo", priceRange: "£320/night" },
  days: [
    { range: "Days 1–2", theme: "Tokyo Arrival & City", morning: "Settle in, explore Shibuya Crossing at rush hour", afternoon: "Meiji Shrine & Harajuku", evening: "Ichiran Ramen — iconic solo ramen booths", insiderTip: "Watch the crossing from the 2nd-floor Starbucks — arrive 5 mins early" },
    { range: "Days 3–5", theme: "Old Tokyo & Art", morning: "Senso-ji Temple, Asakusa — arrive at 7am", afternoon: "teamLab Planets in Toyosu — book ahead", evening: "Yakitori under the train tracks, Yurakucho", insiderTip: "The back lanes behind Senso-ji are full of craft shops tourists miss" },
    { range: "Days 6–7", theme: "Kyoto Day Trips", morning: "Shinkansen to Kyoto — 2hrs 15 mins", afternoon: "Fushimi Inari shrine gates & Arashiyama bamboo grove", evening: "Kaiseki dinner then Shinkansen back to Tokyo", insiderTip: "Fushimi Inari at dawn is otherworldly — catch the 6:30am train" },
  ],
};

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef();
  const inView = useInView(ref);
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

// ─── Auth Modals ──────────────────────────────────────────────────────────────
function AuthModal({ mode, onClose, onAuth }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [view, setView] = useState(mode); // "signin" | "signup"
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const inputStyle = { width: "100%", padding: "11px 14px", border: "1.5px solid #e0e6f0", borderRadius: 10, fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "#1a1a1a", background: "#fafbff", outline: "none", boxSizing: "border-box" };

  const handleSubmit = () => {
    if (view === "signup" && (!form.name || !form.email || !form.password)) return;
    if (view === "signin" && (!form.email || !form.password)) return;
    onAuth({ name: form.name || form.email.split("@")[0], email: form.email });
    onClose();
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div style={{ background: "#fff", borderRadius: 20, padding: "40px 36px", width: "100%", maxWidth: 420, position: "relative", boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#aaa" }}>✕</button>
        <TripDoneLogo width={110} />
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, color: "#1a1a1a", margin: "20px 0 6px" }}>{view === "signin" ? "Welcome back" : "Create your account"}</h2>
        <p style={{ fontSize: 13, color: "#888", marginBottom: 24, fontFamily: "'DM Sans', sans-serif" }}>{view === "signin" ? "Sign in to access your bookings and itineraries." : "Join TripDone and start planning smarter."}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {view === "signup" && <input placeholder="Full name" value={form.name} onChange={e => f("name", e.target.value)} style={inputStyle} />}
          <input placeholder="Email address" type="email" value={form.email} onChange={e => f("email", e.target.value)} style={inputStyle} />
          <input placeholder="Password" type="password" value={form.password} onChange={e => f("password", e.target.value)} style={inputStyle} />
          <button onClick={handleSubmit} style={{ width: "100%", padding: "13px", borderRadius: 10, background: "#003580", border: "none", color: "#fff", fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", marginTop: 4, boxShadow: "0 4px 16px rgba(0,53,128,0.3)" }}>
            {view === "signin" ? "Sign in →" : "Create account →"}
          </button>
        </div>
        <p style={{ fontSize: 13, color: "#888", textAlign: "center", marginTop: 20, fontFamily: "'DM Sans', sans-serif" }}>
          {view === "signin" ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => setView(view === "signin" ? "signup" : "signin")} style={{ color: "#003580", cursor: "pointer", fontWeight: 500 }}>{view === "signin" ? "Create one" : "Sign in"}</span>
        </p>
      </div>
    </div>
  );
}

// ─── My Bookings Page ─────────────────────────────────────────────────────────
function MyBookings({ user, onClose }) {
  const [tab, setTab] = useState("flights");
  const tabs = [
    { key: "flights", label: "✈ Flights" },
    { key: "stays", label: "🏨 Stays" },
    { key: "activities", label: "🎯 Activities" },
  ];
  return (
    <div style={{ position: "fixed", inset: 0, background: "#f8f9ff", zIndex: 999, overflowY: "auto" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 60px" }}>
        {/* Header */}
        <div style={{ padding: "24px 0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e8edf5", marginBottom: 32 }}>
          <TripDoneLogo width={110} />
          <button onClick={onClose} style={{ padding: "9px 22px", borderRadius: 6, background: "#003580", border: "none", color: "#fff", fontSize: 13.5, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>← Back</button>
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 300, color: "#1a1a1a", marginBottom: 4 }}>My Bookings</h1>
        <p style={{ fontSize: 14, color: "#888", fontFamily: "'DM Sans', sans-serif", marginBottom: 32 }}>Welcome back, {user.name}.</p>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{ padding: "10px 22px", borderRadius: 8, border: `1.5px solid ${tab === t.key ? "#003580" : "#e0e6f0"}`, background: tab === t.key ? "#003580" : "#fff", color: tab === t.key ? "#fff" : "#555", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: tab === t.key ? 500 : 400, cursor: "pointer" }}>{t.label}</button>
          ))}
        </div>

        {/* Empty state */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e8edf5", padding: "64px 32px", textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>{tab === "flights" ? "✈️" : tab === "stays" ? "🏨" : "🎯"}</div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "#ccc", marginBottom: 8 }}>Nothing booked here yet</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#bbb", marginBottom: 28 }}>
            {tab === "flights" ? "Your flight bookings will appear here." : tab === "stays" ? "Your hotel and accommodation bookings will appear here." : "Your tours, experiences and activities will appear here."}
          </p>
          <button onClick={onClose} style={{ padding: "11px 28px", borderRadius: 8, background: "#003580", border: "none", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>Plan a trip →</button>
        </div>
      </div>
    </div>
  );
}

// ─── Page wrapper helper ──────────────────────────────────────────────────────
function PageShell({ onHome, user, onSignIn, onSignUp, onBookings, onSignOut, onPage, children }) {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", background: "#f8f9ff" }}>
      <style>{`${FONTS} *{box-sizing:border-box;margin:0;padding:0;} body{background:#f8f9ff;}`}</style>
      <nav style={{ padding: "12px 5vw", minHeight: 72, display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,53,128,0.08)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ cursor: "pointer" }} onClick={onHome}><TripDoneLogo width={120} /></div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button onClick={onHome} style={{ padding: "9px 20px", borderRadius: 6, background: "transparent", border: "1.5px solid #003580", color: "#003580", fontSize: 13.5, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>← Home</button>
          <AccountDropdown user={user} onSignIn={onSignIn} onSignUp={onSignUp} onBookings={onBookings} onSignOut={onSignOut} onPage={onPage} />
        </div>
      </nav>
      {children}
    </div>
  );
}

// ─── Pricing Page ─────────────────────────────────────────────────────────────
function PricingPage({ onHome, user, onSignIn, onSignUp, onBookings, onSignOut, onPage, onPlan }) {
  return (
    <PageShell onHome={onHome} user={user} onSignIn={onSignIn} onSignUp={onSignUp} onBookings={onBookings} onSignOut={onSignOut} onPage={onPage}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "80px 5vw 120px" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <p style={{ fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", color: "#003580", marginBottom: 14, fontWeight: 500 }}>Pricing</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 300, color: "#1a1a1a", lineHeight: 1.1, marginBottom: 20 }}>
            Always free.<br /><em style={{ color: "#003580" }}>No hidden costs.</em>
          </h1>
          <p style={{ fontSize: 18, color: "#666", maxWidth: 580, margin: "0 auto", lineHeight: 1.8, fontWeight: 300 }}>
            Planning your perfect trip shouldn't cost a penny. TripDone is completely free to use — every itinerary, every recommendation, every insider tip.
          </p>
        </div>

        {/* Big free card */}
        <div style={{ background: "#003580", borderRadius: 20, padding: "56px 48px", textAlign: "center", marginBottom: 48, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
          <div style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7ab8e8", marginBottom: 16 }}>What you pay</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 80, fontWeight: 300, color: "#fff", lineHeight: 1, marginBottom: 8 }}>£0</div>
          <div style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", marginBottom: 40, fontWeight: 300 }}>Forever. No subscription. No credit card.</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 48 }}>
            {["AI-generated itineraries", "Day-by-day planning", "Hotel recommendations", "Insider tips & hidden gems", "Chat refinement", "Packing lists"].map(f => (
              <div key={f} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: "14px 18px", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#0ea5e9", fontSize: 16 }}>✓</span>
                <span style={{ fontSize: 13.5, color: "rgba(255,255,255,0.8)", fontFamily: "'DM Sans', sans-serif" }}>{f}</span>
              </div>
            ))}
          </div>
          <button onClick={onPlan} style={{ padding: "16px 44px", borderRadius: 8, background: "#fff", border: "none", color: "#003580", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Start planning for free →</button>
        </div>

        {/* How we make money */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e8edf5", padding: "40px 44px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, color: "#1a1a1a", marginBottom: 16 }}>So how does TripDone work?</h2>
          <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8, marginBottom: 16, fontWeight: 300 }}>
            We earn a small commission when you choose to book flights, hotels, or activities through our recommended links — at no extra cost to you whatsoever. You'd pay exactly the same price booking directly.
          </p>
          <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8, fontWeight: 300 }}>
            This model means our interests are completely aligned with yours. We only win when you find something you love. No paywalls, no upsells, no surprises — just great travel planning, completely free.
          </p>
        </div>
      </div>
    </PageShell>
  );
}

// ─── How It Works Page ────────────────────────────────────────────────────────
function HowItWorksPage({ onHome, user, onSignIn, onSignUp, onBookings, onSignOut, onPage, onPlan }) {
  const steps = [
    { num: "01", icon: "🗺", title: "Tell us about your trip", body: "Answer a handful of smart questions — where you want to go, your dates, who's travelling, your budget, and what you love. It takes under two minutes and the more you share, the better your itinerary.", img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80" },
    { num: "02", icon: "✨", title: "We build your itinerary", body: "Our AI gets to work instantly. It draws on a vast knowledge of destinations, hotels, local experiences and hidden gems to craft a complete day-by-day plan tailored precisely to you — not a generic template.", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80" },
    { num: "03", icon: "💬", title: "Review and refine", body: "Your itinerary is yours to shape. Read through every day, every recommendation, every insider tip. Want to swap a restaurant, slow down the pace, or add an extra day? Just ask and we'll adjust it instantly.", img: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800&q=80" },
    { num: "04", icon: "🎯", title: "Book in one place", body: "Every booking link is pre-filled and ready to go. Flights, hotels, tours, restaurants — all the platforms you already trust, surfaced in one clean screen. No tab-switching, no searching. Just go.", img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80" },
  ];
  return (
    <PageShell onHome={onHome} user={user} onSignIn={onSignIn} onSignUp={onSignUp} onBookings={onBookings} onSignOut={onSignOut} onPage={onPage}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "80px 5vw 120px" }}>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <p style={{ fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", color: "#003580", marginBottom: 14, fontWeight: 500 }}>How it works</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 300, color: "#1a1a1a", lineHeight: 1.1, marginBottom: 20 }}>
            From idea to itinerary<br /><em style={{ color: "#003580" }}>in minutes.</em>
          </h1>
          <p style={{ fontSize: 18, color: "#666", maxWidth: 560, margin: "0 auto", lineHeight: 1.8, fontWeight: 300 }}>No travel agent. No endless tabs. No stress. Just tell us what you want and let TripDone handle everything else.</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          {steps.map((s, i) => (
            <div key={s.num} style={{ display: "grid", gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr", gap: 40, alignItems: "center" }}>
              <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
                <div style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "#003580", marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>Step {s.num}</div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 300, color: "#1a1a1a", marginBottom: 16, lineHeight: 1.2 }}>{s.icon} {s.title}</h2>
                <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8, fontWeight: 300 }}>{s.body}</p>
              </div>
              <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
                <div style={{ borderRadius: 16, overflow: "hidden", height: 280, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
                  <img src={s.img} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 80 }}>
          <button onClick={onPlan} style={{ padding: "16px 48px", borderRadius: 8, background: "#003580", border: "none", color: "#fff", fontSize: 16, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 8px 32px rgba(0,53,128,0.3)" }}>Try it now — it's free →</button>
        </div>
      </div>
    </PageShell>
  );
}

// ─── Destinations Page ────────────────────────────────────────────────────────
const DESTINATIONS_DATA = [
  { name: "Tokyo, Japan", tag: "City & Culture", desc: "Neon nights, ancient temples and the world's best ramen.", photo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80", duration: "7–10 days" },
  { name: "Amalfi Coast, Italy", tag: "Romance & Scenery", desc: "Clifftop villages, turquoise water and limoncello at sunset.", photo: "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=600&q=80", duration: "5–7 days" },
  { name: "Bali, Indonesia", tag: "Wellness & Adventure", desc: "Rice terraces, surf breaks and spiritual stillness.", photo: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80", duration: "10–14 days" },
  { name: "New York, USA", tag: "City Break", desc: "The city that never sleeps — and never disappoints.", photo: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80", duration: "5–7 days" },
  { name: "Santorini, Greece", tag: "Romance & Relaxation", desc: "Whitewashed walls, volcanic beaches and breathtaking sunsets.", photo: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", duration: "5–7 days" },
  { name: "Queenstown, NZ", tag: "Adventure", desc: "The adventure capital of the world — bungee, ski, hike, repeat.", photo: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=600&q=80", duration: "7–10 days" },
  { name: "Barcelona, Spain", tag: "Food & Culture", desc: "Gaudí, tapas, La Boqueria and late nights on Las Ramblas.", photo: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&q=80", duration: "4–6 days" },
  { name: "Cape Town, South Africa", tag: "Nature & Adventure", desc: "Table Mountain, wine country and the most dramatic coastline on earth.", photo: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&q=80", duration: "7–10 days" },
  { name: "Paris, France", tag: "Romance & Culture", desc: "The city of light — art, fashion, food and effortless beauty.", photo: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80", duration: "4–6 days" },
  { name: "Dubai, UAE", tag: "Luxury & Adventure", desc: "Desert dunes, towering skyscrapers and world-class everything.", photo: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80", duration: "5–7 days" },
  { name: "Bangkok, Thailand", tag: "Food & Culture", desc: "Street food markets, golden temples and organised chaos at its finest.", photo: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&q=80", duration: "5–8 days" },
  { name: "Sydney, Australia", tag: "City & Nature", desc: "Iconic harbour, golden beaches and a city that lives outdoors.", photo: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&q=80", duration: "7–10 days" },
];

function DestinationsPage({ onHome, user, onSignIn, onSignUp, onBookings, onSignOut, onPage, onPlan }) {
  return (
    <PageShell onHome={onHome} user={user} onSignIn={onSignIn} onSignUp={onSignUp} onBookings={onBookings} onSignOut={onSignOut} onPage={onPage}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 5vw 120px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", color: "#003580", marginBottom: 14, fontWeight: 500 }}>Destinations</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 300, color: "#1a1a1a", lineHeight: 1.1, marginBottom: 20 }}>
            Where do you want<br /><em style={{ color: "#003580" }}>to go next?</em>
          </h1>
          <p style={{ fontSize: 17, color: "#666", maxWidth: 520, margin: "0 auto", lineHeight: 1.8, fontWeight: 300 }}>From hidden gems to bucket-list classics — click any destination to build your perfect itinerary.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
          {DESTINATIONS_DATA.map((d, i) => (
            <div key={d.name} onClick={onPlan} style={{ borderRadius: 16, overflow: "hidden", position: "relative", height: 320, boxShadow: "0 8px 32px rgba(0,0,0,0.1)", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.18)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.1)"; }}>
              <img src={d.photo} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.05) 60%)" }} />
              <div style={{ position: "absolute", top: 16, left: 16 }}>
                <span style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", color: "#fff", fontSize: 11, fontFamily: "'DM Sans', sans-serif", padding: "4px 10px", borderRadius: 20, letterSpacing: "0.05em" }}>{d.tag}</span>
              </div>
              <div style={{ position: "absolute", bottom: 22, left: 22, right: 22 }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 400, color: "#fff", marginBottom: 6 }}>{d.name}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.5, marginBottom: 10 }}>{d.desc}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}>✦ Recommended: {d.duration}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

// ─── Blog Page ────────────────────────────────────────────────────────────────
const BLOG_POSTS = [
  {
    slug: "first-app-development",
    date: "30 May 2026",
    author: "Thomas Pritchard",
    category: "Behind the Build",
    title: "First App Development",
    subtitle: "Why I built TripDone — and what I hope it does for you.",
    photo: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80",
    body: `I've always loved travel. The feeling of landing somewhere new, the smell of a different city, the moment you realise you have absolutely no idea where you are — and that that's completely fine.

But I also know the other side of it. The hours spent with seventeen tabs open, comparing hotels that all look the same, trying to work out if a flight connection is tight enough, wondering whether the restaurant you bookmarked is still any good. Planning a trip can feel like a second job. A stressful one, at that.

That's why I built TripDone.

The idea is simple: you tell us where you want to go, what you love, and how you like to travel. We handle everything else. In minutes, you have a full itinerary — real hotels, real places, real insider tips — tailored specifically to you. Not a template. Not a generic list. Your trip.

I built it because I wanted something that felt like having a knowledgeable friend in every city. Someone who's already been, already knows the best spots, and can just tell you exactly what to do without the fluff.

It's early days. There's plenty still to build. But the core is here — and if it saves even one person from spending their Sunday afternoon buried in browser tabs instead of actually looking forward to their holiday, then it was worth it.

Here's to better trips. ✈`
  },
];

function BlogPage({ onHome, user, onSignIn, onSignUp, onBookings, onSignOut, onPage }) {
  const [post, setPost] = useState(null);
  if (post) return (
    <PageShell onHome={onHome} user={user} onSignIn={onSignIn} onSignUp={onSignUp} onBookings={onBookings} onSignOut={onSignOut} onPage={onPage}>
      <div style={{ maxWidth: 740, margin: "0 auto", padding: "60px 5vw 120px" }}>
        <button onClick={() => setPost(null)} style={{ background: "none", border: "none", color: "#003580", cursor: "pointer", fontSize: 14, fontFamily: "'DM Sans', sans-serif", marginBottom: 32, padding: 0 }}>← Back to blog</button>
        <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#003580", marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>{post.category}</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 300, color: "#1a1a1a", lineHeight: 1.1, marginBottom: 12 }}>{post.title}</h1>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontStyle: "italic", color: "#888", marginBottom: 24 }}>{post.subtitle}</p>
        <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 36 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#003580", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>TP</div>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 500, color: "#1a1a1a", fontFamily: "'DM Sans', sans-serif" }}>{post.author}</div>
            <div style={{ fontSize: 12, color: "#aaa", fontFamily: "'DM Sans', sans-serif" }}>{post.date}</div>
          </div>
        </div>
        <div style={{ borderRadius: 16, overflow: "hidden", height: 360, marginBottom: 48, boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}>
          <img src={post.photo} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        {post.body.split("\n\n").map((p, i) => (
          <p key={i} style={{ fontSize: 16, color: "#333", lineHeight: 1.9, marginBottom: 24, fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>{p}</p>
        ))}
      </div>
    </PageShell>
  );

  return (
    <PageShell onHome={onHome} user={user} onSignIn={onSignIn} onSignUp={onSignUp} onBookings={onBookings} onSignOut={onSignOut} onPage={onPage}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 5vw 120px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", color: "#003580", marginBottom: 14, fontWeight: 500 }}>Blog & Inspiration</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 5vw, 68px)", fontWeight: 300, color: "#1a1a1a", lineHeight: 1.1 }}>
            Stories, tips &<br /><em style={{ color: "#003580" }}>travel inspiration.</em>
          </h1>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 28 }}>
          {BLOG_POSTS.map(p => (
            <div key={p.slug} onClick={() => setPost(p)} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.07)", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.07)"; }}>
              <div style={{ height: 220, overflow: "hidden" }}>
                <img src={p.photo} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "24px 26px 28px" }}>
                <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#003580", marginBottom: 10, fontFamily: "'DM Sans', sans-serif" }}>{p.category}</div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 400, color: "#1a1a1a", marginBottom: 8, lineHeight: 1.2 }}>{p.title}</h2>
                <p style={{ fontSize: 13.5, color: "#777", lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif", marginBottom: 20 }}>{p.subtitle}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "#aaa", fontFamily: "'DM Sans', sans-serif" }}>{p.date} · {p.author}</span>
                  <span style={{ fontSize: 13, color: "#003580", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>Read →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

// ─── Post-Itinerary Booking Page ──────────────────────────────────────────────
function BookingPage({ itinerary, onBack, onHome }) {
  const bookingLinks = [
    { label: "Flights", icon: "✈️", platform: "Skyscanner", color: "#003580", desc: "Find the best flight deals for your dates", href: "https://skyscanner.com" },
    { label: "Hotels", icon: "🏨", platform: "Booking.com", color: "#003276", desc: `Book ${itinerary?.hotel?.name || "your recommended stay"}`, href: "https://booking.com" },
    { label: "Activities", icon: "🎯", platform: "GetYourGuide", color: "#FF5533", desc: "Book tours, experiences and day trips", href: "https://getyourguide.com" },
    { label: "Transfers", icon: "🚕", platform: "Trip.com", color: "#0086F6", desc: "Airport transfers and car hire", href: "https://trip.com" },
  ];
  return (
    <div style={{ minHeight: "100vh", background: "#f8f9ff", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`${FONTS} *{box-sizing:border-box;margin:0;padding:0;}`}</style>
      <nav style={{ padding: "12px 5vw", minHeight: 72, display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,53,128,0.08)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ cursor: "pointer" }} onClick={onHome}><TripDoneLogo width={120} /></div>
        <button onClick={onBack} style={{ padding: "9px 20px", borderRadius: 6, background: "transparent", border: "1.5px solid #003580", color: "#003580", fontSize: 13.5, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>← Back to itinerary</button>
      </nav>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 5vw 120px" }}>
        <div style={{ background: "#003580", borderRadius: 16, padding: "32px 36px", marginBottom: 40 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7ab8e8", marginBottom: 8 }}>Your trip is ready</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 300, color: "#fff", marginBottom: 6 }}>{itinerary?.destination || "Your Trip"}</h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "rgba(255,255,255,0.6)", fontSize: 16 }}>{itinerary?.tagline}</p>
        </div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 300, color: "#1a1a1a", marginBottom: 8 }}>Now let's book it</h2>
        <p style={{ fontSize: 14, color: "#888", marginBottom: 32, fontFamily: "'DM Sans', sans-serif" }}>Everything you need, in one place. All links open our trusted booking partners — at no extra cost to you.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {bookingLinks.map(b => (
            <a key={b.label} href={b.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", borderRadius: 14, padding: "20px 24px", border: "1.5px solid #e0e6f0", transition: "box-shadow 0.2s, border-color 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,53,128,0.1)"; e.currentTarget.style.borderColor = "#003580"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#e0e6f0"; }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontSize: 28 }}>{b.icon}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: "#1a1a1a", marginBottom: 2 }}>{b.label}</div>
                  <div style={{ fontSize: 13, color: "#888" }}>{b.desc}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 12, color: "#aaa", fontFamily: "'DM Sans', sans-serif" }}>via {b.platform}</span>
                <div style={{ background: b.color, color: "#fff", borderRadius: 8, padding: "8px 18px", fontSize: 13.5, fontWeight: 500, whiteSpace: "nowrap" }}>Book →</div>
              </div>
            </a>
          ))}
        </div>
        <div style={{ marginTop: 32, background: "#eef3ff", borderRadius: 12, padding: "16px 20px", fontSize: 13, color: "#003580", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>
          ✦ <strong>TripDone earns a small commission</strong> when you book through these links — at no extra cost to you. This is how we keep TripDone completely free for everyone.
        </div>
      </div>
    </div>
  );
}

// ─── Nav Account Dropdown ─────────────────────────────────────────────────────
function AccountDropdown({ user, onSignIn, onSignUp, onBookings, onSignOut, onPage }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const menuItem = (label, action, danger = false) => (
    <button key={label} onClick={() => { action(); setOpen(false); }}
      style={{ width: "100%", padding: "11px 18px", background: "none", border: "none", textAlign: "left", fontSize: 13.5, fontFamily: "'DM Sans', sans-serif", color: danger ? "#e74c3c" : "#333", cursor: "pointer", borderBottom: "1px solid #f5f5f5" }}
      onMouseEnter={e => e.target.style.background = "#f8f9ff"}
      onMouseLeave={e => e.target.style.background = "none"}>{label}</button>
  );

  const dropdownStyle = { position: "absolute", top: 48, right: 0, background: "#fff", borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.12)", border: "1px solid #e8edf5", minWidth: 210, overflow: "hidden", zIndex: 200 };

  if (user) {
    const initials = user.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
    return (
      <div ref={ref} style={{ position: "relative" }}>
        <button onClick={() => setOpen(!open)} style={{ width: 38, height: 38, borderRadius: "50%", background: "#003580", border: "none", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>{initials}</button>
        {open && (
          <div style={dropdownStyle}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid #f0f4ff" }}>
              <div style={{ fontSize: 13.5, fontWeight: 500, color: "#1a1a1a" }}>{user.name}</div>
              <div style={{ fontSize: 12, color: "#aaa" }}>{user.email}</div>
            </div>
            {menuItem("✈ My Bookings", onBookings)}
            {menuItem("🌍 Destinations", () => onPage("destinations"))}
            {menuItem("📖 Blog & Inspiration", () => onPage("blog"))}
            {menuItem("💷 Pricing", () => onPage("pricing"))}
            {menuItem("❓ How it works", () => onPage("howItWorks"))}
            {menuItem("→ Sign out", onSignOut, true)}
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)} style={{ padding: "10px 20px", borderRadius: 6, background: "#003580", border: "none", color: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: "'DM Sans', sans-serif" }}>
        Account <span style={{ fontSize: 10, opacity: 0.7 }}>▼</span>
      </button>
      {open && (
        <div style={dropdownStyle}>
          {menuItem("Sign in", onSignIn)}
          {menuItem("Create account", onSignUp)}
          {menuItem("✈ My Bookings", onBookings)}
          {menuItem("🌍 Destinations", () => onPage("destinations"))}
          {menuItem("📖 Blog & Inspiration", () => onPage("blog"))}
          {menuItem("💷 Pricing", () => onPage("pricing"))}
          {menuItem("❓ How it works", () => onPage("howItWorks"))}
        </div>
      )}
    </div>
  );
}

// ─── Homepage ─────────────────────────────────────────────────────────────────
export default function RoamHomepage() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [authModal, setAuthModal] = useState(null);
  const [itinerary, setItinerary] = useState(null);
  const [showBookingPage, setShowBookingPage] = useState(false);

  const goHome = () => { setPage("home"); setShowBookingPage(false); };
  const goPage = (p) => setPage(p);
  const sharedProps = { user, onSignIn: () => setAuthModal("signin"), onSignUp: () => setAuthModal("signup"), onBookings: () => setPage("bookings"), onSignOut: () => setUser(null), onPage: goPage, onHome: goHome };

  if (authModal) return (
    <>
      {page === "home" && null}
      <AuthModal mode={authModal} onClose={() => setAuthModal(null)} onAuth={u => { setUser(u); setAuthModal(null); }} />
    </>
  );

  if (page === "bookings" && user) return <MyBookings user={user} onClose={goHome} />;
  if (page === "pricing") return <PricingPage {...sharedProps} onPlan={() => setPage("app")} />;
  if (page === "howItWorks") return <HowItWorksPage {...sharedProps} onPlan={() => setPage("app")} />;
  if (page === "destinations") return <DestinationsPage {...sharedProps} onPlan={() => setPage("app")} />;
  if (page === "blog") return <BlogPage {...sharedProps} />;

  if (showBookingPage) return <BookingPage itinerary={itinerary} onBack={() => setShowBookingPage(false)} onHome={goHome} />;

  if (page === "app") {
    return (
      <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <style>{`${FONTS} *{box-sizing:border-box;margin:0;padding:0;} body{background:#f8f9ff;}`}</style>
        <nav style={{ padding: "12px 5vw", minHeight: 72, display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,53,128,0.08)", position: "sticky", top: 0, zIndex: 100 }}>
          <div style={{ cursor: "pointer" }} onClick={goHome}><TripDoneLogo width={120} /></div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button onClick={goHome} style={{ padding: "9px 22px", borderRadius: 6, background: "transparent", border: "1.5px solid #003580", color: "#003580", fontSize: 13.5, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>← Home</button>
            <AccountDropdown {...sharedProps} />
          </div>
        </nav>
        <RoamApp onItineraryReady={(itin) => setItinerary(itin)} onBookNow={() => setShowBookingPage(true)} />
      </div>
    );
  }

  // ── HOMEPAGE ──
  const setShowApp = () => setPage("app");
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#1a1a1a", background: "#ffffff", overflowX: "hidden", width: "100%", minWidth: "100vw" }}>
      <style>{`
        ${FONTS}
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { background: #ffffff; width: 100%; overflow-x: hidden; }
        html { scroll-behavior: smooth; }
        #root { width: 100%; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }
        @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #003580; border-radius: 2px; }
        .footer-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1.2fr; gap: 48px; }
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .footer-grid { grid-template-columns: 1fr; } }
      `}</style>

      {authModal && <AuthModal mode={authModal} onClose={() => setAuthModal(null)} onAuth={u => { setUser(u); setAuthModal(null); }} />}

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "12px 5vw", minHeight: 72, display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,53,128,0.08)" }}>
        <div style={{ cursor: "pointer" }} onClick={goHome}><TripDoneLogo width={130} /></div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button onClick={setShowApp} style={{ padding: "10px 26px", borderRadius: 6, background: "#003580", border: "none", color: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer", boxShadow: "0 4px 16px rgba(0,53,128,0.35)" }}>Plan my trip</button>
          <AccountDropdown {...sharedProps} />
        </div>
      </nav>

      {/* HERO + TICKER */}
      <div style={{ minHeight: "100vh", background: "#ffffff", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden", width: "100%" }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "100%", maxWidth: 900, margin: "0 auto", textAlign: "center", padding: "140px 5vw 60px" }}>
            <p style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: "#003580", marginBottom: 20, fontWeight: 500 }}>AI-Powered Travel Agent</p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(52px, 7vw, 100px)", fontWeight: 300, color: "#1a1a1a", lineHeight: 1.05, marginBottom: 28 }}>
              Your perfect trip,<br /><em style={{ color: "#003580" }}>planned for you.</em>
            </h1>
            <p style={{ fontSize: "clamp(16px, 1.5vw, 20px)", color: "#666", maxWidth: 560, margin: "0 auto 44px", lineHeight: 1.7, fontWeight: 300 }}>Tell us where you want to go and what you love. We'll handle everything else.</p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={setShowApp} style={{ padding: "16px 40px", borderRadius: 6, background: "#003580", border: "none", color: "#fff", fontSize: 16, fontWeight: 500, cursor: "pointer", boxShadow: "0 8px 32px rgba(0,53,128,0.3)" }}>Plan my trip for free →</button>
              <button onClick={() => setPage("howItWorks")} style={{ padding: "16px 40px", borderRadius: 6, background: "transparent", border: "1.5px solid #003580", color: "#003580", fontSize: 16, fontWeight: 400, cursor: "pointer" }}>See how it works</button>
            </div>
          </div>
        </div>
        {/* TICKER — pinned to bottom of hero */}
        <div style={{ background: "#003580", padding: "14px 0", overflow: "hidden" }}>
          <div style={{ display: "flex", animation: "ticker 12s linear infinite", whiteSpace: "nowrap" }}>
            {[...PLATFORMS, ...PLATFORMS].map((p, i) => (
              <span key={i} style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7ab8e8", padding: "0 16px" }}>{p} <span style={{ color: "#4a90c4", margin: "0 0 0 16px" }}>◆</span></span>
            ))}
          </div>
        </div>
      </div>

      {/* WHY */}
      <section style={{ padding: "120px 5vw", maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <p style={{ fontSize: 12, letterSpacing: "0.2em", color: "#003580", textTransform: "uppercase", marginBottom: 12 }}>Why TripDone</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(34px, 4vw, 60px)", fontWeight: 300, lineHeight: 1.2, color: "#1a1a1a", marginBottom: 28 }}>
            Travel should feel like an escape,<br /><em>not a second job.</em>
          </h2>
          <p style={{ fontSize: "clamp(15px, 1.4vw, 18px)", color: "#666", lineHeight: 1.8, maxWidth: 680, margin: "0 auto", fontWeight: 300 }}>
            Most people spend more time planning their holiday than enjoying it. TripDone changes that — ask the right questions, then build your entire trip in seconds.
          </p>
        </FadeIn>
      </section>

      {/* WHO IT'S FOR — 6 cards with photos */}
      <section style={{ padding: "0 5vw 120px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontSize: 12, letterSpacing: "0.2em", color: "#003580", textTransform: "uppercase", marginBottom: 12, textAlign: "center" }}>Who it's for</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 300, textAlign: "center", marginBottom: 52, color: "#1a1a1a" }}>Built for every kind of traveller</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {AUDIENCE_DATA.map((a, i) => (
              <div key={a.label} style={{ opacity: 0, transform: "translateY(28px)", animation: `fadeUp 0.7s ease ${i * 0.08}s forwards` }}>
                <div style={{ borderRadius: 14, overflow: "hidden", position: "relative", height: 340, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
                  <img src={a.photo} alt={a.label} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} onError={e => { e.target.style.display = "none"; }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.1) 55%)" }} />
                  <div style={{ position: "absolute", bottom: 22, left: 22, right: 22 }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, color: "#fff", marginBottom: 6 }}>{a.label}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>{a.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: "#003580", padding: "120px 5vw" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(30px, 3.5vw, 48px)", fontWeight: 300, color: "#fff", textAlign: "center", marginBottom: 72 }}>
              From idea to itinerary<br /><em style={{ color: "#7ba4db" }}>in minutes</em>
            </h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {STEPS.map((s, i) => (
              <FadeIn key={s.num} delay={i * 0.12}>
                <div style={{ padding: "36px 32px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 52, fontWeight: 300, color: "#fff", lineHeight: 1, marginBottom: 20, opacity: 0.8 }}>{s.num}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, color: "#fff", marginBottom: 12, lineHeight: 1.3 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, fontWeight: 300 }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* EXAMPLE ITINERARY — simplified, balanced 2-col grid */}
      <section style={{ padding: "120px 5vw", background: "#f8f9ff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontSize: 12, letterSpacing: "0.2em", color: "#003580", textTransform: "uppercase", marginBottom: 10, textAlign: "center" }}>See it in action</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 300, color: "#1a1a1a", textAlign: "center", marginBottom: 52 }}>A real TripDone itinerary</h2>
          </FadeIn>

          {/* Hotel card — full width */}
          <FadeIn delay={0.05}>
            <div style={{ background: "#1a1a1a", borderRadius: 14, padding: "24px 28px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#0ea5e9", fontFamily: "'DM Sans', sans-serif", marginBottom: 6 }}>📍 Tokyo & Kyoto, Japan · 7 days · Recommended stay</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "#fff" }}>{EXAMPLE.hotel.name}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>{EXAMPLE.hotel.area}</div>
              </div>
              <div style={{ background: "rgba(14,165,233,0.15)", borderRadius: 8, padding: "8px 18px", fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#0ea5e9", fontWeight: 600, whiteSpace: "nowrap" }}>{EXAMPLE.hotel.priceRange}</div>
            </div>
          </FadeIn>

          {/* Day cards — 3 column grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {EXAMPLE.days.map((day, i) => (
              <FadeIn key={day.range} delay={i * 0.1}>
                <div style={{ border: "1.5px solid #e0e6f0", borderRadius: 14, padding: "22px 24px", background: "#fff", height: "100%" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <div style={{ background: "#003580", color: "#fff", borderRadius: 8, padding: "4px 10px", fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, whiteSpace: "nowrap" }}>{day.range}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: "#1a1a1a" }}>{day.theme}</div>
                  </div>
                  {[{ icon: "☀️", val: day.morning }, { icon: "⛅", val: day.afternoon }, { icon: "🌙", val: day.evening }].map((item, j) => (
                    <div key={j} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                      <span style={{ fontSize: 13, color: "#444", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>{item.val}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 14, padding: "10px 14px", background: "#eef3ff", borderRadius: 8, borderLeft: "3px solid #003580" }}>
                    <span style={{ fontSize: 12, color: "#003580", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>✦ {day.insiderTip}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div style={{ textAlign: "center", marginTop: 52 }}>
              <button onClick={setShowApp} style={{ padding: "16px 44px", borderRadius: 6, background: "#003580", border: "none", color: "#fff", fontSize: 15, fontWeight: 500, cursor: "pointer", boxShadow: "0 8px 32px rgba(0,53,128,0.3)", fontFamily: "'DM Sans', sans-serif" }}>Build my trip like this →</button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ overflow: "hidden", margin: "0 5vw 80px", borderRadius: 20, background: "#003580" }}>
        <div style={{ padding: "100px 5vw", textAlign: "center" }}>
          <FadeIn>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 300, color: "#fff", marginBottom: 16, lineHeight: 1.1 }}>
              Your next adventure<br /><em style={{ color: "#7ba4db" }}>starts here.</em>
            </h2>
            <p style={{ fontSize: "clamp(14px, 1.4vw, 17px)", color: "rgba(255,255,255,0.6)", marginBottom: 44, fontWeight: 300 }}>Free to use. No account needed. Just tell us where you want to go.</p>
            <button onClick={setShowApp} style={{ padding: "18px 52px", borderRadius: 6, background: "#fff", border: "none", color: "#003580", fontSize: 16, fontWeight: 500, cursor: "pointer", boxShadow: "0 8px 32px rgba(255,255,255,0.2)" }}>Plan my trip for free →</button>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER — Lonely Planet style */}
      <footer style={{ background: "#0a1628", padding: "72px 5vw 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Main footer grid */}
          <div className="footer-grid" style={{ paddingBottom: 56, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>

            {/* Col 1: Brand + app + social */}
            <div>
              <TripDoneLogoDark width={110} />
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", maxWidth: 220, lineHeight: 1.7, marginTop: 14, marginBottom: 28 }}>AI-powered travel planning for busy people. Your trip, done.</p>

              {/* Travel with the app */}
              <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif", marginBottom: 12 }}>Travel with the app</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <AppStoreButton />
                  <GooglePlayButton />
                </div>
              </div>

              {/* Follow us */}
              <div>
                <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif", marginBottom: 12 }}>Follow us</div>
                <div style={{ display: "flex", gap: 14 }}>
                  {[
                    { Icon: IconInstagram, href: "https://instagram.com/tripdone.travel", label: "Instagram" },
                    { Icon: IconFacebook, href: "#", label: "Facebook" },
                    { Icon: IconYouTube, href: "#", label: "YouTube" },
                    { Icon: IconTikTok, href: "#", label: "TikTok" },
                  ].map(({ Icon, href, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                      style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s", textDecoration: "none" }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
                      onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}>
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Col 2: Top Destinations */}
            <div>
              <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif", marginBottom: 20 }}>Top Destinations</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {TOP_DESTINATIONS.map(d => (
                  <li key={d} style={{ marginBottom: 10 }}>
                    <span onClick={() => setPage("destinations")} style={{ fontSize: 13.5, color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', sans-serif", cursor: "pointer", transition: "color 0.15s" }}
                      onMouseEnter={e => e.target.style.color = "#fff"}
                      onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Type of Travel */}
            <div>
              <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif", marginBottom: 20 }}>Type of Travel</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {TRAVEL_TYPES.map(t => (
                  <li key={t} style={{ marginBottom: 10 }}>
                    <span style={{ fontSize: 13.5, color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', sans-serif", cursor: "pointer", transition: "color 0.15s" }}
                      onMouseEnter={e => e.target.style.color = "#fff"}
                      onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Contact Us */}
            <div>
              <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif", marginBottom: 20 }}>Contact Us</div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>Got a question? We'd love to hear from you.</p>
              <ContactForm />
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ padding: "24px 0 32px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>© 2026 TripDone. All rights reserved.</span>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>Built by Thomas A Pritchard</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
