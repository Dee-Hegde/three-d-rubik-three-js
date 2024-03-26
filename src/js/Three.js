import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Three = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const group = new THREE.Group();
    scene.add(group); 

    const createCube = (x, y, z) => {
      const cubeSize = 1.5;
      const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      const material = new THREE.MeshPhysicalMaterial({
        color: 0x404040,
        roughness: 0.75,
        metalness: 0.5,
        side: THREE.DoubleSide,
      }); // Set color here
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(x, y, z);
      group.add(cube);
    };

    const createRubiksCube = () => {
      const cubeSpacing = 1.9;
      const cubeOffset = (cubeSpacing * 4) / 2 - cubeSpacing / 2;
      for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 4; y++) {
          for (let z = 0; z < 4; z++) {
            const offsetX = (x - 2) * cubeSpacing + cubeOffset;
            const offsetY = (y - 2) * cubeSpacing + cubeOffset;
            const offsetZ = (z - 2) * cubeSpacing + cubeOffset;
            createCube(offsetX, offsetY, offsetZ);
          }
        }
      }
    };

    camera.position.z = 15;

    // Add lights
    const spotLightLeft = new THREE.DirectionalLight(0xffffff); //white
    spotLightLeft.position.set(-20, 20, 0);
    scene.add(spotLightLeft);

    // const spotLightRight = new THREE.SpotLight(0x33ff33); //Green
    // spotLightLeft.position.set(20, -20, -20);
    // scene.add(spotLightRight);

    const spotLightBack = new THREE.DirectionalLight(0xffffff);
    spotLightBack.position.set(-20, 10, 0);
    scene.add(spotLightBack);

    let mouseX = 0;
    let mouseY = 0;
    let isMouseDown = false;

    const onMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const onMouseDown = (event) => {
      isMouseDown = true;
    };

    const onMouseUp = () => {
      isMouseDown = false;
    };

    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('mousedown', onMouseDown, false);
    document.addEventListener('mouseup', onMouseUp, false);

    const animate = (time) => {
      requestAnimationFrame(animate);

      // Rotate the group based on mouse position
      if (isMouseDown) {
        group.rotation.y += mouseX * 0.01;
        group.rotation.x += mouseY * 0.01;
      } else {
        group.rotation.x += 0.005;
        group.rotation.y += 0.005;
        // group.rotation.z = time / 10000;
        renderer.render(scene, camera);
      }

      renderer.render(scene, camera);
    };

    createRubiksCube();
    animate();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Three;
