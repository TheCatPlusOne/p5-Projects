let kruskalPath;

function setup(){
	createCanvas(640,640);

	kruskalPath = new KruskalPath();

	setRandomPoints(100);
}

function draw(){
	background(50);

	kruskalPath.showNodes([255,255,0]);
	kruskalPath.showPath(255);
}

function mousePressed(){
	kruskalPath.addNode(mouseX, mouseY);

	kruskalPath.searchPath();
}

function setRandomPoints(n){
	for(let i = 0; i < n; i++){
		let randX = Math.floor(Math.random() * width);
		let randY = Math.floor(Math.random() * height);

		kruskalPath.addNode(randX, randY);
	}

	kruskalPath.searchPath();
}