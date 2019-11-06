var screen = {
	l: 640
};

var dot = {
	radius: 2,
	x: screen.l/2,
	y: screen.l/2
};

function setup(){
	createCanvas(screen.l, screen.l);
	background(47);
	criarTriangulo()
}

function draw(){
	let num = parseInt(random(0,3));

	switch(num){
		case 0:
			createDot(320, 100);
			break;
		case 1:
			createDot(540, 540);
			break;
		case 2:
			createDot(100, 540);
			break;
	}
}

function createDot(targetX, targetY){
	dot.x += (targetX - dot.x)/2;
	dot.y += (targetY - dot.y)/2;
	ellipse(dot.x, dot.y, dot.radius, dot.radius);
}

function criarTriangulo(){
	noStroke();
	//OK, nao é equilatero kkkkkkk
	ellipse(320, 100, dot.radius, dot.radius);
	ellipse(540, 540, dot.radius, dot.radius);
	ellipse(100, 540, dot.radius, dot.radius);
}