let sides;
let r = 150;

function setup(){
	createCanvas(640, 640);
	stroke(255);
	sides = createSlider(0, 20, 0);
	sides.position(250, 550);
}

function draw(){
	background(50);
	translate(width/2, height/2);

	fill(255);
	textSize(32);
	text(sides.value(), 0, 200);

	noFill();
	ellipse(0, 0, 1);

	beginShape();
	for(let i = 0; i < sides.value(); i++){
		let angle = TWO_PI * i / sides.value();
		let x = r * cos(angle);
		let y = r * sin(angle);
		vertex(x, y);
		ellipse(x, y, 3);
	}
	endShape(CLOSE);
}