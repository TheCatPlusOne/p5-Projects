function World(){
	this.objects = [];
}

World.prototype.addNewObject = function(x, y, mass){
	let object = new WorldObject(createVector(x, y), mass);
	this.objects.push(object);
}

World.prototype.showWorldObjects = function(){
	this.objects.forEach(e => {
		fill(255, e.life);
		ellipse(e.pos.x, e.pos.y, e.mass);
	});
}

World.prototype.updatePosition = function(){
	this.objects.forEach(e => {
		let gravity = createVector(0,-0.1);
		e.addForce(gravity);
		e.move();	
	});
}

World.prototype.timeToDie = function(cooldown){
	if(frameCount % cooldown == 0){
		for(let i = 0; i < this.objects.length; i++){
			this.objects[i].decreaseLife();
			if(this.objects[i].life < 0){
				this.objects.splice(i, 1);
				i--;
			}
		}
	}
}