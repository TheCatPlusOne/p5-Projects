function Trainer(goal, nElements, mutationRate){
	this.goal = goal;
	this.nElements = nElements;
	this.mutationRate = mutationRate;

	this.goalReached = false;
	this.currentGen = this.createFirstGeneration();
	this.best = new Element("");
	this.parentsPossibilities = this.getParentsPossibilities();

	this.calcFitness();
	this.findBest();

	this.iterations = 0;
}

Trainer.prototype.createFirstGeneration = function(){
	let generation = [];

	for(let i = 0; i < this.nElements; i++){
		let dna = "";
		for(let j = 0; j < this.goal.length; j++)
			dna += String.fromCharCode(getRandomInt(32,127));

		generation.push(new Element(dna, this.mutationRate));
	}

	return generation;
}

Trainer.prototype.calcFitness = function(){
	this.currentGen.forEach(e => {
		for(let i = 0; i < this.goal.length; i++){
			if(e.dna[i] == this.goal[i])
				e.fitness++;
		}
		e.fitness /= this.goal.length;
	});
}

Trainer.prototype.createNewGeneration = function(){
	if(!this.goalReached){
		this.parentsPossibilities = this.getParentsPossibilities();
		this.reproduce();
		this.calcFitness();
		this.findBest();
		this.iterations++;
	}
}

Trainer.prototype.reproduce = function(){
	for(let i = 0; i < this.currentGen.length; i++){
		let childDna = this.generateChildDna();
		let child = new Element(childDna, this.mutationRate);
		this.currentGen[i] = child;
	}
}

Trainer.prototype.generateChildDna = function(){
	let childDna = "";

	let index = getRandomInt(0, this.goal.length);
	childDna += this.getRandomParent().dna.substring(0, index);
	childDna += this.getRandomParent().dna.substring(index, this.goal.length);

	return childDna;
}

Trainer.prototype.getRandomParent = function(){
	let index = getRandomInt(0, this.parentsPossibilities.length);
	return this.parentsPossibilities[index];
}

Trainer.prototype.getParentsPossibilities = function(){
	let parentsPossibilities = [];

	let generationBestFitness = 0;
	this.currentGen.forEach(e => {
		if(e.fitness > generationBestFitness)
			generationBestFitness = e.fitness;
	});

	this.currentGen.forEach(e => {
		let fitness = map(e.fitness, 0, generationBestFitness, 0, 1);
		let n = Math.floor(fitness);
		for(let i = 0; i < n; i++)
			parentsPossibilities.push(e);
	});

	return parentsPossibilities;
}

Trainer.prototype.findBest = function(){
	this.currentGen.forEach(e => {
		if(e.fitness >= this.best.fitness){
			this.best = e;
		}

		if(e.fitness == 1)
			this.goalReached = true;
	});
}