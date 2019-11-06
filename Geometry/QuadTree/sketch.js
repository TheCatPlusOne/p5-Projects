let quadTree;
let objects = [];
let objectsRadius = 5;

function setup(){
	createCanvas(640, 640);
	quadTree = new QuadTree(0, 0, width, 4);
}

function draw(){
	background(50);

	objects.forEach(e => {
		e.move();
		e.show();	
	});

	if(objects.length > 0){
		quadTree.getQuadOfObject(objects[0]).forEach(e => {
			if(dist(objects[0].pos.x, objects[0].pos.y, e.pos.x, e.pos.y) <= 100)
				e.show([255,0,0]);
		});
	}

	quadTree.setTree(objects);
	quadTree.showBorders();

	if(mouseIsPressed)
		objects.push(new StandardObject(mouseX, mouseY, objectsRadius, 3));
}