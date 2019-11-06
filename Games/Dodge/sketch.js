let nOfEnemies = 20;
let circles = [];
let player;
let coin;

let pontos = 0;

let highscore = 0;
let highscoreText;

function setup(){
	createCanvas(320, 320);
	noStroke();

	player = new Player();
	coin = new Coin();

	highscoreText = createP();

	createEnemies(nOfEnemies);
}

function draw(){
	background(50);

	//PONTUAÇÃO
	push();
	fill(255);
	stroke(255);
	textSize(40);
	text(pontos, width/2, 50);
	pop();
	//

	for(let i = 0; i < circles.length; i++){
		circles[i].move();
		circles[i].show();
	}

	player.move();
	player.show();

	coin.show();
	coin.isCollected();

	for(let i = 0; i < circles.length; i++){
		let dis = dist(circles[i].x, circles[i].y, player.x, player.y);
		if(dis < circles[i].r/2 + player.r/2)
			gameOver();
	}

	highscoreText.html("Highscore: " + highscore);
}

function createEnemies(n){
	for(let i = 0; i < n; i++){
		let circle = new Circle();
		circles.push(circle);
	}
}

function killAllEmemies(){
	circles.splice(0, circles.length);
}

function gameOver(){
	if(pontos > highscore)
		highscore = pontos;

	pontos = 0;
	player.r = 10;

	killAllEmemies();

	setTimeout(function(){
		createEnemies(nOfEnemies);
	}, 1000);
}

function Circle(){
	this.x = random(width);
	this.y = random(height);
	this.r = 10;
	this.dirX = (random(1) > 0.5) ? 1 : -1;
	this.dirY = (random(1) > 0.5) ? 1 : -1;

	this.move = function(){
		if(this.x + this.dirX > width || this.x + this.dirX < 0)
			this.dirX *= -1;

		if(this.y + this.dirY > width || this.y + this.dirY < 0)
			this.dirY *= -1;

		this.x += this.dirX;
		this.y += this.dirY;
	}

	this.show = function(){
		fill(255, 0, 0);
		ellipse(this.x, this.y, this.r);
	}
}

function Player(){
	this.x = mouseX;
	this.y = mouseY;
	this.r = 10;

	this.move = function(){
		if(!(mouseX > width || mouseX < 0))
			this.x = mouseX;

		if(!(mouseY > height || mouseY < 0))
			this.y = mouseY;
	}

	this.show = function(){
		fill(255);
		ellipse(this.x, this.y, this.r);
	}
}

function Coin(){
	this.x = random(width);
	this.y = random(height);
	this.r = 5;

	this.show = function(){
		fill(255, 255, 0);
		ellipse(this.x, this.y, this.r);
	}

	this.isCollected = function(){
		let dis = dist(this.x, this.y, player.x, player.y);
		if(dis < this.r/2 + player.r/2){
			this.x = random(width);
			this.y = random(height);
			player.r++;
			pontos++;
		}
	}
}