function OGWorld(){
	this.objects = [];
}

OGWorld.prototype.addNewObject = function(object){
	this.objects.push(object);
}

OGWorld.prototype.showWorldObjects = function(){
	this.objects.forEach(e => e.show());
}

OGWorld.prototype.update = function(func){
	if(func)
		this.objects.forEach(e => e.move(func));
	else
		this.objects.forEach(e => e.move());
}

OGWorld.prototype.kill = function(object){
	for(let i = 0; i < this.objects.length; i++){
		if(this.objects[i] == object){
			this.objects.splice(i, 1);
			break;
		}
	}
}

OGWorld.prototype.killAll = function(){
	this.objects = [];
}

/* BASE OBJECT with physics */
function OGPhysicsObject(initialPosition, mass, color, strokeColor){
	this.pos = createVector(initialPosition.x, initialPosition.y);
	this.vel = createVector(0,0);
	this.acc = createVector(0,0);
	this.mass = mass;

	this.isKinematic = false;
	this.gravity = {
		existence: true,
		force: -0.1
	};

	//COLOR PROPERTIES
	if(color)
		this.color = color;
	else
		this.color = 255;

	if(strokeColor)
		this.strokeColor = strokeColor;
	else
		this.strokeColor = [0,0];

}

OGPhysicsObject.prototype.addForce = function(vector){
	vector.y *= -1;
	this.acc.add(vector.div(this.mass));
}

OGPhysicsObject.prototype.moveObject = function(func){
	if(!this.isKinematic){
		if(func){
			this.func = func;
			this.func();
		}

		if(this.gravity.existence){
			this.addForce(createVector(0, this.gravity.force));
		}

		this.vel.add(this.acc);
		this.pos.add(this.vel);

		this.acc.mult(0);
	}
}

/* ELLIPSE with physics */
function OGEllipse(initialPosition, mass, radius, color, strokeColor){
	this.radius = radius;
	OGPhysicsObject.call(this, initialPosition, mass, color, strokeColor);
}
OGEllipse.prototype = Object.create(OGPhysicsObject.prototype);

OGEllipse.prototype.show = function(){
	fill(this.color);
	stroke(this.strokeColor);
	ellipse(this.pos.x, this.pos.y, this.radius);
}

/* GENERAL PROPOUSE Functions */
function randomBetween(min, max){
	return Math.random() * (max - min) + min;
}