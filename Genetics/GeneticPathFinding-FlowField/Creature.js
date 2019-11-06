function Creature(initialPosition, size){
	this.pos = initialPosition;
	this.size = size;

	this.angle = 0;
	this.fitness = 0;
	this.timeCounter = 0;
	this.distanceToGoal;

	this.fieldResolution = 32;
	this.flowField = new FlowField(this.fieldResolution);

	OGPhysicsObject.call(this, this.pos, 1);
	this.gravity.existence = false;
}
Creature.prototype = Object.create(OGPhysicsObject.prototype);

Creature.prototype.show = function(){
	push();
	stroke(255);
	noFill();
	translate(this.pos.x, this.pos.y);
	rotate(this.angle);

	let halfSize = this.size/2;
	triangle(halfSize, halfSize, -halfSize, halfSize, 0, -2*halfSize);
	pop();

	//this.flowField.showField();
}

Creature.prototype.moveCreature = function(){
	let flowFieldX = Math.floor(this.pos.x / this.fieldResolution);
	let flowFieldY = Math.floor(this.pos.y / this.fieldResolution);

	let index = flowFieldY * width/this.fieldResolution + flowFieldX;
	let vector = this.flowField.vectors[index];
	let force = vector.dir.copy().mult(vector.mag);
	force.y *= -1;
	this.addForce(force);
	this.moveObject();

	let cosine = cos(this.vel.y);
	let sine = sin(this.vel.x);
	this.angle = (this.vel.y < 0) ? atan(sine/cosine) : Math.PI - atan(sine/cosine);

	this.timeCounter++;
}

Creature.prototype.mutate = function(mutationRate){
	for(let i = 0; i < this.flowField.vectors.length; i++){
		if(Math.random() <= mutationRate){
			let x = this.flowField.vectors[i].start.x;
			let y = this.flowField.vectors[i].start.y;
			this.flowField.vectors[i] = createDirectionVector(x, y);
		}
	}
}

Creature.prototype.checkIfItShouldMove = function(goal, obstacles){
	if(this.isKinematic)
		return false;

	if(this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0)
		return false;

	this.distanceToGoal = dist(this.pos.x, this.pos.y, goal.x, goal.y);
	if(this.distanceToGoal <= this.size)
		return false;

	let isHittingObstacle = false;
	obstacles.forEach(e => {
		let distanceToObstacle = dist(this.pos.x, this.pos.y, e.pos.x, e.pos.y);
		if(distanceToObstacle <= e.radius/2)
			isHittingObstacle = true;
	});

	if(isHittingObstacle)
		return false;

	return true;
}