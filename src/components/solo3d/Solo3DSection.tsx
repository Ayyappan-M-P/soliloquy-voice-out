import { lazy, Suspense, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AudioLines, Glasses, HatGlasses, PartyPopper, Shuffle, Sparkles, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { solo3d } from "@/data/soliloqy";
import { cn } from "@/lib/utils";
import { setSoloMuted, setSoloVolume, startSoloJingle, stopSoloJingle } from "./audio";
import { expressionLabels, poseLabels, poseOrder, type SoloExpression, type SoloPose } from "./poses";

const SoloCanvas = lazy(() => import("./SoloCanvas").then((module) => ({ default: module.SoloCanvas })));
const poseKeys = poseOrder;
const expressionKeys = Object.keys(expressionLabels) as SoloExpression[];
const backgrounds = ["#ffd027", "#ff3366", "#1a1a24", "#f8f8f6"];

class SoloSceneBoundary extends ErrorBoundary {}

class ErrorBoundary extends (class extends Object {}) {}

type BoundaryProps = { children: React.ReactNode };
type BoundaryState = { hasError: boolean };
class WebGLErrorBoundary extends (require("react") as typeof import("react")).Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() { return this.state.hasError ? <div className="flex h-[460px] items-center justify-center border-3 border-midnight bg-yellow p-8 text-center shadow-hard-lg sm:h-[560px]"><div><p className="font-display text-4xl font-extrabold">Solo needs a different stage.</p><p className="mt-3 max-w-sm text-lg">This browser couldn't start 3D graphics, but the monologue is still open.</p></div></div> : this.props.children; }
}

function WarmingUp() { return <div className="flex h-[460px] items-center justify-center border-3 border-midnight bg-yellow p-8 shadow-hard-lg sm:h-[560px]"><div className="text-center"><div className="mx-auto mb-5 h-16 w-16 animate-spin rounded-full border-8 border-midnight border-t-pink" /><p className="font-display text-3xl font-extrabold">Solo is warming up…</p></div></div>; }

export function Solo3DSection() {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [pose, setPose] = useState<SoloPose>("idle");
  const [expression, setExpression] = useState<SoloExpression>("neutral");
  const [background, setBackground] = useState(backgrounds[3]);
  const [sunglasses, setSunglasses] = useState(true);
  const [cap, setCap] = useState(true);
  const [capBackwards, setCapBackwards] = useState(false);
  const [partyHat, setPartyHat] = useState(false);
  const [vest, setVest] = useState(true);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.22);
  const [soundEnabled, setSoundEnabled] = useState(true);
  useEffect(() => { setReady(true); return () => stopSoloJingle(); }, []);
  useEffect(() => { const onKey = (event: KeyboardEvent) => { const index = Number(event.key) - 1; if (index >= 0 && index < poseKeys.length) selectPose(poseKeys[index]); }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); });
  const selectPose = (next: SoloPose) => { setPose(next); if (next === "sing" && soundEnabled && !reduced) startSoloJingle(); else stopSoloJingle(); };
  const surprise = () => { const nextPose = poseKeys[Math.floor(Math.random() * poseKeys.length)]; const nextExpression = expressionKeys[Math.floor(Math.random() * expressionKeys.length)]; setExpression(nextExpression); selectPose(nextPose); };
  return <section id="meet-solo" className="bg-paper py-24 lg:py-32"><div className="mx-auto max-w-[1440px] px-5 lg:px-10"><div className="mb-12 flex flex-wrap items-end justify-between gap-5"><div><p className="mb-3 font-mono text-xs font-bold uppercase tracking-[.2em] text-pink">{solo3d.eyebrow}</p><h2 className="max-w-5xl font-display text-5xl font-extrabold leading-[.9] sm:text-7xl lg:text-8xl">{solo3d.title}</h2><svg className="mt-4 h-4 w-64 text-pink" viewBox="0 0 260 15" aria-hidden><path d="M3 8c38-9 74 8 113 0s76 7 140-2" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" /></svg></div><p className="-rotate-3 font-hand text-3xl font-bold">{solo3d.note} ↗</p></div><div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-start"><div><p className="mb-6 max-w-2xl text-xl leading-relaxed">{solo3d.intro}</p>{ready ? <WebGLErrorBoundary><Suspense fallback={<WarmingUp />}><SoloCanvas pose={pose} expression={expression} background={background} sunglasses={sunglasses} cap={cap} capBackwards={capBackwards} partyHat={partyHat} vest={vest} /></Suspense></WebGLErrorBoundary> : <WarmingUp />}</div><motion.aside initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="border-3 border-midnight bg-yellow p-5 shadow-hard-lg sm:p-7"><div className="flex items-center justify-between gap-4"><div><p className="font-mono text-xs font-bold uppercase tracking-[.18em] text-midnight/65">Choose a mood</p><h3 className="font-display text-3xl font-extrabold">Pose selector</h3></div><Button type="button" onClick={surprise} aria-label="Surprise me with a random Solo pose and expression" className="h-11 rounded-none border-2 border-midnight bg-pink px-3 text-paper shadow-hard-sm hover:bg-pink/90"><Shuffle /></Button></div><div className="mt-6 flex flex-wrap gap-2">{poseKeys.map((key) => <Button key={key} type="button" onClick={() => selectPose(key)} aria-pressed={pose === key} className={cn("rounded-full border-2 border-midnight px-3 font-bold text-midnight shadow-none", pose === key ? "bg-pink text-paper" : "bg-paper hover:bg-pink/30")}>{poseLabels[key]}</Button>)}</div><div className="mt-7 border-t-2 border-midnight/25 pt-5"><p className="font-mono text-xs font-bold uppercase tracking-[.18em] text-midnight/65">Expression</p><div className="mt-3 flex flex-wrap gap-2">{expressionKeys.map((key) => <Button key={key} type="button" onClick={() => setExpression(key)} aria-pressed={expression === key} className={cn("rounded-full border-2 border-midnight px-3 font-bold text-midnight shadow-none", expression === key ? "bg-violet text-paper" : "bg-paper hover:bg-violet/20")}>{expressionLabels[key]}</Button>)}</div></div><div className="mt-7 grid gap-3 border-t-2 border-midnight/25 pt-5 sm:grid-cols-2">{[["Sunglasses", sunglasses, () => setSunglasses((value) => !value), Glasses], ["Cap", cap, () => setCap((value) => !value), HatGlasses], ["Backward cap", capBackwards, () => setCapBackwards((value) => !value), HatGlasses], ["Party hat", partyHat, () => setPartyHat((value) => !value), PartyPopper], ["Denim vest", vest, () => setVest((value) => !value), Sparkles]].map(([label, active, action, Icon]) => <Button key={String(label)} type="button" onClick={action as () => void} aria-pressed={Boolean(active)} className={cn("justify-start rounded-none border-2 border-midnight font-bold text-midnight shadow-none", active ? "bg-paper" : "bg-paper/50 opacity-60")}>{<Icon className="h-4 w-4" />} {String(label)}</Button>)}</div><div className="mt-7 border-t-2 border-midnight/25 pt-5"><div className="flex items-center justify-between gap-3"><p className="font-mono text-xs font-bold uppercase tracking-[.18em] text-midnight/65">Sound lab</p><Button type="button" variant="ghost" size="icon" onClick={() => { const next = !muted; setMuted(next); setSoloMuted(next); }} aria-label={muted ? "Unmute Solo" : "Mute Solo"}>{muted ? <VolumeX /> : <Volume2 />}</Button></div><label className="mt-3 flex items-center gap-3 text-sm font-bold"><input type="checkbox" checked={soundEnabled} onChange={(event) => { setSoundEnabled(event.target.checked); if (!event.target.checked) stopSoloJingle(); }} /> Allow Solo's jingle</label><label className="mt-3 block text-sm font-bold">Volume<input className="mt-2 w-full accent-pink" type="range" min="0" max="0.5" step="0.01" value={volume} onChange={(event) => { const next = Number(event.target.value); setVolume(next); setSoloVolume(next); }} /></label><Button type="button" onClick={() => selectPose("sing")} className="mt-4 w-full rounded-none border-2 border-midnight bg-midnight font-bold text-paper shadow-hard-sm hover:bg-midnight/90"><AudioLines /> Sing a little</Button></div><div className="mt-7 grid grid-cols-4 gap-2 border-t-2 border-midnight/25 pt-5"><p className="col-span-4 font-mono text-xs font-bold uppercase tracking-[.18em] text-midnight/65">Stage color</p>{backgrounds.map((color) => <button key={color} type="button" aria-label={`Set stage color ${color}`} onClick={() => setBackground(color)} className={cn("h-9 border-2 border-midnight transition-transform hover:scale-105", background === color && "-translate-y-1 shadow-hard-sm")} style={{ backgroundColor: color }} />)}</div><p className="mt-6 flex items-center gap-2 text-sm font-bold text-midnight/70"><Sparkles className="h-4 w-4" /> Press 1–9 to switch poses.</p></motion.aside></div></div></section>;
}
