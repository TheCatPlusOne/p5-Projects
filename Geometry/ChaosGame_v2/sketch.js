let vertices = [];
let point;
let randVertex;

let runButton;
let running = false;
let allowSelectSameVertex;

function setup(){
	createCanvas(640,640);
	background(50);
	noStroke();

	createP("");
	runButton = createButton("RUN");
	runButton.mousePressed(() => {
		running = true;
	});

	createP("");
	allowSelectSameVertex = createCheckbox("Allow to select same vertex", true);

	point = {
		x : Math.random() * width,
		y : Math.random() * height
	}
}

function draw(){
	drawVertices();

	if(running){
		for(let i = 0; i < 5000; i++){
			movePoint();
			ellipse(point.x, point.y, 1);
		}
	}
}

function mousePressed(){
	if(!running){
		if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
			vertices.push({
				x : mouseX,
				y : mouseY
			});
		}
	}
}

function drawVertices(){
	vertices.forEach(e => ellipse(e.x, e.y, 5));
}

function movePoint(){
	if(randVertex == null)
		randVertex = Math.floor(Math.random() * vertices.length);

	if(!allowSelectSameVertex.checked()){
		let newRandVertex = Math.floor(Math.random() * vertices.length);
		while(randVertex == newRandVertex)
			newRandVertex = Math.floor(Math.random() * vertices.length);

		randVertex = newRandVertex;
	}else{
		randVertex = Math.floor(Math.random() * vertices.length);
	}

	point.x += (vertices[randVertex].x - point.x) / 2;
	point.y += (vertices[randVertex].y - point.y) / 2;
}