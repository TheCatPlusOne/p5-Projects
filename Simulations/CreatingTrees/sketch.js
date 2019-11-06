let plant;
let plant2;

function setup(){
	createCanvas(windowWidth,windowHeight);
	angleMode(DEGREES);

	stroke(255);
	background(50);
	
	plant = new Plant(width * 2/4, height, 12, 25);
	let x = "F" + createChromo();
	let f = "FF";
	plant.setXChromo("FF[-XF--]F[+XF]FF+F[+XF++]F[-XF]");
	plant.setFChromo(f);

	console.log(x);
	console.log(f);

	for(let i = 0; i < 1; i++)
		plant.evolute();


	// plant2 = new Plant(width * 3/4, height, 12, 25);
	// plant2.setXChromo("F");

	// console.log(x);
	// console.log(f);

	// for(let i = 0; i < 7; i++)
	// 	plant2.evolute();
}

function draw(){
	background(50);

	plant.show();
	// plant2.show();

	noLoop();
}

function mousePressed(){
	plant.evolute();
	// plant2.evolute();

	background(50);
	plant.show();
	// plant2.show();
}

let codes = ["X", "F", "+", "-", "[", "]"];

function createChromo(){
	let chromo = "";

	let n = Math.floor(Math.random() * 20 + 20);
	for(let i = 0; i < n; i++){
		let code = codes[Math.floor(Math.random() * codes.length)];
		chromo += code;
	}

	return chromo;
}