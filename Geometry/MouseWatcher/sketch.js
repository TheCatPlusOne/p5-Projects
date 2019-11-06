const size = 30;

let arrows = [];

function setup(){
	createCanvas(640,640);

	for(let i = size; i < width; i += size*2){
		for(let j = size; j < height; j += size*2){
			arrows.push(new Arrow(i, j, size));
		}
	}
}

function draw(){
	background(245);
	
	push();
	colorMode(HSB);
	arrows.forEach(e => e.show());
	pop();
}

function Arrow(x, y, size){
	this.pos = {x: x, y: y};
	this.size = size;
}

Arrow.prototype.show = function(){
	push();

	let distance = dist(mouseX, mouseY, this.pos.x, this.pos.y);

	translate(this.pos.x, this.pos.y);

	push();
	let direction = {
		x: mouseX - this.pos.x,
		y: mouseY - this.pos.y
	};
	let angle = atan2(direction.y, direction.x);
	angle = map(angle, -Math.PI, Math.PI, 0, 2*Math.PI);
	rotate(angle);

	let color = map(angle, 0, 2*Math.PI, 0, 360);
	// stroke(color, 100, 100);
	noStroke();
	// fill(color, 100, 100);
	fill(0, 0, 85);
	ellipse(0, 0, this.size/1.12);
	
	fill(0, 100, 100);
	strokeWeight(2);

	// beginShape();
	// vertex(-this.size/2,0);
	// vertex(this.size/2,0);
	// endShape(CLOSE);

	// beginShape();
	// vertex(0,-this.size/2);
	// vertex(0,this.size/2);
	// endShape(CLOSE);

	ellipse(-this.size/4, 0, this.size/2.5);
	pop();

	push();
	noStroke();
	fill(0);
	
	beginShape();
	vertex(-this.size, 0);
	vertex(0, -this.size/2);
	vertex(this.size, 0);
	vertex(0, -this.size/4);
	endShape(CLOSE);

	beginShape();
	vertex(-this.size, 0);
	vertex(0, this.size/2);
	vertex(this.size, 0);
	vertex(0, this.size/4);
	endShape(CLOSE);
	pop();

	pop();
}