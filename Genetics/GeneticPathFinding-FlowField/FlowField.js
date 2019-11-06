function FlowField(density){
	this.density = density;
	this.vectors = [];

	this.populateVectors();
}

FlowField.prototype.populateVectors = function(){
	for(let y = 0; y < height; y += this.density){
		for(let x = 0; x < width; x += this.density){
			this.vectors.push(createDirectionVector(x, y));
		}
	}
}

function createDirectionVector(x, y){
	let angle = map(Math.random(), 0, 1, 0, 360);
	let dirX = sin(angle);
	let dirY = cos(angle);

	return {
		start : createVector(x, y),
		dir : createVector(dirX, dirY),
		mag : Math.random() * 0.02
	}
}

FlowField.prototype.showField = function(){
	this.vectors.forEach(e => {
		push();
		stroke(255,100);
		translate(e.start.x+this.density/2, e.start.y+this.density/2);
		fill(255, 10)
		ellipse(0, 0, 4);
		line(0, 0, e.dir.x*e.mag*1000, e.dir.y*e.mag*1000);
		pop();
	});
}

FlowField.prototype.zerarTudo = function(){
	for(let i = 0; i < this.vectors.length; i++){
		this.vectors[i] = {
			start : createVector(this.vectors[i].start.x, this.vectors[i].start.y),
			dir : createVector(0, 0),
			mag : 0
		};
	}

	console.log("zerar");
}