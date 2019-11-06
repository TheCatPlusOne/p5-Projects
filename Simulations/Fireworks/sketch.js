let fireworks = [];

function setup(){
	createCanvas(640, 640);
}

function mousePressed(){
	fireworkObj = new Firework(mouseX, mouseY, 2, 5);
	fireworks.push(fireworkObj);
}

function draw(){
	background(47);

	for(let i = 0; i < fireworks.length; i++){
		objAtual = fireworks[i];

		if(objAtual.y > objAtual.maxHight)
			objAtual.fiuuu();
		else{
			objAtual.boom();
			fireworks.splice(i, 1);
		}
	}
}

