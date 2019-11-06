let world;

function setup(){
	createCanvas(640,640);
	noStroke();

	world = new World();
}

function mousePressed(){
	let mass = Math.random() * 50 + 1;
	world.addNewObject(mouseX, mouseY, mass);
}

function draw(){
	background(50);

	world.updatePosition();
	world.timeToDie(1);
	world.showWorldObjects();
}