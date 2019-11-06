function Trainer(goal){
	this.goalReached = false;
	this.goal = goal;
	this.currentGen = [];
	this.best = new Element("");

	this.iterations = 0;
}

Trainer.prototype.createFirstGeneration = function(nElements){
	this.currentGen = [];
	for(let i = 0; i < nElements; i++){
		let string = "";
		for(let j = 0; j < this.goal.length; j++){
			string += String.fromCharCode(randNumGen(32,127));
		}
		
		this.currentGen.push(new Element(string));
	}

	this.calcFitness();
	this.findBest();
}

Trainer.prototype.createNewGeneration = function(mutationRate){
	this.reproduce();
	this.mutate(mutationRate);
	this.calcFitness();
	this.iterations++;
}

Trainer.prototype.reproduce = function(){
	let newGeneration = [];

	for(let i = 0; i < this.currentGen.length; i++){
		let parents = this.selectParents();

		let childVal = "";
		childVal += parents[0].val.substring(0, Math.floor(parents[0].val.length/2));
		childVal += parents[1].val.substring(Math.floor(parents[1].val.length/2), parents[1].val.length);
		let child = new Element(childVal);

		newGeneration.push(child);
	}

	this.currentGen = newGeneration;
}

Trainer.prototype.selectParents = function(){
	let parents = [];
	let probability = [];

	this.currentGen.forEach(e => {
		for(let i = 0; i < e.fitness; i++)
			probability.push(e);
	});

	parents.push(probability[randNumGen(0, probability.length)]);
	parents.push(probability[randNumGen(0, probability.length)]);

	return parents;
}

Trainer.prototype.mutate = function(mutationRate){
	this.currentGen.forEach(e => {
		for(let i = 0; i < e.val.length; i++){
			if(Math.random() < mutationRate)
				e.val = changeRandomLetterAt(e.val, i);
		}
	});
}

Trainer.prototype.calcFitness = function(){
	this.currentGen.forEach(e => {
		for(let i = 0; i < e.val.length; i++){
			if(e.val[i] == this.goal[i]){
				e.fitness++;
			}
		}

		if(e.fitness == this.goal.length)
			this.goalReached = true;
	});
}

Trainer.prototype.findBest = function(){
	this.currentGen.forEach(e => {
		if(e.fitness >= this.best.fitness){
			this.best = e;
		}
	});
}

Trainer.prototype.displayGen = function(){
	for(let i = 0; i < this.currentGen.length; i++){
		text(this.currentGen[i].val, 50, i*16+64);
	}
}

function randNumGen(min, max){
	//min -> inclusivo
	//max -> exclusivo
	return Math.floor(Math.random() * (max-min) + min);
}

function changeRandomLetterAt(string, letterPos){
	let newString = "";
	newString += string.substring(0, letterPos);
	newString += String.fromCharCode(randNumGen(32,127));
	newString += string.substring(letterPos+1, string.length);

	return newString;
}