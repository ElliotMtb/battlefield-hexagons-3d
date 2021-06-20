## Description
A hexagon-based WW II themed board game built with React and ThreeJS.

## Project Objectives
- Learn the basics of creating a WebGL-based 3D scene with models, shapes, and lighting
- Learn ThreeJS which simplifies WebGL development by allowing the app to be developed using JavaScript, abstracting away some of the trickier details of WebGL and allowing an easy way to wire up web-app interactivity
- Build the app as a React app (starting from create-react-app)
- (long-term) Port my existing vanilla JS game logic and build out the game

## Concepts Learned
- How to set up a ThreeJS/WebGL scene with
    - Perspective camera (ThreeJS PerspectiveCamera)
    - Orbit controls for zooming, panning, and looking around (orbit-controls-es6)
    - Hemisphere light (ThreeJS HemisphereLight)
    - Directional light (ThreeJS DirectionalLight)
    - Hexagonal meshes with an image background and textured material (ThreeJS MeshPhongMaterial, ThreeJS Group)
    - GLTF (i.e. JSON-based) 3D model(s)
 - How to utilize free 3D models from BlendSwap
     - Use Blender to export model in GLTF format
 - How to render a ThreeJS scene inside a React app

## Credits
Hemisphere lighting based on threejs example https://threejs.org/examples/webgl_lights_hemisphere.html

3D tank model from blendswap https://blendswap.com/blend/24082 (credit goes to TonyWony)

## Preview
<img src="https://user-images.githubusercontent.com/2363880/122687324-0a893180-d1d3-11eb-9ccc-f025f1e6b740.gif" height=250 width=250/>

