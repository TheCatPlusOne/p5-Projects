let pixelSize = 16;
let xoff = 0;
let yoff = 0;
let increment = 0.1;

function setup(){
	createCanvas(640,640);
	noStroke();
	colorMode(HSB);
}

function draw(){
	background(50);

	yoff = mouseY * 0.05;
	for(let y = 0; y < height; y+=pixelSize){
		xoff = mouseX * 0.05;
		for(let x = 0; x < width; x+=pixelSize){
			let val = map(noise(xoff, yoff), 0, 1, 0, 360);
			fill(val, 100, 100);
			rect(x, y, pixelSize, pixelSize);
			xoff += increment;
		}
		yoff += increment;
	}
}