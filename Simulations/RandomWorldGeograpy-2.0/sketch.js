// let n = 640/100;
// let zoom = .01;

// let lacunarity = 2;
// let persistance = .5;

// let levels = [
// 	{limit: .3, color: "#173C72"},
// 	{limit: .4, color: "#1D4C8E"},
// 	{limit: .5, color: "#F9D986"},
// 	{limit: .6, color: "#689A19"},
// 	{limit: .7, color: "#598E1B"},
// 	{limit: .8, color: "#242324"},
// 	{limit: 1, color: "#ECF0F1"},
// ];

// function setup(){
// 	createCanvas(640,640);
// }

// function draw(){
// 	for(let i = 0; i < width; i += n){
// 		for(let j = 0; j < height; j += n){
// 			let value = 0;

// 			value += noise(i*zoom, j*zoom);

// 			color = getColor(value);
// 			fill(color);
// 			stroke(color);
// 			rect(i, j, n, n);
// 		}
// 	}
// }

// function getColor(value){
// 	for(let i = 0; i < levels.length; i++){
// 		if(value < levels[i].limit)
// 			return levels[i].color;
// 	}

// 	console.log("Nothing found");
// 	return 0;
// }

function setup(){
	createCanvas(640,640);
	stroke(255);
	noFill();
}

function draw(){
	background(50);

	let end = 0;
	while(end < width)
		end += frequency;

	beginShape();
	for(let i = 0; i < width; i++){
		vertex(i, getValue(i, 1, 2, .5));
	}
	endShape();

	noLoop();
}

function getValue(x, octaves, lacunarity, persistance){
	let value = 0;

	for(let i = 0; i < octaves; i++){
		let frequency = Math.pow(lacunarity, i);
		let amplitude = Math.pow(persistance, i);


		value += noise(x*frequency*amplitude);
	}

	return value;
}