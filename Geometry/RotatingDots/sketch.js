let n = 50;
let dots = [];

let speed = 0;
let spacing = 5;

let step = 0;

function setup(){
	createCanvas(640,640);
	stroke(255);
	
	for(let i = 0; i < n; i++){
		dots.push({
			x: (i+1) * spacing,
			y: 0,
		});
	}
}

function draw(){
	background(50);
	noFill();

	speed = map(mouseX, 0, width, 0, 0.01);

	beginShape();
	for(let i = 0; i < n; i++){
		let angle = step * i/2;

		let x = cos(angle) * spacing * (i+1) + width/2;
		let y = sin(angle) * spacing * (i+1) + height/2;

		vertex(x, y);

		push();
		fill(255);
		ellipse(x, y, 5);
		pop();
	}
	endShape();

	step += speed;
}