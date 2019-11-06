let depth = 0;

function setup(){
	createCanvas(640, 640);
	background(50);
	noStroke();
}

function mousePressed(){
	depth++;
	console.log(depth);
	draw();
}

function draw(){
	rectMode(CENTER);
	push();
	translate(width/2, height/2);
	goDeeper(600, 0, 0, depth);
	pop();
	noLoop();
}

function goDeeper(size, centerX, centerY, _depth){
	if(_depth > 0){
		rect(centerX, centerY, size, size);
		if(size >= 3){
			for(let y = -1; y <= 1; y++){
				for(let x = -1; x <= 1; x++){
					if(x == 0 && y == 0){
						fill(50);
						rect(centerX, centerY, size/3, size/3);
					}else{
						fill(255);
						goDeeper(size/3, size/3 * x + centerX, size/3 * y + centerY, _depth-1);
					}
				}
			}
		}
	}
}