function setup(){
	createCanvas(640, 640);
	pixelDensity(1);
	loadPixels();

	for(let x = 0; x < width; x++){
		for(let y = 0; y < height; y++){
			let greyScale = noise(x/100, y/100);

			greyScale = map(greyScale, 0, 1, 0, 255);

			let index = (x + y * width) * 4;
			pixels[index+0] = greyScale;
			pixels[index+1] = greyScale;
			pixels[index+2] = greyScale;
			pixels[index+3] = 255;
		}
	}

	updatePixels();
}