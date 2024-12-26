import * as THREE from "three";
import GrassImage from './grass.png';
import BrickImage from './brick.png';
import StoneImage from './stone.png';
import ForestImage from './forest.png';
import WheatImage from './wheat.png';

// // Not affected by light
// // const material = new THREE.MeshBasicMaterial({color: 0x44aa88});
// const material = new THREE.MeshPhongMaterial({color: 0x44aa88});

// const loader = new THREE.TextureLoader();
// const materialGrass = new THREE.MeshPhongMaterial({map: loader.load(GrassImage)});

const radius = 7;

function createHex(material, position, rotationZ = Math.PI / 6) {
  const geometry = new THREE.CircleGeometry(radius, 6);
  const hex = new THREE.Mesh(geometry, material);
  hex.rotation.z = rotationZ;
  hex.position.set(position.x, position.y, position.z);
  hex.receiveShadow = true;

  const edges = new THREE.EdgesGeometry(geometry);
  const meshEdges = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));
  meshEdges.rotation.z = rotationZ;
  meshEdges.position.set(position.x, position.y, position.z);

  return { hex, meshEdges };
}

export function buildHexGrid() {
  const loader = new THREE.TextureLoader();
  const materials = {
    grass: new THREE.MeshPhongMaterial({ map: loader.load(GrassImage) }),
    forest: new THREE.MeshPhongMaterial({ map: loader.load(ForestImage) }),
    wheat: new THREE.MeshPhongMaterial({ map: loader.load(WheatImage) }),
    brick: new THREE.MeshPhongMaterial({ map: loader.load(BrickImage) }),
    stone: new THREE.MeshPhongMaterial({ map: loader.load(StoneImage) }),
  };

  const distCenterToEdge = (1 / 2) * radius * Math.sqrt(3); // 30-60-90 triangle...side adjacent to 30
  const edgeLength = 2 * (1 / 2 * radius); // 30-60-90 triangle...hypotenuse is the radius, so 1/2 hypotenuse is opposite 30...and it's twice that length

const positions = [];
const layers = 6; // Number of concentric layers around the center hex

// Hexagonal Grid algorithm
// https://www.redblobgames.com/grids/hexagons/
for (let q = -layers; q <= layers; q++) {
    for (let r = -layers; r <= layers; r++) {
        const s = -q - r;
        if (Math.abs(s) <= layers) {
            const x = (q + r / 2) * distCenterToEdge * 2;
            const y = r * edgeLength * 1.5;
            positions.push({ x, y, z: 0 });
        }
    }
}

const materialsArray = positions.map(() => {
    const materialKeys = Object.keys(materials);
    const randomKey = materialKeys[Math.floor(Math.random() * materialKeys.length)];
    return materials[randomKey];
});

  const group = new THREE.Group();
  positions.forEach((position, index) => {
    const { hex, meshEdges } = createHex(materialsArray[index], position);
    group.add(hex);
    // Uncomment the following line to add meshEdges
    // group.add(meshEdges);
  });

  // Rotate the group 90 degrees around the x-axis, so it's flat on the ground (not standing up like a wall)
  group.rotation.x = -Math.PI / 2;

  return group;
}
