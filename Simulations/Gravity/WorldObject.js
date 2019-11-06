function WorldObject(initialPos, mass){
	this.mass = mass;
	this.pos = createVector(initialPos.x, initialPos.y);
	this.vel = createVector(0,0);
	this.acc = createVector(0,0);
	this.life = 255;
}

WorldObject.prototype.addForce = function(vector){
	vector.y *= -1;
	this.vel.add(vector);
}

WorldObject.prototype.move = function(){
	this.vel.add(this.acc);
	this.pos.add(this.vel);
}

WorldObject.prototype.decreaseLife = function(){
	this.life--;
}