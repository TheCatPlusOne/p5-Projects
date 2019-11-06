var width = 640;
var heigth = 640;
var food, creature;
var foods = [], creatures = [];

function setup(){
	createCanvas(640, 640);
	createFoods(1);
	createCreatures(1);
}

function draw(){
	background(47);
	createFoodsInTime(1);
	showFoods(foods);
	showCreatures(creatures);

	for(let i = 0; i < creatures.length; i++){
		foods = creatures[i].moveTowardsFood(foods);
		creatures[i].reproduce(creatures);
		if(creatures[i].life == 0){
			creatures.splice(i, 1);
			i--;
		}else{
			creatures[i].life -= 1;
		}
	}
}

function Food(x, y){
	this.x = x;
	this.y = y;
	this.size = 5;

	this.draw = function(){
		fill(0, 200, 0);
		ellipse(this.x, this.y, this.size);
	}
}

function Creature(x, y, speed, life){
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.life = life;
	this.size = 10;

	this.draw = function(){
		fill(255, this.life, this.life);
		ellipse(this.x, this.y, this.size);
	}

	this.moveTowardsFood = function(_foods){
		let indexOfNearestFood = this.findIndexOfNearestFood(_foods);
		let target = _foods[indexOfNearestFood];
		let futurePos = createVector(target.x - this.x, target.y - this.y);
		let dist = Math.sqrt(calcDisSemSqrt(this, target));
		futurePos.div(dist);
		this.x += futurePos.x * this.speed;
		this.y += futurePos.y * this.speed;

		if(dist < this.size/2){
			_foods.splice(indexOfNearestFood, 1);
			if(this.life < 255)
				this.life += 100;
		}

		return _foods;
	}

	this.findIndexOfNearestFood = function(_foods){
		let indexOfNearestFood = 0;
		for(let i = 0; i < _foods.length; i++){
			if(calcDisSemSqrt(this, _foods[i]) < calcDisSemSqrt(this, _foods[indexOfNearestFood]))
				indexOfNearestFood = i;
		}

		return indexOfNearestFood;
	}

	this.reproduce = function(_creatures){
		if(this.life > 255){
			let baby = new Creature(this.x + this.size/2, this.y, random(this.speed-0.2, this.speed+0.2), 255);
			_creatures.push(baby);
			baby = new Creature(this.x - this.size/2, this.y, random(this.speed-0.2, this.speed+0.2), 255);
			_creatures.push(baby);
			this.life = 0;
		}
	}
}

function calcDisSemSqrt(p1, p2){
	return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
}

function createFoods(n){
	for(let i = 0; i < n; i++){
		food = new Food(random(width), random(heigth));
		foods.push(food);
	}
}

function createFoodsInTime(n){
	if(frameCount % n == 0){
		food = new Food(random(width), random(heigth));
		foods.push(food);	
	}
}

function showFoods(_foods){
	for(let i = 0; i < _foods.length; i++)
		_foods[i].draw();
}

function createCreatures(n){
	for(let i = 0; i < n; i++){
		creature = new Creature(random(width), random(heigth), random(1.5), 255);
		creatures.push(creature);
	}
}

function showCreatures(_creatures){
	for(let i = 0; i < _creatures.length; i++)
		_creatures[i].draw();
}