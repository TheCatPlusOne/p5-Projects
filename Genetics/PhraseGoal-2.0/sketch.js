let goal = "Mateus Silveira";
let nElements = 200;
let mutationRate = 0.1;
let trainer;

function setup(){
	createCanvas(800,800);

	trainer = new Trainer(goal, nElements, mutationRate);
}

function draw(){
	background(230);

	trainer.createNewGeneration();
	
	displayResults(trainer);
}

function mousePressed(){
	
}

function displayResults(trainer){
	for(let i = 0; i < trainer.currentGen.length; i++){
		text(trainer.currentGen[i].dna, 50, i*16+64);
	}

	push();
	textSize(16);
	text("BEST:", width/2, height/2-48);
	textSize(32);
	text(trainer.best.dna, width/2, height/2);
	textSize(16);
	text("Iterations: " + trainer.iterations, width/2, height/2 + 48);
	pop();
}

function getRandomCharacter(){
	let char = String.fromCharCode(getRandomInt(32,127));
	return char;
}

function getRandomInt(min, max){
	return Math.floor(Math.random() * (max-min) + min);
}