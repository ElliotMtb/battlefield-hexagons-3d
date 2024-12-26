import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

import GrassImage from './grass.png';
import BrickImage from './brick.png';
import StoneImage from './stone.png';
import ForestImage from './forest.png';
import WheatImage from './wheat.png';
import { buildHexGrid } from './HexGrid';

class App extends Component {
  componentDidMount() {

    function main() {
      const canvas = document.querySelector('#root');
      const renderer = new THREE.WebGLRenderer({canvas});

      // const fov = 75;
      // const aspect = 2;  // the canvas default
      // const near = 0.1;
      // const far = 8;
      // const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

      // // Above the scene by 2 units, looking down the z axis
      // camera.position.z = 4;

      
      // const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 5000 );
      camera.position.set( 50, 40, 15 );

      const scene = new THREE.Scene();

      // Panzer Blender Model from BlendSwap model by artist TonyWony. Exported (by Blender) in GLTF format (JSON)

      // Tank Model
      const gltfLoader = new GLTFLoader();

      // Optional: Provide a DRACOLoader instance to decode compressed mesh data
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
      gltfLoader.setDRACOLoader( dracoLoader );

      // Load a glTF resource
      gltfLoader.load(
          // resource URL
          'panzer-4-h.json',
          // called when the resource is loaded
          function ( gltf ) {

              gltf.scene.rotateOnAxis(new THREE.Vector3(1, 0, 0), -1 * Math.PI/2);
              gltf.scene.castShadow = true;
              gltf.scene.receiveShadow = true;

              // gltf.scene.scale.set(.15, .15, .15);

              // Change material
              var newMaterial = new THREE.MeshStandardMaterial({color: 0x44607B, roughness: .75, metalness: .75});
              gltf.scene.traverse((o) => {
                if (o.isMesh) o.material = newMaterial;
              });

              let clone = gltf.scene.clone();
              // clone.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI/2);
              clone.position.x = 3;
              clone.position.y = 0;
              clone.position.z = 3;

              let clone2 = gltf.scene.clone();
              // clone.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI/2);
              clone2.position.x = 3;
              clone2.position.y = 0;
              clone2.position.z = -3;
              
              scene.add( gltf.scene );
              scene.add(clone);
              scene.add(clone2);

              // gltf.animations; // Array<THREE.AnimationClip>
              // gltf.scene; // THREE.Group
              // gltf.scenes; // Array<THREE.Group>
              // gltf.cameras; // Array<THREE.Camera>
              // gltf.asset; // Object

          },
          // called while loading is progressing
          function ( xhr ) {

              console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

          },
          // called when loading has errors
          function ( error ) {

              console.log(error);
              console.log( 'An error happened' );

          }
      );

      const group = buildHexGrid();
      scene.add(group);

      // Fog etc.
      scene.background = new THREE.Color().setHSL( 0.6, 0, 1 );
      scene.fog = new THREE.Fog( scene.background, 1, 5000 );
      
      const controls = new OrbitControls(camera, renderer.domElement );
      controls.update();

      // // Add a light to the scene
      // {
      // const color = 0xFFFFFF;
      // const intensity = 1;
      // const light = new THREE.DirectionalLight(color, intensity);

      // // put the light slghtly left (x), slightly above/up (y) and overhead (higher on the z axis)
      // light.position.set(0, 0, 6);
      // camera.add(light);
      // }

      // LIGHTS

      const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
      hemiLight.color.setHSL( 0.6, 1, 0.6 );
      hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
      hemiLight.position.set( 0, 50, 0 );
      scene.add( hemiLight );

      const hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 10 );
      scene.add( hemiLightHelper );

      //

      const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
      dirLight.color.setHSL( 0.1, 1, 0.95 );
      dirLight.position.set( -60, 90, 30 );
      dirLight.target.position.set(0,0,0);
      // dirLight.position.multiplyScalar( 30 );
      scene.add( dirLight );
      scene.add(dirLight.target);

      dirLight.castShadow = true;


      // const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 10);
      // scene.add( dirLightHelper );

      // const cameraHelper = new THREE.CameraHelper(dirLight.shadow.camera);
      // scene.add(cameraHelper);

      // GROUND

      const groundGeo = new THREE.PlaneGeometry( 10000, 10000 );
      const groundMat = new THREE.MeshLambertMaterial( { color: 0xffffff } );
      groundMat.color.setHSL( 0.095, 1, 0.75 );

      const ground = new THREE.Mesh( groundGeo, groundMat );
      ground.position.y = -.1;
      ground.position.z = -1;
      ground.rotation.x = - Math.PI / 2;
      ground.receiveShadow = true;
      scene.add( ground );

      // SKYDOME

      const vertexShader = document.getElementById( 'vertexShader' ).textContent;
      const fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
      const uniforms = {
        "topColor": { value: new THREE.Color( 0x0077ff ) },
        "bottomColor": { value: new THREE.Color( 0xffffff ) },
        "offset": { value: 33 },
        "exponent": { value: 0.6 }
      };
      uniforms["topColor" ].value.copy( hemiLight.color );

      scene.fog.color.copy( uniforms[ "bottomColor" ].value );

      const skyGeo = new THREE.SphereGeometry( 4000, 32, 15 );
      const skyMat = new THREE.ShaderMaterial( {
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: THREE.BackSide
      } );
      
      const sky = new THREE.Mesh( skyGeo, skyMat );
      sky.rotation.x = Math.PI / 2;
      scene.add( sky );
        
      scene.add(camera);

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

      function render(time) {
          // time *= 0.001;

          if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
          }

          controls.update()
          // objects.forEach((obj) => {
          // obj.rotation.y = time;
          // });

          renderer.render(scene, camera);

          requestAnimationFrame(render);
      }

      requestAnimationFrame(render);
  }

  main();
    // === THREE.JS EXAMPLE CODE END ===
  }
  render() {
    return (
      <div />
    )
  }
}

export default App;
