let starRadius = 2;
let points;
let speed = 2;
let maxDistToConnect = 40;

let mouseForce = 2;
let mouseForceRaius = 100;

function setup(){
	createCanvas(640, 640);
	fill(255);
	stroke(255);

	points = 
		Array(200)
		.fill()
		.map(e => e = {
			x : random(width),
			y : random(height),
			radius : starRadius
		});
}

function draw(){
	background(50);

	push();
	noStroke();
	fill(255, 30);
	ellipse(mouseX, mouseY, mouseForceRaius*2);
	pop();

	drawPoints();
	drawConnections();

	if(mouseIsPressed)
		movePoints();
}

function movePoints(){
	points.forEach(e => {
		let mouseDist = dist(mouseX, mouseY, e.x, e.y);
		if(mouseDist <= mouseForceRaius){
			let tendToPositiveX = 0;
			let tendToPositiveY = 0;

			if(mouseX < e.x)
				tendToPositiveX += mouseForce;
			else
				tendToPositiveX -= mouseForce;

			if(mouseY < e.y)
				tendToPositiveY += mouseForce;
			else
				tendToPositiveY -= mouseForce;

			e.x += tendToPositiveX * speed;
			e.y += tendToPositiveY * speed;
		}
	});
}

function drawPoints(){
	points.forEach(e => {
		ellipse(e.x, e.y, e.radius*2);
	});
}

function drawConnections(){
	points.forEach(e => {
		points.forEach(otherE => {
			let distancia = dist(e.x, e.y, otherE.x, otherE.y);
			if(distancia <= maxDistToConnect){
				push();
				let cor = map(distancia, 0, maxDistToConnect, 255, 0);
				stroke(255, cor);
				line(e.x, e.y, otherE.x, otherE.y);
				pop();
			}
		});
	});
}