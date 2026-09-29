# Soliloquy Unveiled

Build a single-page, front-end-only website for a community brand called "SOLILOQY". No backend, no database, no auth. All content is static and hardcoded. The contact and join forms only validate on the client and show a success toast. Use React + Vite + TypeScript + Tailwind + shadcn/ui + Framer Motion + lucide-react.

# BRAND ESSENCE
Soliloquy is a community for solo thinkers, quirky creators and honest inner dialogue.
Tagline: "From Inner Voice to Outer Resonance."
Theme name: "The Open Monologue."
Personality: modern, high-energy, youthful, creative and social. It balances deep introspection with playful humor (bold, chubby lettering paired with winking smileys 😜). Voice is candid, warm, witty and self-aware, like a late-night journal entry or a close friend over coffee. Never corporate.

# COLOR PALETTE (define as CSS variables and Tailwind tokens)
- Marigold Yellow #FFD027 (PRIMARY)
- Electric Punch Pink #FF3366 (PRIMARY)
- Deep Charcoal Blue / Midnight #1A1A24 (text, dark sections)
- Soft Off-White / Paper Scrap #F8F8F6 (page background)
- Iris Purple / Nervous Violet #6C5CE7 (accent, used sparingly)
Rule: yellow and pink dominate. Purple is only for small accents, highlights and a few shapes. Alternate sections between off-white, yellow, pink and midnight backgrounds for a bold color-blocked rhythm. Ensure text contrast is accessible (midnight text on yellow, off-white text on pink and midnight).

# TYPOGRAPHY
- Headings: a bold, chunky, rounded display font (e.g. "Bricolage Grotesque" ExtraBold or "Fredoka" Bold) in huge sizes, tight leading, sometimes with a slight rotation on a word.
- Body: "DM Sans" or "Inter".
- Handwritten accent: "Caveat" for margin notes, arrows and "journal scribbles".
- Use a hand-drawn underline or squiggle beneath key words.

# VISUAL LANGUAGE
Mix these graphic elements throughout as SVG or CSS shapes:
- Bold geometric color blocks: quarter circles, half circles, pill shapes, overlapping blobs in yellow, pink and purple.
- Wavy black line patterns (like sound waves or a thought loop).
- Polka-dot grids in midnight or pink.
- A recurring winking smiley 😜 as a mascot, drawn as a custom SVG with a yellow face, midnight features and a pink tongue.
- Paper-scrap, torn-edge and sticker styling, subtle grain texture overlay, chunky 3px midnight borders with hard offset shadows (neo-brutalist cards, e.g. box-shadow: 6px 6px 0 #1A1A24).
- A 3D-style rotating cube in the hero, built with CSS 3D transforms. Each face uses the geometric patterns (yellow, pink, purple, dots, waves).

# ANIMATIONS AND INTERACTIONS (important, make it feel alive)
1. Hero: headline words animate in one by one (staggered spring). A typewriter effect cycles through inner-monologue lines such as "Am I overthinking this?", "What if the weird idea is the good one?", "Nobody's listening… so say it." The smiley winks every few seconds. The 3D cube slowly rotates and tilts toward the cursor.
2. Floating shapes drift and rotate slowly in the background (parallax on scroll).
3. Scroll-reveal on every section (fade and slide up, stagger children) using whileInView.
4. Infinite marquee ribbon between sections with text like "RAW BEATS POLISHED ✦ TOGETHER, ALONE ✦ DEEP DOESN'T MEAN DREARY ✦ SPEAK YOUR MIND 😜", on a pink or yellow strip that is slightly tilted.
5. Cards have hover lift, a slight rotation, and the hard shadow shifts. Buttons have a squish and bounce on press and a wiggle on hover.
6. A custom cursor follower (small yellow circle with mix-blend-mode) on desktop only.
7. Animated count-up stats when scrolled into view.
8. Sticky glass navbar with scroll-spy highlighting the active section, smooth scrolling and a mobile hamburger menu that slides in.
9. Section headings have a hand-drawn underline that draws itself (SVG stroke-dashoffset).
10. A floating "Wink" easter egg: clicking the smiley triggers a confetti burst of yellow, pink and purple shapes.
11. Respect prefers-reduced-motion by disabling heavy animations.

# PAGE STRUCTURE (single page, anchor navigation)
Navbar: SOLILOQY wordmark with the smiley, links Home, About, What We Do, Events, Spaces, Contact, and a pink "Join the Monologue" button.

1. HOME (Hero), yellow background
   - Giant headline: "Speak your mind. We're listening."
   - Subline: "A safe haven for solo thinkers, quirky creators and honest internal dialogue."
   - Typewriter monologue line, CTAs "Join the Community" (pink) and "See Events" (outline).
   - The 3D cube, floating shapes and the smiley sticker.
   - Small note in the handwritten font: "psst… drafts welcome."

2. ABOUT, off-white background
   - Heading: "What's a soliloquy anyway?"
   - Definition card styled like a dictionary entry: "soliloquy (n.) — the act of speaking your thoughts aloud when by yourself."
   - Text: while the digital world demands performative polish, Soliloqy is built for what happens BEFORE the performance: half-formed thoughts in midnight notebooks, honest internal debates that spark breakthroughs, and the playful, vulnerable, slightly quirky dialogue that makes everyone human.
   - Big quote block: "From Inner Voice to Outer Resonance."
   - Animated stats: e.g. 1,200+ Soloists, 40+ Countries, 90 min Silent Sessions, ∞ Half-baked ideas.

3. WHAT WE DO, midnight background with colorful cards
   Three big pillar cards (yellow, pink, purple) that flip or expand on hover:
   - 1. Unfiltered Thought: "Raw beats polished." Share unfinished drafts, shower thoughts, messy mind-maps and honest struggles.
   - 2. Playful Introspection: "Deep doesn't mean dreary." Humor, witty self-deprecation and curiosity.
   - 3. Shared Solitude: "Together, alone." Focus sprints, quiet co-working and async exchanges over noisy chat.
   Below that, a "Weekly Rituals" horizontal timeline or tab component:
   - 🎙️ The Monday Monologue: "What is the main conversation happening in your head today?"
   - 🤫 Silent Soliloquy: weekly 90-minute muted co-working room with lo-fi vinyl beats and a shared intention board.
   - 💡 Brain Spills & Drafts: finished work is banned; only half-baked ideas, messy doodles and one-sentence concepts.
   - 😜 The Wink Check (Friday retro): "What didn't go as planned this week, but made you laugh anyway?"

4. EVENTS, pink background
   - Heading: "Come think out loud (quietly)."
   - Grid of 4 to 6 event cards with date badge, title, time, format tag (Online / In-person / Async) and an "RSVP" button that opens a small shadcn dialog with a name and email form and shows a success toast.
   - Sample events: Monday Monologue (weekly), Silent Soliloquy Co-working (90 min), Brain Spills Open Mic, The Wink Check Friday Retro, Midnight Notebook Night, Drafting Table Design Feedback Jam.
   - A filter chip row (All, Online, In-person, Async) with animated card transitions (AnimatePresence).

5. SPACES / COMMUNITY CHANNELS, off-white background
   - Heading: "Pick a room."
   - Rooms as illustrated door or tag cards: #the-parlor (welcome lounge and casual banter), #inner-monologue (raw thoughts and journaling), #the-study (deep work and focus sprints), #drafting-table (works-in-progress and feedback), #the-side-eye (memes, candid humor and joyful venting).
   - Hovering a room makes the door "open" with a small animation and a fun one-liner.

6. MANIFESTO, purple-tinted or midnight full-width section
   - Large centered text, with lines revealing one by one as the user scrolls:
   "Here's to the things we say when nobody's listening. To the drafts that never made the feed, the midnight theories, the nervous first attempts, and the thoughts that loop until they find a voice. We believe great ideas don't start in boardroom pitches. They start as a soliloquy, a quiet conversation with yourself. Here, you don't have to impress. You don't have to edit out the human parts. Bring your raw thoughts, your quirks and your half-baked dreams. Speak your mind. We're listening."

7. TESTIMONIALS (optional, short): 3 sticky-note style cards with slight rotations and playful member quotes.

8. CONTACT / JOIN, yellow background
   - Heading: "Say it out loud."
   - Form fields: name, email, "What's the conversation in your head today?" (textarea), interest dropdown. Validate with zod and react-hook-form, and show inline errors and a success toast ("Got it. Your monologue is in. 😜").
   - Side card with contact details (hello@soliloqy.community, social icons) and a handwritten note.

9. FOOTER, midnight background
   - Big SOLILOQY wordmark, quick links, social icons, small text "Made for solo thinkers, together. © 2026 Soliloqy."

# TECHNICAL REQUIREMENTS
- Fully responsive (mobile first) and accessible (semantic HTML, alt text, focus states, ARIA labels).
- Organize into reusable components (Navbar, Hero, Cube3D, Marquee, PillarCard, EventCard, RoomCard, Manifesto, ContactForm, Footer, Smiley).
- Keep all copy and event data in a separate data file for easy editing.
- Use SVG or CSS for all graphics (no external images required).
- Performance: lazy animations, no heavy libraries beyond Framer Motion.
- Design feel: bold, joyful, slightly chaotic but well-aligned, like a zine meets a modern startup. Every section should have at least one signature animated detail.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://soliloquy-voice-out.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3dc4c6e4-53d3-484a-821e-baa278b18a73).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
