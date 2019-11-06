function Snake(x, y){
	this.x = x;
	this.y = y;
	this.segments = [];

	this.dir = {x: -1, y: 0};
	this.grew = 0;
}

Snake.prototype.grow = function(){
	let newSegment = {x: this.x, y: this.y};

	if(this.segments.length > 0){
		let lastSegment = this.segments[this.segments.length-1];
		newSegment = Object.create(lastSegment);
	}

	this.segments.push(newSegment);
	this.grew++;
}

Snake.prototype.move = function(){
	let lastToMove = this.segments.length;

	if(this.grew > 0){
		lastToMove--;
		this.grew--;
	}

	let lastX = this.x;
	let lastY = this.y;

	this.x += this.dir.x * CELL_SIZE;
	this.y += this.dir.y * CELL_SIZE;

	if(this.segments.length > 0){
		this.segments[0].x = this.x;
		this.segments[0].y = this.y;
	}

	for(let i = 0; i < lastToMove; i++){
		let tempX = this.segments[i].x;
		let tempY = this.segments[i].y;

		this.segments[i].x = lastX;
		this.segments[i].y = lastY;

		lastX = tempX;
		lastY = tempY;
	}
}

Snake.prototype.draw = function(){
	this.segments.forEach(e => {
		rect(e.x, e.y, CELL_SIZE, CELL_SIZE);
	});
}

const UP_ARROW = 38;
const DOWN_ARROW = 40;
const RIGHT_ARROW = 39;
const LEFT_ARROW = 37;

function getDirection(key){
	if(key == UP_ARROW)
		return {x: 0, y: -1};

	else if(key == DOWN_ARROW)
		return {x: 0, y: 1};
	
	else if(key == RIGHT_ARROW)
		return {x: 1, y: 0};
	
	else if(key == LEFT_ARROW)
		return {x: -1, y: 0};

	return null;
}