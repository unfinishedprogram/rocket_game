import { ConeGeometry, Mesh, MeshBasicMaterial } from "three";
import IDrawable from "./types/drawable";

export default class Rocket implements IDrawable{
	public mesh = new Mesh();
	constructor() {
		const geometry = new ConeGeometry(1, 2, 8, 2, false);
		const material = new MeshBasicMaterial( { color: 0x00ff00 } );
		this.mesh = new Mesh( geometry, material );
	}
}