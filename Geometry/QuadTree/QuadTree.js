function QuadTree(x, y, size, limitPerQuad){
	this.pos = createVector(x, y);
	this.size = size;
	this.limitPerQuad = limitPerQuad;
	this.elementsInside = [];
	this.isQuadOfQuads = false;
}

QuadTree.prototype.setTree = function(objects){
	this.elementsInside = objects;

	if(this.elementsInside.length > this.limitPerQuad){
		let topLeft = new QuadTree(this.pos.x, this.pos.y, this.size/2, this.limitPerQuad);
		let topRight = new QuadTree(this.pos.x+this.size/2, this.pos.y, this.size/2, this.limitPerQuad);
		let bottomLeft = new QuadTree(this.pos.x, this.pos.y+this.size/2, this.size/2, this.limitPerQuad);
		let bottomRight = new QuadTree(this.pos.x+this.size/2, this.pos.y+this.size/2, this.size/2, this.limitPerQuad);

		this.elementsInside.forEach(e => {
			if(e.pos.x <= this.pos.x+this.size/2 && e.pos.y <= this.pos.y+this.size/2)
				topLeft.elementsInside.push(e);
			else if(e.pos.x > this.pos.x+this.size/2 && e.pos.y <= this.pos.y+this.size/2)
				topRight.elementsInside.push(e);
			else if(e.pos.x <= this.pos.x+this.size/2 && e.pos.y > this.pos.y+this.size/2)
				bottomLeft.elementsInside.push(e);
			else if(e.pos.x > this.pos.x+this.size/2 && e.pos.y > this.pos.y+this.size/2)
				bottomRight.elementsInside.push(e);
		});

		topLeft.setTree(topLeft.elementsInside);
		topRight.setTree(topRight.elementsInside);
		bottomLeft.setTree(bottomLeft.elementsInside);
		bottomRight.setTree(bottomRight.elementsInside);

		this.elementsInside = [
			topLeft,
			topRight,
			bottomLeft,
			bottomRight
		];

		this.isQuadOfQuads = true;
	}
}

QuadTree.prototype.showBorders = function(){
	push();
	noFill();
	stroke(255);
	rect(this.pos.x, this.pos.y, this.size, this.size);
	pop();

	this.elementsInside.forEach(e => {
		if(e.showBorders){
			e.showBorders();
		}
	});
}

QuadTree.prototype.getQuadOfObject = function(object){
	if(!this.isQuadOfQuads){
		if(this.containsElementDirectly(object))
			return this.elementsInside;
		else
			return [];
	}

	let accumulation = [];
	this.elementsInside.forEach(e => accumulation = [...accumulation, ...e.getQuadOfObject(object)]);
	return accumulation;
}

QuadTree.prototype.containsElementDirectly = function(object){
	let contains = false;

	for(let i = 0; i < this.elementsInside.length; i++){
		if(this.elementsInside[i] == object){
			contains = true;
			break;
		}
	}

	return contains;
}