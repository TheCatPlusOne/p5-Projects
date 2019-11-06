let increment;
let points;
let r = 300;
let incText, pointsText;

function setup(){
	createCanvas(640, 640);
	stroke(255);
	noFill();

	createP("Increment:");
	increment = createSlider(0.1, TWO_PI, PI, 0.001);

	createP("Points:");
	points = createSlider(0, 500, 100, 50);

	incText = createP("Increment: " + increment.value());
	pointsText = createP("Points: " + increment.value());
}

function draw(){
	background(50);

	push();
	translate(width/2, height/2);
	beginShape();
	for(let i = 0; i < points.value(); i++){
		let x = cos(i * increment.value()) * r;
		let y = sin(i * increment.value()) * r;
		vertex(x, y);
	}
	endShape();
	pop();

	incText.html("Increment: " + increment.value());
	pointsText.html("Points: " + points.value());
}