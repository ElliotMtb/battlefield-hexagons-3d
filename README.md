## Quickstart
Assuming NodeJS is installed...

1. Clone this repo
2. Open the project from a command line or terminal
3. Type:

npm install
npm build
npm start

It should launch the app in your default browser at localhost:3000. The tank models may take some time to load.

## Recent build/run 2024
As of Dec. 2024, builds and runs successfully on Node v22.12.0 on Microsoft Edge for Linux (Ubuntu)

## Description
An app that uses React, ThreeJS (w/ underlying WebGL), and loaded 3D models as the building blocks to test the concepts needed to build a 3D hexagon-based board game as a webapp.

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
 - How to host on AWS using Amplify

### Serving GLTF as JSON (example from AWS Amplify)
As a quick experiment, I hosted this app on AWS using the Amplify service, however at first the 3D GLTF models wouldn't render.
The fix is to add a custom header specification that servers .gltf as JSON like this:

<img src="https://user-images.githubusercontent.com/2363880/122688836-c8b0b900-d1db-11eb-9efd-29c74e470647.png" height="350" />

### Known issues
- Tanks models load slowly
- Tank models fail to load if the app is open in multiple tabs in the same browser

## Credits
Hemisphere lighting based on threejs example https://threejs.org/examples/webgl_lights_hemisphere.html

3D tank model from blendswap https://blendswap.com/blend/24082 (credit goes to TonyWony)

Gif preview captured with LICECap https://www.cockos.com/licecap/ which offers simple animated screen captures.
## Preview
<img src="https://user-images.githubusercontent.com/2363880/122687324-0a893180-d1d3-11eb-9ccc-f025f1e6b740.gif" height=250 width=250/>

