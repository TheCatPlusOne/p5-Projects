function StandardObject(x, y, radius, speed){
	this.pos = createVector(x, y);
	this.radius = radius;
	this.speed = speed;

	this.xOff = Math.random() * 1000;
	this.yOff = this.xOff + 1000;
}

StandardObject.prototype.show = function(color){
	push();
	noStroke();
	
	if(color)
		fill(color);

	ellipse(this.pos.x, this.pos.y, this.radius);
	pop();
}

StandardObject.prototype.move = function(){
	let futureX = this.pos.x + map(noise(this.xOff), 0, 1, -this.speed, this.speed);
	if(futureX >= 0 && futureX < width)
		this.pos.x += futureX - this.pos.x;

	let futureY = this.pos.y + map(noise(this.yOff), 0, 1, -this.speed, this.speed);
	if(futureY >= 0 && futureY < height)
		this.pos.y += futureY - this.pos.y;

	this.xOff += 0.01;
	this.yOff += 0.01;
}