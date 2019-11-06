let dot;
let dots = [];

let img;

function preload(){
	img = loadImage("Duck.jpg");
}

function setup(){
	createCanvas(512, 512);
	noStroke();
	pixelDensity(1);
	img.loadPixels();
}

function draw(){
	dot = new Dot(random(width), random(height));
	dots.push(dot);
	for(let i = 0; i < dots.length; i++){
		dots[i].grow(dots);
		dots[i].show();
	}
}

function Dot(x, y){
	this.x = x;
	this.y = y;
	this.r = 0;

	this.grow = function(_dots){
		if(!this.isOverlapping(_dots) && !this.isBeyondCanvas())
			this.r++;
	}

	this.isOverlapping = function(__dots){
		for(let i = 0; i < __dots.length; i++){
			let dis = dist(this.x, this.y, __dots[i].x, __dots[i].y);
			if(dis < this.r + __dots[i].r && this != __dots[i])
				return true;
		}
		return false;
	}

	this.isBeyondCanvas = function(){
		return (this.x + this.r > width || this.x - this.r < 0 || this.y + this.r > height || this.y - this.r < 0);
	}

	this.show = function(){
		fill(this.findProperColor());
		ellipse(this.x, this.y, this.r*2);
	}

	this.findProperColor = function(){
		let index = (floor(this.y) + floor(this.x) * width) * 4;
		return color(img.pixels[index], img.pixels[index+1], img.pixels[index+2], img.pixels[index+3]);
	}
}