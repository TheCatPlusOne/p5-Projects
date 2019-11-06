let size = 300;
let depth = 1;
let depthInput;
let depthButton;

function setup(){
	createCanvas(640, 640);
	rectMode(CENTER);
	noStroke();

	createP("<br>Digite o tamanho inicial:");
	depthInput = createInput(size);
	depthInput.input(function(){
		size = this.value();
		draw();
	});

	createP("");
	depthButton = createButton("REINICIAR FRACTAL");
	depthButton.mousePressed(function(){
		depth = 0;
		draw();
	});
}

function mousePressed(){
	depth++;
	draw();
}

function draw(){
	background(50);

	push();
	translate(width/2, height/2);
	addLayer(0, 0, size, depth);
	pop();

	noLoop();
}

function addLayer(centerX, centerY, _size, _depth){
	if(_depth > 0){
		rect(centerX, centerY, _size, _size);
		console.log("show");

		for(let y = -1; y <= 1; y++){
			for(let x = -1; x <= 1; x++){
				if(x != 0 && y != 0)
					addLayer(_size/2 * x + centerX, _size/2 * y + centerY, _size/2, _depth-1);
			}
		}
	}
}