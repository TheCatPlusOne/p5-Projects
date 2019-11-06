let squareSize;
let population = [];

function setup(){
	createCanvas(640,640);
	background(50);

	squareSize = 300;
	population.push(new Square(width/2, height/2, squareSize));
	population.forEach(e => showOnlyLastIteration(e));
}

function mousePressed(){
	population.forEach(e => nextIteration(e));
	population.forEach(e => showOnlyLastIteration(e));
}

function nextIteration(squareObj){
	if(squareObj.children.length == 0)
		squareObj.createChildren();
	else
		squareObj.children.forEach(e => nextIteration(e));
}

function showAllIterations(squareObj){
	squareObj.show();
	squareObj.children.forEach(e => showAllIterations(e));

	console.log("show");
}

function showOnlyLastIteration(squareObj){
	if(squareObj.children.length == 0){
		squareObj.show();
		//console.log("show");
	}else{
		squareObj.children.forEach(e => showOnlyLastIteration(e));
	}
}

// SQUARE OBJECT
function Square(x, y, squareSize){
	this.x = x;
	this.y = y;
	this.squareSize = squareSize;

	this.squareCenter = {
		x : this.x - this.squareSize/2,
		y : this.y - this.squareSize/2
	};

	this.children = [];
}

Square.prototype.show = function(color){
	push();

	noStroke();
	if(color)
		fill(color);
	else
		fill(255);

	rect(this.squareCenter.x, this.squareCenter.y, this.squareSize, this.squareSize);
	//ellipse(this.squareCenter.x+this.squareSize/2, this.squareCenter.y+this.squareSize/2, this.squareSize, this.squareSize);

	pop();
}

Square.prototype.createChildren = function(){
	let newSquareSize = this.squareSize/2;

	for(let i = -1; i <= 1; i += 2){
		for(let j = -1; j <= 1; j += 2){
			let childX = this.x + this.squareSize/2 * i;
			let childY = this.y + this.squareSize/2 * j;
			this.children.push(new Square(childX, childY, newSquareSize));
		}
	}
}

// Square.prototype.createChildren = function(){
// 	let newSquareSize = this.squareSize/2;

// 	let childX = this.x + this.squareSize/2 * 1;
// 	let childY = this.y + this.squareSize/2 * 0;
// 	this.children.push(new Square(childX, childY, newSquareSize));

// 	childX = this.x + this.squareSize/2 * -1;
// 	childY = this.y + this.squareSize/2 * 0;
// 	this.children.push(new Square(childX, childY, newSquareSize));

// 	childX = this.x + this.squareSize/2 * 0;
// 	childY = this.y + this.squareSize/2 * 1;
// 	this.children.push(new Square(childX, childY, newSquareSize));

// 	childX = this.x + this.squareSize/2 * 0;
// 	childY = this.y + this.squareSize/2 * -1;
// 	this.children.push(new Square(childX, childY, newSquareSize));
// }