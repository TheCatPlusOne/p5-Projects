let frequency;
let text;
let size = 50;

function setup(){
	createCanvas(640,640);
	stroke(255);
	noFill();

	frequency = createSlider(0,10,1,.01);
	text = createSpan();
}

function draw(){
	background(50);

	beginShape();
	for(let i = 0; i < width; i+=1/(size+frequency.value())){
		let x = i*size;
		let y = sin(i*frequency.value()+frameCount*frequency.value()/10)*size+height/2;
		vertex(x, y);
	}
	endShape();

	text.html(frequency.value());
}