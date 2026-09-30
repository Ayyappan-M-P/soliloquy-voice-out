export type SoloPose = "idle" | "run" | "sing" | "dance" | "jump" | "dj" | "celebrate" | "point" | "backflip";
export type SoloExpression = "neutral" | "happy" | "surprised" | "annoyed" | "sleepy" | "wink";

export const poseLabels: Record<SoloPose, string> = {
  idle: "Idle",
  run: "Run",
  sing: "Sing",
  dance: "Dance",
  jump: "Jump",
  dj: "DJ",
  celebrate: "Celebrate",
  point: "Point",
  backflip: "Backflip",
};

export const expressionLabels: Record<SoloExpression, string> = {
  neutral: "Neutral",
  happy: "Happy",
  surprised: "Surprised",
  annoyed: "Annoyed",
  sleepy: "Sleepy",
  wink: "Wink",
};

export const poseOrder: SoloPose[] = ["idle", "run", "sing", "dance", "jump", "dj", "celebrate", "point", "backflip"];
