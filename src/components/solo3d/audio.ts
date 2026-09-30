let context: AudioContext | null = null;
let master: GainNode | null = null;
let loopTimer: number | null = null;
let muted = false;
let volume = 0.22;

function ensureAudio() {
  if (typeof window === "undefined") return null;
  if (!context) {
    context = new window.AudioContext();
    master = context.createGain();
    master.gain.value = muted ? 0 : volume;
    master.connect(context.destination);
  }
  if (context.state === "suspended") void context.resume();
  return context;
}

function note(frequency: number, start: number, duration: number, type: OscillatorType) {
  if (!context || !master) return;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0.001, start);
  gain.gain.exponentialRampToValueAtTime(0.18, start + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
  oscillator.connect(gain); gain.connect(master);
  oscillator.start(start); oscillator.stop(start + duration + 0.03);
}

export function startSoloJingle() {
  const audio = ensureAudio();
  if (!audio || loopTimer !== null) return;
  const melody = [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880, 698.46];
  const schedule = () => {
    const now = audio.currentTime + 0.04;
    melody.forEach((frequency, index) => note(frequency, now + index * 0.22, 0.18, index % 2 ? "square" : "triangle"));
  };
  schedule();
  loopTimer = window.setInterval(schedule, 1760);
}

export function stopSoloJingle() {
  if (loopTimer !== null) { window.clearInterval(loopTimer); loopTimer = null; }
}

export function setSoloMuted(next: boolean) {
  muted = next;
  if (master && context) master.gain.setTargetAtTime(muted ? 0 : volume, context.currentTime, 0.05);
}

export function setSoloVolume(next: number) {
  volume = next;
  if (master && context && !muted) master.gain.setTargetAtTime(volume, context.currentTime, 0.05);
}
