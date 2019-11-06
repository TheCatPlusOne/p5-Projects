let img;
let dimention = 1;

function preload(){
	img = loadImage("Duck.jpg");
}

function setup(){
	createCanvas(512, 512);
	image(img, 0, 0);
	pixelDensity(1);
	loadPixels();

	setInterval(function(){
		if(dimention == width)
			dimention = 1;
		else
			dimention *= 2;
	}, 1500);
}

function draw(){
	let squareSize = width / dimention;

	updatePixels();

	for(let y = 0; y < height; y += squareSize){
		for(let x = 0; x < width; x += squareSize){
			noStroke();

			//mudar o estilo de pixelação aqui:
			fill(getTopLeftPixelColor(x, y, squareSize));
			rect(y, x, squareSize, squareSize);
		}
	}
}

function getAverageColor(x, y, size){
	let r = 0, g = 0, b = 0, a = 0, count = 0;
	let startIndex = (y + x * width) * 4;
	let totalPixels = size * size;

	for(let i = 0; i < totalPixels; i++){
		let index = startIndex + i * 4;
		r += pixels[index];
		g += pixels[index+1];
		b += pixels[index+2];
		a += pixels[index+3];
	}

	r /= totalPixels;
	g /= totalPixels;
	b /= totalPixels;
	a /= totalPixels;

	return color(r, g, b, a);
}

function getTopLeftPixelColor(x, y, size){
	let index = (y + x * width) * 4;
	r = pixels[index];
	g = pixels[index+1];
	b = pixels[index+2];
	a = pixels[index+3];

	return color(r, g, b, a);
}