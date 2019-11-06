let iteration = 0;

function setup(){
	createCanvas(640, 640);
	rectMode(CENTER);
	fill(255);
	noStroke();
}

function draw(){
	background(50);

	drawCarpet(iteration);

	noLoop();
}

function mousePressed(){
	iteration++;
	draw();
}

function drawCarpet(iteration){
	push();
	translate(width/2, height/2);
	nextIteration(width, iteration);
	pop();
}

function nextIteration(size, iteration){
	if(iteration > 0){
		rect(0, 0, size/3, size/3);
		
		for(let y = -1; y <= 1; y++){
			for(let x = -1; x <= 1; x++){
				if(x != 0 || y != 0){
					push();
					translate(size/3*x, size/3*y);
					nextIteration(size/3, iteration-1);
					pop();
				}
			}
		}
	}
}