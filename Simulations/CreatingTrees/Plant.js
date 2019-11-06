function Plant(x, y, branchSize, rotationRate){
	this.root = {x: x, y: y};
	this.branchSize = branchSize;
	this.rotationRate = rotationRate;

	this.sequence = "X";
	this.variables = [
		{input: "X", output: "FX[[-X[F]]+XXXF]X"},
		{input: "F", output: "FF"}
	];

	this.posStack = new Stack();
	this.pos = {x: x, y: y};

	this.angleStack = new Stack();
	this.angle = 0;

	this.rules = [
		{code: "X", action: function(e){
			//Used to control the evolution
		}},
		{code: "F", action: function(e){
			let endPointX = e.pos.x + Math.sin(degreesToPiRad(e.angle)) * e.branchSize;
			let endPointY = e.pos.y - Math.cos(degreesToPiRad(e.angle)) * e.branchSize;

			line(e.pos.x, e.pos.y, endPointX, endPointY);

			e.pos = {x: endPointX, y: endPointY};
		}},
		{code: "+", action: function(e){
			e.angle -= e.rotationRate;
		}},
		{code: "-", action: function(e){
			e.angle += e.rotationRate;
		}},
		{code: "[", action: function(e){
			e.posStack.add({x: e.pos.x, y: e.pos.y});
			e.angleStack.add(e.angle);
		}},
		{code: "]", action: function(e){
			if(e.posStack.getLast())
				e.pos = e.posStack.pop();

			e.angle = e.angleStack.pop();
		}},
	];
}

Plant.prototype.setXChromo = function(newXChromo){
	this.variables[0].output = newXChromo;
}

Plant.prototype.setFChromo = function(newFChromo){
	this.variables[1].output = newFChromo;
}

Plant.prototype.resetDrawValues = function(root){
	this.posStack.clear();
	this.angleStack.clear();

	this.angle = 0;
	this.pos = {x: root.x, y: root.y};
}

Plant.prototype.evolute = function(){
	let newSequence = "";

	for(let i = 0; i < this.sequence.length; i++){
		let snip = this.sequence[i];
		
		for(let j = 0; j < this.variables.length; j++){
			if(this.variables[j].input == this.sequence[i]){
				snip = this.variables[j].output;
			}
		}

		newSequence += snip;
	}

	this.sequence = newSequence;
	this.branchSize /= 1.5;
};

Plant.prototype.show = function(){
	this.resetDrawValues(this.root);

	for(let i = 0; i < this.sequence.length; i++){
		for(let j = 0; j < this.rules.length; j++){
			if(this.rules[j].code == this.sequence[i])
				this.rules[j].action(this);
		}
	}
};

function degreesToPiRad(degrees){
	return degrees * Math.PI / 180;
}