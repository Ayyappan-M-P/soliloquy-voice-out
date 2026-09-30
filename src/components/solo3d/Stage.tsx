import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { SoloDuck } from "./SoloDuck";
import type { SoloExpression, SoloPose } from "./poses";

type Props = { pose: SoloPose; expression: SoloExpression; background: string; sunglasses: boolean; cap: boolean; capBackwards: boolean; partyHat: boolean; vest: boolean; onHover: (value: boolean) => void };

function FloatingShapes() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => { if (group.current) group.current.rotation.y += delta * 0.16; });
  return <group ref={group} position={[0, 2.3, -1.8]}>
    <mesh position={[-1.8, 0.8, 0]} material-color="#ff3366"><torusGeometry args={[0.34, 0.1, 12, 24]} /></mesh>
    <mesh position={[1.7, 0.7, 0]} material-color="#b6ff3b"><coneGeometry args={[0.3, 0.7, 5]} /></mesh>
    <mesh position={[1.2, -0.9, 0]} material-color="#b89cff"><sphereGeometry args={[0.28, 16, 10]} /></mesh>
    <mesh position={[-1.3, -0.8, 0]} material-color="#ffd027"><boxGeometry args={[0.45, 0.45, 0.45]} /></mesh>
  </group>;
}

export function Stage(props: Props) {
  const stripes = useRef<THREE.Group>(null);
  useFrame((_, delta) => { if (stripes.current && props.pose === "run") stripes.current.position.z = (stripes.current.position.z + delta * 1.8) % 1.6; });
  return <>
    <color attach="background" args={[props.background]} />
    <hemisphereLight args={["#f8f8f6", "#1a1a24", 1.8]} />
    <directionalLight position={[4, 7, 5]} intensity={3.2} color="#fff2cf" />
    <pointLight position={[-4, 3, 2]} intensity={16} distance={10} color="#ff3366" />
    <pointLight position={[4, 2, -1]} intensity={11} distance={9} color="#6c5ce7" />
    <Environment resolution={128}>
      <Lightformer intensity={2.5} position={[0, 5, 2]} scale={[5, 3, 1]} color="#fff0c2" />
      <Lightformer intensity={1.5} position={[-4, 2, 1]} rotation-y={Math.PI / 2} scale={[3, 2, 1]} color="#ff8ca7" />
    </Environment>
    <FloatingShapes />
    <mesh position={[0, -0.13, 0]} receiveShadow><cylinderGeometry args={[2.55, 2.55, 0.25, 48]} /><meshStandardMaterial color="#ff3366" roughness={0.48} /></mesh>
    <mesh position={[0, 0.02, 0]} receiveShadow><torusGeometry args={[2.25, 0.08, 12, 48]} /><meshStandardMaterial color="#1a1a24" roughness={0.42} /></mesh>
    <group ref={stripes} position={[0, 0.09, 0]}>{[-1.5, -0.5, 0.5, 1.5].map((x) => <mesh key={x} position={[x, 0, 0]} rotation-x={-Math.PI / 2} material-color="#ffd027"><planeGeometry args={[0.12, 5]} /></mesh>)}</group>
    <SoloDuck {...props} />
    <ContactShadows position={[0, 0.12, 0]} opacity={0.42} scale={4.5} blur={2.4} far={3.5} resolution={256} color="#1a1a24" />
  </>;
}
