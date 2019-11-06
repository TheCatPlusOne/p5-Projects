let rotation = 0;
let n = 150;
let radius = 200;
let size = 150;
let speed = .3;

let colorfull = false;

function setup(){
	createCanvas(640,640);
	angleMode(DEGREES);
	rectMode(CENTER);
}

function draw(){
	translate(width/2, height/2);
	background(50);

	for(let i = 0; i < n; i++){
		let angle = 360/n * i;

		radius = map(mouseY, 0, height, height/2, 0);
		let x = cos(angle) * radius;
		let y = sin(angle) * radius;

		push();
		if(colorfull){
			colorMode(HSB);
			stroke(angle%360, 100, 100);
		}else{
			stroke(255);
		}
		drawForm(x, y, angle);
		pop();
	}

	rotation += speed;
}

function drawForm(x, y, a){
	push();
	noFill();
	translate(x, y);
	rotate(rotation + a*4);

	let nSides = map(mouseX, 0, width, 0, 10);
	beginShape();
	for(let i = 0; i < nSides; i++){
		let xPoly = cos(360/nSides * i);
		let yPoly = sin(360/nSides * i);
		vertex(xPoly*size/2, yPoly*size/2);
	}
	endShape(CLOSE);

	pop();
}

function mousePressed(){
	colorfull = !colorfull;
}