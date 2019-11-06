let goal = "Ricardo";
let nElements = 200;
let trainer;

function setup(){
	createCanvas(640,640);

	trainer = new Trainer(goal);
	trainer.createFirstGeneration(nElements);
}

function draw(){
	background(230);

	trainer.displayGen();
	displayResults(trainer);

	if(!trainer.goalReached){
		trainer.createNewGeneration(0.01);
		trainer.findBest();
	}
}

function displayResults(trainer){
	push();
	textSize(16);
	text("BEST:", width/2, height/2-48);
	textSize(32);
	text(trainer.best.val, width/2, height/2);
	textSize(16);
	text("Iterations: " + trainer.iterations, width/2, height/2 + 48);
	pop();
}