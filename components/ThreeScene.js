'use client'; // MIGRATION NOTE: Required for Next.js client-side rendering

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { buildHexGrid } from './HexGrid';

/**
 * MIGRATION NOTE: ThreeScene component
 * - Replaces the App class component from CRA
 * - Converted to functional component with hooks
 * - Uses useEffect for Three.js initialization (client-side only)
 * - Replaces document.querySelector with useRef
 * - Includes shader code directly in component (moved from HTML)
 */

const ThreeScene = () => {
  const canvasRef = useRef(null);

  // MIGRATION NOTE: Shader code moved from HTML script tags to JavaScript strings
  const vertexShader = `
    varying vec3 vWorldPosition;

    void main() {
      vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
      vWorldPosition = worldPosition.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `;

  const fragmentShader = `
    uniform vec3 topColor;
    uniform vec3 bottomColor;
    uniform float offset;
    uniform float exponent;

    varying vec3 vWorldPosition;

    void main() {
      float h = normalize( vWorldPosition + offset ).y;
      gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h , 0.0), exponent ), 0.0 ) ), 1.0 );
    }
  `;

  useEffect(() => {
    if (!canvasRef.current) return;

    // MIGRATION NOTE: Replaced document.querySelector('#root') with canvasRef.current
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

    // Camera setup
    const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.set(50, 40, 15);

    const scene = new THREE.Scene();

    // Tank Model Loading
    const gltfLoader = new GLTFLoader();

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/examples/js/libs/draco/');
    gltfLoader.setDRACOLoader(dracoLoader);

    // Load a glTF resource
    gltfLoader.load(
      // resource URL - MIGRATION NOTE: Updated path for Next.js public folder
      '/panzer-4-h.json',
      // called when the resource is loaded
      function (gltf) {
        gltf.scene.rotateOnAxis(new THREE.Vector3(1, 0, 0), -1 * Math.PI/2);
        gltf.scene.castShadow = true;
        gltf.scene.receiveShadow = true;

        // Change material
        var newMaterial = new THREE.MeshStandardMaterial({color: 0x44607B, roughness: .75, metalness: .75});
        gltf.scene.traverse((o) => {
          if (o.isMesh) o.material = newMaterial;
        });

        let clone = gltf.scene.clone();
        clone.position.x = 3;
        clone.position.y = 0;
        clone.position.z = 3;

        let clone2 = gltf.scene.clone();
        clone2.position.x = 3;
        clone2.position.y = 0;
        clone2.position.z = -3;

        scene.add(gltf.scene);
        scene.add(clone);
        scene.add(clone2);
      },
      // called while loading is progressing
      function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      // called when loading has errors
      function (error) {
        console.log(error);
        console.log('An error happened');
      }
    );

    // Hex Grid
    const group = buildHexGrid();
    scene.add(group);

    // Fog and background
    scene.background = new THREE.Color().setHSL(0.6, 0, 1);
    scene.fog = new THREE.Fog(scene.background, 1, 5000);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    // LIGHTS
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
    scene.add(hemiLightHelper);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.color.setHSL(0.1, 1, 0.95);
    dirLight.position.set(-60, 90, 30);
    dirLight.target.position.set(0, 0, 0);
    scene.add(dirLight);
    scene.add(dirLight.target);

    dirLight.castShadow = true;

    // GROUND
    const groundGeo = new THREE.PlaneGeometry(10000, 10000);
    const groundMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    groundMat.color.setHSL(0.095, 1, 0.75);

    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -.1;
    ground.position.z = -1;
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // SKYDOME - MIGRATION NOTE: Using shader strings instead of DOM script tags
    const uniforms = {
      "topColor": { value: new THREE.Color(0x0077ff) },
      "bottomColor": { value: new THREE.Color(0xffffff) },
      "offset": { value: 33 },
      "exponent": { value: 0.6 }
    };
    uniforms["topColor"].value.copy(hemiLight.color);

    scene.fog.color.copy(uniforms["bottomColor"].value);

    const skyGeo = new THREE.SphereGeometry(4000, 32, 15);
    const skyMat = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: THREE.BackSide
    });

    const sky = new THREE.Mesh(skyGeo, skyMat);
    sky.rotation.x = Math.PI / 2;
    scene.add(sky);

    scene.add(camera);

    // Resize handler - MIGRATION NOTE: Updated to use canvasRef instead of DOM query
    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }

    // Animation loop
    function render(time) {
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }

    // Start animation loop
    requestAnimationFrame(render);

    // MIGRATION NOTE: Cleanup function for useEffect
    // Properly dispose WebGL resources to prevent memory leaks
    return () => {
      // Dispose renderer
      renderer.dispose();

      // Clean up event listeners
      window.removeEventListener('resize', resizeRendererToDisplaySize);

      // Traverse and dispose all geometries, materials, and textures
      scene.traverse((object) => {
        if (object.isMesh) {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (object.material.map) object.material.map.dispose();
            object.material.dispose();
          }
        }
      });

      // Dispose controls
      controls.dispose();
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block'
      }}
    />
  );
};

export default ThreeScene;
