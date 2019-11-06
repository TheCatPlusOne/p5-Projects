function Element(dna, mutationRate){
	this.dna = dna;
	this.fitness = 0;
	this.mutate(mutationRate);
}

Element.prototype.mutate = function(mutationRate){
	for(let i = 0; i < this.dna.length; i++){
		if(Math.random() <= mutationRate)
			this.mutateDnaAtIndex(i);
	}
}

Element.prototype.mutateDnaAtIndex = function(index){
	let newDna = "";

	newDna += this.dna.substring(0, index);
	newDna += getRandomCharacter();
	newDna += this.dna.substring(index+1, this.dna.length);

	this.dna = newDna;
}