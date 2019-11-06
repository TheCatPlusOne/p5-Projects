function Wave(x, y, inicialForce, speed, force){
	this.pos = {x: x, y: y};
	this.r = 1;
	this.ringForce = inicialForce;
	this.speed = speed;
	this.force = force;
}

Wave.prototype.move = function(){
	if(this.ringForce > 0){
		ring(this.pos.x, this.pos.y, this.r, this.force);
		
		this.ringForce -= .1;
		this.r += this.speed;
	}
};

function ring(xCenter, yCenter, r, force){
	let n = Math.PI / r*2;

	for(let i = 0; i < Math.PI*2; i += n){
		let x = Math.cos(i) * r + xCenter;
		let y = Math.sin(i) * r + yCenter;

		if(x < width && x > 0 && y < height && y > 0){
			let index = getIndexOfSquareAt(x, y);
			squares[index].sink(force);
		}
	}
}