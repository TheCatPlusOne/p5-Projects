var branch;

function setup(){
	createCanvas(640, 640);
}

function draw(){
	background(50);

	stroke(255);
	strokeWeight(1);

	createTree(width/2, height, 256, "none");
}

function createTree(x, y, size, side){
	if(size >= 1){
		let xFinal = x;
		let yFinal = y - size;

		if(side == "right"){
			xFinal = x + size;
		}else if(side == "left"){
			xFinal = x - size;
		}

		line(x, y, xFinal, yFinal);

		createTree(xFinal, yFinal, size/2, "right");
		createTree(xFinal, yFinal, size/2, "left");
	}
}