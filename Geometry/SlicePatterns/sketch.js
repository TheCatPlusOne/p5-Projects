let screen = {
	l: 320
};

var length = 16;
var x = 0;
var y = 0;

function setup(){
	createCanvas(screen.l, screen.l);
	background(47);
}

function draw(){
	slash();

	x += length;

	if(x > screen.l){
		y += length;
		x = 0;
	}
}

function slash(){
	stroke(255);
	strokeWeight(2);

	if(random() > 0.5)
		line(x, y, x+length, y+length);
	else
		line(x+length, y, x, y+length);
}

function squares(){
	if(random() > 0.5)
		fill(255);
	else
		fill(255,255,255,50);

	rect(x, y, length, length);
}