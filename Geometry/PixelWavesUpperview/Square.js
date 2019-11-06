function Square(x, y, blockSize, color){
	this.pos = {x: x, y: y, z: 0};
	this.blockSize = blockSize;
	this.color = color;
}

Square.prototype.sink = function(value){
	this.pos.z -= value;

	if(this.blockSize + this.pos.z < 0)
		this.pos.z = -this.blockSize;
};

Square.prototype.recoverSize = function(value){
	this.pos.z += value;

	if(this.blockSize + this.pos.z > this.blockSize)
		this.pos.z = 0;
};

Square.prototype.show = function() {
	push();
	fill(this.color);

	rect(this.pos.x, this.pos.y, this.blockSize+this.pos.z, this.blockSize+this.pos.z);
	pop();
};