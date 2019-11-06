var screen = {
	x:640,
	y:320
};

var ballDiameter = 50;
var speed = 4;
var ballPosY = screen.y - ballDiameter/2;
var sentido = 1;

function setup(){
	createCanvas(screen.x, screen.y);
}

function draw(){
	background(47);

	noFill();
	stroke(255);
	strokeWeight(4);
	ellipse(screen.x/2, ballPosY, ballDiameter, ballDiameter);
	ballPosY -= speed * sentido;

	if(ballPosY <= ballDiameter/2 || ballPosY >= screen.y - ballDiameter/2)
		trocarSentido();
}

function mousePressed(){
	trocarSentido(sentido);
}

function trocarSentido(){
	if(sentido == 1){
		sentido = -1;
	}else if(sentido == -1){
		sentido = 1;
	}
}