import { useState, useRef, useEffect } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@800&family=DM+Sans:wght@300;400;500&display=swap');`;

const AUDIENCE_DATA = [
  { label: "Business Travel", desc: "Seamless trips that keep you productive and comfortable — every time.", photo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80" },
  { label: "Family Holidays", desc: "Itineraries that work for every age. Kids, pensioners, and everyone between.", photo: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=600&q=80" },
  { label: "Couples & Romance", desc: "Anniversary trips, honeymoons, weekend escapes — curated with care.", photo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80" },
  { label: "Adventure & Exploration", desc: "Off the beaten path, fully planned. All the thrill, none of the admin.", photo: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80" },
  { label: "Education", desc: "Language schools, study trips, and learning experiences around the world.", photo: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80" },
  { label: "Culture", desc: "Museums, local traditions, historic sites — travel that broadens the mind.", photo: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80" },
];

const TOP_DESTINATIONS = ["Tokyo, Japan","Amalfi Coast, Italy","Bali, Indonesia","New York, USA","Paris, France","Sydney, Australia","Bangkok, Thailand","Barcelona, Spain","Queenstown, NZ","Santorini, Greece","Dubai, UAE","Cape Town, South Africa"];
const TRAVEL_TYPES = ["Business Travel","Family Holidays","Couples & Romance","Adventure & Exploration","Education","Culture","Beach & Relaxation","Food & Culture","City Breaks","Wellness & Spa"];
const PLATFORMS = ["Booking.com","Skyscanner","GetYourGuide","Airbnb","Trip.com","Viator","TripAdvisor","Hostelworld"];

const STEPS = [
  { num: "01", title: "Tell us about your trip", desc: "Answer a few smart questions — destination, dates, who's coming, your pace. Takes under two minutes." },
  { num: "02", title: "We build your itinerary", desc: "Our AI crafts a complete day-by-day plan — hotel, activities, transport, and dining — tailored precisely to you." },
  { num: "03", title: "Review and refine", desc: "Browse your trip in full. Want to change anything? Just ask. We'll adjust it instantly." },
  { num: "04", title: "Book in one place", desc: "Every booking link pre-filled and ready. Flights, hotels, activities — all platforms, all in one screen." },
];

const EXAMPLE = {
  destination: "Japan — Tokyo, Kyoto & Osaka",
  duration: "9 days",
  locations: [
    { location: "Tokyo", nights: 3, hotel: { name: "Wise Owl Hostel Shinjuku", area: "Shinjuku, Tokyo", priceRange: "£32/night" } },
    { location: "Kyoto", nights: 3, hotel: { name: "Piece Hostel Sanjo", area: "Sanjo, Kyoto", priceRange: "£28/night" } },
    { location: "Osaka", nights: 3, hotel: { name: "Hana Hostel Osaka", area: "Namba, Osaka", priceRange: "£26/night" } },
  ],
  days: [
    { day: 1, location: "Tokyo", theme: "Arrival & Shibuya", isTravel: false, checkin: "Check in to Wise Owl Hostel, Shinjuku", morning: "Land at Narita, take Narita Express to Shinjuku (1h 30min)", afternoon: "Settle in, explore Shibuya Crossing at rush hour", evening: "Ichiran Ramen — solo booths, iconic first dinner", transport: "Tokyo Metro day pass — covers all major lines", insiderTip: "Watch the crossing from the 2nd-floor Starbucks — arrive 5 mins before the hour" },
    { day: 2, location: "Tokyo", theme: "Old Tokyo & Temples", isTravel: false, morning: "Senso-ji Temple, Asakusa — arrive before 8am to beat the crowds", afternoon: "teamLab Planets in Toyosu — book online in advance", evening: "Yakitori under the train tracks at Yurakucho", transport: "Tokyo Metro — Ginza line to Asakusa, Yurakucho line back", insiderTip: "The back lanes behind Senso-ji have craft shops most tourists walk straight past" },
    { day: 4, location: "Kyoto", theme: "Tokyo → Kyoto", isTravel: true, travelFrom: "Tokyo", travelTo: "Kyoto", travelMethod: "Shinkansen (Nozomi)", travelDuration: "2h 15min", morning: "Early Shinkansen from Tokyo Station — seats book up, reserve in advance", checkin: "Check in to Piece Hostel Sanjo, Kyoto", afternoon: "Fushimi Inari shrine gates — climb beyond the tourist crowds to the top", evening: "Dinner in Gion — try obanzai (Kyoto-style small plates)", transport: "JR Pass covers the Shinkansen. Local buses cover Kyoto city (¥230 flat fare)", insiderTip: "Fushimi Inari at dusk is even better than dawn — most people leave by midday" },
    { day: 7, location: "Osaka", theme: "Kyoto → Osaka", isTravel: true, travelFrom: "Kyoto", travelTo: "Osaka", travelMethod: "JR Shinkaisoku train", travelDuration: "18min", morning: "Quick hop to Osaka — one of the easiest moves of the trip", checkin: "Check in to Hana Hostel, Namba", afternoon: "Dotonbori — takoyaki, okonomiyaki and neon signage chaos", evening: "Izakaya crawl in Shinsaibashi — order everything", transport: "Osaka Metro day pass (¥800) — covers all underground lines", insiderTip: "Osaka people will tell you about their favourite street food spot unprompted — ask them" },
  ],
};

const BLOG_POSTS = [
  { slug: "tripdone-is-live", date: "30 May 2026", author: "Thomas Pritchard", category: "App Launch", title: "TripDone Is Live", subtitle: "It's been a journey. But it's here.", photo: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80", body: `Today, TripDone went live.\n\nI'm not going to pretend it was smooth. Building an app from scratch — with no traditional coding background, learning as I went, breaking things and fixing them, then breaking them again — is genuinely one of the hardest things I've done. There were moments where nothing worked and I had no idea why. Moments where a fix I made at 11pm somehow created three new problems by morning. Moments where I questioned whether this was actually going to come together.\n\nBut it did.\n\nThe site is live at tripdone.travel. You can plan a full trip — destination, dates, who's coming, your budget, your interests — and get a real, detailed, day-by-day itinerary in under two minutes. Hotels, activities, transport, insider tips. All in one place.\n\nIs it perfect? No. There's plenty still to build — real booking integrations, a proper mobile app, more personalisation, smarter recommendations. But the core works. The idea works. And that's what matters right now.\n\nIf you've ever spent a weekend buried in browser tabs trying to plan a holiday instead of actually looking forward to it — TripDone is for you.\n\nGo plan something. ✈` },
  { slug: "first-app-development", date: "14 May 2026", author: "Thomas Pritchard", category: "Behind the Build", title: "First App Development", subtitle: "Why I built TripDone — and what I hope it does for you.", photo: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=80", body: `I've always loved travel. The feeling of landing somewhere new, the smell of a different city, the moment you realise you have absolutely no idea where you are — and that that's completely fine.\n\nBut it was in Sri Lanka where the idea for TripDone really took shape.\n\nI was sitting at a guesthouse in the hill country when I got talking to a couple at the table next to me. They were stressed. Not about anything that had gone wrong on their trip — but about planning it. Seventeen tabs open on a laptop. Conflicting advice from three different blogs. A spreadsheet of hotels that all looked the same. They were spending their evening in paradise staring at a screen, trying to work out logistics.\n\nI'd seen it before — in myself, in friends, in countless travellers. Planning a trip can feel like a second job. A stressful one, at that.\n\nThat's why I built TripDone.\n\nThe idea is simple: you tell us where you want to go, what you love, and how you like to travel. We handle everything else. In minutes, you have a full itinerary — real hotels, real places, real insider tips — tailored specifically to you. Not a template. Not a generic list. Your trip.\n\nI built it because I wanted something that felt like having a knowledgeable friend in every city. Someone who's already been, already knows the best spots, and can just tell you exactly what to do without the fluff. And one that brings together all your favourite booking platforms in one clean place — so you're not jumping between ten different tabs just to confirm a flight.\n\nIt's early days. There's plenty still to build. But the core is here — and if it saves even one person from spending their Sunday afternoon buried in browser tabs instead of actually looking forward to their holiday, then it was worth it.\n\nHere's to better trips. ✈` },
];

const FAQS = [
  { q: "Is TripDone really free?", a: "Yes — completely. TripDone is free to use, forever. We earn a small commission when you book through our partner links, at no extra cost to you. You'd pay exactly the same price booking directly." },
  { q: "How does the AI build my itinerary?", a: "You answer a short set of questions about your destination, dates, budget, travel style and interests. Our AI then builds a full day-by-day itinerary with real hotel recommendations, activities, transport tips and insider knowledge — tailored specifically to you." },
  { q: "Can I change my itinerary after it's been generated?", a: "Absolutely. Once your itinerary is ready, you can use the chat box at the bottom to ask for any changes — swap a hotel, add a rest day, change the pace, find a different restaurant. It adjusts instantly." },
  { q: "Do I need to create an account?", a: "No account needed to plan a trip. Create an account if you'd like to save your itineraries and track your bookings in one place." },
  { q: "Which booking platforms does TripDone work with?", a: "We currently work with Booking.com, Skyscanner, GetYourGuide, Airbnb, Trip.com, Viator, TripAdvisor and Hostelworld — with more being added regularly." },
  { q: "How do I save money with TripDone?", a: "TripDone searches across multiple platforms to surface the best value options for your budget. Because we work with all the major booking sites at once, you don't have to spend hours comparing prices yourself — we do it for you." },
  { q: "Is my data safe?", a: "Your privacy matters to us. We don't sell your data to third parties, and we only use the information you provide to build and improve your travel experience." },
  { q: "I found a bug or something isn't working. What do I do?", a: "We're sorry about that! Please drop us a message using the contact form below and we'll get it sorted as quickly as possible." },
];

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

const TESTIMONIALS = [
  { name: "Sarah M.", initials: "SM", location: "London", text: "I planned our entire Amalfi Coast honeymoon in under 10 minutes. Every single recommendation was spot on. Our travel agent of 20 years couldn't have done better.", trip: "Amalfi Coast, 7 days" },
  { name: "James T.", initials: "JT", location: "Manchester", text: "Used TripDone for a solo Japan trip. The insider tips alone saved me hours — I'd never have found half those places on my own. Absolutely brilliant.", trip: "Japan, 14 days" },
  { name: "Priya K.", initials: "PK", location: "Singapore", text: "Family trips with young kids are notoriously hard to plan. TripDone got it perfect — the right pace, the right activities, even the right hotel for a family of four.", trip: "Bali, 10 days" },
  { name: "Marcus R.", initials: "MR", location: "Sydney", text: "The chat refinement feature is a game changer. I asked it to swap a museum day for something outdoors and it restructured the whole itinerary in seconds.", trip: "Barcelona, 5 days" },
];

// ─── Utilities ────────────────────────────────────────────────────────────────
function PlaneOutline({ color = "#0ea5e9", size = 28 }) {
  const s = size / 40;
  return (
    <g>
      <path d={`M 0 ${-18*s} L ${3.5*s} ${-10*s} L ${4*s} ${8*s} L ${2.5*s} ${14*s} L 0 ${12*s} L ${-2.5*s} ${14*s} L ${-4*s} ${8*s} L ${-3.5*s} ${-10*s} Z`} fill={color} stroke="none"/>
      <path d={`M ${3*s} ${-2*s} L ${22*s} ${10*s} L ${20*s} ${14*s} L ${4*s} ${8*s} Z`} fill={color} stroke="none"/>
      <path d={`M ${-3*s} ${-2*s} L ${-22*s} ${10*s} L ${-20*s} ${14*s} L ${-4*s} ${8*s} Z`} fill={color} stroke="none"/>
      <path d={`M ${2.5*s} ${12*s} L ${9*s} ${18*s} L ${8*s} ${20*s} L ${2.5*s} ${16*s} Z`} fill={color} stroke="none"/>
      <path d={`M ${-2.5*s} ${12*s} L ${-9*s} ${18*s} L ${-8*s} ${20*s} L ${-2.5*s} ${16*s} Z`} fill={color} stroke="none"/>
    </g>
  );
}

function TripDoneLogo() {
  return <img src="/logo.png" alt="TripDone" style={{ height: 70, width: "auto", flexShrink: 0, display: "block" }}/>;
}

function TripDoneLogoDark() {
  return <img src="/logo.png" alt="TripDone" style={{ height: 70, width: "auto", flexShrink: 0, display: "block", filter: "brightness(0) invert(1)" }}/>;
}

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

// ─── Social Icons ─────────────────────────────────────────────────────────────
function IconInstagram({ size = 22, color = "#fff" }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.5" cy="6.5" r="1" fill={color} stroke="none"/></svg>; }
function IconFacebook({ size = 22, color = "#fff" }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>; }
function IconYouTube({ size = 22, color = "#fff" }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#003580"/></svg>; }
function IconTikTok({ size = 22, color = "#fff" }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z"/></svg>; }

function AppStoreButton() {
  return (
    <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#000", color: "#fff", borderRadius: 10, padding: "10px 18px", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.15)", minWidth: 150 }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
      <div><div style={{ fontSize: 9, opacity: 0.7, letterSpacing: "0.05em" }}>Download on the</div><div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.2 }}>App Store</div></div>
    </a>
  );
}

function GooglePlayButton() {
  return (
    <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#000", color: "#fff", borderRadius: 10, padding: "10px 18px", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.15)", minWidth: 150 }}>
      <svg width="22" height="22" viewBox="0 0 24 24"><path d="M3.18 23.76c.3.17.65.19.97.07L14.81 12 3.15.17C2.83.05 2.47.08 2.18.25 1.6.6 1.25 1.22 1.25 1.9v20.2c0 .68.35 1.3.93 1.66z" fill="#4CAF50"/><path d="M20.73 10.03l-3.04-1.74L14.81 12l2.88 2.71 3.04-1.74c.87-.5.87-1.75 0-2.94z" fill="#FFD600"/><path d="M3.18.24L14.81 12 17.69 9.29 4.15.18A1.5 1.5 0 0 0 3.18.24z" fill="#FF3D00"/><path d="M3.18 23.76A1.5 1.5 0 0 0 4.15 23.82l13.54-9.11L14.81 12 3.18 23.76z" fill="#3BAFDA"/></svg>
      <div><div style={{ fontSize: 9, opacity: 0.7, letterSpacing: "0.05em" }}>GET IT ON</div><div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.2 }}>Google Play</div></div>
    </a>
  );
}

// ─── API ──────────────────────────────────────────────────────────────────────
const ITINERARY_SYSTEM = `You are TripDone, a premium AI travel planner. Given a traveller's preferences, generate a detailed day-by-day itinerary as JSON.
Return ONLY valid JSON, no markdown, no explanation. Format:
{
  "destination": "string",
  "tagline": "short evocative description (max 10 words)",
  "duration": "e.g. 14 days",
  "locations": [
    {
      "location": "e.g. Tokyo",
      "nights": 2,
      "hotel": { "name": "string", "area": "string", "description": "1 sentence", "priceRange": "e.g. £75/night", "bookingUrl": "https://www.booking.com/hotel/..." },
      "alternatives": {
        "budget": { "hotel": "name", "area": "area", "priceRange": "e.g. £18/night", "note": "1 sentence", "bookingUrl": "https://www.hostelworld.com/..." },
        "luxury": { "hotel": "name", "area": "area", "priceRange": "e.g. £220/night", "note": "1 sentence", "bookingUrl": "https://www.booking.com/hotel/..." }
      }
    }
  ],
  "days": [{
    "day": 1,
    "location": "e.g. Tokyo",
    "theme": "string",
    "isTravel": false,
    "travelFrom": null,
    "travelTo": null,
    "travelMethod": null,
    "travelDuration": null,
    "morning": "string",
    "afternoon": "string",
    "evening": "string",
    "transport": "string",
    "insiderTip": "string",
    "bookables": [
      { "name": "string", "type": "activity|hostel|hotel|transport", "platform": "GetYourGuide|Booking.com|Hostelworld|Viator", "price": "e.g. £25/person", "url": "https://..." }
    ]
  }],
  "practicalInfo": { "bestTransport": "string", "mustBook": "string", "packingTip": "string" },
  "packingList": { "essentials": ["item1","item2"], "clothing": ["item1","item2"], "extras": ["item1","item2"] },
  "helpfulLinks": [
    { "title": "string", "desc": "1 short sentence", "url": "https://...", "source": "e.g. Lonely Planet" }
  ]
}

BOOKABLES RULES — follow these exactly:
- Include 2-4 bookable items per day covering the main activities mentioned.
- For activities: link to GetYourGuide or Viator search for that specific activity e.g. https://www.getyourguide.com/s/?q=TeamLab+Planets+Tokyo&partner_id=5566445
- For hostels: link to Hostelworld search e.g. https://www.hostelworld.com/search?search_keywords=Wise+Owl+Hostel+Tokyo
- For hotels: link to Booking.com search for that specific property e.g. https://www.booking.com/searchresults.html?ss=Park+Hyatt+Tokyo&aid=4297311
- For transport (Shinkansen etc): link to relevant booking site
- Only include bookables for activities explicitly mentioned in that day's morning/afternoon/evening.
- On travel days, include a bookable for the transport (train/bus/ferry booking).
- price should be approximate per person where possible.

MOVEMENT & LOCATION RULES — follow these exactly:
- Use the "Movement frequency" value to determine how many nights to spend in each location.
- every_day = 1 night per location. every_2_days = 2 nights. every_3_days = 3 nights. every_4_days = 4 nights. every_5_days = 5 nights. stay_put = entire trip in one location.
- Calculate the number of locations from trip duration divided by nights per location.
- Day trips from a base city do NOT count as a new location.
- For travel days: set "isTravel": true, fill travelFrom, travelTo, travelMethod, travelDuration. Still fill afternoon and evening.
- Each location in "locations" array must have its own hotel recommendation.

HOTEL TIER RULES — follow these exactly:
- "hotel" (recommended): Real, highly-rated hotel £50-£100/night. Specific real name required.
- "alternatives.budget": Best-reviewed hostel in that location. Must be a hostel. Under £30/night dorm. Specific real name required.
- "alternatives.luxury": Real 5-star hotel £150+/night. Specific real name required.

HELPFUL LINKS RULES:
- Include 5-7 editorial articles only — NO booking sites.
- Sources: Lonely Planet, Culture Trip, Time Out, BBC Travel, National Geographic, Guardian Travel, Condé Nast.

Generate the correct number of days based on trip dates. Be specific with real place names. Make it feel curated, not generic.`;

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

// ─── Calendar Picker ──────────────────────────────────────────────────────────
function CalendarPicker({ label, value, onChange, minDate }) {
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(() => value ? parseInt(value.split("-")[0]) : new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(() => value ? parseInt(value.split("-")[1]) - 1 : new Date().getMonth());
  const ref = useRef();
  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const today = new Date(); today.setHours(0,0,0,0);
  const min = minDate ? new Date(minDate) : today;
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const selectDay = d => { const mo = String(viewMonth+1).padStart(2,"0"), dy = String(d).padStart(2,"0"); onChange(`${viewYear}-${mo}-${dy}`); setOpen(false); };
  const prevMonth = () => { if (viewMonth===0){setViewMonth(11);setViewYear(y=>y-1);}else setViewMonth(m=>m-1); };
  const nextMonth = () => { if (viewMonth===11){setViewMonth(0);setViewYear(y=>y+1);}else setViewMonth(m=>m+1); };
  const formatDisplay = v => { if (!v) return null; const [yr,mo,dy]=v.split("-"); return `${dy} ${MONTHS[parseInt(mo)-1]} ${yr}`; };
  const isDisabled = d => new Date(viewYear,viewMonth,d) < min;
  const isSelected = d => { if (!value) return false; const [yr,mo,dy]=value.split("-"); return parseInt(yr)===viewYear && parseInt(mo)-1===viewMonth && parseInt(dy)===d; };
  const isToday = d => { const t=new Date(); return d===t.getDate()&&viewMonth===t.getMonth()&&viewYear===t.getFullYear(); };
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button type="button" onClick={() => setOpen(!open)} style={{ width: "100%", padding: "13px 16px", border: `1.5px solid ${value ? "#003580" : "#e0e6f0"}`, borderRadius: 10, fontSize: 15, fontFamily: "'DM Sans', sans-serif", color: value ? "#1a1a1a" : "#aaa", background: value ? "#fff" : "#fafbff", cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>{value ? formatDisplay(value) : `Select ${label.toLowerCase()}`}</span>
        <span style={{ fontSize: 12, color: "#aaa" }}>📅</span>
      </button>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, zIndex: 999, background: "#fff", borderRadius: 14, boxShadow: "0 8px 40px rgba(0,53,128,0.15)", border: "1.5px solid #e0e6f0", padding: "16px", width: 300 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <button onClick={prevMonth} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#003580", padding: "4px 8px" }}>‹</button>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: "#1a1a1a" }}>{MONTHS[viewMonth]} {viewYear}</span>
            <button onClick={nextMonth} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#003580", padding: "4px 8px" }}>›</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 6 }}>
            {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => <div key={d} style={{ textAlign: "center", fontSize: 11, color: "#aaa", fontFamily: "'DM Sans', sans-serif", padding: "4px 0" }}>{d}</div>)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
            {Array.from({length: firstDay}).map((_,i) => <div key={`e${i}`}/>)}
            {Array.from({length: daysInMonth}, (_,i) => i+1).map(d => {
              const disabled=isDisabled(d), selected=isSelected(d), todayD=isToday(d);
              return (
                <button key={d} onClick={() => !disabled && selectDay(d)} style={{ padding: "7px 0", borderRadius: 8, border: todayD&&!selected ? "1.5px solid #0ea5e9" : "none", background: selected ? "#003580" : "transparent", color: selected ? "#fff" : disabled ? "#ddd" : "#1a1a1a", fontFamily: "'DM Sans', sans-serif", fontSize: 13, cursor: disabled ? "not-allowed" : "pointer", fontWeight: selected ? 600 : 400 }}
                  onMouseEnter={e => { if (!disabled && !selected) e.target.style.background = "#eef3ff"; }}
                  onMouseLeave={e => { if (!selected) e.target.style.background = "transparent"; }}>
                  {d}
                </button>
              );
            })}
          </div>
          {value && <button onClick={() => { onChange(""); setOpen(false); }} style={{ marginTop: 12, width: "100%", padding: "8px", borderRadius: 8, border: "1px solid #e0e6f0", background: "none", color: "#aaa", fontSize: 12, cursor: "pointer" }}>Clear date</button>}
        </div>
      )}
    </div>
  );
}

function DatePicker({ answers, setAnswers }) {
  const depVal = (answers.dates || {}).start || "";
  const retVal = (answers.dates || {}).end || "";
  const setDep = v => setAnswers(p => ({ ...p, dates: { ...(p.dates || {}), start: v } }));
  const setRet = v => setAnswers(p => ({ ...p, dates: { ...(p.dates || {}), end: v } }));
  const nights = depVal && retVal && retVal >= depVal ? Math.round((new Date(retVal) - new Date(depVal)) / 86400000) : null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div>
        <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", fontFamily: "'DM Sans', sans-serif", marginBottom: 8 }}>Departure date</div>
        <CalendarPicker label="Departure date" value={depVal} onChange={setDep}/>
      </div>
      <div>
        <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", fontFamily: "'DM Sans', sans-serif", marginBottom: 8 }}>Return date</div>
        <CalendarPicker label="Return date" value={retVal} onChange={setRet} minDate={depVal || undefined}/>
      </div>
      {nights && <div style={{ background: "#eef3ff", borderRadius: 8, padding: "8px 14px", fontSize: 13, color: "#003580", fontFamily: "'DM Sans', sans-serif" }}>✓ {nights} nights</div>}
    </div>
  );
}

// ─── Loading Screen ───────────────────────────────────────────────────────────
function LoadingScreen({ destination }) {
  const steps = ["Researching " + (destination || "your destination") + "...", "Curating the best hotels...", "Designing your itinerary...", "Adding insider touches..."];
  const [stepIdx, setStepIdx] = useState(0);
  useEffect(() => { const t = setInterval(() => setStepIdx(i => Math.min(i+1, steps.length-1)), 1800); return () => clearInterval(t); }, []);
  return (
    <div style={{ textAlign: "center", padding: "60px 0" }}>
      <div style={{ fontSize: 40, marginBottom: 24, animation: "spin 3s linear infinite", display: "inline-block" }}>◎</div>
      <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 24, fontWeight: 400, color: "#1a1a1a", marginBottom: 12 }}>Building your trip</h2>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#003580", minHeight: 20 }}>{steps[stepIdx]}</p>
      <div style={{ marginTop: 32, display: "flex", gap: 6, justifyContent: "center" }}>
        {[0,1,2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#003580", animation: "bounce 1.2s infinite", animationDelay: `${i * 0.2}s` }}/>)}
      </div>
    </div>
  );
}

// ─── Day Card ─────────────────────────────────────────────────────────────────
function DayCard({ day, index, locations = [] }) {
  const [open, setOpen] = useState(index === 0);
  const [accomTier, setAccomTier] = useState("recommended");
  const isTravel = day.isTravel;

  // Find if this is a check-in night for a new location
  const loc = locations.find(l => l.location === day.location);
  const isCheckIn = loc && (index === 0 || (locations.length > 0 && day.location !== undefined));
  
  // Find previous day's location to detect actual check-in
  const tiers = loc ? {
    budget: loc.alternatives?.budget,
    recommended: loc.hotel,
    luxury: loc.alternatives?.luxury,
  } : null;
  const currentAccom = tiers ? (tiers[accomTier] || tiers.recommended) : null;
  const showAccom = (day.checkin || isTravel) && currentAccom;
  return (
    <div style={{ border: `1.5px solid ${isTravel ? "#fde8cc" : "#e8e2d9"}`, borderRadius: 14, overflow: "hidden", marginBottom: 12, background: isTravel ? "#fffaf5" : "#fdfbf8", boxShadow: open ? "0 4px 20px rgba(0,0,0,0.06)" : "none", transition: "box-shadow 0.2s" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: isTravel ? "#f59e0b" : "#003580", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 500, flexShrink: 0 }}>{day.day}</div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, color: "#1a1a1a" }}>Day {day.day}</div>
              {isTravel && <span style={{ fontSize: 10, background: "#f59e0b", color: "#fff", borderRadius: 4, padding: "2px 6px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.05em" }}>TRAVEL DAY</span>}
              {day.location && <span style={{ fontSize: 11, color: "#003580", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>📍 {day.location}</span>}
            </div>
            <div style={{ fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: "#888" }}>{day.theme}</div>
          </div>
        </div>
        <span style={{ color: "#003580", fontSize: 18, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none" }}>⌄</span>
      </button>
      {open && (
        <div style={{ padding: "0 20px 20px" }}>
          <div style={{ height: 1, background: isTravel ? "#fde8cc" : "#e8e2d9", marginBottom: 16 }}/>
          {isTravel && day.travelFrom && (
            <div style={{ background: "#eef3ff", borderRadius: 10, padding: "12px 14px", marginBottom: 16, border: "1.5px solid #c7d9f5", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ fontSize: 22 }}>🚄</div>
              <div>
                <div style={{ fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: "#003580" }}>{day.travelFrom} → {day.travelTo}</div>
                <div style={{ fontSize: 12.5, fontFamily: "'DM Sans', sans-serif", color: "#4a72b0" }}>{day.travelMethod} · {day.travelDuration}</div>
              </div>
            </div>
          )}
          {/* Inline accommodation on check-in nights */}
          {showAccom && (
            <div style={{ background: "#f8f9ff", borderRadius: 10, padding: "14px 16px", marginBottom: 16, border: "1.5px solid #e0e6f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#003580", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>🏨 Tonight's stay</div>
                <div style={{ display: "flex", gap: 4 }}>
                  {["budget", "recommended", "luxury"].map(t => (
                    tiers[t] && <button key={t} onClick={e => { e.stopPropagation(); setAccomTier(t); }} style={{ padding: "3px 10px", borderRadius: 20, border: `1.5px solid ${accomTier === t ? "#003580" : "#e0e6f0"}`, background: accomTier === t ? "#003580" : "transparent", color: accomTier === t ? "#fff" : "#888", fontSize: 10, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                      {t === "budget" ? "Hostel" : t === "recommended" ? "Hotel" : "Luxury"}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", fontFamily: "'DM Sans', sans-serif", marginBottom: 2 }}>{currentAccom.name || currentAccom.hotel}</div>
                  <div style={{ fontSize: 12, color: "#888", fontFamily: "'DM Sans', sans-serif", marginBottom: 4 }}>{currentAccom.area}</div>
                  <div style={{ fontSize: 12.5, color: "#555", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.4 }}>{currentAccom.description || currentAccom.note}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, marginLeft: 12, flexShrink: 0 }}>
                  <div style={{ background: "#eef3ff", borderRadius: 6, padding: "4px 10px", fontSize: 12, color: "#003580", fontWeight: 600, fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>{currentAccom.priceRange}</div>
                  <a href={currentAccom.bookingUrl || `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(currentAccom.name || currentAccom.hotel)}&aid=4297311`} target="_blank" rel="noopener noreferrer" style={{ background: "#003580", color: "#fff", borderRadius: 6, padding: "5px 12px", fontSize: 11.5, fontWeight: 500, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>Book →</a>
                </div>
              </div>
            </div>
          )}
          {[{ label: "Morning", icon: "☀", value: day.morning }, { label: "Afternoon", icon: "⛅", value: day.afternoon }, { label: "Evening", icon: "🌙", value: day.evening }, { label: "Getting around", icon: "🚌", value: day.transport }].filter(i => i.value).map(item => (
            <div key={item.label} style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", fontFamily: "'DM Sans', sans-serif", marginBottom: 3 }}>{item.icon} {item.label}</div>
              <div style={{ fontSize: 14, color: "#333", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>{item.value}</div>
            </div>
          ))}
          {day.insiderTip && (
            <div style={{ background: "#eef3ff", borderRadius: 8, padding: "10px 14px", borderLeft: "3px solid #003580", marginTop: 16 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#003580", fontFamily: "'DM Sans', sans-serif", marginBottom: 3 }}>✦ Insider tip</div>
              <div style={{ fontSize: 13.5, color: "#003580", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>{day.insiderTip}</div>
            </div>
          )}
          {day.bookables && day.bookables.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", fontFamily: "'DM Sans', sans-serif", marginBottom: 10 }}>🎟 Book for this day</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {day.bookables.map((b, i) => (
                  <a key={i} href={b.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #e0e6f0", background: "#f8f9ff", transition: "border-color 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = "#003580"}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "#e0e6f0"}>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 500, color: "#1a1a1a", fontFamily: "'DM Sans', sans-serif" }}>{b.name}</div>
                      <div style={{ fontSize: 11.5, color: "#888", fontFamily: "'DM Sans', sans-serif", marginTop: 2 }}>{b.platform}{b.price ? ` · ${b.price}` : ""}</div>
                    </div>
                    <div style={{ background: "#003580", color: "#fff", borderRadius: 6, padding: "5px 12px", fontSize: 12, fontWeight: 500, fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap", marginLeft: 10 }}>Book →</div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Hotel Tier Toggle ────────────────────────────────────────────────────────
function HotelTierToggle({ itinerary }) {
  const [tier, setTier] = useState("recommended");
  const [night, setNight] = useState(1);
  const totalNights = itinerary.days ? itinerary.days.length : 7;
  const locations = itinerary.locations || [];

  const getNightLocation = (n) => {
    let count = 0;
    for (const loc of locations) {
      count += loc.nights || 1;
      if (n <= count) return loc;
    }
    return locations[locations.length - 1] || null;
  };

  const fallbackTiers = {
    budget: itinerary.alternatives?.budget,
    recommended: itinerary.hotel,
    luxury: itinerary.alternatives?.luxury,
  };

  const loc = locations.length > 0 ? getNightLocation(night) : null;
  const tiers = loc ? {
    budget: loc.alternatives?.budget,
    recommended: loc.hotel,
    luxury: loc.alternatives?.luxury,
  } : fallbackTiers;

  const display = tiers[tier] || tiers.recommended;
  if (!display) return null;

  const nightLabel = night === 1 ? "Check-in night" : night === totalNights ? "Last night" : `Night ${night}`;
  const locationName = loc?.location || itinerary.hotel?.area || "";

  return (
    <div style={{ border: "1.5px solid #e8e2d9", borderRadius: 14, padding: "18px 20px", marginBottom: 16, background: "#fdfbf8" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
        <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", fontFamily: "'DM Sans', sans-serif" }}>🏨 Accommodation</div>
        <div style={{ display: "flex", gap: 4 }}>
          {["budget", "recommended", "luxury"].map(t => (
            tiers[t] && <button key={t} onClick={() => setTier(t)} style={{ padding: "5px 12px", borderRadius: 20, border: `1.5px solid ${tier === t ? "#003580" : "#e0e6f0"}`, background: tier === t ? "#003580" : "transparent", color: tier === t ? "#fff" : "#888", fontSize: 11, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: tier === t ? 500 : 400 }}>
              {t === "budget" ? "Hostel" : t === "recommended" ? "Recommended" : "Luxury"}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#aaa", fontFamily: "'DM Sans', sans-serif", marginRight: 4 }}>Night:</span>
        {Array.from({ length: totalNights }, (_, i) => i + 1).map(n => {
          const nLoc = locations.length > 0 ? getNightLocation(n) : null;
          const isNewLoc = locations.length > 0 && (n === 1 || getNightLocation(n - 1)?.location !== nLoc?.location);
          return (
            <button key={n} onClick={() => setNight(n)}
              title={nLoc?.location || ""}
              style={{ width: 30, height: 30, borderRadius: 8, border: `1.5px solid ${night === n ? "#003580" : isNewLoc ? "#0ea5e9" : "#e0e6f0"}`, background: night === n ? "#003580" : "transparent", color: night === n ? "#fff" : isNewLoc ? "#0ea5e9" : "#888", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: night === n ? 600 : 400, flexShrink: 0 }}>{n}
            </button>
          );
        })}
        {locationName && <span style={{ fontSize: 11, color: "#003580", fontFamily: "'DM Sans', sans-serif", marginLeft: 4, fontWeight: 500 }}>— {locationName}</span>}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, color: "#1a1a1a", marginBottom: 3 }}>{display.name || display.hotel}</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: "#888", marginBottom: 6 }}>{display.area}</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#555", lineHeight: 1.5 }}>{display.description || display.note}</div>
          <div style={{ marginTop: 8, fontSize: 11.5, color: "#003580", fontFamily: "'DM Sans', sans-serif" }}>✓ {nightLabel}</div>
        </div>
        <div style={{ background: "#eef3ff", borderRadius: 8, padding: "6px 12px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#003580", fontWeight: 500, whiteSpace: "nowrap", marginLeft: 12, flexShrink: 0 }}>{display.priceRange}</div>
      </div>
    </div>
  );
}

// ─── Share Itinerary (NEW) ────────────────────────────────────────────────────
function ShareItinerary({ itinerary }) {
  const [copied, setCopied] = useState(false);
  const generateSummary = () => {
    const lines = [
      `✈ TripDone Itinerary: ${itinerary.destination}`,
      `${itinerary.tagline}`,
      `${itinerary.duration} · ${itinerary.hotel?.name || ""}`,
      ``,
      ...(itinerary.days || []).map(d =>
        `Day ${d.day} — ${d.theme}\n  ☀ ${d.morning}\n  ⛅ ${d.afternoon}\n  🌙 ${d.evening}`
      ),
      ``,
      `Plan your own trip free at tripdone.travel`,
    ];
    return lines.join("\n");
  };
  const copy = () => {
    const text = generateSummary();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
    } else {
      const el = document.createElement("textarea"); el.value = text; document.body.appendChild(el); el.select(); document.execCommand("copy"); document.body.removeChild(el);
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    }
  };
  return (
    <button onClick={copy} style={{ padding: "10px 20px", borderRadius: 8, border: "1.5px solid #e8e2d9", background: copied ? "#eef3ff" : "#fff", color: copied ? "#003580" : "#555", fontSize: 13.5, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontWeight: 500, transition: "all 0.2s" }}>
      {copied ? "✓ Copied to clipboard!" : "⬡ Share itinerary"}
    </button>
  );
}

// ─── PDF Export ───────────────────────────────────────────────────────────────
function PDFExport({ itinerary }) {
  const [exporting, setExporting] = useState(false);

  const loadJsPDF = () => new Promise((resolve, reject) => {
    if (window.jspdf) { resolve(window.jspdf.jsPDF); return; }
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    s.onload = () => resolve(window.jspdf.jsPDF);
    s.onerror = reject;
    document.head.appendChild(s);
  });

  const handleExport = async () => {
    setExporting(true);
    try {
      const jsPDF = await loadJsPDF();
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const W = 210, H = 297;
      const navy = [0, 53, 128], sky = [14, 165, 233], white = [255,255,255], offwhite = [248,249,255], darkgrey = [80,80,80], lightgrey = [220,226,240], midgrey = [140,140,140];

      const safeText = (str) => (str || "").replace(/[^\x20-\x7E]/g, "").trim();

      const addPageFooter = (pageNum, totalPages) => {
        doc.setFillColor(...navy);
        doc.rect(0, H - 14, W, 14, "F");
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(...white);
        doc.text("tripdone.travel", 14, H - 5.5);
        doc.text(`Page ${pageNum} of ${totalPages}`, W/2, H - 5.5, { align: "center" });
        doc.text("Your trip. Done.", W - 14, H - 5.5, { align: "right" });
      };

      const wrapText = (doc, text, x, y, maxWidth, lineHeight) => {
        const lines = doc.splitTextToSize(safeText(text), maxWidth);
        lines.forEach((line, i) => doc.text(line, x, y + i * lineHeight));
        return y + lines.length * lineHeight;
      };

      const totalPages = 2 + (itinerary.days || []).length + 1; // cover + contents + days + packing
      let pageNum = 1;

      // ── PAGE 1: COVER ──────────────────────────────────────────────────────
      doc.setFillColor(...navy);
      doc.rect(0, 0, W, H, "F");

      // Top accent line
      doc.setFillColor(...sky);
      doc.rect(0, 0, W, 3, "F");

      // TripDone wordmark
      doc.setFont("helvetica", "bold");
      doc.setFontSize(28);
      doc.setTextColor(...white);
      doc.text("TripDone", 14, 28);

      // Tagline under wordmark
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(...sky);
      doc.text("AI-POWERED TRAVEL PLANNING", 14, 36);

      // Divider
      doc.setDrawColor(...sky);
      doc.setLineWidth(0.5);
      doc.line(14, 44, W - 14, 44);

      // Destination
      doc.setFont("helvetica", "bold");
      doc.setFontSize(38);
      doc.setTextColor(...white);
      const destLines = doc.splitTextToSize(safeText(itinerary.destination), W - 28);
      destLines.forEach((line, i) => doc.text(line, 14, 70 + i * 14));

      // Tagline
      doc.setFont("helvetica", "italic");
      doc.setFontSize(14);
      doc.setTextColor(180, 200, 230);
      doc.text(safeText(itinerary.tagline), 14, 70 + destLines.length * 14 + 10);

      // Info pills
      const pillY = 130;
      const pills = [
        { label: "DURATION", value: safeText(itinerary.duration) },
        { label: "STAY", value: safeText(itinerary.hotel?.name || "") },
        { label: "FROM", value: safeText(itinerary.hotel?.priceRange || "") },
      ];
      pills.forEach((pill, i) => {
        const px = 14 + i * 62;
        doc.setFillColor(255,255,255,30);
        doc.setFillColor(20, 60, 120);
        doc.roundedRect(px, pillY, 58, 24, 3, 3, "F");
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.setTextColor(...sky);
        doc.text(pill.label, px + 6, pillY + 8);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(...white);
        const valLines = doc.splitTextToSize(pill.value, 46);
        doc.text(valLines[0], px + 6, pillY + 16);
      });

      // Bottom branding strip
      doc.setFillColor(0, 35, 90);
      doc.rect(0, H - 50, W, 36, "F");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(180, 200, 230);
      doc.text("Your itinerary, planned by AI.", 14, H - 34);
      doc.setFontSize(8);
      doc.text("Free to use. Always. tripdone.travel", 14, H - 25);

      addPageFooter(pageNum++, totalPages);

      // ── PAGE 2: CONTENTS ───────────────────────────────────────────────────
      doc.addPage();
      doc.setFillColor(...offwhite);
      doc.rect(0, 0, W, H, "F");

      // Header bar
      doc.setFillColor(...navy);
      doc.rect(0, 0, W, 22, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(...white);
      doc.text("TripDone", 14, 14);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(...sky);
      doc.text(safeText(itinerary.destination).toUpperCase(), W - 14, 14, { align: "right" });

      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(...navy);
      doc.text("Contents", 14, 44);

      doc.setDrawColor(...lightgrey);
      doc.setLineWidth(0.4);
      doc.line(14, 48, W - 14, 48);

      const contents = [
        { title: "Your Itinerary Overview", page: 3 },
        ...(itinerary.days || []).map((d, i) => ({ title: `Day ${d.day}  —  ${safeText(d.theme)}`, page: 3 + i })),
        { title: "Packing List", page: 3 + (itinerary.days || []).length },
      ];

      let cy = 62;
      contents.forEach((item, i) => {
        const isDay = i > 0 && i <= (itinerary.days || []).length;
        doc.setFillColor(isDay ? 240 : 230, isDay ? 244 : 237, isDay ? 255 : 255);
        doc.roundedRect(14, cy - 6, W - 28, 11, 2, 2, "F");
        doc.setFont("helvetica", isDay ? "normal" : "bold");
        doc.setFontSize(10);
        doc.setTextColor(...navy);
        doc.text(item.title, 20, cy + 1);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(...midgrey);
        doc.text(`${item.page}`, W - 20, cy + 1, { align: "right" });
        // dotted line
        doc.setDrawColor(...lightgrey);
        doc.setLineDashPattern([1, 2], 0);
        doc.line(20 + doc.getTextWidth(item.title) + 4, cy + 1, W - 24, cy + 1);
        doc.setLineDashPattern([], 0);
        cy += 14;
      });

      // Hotel highlight box
      if (itinerary.hotel) {
        cy += 8;
        doc.setFillColor(...navy);
        doc.roundedRect(14, cy, W - 28, 36, 4, 4, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor(...sky);
        doc.text("RECOMMENDED STAY", 22, cy + 10);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.setTextColor(...white);
        doc.text(safeText(itinerary.hotel.name), 22, cy + 20);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(180, 200, 230);
        doc.text(`${safeText(itinerary.hotel.area)}  •  ${safeText(itinerary.hotel.priceRange)}`, 22, cy + 28);
      }

      addPageFooter(pageNum++, totalPages);

      // ── PAGES 3+: ONE PAGE PER DAY ─────────────────────────────────────────
      for (const day of (itinerary.days || [])) {
        doc.addPage();
        doc.setFillColor(...white);
        doc.rect(0, 0, W, H, "F");

        // Header bar
        doc.setFillColor(...navy);
        doc.rect(0, 0, W, 22, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(...white);
        doc.text("TripDone", 14, 14);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(...sky);
        doc.text(safeText(itinerary.destination).toUpperCase(), W - 14, 14, { align: "right" });

        // Day number badge
        doc.setFillColor(...sky);
        doc.roundedRect(14, 28, 22, 10, 2, 2, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor(...white);
        doc.text(`DAY ${day.day}`, 25, 35, { align: "center" });

        // Theme
        doc.setFont("helvetica", "bold");
        doc.setFontSize(20);
        doc.setTextColor(...navy);
        doc.text(safeText(day.theme), 42, 36);

        doc.setDrawColor(...lightgrey);
        doc.setLineWidth(0.4);
        doc.line(14, 44, W - 14, 44);

        let dy = 56;
        const sections = [
          { label: "MORNING", icon: "Morning", value: day.morning },
          { label: "AFTERNOON", icon: "Afternoon", value: day.afternoon },
          { label: "EVENING", icon: "Evening", value: day.evening },
          { label: "GETTING AROUND", icon: "Transport", value: day.transport },
        ].filter(s => s.value);

        sections.forEach(section => {
          // Section label
          doc.setFont("helvetica", "bold");
          doc.setFontSize(7.5);
          doc.setTextColor(...sky);
          doc.text(section.label, 14, dy);
          dy += 5;

          // Content box
          const lines = doc.splitTextToSize(safeText(section.value), W - 36);
          const boxH = lines.length * 5.5 + 8;
          doc.setFillColor(...offwhite);
          doc.roundedRect(14, dy, W - 28, boxH, 2, 2, "F");
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9.5);
          doc.setTextColor(...darkgrey);
          lines.forEach((line, i) => doc.text(line, 20, dy + 7 + i * 5.5));
          dy += boxH + 8;
        });

        // Insider tip
        if (day.insiderTip) {
          doc.setFillColor(238, 243, 255);
          const tipLines = doc.splitTextToSize(safeText(day.insiderTip), W - 46);
          const tipH = tipLines.length * 5.5 + 12;
          doc.roundedRect(14, dy, W - 28, tipH, 2, 2, "F");
          doc.setFillColor(...navy);
          doc.rect(14, dy, 3, tipH, "F");
          doc.setFont("helvetica", "bold");
          doc.setFontSize(7.5);
          doc.setTextColor(...navy);
          doc.text("INSIDER TIP", 22, dy + 8);
          doc.setFont("helvetica", "italic");
          doc.setFontSize(9);
          doc.setTextColor(...navy);
          tipLines.forEach((line, i) => doc.text(line, 22, dy + 14 + i * 5.5));
        }

        addPageFooter(pageNum++, totalPages);
      }

      // ── LAST PAGE: PACKING LIST ────────────────────────────────────────────
      doc.addPage();
      doc.setFillColor(...offwhite);
      doc.rect(0, 0, W, H, "F");

      doc.setFillColor(...navy);
      doc.rect(0, 0, W, 22, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(...white);
      doc.text("TripDone", 14, 14);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(...sky);
      doc.text(safeText(itinerary.destination).toUpperCase(), W - 14, 14, { align: "right" });

      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(...navy);
      doc.text("Packing List", 14, 44);
      doc.setDrawColor(...lightgrey);
      doc.setLineWidth(0.4);
      doc.line(14, 48, W - 14, 48);

      const packingCols = [
        { title: "Essentials", items: itinerary.packingList?.essentials || [], x: 14 },
        { title: "Clothing", items: itinerary.packingList?.clothing || [], x: 80 },
        { title: "Extras", items: itinerary.packingList?.extras || [], x: 146 },
      ];

      packingCols.forEach(col => {
        let py = 62;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(...sky);
        doc.text(col.title.toUpperCase(), col.x, py);
        py += 8;
        col.items.forEach(item => {
          doc.setFillColor(...lightgrey);
          doc.roundedRect(col.x, py - 4, 5, 5, 1, 1, "F");
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9);
          doc.setTextColor(...darkgrey);
          doc.text(safeText(item), col.x + 8, py);
          py += 9;
        });
      });

      // Practical info
      if (itinerary.practicalInfo) {
        const piY = 200;
        doc.setFillColor(...navy);
        doc.roundedRect(14, piY, W - 28, 54, 4, 4, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(...sky);
        doc.text("PRACTICAL NOTES", 22, piY + 12);
        const piItems = [
          { label: "Getting around", value: itinerary.practicalInfo.bestTransport },
          { label: "Pre-book", value: itinerary.practicalInfo.mustBook },
          { label: "Packing tip", value: itinerary.practicalInfo.packingTip },
        ].filter(i => i.value);
        piItems.forEach((item, i) => {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(8);
          doc.setTextColor(180, 200, 230);
          doc.text(`${item.label}:`, 22, piY + 22 + i * 12);
          doc.setFont("helvetica", "normal");
          doc.setTextColor(...white);
          const shortened = doc.splitTextToSize(safeText(item.value), W - 90);
          doc.text(shortened[0], 60, piY + 22 + i * 12);
        });
      }

      // Back cover brand strip
      doc.setFillColor(...navy);
      doc.rect(0, H - 36, W, 22, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(...white);
      doc.text("TripDone", 14, H - 22);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(...sky);
      doc.text("Plan your next trip free at tripdone.travel", W - 14, H - 22, { align: "right" });

      addPageFooter(pageNum++, totalPages);

      // Save
      doc.save(`TripDone_${safeText(itinerary.destination).replace(/\s+/g, "_")}.pdf`);
    } catch (err) {
      console.error("PDF export failed:", err);
      alert("PDF export failed. Please try again.");
    }
    setExporting(false);
  };

  return (
    <button onClick={handleExport} disabled={exporting} style={{ padding: "10px 20px", borderRadius: 8, border: "1.5px solid #e8e2d9", background: "#fff", color: exporting ? "#aaa" : "#555", fontSize: 13.5, fontFamily: "'DM Sans', sans-serif", cursor: exporting ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 8, fontWeight: 500, transition: "all 0.2s" }}>
      {exporting ? "⏳ Generating PDF..." : "⬇ Download PDF"}
    </button>
  );
}

// ─── Saved Trips Hook (NEW) ───────────────────────────────────────────────────
function useSavedTrips() {
  const [trips, setTrips] = useState([]);
  const save = (itinerary, answers) => {
    const newTrip = { id: Date.now(), itinerary, answers, savedAt: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) };
    setTrips(prev => [newTrip, ...prev.filter(t => t.itinerary.destination !== itinerary.destination)]);
    return newTrip.id;
  };
  const remove = id => setTrips(prev => prev.filter(t => t.id !== id));
  return { trips, save, remove };
}

// ─── Trip Tabs (NEW) ──────────────────────────────────────────────────────────
function TripTabs({ trips, activeId, onSelect, onNew, onRemove }) {
  if (!trips || trips.length === 0) return null;
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 20, overflowX: "auto", paddingBottom: 4 }}>
      <button onClick={onNew} style={{ padding: "8px 16px", borderRadius: 8, border: "1.5px dashed #003580", background: "transparent", color: "#003580", fontSize: 13, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "'DM Sans', sans-serif" }}>+ New trip</button>
      {trips.map(t => (
        <div key={t.id} style={{ display: "flex", alignItems: "center", background: activeId === t.id ? "#003580" : "#fff", borderRadius: 8, border: `1.5px solid ${activeId === t.id ? "#003580" : "#e0e6f0"}`, overflow: "hidden", flexShrink: 0 }}>
          <button onClick={() => onSelect(t.id)} style={{ padding: "8px 14px", background: "transparent", border: "none", color: activeId === t.id ? "#fff" : "#333", fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>{t.itinerary.destination}</button>
          <button onClick={() => onRemove(t.id)} style={{ padding: "8px 8px 8px 0", background: "transparent", border: "none", color: activeId === t.id ? "rgba(255,255,255,0.5)" : "#aaa", fontSize: 14, cursor: "pointer", lineHeight: 1 }}>×</button>
        </div>
      ))}
    </div>
  );
}

// ─── Itinerary View ───────────────────────────────────────────────────────────
// ─── Trip Basket ──────────────────────────────────────────────────────────────
function useTripBasket() {
  const [items, setItems] = useState([]);
  const add = (item) => setItems(prev => prev.find(i => i.id === item.id) ? prev : [...prev, item]);
  const remove = (id) => setItems(prev => prev.filter(i => i.id !== id));
  const has = (id) => items.some(i => i.id === id);
  const total = items.reduce((sum, i) => sum + (parseFloat(i.rawPrice) || 0), 0);
  return { items, add, remove, has, total };
}

// ─── Bookable Card ────────────────────────────────────────────────────────────
const LOCATION_PHOTOS = {
  default: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&q=80",
  tokyo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80",
  kyoto: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80",
  osaka: "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=400&q=80",
  paris: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80",
  london: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80",
  barcelona: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&q=80",
  rome: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=80",
  bali: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80",
  bangkok: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&q=80",
  dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80",
  newyork: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&q=80",
  sydney: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&q=80",
  amsterdam: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=400&q=80",
  florence: "https://images.unsplash.com/photo-1543429258-e32c10c5f9e9?w=400&q=80",
};

function getLocationPhoto(location = "") {
  const key = location.toLowerCase().replace(/[^a-z]/g, "");
  for (const [k, url] of Object.entries(LOCATION_PHOTOS)) {
    if (key.includes(k)) return url;
  }
  return LOCATION_PHOTOS.default;
}

function BookableCard({ item, basket }) {
  const added = basket.has(item.id);
  const photo = getLocationPhoto(item.location || item.name);
  const typeIcon = { activity: "🎟", hotel: "🏨", hostel: "🏠", transport: "🚄", experience: "🎭" }[item.type] || "📍";

  return (
    <div style={{ borderRadius: 12, overflow: "hidden", border: `2px solid ${added ? "#003580" : "#e0e6f0"}`, background: "#fff", transition: "all 0.2s", boxShadow: added ? "0 4px 16px rgba(0,53,128,0.15)" : "none" }}>
      {/* Photo */}
      <div style={{ height: 140, overflow: "hidden", position: "relative" }}>
        <img src={photo} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }}/>
        <div style={{ position: "absolute", top: 10, left: 10, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", borderRadius: 6, padding: "3px 8px", fontSize: 11, color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>{typeIcon} {item.type?.toUpperCase()}</div>
        {item.price && <div style={{ position: "absolute", bottom: 10, right: 10, background: "#003580", borderRadius: 6, padding: "4px 10px", fontSize: 12, color: "#fff", fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>{item.price}</div>}
      </div>
      {/* Details */}
      <div style={{ padding: "12px 14px" }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", fontFamily: "'DM Sans', sans-serif", marginBottom: 3, lineHeight: 1.3 }}>{item.name}</div>
        <div style={{ fontSize: 12, color: "#888", fontFamily: "'DM Sans', sans-serif", marginBottom: 10 }}>{item.platform}{item.location ? ` · ${item.location}` : ""}</div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => added ? basket.remove(item.id) : basket.add(item)} style={{ flex: 1, padding: "8px", borderRadius: 8, border: `1.5px solid ${added ? "#003580" : "#e0e6f0"}`, background: added ? "#003580" : "transparent", color: added ? "#fff" : "#003580", fontSize: 12.5, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s" }}>
            {added ? "✓ Added" : "+ Add to trip"}
          </button>
          <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ padding: "8px 14px", borderRadius: 8, border: "1.5px solid #e0e6f0", background: "transparent", color: "#555", fontSize: 12.5, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center" }}>View →</a>
        </div>
      </div>
    </div>
  );
}

// ─── Trip Basket Panel ────────────────────────────────────────────────────────
function TripBasketPanel({ basket, itinerary, answers }) {
  const [open, setOpen] = useState(false);
  if (basket.items.length === 0) return null;

  const dest = encodeURIComponent(itinerary?.destination || "");
  const checkin = answers?.dates?.start || "";
  const checkout = answers?.dates?.end || "";

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 500 }}>
      {/* Basket toggle button */}
      <button onClick={() => setOpen(!open)} style={{ background: "#003580", color: "#fff", border: "none", borderRadius: 50, padding: "14px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 8px 24px rgba(0,53,128,0.4)", display: "flex", alignItems: "center", gap: 8 }}>
        🧳 My Trip ({basket.items.length})
        {basket.total > 0 && <span style={{ background: "#0ea5e9", borderRadius: 20, padding: "2px 8px", fontSize: 12 }}>~£{basket.total.toFixed(0)}</span>}
      </button>

      {/* Basket panel */}
      {open && (
        <div style={{ position: "absolute", bottom: 60, right: 0, width: 340, background: "#fff", borderRadius: 16, boxShadow: "0 16px 48px rgba(0,0,0,0.18)", border: "1.5px solid #e0e6f0", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", background: "#003580", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>🧳 Your Trip Basket</span>
            <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.7)", fontSize: 18, cursor: "pointer" }}>✕</button>
          </div>
          <div style={{ maxHeight: 340, overflowY: "auto", padding: "12px 16px" }}>
            {basket.items.map(item => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f0f4ff" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 500, color: "#1a1a1a", fontFamily: "'DM Sans', sans-serif", marginBottom: 2 }}>{item.name}</div>
                  <div style={{ fontSize: 11.5, color: "#888", fontFamily: "'DM Sans', sans-serif" }}>{item.platform} · {item.price || "Price on site"}</div>
                </div>
                <button onClick={() => basket.remove(item.id)} style={{ background: "none", border: "none", color: "#ccc", fontSize: 16, cursor: "pointer", marginLeft: 8, flexShrink: 0 }}>✕</button>
              </div>
            ))}
          </div>
          <div style={{ padding: "14px 16px", borderTop: "1px solid #e0e6f0" }}>
            {basket.total > 0 && <div style={{ fontSize: 13, color: "#888", fontFamily: "'DM Sans', sans-serif", marginBottom: 10 }}>Estimated total: <strong style={{ color: "#003580" }}>~£{basket.total.toFixed(0)}</strong> <span style={{ fontSize: 11 }}>(excl. flights)</span></div>}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <a href={`https://www.booking.com/searchresults.html?ss=${dest}&checkin=${checkin}&checkout=${checkout}&aid=4297311`} target="_blank" rel="noopener noreferrer" style={{ padding: "11px", borderRadius: 8, background: "#003580", color: "#fff", textDecoration: "none", fontSize: 13.5, fontWeight: 500, textAlign: "center", fontFamily: "'DM Sans', sans-serif" }}>Book hotels on Booking.com →</a>
              <a href={`https://www.getyourguide.com/s/?q=${dest}&partner_id=5566445`} target="_blank" rel="noopener noreferrer" style={{ padding: "11px", borderRadius: 8, background: "#FF5533", color: "#fff", textDecoration: "none", fontSize: 13.5, fontWeight: 500, textAlign: "center", fontFamily: "'DM Sans', sans-serif" }}>Book activities on GetYourGuide →</a>
              <a href={`https://www.kiwi.com/en/search/results/anywhere/${dest}/${checkin}/${checkout}?affilid=4766423`} target="_blank" rel="noopener noreferrer" style={{ padding: "11px", borderRadius: 8, background: "#00A991", color: "#fff", textDecoration: "none", fontSize: 13.5, fontWeight: 500, textAlign: "center", fontFamily: "'DM Sans', sans-serif" }}>Search flights on Kiwi.com →</a>
            </div>
            <p style={{ fontSize: 11, color: "#aaa", textAlign: "center", marginTop: 10, fontFamily: "'DM Sans', sans-serif" }}>TripDone earns a small commission on bookings — at no cost to you.</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ItineraryView({ itinerary, answers, onBookNow, onSaveTrip, isSaved }) {
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [saveState, setSaveState] = useState(isSaved ? "saved" : "unsaved");
  const basket = useTripBasket();
  const chatBottomRef = useRef(null);
  useEffect(() => { chatBottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMessages, chatLoading]);

  const handleSave = () => { if (saveState === "unsaved") { onSaveTrip(); setSaveState("saved"); } };

  async function sendChat() {
    if (!chatInput.trim() || chatLoading) return;
    const msg = chatInput.trim(); setChatInput("");
    const newMsgs = [...chatMessages, { role: "user", content: msg }];
    setChatMessages(newMsgs); setChatLoading(true);
    try {
      const context = `Current itinerary: ${JSON.stringify(itinerary)}\nOriginal preferences: ${JSON.stringify(answers)}\nUser request: ${msg}`;
      const reply = await callClaude(REFINE_SYSTEM, context, 400);
      setChatMessages([...newMsgs, { role: "assistant", content: reply }]);
    } catch { setChatMessages([...newMsgs, { role: "assistant", content: "Sorry, something went wrong. Try again." }]); }
    finally { setChatLoading(false); }
  }

  return (
    <div style={{ animation: "fadeUp 0.5s ease" }}>
      <div style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2d2418 100%)", borderRadius: 16, padding: "28px 24px", marginBottom: 20, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(0,53,128,0.15)" }}/>
        <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#0ea5e9", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", marginBottom: 8 }}>Your TripDone itinerary</div>
        <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 28, color: "#fff", fontWeight: 400, margin: "0 0 6px" }}>{itinerary.destination}</h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#0ea5e9", fontSize: 15, margin: "0 0 20px" }}>{itinerary.tagline}</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {onBookNow && <button onClick={onBookNow} style={{ padding: "11px 28px", borderRadius: 8, background: "#0ea5e9", border: "none", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Book this trip →</button>}
          <button onClick={handleSave} style={{ padding: "11px 20px", borderRadius: 8, background: saveState === "saved" ? "rgba(14,165,233,0.2)" : "rgba(255,255,255,0.1)", border: `1.5px solid ${saveState === "saved" ? "#0ea5e9" : "rgba(255,255,255,0.2)"}`, color: saveState === "saved" ? "#0ea5e9" : "rgba(255,255,255,0.7)", fontSize: 13.5, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
            {saveState === "saved" ? "✓ Saved" : "+ Save trip"}
          </button>
        </div>
      </div>

      {/* Action bar — share + download */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <ShareItinerary itinerary={itinerary}/>
        <PDFExport itinerary={itinerary}/>
      </div>

      {/* Hotel with tier toggle removed — now shown inline in day cards */}

      <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", fontFamily: "'DM Sans', sans-serif", marginBottom: 12 }}>Day by day</div>
      {itinerary.days.map((day, i) => <DayCard key={i} day={day} index={i} locations={itinerary.locations || []}/>)}

      {/* Bookable cards — all activities and accommodation across trip */}
      {(() => {
        const allBookables = [];
        (itinerary.days || []).forEach(day => {
          (day.bookables || []).forEach((b, bi) => {
            allBookables.push({ ...b, id: `day${day.day}-${bi}`, location: day.location, rawPrice: b.price ? parseFloat(b.price.replace(/[^0-9.]/g, "")) || 0 : 0 });
          });
        });
        (itinerary.locations || []).forEach((loc, li) => {
          if (loc.hotel) allBookables.push({ id: `hotel-${li}`, name: loc.hotel.name, type: "hotel", platform: "Booking.com", price: loc.hotel.priceRange, url: loc.hotel.bookingUrl || `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(loc.hotel.name)}&aid=4297311`, location: loc.location, rawPrice: parseFloat((loc.hotel.priceRange || "").replace(/[^0-9.]/g, "")) || 0 });
          if (loc.alternatives?.budget) allBookables.push({ id: `hostel-${li}`, name: loc.alternatives.budget.hotel, type: "hostel", platform: "Hostelworld", price: loc.alternatives.budget.priceRange, url: loc.alternatives.budget.bookingUrl || `https://www.hostelworld.com/search?search_keywords=${encodeURIComponent(loc.alternatives.budget.hotel)}`, location: loc.location, rawPrice: parseFloat((loc.alternatives.budget.priceRange || "").replace(/[^0-9.]/g, "")) || 0 });
        });
        if (allBookables.length === 0) return null;
        return (
          <div style={{ border: "1.5px solid #e8e2d9", borderRadius: 14, padding: "18px 20px", marginBottom: 20, background: "#fdfbf8" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", fontFamily: "'DM Sans', sans-serif", marginBottom: 6 }}>🧳 Build your trip</div>
            <p style={{ fontSize: 13, color: "#888", fontFamily: "'DM Sans', sans-serif", marginBottom: 16 }}>Add items to your trip basket, then book everything in one go.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
              {allBookables.map(item => <BookableCard key={item.id} item={item} basket={basket}/>)}
            </div>
          </div>
        );
      })()}

      {/* Basket panel */}
      <TripBasketPanel basket={basket} itinerary={itinerary} answers={answers}/>

      {/* Packing List (now shown inline) */}
      {itinerary.packingList && (
        <div style={{ border: "1.5px solid #e8e2d9", borderRadius: 14, padding: "18px 20px", marginBottom: 16, background: "#fdfbf8" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", fontFamily: "'DM Sans', sans-serif", marginBottom: 14 }}>🎒 Packing list</div>
          <div className="packing-grid">
            {[{ title: "Essentials", items: itinerary.packingList.essentials }, { title: "Clothing", items: itinerary.packingList.clothing }, { title: "Extras", items: itinerary.packingList.extras }].map(cat => (
              <div key={cat.title} style={{ background: "#f8f9ff", borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#003580", marginBottom: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, textAlign: "left" }}>{cat.title}</div>
                {(cat.items || []).map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 7, textAlign: "left" }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#003580", flexShrink: 0, marginTop: 5 }}/>
                    <span style={{ fontSize: 13, color: "#444", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.4 }}>{item}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ border: "1.5px solid #e8e2d9", borderRadius: 14, padding: "18px 20px", marginBottom: 20, background: "#fdfbf8" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", fontFamily: "'DM Sans', sans-serif", marginBottom: 14 }}>✦ Practical notes</div>
        {[{ label: "Getting around", value: itinerary.practicalInfo?.bestTransport }, { label: "Pre-book", value: itinerary.practicalInfo?.mustBook }, { label: "Packing tip", value: itinerary.practicalInfo?.packingTip }].map(item => item.value ? (
          <div key={item.label} style={{ marginBottom: 10 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, color: "#888", marginRight: 8 }}>{item.label}:</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#444" }}>{item.value}</span>
          </div>
        ) : null)}
      </div>

      {/* Refinement chat */}
      <div style={{ border: "1.5px solid #e8e2d9", borderRadius: 14, overflow: "hidden", background: "#fdfbf8", marginBottom: 32 }}>
        <div style={{ padding: "16px 20px", background: "#1a1a1a" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 500, color: "#fff" }}>Want to change anything?</span>
        </div>
        <div style={{ borderTop: "1px solid #e8e2d9" }}>
          {chatMessages.length === 0 && <div style={{ padding: "16px 20px" }}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#888", margin: 0 }}>Tell me anything you'd like to adjust — hotel, a specific day, activities, pace, budget...</p></div>}
          {chatMessages.length > 0 && (
            <div style={{ maxHeight: 320, overflowY: "auto", padding: "16px 20px" }}>
              {chatMessages.map((m, i) => (
                <div key={i} style={{ marginBottom: 12, display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{ maxWidth: "80%", padding: "10px 14px", borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: m.role === "user" ? "#1a1a1a" : "#f0ebe3", color: m.role === "user" ? "#fff" : "#333", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, lineHeight: 1.5 }}>{m.content}</div>
                </div>
              ))}
              {chatLoading && <div style={{ display: "flex", gap: 5 }}>{[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#003580", animation: "bounce 1.2s infinite", animationDelay: `${i * 0.2}s` }}/>)}</div>}
              <div ref={chatBottomRef}/>
            </div>
          )}
          <div style={{ padding: "14px 16px", borderTop: "1px solid #f0ebe3", display: "flex", gap: 8 }}>
            <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendChat()} placeholder="e.g. Replace the museum with something outdoors..." style={{ flex: 1, padding: "12px 16px", border: "1.5px solid #e8e2d9", borderRadius: 10, fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "#1a1a1a", background: "#fff", outline: "none" }}/>
            <button onClick={sendChat} disabled={!chatInput.trim() || chatLoading} style={{ padding: "12px 18px", borderRadius: 10, border: "none", background: chatInput.trim() && !chatLoading ? "#1a1a1a" : "#e8e2d9", color: chatInput.trim() && !chatLoading ? "#fff" : "#aaa", fontFamily: "'DM Sans', sans-serif", fontSize: 14, cursor: chatInput.trim() ? "pointer" : "not-allowed" }}>→</button>
          </div>
        </div>
      </div>

      {/* Helpful Links */}
      {itinerary.helpfulLinks && itinerary.helpfulLinks.length > 0 && (
        <div style={{ border: "1.5px solid #e8e2d9", borderRadius: 14, padding: "20px 22px", marginBottom: 32, background: "#fdfbf8" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", fontFamily: "'DM Sans', sans-serif", marginBottom: 16 }}>🔗 Helpful links</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {itinerary.helpfulLinks.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "flex", alignItems: "flex-start", gap: 14, padding: "12px 14px", borderRadius: 10, border: "1.5px solid #e8e2d9", background: "#fff", transition: "border-color 0.15s, box-shadow 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#003580"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,53,128,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#e8e2d9"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: "#eef3ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16 }}>📖</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: "#1a1a1a", marginBottom: 3, lineHeight: 1.3 }}>{link.title}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: "#888", lineHeight: 1.4, marginBottom: 4 }}>{link.desc}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#003580", fontWeight: 500, letterSpacing: "0.04em" }}>{link.source}</div>
                </div>
                <div style={{ fontSize: 16, color: "#ccc", flexShrink: 0, alignSelf: "center" }}>→</div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Quiz ─────────────────────────────────────────────────────────────────────
function ScrollQuiz({ answers, setAnswers, onSubmit, error }) {
  const set = (id, val) => setAnswers(prev => ({ ...prev, [id]: val }));
  const isComplete = !!(answers.destination && answers.tripType && answers.dates?.start && answers.dates?.end && Object.values(answers.travellers || {}).reduce((a,b) => a+b, 0) >= 1 && answers.budget?.max > answers.budget?.min && answers.pace && answers.movement && (answers.interests || []).length > 0);
  const sectionStyle = { background: "#fff", borderRadius: 16, padding: "28px 24px", marginBottom: 16, border: "1.5px solid #e8edf5", boxShadow: "0 2px 12px rgba(0,53,128,0.06)" };
  const labelStyle = { fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 400, color: "#1a1a1a", marginBottom: 4, display: "block" };
  const hintStyle = { fontSize: 13, color: "#999", marginBottom: 16, display: "block", fontFamily: "'DM Sans', sans-serif" };
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 28, fontWeight: 400, color: "#1a1a1a", marginBottom: 6 }}>Plan your trip</h1>
        <p style={{ fontSize: 14, color: "#888", lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>Fill in the details below and we'll build your perfect itinerary.</p>
      </div>
      {error && <div style={{ background: "#fef0f0", border: "1px solid #f5c6c6", borderRadius: 8, padding: "12px 16px", marginBottom: 16, fontSize: 13, color: "#c0392b" }}>{error}</div>}
      <div style={sectionStyle}>
        <span style={labelStyle}>Where do you want to go?</span>
        <span style={hintStyle}>City, country, or region — even 'surprise me'</span>
        <input value={answers.destination || ""} onChange={e => set("destination", e.target.value)} placeholder="e.g. Japan, Amalfi Coast, New York..." style={{ width: "100%", padding: "13px 16px", border: `1.5px solid ${answers.destination ? "#003580" : "#e0e6f0"}`, borderRadius: 10, fontSize: 15, fontFamily: "'DM Sans', sans-serif", color: "#1a1a1a", background: "#fafbff", outline: "none", boxSizing: "border-box" }}/>
      </div>
      <div style={sectionStyle}>
        <span style={labelStyle}>What kind of trip is this?</span>
        <span style={hintStyle}>This shapes everything — your hotel, pace, and activities</span>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[{ value: "business", icon: "💼", label: "Business", sub: "Work trips, conferences" }, { value: "relax", icon: "🌿", label: "Relax & Unwind", sub: "Recharge, slow down" }, { value: "adventure", icon: "🧗", label: "Adventure", sub: "Hiking, thrills, outdoors" }, { value: "culture", icon: "🏛", label: "Culture & History", sub: "Art, museums, local life" }, { value: "romance", icon: "🥂", label: "Romance", sub: "Couples, anniversary" }, { value: "family", icon: "👨‍👩‍👧", label: "Family", sub: "Kid-friendly for everyone" }, { value: "foodie", icon: "🍽", label: "Food & Drink", sub: "Restaurants, markets, wine" }, { value: "wellness", icon: "🧘", label: "Wellness", sub: "Spa, yoga, reset" }].map(opt => {
            const sel = answers.tripType === opt.value;
            return <button key={opt.value} onClick={() => set("tripType", opt.value)} style={{ padding: "12px 14px", borderRadius: 10, textAlign: "left", border: `1.5px solid ${sel ? "#003580" : "#e0e6f0"}`, background: sel ? "#eef3ff" : "#fafbff", cursor: "pointer" }}>
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
        <DatePicker answers={answers} setAnswers={setAnswers}/>
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
          const STEP = 100, MIN = 0, MAX = 10000;
          const curMin = answers.budget?.min ?? 0, curMax = answers.budget?.max ?? 5000;
          const fmt = v => v >= MAX ? `£${MAX.toLocaleString()}+` : `£${v.toLocaleString()}`;
          const pct = v => ((v - MIN) / (MAX - MIN)) * 100;
          return (
            <div>
              <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
                <div style={{ flex: 1, background: "#eef3ff", borderRadius: 10, padding: "12px", textAlign: "center", border: "1.5px solid #003580" }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#003580", fontFamily: "'DM Sans', sans-serif", marginBottom: 4 }}>Minimum</div>
                  <div style={{ fontSize: 20, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: "#003580" }}>{fmt(curMin)}</div>
                </div>
                <div style={{ flex: 1, background: "#003580", borderRadius: 10, padding: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', sans-serif", marginBottom: 4 }}>Maximum</div>
                  <div style={{ fontSize: 20, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: "#fff" }}>{fmt(curMax)}</div>
                </div>
              </div>
              {[{ label: "Minimum", val: curMin, isMin: true }, { label: "Maximum", val: curMax, isMin: false }].map(({ label, val, isMin }) => (
                <div key={label} style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 11, color: "#aaa", fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label} budget</span>
                    <span style={{ fontSize: 12, color: "#003580", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>{fmt(val)}</span>
                  </div>
                  <div style={{ position: "relative", height: 6, background: "#e0e6f0", borderRadius: 3 }}>
                    <div style={{ position: "absolute", left: 0, width: `${pct(val)}%`, height: "100%", background: "#003580", borderRadius: 3 }}/>
                    <input type="range" min={MIN} max={MAX} step={STEP} value={val} onChange={e => { const v = Number(e.target.value); if (isMin) set("budget", { min: v, max: Math.max(curMax, v + STEP) }); else set("budget", { min: Math.min(curMin, v - STEP), max: v }); }} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer", margin: 0 }}/>
                    <div style={{ position: "absolute", top: "50%", transform: "translate(-50%,-50%)", left: `${pct(val)}%`, width: 18, height: 18, borderRadius: "50%", background: "#fff", border: "2.5px solid #003580", pointerEvents: "none" }}/>
                  </div>
                </div>
              ))}
            </div>
          );
        })()}
      </div>
      <div style={sectionStyle}>
        <span style={labelStyle}>How full do you like your days?</span>
        <span style={hintStyle}>This shapes how many activities we plan each day</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[{ value: "packed", label: "Packed", sub: "2+ activities per day — full itinerary morning to night", dots: 5 }, { value: "balanced", label: "Balanced", sub: "1–2 activities per day with free time built in", dots: 4 }, { value: "relaxed", label: "Relaxed", sub: "1 activity per day, easy pace", dots: 3 }, { value: "every_few_days", label: "Every Few Days", sub: "1 activity every 2–3 days", dots: 2 }, { value: "spontaneous", label: "Spontaneous", sub: "1–2 planned activities for the whole trip", dots: 1 }, { value: "transport", label: "Transport & Accommodation Only", sub: "Flights and hotels only — no activities planned", dots: 0 }].map(opt => {
            const sel = answers.pace === opt.value;
            return <button key={opt.value} onClick={() => set("pace", opt.value)} style={{ padding: "13px 16px", borderRadius: 10, textAlign: "left", border: `1.5px solid ${sel ? "#003580" : "#e0e6f0"}`, background: sel ? "#eef3ff" : "#fafbff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: sel ? "#003580" : "#1a1a1a" }}>{opt.label} <span style={{ fontWeight: 300, color: sel ? "#003580" : "#888" }}>— {opt.sub}</span></div>
              <div style={{ display: "flex", gap: 4 }}>{[1,2,3,4,5].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: i <= opt.dots ? (sel ? "#003580" : "#1a1a1a") : (sel ? "rgba(0,53,128,0.15)" : "#dde2ef"), transition: "background 0.15s" }}/>)}</div>
            </button>;
          })}
        </div>
      </div>
      <div style={sectionStyle}>
        <span style={labelStyle}>How often do you want to move around?</span>
        <span style={hintStyle}>How frequently you'll change location or base</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { value: "every_day", label: "Every Day", sub: "New location each day — maximum variety", dots: 5 },
            { value: "every_2_days", label: "Every 2 Days", sub: "Move every couple of days", dots: 4 },
            { value: "every_3_days", label: "Every 3 Days", sub: "A few days in each place", dots: 3 },
            { value: "every_4_days", label: "Every 4 Days", sub: "Mostly settled, occasional moves", dots: 2 },
            { value: "every_5_days", label: "Every 5 Days", sub: "Spend most of the trip in one place", dots: 1 },
            { value: "stay_put", label: "Stay Put", sub: "One base for the entire trip", dots: 0 },
          ].map(opt => {
            const sel = answers.movement === opt.value;
            return <button key={opt.value} onClick={() => set("movement", opt.value)} style={{ padding: "13px 16px", borderRadius: 10, textAlign: "left", border: `1.5px solid ${sel ? "#003580" : "#e0e6f0"}`, background: sel ? "#eef3ff" : "#fafbff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: sel ? "#003580" : "#1a1a1a" }}>{opt.label} <span style={{ fontWeight: 300, color: sel ? "#003580" : "#888" }}>— {opt.sub}</span></div>
              <div style={{ display: "flex", gap: 4 }}>{[1,2,3,4,5].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: i <= opt.dots ? (sel ? "#003580" : "#1a1a1a") : (sel ? "rgba(0,53,128,0.15)" : "#dde2ef"), transition: "background 0.15s" }}/>)}</div>
            </button>;
          })}
        </div>
      </div>
      <div style={sectionStyle}>
        <span style={labelStyle}>What matters most to you?</span>
        <span style={hintStyle}>Pick everything that applies</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {["Food & restaurants","Art & culture","Nature & outdoors","Nightlife","Luxury & wellness","History","Hidden gems","Shopping","Architecture","Music & live events","Photography","Sport & fitness","Local markets","Beaches & coastline","Wildlife","Religious sites","Budget-friendly","Sun & warmth","Snow & cold","Road trips","Cruises","Festivals & events","Volunteering","Solo adventures","Family-friendly","Romantic escapes","Off the beaten track","Sustainable travel"].map(opt => {
            const sel = (answers.interests || []).includes(opt);
            return <button key={opt} onClick={() => set("interests", sel ? (answers.interests || []).filter(x => x !== opt) : [...(answers.interests || []), opt])} style={{ padding: "8px 14px", borderRadius: 20, border: `1.5px solid ${sel ? "#003580" : "#e0e6f0"}`, background: sel ? "#eef3ff" : "#fafbff", color: sel ? "#003580" : "#555", fontFamily: "'DM Sans', sans-serif", fontSize: 13, cursor: "pointer", fontWeight: sel ? 500 : 400 }}>{opt}</button>;
          })}
        </div>
      </div>
      <button onClick={onSubmit} disabled={!isComplete} style={{ width: "100%", padding: "16px", borderRadius: 12, background: isComplete ? "#003580" : "#e0e6f0", border: "none", color: isComplete ? "#fff" : "#aaa", fontSize: 16, fontWeight: 500, cursor: isComplete ? "pointer" : "not-allowed", fontFamily: "'DM Sans', sans-serif", boxShadow: isComplete ? "0 6px 24px rgba(0,53,128,0.3)" : "none", transition: "all 0.2s" }}>
        {isComplete ? "Build my trip →" : "Complete all sections to continue"}
      </button>
    </div>
  );
}

// ─── Main App (planner) ───────────────────────────────────────────────────────
function RoamApp({ onItineraryReady, onBookNow }) {
  const [screen, setScreen] = useState("quiz");
  const [answers, setAnswers] = useState({});
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState(null);
  const { trips, save, remove } = useSavedTrips();
  const [activeTrip, setActiveTrip] = useState(null);

  async function generateItinerary() {
    setScreen("loading"); setError(null);
    try {
      const dates = answers.dates?.start && answers.dates?.end ? `${answers.dates.start} to ${answers.dates.end}` : answers.dates;
      const prompt = `Build a trip itinerary:\nDestination: ${answers.destination}\nTrip type: ${answers.tripType}\nDates: ${dates}\nTravellers: ${typeof answers.travellers === "object" ? Object.entries(answers.travellers).filter(([,v]) => v > 0).map(([k,v]) => `${v} ${k}`).join(", ") : answers.travellers}\nBudget: ${typeof answers.budget === "object" ? `£${answers.budget.min?.toLocaleString()} – £${answers.budget.max >= 10000 ? "10,000+" : answers.budget.max?.toLocaleString()}` : answers.budget}\nPace: ${answers.pace}\nMovement frequency: ${answers.movement}\nInterests: ${(answers.interests || []).join(", ")}`;
      const raw = await callClaude(ITINERARY_SYSTEM, prompt, 4000);
      let clean = raw.trim().replace(/```json\s*/gi, "").replace(/```\s*/gi, "").trim();
      const start = clean.indexOf("{"), end = clean.lastIndexOf("}");
      if (start === -1 || end === -1) throw new Error("No JSON found");
      const data = JSON.parse(clean.slice(start, end + 1));
      setItinerary(data);
      setActiveTrip(null);
      if (onItineraryReady) onItineraryReady(data, answers);
      setScreen("itinerary");
    } catch (err) {
      console.error(err); setError("Something went wrong. Please try again."); setScreen("quiz");
    }
  }

  const handleSaveTrip = () => { if (itinerary) save(itinerary, answers); };
  const loadTrip = id => { const found = trips.find(t => t.id === id); if (found) { setItinerary(found.itinerary); setActiveTrip(id); setScreen("itinerary"); } };
  const currentItinerary = activeTrip ? trips.find(t => t.id === activeTrip)?.itinerary : itinerary;

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9ff", fontFamily: "'DM Sans', sans-serif", width: "100%" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@800&family=DM+Sans:wght@300;400;500&display=swap'); @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}} @keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-7px)}} @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}} *{box-sizing:border-box;margin:0;padding:0;} html,body{background:#f8f9ff;width:100%;} input,button,textarea{font-family:inherit;} ::-webkit-scrollbar{width:3px;} ::-webkit-scrollbar-thumb{background:#ddd;border-radius:2px;} .packing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;} @media(max-width:600px){.packing-grid{grid-template-columns:1fr;gap:12px;}}`}</style>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "32px 24px 60px" }}>
        {screen === "itinerary" && trips.length > 0 && (
          <TripTabs trips={trips} activeId={activeTrip} onSelect={loadTrip} onNew={() => { setActiveTrip(null); setItinerary(null); setAnswers({}); setScreen("quiz"); }} onRemove={remove}/>
        )}
        {screen === "quiz" && <ScrollQuiz answers={answers} setAnswers={setAnswers} onSubmit={generateItinerary} error={error}/>}
        {screen === "loading" && <LoadingScreen destination={answers.destination}/>}
        {screen === "itinerary" && currentItinerary && (
          <ItineraryView itinerary={currentItinerary} answers={activeTrip ? trips.find(t => t.id === activeTrip)?.answers : answers} onBookNow={onBookNow} onSaveTrip={handleSaveTrip} isSaved={!!activeTrip || trips.some(t => t.itinerary.destination === currentItinerary.destination)}/>
        )}
      </div>
    </div>
  );
}

// ─── Auth Modal ───────────────────────────────────────────────────────────────
function AuthModal({ mode, onClose, onAuth }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", dob: "", address: "", passportNumber: "" });
  const [view, setView] = useState(mode);
  const [step, setStep] = useState(1);
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const inputStyle = { width: "100%", padding: "11px 14px", border: "1.5px solid #e0e6f0", borderRadius: 10, fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "#1a1a1a", background: "#fafbff", outline: "none", boxSizing: "border-box" };
  const handleSubmit = () => {
    if (view === "signup") { if (step === 1) { if (!form.name || !form.email || !form.password) return; setStep(2); return; } }
    if (view === "signin" && (!form.email || !form.password)) return;
    onAuth({ name: form.name || form.email.split("@")[0], email: form.email });
    onClose();
  };
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div style={{ background: "#fff", borderRadius: 20, padding: "36px 32px", width: "100%", maxWidth: 440, position: "relative", boxShadow: "0 24px 64px rgba(0,0,0,0.18)", maxHeight: "90vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#aaa" }}>✕</button>
        <TripDoneLogo/>
        {view === "signin" ? (
          <>
            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 26, fontWeight: 400, color: "#1a1a1a", margin: "18px 0 4px" }}>Welcome back</h2>
            <p style={{ fontSize: 13, color: "#888", marginBottom: 20 }}>Sign in to access your bookings and itineraries.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <input placeholder="Email address" type="email" value={form.email} onChange={e => f("email", e.target.value)} style={inputStyle}/>
              <input placeholder="Password" type="password" value={form.password} onChange={e => f("password", e.target.value)} style={inputStyle}/>
              <button onClick={handleSubmit} style={{ width: "100%", padding: "13px", borderRadius: 10, background: "#003580", border: "none", color: "#fff", fontSize: 15, fontWeight: 500, cursor: "pointer", marginTop: 4 }}>Sign in →</button>
            </div>
          </>
        ) : step === 1 ? (
          <>
            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 26, fontWeight: 400, color: "#1a1a1a", margin: "18px 0 4px" }}>Create your account</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <input placeholder="Full name" value={form.name} onChange={e => f("name", e.target.value)} style={inputStyle}/>
              <input placeholder="Email address" type="email" value={form.email} onChange={e => f("email", e.target.value)} style={inputStyle}/>
              <input placeholder="Password" type="password" value={form.password} onChange={e => f("password", e.target.value)} style={inputStyle}/>
              <button onClick={handleSubmit} disabled={!form.name || !form.email || !form.password} style={{ width: "100%", padding: "13px", borderRadius: 10, background: form.name && form.email && form.password ? "#003580" : "#e0e6f0", border: "none", color: form.name && form.email && form.password ? "#fff" : "#aaa", fontSize: 15, fontWeight: 500, cursor: "pointer", marginTop: 4 }}>Continue →</button>
            </div>
          </>
        ) : (
          <>
            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 26, fontWeight: 400, color: "#1a1a1a", margin: "18px 0 4px" }}>A few more details</h2>
            <div style={{ background: "#eef3ff", borderRadius: 8, padding: "8px 12px", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#003580", fontSize: 14 }}>⚡</span>
              <span style={{ fontSize: 12, color: "#003580" }}>These details speed up checkout across all booking platforms.</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <input placeholder="Phone number" type="tel" value={form.phone} onChange={e => f("phone", e.target.value)} style={inputStyle}/>
              <input placeholder="Date of birth" type="date" value={form.dob} onChange={e => f("dob", e.target.value)} style={{ ...inputStyle, color: form.dob ? "#1a1a1a" : "#aaa" }}/>
              <input placeholder="Home address" value={form.address} onChange={e => f("address", e.target.value)} style={inputStyle}/>
              <input placeholder="Passport number (optional)" value={form.passportNumber} onChange={e => f("passportNumber", e.target.value)} style={inputStyle}/>
              <button onClick={handleSubmit} style={{ width: "100%", padding: "13px", borderRadius: 10, background: "#003580", border: "none", color: "#fff", fontSize: 15, fontWeight: 500, cursor: "pointer", marginTop: 4 }}>Create account →</button>
              <button onClick={handleSubmit} style={{ width: "100%", padding: "10px", borderRadius: 10, background: "none", border: "none", color: "#aaa", fontSize: 13, cursor: "pointer" }}>Skip for now</button>
            </div>
          </>
        )}
        <p style={{ fontSize: 13, color: "#888", textAlign: "center", marginTop: 16 }}>
          {view === "signin" ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => { setView(view === "signin" ? "signup" : "signin"); setStep(1); }} style={{ color: "#003580", cursor: "pointer", fontWeight: 500 }}>{view === "signin" ? "Create one" : "Sign in"}</span>
        </p>
      </div>
    </div>
  );
}

// ─── Nav Dropdown ─────────────────────────────────────────────────────────────
function AccountDropdown({ user, onSignIn, onSignUp, onBookings, onSignOut, onPage, onPlan, onSettings, onTrips }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const item = (label, action, danger = false) => (
    <button key={label} onClick={() => { action(); setOpen(false); }} style={{ width: "100%", padding: "11px 18px", background: "none", border: "none", textAlign: "left", fontSize: 13.5, fontFamily: "'DM Sans', sans-serif", color: danger ? "#e74c3c" : "#333", cursor: "pointer", borderBottom: "1px solid #f5f5f5" }}
      onMouseEnter={e => e.target.style.background = "#f8f9ff"} onMouseLeave={e => e.target.style.background = "none"}>{label}</button>
  );
  const dropStyle = { position: "absolute", top: 48, right: 0, background: "#fff", borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.12)", border: "1px solid #e8edf5", minWidth: 210, overflow: "hidden", zIndex: 200 };
  if (user) {
    const initials = user.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
    return (
      <div ref={ref} style={{ position: "relative" }}>
        <button onClick={() => setOpen(!open)} style={{ width: 38, height: 38, borderRadius: "50%", background: "#003580", border: "none", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{initials}</button>
        {open && <div style={dropStyle}>{[item("My Trips", onTrips || (() => {})), item("My Bookings", onBookings), item("Settings", onSettings || (() => {})), item("Top Destinations", () => onPage("destinations")), item("Pricing", () => onPage("pricing")), item("How it works", () => onPage("howItWorks")), item("Help", () => onPage("help")), item("Sign out", onSignOut, true)]}</div>}
      </div>
    );
  }
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)} style={{ padding: "10px 20px", borderRadius: 6, background: "#003580", border: "none", color: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: "'DM Sans', sans-serif" }}>Account <span style={{ fontSize: 10, opacity: 0.7 }}>▼</span></button>
      {open && <div style={dropStyle}>{[onPlan && item("Plan my trip →", onPlan), item("Sign in", onSignIn), item("Create account", onSignUp), item("Top Destinations", () => onPage("destinations")), item("Pricing", () => onPage("pricing")), item("How it works", () => onPage("howItWorks")), item("Help", () => onPage("help"))].filter(Boolean)}</div>}
    </div>
  );
}

// ─── Page Shell ───────────────────────────────────────────────────────────────
function PageShell({ onHome, user, onSignIn, onSignUp, onBookings, onSignOut, onPage, onSettings, onTrips, children }) {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", background: "#ffffff", width: "100%" }}>
      <style>{`${FONTS} *{box-sizing:border-box;margin:0;padding:0;} html,body{background:#ffffff;width:100%;overflow-x:hidden;} #root{width:100%;}`}</style>
      <nav style={{ padding: "12px 5vw", minHeight: 72, display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)", borderBottom: "2px solid rgba(0,53,128,0.1)", position: "sticky", top: 0, zIndex: 100, width: "100%" }}>
        <div style={{ cursor: "pointer" }} onClick={onHome}><TripDoneLogo/></div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button onClick={onHome} className="nav-home-btn" style={{ padding: "9px 20px", borderRadius: 6, background: "transparent", border: "1.5px solid #003580", color: "#003580", fontSize: 13.5, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>← Home</button>
          <AccountDropdown user={user} onSignIn={onSignIn} onSignUp={onSignUp} onBookings={onBookings} onSignOut={onSignOut} onPage={onPage} onSettings={onSettings} onTrips={onTrips}/>
        </div>
      </nav>
      {children}
    </div>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", query: "" });
  const [sent, setSent] = useState(false), [sending, setSending] = useState(false);
  async function handleSubmit() {
    if (!form.name || !form.email || !form.query) return;
    setSending(true);
    try { await fetch(`https://formsubmit.co/ajax/tpritchard@tripdone.travel`, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ name: form.name, email: form.email, message: form.query, _subject: "TripDone Website Enquiry" }) }); setSent(true); } catch { setSent(true); } finally { setSending(false); }
  }
  if (sent) return <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: "20px 22px", textAlign: "center" }}><div style={{ fontSize: 22, marginBottom: 8 }}>✓</div><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "rgba(255,255,255,0.7)" }}>Thanks! We'll get back to you soon.</p></div>;
  const iStyle = { width: "100%", padding: "10px 14px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "#fff", fontSize: 13.5, fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <input placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={iStyle}/>
      <input placeholder="Email address" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={iStyle}/>
      <textarea placeholder="Your question or query..." value={form.query} onChange={e => setForm(f => ({ ...f, query: e.target.value }))} rows={3} style={{ ...iStyle, resize: "vertical" }}/>
      <button onClick={handleSubmit} disabled={!form.name || !form.email || !form.query || sending} style={{ padding: "10px 20px", borderRadius: 8, background: form.name && form.email && form.query && !sending ? "#0ea5e9" : "rgba(255,255,255,0.1)", border: "none", color: "#fff", fontSize: 13.5, fontWeight: 500, cursor: form.name && form.email && form.query ? "pointer" : "not-allowed" }}>{sending ? "Sending..." : "Send message →"}</button>
    </div>
  );
}

// ─── My Bookings ──────────────────────────────────────────────────────────────
function MyBookings({ user, onClose }) {
  const [tab, setTab] = useState("flights");
  const tabs = [{ key: "flights", label: "✈ Flights" }, { key: "stays", label: "🏨 Stays" }, { key: "activities", label: "🎯 Activities" }];
  return (
    <div style={{ position: "fixed", inset: 0, background: "#f8f9ff", zIndex: 999, overflowY: "auto" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 60px" }}>
        <div style={{ padding: "24px 0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e8edf5", marginBottom: 32 }}>
          <TripDoneLogo/><button onClick={onClose} style={{ padding: "9px 22px", borderRadius: 6, background: "#003580", border: "none", color: "#fff", fontSize: 13.5, fontWeight: 500, cursor: "pointer" }}>← Back</button>
        </div>
        <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 36, fontWeight: 300, color: "#1a1a1a", marginBottom: 4 }}>My Bookings</h1>
        <p style={{ fontSize: 14, color: "#888", marginBottom: 32 }}>Welcome back, {user.name}.</p>
        <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
          {tabs.map(t => <button key={t.key} onClick={() => setTab(t.key)} style={{ padding: "10px 22px", borderRadius: 8, border: `1.5px solid ${tab === t.key ? "#003580" : "#e0e6f0"}`, background: tab === t.key ? "#003580" : "#fff", color: tab === t.key ? "#fff" : "#555", fontSize: 14, cursor: "pointer" }}>{t.label}</button>)}
        </div>
        <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e8edf5", padding: "64px 32px", textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>{tab === "flights" ? "✈️" : tab === "stays" ? "🏨" : "🎯"}</div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 22, color: "#ccc", marginBottom: 8 }}>Nothing booked here yet</p>
          <button onClick={onClose} style={{ padding: "11px 28px", borderRadius: 8, background: "#003580", border: "none", color: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>Plan a trip →</button>
        </div>
      </div>
    </div>
  );
}

// ─── My Trips ─────────────────────────────────────────────────────────────────
function MyTrips({ user, onClose, onPlan }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "#f8f9ff", zIndex: 999, overflowY: "auto", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`${FONTS} *{box-sizing:border-box;margin:0;padding:0;}`}</style>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 60px" }}>
        <div style={{ padding: "24px 0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e8edf5", marginBottom: 32 }}>
          <TripDoneLogo/><button onClick={onClose} style={{ padding: "9px 22px", borderRadius: 6, background: "#003580", border: "none", color: "#fff", fontSize: 13.5, fontWeight: 500, cursor: "pointer" }}>← Back</button>
        </div>
        <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 36, fontWeight: 300, color: "#1a1a1a", marginBottom: 4 }}>My Trips</h1>
        <p style={{ fontSize: 14, color: "#888", marginBottom: 32 }}>Itineraries you've built — pick up where you left off.</p>
        <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e8edf5", padding: "64px 32px", textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🗺</div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 24, color: "#ccc", marginBottom: 8 }}>No trips yet</p>
          <button onClick={onPlan} style={{ padding: "12px 32px", borderRadius: 8, background: "#003580", border: "none", color: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>Plan a trip →</button>
        </div>
      </div>
    </div>
  );
}

// ─── Settings ─────────────────────────────────────────────────────────────────
function SettingsPage({ user, onClose, onSignOut }) {
  const [settings, setSettings] = useState({ darkMode: false, emailNotifications: true, dealAlerts: true, currency: "GBP", language: "English", units: "metric" });
  const [passport, setPassport] = useState({ firstName: "", lastName: "", dob: "", nationality: "", passportNumber: "", passportExpiry: "", knownTraveller: "" });
  const [saved, setSaved] = useState(false), [activeTab, setActiveTab] = useState("account");
  const set = setter => (k, v) => setter(prev => ({ ...prev, [k]: v }));
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const sStyle = { background: "#fff", borderRadius: 16, border: "1.5px solid #e8edf5", padding: "20px 22px", marginBottom: 14 };
  const lStyle = { fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#003580", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, marginBottom: 12, display: "block" };
  const iStyle = { width: "100%", padding: "10px 12px", border: "1.5px solid #e0e6f0", borderRadius: 10, fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "#1a1a1a", background: "#fafbff", outline: "none", boxSizing: "border-box" };
  const Toggle = ({ val, onChange, label, sub }) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid #f0f4ff" }}>
      <div><div style={{ fontSize: 14.5, fontWeight: 500, color: "#1a1a1a" }}>{label}</div>{sub && <div style={{ fontSize: 12, color: "#aaa", marginTop: 2 }}>{sub}</div>}</div>
      <div onClick={() => onChange(!val)} style={{ width: 44, height: 24, borderRadius: 12, background: val ? "#003580" : "#e0e6f0", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
        <div style={{ position: "absolute", top: 3, left: val ? 23 : 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }}/>
      </div>
    </div>
  );
  const Select = ({ val, onChange, options }) => <select value={val} onChange={e => onChange(e.target.value)} style={{ ...iStyle, appearance: "none", cursor: "pointer" }}>{options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select>;
  const tabs = [{ key: "account", label: "Account" }, { key: "passport", label: "Passport & ID" }, { key: "notifications", label: "Notifications" }];
  return (
    <div style={{ position: "fixed", inset: 0, background: "#f8f9ff", zIndex: 999, overflowY: "auto", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`${FONTS} *{box-sizing:border-box;margin:0;padding:0;}`}</style>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ padding: "24px 0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e8edf5", marginBottom: 32 }}>
          <TripDoneLogo/><button onClick={onClose} style={{ padding: "9px 22px", borderRadius: 6, background: "#003580", border: "none", color: "#fff", fontSize: 13.5, fontWeight: 500, cursor: "pointer" }}>← Back</button>
        </div>
        <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 32, fontWeight: 300, color: "#1a1a1a", marginBottom: 2 }}>Settings</h1>
        <p style={{ fontSize: 13, color: "#888", marginBottom: 20 }}>{user.name} · {user.email}</p>
        <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
          {tabs.map(t => <button key={t.key} onClick={() => setActiveTab(t.key)} style={{ padding: "9px 18px", borderRadius: 8, border: `1.5px solid ${activeTab === t.key ? "#003580" : "#e0e6f0"}`, background: activeTab === t.key ? "#003580" : "#fff", color: activeTab === t.key ? "#fff" : "#555", fontSize: 13.5, cursor: "pointer" }}>{t.label}</button>)}
        </div>
        {activeTab === "account" && <div>
          <div style={sStyle}><span style={lStyle}>Preferences</span>
            <div style={{ marginBottom: 14 }}><div style={{ fontSize: 13, color: "#888", marginBottom: 6 }}>Currency</div><Select val={settings.currency} onChange={v => set(setSettings)("currency", v)} options={[{ value: "GBP", label: "£ GBP" }, { value: "USD", label: "$ USD" }, { value: "EUR", label: "€ EUR" }, { value: "AUD", label: "A$ AUD" }]}/></div>
            <div><div style={{ fontSize: 13, color: "#888", marginBottom: 6 }}>Language</div><Select val={settings.language} onChange={v => set(setSettings)("language", v)} options={[{ value: "English", label: "English" }, { value: "French", label: "Français" }, { value: "Spanish", label: "Español" }]}/></div>
          </div>
          <div style={sStyle}><span style={lStyle}>Account actions</span><button onClick={() => { onSignOut(); onClose(); }} style={{ padding: "11px 24px", borderRadius: 8, background: "none", border: "1.5px solid #e74c3c", color: "#e74c3c", fontSize: 14, cursor: "pointer" }}>Sign out</button></div>
        </div>}
        {activeTab === "passport" && <div>
          <div style={sStyle}><span style={lStyle}>Passport details</span>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
              <div><div style={{ fontSize: 13, color: "#888", marginBottom: 6 }}>First name</div><input value={passport.firstName} onChange={e => set(setPassport)("firstName", e.target.value)} style={iStyle}/></div>
              <div><div style={{ fontSize: 13, color: "#888", marginBottom: 6 }}>Last name</div><input value={passport.lastName} onChange={e => set(setPassport)("lastName", e.target.value)} style={iStyle}/></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div><div style={{ fontSize: 13, color: "#888", marginBottom: 6 }}>Passport number</div><input value={passport.passportNumber} onChange={e => set(setPassport)("passportNumber", e.target.value)} style={iStyle}/></div>
              <div><div style={{ fontSize: 13, color: "#888", marginBottom: 6 }}>Expiry</div><input type="date" value={passport.passportExpiry} onChange={e => set(setPassport)("passportExpiry", e.target.value)} style={iStyle}/></div>
            </div>
          </div>
        </div>}
        {activeTab === "notifications" && <div style={sStyle}><span style={lStyle}>Email notifications</span>
          <Toggle val={settings.emailNotifications} onChange={v => set(setSettings)("emailNotifications", v)} label="Booking confirmations" sub="Receive email confirmations"/>
          <Toggle val={settings.dealAlerts} onChange={v => set(setSettings)("dealAlerts", v)} label="Deal alerts" sub="Get notified when prices drop"/>
          <Toggle val={false} onChange={() => {}} label="Trip reminders" sub="Reminders before upcoming trips"/>
        </div>}
        <div style={{ marginTop: 8 }}>
          <button onClick={handleSave} style={{ padding: "13px 36px", borderRadius: 10, background: "#003580", border: "none", color: "#fff", fontSize: 15, fontWeight: 500, cursor: "pointer" }}>{saved ? "Saved ✓" : "Save changes"}</button>
        </div>
      </div>
    </div>
  );
}

// ─── Booking Page (with pre-filled deep links) ────────────────────────────────
function BookingPage({ itinerary, answers, onBack, onHome }) {
  const [activeSection, setActiveSection] = useState("overview");
  const [activeDay, setActiveDay] = useState(0);
  const dest = encodeURIComponent(itinerary?.destination || "");
  const checkin = answers?.dates?.start || "";
  const checkout = answers?.dates?.end || "";
  const adults = (answers?.travellers?.adults || 0) + (answers?.travellers?.pensioners || 0) || 2;
  const children = answers?.travellers?.children || 0;

  const bookingLinks = [
    { label: "Hotels", platform: "Booking.com", color: "#003276", desc: itinerary?.hotel?.name ? `Search for ${itinerary.hotel.name}` : "Find your perfect stay", href: `https://www.booking.com/searchresults.html?ss=${dest}&checkin=${checkin}&checkout=${checkout}&group_adults=${adults}&group_children=${children}&aid=4297311` },
    { label: "Flights", platform: "Kiwi.com", color: "#00A991", desc: `Search flights to ${itinerary?.destination || "your destination"}`, href: `https://www.kiwi.com/en/search/results/anywhere/${dest}/${checkin}/${checkout}?affilid=4766423` },
    { label: "Flights & Hotels", platform: "Expedia UK", color: "#FFC72C", desc: "Compare flights and hotels together", href: `https://www.expedia.co.uk/Hotels-Search?destination=${dest}&startDate=${checkin}&endDate=${checkout}&adults=${adults}&affcid=5288967` },
    { label: "Flights", platform: "Momondo", color: "#6B0099", desc: `Find the cheapest flights to ${itinerary?.destination || "your destination"}`, href: `https://www.momondo.co.uk/flight-search/anywhere-${dest}/${checkin}/${checkout}?affiliate=5144959` },
    { label: "Activities", platform: "GetYourGuide", color: "#FF5533", desc: "Tours, experiences and day trips", href: `https://www.getyourguide.com/s/?q=${dest}&date_from=${checkin}&date_to=${checkout}&partner_id=5566445` },
    { label: "Flights & Hotels", platform: "Mytrip", color: "#1a1a6e", desc: "Compare flights and hotels in one place", href: `https://www.mytrip.com/flights/?destination=${dest}&departureDate=${checkin}&cjsid=7122258` },
    { label: "Transfers & Hotels", platform: "Trip.com", color: "#0086F6", desc: "Airport transfers, hotels and car hire", href: `https://www.trip.com/search/?query=${dest}&checkin=${checkin}&checkout=${checkout}&Allianceid=4368684` },
    { label: "Travel Insurance", platform: "World Nomads", color: "#E8463A", desc: "Travel insurance for adventurous travellers", href: `https://www.worldnomads.com/travel-insurance/?affiliate=6159036` },
    { label: "Vacation rentals", platform: "Airbnb", color: "#FF5A5F", desc: "Apartments, villas and unique stays", href: `https://www.airbnb.com/s/${dest}/homes?checkin=${checkin}&checkout=${checkout}&adults=${adults}` },
  ];
  const sections = [{ id: "overview", label: "Overview" }, { id: "days", label: "Day by Day" }, { id: "stay", label: "Where to Stay" }, { id: "book", label: "Book It" }];
  return (
    <div style={{ minHeight: "100vh", background: "#f8f9ff", fontFamily: "'DM Sans', sans-serif", width: "100%" }}>
      <style>{`${FONTS} *{box-sizing:border-box;margin:0;padding:0;} html,body{background:#f8f9ff;width:100%;overflow-x:hidden;} @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <nav style={{ padding: "12px 5vw", minHeight: 72, display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)", borderBottom: "2px solid rgba(0,53,128,0.1)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ cursor: "pointer" }} onClick={onHome}><TripDoneLogo/></div>
        <button onClick={onBack} style={{ padding: "9px 20px", borderRadius: 6, background: "transparent", border: "1.5px solid #003580", color: "#003580", fontSize: 13.5, fontWeight: 500, cursor: "pointer" }}>← Back to itinerary</button>
      </nav>
      <div style={{ background: "linear-gradient(135deg, #003580 0%, #0c4a8a 100%)", padding: "52px 5vw 0", width: "100%" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 300, color: "#fff", marginBottom: 8, lineHeight: 1.1 }}>{itinerary?.destination || "Your Trip"}</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.65)", fontSize: 18, marginBottom: 28 }}>{itinerary?.tagline}</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
            {[{ label: "Duration", value: itinerary?.duration || `${itinerary?.days?.length || 0} days` }, { label: "Stay", value: itinerary?.hotel?.name || "—" }, { label: "Est. hotel", value: itinerary?.hotel?.priceRange || "—" }].map(s => (
              <div key={s.label} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: "10px 16px", backdropFilter: "blur(8px)" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 3 }}>{s.label}</div>
                <div style={{ fontSize: 13.5, color: "#fff", fontWeight: 500 }}>{s.value}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 4, borderBottom: "1px solid rgba(255,255,255,0.15)", paddingBottom: 0 }}>
            {sections.map(s => <button key={s.id} onClick={() => setActiveSection(s.id)} style={{ padding: "10px 20px", background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, fontWeight: activeSection === s.id ? 600 : 400, color: activeSection === s.id ? "#fff" : "rgba(255,255,255,0.5)", borderBottom: activeSection === s.id ? "2px solid #fff" : "2px solid transparent", marginBottom: -1 }}>{s.label}</button>)}
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 5vw 100px" }}>
        {activeSection === "overview" && (
          <div style={{ animation: "fadeUp 0.3s ease" }}>
            {itinerary?.practicalInfo && (
              <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e8edf5", padding: "24px 26px", marginBottom: 16 }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 22, fontWeight: 400, color: "#1a1a1a", marginBottom: 16 }}>Trip at a glance</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                  {[{ label: "Getting around", value: itinerary.practicalInfo.bestTransport }, { label: "Must book ahead", value: itinerary.practicalInfo.mustBook }, { label: "Packing tip", value: itinerary.practicalInfo.packingTip }].filter(i => i.value).map(item => (
                    <div key={item.label} style={{ background: "#f8f9ff", borderRadius: 10, padding: "14px 16px" }}>
                      <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#003580", marginBottom: 6, fontWeight: 600 }}>{item.label}</div>
                      <div style={{ fontSize: 13.5, color: "#444", lineHeight: 1.5 }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {itinerary?.packingList && (
              <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e8edf5", padding: "24px 26px", marginBottom: 16 }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 22, fontWeight: 400, color: "#1a1a1a", marginBottom: 16 }}>Packing list</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20 }}>
                  {[{ title: "Essentials", items: itinerary.packingList.essentials }, { title: "Clothing", items: itinerary.packingList.clothing }, { title: "Extras", items: itinerary.packingList.extras }].map(cat => (
                    <div key={cat.title}>
                      <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#003580", marginBottom: 10, fontWeight: 600 }}>{cat.title}</div>
                      {(cat.items || []).map(item => <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}><div style={{ width: 6, height: 6, borderRadius: "50%", background: "#003580", flexShrink: 0 }}/><span style={{ fontSize: 13.5, color: "#444" }}>{item}</span></div>)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {activeSection === "days" && (
          <div style={{ animation: "fadeUp 0.3s ease", display: "grid", gridTemplateColumns: "200px 1fr", gap: 24, alignItems: "start" }}>
            <div style={{ background: "#fff", borderRadius: 14, border: "1.5px solid #e8edf5", overflow: "hidden", position: "sticky", top: 96 }}>
              {(itinerary?.days || []).map((day, i) => (
                <button key={i} onClick={() => setActiveDay(i)} style={{ width: "100%", padding: "14px 16px", background: activeDay === i ? "#003580" : "none", border: "none", borderBottom: "1px solid #f0f4ff", cursor: "pointer", textAlign: "left" }}>
                  <div style={{ fontSize: 11, color: activeDay === i ? "rgba(255,255,255,0.6)" : "#aaa", marginBottom: 2 }}>Day {day.day}</div>
                  <div style={{ fontSize: 13, color: activeDay === i ? "#fff" : "#1a1a1a", fontWeight: 500, lineHeight: 1.3 }}>{day.theme}</div>
                </button>
              ))}
            </div>
            {itinerary?.days?.[activeDay] && (
              <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e8edf5", padding: "28px 32px" }}>
                <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#003580", marginBottom: 6 }}>Day {itinerary.days[activeDay].day}</div>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 28, fontWeight: 400, color: "#1a1a1a", marginBottom: 24 }}>{itinerary.days[activeDay].theme}</h2>
                {[{ label: "Morning", icon: "☀️", value: itinerary.days[activeDay].morning }, { label: "Afternoon", icon: "⛅", value: itinerary.days[activeDay].afternoon }, { label: "Evening", icon: "🌙", value: itinerary.days[activeDay].evening }, { label: "Getting around", icon: "🚌", value: itinerary.days[activeDay].transport }].map(item => (
                  <div key={item.label} style={{ display: "flex", gap: 14, marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid #f0f4ff" }}>
                    <div style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{item.icon}</div>
                    <div><div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", marginBottom: 4 }}>{item.label}</div><div style={{ fontSize: 14.5, color: "#333", lineHeight: 1.6 }}>{item.value}</div></div>
                  </div>
                ))}
                <div style={{ background: "#eef3ff", borderRadius: 10, padding: "14px 18px", borderLeft: "3px solid #003580" }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#003580", marginBottom: 4 }}>Insider tip</div>
                  <div style={{ fontSize: 14, color: "#003580", lineHeight: 1.6 }}>{itinerary.days[activeDay].insiderTip}</div>
                </div>
              </div>
            )}
          </div>
        )}
        {activeSection === "stay" && (
          <div style={{ animation: "fadeUp 0.3s ease" }}>
            <div style={{ background: "#1a1a1a", borderRadius: 16, padding: "32px 36px", marginBottom: 20 }}>
              <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#0ea5e9", marginBottom: 8 }}>Recommended stay</div>
              <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 32, color: "#fff", fontWeight: 300, marginBottom: 6 }}>{itinerary?.hotel?.name}</h2>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>{itinerary?.hotel?.area}</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: 20 }}>{itinerary?.hotel?.description}</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                <span style={{ fontSize: 22, color: "#0ea5e9", fontWeight: 600 }}>{itinerary?.hotel?.priceRange}</span>
                <a href={`https://www.booking.com/searchresults.html?ss=${dest}&aid=4297311`} target="_blank" rel="noopener noreferrer" style={{ padding: "12px 28px", borderRadius: 8, background: "#0ea5e9", color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>Search on Booking.com →</a>
              </div>
            </div>
            {itinerary?.alternatives && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[{ tier: "Budget option", data: itinerary.alternatives.budget }, { tier: "Luxury option", data: itinerary.alternatives.luxury }].map(({ tier, data }) => data ? (
                  <div key={tier} style={{ background: "#fff", borderRadius: 14, border: "1.5px solid #e8edf5", padding: "22px 24px" }}>
                    <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#003580", marginBottom: 8, fontWeight: 600 }}>{tier}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, color: "#1a1a1a", marginBottom: 4 }}>{data.hotel}</div>
                    <div style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>{data.area}</div>
                    <div style={{ fontSize: 15, color: "#0ea5e9", fontWeight: 600, marginBottom: 10 }}>{data.priceRange}</div>
                    <div style={{ fontSize: 13, color: "#666", lineHeight: 1.5 }}>{data.note}</div>
                  </div>
                ) : null)}
              </div>
            )}
          </div>
        )}
        {activeSection === "book" && (
          <div style={{ animation: "fadeUp 0.3s ease" }}>
            <p style={{ fontSize: 15, color: "#888", marginBottom: 28, lineHeight: 1.7 }}>Everything you need to book your trip — all pre-filled for {itinerary?.destination}.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
              {bookingLinks.map(b => (
                <a key={b.label} href={b.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", borderRadius: 14, padding: "20px 24px", border: "1.5px solid #e0e6f0", transition: "box-shadow 0.2s, border-color 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,53,128,0.1)"; e.currentTarget.style.borderColor = "#003580"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#e0e6f0"; }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 500, color: "#1a1a1a", marginBottom: 2 }}>{b.label}</div>
                    <div style={{ fontSize: 13, color: "#888" }}>{b.desc}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 12, color: "#aaa" }}>via {b.platform}</span>
                    <div style={{ background: b.color, color: "#fff", borderRadius: 8, padding: "8px 18px", fontSize: 13.5, fontWeight: 500 }}>Book →</div>
                  </div>
                </a>
              ))}
            </div>
            <div style={{ background: "#eef3ff", borderRadius: 12, padding: "16px 20px", fontSize: 13, color: "#003580", lineHeight: 1.6 }}>
              ✦ <strong>TripDone earns a small commission</strong> when you book through these links — at no extra cost to you.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Pricing Page ─────────────────────────────────────────────────────────────
function PricingPage({ onHome, user, onSignIn, onSignUp, onBookings, onSignOut, onPage, onPlan, onSettings, onTrips }) {
  return (
    <PageShell onHome={onHome} user={user} onSignIn={onSignIn} onSignUp={onSignUp} onBookings={onBookings} onSignOut={onSignOut} onPage={onPage} onSettings={onSettings} onTrips={onTrips}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "80px 5vw 120px" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 300, color: "#1a1a1a", lineHeight: 1.1, marginBottom: 20 }}>Always free.<br/><span style={{ color: "#003580", fontWeight: 600 }}>No hidden costs.</span></h1>
          <p style={{ fontSize: 18, color: "#666", maxWidth: 580, margin: "0 auto", lineHeight: 1.8, fontWeight: 300 }}>Planning your perfect trip shouldn't cost a penny. TripDone is completely free to use — every itinerary, every recommendation, every insider tip.</p>
        </div>
        <div style={{ background: "#003580", borderRadius: 20, padding: "56px 48px", textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 80, fontWeight: 300, color: "#fff", lineHeight: 1, marginBottom: 8 }}>£0</div>
          <div style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", marginBottom: 40, fontWeight: 300 }}>Forever. No subscription. No credit card.</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 48 }}>
            {["AI-generated itineraries", "Day-by-day planning", "Hotel recommendations", "Insider tips & hidden gems", "Chat refinement", "Packing lists"].map(f => (
              <div key={f} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: "14px 18px", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#0ea5e9", fontSize: 16 }}>✓</span><span style={{ fontSize: 13.5, color: "rgba(255,255,255,0.8)" }}>{f}</span>
              </div>
            ))}
          </div>
          <button onClick={onPlan} style={{ padding: "16px 44px", borderRadius: 8, background: "#fff", border: "none", color: "#003580", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Start planning for free →</button>
        </div>
        <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e8edf5", padding: "40px 44px" }}>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 28, fontWeight: 400, color: "#1a1a1a", marginBottom: 16 }}>So how does TripDone work?</h2>
          <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8, marginBottom: 16, fontWeight: 300 }}>We earn a small commission when you choose to book flights, hotels, or activities through our recommended links — at no extra cost to you whatsoever.</p>
          <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8, fontWeight: 300 }}>This model means our interests are completely aligned with yours. No paywalls, no upsells, no surprises — just great travel planning, completely free.</p>
        </div>
      </div>
    </PageShell>
  );
}

// ─── How It Works Page ────────────────────────────────────────────────────────
function HowItWorksPage({ onHome, user, onSignIn, onSignUp, onBookings, onSignOut, onPage, onPlan, onSettings, onTrips }) {
  const steps = [
    { num: "01", title: "Tell us about your trip", body: "Answer a handful of smart questions — where you want to go, your dates, who's travelling, your budget, and what you love. It takes under two minutes.", img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80" },
    { num: "02", title: "We build your itinerary", body: "Our AI gets to work instantly. It draws on a vast knowledge of destinations, hotels, local experiences and hidden gems to craft a complete day-by-day plan tailored precisely to you.", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80" },
    { num: "03", title: "Review and refine", body: "Your itinerary is yours to shape. Read through every day, every recommendation, every insider tip. Want to swap a restaurant, slow down the pace, or add an extra day? Just ask.", img: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800&q=80" },
    { num: "04", title: "Book in one place", body: "Every booking link is pre-filled and ready to go. Flights, hotels, tours, restaurants — all the platforms you already trust, surfaced in one clean screen.", img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80" },
  ];
  return (
    <PageShell onHome={onHome} user={user} onSignIn={onSignIn} onSignUp={onSignUp} onBookings={onBookings} onSignOut={onSignOut} onPage={onPage} onSettings={onSettings} onTrips={onTrips}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "80px 5vw 120px" }}>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 300, color: "#1a1a1a", lineHeight: 1.1, marginBottom: 20 }}>From idea to itinerary<br/><span style={{ color: "#003580", fontWeight: 600 }}>in minutes.</span></h1>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          {steps.map((s, i) => (
            <div key={s.num} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
              <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
                <div style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "#003580", marginBottom: 12 }}>Step {s.num}</div>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 36, fontWeight: 300, color: "#1a1a1a", marginBottom: 16, lineHeight: 1.2 }}>{s.title}</h2>
                <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8, fontWeight: 300 }}>{s.body}</p>
              </div>
              <div style={{ order: i % 2 === 0 ? 1 : 0 }}><div style={{ borderRadius: 16, overflow: "hidden", height: 280, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}><img src={s.img} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover" }}/></div></div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 80 }}>
          <button onClick={onPlan} style={{ padding: "16px 48px", borderRadius: 8, background: "#003580", border: "none", color: "#fff", fontSize: 16, fontWeight: 500, cursor: "pointer", boxShadow: "0 8px 32px rgba(0,53,128,0.3)" }}>Try it now — it's free →</button>
        </div>
      </div>
    </PageShell>
  );
}

// ─── Destinations Page ────────────────────────────────────────────────────────
function DestinationsPage({ onHome, user, onSignIn, onSignUp, onBookings, onSignOut, onPage, onPlan, onSettings, onTrips }) {
  return (
    <PageShell onHome={onHome} user={user} onSignIn={onSignIn} onSignUp={onSignUp} onBookings={onBookings} onSignOut={onSignOut} onPage={onPage} onSettings={onSettings} onTrips={onTrips}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 5vw 120px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 300, color: "#1a1a1a", lineHeight: 1.1, marginBottom: 20 }}>Where do you want<br/><span style={{ color: "#003580", fontWeight: 600 }}>to go next?</span></h1>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
          {DESTINATIONS_DATA.map((d) => (
            <div key={d.name} onClick={onPlan} style={{ borderRadius: 16, overflow: "hidden", position: "relative", height: 320, boxShadow: "0 8px 32px rgba(0,0,0,0.1)", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.18)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.1)"; }}>
              <img src={d.photo} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}/>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.05) 60%)" }}/>
              <div style={{ position: "absolute", top: 16, left: 16 }}><span style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", color: "#fff", fontSize: 11, padding: "4px 10px", borderRadius: 20 }}>{d.tag}</span></div>
              <div style={{ position: "absolute", bottom: 22, left: 22, right: 22 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 24, fontWeight: 400, color: "#fff", marginBottom: 6 }}>{d.name}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.5, marginBottom: 10 }}>{d.desc}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>✦ Recommended: {d.duration}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

// ─── Blog ─────────────────────────────────────────────────────────────────────
function BlogPage({ onHome, user, onSignIn, onSignUp, onBookings, onSignOut, onPage, onSettings, onTrips }) {
  const [post, setPost] = useState(null);
  if (post) return (
    <PageShell onHome={onHome} user={user} onSignIn={onSignIn} onSignUp={onSignUp} onBookings={onBookings} onSignOut={onSignOut} onPage={onPage} onSettings={onSettings} onTrips={onTrips}>
      <div style={{ maxWidth: 740, margin: "0 auto", padding: "60px 5vw 120px" }}>
        <button onClick={() => setPost(null)} style={{ background: "none", border: "none", color: "#003580", cursor: "pointer", fontSize: 14, marginBottom: 32, padding: 0 }}>← Back to blog</button>
        <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#003580", marginBottom: 12 }}>{post.category}</div>
        <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 300, color: "#1a1a1a", lineHeight: 1.1, marginBottom: 12 }}>{post.title}</h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, color: "#888", marginBottom: 24 }}>{post.subtitle}</p>
        <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 36 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#003580", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600 }}>TP</div>
          <div><div style={{ fontSize: 13.5, fontWeight: 500, color: "#1a1a1a" }}>{post.author}</div><div style={{ fontSize: 12, color: "#aaa" }}>{post.date}</div></div>
        </div>
        <div style={{ borderRadius: 16, overflow: "hidden", height: 360, marginBottom: 48, boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}>
          <img src={post.photo} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
        </div>
        {post.body.split("\n\n").map((p, i) => <p key={i} style={{ fontSize: 16, color: "#333", lineHeight: 1.9, marginBottom: 24, fontWeight: 300 }}>{p}</p>)}
      </div>
    </PageShell>
  );
  return (
    <PageShell onHome={onHome} user={user} onSignIn={onSignIn} onSignUp={onSignUp} onBookings={onBookings} onSignOut={onSignOut} onPage={onPage} onSettings={onSettings} onTrips={onTrips}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 5vw 120px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(40px, 5vw, 68px)", fontWeight: 300, color: "#1a1a1a", lineHeight: 1.1 }}>Stories, tips &<br/><span style={{ color: "#003580", fontWeight: 600 }}>travel inspiration.</span></h1>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 28 }}>
          {BLOG_POSTS.map(p => (
            <div key={p.slug} onClick={() => setPost(p)} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.07)", cursor: "pointer", transition: "transform 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              <div style={{ height: 220, overflow: "hidden" }}><img src={p.photo} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }}/></div>
              <div style={{ padding: "24px 26px 28px" }}>
                <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#003580", marginBottom: 10 }}>{p.category}</div>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 26, fontWeight: 400, color: "#1a1a1a", marginBottom: 8, lineHeight: 1.2 }}>{p.title}</h2>
                <p style={{ fontSize: 13.5, color: "#777", lineHeight: 1.6, marginBottom: 20 }}>{p.subtitle}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "#aaa" }}>{p.date} · {p.author}</span>
                  <span style={{ fontSize: 13, color: "#003580", fontWeight: 500 }}>Read →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

// ─── Help Page ────────────────────────────────────────────────────────────────
function HelpPage({ onHome, user, onSignIn, onSignUp, onBookings, onSignOut, onPage, onSettings, onTrips }) {
  const [open, setOpen] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", query: "" }), [sent, setSent] = useState(false), [sending, setSending] = useState(false);
  async function handleSubmit() {
    if (!form.name || !form.email || !form.query) return;
    setSending(true);
    try { await fetch("https://formsubmit.co/ajax/help@tripdone.travel", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ name: form.name, email: form.email, message: form.query, _subject: "TripDone Help Request" }) }); setSent(true); } catch { setSent(true); } finally { setSending(false); }
  }
  const iStyle = { width: "100%", padding: "11px 14px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" };
  return (
    <PageShell onHome={onHome} user={user} onSignIn={onSignIn} onSignUp={onSignUp} onBookings={onBookings} onSignOut={onSignOut} onPage={onPage} onSettings={onSettings} onTrips={onTrips}>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "80px 5vw 120px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(40px, 5vw, 68px)", fontWeight: 300, color: "#1a1a1a", lineHeight: 1.1, marginBottom: 16 }}>How can we<br/><span style={{ color: "#003580", fontWeight: 600 }}>help you?</span></h1>
        </div>
        <div style={{ background: "#003580", borderRadius: 20, padding: "48px 44px", marginBottom: 72 }}>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 32, fontWeight: 300, color: "#fff", marginBottom: 8 }}>Need help?</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 28 }}>Send us a message and we'll get back to you as soon as possible.</p>
          {sent ? <div style={{ textAlign: "center", padding: "20px 0" }}><div style={{ fontSize: 32, marginBottom: 12 }}>✓</div><p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)" }}>Message sent!</p></div> : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={iStyle}/>
              <input placeholder="Email address" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={iStyle}/>
              <textarea placeholder="How can we help?" value={form.query} onChange={e => setForm(f => ({ ...f, query: e.target.value }))} rows={4} style={{ ...iStyle, resize: "vertical" }}/>
              <button onClick={handleSubmit} disabled={!form.name || !form.email || !form.query || sending} style={{ padding: "12px 28px", borderRadius: 10, background: form.name && form.email && form.query && !sending ? "#fff" : "rgba(255,255,255,0.2)", border: "none", color: form.name && form.email && form.query ? "#003580" : "rgba(255,255,255,0.4)", fontSize: 14, fontWeight: 600, cursor: "pointer", alignSelf: "flex-start" }}>{sending ? "Sending..." : "Send message →"}</button>
            </div>
          )}
        </div>
        <div style={{ marginBottom: 72 }}>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 28, fontWeight: 400, color: "#1a1a1a", marginBottom: 24 }}>Frequently asked questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ background: "#fff", border: "1.5px solid #e8edf5", borderRadius: 12, overflow: "hidden" }}>
                <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 16 }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 500, color: "#1a1a1a" }}>{faq.q}</span>
                  <span style={{ color: "#003580", fontSize: 20, flexShrink: 0, transition: "transform 0.2s", transform: open === i ? "rotate(180deg)" : "none" }}>⌄</span>
                </button>
                {open === i && <div style={{ padding: "0 24px 20px" }}><div style={{ height: 1, background: "#e8edf5", marginBottom: 16 }}/><p style={{ fontSize: 14.5, color: "#555", lineHeight: 1.7 }}>{faq.a}</p></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function RoamHomepage() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [authModal, setAuthModal] = useState(null);
  const [itinerary, setItinerary] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showSettings, setShowSettings] = useState(false);
  const [showTrips, setShowTrips] = useState(false);

  const goHome = () => { setPage("home"); setShowSettings(false); setShowTrips(false); };
  const goPage = p => setPage(p);
  const sharedProps = {
    user, onSignIn: () => setAuthModal("signin"), onSignUp: () => setAuthModal("signup"),
    onBookings: () => user ? setPage("bookings") : setAuthModal("signin"),
    onSignOut: () => setUser(null), onPage: goPage, onHome: goHome,
    onSettings: () => setShowSettings(true),
    onTrips: () => user ? setShowTrips(true) : setAuthModal("signin"),
  };

  if (showTrips && user) return <MyTrips user={user} onClose={() => setShowTrips(false)} onPlan={() => { setShowTrips(false); setPage("app"); }}/>;
  if (showSettings && user) return <SettingsPage user={user} onClose={() => setShowSettings(false)} onSignOut={() => { setUser(null); setShowSettings(false); }}/>;
  if (authModal) return <div style={{ position: "fixed", inset: 0, zIndex: 1000 }}><AuthModal mode={authModal} onClose={() => setAuthModal(null)} onAuth={u => { setUser(u); setAuthModal(null); }}/></div>;
  if (page === "bookings" && user) return <MyBookings user={user} onClose={goHome}/>;
  if (page === "pricing") return <PricingPage {...sharedProps} onPlan={() => setPage("app")}/>;
  if (page === "howItWorks") return <HowItWorksPage {...sharedProps} onPlan={() => setPage("app")}/>;
  if (page === "destinations") return <DestinationsPage {...sharedProps} onPlan={() => setPage("app")}/>;
  if (page === "blog") return <BlogPage {...sharedProps}/>;
  if (page === "help") return <HelpPage {...sharedProps}/>;
  if (page === "booking") return <BookingPage itinerary={itinerary} answers={answers} onBack={() => setPage("app")} onHome={goHome}/>;

  if (page === "app") {
    return (
      <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", background: "#f8f9ff", width: "100%" }}>
        <style>{`${FONTS} *{box-sizing:border-box;margin:0;padding:0;} html,body{background:#f8f9ff;width:100%;overflow-x:hidden;} #root{width:100%;}`}</style>
        <nav style={{ padding: "12px 5vw", minHeight: 72, display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)", borderBottom: "2px solid rgba(0,53,128,0.1)", position: "sticky", top: 0, zIndex: 100, width: "100%" }}>
          <div style={{ cursor: "pointer" }} onClick={goHome}><TripDoneLogo/></div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button onClick={goHome} className="nav-home-btn" style={{ padding: "9px 22px", borderRadius: 6, background: "transparent", border: "1.5px solid #003580", color: "#003580", fontSize: 13.5, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>← Home</button>
            <AccountDropdown {...sharedProps}/>
          </div>
        </nav>
        <RoamApp onItineraryReady={(itin, ans) => { setItinerary(itin); setAnswers(ans); }} onBookNow={() => setPage("booking")}/>
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
        @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-25%) } }
        @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-7px)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #003580; border-radius: 2px; }
        .footer-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1.2fr; gap: 48px; }
        .audience-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .example-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .packing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .nav-plan-btn { display: inline-flex; }
        .nav-home-btn { display: inline-flex; }
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 700px) {
          .steps-grid { grid-template-columns: 1fr 1fr; gap: 14px; }
          .example-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr; }
          .nav-plan-btn { display: none !important; }
          .nav-home-btn { display: none !important; }
          .audience-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
          .audience-grid .audience-card { height: 140px !important; border-radius: 12px !important; }
          .steps-grid { grid-template-columns: 1fr; gap: 12px; }
          .steps-grid > div > div { padding: 20px 18px !important; }
          .example-grid { grid-template-columns: 1fr; }
          .packing-grid { grid-template-columns: 1fr; gap: 12px; }
        }
      `}</style>

      {authModal && <AuthModal mode={authModal} onClose={() => setAuthModal(null)} onAuth={u => { setUser(u); setAuthModal(null); }}/>}

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "12px 5vw", minHeight: 68, display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: "2px solid rgba(0,53,128,0.1)" }}>
        <div style={{ cursor: "pointer" }} onClick={goHome}><TripDoneLogo/></div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button onClick={setShowApp} className="nav-plan-btn" style={{ padding: "10px 26px", borderRadius: 6, background: "#003580", border: "none", color: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer", boxShadow: "0 4px 16px rgba(0,53,128,0.35)" }}>Plan my trip</button>
          <AccountDropdown {...sharedProps} onPlan={setShowApp}/>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ minHeight: "100vh", background: "#ffffff", display: "flex", flexDirection: "column", overflow: "hidden", width: "100%" }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "100%", maxWidth: 1100, margin: "0 auto", textAlign: "center", padding: "100px 4vw 20px" }}>
            <p style={{ fontSize: "clamp(14px, 1.8vw, 22px)", letterSpacing: "0.25em", textTransform: "uppercase", color: "#003580", marginBottom: 16, fontWeight: 600 }}>AI-Powered Travel Agent</p>
            <h1 className="hero-h1" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(34px, 4.5vw, 68px)", fontWeight: 300, color: "#1a1a1a", lineHeight: 1.15, marginBottom: 24 }}>Your Perfect Trip,<br/><span style={{ color: "#003580", fontWeight: 600 }}>Planned For You.</span></h1>
            <p style={{ fontSize: "clamp(17px, 1.6vw, 22px)", color: "#666", maxWidth: 600, margin: "0 auto 14px", lineHeight: 1.7, fontWeight: 300 }}>Tell us where you want to go and what you love. We'll handle everything else.</p>
            <p style={{ fontSize: "clamp(15px, 1.4vw, 18px)", color: "#003580", maxWidth: 580, margin: "0 auto 36px", fontWeight: 600, letterSpacing: "0.03em" }}>All your favourite travel sites — in one place. Free forever.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={setShowApp} style={{ padding: "15px 36px", borderRadius: 6, background: "#003580", border: "none", color: "#fff", fontSize: 16, fontWeight: 500, cursor: "pointer", boxShadow: "0 8px 32px rgba(0,53,128,0.3)" }}>Plan My Trip For Free →</button>
              <button onClick={() => setPage("howItWorks")} style={{ padding: "15px 36px", borderRadius: 6, background: "transparent", border: "1.5px solid #003580", color: "#003580", fontSize: 16, fontWeight: 400, cursor: "pointer" }}>See How It Works</button>
            </div>
          </div>
        </div>
        {/* Ticker — pinned to bottom of hero viewport */}
        <div style={{ position: "sticky", bottom: 0, background: "#003580", padding: "14px 0", overflow: "hidden", zIndex: 10 }}>
          <div style={{ overflow: "hidden", position: "relative" }}>
            <div style={{ display: "flex", animation: "ticker 20s linear infinite", whiteSpace: "nowrap", width: "max-content" }}>
              {[...PLATFORMS, ...PLATFORMS, ...PLATFORMS, ...PLATFORMS].map((p, i) => <span key={i} style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7ab8e8", padding: "0 24px", display: "inline-block" }}>{p} <span style={{ color: "#4a90c4" }}>◆</span></span>)}
            </div>
          </div>
        </div>
      </div>

      {/* WHY TRIPDONE */}
      <section style={{ padding: "120px 5vw", maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <p style={{ fontSize: 12, letterSpacing: "0.2em", color: "#003580", textTransform: "uppercase", marginBottom: 12 }}>Why TripDone</p>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(34px, 4vw, 60px)", fontWeight: 300, lineHeight: 1.2, color: "#1a1a1a", marginBottom: 28 }}>Travel should feel like an escape,<br/><em>not a second job.</em></h2>
          <p style={{ fontSize: "clamp(15px, 1.4vw, 18px)", color: "#666", lineHeight: 1.8, maxWidth: 680, margin: "0 auto 48px", fontWeight: 300 }}>Most people spend more time planning their holiday than enjoying it. TripDone changes that. Our AI builds your entire trip in minutes — every hotel, every day, every booking link — all in one place.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, textAlign: "left" }}>
            {[{ title: "Saves you time", desc: "A full itinerary in under 2 minutes. What used to take hours of research is done before your coffee goes cold." }, { title: "Saves you money", desc: "We compare across all major booking platforms so you always get the best price — without the legwork." }, { title: "All in one place", desc: "Flights, hotels, activities, transfers — every platform you trust, surfaced in one clean screen." }].map(c => (
              <div key={c.title} style={{ background: "#fff", borderRadius: 14, border: "1.5px solid #e8edf5", padding: "24px 26px" }}>
                <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#003580", marginBottom: 10, fontWeight: 600 }}>{c.title}</div>
                <p style={{ fontSize: 14, color: "#555", lineHeight: 1.7, fontWeight: 300 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* WHO IT'S FOR */}
      <section style={{ padding: "0 5vw 120px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontSize: 12, letterSpacing: "0.2em", color: "#003580", textTransform: "uppercase", marginBottom: 12, textAlign: "center" }}>Who it's for</p>
            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 300, textAlign: "center", marginBottom: 52, color: "#1a1a1a" }}>Built for every kind of traveller</h2>
          </FadeIn>
          <div className="audience-grid">
            {AUDIENCE_DATA.map((a, i) => (
              <div key={a.label} style={{ opacity: 0, transform: "translateY(28px)", animation: `fadeUp 0.7s ease ${i * 0.08}s forwards` }}>
                <div className="audience-card" style={{ borderRadius: 14, overflow: "hidden", position: "relative", height: 340, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
                  <img src={a.photo} alt={a.label} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} onError={e => { e.target.style.display = "none"; }}/>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.1) 55%)" }}/>
                  <div style={{ position: "absolute", bottom: 22, left: 22, right: 22 }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 22, fontWeight: 400, color: "#fff", marginBottom: 6 }}>{a.label}</div>
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
            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(30px, 3.5vw, 48px)", fontWeight: 300, color: "#fff", textAlign: "center", marginBottom: 72 }}>From idea to itinerary<br/><span style={{ color: "#7ba4db", fontWeight: 600 }}>in minutes</span></h2>
          </FadeIn>
          <div className="steps-grid">
            {STEPS.map((s, i) => (
              <FadeIn key={s.num} delay={i * 0.12}>
                <div style={{ padding: "36px 32px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 52, fontWeight: 300, color: "#fff", lineHeight: 1, marginBottom: 20, opacity: 0.8 }}>{s.num}</div>
                  <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 22, fontWeight: 400, color: "#fff", marginBottom: 12, lineHeight: 1.3 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, fontWeight: 300 }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* EXAMPLE ITINERARY */}
      <section style={{ padding: "120px 5vw", background: "#f8f9ff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontSize: 12, letterSpacing: "0.2em", color: "#003580", textTransform: "uppercase", marginBottom: 10, textAlign: "center" }}>See it in action</p>
            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 300, color: "#1a1a1a", textAlign: "center", marginBottom: 52 }}>A real TripDone itinerary</h2>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div style={{ background: "#1a1a1a", borderRadius: 14, padding: "24px 28px", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
              <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#0ea5e9", marginBottom: 10 }}>📍 {EXAMPLE.destination} · {EXAMPLE.duration}</div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {EXAMPLE.locations.map((loc, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.07)", borderRadius: 10, padding: "10px 16px", flexShrink: 0 }}>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>📍 {loc.location} · {loc.nights} nights</div>
                    <div style={{ fontSize: 14, color: "#fff", fontWeight: 500 }}>{loc.hotel.name}</div>
                    <div style={{ fontSize: 12, color: "#0ea5e9", marginTop: 3 }}>{loc.hotel.priceRange}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
          <div className="example-grid">
            {EXAMPLE.days.map((day, i) => (
              <FadeIn key={day.day} delay={i * 0.1}>
                <div style={{ border: "1.5px solid #e0e6f0", borderRadius: 14, padding: "22px 24px", background: "#fff", height: "100%", display: "flex", flexDirection: "column" }}>
                  {/* Header */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#003580", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, flexShrink: 0 }}>{day.day}</div>
                    {day.isTravel && <span style={{ fontSize: 10, background: "#003580", color: "#fff", borderRadius: 4, padding: "2px 7px", fontWeight: 600, letterSpacing: "0.05em" }}>TRAVEL DAY</span>}
                    <span style={{ fontSize: 11, color: "#003580", fontWeight: 500 }}>📍 {day.location}</span>
                    <div style={{ fontSize: 13, color: "#888", width: "100%", marginTop: 2 }}>{day.isTravel ? `${day.travelFrom} → ${day.travelTo}` : day.theme}</div>
                  </div>
                  {/* Travel banner */}
                  {day.isTravel && (
                    <div style={{ background: "#eef3ff", borderRadius: 8, padding: "10px 12px", marginBottom: 12, border: "1.5px solid #c7d9f5", display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 18 }}>🚄</span>
                      <div>
                        <div style={{ fontSize: 12.5, fontWeight: 600, color: "#003580" }}>{day.travelFrom} → {day.travelTo}</div>
                        <div style={{ fontSize: 11.5, color: "#4a72b0" }}>{day.travelMethod} · {day.travelDuration}</div>
                      </div>
                    </div>
                  )}
                  {/* Check-in */}
                  {day.checkin && (
                    <div style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "flex-start", background: "#f8f9ff", borderRadius: 8, padding: "8px 10px", border: "1px solid #e8edf5" }}>
                      <span style={{ fontSize: 13, flexShrink: 0 }}>🏨</span>
                      <span style={{ fontSize: 12, color: "#003580", lineHeight: 1.5, fontWeight: 500 }}>{day.checkin}</span>
                    </div>
                  )}
                  {/* Time slots — only show afternoon + evening on travel days to keep card height consistent */}
                  <div style={{ flex: 1 }}>
                    {(day.isTravel
                      ? [{ icon: "⛅", val: day.afternoon }, { icon: "🌙", val: day.evening }]
                      : [{ icon: "☀️", val: day.morning }, { icon: "⛅", val: day.afternoon }, { icon: "🌙", val: day.evening }]
                    ).map((item, j) => (
                      <div key={j} style={{ display: "flex", gap: 8, marginBottom: 9, alignItems: "flex-start" }}>
                        <span style={{ fontSize: 13, flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                        <span style={{ fontSize: 12.5, color: "#444", lineHeight: 1.5 }}>{item.val}</span>
                      </div>
                    ))}
                  </div>
                  {/* Transport */}
                  {day.transport && (
                    <div style={{ display: "flex", gap: 8, alignItems: "flex-start", margin: "10px 0", padding: "8px 10px", background: "#fff8ee", borderRadius: 8, border: "1px solid #f0e0c0" }}>
                      <span style={{ fontSize: 13, flexShrink: 0, marginTop: 1 }}>🚌</span>
                      <span style={{ fontSize: 12, color: "#7a5010", lineHeight: 1.5 }}>{day.transport}</span>
                    </div>
                  )}
                  {/* Insider tip */}
                  <div style={{ marginTop: 10, padding: "10px 12px", background: "#eef3ff", borderRadius: 8, borderLeft: "3px solid #003580" }}>
                    <span style={{ fontSize: 11.5, color: "#003580", lineHeight: 1.5 }}>✦ {day.insiderTip}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}><div style={{ textAlign: "center", marginTop: 52 }}><button onClick={setShowApp} style={{ padding: "16px 44px", borderRadius: 6, background: "#003580", border: "none", color: "#fff", fontSize: 15, fontWeight: 500, cursor: "pointer", boxShadow: "0 8px 32px rgba(0,53,128,0.3)" }}>Build my trip like this →</button></div></FadeIn>
        </div>
      </section>

      {/* TESTIMONIALS (NEW) */}
      <section style={{ padding: "120px 5vw", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontSize: 12, letterSpacing: "0.2em", color: "#003580", textTransform: "uppercase", marginBottom: 12, textAlign: "center" }}>What travellers say</p>
            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 300, color: "#1a1a1a", textAlign: "center", marginBottom: 60 }}>Trips people actually<br/><em>loved.</em></h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {TESTIMONIALS.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.08}>
                <div style={{ background: "#f8f9ff", borderRadius: 16, padding: "28px 26px", border: "1.5px solid #e8edf5", height: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: 32, color: "#003580", lineHeight: 1, marginBottom: 16, fontFamily: "'DM Sans', sans-serif", opacity: 0.4 }}>"</div>
                  <p style={{ fontSize: 14.5, color: "#333", lineHeight: 1.8, fontWeight: 300, flex: 1, marginBottom: 20 }}>{t.text}</p>
                  <div style={{ borderTop: "1px solid #e8edf5", paddingTop: 16, display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#003580", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, flexShrink: 0 }}>{t.initials}</div>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 500, color: "#1a1a1a" }}>{t.name}</div>
                      <div style={{ fontSize: 11.5, color: "#aaa" }}>{t.location} · {t.trip}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ overflow: "hidden", margin: "0 5vw 80px", borderRadius: 20, background: "#003580" }}>
        <div style={{ padding: "100px 5vw", textAlign: "center" }}>
          <FadeIn>
            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 300, color: "#fff", marginBottom: 16, lineHeight: 1.1 }}>Your next adventure<br/><span style={{ color: "#7ba4db", fontWeight: 600 }}>starts here.</span></h2>
            <p style={{ fontSize: "clamp(14px, 1.4vw, 17px)", color: "rgba(255,255,255,0.6)", marginBottom: 44, fontWeight: 300 }}>Free to use. No account needed. Just tell us where you want to go.</p>
            <button onClick={setShowApp} style={{ padding: "18px 52px", borderRadius: 6, background: "#fff", border: "none", color: "#003580", fontSize: 16, fontWeight: 500, cursor: "pointer", boxShadow: "0 8px 32px rgba(255,255,255,0.2)" }}>Plan my trip for free →</button>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0a1628", padding: "72px 5vw 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="footer-grid" style={{ paddingBottom: 56, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <div>
              <TripDoneLogoDark/>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", maxWidth: 220, lineHeight: 1.7, marginTop: 14, marginBottom: 28 }}>AI-powered travel planning for busy people. Your trip, done.</p>
              <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 12 }}>Travel with the app</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}><AppStoreButton/><GooglePlayButton/></div>
              </div>
              <div>
                <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 12 }}>Follow us</div>
                <div style={{ display: "flex", gap: 14 }}>
                  {[{ Icon: IconInstagram, href: "https://instagram.com/tripdone.travel", label: "Instagram" }, { Icon: IconFacebook, href: "#", label: "Facebook" }, { Icon: IconYouTube, href: "#", label: "YouTube" }, { Icon: IconTikTok, href: "#", label: "TikTok" }].map(({ Icon, href, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"} onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}><Icon size={18}/></a>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 20 }}>Top Destinations</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {TOP_DESTINATIONS.map(d => <li key={d} style={{ marginBottom: 10 }}><span onClick={() => setPage("destinations")} style={{ fontSize: 13.5, color: "rgba(255,255,255,0.6)", cursor: "pointer" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}>{d}</span></li>)}
              </ul>
            </div>
            <div>
              <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 20 }}>Type of Travel</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {TRAVEL_TYPES.map(t => <li key={t} style={{ marginBottom: 10 }}><span style={{ fontSize: 13.5, color: "rgba(255,255,255,0.6)", cursor: "pointer" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}>{t}</span></li>)}
              </ul>
            </div>
            <div>
              <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 20 }}>Contact Us</div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, marginBottom: 16 }}>Got a question? We'd love to hear from you.</p>
              <ContactForm/>
            </div>
          </div>
          <div style={{ padding: "24px 0 32px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>© 2026 TripDone. All rights reserved.</span>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>Built by Thomas A Pritchard</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
