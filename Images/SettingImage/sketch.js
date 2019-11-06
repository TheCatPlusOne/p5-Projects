var img;

function preload(){
	img = loadImage("Duck.jpg");
}

function setup(){
	pixelDensity(1);
	createCanvas(1024, 1024);
	background(47);

	tint(0, 0, 255, 128);
	image(img, 0, 0, 512, 512);

	noTint();
	image(img, 512, 512, 512, 512);

	image(img, 512, 0, 512, 512);

	image(img, 0, 512, 512, 512);

	var d = pixelDensity();
	var halfImage = 4 * (img.width * d) * (img.height * d);
	loadPixels();
	for (var i = 0; i < halfImage; i++){
		pixels[i + halfImage] = pixels[i];
	}
	updatePixels();
}

function draw(){
	
}