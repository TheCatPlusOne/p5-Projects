let brushSize;
let brushSizeText;

function setup(){
	pixelDensity(1);
	createCanvas(640, 640);
	background(50, 254);
	loadPixels();
	brushSize = createSlider(1, 100, 50);
	brushSizeText = createP();
}

function draw(){
	if(mouseIsPressed){
		for(let i = floor(-brushSize.value()/2); i <= floor(brushSize.value()/2); i++)
			setSand(mouseX+i, mouseY);
	}

	for(let y = height-1; y >= 0; y--){
		if(frameCount % 2 == 0){
			for(let x = 0; x < width; x++){
				let index = (x + y * width) * 4;
				if(pixels[index+3] != 254)
					makeItDropNotStack(x, y);
			}
		}else{
			for(let x = width; x >= 0 ; x--){
				let index = (x + y * width) * 4;
				if(pixels[index+3] != 254)
					makeItDropNotStack(x, y);
			}
		}
	}

	updatePixels();
	brushSizeText.html(brushSize.value());

	stroke(255);
	line(mouseX-brushSize.value()/2, mouseY, mouseX+brushSize.value()/2, mouseY);
}

function setSand(x, y){
	let index = (x + y * width) * 4;
	pixels[index+0] = 255;
	pixels[index+1] = 255;
	pixels[index+2] = 0;
	pixels[index+3] = 255;
}

function makeItDropNotStack(x, y){
	let pixelDown = (x + (y+1) * width) * 4;
	let pixelDownRight = ((x+1) + (y+1) * width) * 4;
	let pixelDownLeft = ((x-1) + (y+1) * width) * 4;

	let pixelDownAlpha = pixels[pixelDown+3];
	let pixelDownRightAlpha = pixels[pixelDownRight+3];
	let pixelDownLeftAlpha = pixels[pixelDownLeft+3];

	if(pixelDownAlpha == 254){
		setAir(x, y);
		setSand(x, y+1);
	}else if(pixelDownRightAlpha == 254 && pixelDownLeftAlpha != 254){
		setAir(x, y);
		setSand(x+1, y+1);
	}else if(pixelDownLeftAlpha == 254 && pixelDownRightAlpha != 254){
		setAir(x, y);
		setSand(x-1, y+1);
	}else if(pixelDownLeftAlpha == 254 && pixelDownRightAlpha == 254){
		setAir(x, y);
		if(floor(random(2)) == 0)
			setSand(x+1, y+1);
		else
			setSand(x-1, y+1);
	}
}

function setAir(x, y){
	let index = (x + y * width) * 4;
	pixels[index+0] = 50;
	pixels[index+1] = 50;
	pixels[index+2] = 50;
	pixels[index+3] = 254;
}

function makeItDrop(x, y){
	let pixelDown = (x + (y+1) * width) * 4;

	let pixelDownAlpha = pixels[pixelDown+3];

	if(pixelDownAlpha == 254){
		setAir(x, y);
		setSand(x, y+1);
	}
}