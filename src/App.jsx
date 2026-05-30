import { useState, useRef, useEffect } from "react";

const IMG_THEMES = {
  hero:       { bg: "linear-gradient(135deg, #003580 0%, #0ea5e9 100%)", emoji: "✈", label: "Explore the world" },
  business:   { bg: "linear-gradient(135deg, #1a1a2e 0%, #003580 100%)", emoji: "💼", label: "Business travel" },
  family:     { bg: "linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)", emoji: "👨‍👩‍👧", label: "Family holidays" },
  couple:     { bg: "linear-gradient(135deg, #003580 0%, #7c3aed 100%)", emoji: "🥂", label: "Romantic escapes" },
  adventure:  { bg: "linear-gradient(135deg, #064e3b 0%, #059669 100%)", emoji: "🧗", label: "Adventure" },
  city:       { bg: "linear-gradient(135deg, #0f172a 0%, #003580 100%)", emoji: "🌆", label: "City breaks" },
  foodie:     { bg: "linear-gradient(135deg, #7c2d12 0%, #dc2626 100%)", emoji: "🍽", label: "Food & culture" },
  beach:      { bg: "linear-gradient(135deg, #0369a1 0%, #38bdf8 100%)", emoji: "🏖", label: "Beach holidays" },
};

function SmartImage({ keywords, style }) {
  const map = {
    "travel adventure world destination": "hero",
    "business travel professional airport": "business",
    "family beach holiday children": "family",
    "couple romantic sunset travel": "couple",
    "adventure mountain hiking explore": "adventure",
    "business professional travel": "business",
    "city skyline night travel": "city",
    "food restaurant market culture travel": "foodie",
  };
  const theme = IMG_THEMES[map[keywords]] || IMG_THEMES.hero;
  return (
    <div style={{
      ...style,
      background: theme.bg,
      overflow: "hidden",
      position: style?.position || "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    }}>
      <span style={{ fontSize: 48, filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))" }}>{theme.emoji}</span>
      <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>{theme.label}</span>
    </div>
  );
}

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

function RoamLogo({ width = 160 }) {
  const scale = width / 160;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 1 }}>
      <svg width={width * 1.1} height={28 * scale} viewBox="0 0 260 32" fill="none" style={{ display: "block", marginBottom: -14 * scale }}>
        <path d="M 50 16 C 100 8 160 10 218 20" stroke="#0ea5e9" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.55" strokeDasharray="5 4"/>
        <g transform="translate(218,20) rotate(107.6)">
          <PlaneOutline color="#0ea5e9" size={20}/>
        </g>
      </svg>
      <span style={{
        fontFamily: "'Nunito', sans-serif",
        fontWeight: 800,
        fontSize: 36 * scale,
        lineHeight: 1,
        background: "linear-gradient(135deg, #003580 0%, #0ea5e9 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        letterSpacing: "-1px",
      }}>TripDone</span>
    </div>
  );
}

function RoamLogoDark({ width = 160 }) {
  const scale = width / 160;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 1 }}>
      <svg width={width * 1.1} height={28 * scale} viewBox="0 0 260 32" fill="none" style={{ display: "block", marginBottom: -14 * scale }}>
        <path d="M 50 16 C 100 8 160 10 218 20" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.55" strokeDasharray="5 4"/>
        <g transform="translate(218,20) rotate(107.6)">
          <PlaneOutline color="white" size={20}/>
        </g>
      </svg>
      <span style={{
        fontFamily: "'Nunito', sans-serif",
        fontWeight: 800,
        fontSize: 36 * scale,
        color: "#fff",
        lineHeight: 1,
        letterSpacing: "-1px",
      }}>TripDone</span>
    </div>
  );
}

function ColosseumLogo({ size = 32, color = "#fff" }) {
  return (<svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="26" width="28" height="2" rx="1" fill={color} />
    <path d="M4 26 C4 14 8 8 16 8 C24 8 28 14 28 26" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M8 26 L8 20 Q9.5 17 11 20 L11 26" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M14 26 L14 19 Q16 16 18 19 L18 26" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M21 26 L21 20 Q22.5 17 24 20 L24 26" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M6 19 L26 19" stroke={color} strokeWidth="1" opacity="0.6"/>
    <path d="M10 19 L10 15 Q11 13.5 12 15 L12 19" stroke={color} strokeWidth="1" fill="none" opacity="0.8"/>
    <path d="M15 19 L15 14 Q16 12.5 17 14 L17 19" stroke={color} strokeWidth="1" fill="none" opacity="0.8"/>
    <path d="M20 19 L20 15 Q21 13.5 22 15 L22 19" stroke={color} strokeWidth="1" fill="none" opacity="0.8"/>
  </svg>);
}

const JAPAN_EXAMPLE = {
  destination: "Tokyo & Kyoto, Japan",
  tagline: "Ancient temples, neon nights, and perfect ramen",
  duration: "7 days",
  hotel: { name: "The Tokyo Edition, Toranomon", area: "Toranomon, Tokyo", priceRange: "£320/night" },
  alternatives: {
    budget: { hotel: "Nui. Hostel & Bar Lounge", area: "Asakusa, Tokyo", priceRange: "£55/night", note: "Stylish social hostel in Tokyo's most atmospheric neighbourhood." },
    luxury: { hotel: "Aman Tokyo", area: "Otemachi, Tokyo", priceRange: "£950/night", note: "Possibly the most serene hotel in Asia — 33 floors up, with views over the Imperial Palace Gardens." },
  },
  days: [
    { day: 1, theme: "Arrival & First Impressions", morning: "Check in and explore Shibuya — walk the famous crossing at rush hour", afternoon: "Meiji Shrine and Harajuku's Takeshita Street", evening: "Dinner at Ichiran Ramen, Shibuya — solo ramen booths, iconic Tokyo experience", transport: "Suica card for the metro — buy at Narita or Haneda on arrival", insiderTip: "The Shibuya crossing is most dramatic from the Starbucks window on the second floor — arrive 5 mins before rush hour" },
    { day: 2, theme: "Old Tokyo", morning: "Senso-ji Temple in Asakusa at 7am before the crowds arrive", afternoon: "Tokyo Skytree views then explore Nakamise shopping street", evening: "Yakitori under the train tracks at Yurakucho", transport: "Walk between Asakusa sights — everything is within 15 minutes", insiderTip: "The back streets behind Senso-ji are full of craft shops most tourists miss entirely" },
    { day: 3, theme: "Art & Modern Tokyo", morning: "teamLab Planets in Toyosu — book weeks in advance", afternoon: "Explore Shimokitazawa's vintage shops and cafés", evening: "Dinner at Narisawa — one of Asia's best restaurants, book 2 months ahead", transport: "Odakyu line to Shimokitazawa from Shinjuku", insiderTip: "teamLab is magical at opening time — arrive exactly when doors open at 9am" },
    { day: 4, theme: "Kyoto Day Trip", morning: "Shinkansen to Kyoto (2hrs 15min) — book seats the night before", afternoon: "Fushimi Inari shrine gates and Arashiyama bamboo grove", evening: "Kaiseki dinner at Kikunoi Rokuza then Shinkansen back", transport: "JR Pass or single Shinkansen tickets — either works for one day", insiderTip: "Fushimi Inari at dawn is otherworldly — catch the 6:30am train from Tokyo" },
  ],
  practicalInfo: {
    bestTransport: "Suica IC card covers all metro and local trains.",
    mustBook: "teamLab Planets (sells out weeks ahead), any omakase sushi, and Narisawa restaurant",
    packingTip: "Bring a small backpack for day trips — coin lockers at every major station are a game changer",
  },
  packingList: {
    essentials: ["Suica card (buy on arrival)", "Universal adapter (Type A)", "Portable WiFi or SIM", "Cash in Yen", "Comfortable walking shoes"],
    clothing: ["Layers for temples (covered shoulders)", "Light rain jacket", "Smart casual for dinner", "Slip-on shoes for shrines"],
    extras: ["Pocket umbrella", "Reusable tote bag", "Small notebook for menus"],
  },
};

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

function ItineraryView({ itinerary, answers }) {
  const [booked, setBooked] = useState({});
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
            {chatMessages.length === 0 && (
              <div style={{ padding: "14px 20px" }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#888", margin: 0 }}>Tell me anything you'd like to adjust — hotel, a specific day, activities, pace, budget...</p>
              </div>
            )}
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
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[{ label: "Departure date", key: "start" }, { label: "Return date", key: "end" }].map(({ label, key }) => (
            <div key={key}>
              <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", fontFamily: "'DM Sans', sans-serif", marginBottom: 6 }}>{label}</div>
              <input type="date" value={(answers.dates || {})[key] || ""} min={key === "end" ? (answers.dates?.start || "") : new Date().toISOString().split("T")[0]} onChange={e => set("dates", { ...(answers.dates || {}), [key]: e.target.value })} style={{ width: "100%", padding: "12px 14px", border: `1.5px solid ${(answers.dates || {})[key] ? "#003580" : "#e0e6f0"}`, borderRadius: 10, fontSize: 16, fontFamily: "'DM Sans', sans-serif", color: "#1a1a1a", background: "#fafbff", outline: "none", boxSizing: "border-box" }} />
            </div>
          ))}
          {answers.dates?.start && answers.dates?.end && answers.dates.end >= answers.dates.start && (
            <div style={{ background: "#eef3ff", borderRadius: 8, padding: "8px 14px", fontSize: 13, color: "#003580", fontFamily: "'DM Sans', sans-serif" }}>
              {Math.round((new Date(answers.dates.end) - new Date(answers.dates.start)) / (1000*60*60*24))} nights
            </div>
          )}
        </div>
      </div>

      <div style={sectionStyle}>
        <span style={labelStyle}>Who's coming?</span>
        <span style={hintStyle}>We'll tailor activities and find the best prices for your group</span>
        {[{ key: "adults", label: "Adults", sub: "18–64 years old", min: 0 }, { key: "children", label: "Children", sub: "0–17 years old", min: 0 }, { key: "pensioners", label: "Pensioners", sub: "65+ years old", min: 0 }].map(({ key, label, sub, min }) => {
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

function RoamApp() {
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
      setScreen("itinerary");
    } catch (err) {
      setError("Something went wrong building your itinerary. Please try again.");
      setScreen("quiz");
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9ff", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`${FONT} @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}} @keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-7px)}} @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}} *{box-sizing:border-box;margin:0;padding:0;} input,button,textarea{font-family:inherit;} ::-webkit-scrollbar{width:3px;} ::-webkit-scrollbar-thumb{background:#ddd;border-radius:2px;}`}</style>
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "32px 20px 60px" }}>
        {screen === "quiz" && <ScrollQuiz answers={answers} setAnswers={setAnswers} onSubmit={generateItinerary} error={error} />}
        {screen === "loading" && <LoadingScreen destination={answers.destination} />}
        {screen === "itinerary" && itinerary && <ItineraryView itinerary={itinerary} answers={answers} />}
      </div>
    </div>
  );
}

const STEPS = [
  { num: "01", title: "Tell us about your trip", desc: "Answer a few smart questions — destination, dates, who's coming, your pace. Takes under two minutes." },
  { num: "02", title: "We build your itinerary", desc: "Our AI crafts a complete day-by-day plan — hotel, activities, transport, and dining — tailored precisely to you." },
  { num: "03", title: "Review and refine", desc: "Browse your trip in full. Want to change anything? Just ask. We'll adjust it instantly." },
  { num: "04", title: "Book in one place", desc: "Every booking link pre-filled and ready. Flights, hotels, activities — all platforms, all in one screen." },
];

const AUDIENCES = [
  { kw: "business travel professional airport", label: "Business Travel", desc: "Seamless trips that keep you productive and comfortable — every time." },
  { kw: "family beach holiday children", label: "Family Holidays", desc: "Itineraries that work for every age. Kids, pensioners, and everyone between." },
  { kw: "couple romantic sunset travel", label: "Couples & Romance", desc: "Anniversary trips, honeymoons, weekend escapes — curated with care." },
  { kw: "adventure mountain hiking explore", label: "Adventure & Exploration", desc: "Off the beaten path, fully planned. All the thrill, none of the admin." },
];

const PLATFORMS = ["Booking.com", "Skyscanner", "GetYourGuide", "Airbnb", "Trip.com", "Viator", "TripAdvisor", "Hostelworld"];

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

export default function RoamHomepage() {
  const [showApp, setShowApp] = useState(false);

  if (showApp) {
    return (
      <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <style>{`${FONTS} *{box-sizing:border-box;margin:0;padding:0;}`}</style>
        <nav style={{ padding: "12px 40px", minHeight: 72, display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,53,128,0.08)", position: "sticky", top: 0, zIndex: 100 }}>
          <RoamLogo width={130} />
          <button onClick={() => setShowApp(false)} style={{ padding: "9px 22px", borderRadius: 6, background: "#003580", border: "none", color: "#fff", fontSize: 13.5, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 16px rgba(0,53,128,0.35)" }}>← Home</button>
        </nav>
        <RoamApp />
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#1a1a1a", background: "#ffffff", overflowX: "hidden" }}>
      <style>{`
        ${FONTS}
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }
        @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #003580; border-radius: 2px; }
      `}</style>

      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "12px 40px", minHeight: 72, display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,53,128,0.08)" }}>
        <RoamLogo width={130} />
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {["How it works", "Who it's for", "Platforms"].map(link => (
            <span key={link} style={{ fontSize: 13, fontWeight: 400, color: "#555", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>{link}</span>
          ))}
        </div>
        <button onClick={() => setShowApp(true)} style={{ padding: "9px 22px", borderRadius: 6, background: "#003580", border: "none", color: "#fff", fontSize: 13.5, fontWeight: 500, cursor: "pointer", boxShadow: "0 4px 16px rgba(0,53,128,0.35)" }}>Plan my trip</button>
      </nav>

      <div style={{ position: "relative", minHeight: "100vh", background: "#ffffff", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 24px 80px" }}>
          <p style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: "#003580", marginBottom: 20, fontWeight: 500 }}>AI-Powered Travel Agent</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(48px, 8vw, 96px)", fontWeight: 300, color: "#1a1a1a", lineHeight: 1.05, marginBottom: 24, letterSpacing: "-0.01em" }}>
            Your perfect trip,<br /><em style={{ fontStyle: "italic", color: "#003580" }}>planned for you.</em>
          </h1>
          <p style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "#666", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.7, fontWeight: 300 }}>Tell us where you want to go and what you love. We'll handle everything else.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setShowApp(true)} style={{ padding: "15px 36px", borderRadius: 6, background: "#003580", border: "none", color: "#fff", fontSize: 15, fontWeight: 500, cursor: "pointer", boxShadow: "0 8px 32px rgba(0,53,128,0.3)" }}>Plan my trip for free →</button>
            <button style={{ padding: "15px 36px", borderRadius: 6, background: "transparent", border: "1.5px solid #003580", color: "#003580", fontSize: 15, fontWeight: 400, cursor: "pointer" }}>See how it works</button>
          </div>
        </div>
      </div>

      <div style={{ background: "#003580", padding: "14px 0", overflow: "hidden" }}>
        <div style={{ display: "flex", animation: "ticker 12s linear infinite", whiteSpace: "nowrap" }}>
          {[...PLATFORMS, ...PLATFORMS].map((p, i) => (
            <span key={i} style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7ab8e8", padding: "0 16px" }}>{p} <span style={{ color: "#4a90c4", margin: "0 0 0 16px" }}>◆</span></span>
          ))}
        </div>
      </div>

      <section style={{ padding: "100px 40px", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <p style={{ fontSize: 12, letterSpacing: "0.2em", color: "#003580", textTransform: "uppercase", marginBottom: 12 }}>Why TripDone</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 300, lineHeight: 1.2, color: "#1a1a1a", marginBottom: 28 }}>
            Travel should feel like an escape,<br /><em>not a second job.</em>
          </h2>
          <p style={{ fontSize: 17, color: "#666", lineHeight: 1.8, maxWidth: 640, margin: "0 auto 24px", fontWeight: 300 }}>
            Most people spend more time planning their holiday than enjoying it. TripDone changes that. We ask the right questions, then build your entire trip — every hotel, every day, every booking.
          </p>
        </FadeIn>
      </section>

      <section style={{ padding: "0 40px 100px", maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <p style={{ fontSize: 12, letterSpacing: "0.2em", color: "#003580", textTransform: "uppercase", marginBottom: 12, textAlign: "center" }}>Who it's for</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, textAlign: "center", marginBottom: 52, color: "#1a1a1a" }}>Built for every kind of traveller</h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {AUDIENCES.map((a, i) => (
            <div key={a.label} style={{ opacity: 0, transform: "translateY(28px)", animation: `fadeUp 0.7s ease ${i * 0.1}s forwards` }}>
              <div style={{ borderRadius: 14, overflow: "hidden", position: "relative", height: 340, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
                <SmartImage keywords={a.kw} style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.05) 55%)" }} />
                <div style={{ position: "absolute", bottom: 22, left: 22, right: 22 }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, color: "#fff", marginBottom: 6 }}>{a.label}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>{a.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "#003580", padding: "100px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: "#fff", textAlign: "center", marginBottom: 64 }}>
              From idea to itinerary<br /><em style={{ color: "#7ba4db" }}>in minutes</em>
            </h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32 }}>
            {STEPS.map((s, i) => (
              <FadeIn key={s.num} delay={i * 0.12}>
                <div style={{ padding: "32px 28px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 300, color: "#ffffff", lineHeight: 1, marginBottom: 20, opacity: 0.8 }}>{s.num}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, color: "#fff", marginBottom: 12, lineHeight: 1.3 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, fontWeight: 300 }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "100px 40px", background: "#f8f9ff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: "#1a1a1a", textAlign: "center", marginBottom: 48 }}>A real TripDone itinerary</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 24, alignItems: "start" }}>
            <div>
              <FadeIn delay={0.1}>
                <div style={{ background: "#1a1a1a", borderRadius: 14, padding: "22px 20px", marginBottom: 16 }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#0ea5e9", fontFamily: "'DM Sans', sans-serif", marginBottom: 10 }}>Recommended stay</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "#fff", marginBottom: 4 }}>{JAPAN_EXAMPLE.hotel.name}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>{JAPAN_EXAMPLE.hotel.area}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: "#0ea5e9" }}>{JAPAN_EXAMPLE.hotel.priceRange}</div>
                </div>
              </FadeIn>
            </div>
            <div>
              {JAPAN_EXAMPLE.days.slice(0, 3).map((day, i) => (
                <FadeIn key={day.day} delay={i * 0.08}>
                  <div style={{ border: "1.5px solid #e0e6f0", borderRadius: 12, padding: "16px 18px", marginBottom: 10, background: "#fff" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#003580", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, flexShrink: 0 }}>{day.day}</div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "#1a1a1a" }}>{day.theme}</div>
                    </div>
                    {[{ icon: "☀", val: day.morning }, { icon: "⛅", val: day.afternoon }, { icon: "🌙", val: day.evening }].map((item, j) => (
                      <div key={j} style={{ display: "flex", gap: 8, marginBottom: 5 }}>
                        <span style={{ fontSize: 12, flexShrink: 0 }}>{item.icon}</span>
                        <span style={{ fontSize: 12.5, color: "#555", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.4 }}>{item.val}</span>
                      </div>
                    ))}
                    <div style={{ marginTop: 8, padding: "8px 12px", background: "#eef3ff", borderRadius: 8, borderLeft: "3px solid #003580" }}>
                      <span style={{ fontSize: 11, color: "#003580", fontFamily: "'DM Sans', sans-serif" }}>✦ {day.insiderTip}</span>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
          <FadeIn delay={0.3}>
            <div style={{ textAlign: "center", marginTop: 52 }}>
              <button onClick={() => setShowApp(true)} style={{ padding: "15px 40px", borderRadius: 6, background: "#003580", border: "none", color: "#fff", fontSize: 15, fontWeight: 500, cursor: "pointer", boxShadow: "0 8px 32px rgba(0,53,128,0.3)", fontFamily: "'DM Sans', sans-serif" }}>Build my trip like this →</button>
            </div>
          </FadeIn>
        </div>
      </section>

      <section style={{ position: "relative", overflow: "hidden", margin: "0 40px 80px", borderRadius: 20, background: "#003580" }}>
        <div style={{ position: "relative", padding: "80px 40px", textAlign: "center" }}>
          <FadeIn>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 300, color: "#fff", marginBottom: 16, lineHeight: 1.1 }}>
              Your next adventure<br /><em style={{ color: "#7ba4db" }}>starts here.</em>
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", marginBottom: 40, fontWeight: 300 }}>Free to use. No account needed. Just tell us where you want to go.</p>
            <button onClick={() => setShowApp(true)} style={{ padding: "16px 44px", borderRadius: 6, background: "#fff", border: "none", color: "#003580", fontSize: 16, fontWeight: 500, cursor: "pointer", boxShadow: "0 8px 32px rgba(255,255,255,0.2)" }}>Plan my trip for free →</button>
          </FadeIn>
        </div>
      </section>

      <footer style={{ background: "#003580", padding: "48px 40px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32, marginBottom: 40 }}>
            <div>
              <RoamLogoDark width={110} />
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", maxWidth: 240, lineHeight: 1.6, marginTop: 12 }}>AI-powered travel planning for busy people. Your trip, done.</p>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>© 2026 TripDone. All rights reserved.</span>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>Built by Thomas A Pritchard</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
