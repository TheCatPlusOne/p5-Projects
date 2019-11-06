class Firework{
	constructor(x, y, radius, speed){
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.speed = speed;

		this.maxHight = this.y - random(200, 400);
	}

	fiuuu(){
		fill(255);
		noStroke();
		ellipse(this.x, this.y, this.radius * 2);
		this.y -= this.speed;
	}

	boom(){
		fill(255);
		noStroke();
		ellipse(this.x, this.y, random(50, 100));
	}
}