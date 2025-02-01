"use client";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function BrokenGlass(props) {
  const { nodes, materials } = useGLTF("/404_broken_glass.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve.geometry}
        material={nodes.Curve.material}
        rotation={[0, 0, -Math.PI]}
        scale={17.77}
      />
    </group>
  );
}

useGLTF.preload("/404_broken_glass.glb");
