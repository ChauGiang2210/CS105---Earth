import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

import galaxy from './img/galaxy.jpg';
import red from './img/red.jpg';
import moon from './img/moon.jpg';

const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader()
textureLoader.load(galaxy, function(texture) {
    // Đảm bảo texture bao phủ toàn bộ background
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
});

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const lookAtTarget = new THREE.Vector3(0, 0, 0);
camera.lookAt(lookAtTarget);

camera.position.set(-10, 30, 30);
orbit.update();


// Add Plane
const planeGeometry = new THREE.PlaneGeometry(40, 40);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xdde1dd,
    side: THREE.DoubleSide,
    map: textureLoader.load(galaxy),
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;
// Add Grid

const gridHelper = new THREE.GridHelper(40, 20);
scene.add(gridHelper);

const ambientLight = new THREE.AmbientLight(0x380b6b);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff,0.8);
scene.add(directionalLight);
directionalLight.position.set(-5, 20, 0);

const dLightHelper = new THREE.DirectionalLightHelper(directionalLight,5);
scene.add(dLightHelper);


directionalLight.castShadow = true;
directionalLight.penumbra = 0.5;
directionalLight.shadow.camera.top = 15;
//directionalLight.shadow.camera.right = -12;

const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(dLightShadowHelper);


// const spotLight = new THREE.SpotLight( 0xffffff, 1) 
// spotLight.position.set(5, 30, 0);

// spotLight.angle = 0.3;
// spotLight.decay = 0;
// scene.add(spotLight);

// const sLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(sLightHelper);

// Camera GUI
const cameraGui = new dat.GUI({width: 400});

const cameraOptions = {
    "Camera Rotation": true,
    "Camera Rotation Speed": 1
};

cameraGui.add(cameraOptions, "Camera Rotation").onChange(function(e){
    isCameraRotating = e;
});

cameraGui.add(cameraOptions, "Camera Rotation Speed", 0, 5);

// Thay đổi vị trí của cameraGui
cameraGui.domElement.style.position = 'absolute';
cameraGui.domElement.style.top = '10px'; // Thay đổi vị trí lên trên cùng
cameraGui.domElement.style.left = '10px'; // Thay đổi vị trí sang trái

// Thêm GUI vào DOM
document.body.appendChild(cameraGui.domElement);

// Add Sphere
const SphereGeometry = new THREE.SphereGeometry(5, 80, 80);
const SphereMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    wireframe: false,
    map: textureLoader.load(red),
});
const Sphere = new THREE.Mesh(SphereGeometry, SphereMaterial);
scene.add(Sphere);
Sphere.position.set(0, 10, 0);
Sphere.castShadow = true;
// Add GUI for Sphere
const SphereGui = new dat.GUI({width: 400});

const SphereOptions = {
    "Sphere Color": '#00FF00',
    "Sphere Segments": 5,
    "Sphere Scale": 3,
    "Sphere Moving Speed": 0.01,
    "Sphere Auto Rotation": true,
    "Wireframe": true,
    x: 0,
    y: 0,
    z: 0,
    r: 0,
    "Reset Position": true
};

SphereGui.addColor(SphereOptions, 'Sphere Color').onChange(function(e){
    Sphere.material.color.set(e);
});

SphereGui.add(SphereOptions, 'Sphere Segments', 5, 100, 5).onChange(function(e){
    const newSphereGeometry = new THREE.SphereGeometry(4, e, e);
    Sphere.geometry.dispose(); 
    Sphere.geometry = newSphereGeometry;
});

SphereGui.add(SphereOptions, "Sphere Scale", 0.5, 3).onChange(function(e){
    Sphere.scale.set(e, e, e);
});

SphereGui.add(SphereOptions, 'Sphere Auto Rotation').onChange(function(e){
    isSphereRotating = e;
});

SphereGui.add(SphereOptions, 'Wireframe').onChange(function(e){
    Sphere.material.wireframe = e;
});

SphereGui.add(SphereOptions, 'x',-10,10)
SphereGui.add(SphereOptions, 'y',-10,10)
SphereGui.add(SphereOptions, 'z',-10,10)
SphereGui.add(SphereOptions, 'r', 0, 10).onChange(function(e)
{
    Sphere.position.set(0, 8, 0);
    if (e > 0)
        isSphereSpin = true;
    else
        isSphereSpin = false;
})

SphereGui.add(SphereOptions, 'Reset Position').onChange(function(e){
    Sphere.position.set(0, 10, 0);
});

//Thêm mặt trăng

const SphereGeometry2 = new THREE.SphereGeometry(1, 80, 80);
const SphereMaterial2 = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    wireframe: false,
    map: textureLoader.load(moon),
});
const Sphere2 = new THREE.Mesh(SphereGeometry2, SphereMaterial2);
scene.add(Sphere2);
Sphere2.position.set(10, 10, 0);
Sphere2.castShadow = true;

// Animate Object
let isSphereRotating = true;
let isSphereMoving = true;
let isCameraRotating = true;
let isSphereSpin = false;
let isSphere2Spin = true;

let SphereStep = 0;
let SphereSpeed = 0;
let x = 0, y = 0, z = 0, theta = 0;
function animate()
{
    if(isCameraRotating) 
    {
        const radius = 30; 

        const angle = Date.now() * (cameraOptions["Camera Rotation Speed"]/10000);
        const cameraX = Math.sin(angle) * radius;
        const cameraZ = Math.cos(angle) * radius;

        camera.position.set(cameraX, 25, cameraZ);

        camera.lookAt(lookAtTarget);
    }  
    if (isSphereRotating) 
    {
        Sphere.rotation.x += 0.01;
        Sphere.rotation.y += 0.01;
    }  
    if(isSphereMoving)
    {
        SphereStep += SphereOptions["Sphere Moving Speed"];
        x = SphereOptions.x/100;
        y = SphereOptions.y/100;
        z = SphereOptions.z/100;
        limit = 20;
        if ((Sphere.position.x <= limit) && (Sphere.position.y <= limit) && (Sphere.position.z <= limit) && (Sphere.position.x >= -limit) && (Sphere.position.y >= -limit) && (Sphere.position.z >= -limit))
        {   
            Sphere.position.x += x;
            Sphere.position.y += y;
            Sphere.position.z += z;
        }
        else
        {
            if (Sphere.position.x > limit) Sphere.position.x = limit;
            if (Sphere.position.y > limit) Sphere.position.y = limit;
            if (Sphere.position.z > limit) Sphere.position.z = limit;
        }

    }
    if (isSphereSpin)
    {
        theta += Math.PI / 32
        Sphere.position.x = SphereOptions.r * Math.sin(theta);
        Sphere.position.z= SphereOptions.r * Math.cos(theta);
    }
    if (isSphere2Spin)
        {
            const R = 8;
            theta += Math.PI / 128;
            Sphere2.position.x = R * Math.sin(theta);
            Sphere2.position.z=  R * Math.cos(theta);
        }
  
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);


