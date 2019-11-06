let img1, img2;

function preload(){
	img1 = loadImage("Bird.jpg");
	img2 = loadImage("Duck.jpg");
}

function setup(){
	createCanvas(512, 512);
	background(50);
	pixelDensity(1);
	loadPixels();
	img1.loadPixels();
	img2.loadPixels();
	for(let i = 0; i < pixels.length; i++)
		pixels[i] = img1.pixels[i] + img2.pixels[i];
	updatePixels();
}