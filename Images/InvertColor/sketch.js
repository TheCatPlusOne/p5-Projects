let img;
let imgPixels = 43;

function setup(){
	createCanvas(640, 640);
	noStroke();

	img = Array(imgPixels*imgPixels).fill(0);
	for(let i = 0; i < img.length; i++){
		img[i] = [
			Math.floor(Math.random()*255),
			Math.floor(Math.random()*255),
			Math.floor(Math.random()*255)
		];
		//img[i] = [100,100,100];
	}
}

function draw(){
	background(50);

	let pixelIndex = 0;
	for(let i = 0; i < width; i += width/imgPixels){
		for(let j = 0; j < height; j += height/imgPixels){
			fill(img[pixelIndex]);
			rect(i, j, width/imgPixels, height/imgPixels);

			pixelIndex++;
		}
	}
}

function mousePressed(){
	img = invertColors();
}

function invertColors(){
	return img.map(e => e.map(ei => 255-ei));
}