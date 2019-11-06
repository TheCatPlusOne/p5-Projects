function Snake(x, y, size){
	this.bodyParts = [new BodyPart(x, y)];
	this.head = this.bodyParts[0];
	this.moveDir = createVector(-1,0);
	this.bodyPartSize = size;
}

Snake.prototype.drawSnake = function(){
	for(let i = 0; i < this.bodyParts.length; i++){
		push();
		colorMode(HSB);
		let color = map(i, 0, this.bodyParts.length, 360, 0);
		fill(color, 100, 100);
		rect(this.bodyParts[i].position.x, this.bodyParts[i].position.y, this.bodyPartSize, this.bodyPartSize);
		pop();
	}
}

Snake.prototype.setDirection = function(keyCode){
	if(this.moveDir.x == 0){
		if(keyCode == RIGHT_ARROW)
			snake.moveDir.set(1,0);
		else if(keyCode == LEFT_ARROW)
			snake.moveDir.set(-1,0);
	}

	if(this.moveDir.y == 0){
		if(keyCode == UP_ARROW)
			snake.moveDir.set(0,-1);
		else if(keyCode == DOWN_ARROW)
			snake.moveDir.set(0,1);
	}
}

Snake.prototype.move = function(){
	this.head.passPosToNext();

	let nextPosition = p5.Vector.mult(this.moveDir, this.bodyPartSize);
	this.head.position.add(nextPosition);

	if(this.head.position.x >= width)
		this.head.position.x = 0;
	else if(this.head.position.x < 0)
		this.head.position.x = width;

	if(this.head.position.y >= height)
		this.head.position.y = 0;
	else if(this.head.position.y < 0)
		this.head.position.y = height;

	for(let i = 1; i < this.bodyParts.length; i++)
		if(this.head.position.equals(this.bodyParts[i].position))
			this.reset(width/2, height/2);
}

Snake.prototype.grow = function(){
	let newHead = new BodyPart(this.head.position.x, this.head.position.y);
	this.bodyParts.unshift(newHead);
	newHead.bodyPartBehind = this.head;
	this.head = newHead;

	let nextPosition = p5.Vector.mult(this.moveDir, this.bodyPartSize);
	this.head.position.add(nextPosition);
}

Snake.prototype.reset = function(x, y){
	this.bodyParts = [new BodyPart(x, y)];
	this.head = this.bodyParts[0];
}