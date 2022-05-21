import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh, TextureLoader, Object3D, AmbientLight, Material, MeshPhongMaterial, PointLight, NearestFilter, PlaneGeometry, DirectionalLight, PCFSoftShadowMap, SphereGeometry } from "three";  

import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import SoftLight from "./softLight";

const loader = new OBJLoader();


const scene = new Scene();

let rocket = new Mesh();

loader.load("rocket.obj", obj => {
	const texture = new TextureLoader().load( 'textures/texture.png' );
	texture.anisotropy = 0;
	texture.magFilter = NearestFilter;
	texture.minFilter = NearestFilter;
	const material = new MeshPhongMaterial( { map: texture, specular:"#FFF" } );
	let c = (obj.children[0] as Mesh).geometry!;
	rocket = new Mesh(c, material);
	console.log(rocket);
	rocket.castShadow = true;
	scene.add(rocket);
})

const plane = new Mesh(new PlaneGeometry(10, 10), new MeshPhongMaterial( { specular:"#FFF" } ));
scene.add(plane)
plane.receiveShadow = true
plane.rotateX(-Math.PI/2)
plane.position.setY(-1)
plane.receiveShadow = true;

const la = new AmbientLight( 0x404040 ); // soft white light
const lp = new PointLight( "#FFF" ); // soft white light
lp.castShadow = true;
lp.position.set(0, 5, 0)

const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// const geometry = new BoxGeometry();
// const material = new MeshBasicMaterial( { color: 0x00ff00 } );

// const cube = new Mesh( geometry, material );

scene.add(la, lp)

camera.position.z = 7;

const renderer = new WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;


const keys = new Set();
document.addEventListener("keydown", key => keys.add(key.key));
document.addEventListener("keyup", key => keys.delete(key.key));


let velocity = 0;
let moon_geo = new SphereGeometry(2, 128, 64)

let moon_tex = new TextureLoader().load("textures/moon.jpg")

let moon_mat = new MeshPhongMaterial({displacementMap: moon_tex, displacementScale : 1})

let moon = new Mesh(moon_geo, moon_mat);

scene.add(moon)
moon.receiveShadow = true;
moon.castShadow = true;

function animate() {
	requestAnimationFrame( animate );
	if(keys.has("w")){ 
		velocity+=0.001;
	}
	rocket.translateY(velocity)
	velocity-=0.0005;

	if(rocket.position.y < 0){
		rocket.position.setY(0)
		velocity*=-0.8;
	}

	renderer.render( scene, camera );

}

animate();