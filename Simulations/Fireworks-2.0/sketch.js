let world;

function setup(){
	createCanvas(640, 640);

	world = new OGWorld();
}

function mousePressed(){
	let pos = createVector(mouseX, mouseY);
	let upwardsForce = randomBetween(7,9);
	let lifeTime = 50;
	
	world.addNewObject(new Firework(pos, upwardsForce, lifeTime));
}

function draw(){
	background(50,50);

	world.update(function(){
		this.color[3] -= 5;
		this.strokeColor[3] -= 5;
		this.lifeTime--;

		if(this.lifeTime <= 0)
			this.explode();

		if(this.color[3] <= 0){
			world.kill(this);
		}
	});
	world.showWorldObjects();
}