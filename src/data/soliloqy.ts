export const navItems = [
  ["Home", "home"],
  ["About", "about"],
  ["What We Do", "what-we-do"],
  ["Events", "events"],
  ["Spaces", "spaces"],
  ["Contact", "contact"],
] as const;

export const monologues = [
  "Am I overthinking this?",
  "What if the weird idea is the good one?",
  "Nobody's listening… so say it.",
];

export const stats = [
  { value: 1200, suffix: "+", label: "Soloists" },
  { value: 40, suffix: "+", label: "Countries" },
  { value: 90, suffix: " min", label: "Silent sessions" },
  { value: 0, suffix: "∞", label: "Half-baked ideas" },
];

export const pillars = [
  { number: "01", title: "Unfiltered Thought", kicker: "Raw beats polished.", body: "Share unfinished drafts, shower thoughts, messy mind-maps and honest struggles.", tone: "yellow" },
  { number: "02", title: "Playful Introspection", kicker: "Deep doesn't mean dreary.", body: "Bring humor, witty self-deprecation and curiosity to the big questions.", tone: "pink" },
  { number: "03", title: "Shared Solitude", kicker: "Together, alone.", body: "Focus sprints, quiet co-working and async exchanges over noisy chat.", tone: "purple" },
] as const;

export const rituals = [
  { icon: "🎙️", day: "MON", title: "The Monday Monologue", body: "What is the main conversation happening in your head today?" },
  { icon: "🤫", day: "WED", title: "Silent Soliloquy", body: "90 minutes of muted co-working, lo-fi vinyl and shared intentions." },
  { icon: "💡", day: "THU", title: "Brain Spills & Drafts", body: "Finished work is banned. Bring the messy doodle or one-line concept." },
  { icon: "😜", day: "FRI", title: "The Wink Check", body: "What went sideways this week, but made you laugh anyway?" },
];

export type EventFormat = "Online" | "In-person" | "Async";
export const events = [
  { date: "07", month: "OCT", title: "Monday Monologue", time: "7:00 PM UTC", format: "Online" },
  { date: "09", month: "OCT", title: "Silent Soliloquy Co-working", time: "6:30 PM UTC · 90 min", format: "Online" },
  { date: "12", month: "OCT", title: "Brain Spills Open Mic", time: "All day drop-in", format: "Async" },
  { date: "16", month: "OCT", title: "Midnight Notebook Night", time: "9:30 PM local", format: "In-person" },
  { date: "18", month: "OCT", title: "The Wink Check Friday Retro", time: "5:00 PM UTC", format: "Online" },
  { date: "23", month: "OCT", title: "Drafting Table Feedback Jam", time: "6:00 PM local", format: "In-person" },
] satisfies Array<{ date: string; month: string; title: string; time: string; format: EventFormat }>;

export const rooms = [
  { name: "#the-parlor", body: "Welcome lounge & casual banter", aside: "Shoes off. Opinions on." },
  { name: "#inner-monologue", body: "Raw thoughts & journaling", aside: "No neat endings required." },
  { name: "#the-study", body: "Deep work & focus sprints", aside: "Quietly getting it done." },
  { name: "#drafting-table", body: "Works-in-progress & feedback", aside: "Show us the ugly first draft." },
  { name: "#the-side-eye", body: "Memes, candid humor & joyful venting", aside: "Respectfully unhinged." },
];

export const manifesto = [
  "Here's to the things we say when nobody's listening.",
  "To the drafts that never made the feed, the midnight theories, the nervous first attempts, and the thoughts that loop until they find a voice.",
  "Great ideas don't start in boardroom pitches. They start as a soliloquy—a quiet conversation with yourself.",
  "Here, you don't have to impress. You don't have to edit out the human parts.",
  "Bring your raw thoughts, your quirks and your half-baked dreams.",
  "Speak your mind. We're listening.",
];

export const testimonials = [
  { quote: "I arrived with a chaotic note titled ‘maybe??’ and left with three collaborators.", name: "Mika · maker of odd things" },
  { quote: "The only online room where silence feels social instead of awkward.", name: "June · serial overthinker" },
  { quote: "Nobody asked for my personal brand. They asked what was on my mind.", name: "Ari · recovering perfectionist" },
];