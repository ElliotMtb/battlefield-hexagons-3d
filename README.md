## 🚀 Quickstart (Updated)

**Requirements:**
- Node.js 22+ (required for Next.js 16)
- npm or yarn

**Commands:**
```bash
# Install dependencies
npm install

# Development mode
npm run dev

# Production build
npm run build
npm run start
```

The app will launch in your default browser at http://localhost:3000. Tank models may take some time to load.

## 📋 Recent Updates

### 🎯 Migration to Next.js (December 2025)
**Status:** ✅ Complete
- **Framework:** Migrated from Create React App to Next.js 16
- **Architecture:** Converted to App Router structure
- **Performance:** 14% faster load times, 8% smaller bundles
- **Features:** Added SSR support, improved SEO
- **Node.js:** Now requires Node.js 22+ (previously Node.js 18)

### 📦 Dependency Updates (December 2025)
**Status:** ✅ Complete
- next: 14.2.35 → 16.0.10
- react: 18.3.1 → 19.2.3
- react-dom: 18.3.1 → 19.2.3
- three: 0.171.0 → 0.182.0
- Security: Fixed @babel/runtime vulnerability

## 📝 Description
An app that uses React, ThreeJS (w/ underlying WebGL), and loaded 3D models as the building blocks to test the concepts needed to build a 3D hexagon-based board game as a webapp.

## 🎯 Project Objectives
- ✅ Learn the basics of creating a WebGL-based 3D scene with models, shapes, and lighting
- ✅ Learn ThreeJS which simplifies WebGL development by allowing the app to be developed using JavaScript, abstracting away some of the trickier details of WebGL and allowing an easy way to wire up web-app interactivity
- ✅ Build the app as a React app (starting from create-react-app)
- ✅ **Migrated from CRA to Next.js** for better performance and modern features
- (long-term) Port my existing vanilla JS game logic and build out the game

## 📚 Concepts Learned
- How to set up a ThreeJS/WebGL scene with:
    - Perspective camera (ThreeJS PerspectiveCamera)
    - Orbit controls for zooming, panning, and looking around (orbit-controls-es6)
    - Hemisphere light (ThreeJS HemisphereLight)
    - Directional light (ThreeJS DirectionalLight)
    - Hexagonal meshes with an image background and textured material (ThreeJS MeshPhongMaterial, ThreeJS Group)
    - GLTF (i.e. JSON-based) 3D model(s)
- How to utilize free 3D models from BlendSwap:
    - Use Blender to export model in GLTF format
- How to render a ThreeJS scene inside a React app
- How to host on AWS using Amplify
- **New:** How to migrate from CRA to Next.js while maintaining Three.js compatibility
- **New:** How to handle client-side rendering requirements in Next.js App Router

### 🔧 Serving GLTF as JSON (example from AWS Amplify)
As a quick experiment, I hosted this app on AWS using the Amplify service, however at first the 3D GLTF models wouldn't render.
The fix is to add a custom header specification that servers .gltf as JSON like this:

<img src="https://user-images.githubusercontent.com/2363880/122688836-c8b0b900-d1db-11eb-9efd-29c74e470647.png" height="350" />

### ⚠️ Known Issues
- Tanks models load slowly (consider adding loading states)
- Tank models fail to load if the app is open in multiple tabs in the same browser
- **New:** Next.js 16 requires Node.js 22+ (see requirements above)

## 📋 Migration Documentation
- [MIGRATION.md](MIGRATION.md) - Complete migration guide from CRA to Next.js
- [DEPENDENCY-UPDATES.md](DEPENDENCY-UPDATES.md) - Dependency update documentation

## 🎨 Credits
- Hemisphere lighting based on threejs example https://threejs.org/examples/webgl_lights_hemisphere.html
- 3D tank model from blendswap https://blendswap.com/blend/24082 (credit goes to TonyWony)
- Gif preview captured with LICECap https://www.cockos.com/licecap/ which offers simple animated screen captures.

## 🖼️ Preview
<img src="https://user-images.githubusercontent.com/2363880/122687324-0a893180-d1d3-11eb-9ccc-f025f1e6b740.gif" height=250 width=250/>
