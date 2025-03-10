"use client";
import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
// @ts-ignore:
import { Text } from "troika-three-text";

import * as THREE from "three";
import { randInt } from "three/src/math/MathUtils.js";

function useButterflyGLTF() {
  if (typeof window === "undefined") {
    return { nodes: null, materials: null };
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { nodes, materials } = useGLTF("/butterfly-transformed.glb");
  return { nodes, materials };
}

export const SkillsGame = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const butterfly = useButterflyGLTF();
  const skills = [
    "React",
    "Three.js",
    "Unity",
    "C#",
    "JavaScript",
    "TypeScript",
    "Next.js",
    "TailwindCSS",
    "Git",
    "Cinema 4D",
    "Blender",
    "Illustrator",
    "Java",
  ];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { nodes, materials } = useGLTF("/butterfly-transformed.glb");
    const container = containerRef.current;
    if (!container) return;
    let w = container?.clientWidth;
    let h = container?.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.4);

    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 5);
    camera.position.z = 5;
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(w, h);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container?.appendChild(renderer.domElement);

    const loadingManager = new THREE.LoadingManager();

    /*     // Adding Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
    scene.add(ambientLight); */

    /*  const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Sunlight-like light
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xff0000, 1, 100); // Red point light
    pointLight.position.set(0, 5, 0);
    scene.add(pointLight); */

    // Set properties to configure:

    const curve = new THREE.CatmullRomCurve3(
      Array.from({ length: 100 }, (_, i) => {
        const x = (i / 100) * 20 - 10; // X from -10 to 10
        const z = Math.sin(x); // Sine wave along Z
        return new THREE.Vector3(x, 0, z);
      })
    );

    const curve1 = new THREE.CatmullRomCurve3(
      Array.from({ length: 100 }, (_, i) => {
        const theta = (i / 100) * Math.PI * 2; // Full circle
        const radius = 10;
        return new THREE.Vector3(
          radius * Math.cos(theta),
          0, // Constant Y
          radius * Math.sin(theta)
        );
      })
    );

    // Curve Path
    const curvePath = [
      10.136184463414924, -1.374508746897471, 10.384881573913269,
      9.1152593889854714, -1.374508746897471, 8.5846792797570011,
      9.0669355709754882, -1.0665123466336568, 5.8937771631608156,
      10.151040177840205, -0.65913653144937956, 3.4340491740541346,
      10.806779203170416, 1.8859391007298545, 0.46855774212986023,
      10.761433540147586, 2.8724172201359197, -1.2811838605587311,
      9.6195923104445065, 2.8724172201359197, -3.2833099941904766,
      6.9763020889151646, 2.7659257976905427, -4.7591958908830172,
      6.0461277891353697, 1.0727045302089879, -6.6638740164090482,
      7.3472235778544794, -1.8228856326635698, -9.0685043046185623,
      7.226367212900791, -1.8228856326635698, -10.499536640855691,
      5.8354566696263914, -1.8228856326635698, -12.039219379199908,
      3.6532357452141353, -0.20463983570573391, -13.87695442281038,
      -0.30169589630131455, 1.5965000671484342, -14.879986418947327,
      -2.8925694230502157, 2.2971364614427481, -13.892095587598131,
      -4.537672295357936, 4.5863515759659208, -12.140831652074551,
      -6.1287913464117594, 5.9653814634119815, -8.9776527318875896,
      -6.0120301606452813, 4.4081161943855998, -6.712084358394045,
      -5.2138252159038974, 2.820894808418279, -4.4532820412085607,
      -2.3424712835109611, 2.2032065005086259, -3.0788773693500198,
      -0.0076956453915433265, 1.8931797788880202, -1.6577070662471063,
      -0.24767503988481437, 2.8845808465856684, 0.073915859214221724,
      -2.2174044353598896, 4.2415524507318576, 2.215992718290742,
      -3.4526531678364756, 3.0615192023340851, 4.7922404932096558,
      -3.7356278971556445, 1.4054080369354316, 7.8432021841434629,
      -3.4003734463804118, 1.1924069108769393, 9.2464090886227073,
      -1.8851803760476225, 1.5269331003449989, 10.306083896408374,
      0.01071077144031829, 2.1101821577522295, 10.490880699847727,
      0.42562058195647001, 2.2759939598834387, 11.613129436580291,
      0.096405262182225115, 0.032317784084054391, 16.223455375061565,
      2.3458797884520433, 0.38907275257695584, 19.91188266079584,
      5.7018400098488771, 1.73337964747396, 20.615481586999959,
      7.9720939736751824, 1.73337964747396, 19.303399329816457,
      9.8672362721095652, 0.090083018057025177, 16.893338541618121,
      11.225959519544134, -1.374508746897471, 14.279002555560753,
      11.288646925965876, -1.374508746897471, 11.926359497447137,
      10.136184463414924, -1.374508746897471, 10.384881573913269,
    ];

    const points = [];
    for (let i = 0; i < curvePath.length; i += 3) {
      points.push(
        new THREE.Vector3(curvePath[i], curvePath[i + 1], curvePath[i + 2])
      );
    }
    const spline = new THREE.CatmullRomCurve3(points);

    // Tube Geometry
    const tubeGeo = new THREE.TubeGeometry(spline, 222, 3, 16, true);
    const tubeColor = 0x00ccff;
    const edges = new THREE.EdgesGeometry(tubeGeo, 0.2);
    const lineMat = new THREE.LineBasicMaterial({ color: tubeColor });
    const tubeLines = new THREE.LineSegments(edges, lineMat);
    /*     scene.add(tubeLines); */

    const hitMat = new THREE.MeshBasicMaterial({
      color: tubeColor,
      transparent: true,
      opacity: 0.0,
      side: THREE.BackSide,
    });
    const tubeHitArea = new THREE.Mesh(tubeGeo, hitMat);
    scene.add(tubeHitArea);

    // Boxes along the tube
    const boxGroup = new THREE.Group();
    scene.add(boxGroup);

    // Butterflies along the tube
    const numButterflies = 100;
    const size = 0.075;

    for (let i = 0; i < numButterflies; i++) {
      const p = (i / numButterflies + Math.random() * 0.9) % 1;
      const pos = tubeGeo.parameters.path.getPointAt(p);
      pos.x += (Math.random() - 0.5) * 2;
      pos.z += (Math.random() - 0.5) * 2;

      const butterflyMeshGroup = new THREE.Group();

      const butterflyMeshes = butterfly.nodes
        ? [
            new THREE.Mesh(
              (butterfly.nodes.Curve033_2 as THREE.Mesh).geometry,
              new THREE.MeshBasicMaterial({
                color: 0x2f4ad4, //389fd6 3d2fd4 2f4ad4
                transparent: false,
                opacity: 0.5,
              })
            ),

            new THREE.Mesh(
              (butterfly.nodes.Curve033_3 as THREE.Mesh).geometry,
              new THREE.MeshBasicMaterial({
                color: 0x3d2fd4,
                transparent: false,
                opacity: 0.0,
              })
            ),
          ]
        : [];

      butterflyMeshes.forEach((mesh) => butterflyMeshGroup.add(mesh));
      butterflyMeshGroup.position.copy(pos);
      butterflyMeshGroup.name = "box";

      const hitboxGeo = new THREE.BoxGeometry(0.25, 0.2, 0.25);
      const hitBoxMat = new THREE.MeshBasicMaterial({
        color: 0x3d2fd4,
        transparent: true,
        opacity: 0.0,
      });

      const hitBox = new THREE.Mesh(hitboxGeo, hitBoxMat);
      hitBox.position.copy(pos);
      hitBox.name = "butterflybox";

      // Store butterflyMeshGroup as userData on the hitbox
      hitBox.userData.butterfly = butterflyMeshGroup;

      butterflyMeshGroup.userData.hitbox = hitBox;

      boxGroup.add(hitBox);
      boxGroup.add(butterflyMeshGroup);

      const myText = new Text();
      myText.text = skills[randInt(0, 5)];
      myText.fontSize = 0.1;
      myText.position.set(pos.x - 0.1, pos.y, pos.z);
      myText.color = 0x389fd6;

      myText.scale.set(0.5, 0.5, 0.5);
      hitBox.userData.myText = myText;
    }

    let mousePos = new THREE.Vector2();
    const crosshairs = new THREE.Group();
    crosshairs.position.z = -1;
    camera.add(crosshairs);
    const crossMat = new THREE.LineBasicMaterial({
      color: 0x389fd6,
    });
    const lineGeo = new THREE.BufferGeometry();
    const lineVerts = [0, 0.05, 0, 0, 0.02, 0];
    lineGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(lineVerts, 3)
    );

    for (let i = 0; i < 4; i += 1) {
      const line = new THREE.Line(lineGeo, crossMat);
      line.rotation.z = i * 0.5 * Math.PI;
      crosshairs.add(line);
    }

    const raycaster = new THREE.Raycaster();
    const direction = new THREE.Vector3();
    const impactPos = new THREE.Vector3();
    const impactColor = new THREE.Color();
    let impactBox: { scale: { setScalar: (arg0: number) => void } } | null =
      null;

    let lasers: any[] = [];
    const laserGeo = new THREE.IcosahedronGeometry(0.05, 2);

    function getLaserBolt() {
      const laserMat = new THREE.MeshBasicMaterial({
        color: 0x3d2fd4,
        transparent: true,
        fog: false,
      });
      var laserBolt = new THREE.Mesh(laserGeo, laserMat);
      laserBolt.position.copy(camera.position);

      let active = true;
      let speed = 0.5;

      let goalPos = camera.position
        .clone()
        .setFromMatrixPosition(crosshairs.matrixWorld);

      const laserDirection = new THREE.Vector3(0, 0, 0);
      laserDirection
        .subVectors(laserBolt.position, goalPos)
        .normalize()
        .multiplyScalar(speed);

      direction.subVectors(goalPos, camera.position);
      raycaster.set(camera.position, direction);
      let intersects = raycaster.intersectObjects(
        [...boxGroup.children, tubeHitArea],
        true
      );

      if (intersects.length > 0) {
        impactPos.copy(intersects[0].point);
        impactColor.copy(
          (
            (intersects[0].object as THREE.Mesh)
              .material as THREE.MeshBasicMaterial
          ).color
        );
        if (intersects[0].object.name === "box") {
          impactBox = intersects[0].object.userData.box;
          boxGroup.remove(intersects[0].object);
        }
        if (intersects[0].object.name === "butterflybox") {
          impactBox = intersects[0].object.userData.butterfly;
          scene.add(intersects[0].object.userData.myText);
          intersects[0].object.userData.myText.lookAt(camera.position);
          intersects[0].object.userData.myText.sync();
          boxGroup.remove(intersects[0].object);
        }
        if (intersects[0].object.parent?.name === "butterflybox") {
          impactBox = intersects[0].object.parent.userData.butterfly;
          scene.add(intersects[0].object.parent?.userData.myText);
          intersects[0].object.parent?.userData.myText.lookAt(camera.position);
          intersects[0].object.parent?.userData.myText.sync();
          boxGroup.remove(intersects[0].object);
        }
      }

      let scale = 1.5;
      let opacity = 1.0;
      let isExploding = false;

      function update() {
        if (active === true) {
          if (isExploding === false) {
            laserBolt.position.sub(laserDirection);

            if (laserBolt.position.distanceTo(impactPos) < 0.5) {
              laserBolt.position.copy(impactPos);
              laserBolt.material.color.set(impactColor);
              isExploding = true;
              impactBox?.scale.setScalar(0.0);
            }
          } else {
            if (opacity > 0.01) {
              scale += 0.2;
              opacity *= 0.85;
            } else {
              opacity = 0.0;
              scale = 0.01;
              active = false;
            }
            laserBolt.scale.setScalar(scale);
            laserBolt.material.opacity = opacity;
            laserBolt.userData.active = active;
          }
        }
      }
      laserBolt.userData = { update, active };
      return laserBolt;
    }

    // Animation Loop
    function updateCamera(t: number) {
      const time = t * 0.1;
      const looptime = 10 * 1000;
      const p = (time % looptime) / looptime;
      const pos = tubeGeo.parameters.path.getPointAt(p);
      const lookAt = tubeGeo.parameters.path.getPointAt((p + 0.03) % 1);
      camera.position.copy(pos);
      camera.lookAt(lookAt);
    }

    function animate(t = 0) {
      requestAnimationFrame(animate);
      updateCamera(t);
      crosshairs.position.set(mousePos.x, mousePos.y, -1);
      boxGroup.children.forEach((child) => {
        if (child.name === "butterflybox" || child.name === "box") {
          child.rotation.x += 0.02;
          child.rotation.z += 0.02;
        }
      });
      lasers.forEach((l) => l.userData.update());
      renderer.render(scene, camera);
    }
    animate();

    function fireLaser() {
      const laser = getLaserBolt();
      lasers.push(laser);
      scene.add(laser);

      // cleanup
      let inactiveLasers = lasers.filter((l) => l.userData.active === false);
      scene.remove(...inactiveLasers);
      lasers = lasers.filter((l) => l.userData.active === true);
    }
    window.addEventListener("click", () => fireLaser());

    // Handle resize
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    function onMouseMove(evt: { clientX: number; clientY: number }) {
      w = window.innerWidth;
      h = window.innerHeight;
      let aspect = w / h;
      let fudge = { x: aspect * 0.75, y: 0.75 };
      mousePos.x = ((evt.clientX / w) * 2 - 1) * fudge.x;
      mousePos.y = (-1 * (evt.clientY / h) * 2 + 1) * fudge.y;
    }
    window.addEventListener("mousemove", onMouseMove, false);

    /*     window.addEventListener("keydown", handleShoot); */

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousedown", () => fireLaser());
      /*  window.removeEventListener("keydown", handleShoot); */
      container.removeChild(renderer.domElement);
    };
  });

  return (
    <div
      className="cursor-none w-64 md:w-full h-72 md:h-[65vh]"
      ref={containerRef}
    />
  );
};

export default SkillsGame;
