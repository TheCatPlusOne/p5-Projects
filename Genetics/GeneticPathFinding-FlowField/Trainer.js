function Trainer(goal, nPopulation, mutationRate){
	this.goal = goal;
	this.nPopulation = nPopulation;
	this.mutationRate = mutationRate;
	this.parents = [];
	this.obstacles = [];

	this.creaturesSize = 10;
	this.startPosition = createVector(width/2, height/2);
	this.best;

	OGWorld.call(this);

	this.createSenpais();
} 
Trainer.prototype = Object.create(OGWorld.prototype);

Trainer.prototype.createSenpais = function(){
	for(let i = 0; i < this.nPopulation; i++){
		let newCreature = new Creature(this.startPosition, this.creaturesSize);
		//newCreature.flowField.zerarTudo();
		this.addNewObject(newCreature);
	}
}

Trainer.prototype.updatePosition = function(){
	this.objects.forEach(e => {
		if(e.checkIfItShouldMove(this.goal, this.obstacles))
			e.moveCreature();
		else
			e.isKinematic = true;
	});
}

Trainer.prototype.evaluateGeneration = function(){
	let highestFitness = 0;

	this.objects.forEach(e => {
		e.fitness = 1/e.distanceToGoal;
		if(e.fitness > highestFitness){
			highestFitness = e.fitness;
			this.best = e;
		}
	});
}

Trainer.prototype.getPossibleParents = function(){
	this.parents = [];

	this.objects.forEach(e => {
		this.parents.push(e);

		for(let i = 0; i < e.fitness*1000; i++)
			this.parents.push(e);
	});
}

Trainer.prototype.newGeneration = function(){
	for(let i = 0; i < this.nPopulation; i++){
		let newCreature = new Creature(this.startPosition, this.creaturesSize);

		let index = Math.floor(Math.random() * this.parents.length);
		let parentFlowField = Object.create(this.parents[index].flowField.vectors);
		newCreature.flowField.vectors = parentFlowField;
		newCreature.mutate(this.mutationRate);

		this.addNewObject(newCreature);
	}

	this.objects[0].flowField.vectors = this.best.flowField.vectors;
}

Trainer.prototype.onlyShowBest = function(){
	this.objects[0].show();
}

Trainer.prototype.setObstacles = function(n, maxSize){
	this.obstacles = [];

	for(let i = 0; i < n; i++){
		let x = Math.floor(Math.random() * width);
		let y = Math.floor(Math.random() * height);

		this.obstacles.push({
			pos : createVector(x, y),
			radius : Math.random() * maxSize
		});
	}
}

Trainer.prototype.showObstacles = function(){
	this.obstacles.forEach(e => {
		push();
		fill(255, 100);
		ellipse(e.pos.x, e.pos.y, e.radius);
		pop();
	});
}