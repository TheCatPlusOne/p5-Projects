function setup(){
	createCanvas(320, 240);
	pixelDensity(1);
	background(47);
}

function draw(){
	loadPixels();
	
	for(let i = 0; i < height; i++){
		for(let j = 0; j < width; j++){
			let pixelPos = (j + i * width) * 4;
			pixels[pixelPos+0] = j;
			pixels[pixelPos+1] = 0;
			pixels[pixelPos+2] = i;
			pixels[pixelPos+3] = 255;
		}
	}

	updatePixels();
}