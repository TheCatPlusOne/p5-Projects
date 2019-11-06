let goal;
let trainer;
let checkbox;

function setup(){
	createCanvas(640,640);
	stroke(255);

	goal = createVector(0, 0);
	goal.x = Math.floor(Math.random()*width);
	goal.y = Math.floor(Math.random()*height);

	trainer = new Trainer(goal, 100, 0.1);
	trainer.setObstacles(50, 100);

	checkbox = createCheckbox("change goal onClick");
}

function draw(){
	background(50);

	trainer.updatePosition();
	trainer.showWorldObjects();
	//trainer.onlyShowBest();

	if(frameCount % 400 == 0){
		trainer.evaluateGeneration();
		trainer.getPossibleParents();
		trainer.killAll();
		trainer.newGeneration();
	}

	push();
	fill(255,0,0);
	ellipse(goal.x, goal.y, 5);
	pop();

	trainer.showObstacles();
}

function mousePressed(){
	if(checkbox.checked()){
		goal = createVector(mouseX, mouseY);
		trainer.goal = goal;
	}else{
		trainer.obstacles.push({
			pos : createVector(mouseX, mouseY),
			radius : 50
		});
	}
}