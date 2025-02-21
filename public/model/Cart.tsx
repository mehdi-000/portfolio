import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

type GroupProps = React.ComponentProps<"group">;
interface ModelProps extends GroupProps {
  disableMobileScaling?: boolean;
}

export const Model = ({
  ref,
  ...props
}: ModelProps & {
  ref: React.RefObject<THREE.Group>;
}) => {
  const { viewport } = useThree();
  const isMobile = viewport.width < 10;
  const { disableMobileScaling } = props;

  const { nodes, materials } = useGLTF("/cart-transformed.glb") as any;

  return (
    <group
      ref={ref}
      {...props}
      dispose={null}
      {...(disableMobileScaling
        ? {}
        : { scale: isMobile ? [0.5, 0.5, 0.5] : [1, 1, 1] })}
    >
      <mesh
        geometry={nodes.Sweep.geometry}
        material={materials.PaletteMaterial001}
        position={[-0.04, 1.848, 1.622]}
        rotation={[0, 0, -Math.PI]}
      />
      <mesh
        geometry={nodes.LOGO.geometry}
        material={nodes.LOGO.material}
        position={[-0.03, 2.093, 3.008]}
        rotation={[-3.109, 0.016, -0.761]}
      />
      <mesh
        geometry={nodes["Cylinder-lether"].geometry}
        material={materials.PaletteMaterial002}
        position={[0.014, 2.488, -2.222]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes["Cylinder-n_light_blue"].geometry}
        material={materials.PaletteMaterial003}
        position={[0.014, 2.488, -2.222]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes["Plane1-red_glass"].geometry}
        material={materials.PaletteMaterial004}
        position={[-2.229, 3.939, -0.257]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <mesh
        geometry={nodes["Plane3-neon_light_pink"].geometry}
        material={materials.PaletteMaterial005}
        position={[1.34, 0.291, -1.216]}
        rotation={[0.257, 0, 0]}
      />
      <instancedMesh
        args={[nodes.Cylinder1.geometry, materials.PaletteMaterial001, 8]}
        instanceMatrix={nodes.Cylinder1.instanceMatrix}
      />
    </group>
  );
};

export default Model;
