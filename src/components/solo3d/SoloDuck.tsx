import { useFrame } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { createDenimTexture, createSoloPatchTexture, createTeeTexture } from "./textures";
import type { SoloExpression, SoloPose } from "./poses";

type Props = {
  pose: SoloPose;
  expression: SoloExpression;
  sunglasses: boolean;
  cap: boolean;
  capBackwards: boolean;
  partyHat: boolean;
  vest: boolean;
  hovered: boolean;
  onHover: (hovered: boolean) => void;
};

const C = { yellow: "#ffd027", orange: "#ff9f1c", pink: "#ff3366", midnight: "#1a1a24", denim: "#3e5c8a", lime: "#b6ff3b", lavender: "#b89cff", grey: "#c8cbd0", cargo: "#2b2f3a", blue: "#3b82f6", white: "#f8f8f6" };

export function SoloDuck({ pose, expression, sunglasses, cap, capBackwards, partyHat, vest, hovered, onHover }: Props) {
  const root = useRef<THREE.Group>(null);
  const torso = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const jaw = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Group>(null);
  const armR = useRef<THREE.Group>(null);
  const legL = useRef<THREE.Group>(null);
  const legR = useRef<THREE.Group>(null);
  const capGroup = useRef<THREE.Group>(null);
  const denim = useMemo(() => createDenimTexture(), []);
  const tee = useMemo(() => createTeeTexture(), []);
  const patch = useMemo(() => createSoloPatchTexture(), []);
  const materials = useMemo(() => ({
    yellow: new THREE.MeshPhysicalMaterial({ color: C.yellow, roughness: 0.35, clearcoat: 1, clearcoatRoughness: 0.2, emissive: C.orange, emissiveIntensity: 0.035 }),
    orange: new THREE.MeshStandardMaterial({ color: C.orange, roughness: 0.38 }),
    ink: new THREE.MeshStandardMaterial({ color: C.midnight, roughness: 0.22, metalness: 0.22 }),
    denim: new THREE.MeshStandardMaterial({ color: C.denim, map: denim, roughness: 0.72 }),
    tee: new THREE.MeshStandardMaterial({ color: C.grey, map: tee, roughness: 0.82 }),
    pink: new THREE.MeshStandardMaterial({ color: C.pink, roughness: 0.4 }),
    lime: new THREE.MeshStandardMaterial({ color: C.lime, emissive: C.lime, emissiveIntensity: 0.08, roughness: 0.3 }),
    white: new THREE.MeshStandardMaterial({ color: C.white, roughness: 0.38 }),
    cargo: new THREE.MeshStandardMaterial({ color: C.cargo, roughness: 0.88 }),
    blue: new THREE.MeshStandardMaterial({ color: C.blue, roughness: 0.45 }),
    lavender: new THREE.MeshStandardMaterial({ color: C.lavender, roughness: 0.4 }),
    patch: new THREE.MeshStandardMaterial({ map: patch, roughness: 0.8 }),
  }), [denim, patch, tee]);
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const time = state.clock.elapsedTime;
    if (!root.current || !torso.current || !head.current || !jaw.current || !armL.current || !armR.current || !legL.current || !legR.current) return;
    const beat = Math.sin(time * 9);
    const slow = Math.sin(time * 2.2);
    const targetRun = pose === "run" ? Math.sin(time * 9) : 0;
    const targetDance = pose === "dance" ? Math.sin(time * 6.28) : 0;
    const jump = pose === "jump" ? Math.max(0, Math.sin(time * 4.48)) : 0;
    const backflip = pose === "backflip" ? Math.sin(time * 3.5) : 0;
    const damp = (current: number, target: number) => THREE.MathUtils.damp(current, target, 9, delta);
    root.current.position.y = damp(root.current.position.y, jump * 0.72 + (pose === "run" ? Math.abs(targetRun) * 0.06 : 0));
    root.current.position.x = damp(root.current.position.x, pose === "run" ? Math.sin(time * 0.65) * 0.8 : 0);
    root.current.rotation.x = damp(root.current.rotation.x, pose === "backflip" ? backflip * Math.PI * 2 : pose === "run" ? -0.16 : 0);
    root.current.rotation.y = damp(root.current.rotation.y, pose === "run" && Math.sin(time * 0.65) > 0.7 ? Math.PI : 0);
    torso.current.scale.y = damp(torso.current.scale.y, 1 + (reduced ? 0 : Math.sin(time * 2.5) * 0.015) - jump * 0.08);
    head.current.rotation.z = damp(head.current.rotation.z, hovered ? -0.08 : slow * 0.035 + (pose === "point" ? -0.12 : 0));
    head.current.rotation.x = damp(head.current.rotation.x, pose === "sing" ? -0.12 : 0);
    jaw.current.rotation.x = damp(jaw.current.rotation.x, pose === "sing" ? Math.max(0, Math.sin(time * 7)) * 0.28 : expression === "happy" ? 0.2 : 0);
    armL.current.rotation.z = damp(armL.current.rotation.z, pose === "sing" || pose === "celebrate" ? -0.8 : pose === "dance" ? targetDance * 0.65 : pose === "point" ? -0.95 : -0.08 - targetRun * 0.38);
    armR.current.rotation.z = damp(armR.current.rotation.z, pose === "sing" || pose === "celebrate" ? 0.95 : pose === "dance" ? -targetDance * 0.65 : pose === "point" ? 0.95 : 0.08 + targetRun * 0.38);
    legL.current.rotation.x = damp(legL.current.rotation.x, pose === "jump" ? -0.8 : pose === "dance" ? targetDance * 0.25 : targetRun * 0.55);
    legR.current.rotation.x = damp(legR.current.rotation.x, pose === "jump" ? -0.8 : pose === "dance" ? -targetDance * 0.25 : -targetRun * 0.55);
    if (capGroup.current) capGroup.current.rotation.z = damp(capGroup.current.rotation.z, pose === "dance" ? targetDance * 0.08 : hovered ? -0.1 : 0);
    void beat;
  });

  const eyesOpen = expression !== "sleepy";
  const happy = expression === "happy" || pose === "sing";
  const surprised = expression === "surprised";
  const browsAngry = expression === "annoyed";
  const showGlasses = sunglasses && expression !== "wink";
  const faceZ = 0.72;

  return (
    <group ref={root} scale={hovered ? 1.045 : 1} onPointerOver={(event) => { event.stopPropagation(); onHover(true); }} onPointerOut={() => onHover(false)} onClick={(event) => event.stopPropagation()}>
      <group ref={torso} position={[0, 1.35, 0]}>
        <mesh castShadow material={materials.tee} scale={[0.74, 0.86, 0.48]}>
          <capsuleGeometry args={[0.58, 0.7, 8, 20]} />
        </mesh>
        {vest && <group>
          <mesh position={[-0.44, 0.05, 0.08]} rotation-y={-0.1} material={materials.denim} castShadow><boxGeometry args={[0.15, 1.28, 0.65]} /></mesh>
          <mesh position={[0.44, 0.05, 0.08]} rotation-y={0.1} material={materials.denim} castShadow><boxGeometry args={[0.15, 1.28, 0.65]} /></mesh>
          <mesh position={[-0.44, 0.58, 0.42]} material={materials.lime}><boxGeometry args={[0.08, 0.85, 0.04]} /></mesh>
          <mesh position={[0.44, 0.58, 0.42]} material={materials.lime}><boxGeometry args={[0.08, 0.85, 0.04]} /></mesh>
          <mesh position={[0, -0.05, -0.5]} rotation-y={Math.PI} material={materials.patch}><planeGeometry args={[0.6, 0.22]} /></mesh>
        </group>}
        <mesh position={[0, 0.74, 0]} material={materials.ink}><torusGeometry args={[0.28, 0.08, 10, 24]} /></mesh>
      </group>
      <group ref={head} position={[0, 2.65, 0]}>
        <mesh castShadow material={materials.yellow} scale={[0.94, 0.86, 0.88]}><sphereGeometry args={[0.78, 32, 20]} /></mesh>
        <group position={[0, -0.18, faceZ]}>
          <group ref={jaw} position={[0, -0.12, 0]}>
            <RoundedBox args={[0.64, 0.18, 0.28]} radius={0.08} smoothness={4} material={materials.orange} />
            <mesh position={[0, 0.025, 0.13]} material={materials.pink}><sphereGeometry args={[0.11, 16, 10]} /></mesh>
          </group>
          {eyesOpen ? <>
            <mesh position={[-0.27, 0.3, 0]} material={materials.white}><sphereGeometry args={[0.16, 20, 14]} /></mesh>
            <mesh position={[0.27, 0.3, 0]} material={materials.white}><sphereGeometry args={[0.16, 20, 14]} /></mesh>
            <mesh position={[-0.27, 0.3, 0.14]} material={materials.ink}><sphereGeometry args={[surprised ? 0.09 : 0.07, 16, 10]} /></mesh>
            <mesh position={[0.27, 0.3, 0.14]} material={materials.ink}><sphereGeometry args={[surprised ? 0.09 : 0.07, 16, 10]} /></mesh>
            <mesh position={[-0.29, 0.34, 0.19]} material={materials.white}><sphereGeometry args={[0.025, 10, 8]} /></mesh>
            <mesh position={[0.25, 0.34, 0.19]} material={materials.white}><sphereGeometry args={[0.025, 10, 8]} /></mesh>
          </> : <>
            <mesh position={[-0.27, 0.3, 0.14]} rotation-z={happy ? 0.3 : 0} material={materials.ink}><torusGeometry args={[0.12, 0.025, 8, 16, Math.PI]} /></mesh>
            <mesh position={[0.27, 0.3, 0.14]} rotation-z={-happy ? 0.3 : 0} material={materials.ink}><torusGeometry args={[0.12, 0.025, 8, 16, Math.PI]} /></mesh>
          </>}
          <RoundedBox args={[0.2, 0.035, 0.035]} position={[-0.27, surprised ? 0.55 : browsAngry ? 0.48 : 0.51, 0.18]} rotation-z={browsAngry ? -0.25 : 0} radius={0.015} smoothness={3} material={materials.ink} />
          <RoundedBox args={[0.2, 0.035, 0.035]} position={[0.27, surprised ? 0.55 : browsAngry ? 0.48 : 0.51, 0.18]} rotation-z={browsAngry ? 0.25 : 0} radius={0.015} smoothness={3} material={materials.ink} />
        </group>
        {showGlasses && <group position={[0, 0.1, 0.77]}>
          <RoundedBox args={[0.33, 0.25, 0.06]} position={[-0.27, 0, 0]} radius={0.08} smoothness={5} material={materials.ink} />
          <RoundedBox args={[0.33, 0.25, 0.06]} position={[0.27, 0, 0]} radius={0.08} smoothness={5} material={materials.ink} />
          <mesh position={[0, 0, 0]} material={materials.ink}><boxGeometry args={[0.2, 0.04, 0.05]} /></mesh>
          <mesh position={[-0.42, 0, 0]} rotation-y={Math.PI / 2} material={materials.ink}><boxGeometry args={[0.18, 0.035, 0.035]} /></mesh>
          <mesh position={[0.42, 0, 0]} rotation-y={Math.PI / 2} material={materials.ink}><boxGeometry args={[0.18, 0.035, 0.035]} /></mesh>
        </group>}
        {cap && <group ref={capGroup} position={[0, 0.64, capBackwards ? -0.12 : 0.04]} rotation-x={capBackwards ? 0.1 : -0.08}>
          <mesh material={materials.denim}><sphereGeometry args={[0.83, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} /></mesh>
          {!capBackwards && <RoundedBox args={[0.72, 0.12, 0.38]} position={[0, -0.03, 0.67]} rotation-x={-0.12} radius={0.08} smoothness={4} material={materials.denim} />}
          <mesh position={[0, 0.45, 0]} material={materials.lime}><sphereGeometry args={[0.055, 12, 8]} /></mesh>
          {!capBackwards && <>
            <mesh position={[-0.38, 0.17, 0.58]} rotation-y={-0.1} material={materials.pink}><boxGeometry args={[0.16, 0.12, 0.025]} /></mesh>
            <mesh position={[-0.16, 0.2, 0.67]} material={materials.lavender}><boxGeometry args={[0.15, 0.1, 0.025]} /></mesh>
            <mesh position={[0.08, 0.2, 0.67]} material={materials.yellow}><boxGeometry args={[0.16, 0.1, 0.025]} /></mesh>
          </>}
        </group>}
        {partyHat && <group position={[0, 1.25, 0]}><mesh material={materials.pink}><coneGeometry args={[0.25, 0.75, 24]} /></mesh><mesh position={[0, 0.42, 0]} material={materials.yellow}><sphereGeometry args={[0.09, 12, 8]} /></mesh></group>}
      </group>
      <group ref={armL} position={[-0.72, 1.65, 0]} rotation-z={-0.08}>
        <mesh position={[0, -0.3, 0]} rotation-z={0.1} material={materials.tee} castShadow><capsuleGeometry args={[0.13, 0.48, 6, 12]} /></mesh>
        <mesh position={[0, -0.66, 0]} material={materials.yellow} castShadow><sphereGeometry args={[0.18, 18, 12]} /></mesh>
        <mesh position={[-0.1, -0.7, 0.08]} rotation-z={0.6} material={materials.yellow}><sphereGeometry args={[0.08, 14, 10]} /></mesh>
      </group>
      <group ref={armR} position={[0.72, 1.65, 0]} rotation-z={0.08}>
        <mesh position={[0, -0.3, 0]} rotation-z={-0.1} material={materials.tee} castShadow><capsuleGeometry args={[0.13, 0.48, 6, 12]} /></mesh>
        <mesh position={[0, -0.66, 0]} material={materials.yellow} castShadow><sphereGeometry args={[0.18, 18, 12]} /></mesh>
        <mesh position={[0.1, -0.7, 0.08]} rotation-z={-0.6} material={materials.yellow}><sphereGeometry args={[0.08, 14, 10]} /></mesh>
      </group>
      <group ref={legL} position={[-0.26, 0.62, 0]}>
        <mesh position={[0, -0.24, 0]} material={materials.cargo} castShadow><capsuleGeometry args={[0.2, 0.4, 6, 12]} /></mesh>
        <mesh position={[0, -0.68, 0.08]} material={materials.white} castShadow><RoundedBox args={[0.44, 0.22, 0.7]} radius={0.08} smoothness={3} /></mesh>
        <mesh position={[0, -0.61, 0.43]} material={materials.pink}><boxGeometry args={[0.27, 0.09, 0.08]} /></mesh>
      </group>
      <group ref={legR} position={[0.26, 0.62, 0]}>
        <mesh position={[0, -0.24, 0]} material={materials.cargo} castShadow><capsuleGeometry args={[0.2, 0.4, 6, 12]} /></mesh>
        <mesh position={[0, -0.68, 0.08]} material={materials.white} castShadow><RoundedBox args={[0.44, 0.22, 0.7]} radius={0.08} smoothness={3} /></mesh>
        <mesh position={[0, -0.61, 0.43]} material={materials.lime}><boxGeometry args={[0.27, 0.09, 0.08]} /></mesh>
      </group>
      {pose === "sing" && <group position={[0.43, 1.8, 0.35]} rotation-x={-0.45}><mesh material={materials.white}><cylinderGeometry args={[0.035, 0.035, 0.55, 12]} /></mesh><mesh position={[0, 0.32, 0]} material={materials.ink}><sphereGeometry args={[0.12, 16, 10]} /></mesh><mesh position={[0, 0.43, 0]} material={materials.white}><torusGeometry args={[0.07, 0.025, 8, 16]} /></mesh></group>}
      {pose === "dj" && <group position={[0, 0.25, 0.65]}><RoundedBox args={[1.7, 0.3, 0.55]} radius={0.08} smoothness={3} material={materials.ink} /><mesh position={[-0.46, 0.17, 0]} material={materials.pink}><cylinderGeometry args={[0.2, 0.2, 0.04, 24]} /></mesh><mesh position={[0.46, 0.17, 0]} material={materials.lavender}><cylinderGeometry args={[0.2, 0.2, 0.04, 24]} /></mesh><Text position={[0, -0.02, 0.29]} fontSize={0.16} color={C.yellow} anchorX="center" anchorY="middle">SOLO</Text></group>}
    </group>
  );
}
