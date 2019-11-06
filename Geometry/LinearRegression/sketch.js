let points = [];

// y = mx + b
let m = 0;
let b = 0;
let learningRate = 0.1;

let isDrawingLine = false;

function setup(){
	createCanvas(1000,1000);
	stroke(255);
}

function draw(){
	background(50);

	showPoints();

	if(points.length > 1){
		gradientDescent();
		if(isDrawingLine)
			drawLine();
	}

	if(mouseIsPressed){
		points.push({
			x : map(mouseX, 0, width, 0, 1),
			y : map(mouseY, 0, height, 1, 0)
		});
	}
}

// function mousePressed(){
// 	let radius = Math.random() * 50 + 10;
// 	let sides = 8;

// 	for(let i = 0; i < sides; i++){
// 		let angle = TWO_PI * i / sides;
// 		let x = radius * cos(angle) + mouseX;
// 		let y = radius * sin(angle) + mouseY;

// 		points.push({
// 			x : map(x, 0, width, 0, 1),
// 			y : map(y, 0, height, 1, 0)
// 		});
// 	}
// }

function keyPressed(){
	if(key == " ")
		isDrawingLine = !isDrawingLine;

	if(key == "R"){
		for(let i = 0; i <= 1000; i++){
			points.push({
				x : Math.random(),
				y : Math.random()
			});
		}
	}
}

function ordinaryLeastSquare(){
	let xBar = points.reduce((maintain, e) => maintain+e.x, 0)/points.length;
	let yBar = points.reduce((maintain, e) => maintain+e.y, 0)/points.length;

	let mTopEquation = points.reduce((maintain, e) => maintain + (e.x-xBar) * (e.y-yBar), 0);
	let mBottomEquation = points.reduce((maintain, e) => maintain + Math.pow(e.x-xBar, 2), 0);

	m = mTopEquation / mBottomEquation;
	b = yBar - m*xBar;
}

function gradientDescent(){
	points.forEach(e => {
		let guess = m * e.x + b;
		let error = e.y - guess;

		m += error * e.x * learningRate;
		b += error * learningRate;
	});
}

function showPoints(){
	points.forEach(e => {
		let x = map(e.x, 0, 1, 0, width);
		let y = map(e.y, 0, 1, height, 0);

		ellipse(x, y, 3);
	});
}

function drawLine(){
	let x1 = 0;
	let y1 = m * x1 + b;
	let x2 = 1;
	let y2 = m * x2 + b;

	x1 = map(x1, 0, 1, 0, width);
	y1 = map(y1, 0, 1, height, 0);
	x2 = map(x2, 0, 1, 0, width);
	y2 = map(y2, 0, 1, height, 0);
	
	line(x1, y1, x2, y2);
}