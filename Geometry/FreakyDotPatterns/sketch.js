let base;
let dotRadius = 2;
let nDots = 2000;

let rotateAngleSlider;
let xTranslateSlider;
let yTranslateSlider;

function setup(){
	createCanvas(640, 640);
	angleMode(DEGREES);

	base = createBase(nDots);

	setSliders();

	fill(255);
	noStroke();
}

function draw(){
	background(50);
	
	push();
		translate(width/2, height/2);
		drawBase(base);
		
		push();
			translate(xTranslateSlider.value(), yTranslateSlider.value());
			rotate(rotateAngleSlider.value());
			drawBase(base);
		pop();
	pop();
}

function setSliders(){
	createP("");

	createSpan("Rotation: ");
	rotateAngleSlider = createSlider(0, 8, 0, 0.01);
	createP("");
	
	createSpan("X: ");
	xTranslateSlider = createSlider(-width/20, width/20, 0, 0.01);
	createP("");
	
	createSpan("Y: ");
	yTranslateSlider = createSlider(-height/20, height/20, 0, 0.01);
	createP("");
}

function createBase(n){
	let base = [];

	for(let i = 0; i < n; i++){
		base.push({
			x : Math.floor(Math.random() * width - width/2),
			y : Math.floor(Math.random() * height - height/2)
		});
	}

	return base;
}

function drawBase(base){
	fill(255);
	base.forEach(e => ellipse(e.x, e.y, dotRadius*2));
}