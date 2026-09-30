import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import type { SoloExpression, SoloPose } from "./poses";
import { Stage } from "./Stage";

type Props = { pose: SoloPose; expression: SoloExpression; background: string; sunglasses: boolean; cap: boolean; capBackwards: boolean; partyHat: boolean; vest: boolean };

export function SoloCanvas(props: Props) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const element = wrapper.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={wrapper} className="relative h-[460px] w-full overflow-hidden border-3 border-midnight bg-paper shadow-hard-lg sm:h-[560px]" style={{ cursor: hovered ? "pointer" : "grab" }}>
    <Canvas shadows dpr={[1, 2]} frameloop={visible ? "always" : "never"} camera={{ position: [0, 2.55, 6.4], fov: 35 }} onPointerMissed={() => setHovered(false)}>
      <Stage {...props} onHover={setHovered} />
      <OrbitControls enableDamping dampingFactor={0.08} enablePan={false} minDistance={4.4} maxDistance={8} minPolarAngle={Math.PI * 0.28} maxPolarAngle={Math.PI * 0.68} autoRotate={props.pose === "idle"} autoRotateSpeed={0.7} />
    </Canvas>
    {hovered && <div className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 border-2 border-midnight bg-paper px-4 py-2 font-hand text-xl font-bold text-midnight shadow-hard-sm">Hey, you. Yes, you. 😜</div>}
  </div>;
}
