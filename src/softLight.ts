import { Object3D, PointLight } from "three";

export default function SoftLight(n:number, softness:number) {
	let lightGroup = new Object3D();
	for(let i = 0; i < n; i++){
		let pl = new PointLight("#FFF", 1/n);
		lightGroup.add(pl);
		pl.shadow.mapSize.set(64, 64);
		pl.position.set((Math.random()-0.5) * softness, (Math.random()-0.5) * softness, (Math.random()-0.5) * softness);
		pl.castShadow = true;
	}
	return lightGroup;
}