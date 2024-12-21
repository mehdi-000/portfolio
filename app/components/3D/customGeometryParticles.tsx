"use client";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { CameraControls } from "@react-three/drei";
import { useTexture } from "@react-three/drei";
import { randFloat } from "three/src/math/MathUtils.js";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Tween } from "three/examples/jsm/libs/tween.module.js";

const fragment = `
  uniform sampler2D uTexture;
  varying vec2 vTextureCoords;
  uniform float uNbLines;
  uniform float uNbColumns;

  float circle(vec2 uv, float border) {
    float radius = 0.5;
    float dist = radius -distance(uv, vec2(0.5));
    return smoothstep(0.0, border, dist);
  }
    void main() {
        vec2 uv = gl_PointCoord;
        uv.y = -1.;
        uv /= vec2(uNbLines, uNbColumns);
        float textOffsetU = vTextureCoords.x / uNbLines;
        float textOffsetV = vTextureCoords.y / uNbColumns;
        uv += vec2(textOffsetU, textOffsetV);
        vec4 textureColor = texture2D(uTexture, uv);


        gl_FragColor = textureColor;
    /*     if (gl_FragColor.r < 0.03) discard; */

        gl_FragColor.a*= circle(gl_PointCoord, 0.2);
    }
    `;
const vertex = `
    uniform float uPointSize;
    
    varying vec2 vTextureCoords;

    attribute vec3 initPosition;

    uniform float uProgress;
    
    void main() {
        #include <begin_vertex>

        transformed = initPosition + ((position - initPosition) * uProgress);

        #include <project_vertex>
    
        gl_PointSize = uPointSize;

        vTextureCoords = position.xy;
    }
    `;

export const CustomGeometryParticles = (props: any) => {
  const {
    count,
    shape,
    picture,
    isMobile,
    fitToBox,
    animDuration,
    camDistance,
  } = props;

  const cameraControlsRef = useRef<CameraControls>(null!);

  const points = useRef<THREE.Points>(null!);
  const anim = Tween;
  const shader = useRef<THREE.ShaderMaterial>(null!);
  const float = 0.0;
  const vertices: number[] = [];
  const initPosition: number[] = [];
  const tl = gsap.timeline({ paused: true });

  let wo = new THREE.Vector3(0, 0, 0);
  useEffect(() => {
    if (fitToBox) cameraControlsRef?.current?.fitToBox(points.current, true);
  }, [fitToBox]);

  const texture = useTexture(picture ?? "/pictures/2.png");
  const rows = isMobile ? 8 * 24 : 16 * 24;
  const columns = isMobile ? 13 * 24 : 9 * 24;

  // Generate our positions attributes array
  const generateParticlePositions = () => {
    const squareSize = 1; // Overall size of the square

    const buttonWidth = 3; // Adjust for width
    const buttonHeight = 1; // Adjust for height
    const borderRadius = 0.2; // Adjust for corner rounding
    const pointDensity = 10; // Points per edge/curve
    const spacing = 0.009; // Spacing between particles
    if (shape === "filledButtonShape") {
      for (let x = -buttonWidth / 2; x <= buttonWidth / 2; x += spacing) {
        for (let y = -buttonHeight / 2; y <= buttonHeight / 2; y += spacing) {
          const isWithinRoundedCorner =
            Math.abs(x) > buttonWidth / 2 - borderRadius &&
            Math.abs(y) > buttonHeight / 2 - borderRadius &&
            Math.hypot(
              Math.abs(x) - (buttonWidth / 2 - borderRadius),
              Math.abs(y) - (buttonHeight / 2 - borderRadius)
            ) > borderRadius;

          if (!isWithinRoundedCorner) {
            // Final position for each particle
            vertices.push(x, y, 0);

            const initPositionpoints = [x, y, randFloat(0, 200)];
            initPosition.push(...initPositionpoints);
          }
        }
      }
    }
    if (shape === "buttonShape") {
      // Define the corners of the rectangle
      const corners = [
        [buttonWidth / 2 - borderRadius, buttonHeight / 2], // Top right, before corner rounding
        [-buttonWidth / 2 + borderRadius, buttonHeight / 2], // Top left
        [-buttonWidth / 2, buttonHeight / 2 - borderRadius], // Left side, before bottom left curve
        [-buttonWidth / 2, -buttonHeight / 2 + borderRadius], // Bottom left
        [-buttonWidth / 2 + borderRadius, -buttonHeight / 2], // Bottom side, before bottom right curve
        [buttonWidth / 2 - borderRadius, -buttonHeight / 2], // Bottom right
        [buttonWidth / 2, -buttonHeight / 2 + borderRadius], // Right side, before top right curve
        [buttonWidth / 2, buttonHeight / 2 - borderRadius], // Top right, completing the loop
      ];

      // Generate rounded corners and edges
      for (let i = 0; i < corners.length; i++) {
        const currentCorner = corners[i];
        const nextCorner = corners[(i + 1) % corners.length];

        // Add rounded corner
        if (i % 2 === 0) {
          // Even indices correspond to corner points
          for (let j = 0; j <= pointDensity; j++) {
            const angle = (Math.PI / 2) * (j / pointDensity); // 90-degree arc
            const offsetX = Math.cos(angle) * borderRadius;
            const offsetY = Math.sin(angle) * borderRadius;

            const arcPoint = [
              currentCorner[0] +
                Math.sign(nextCorner[0] - currentCorner[0]) * offsetX,
              currentCorner[1] +
                Math.sign(nextCorner[1] - currentCorner[1]) * offsetY,
              0,
            ];
            vertices.push(...arcPoint);
            initPosition.push(...arcPoint);
          }
        }

        // Add straight edge
        for (let k = 0; k < pointDensity; k++) {
          const t = k / pointDensity;
          const edgePoint = [
            currentCorner[0] * (1 - t) + nextCorner[0] * t,
            currentCorner[1] * (1 - t) + nextCorner[1] * t,
            0,
          ];
          vertices.push(...edgePoint);
          initPosition.push(...edgePoint);
        }
      }
    }

    if (shape === "roundedSquare") {
      // Define the corners of the square
      const corners = [
        [squareSize / 2, squareSize / 2], // Top right
        [-squareSize / 2, squareSize / 2], // Top left
        [-squareSize / 2, -squareSize / 2], // Bottom left
        [squareSize / 2, -squareSize / 2], // Bottom right
      ];

      // Add points for each side with rounded corners
      for (let i = 0; i < corners.length; i++) {
        const currentCorner = corners[i];
        const nextCorner = corners[(i + 1) % corners.length];

        // Add corner arc
        for (let j = 0; j <= pointDensity; j++) {
          const angle = (Math.PI / 2) * (j / pointDensity); // 90-degree arc
          const offsetX = Math.cos(angle) * borderRadius;
          const offsetY = Math.sin(angle) * borderRadius;

          // Adjust based on corner position
          const arcPoint = [
            currentCorner[0] - Math.sign(currentCorner[0]) * offsetX,
            currentCorner[1] - Math.sign(currentCorner[1]) * offsetY,
            0,
          ];
          vertices.push(...arcPoint);
          initPosition.push(...arcPoint);
        }

        // Add straight edge
        for (let k = 0; k < pointDensity; k++) {
          const t = k / pointDensity;
          const edgePoint = [
            currentCorner[0] * (1 - t) + nextCorner[0] * t,
            currentCorner[1] * (1 - t) + nextCorner[1] * t,
            0,
          ];
          vertices.push(...edgePoint);
          initPosition.push(...edgePoint);
        }
      }
    }
    if (shape === "box") {
      for (let i = 0; i < count; i++) {
        let x = (Math.random() - 0.5) * 2;
        let y = (Math.random() - 0.5) * 2;
        let z = (Math.random() - 0.5) * 2;
        const point = [x, y, z];

        vertices.push(...point);
      }
    }

    if (shape === "sphere") {
      const distance = 1;

      for (let i = 0; i < count; i++) {
        const theta = THREE.MathUtils.randFloatSpread(360);
        const phi = THREE.MathUtils.randFloatSpread(360);

        let x = distance * Math.sin(theta) * Math.cos(phi);
        let y = distance * Math.sin(theta) * Math.sin(phi);
        let z = distance * Math.cos(theta);

        vertices.push(x, y, z);
      }
    }

    if (shape === "square") {
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          const x = i;
          const y = j;
          const z = 0;
          const initPositionpoints = [i, y, randFloat(0, 500)];
          vertices.push(x, y, z);
          initPosition.push(...initPositionpoints);
        }
      }
    }
    console.log(vertices, "vertices");
    const positions = new Float32Array(vertices);
    const initPositions = new Float32Array(initPosition);

    return { positions, initPositions };
  };

  const { positions, initPositions } = generateParticlePositions();

  useGSAP(() => {
    tl.fromTo(
      shader?.current.uniforms.uProgress,
      { value: 0 },
      { value: 1, duration: animDuration, ease: "Power4.easeOut" }
    );
    tl.play();
  });

  return (
    <>
      <points ref={points}>
        <CameraControls
          distance={camDistance ?? null}
          ref={cameraControlsRef}
          /*             maxDistance={200}
            minDistance={60} */
          mouseButtons={{
            left: 1,
            middle: 16,
            right: 8,
            wheel: 0,
          }}
        />

        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-initPosition"
            count={initPosition.length / 3}
            array={initPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.015}
          color="#5786F5"
          sizeAttenuation
          depthWrite={false}
        />
        <shaderMaterial
          ref={shader}
          fragmentShader={fragment}
          vertexShader={vertex}
          uniforms={{
            uPointSize: { value: 3 },
            uTexture: { value: texture },
            uNbLines: { value: rows },
            uNbColumns: { value: columns },
            uProgress: { value: 0 },
          }}
          depthTest={false}
          depthWrite={false}
          transparent
        />
      </points>
    </>
  );
};
