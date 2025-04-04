/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 PlayerModel.glb --transform 
Files: PlayerModel.glb [133.32KB] > D:\Dokumente\Mehdi Studium Informatik und Design\7. Semester\Bachelor\my-portfolio-proj\public\PlayerModel-transformed.glb [25.83KB] (81%)
*/

import React from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

type GroupProps = React.ComponentProps<"group">;
interface ModelProps extends GroupProps {}

// eslint-disable-next-line react/display-name
export const Model = ({
  ref,
  ...props
}: ModelProps & {
  ref: React.RefObject<THREE.Group>;
}) => {
  const { nodes, materials } = useGLTF("/PlayerModel.glb") as any;
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh
        geometry={nodes.Node.geometry}
        material={materials["Material_0.001"]}
        position={[0.739, 1.975, -0.953]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={0.035}
      />
      <mesh
        geometry={nodes.Node001.geometry}
        material={materials["Material_1.001"]}
        position={[0.739, 1.975, -0.953]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={0.035}
      />
      <mesh
        geometry={nodes.Node003.geometry}
        material={materials["Material_2.001"]}
        position={[0.739, 1.975, -0.953]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={0.035}
      />
    </group>
  );
};
useGLTF.preload("PlayerModel.glb");
export default Model;
