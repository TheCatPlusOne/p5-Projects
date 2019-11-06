let canvasObject = {
	x:640,
	y:320
};

let pointObject = {
	r:10
};

function setup(){
	createCanvas(canvasObject.x, canvasObject.y);
	background(47);
}

function draw(){
	let x = random(0, canvasObject.x);
	let y = random(0, canvasObject.y);
	noStroke();
	ellipse(x, y, pointObject.r, pointObject.r);
}

function mousePressed(){
	background(47);
}