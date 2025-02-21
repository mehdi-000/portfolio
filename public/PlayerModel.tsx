/* eslint-disable react/display-name */
import React from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

type GroupProps = JSX.IntrinsicElements["group"];
interface ModelProps extends GroupProps {}

export const PlayerModel = (
  {
    ref,
    ...props
  }: ModelProps & {
    ref: React.RefObject<THREE.Group>;
  }
) => {
  const { nodes, materials } = useGLTF("/PlayerModel.glb") as any;
  return (
    <group ref={ref} {...props} dispose={null}>
      <group
        position={[0.739, 1.975, -0.953]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={0.035}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Node.geometry}
          material={materials["Material_0.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Node001.geometry}
          material={materials["Material_1.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Node002.geometry}
          material={materials["Material_1.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Node003.geometry}
          material={materials["Material_2.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Node004.geometry}
          material={materials["Material_3.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Node005.geometry}
          material={materials["Material_1.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Node007.geometry}
          material={materials["Material_1.001"]}
        />
      </group>
    </group>
  );
};

useGLTF.preload("/PlayerModel.glb");
