function Firework(pos, upwardsForce, lifeTime){
	this.pos = pos;
	this.upwardsForce = upwardsForce;
	this.lifeTime = lifeTime;

	OGEllipse.call(this, this.pos, 1, 10);
	this.addForce(createVector(randomBetween(-5, 5), this.upwardsForce));
}
Firework.prototype = Object.create(OGEllipse.prototype);

Firework.prototype.explode = function(){
	let n = 300;
	let forceMult = randomBetween(3,7);

	let randR = Math.floor(Math.random() * 255);
	let randG = Math.floor(Math.random() * 255);
	let randB = Math.floor(Math.random() * 255);
	
	for(let i = 0; i < n; i++){
		let object = new OGEllipse(this.pos, 1, 2, [randR,randG,randB,255], [randR,randG,randB,0]);
		let angle = TWO_PI * i/n;
		object.addForce(createVector(sin(angle) * Math.random() * forceMult, cos(angle) * Math.random() * forceMult));
		world.addNewObject(object);
	}

	world.kill(this);
}