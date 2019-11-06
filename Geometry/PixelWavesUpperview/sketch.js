let resolution = 64;
let blockSize;

let squares = [];
let waves = [];

function setup(){
	createCanvas(640,640);
	noStroke();
	rectMode(CENTER);

	blockSize = width/resolution;
	generateSquaresGrid();
}

function draw(){
	background(245);
	showSquares();

	waves.forEach(e => e.move());
	waves = killWaves(waves);
}

function mousePressed(){
	let centerIndex = getIndexOfSquareUnderMouse();
	let center = squares[centerIndex];

	waves.push(new Wave(center.pos.x, center.pos.y, 100, 3, 1));
}

function generateSquaresGrid(){
	for(let i = 0; i < resolution; i++){
		for(let j = 0; j < resolution; j++){
			let x = i * blockSize + blockSize/2;
			let y = j * blockSize + blockSize/2;

			squares.push(new Square(x, y, blockSize, [118,71,162]));
		}
	}
}

function showSquares(){
	for(let i = 0; i < squares.length; i++){
		squares[i].show();
		squares[i].recoverSize(.5);
	}
}

function killWaves(arr){
	return arr.filter(e => e.ringForce > 0);
}

function getIndexOfSquareUnderMouse(){
	let x = Math.floor(mouseX / blockSize);
	let y = Math.floor(mouseY / blockSize);

	return x * resolution + y;
}

function getIndexOfSquareAt(x, y){
	let xIndex = Math.floor(x / blockSize);
	let yIndex = Math.floor(y / blockSize);

	return xIndex * resolution + yIndex;
}