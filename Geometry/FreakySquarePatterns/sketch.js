let squareSize = 5;
let rotateAngleSlider;
let rotateAngle = 0;
let checkBox;

function setup(){
	createCanvas(640, 640);
	angleMode(DEGREES);

	setSliders();
	checkBox = createCheckbox("Animate ");

	fill(255);
	noStroke();
}

function draw(){
	background(50);
	
	push();
		translate(width/2, height/2);
		drawBase();
		rotate(180);
		drawBase();
		
		push();
			if(checkBox.checked()){
				rotate(rotateAngle);
				rotateAngleSlider.value(rotateAngle%180);
			}else{
				rotate(rotateAngleSlider.value());
			}

			drawBase();
			rotate(180);
			drawBase();
		pop();
	pop();

	rotateAngle++;
}

function setSliders(){
	createP("");

	createSpan("Rotation: ");
	rotateAngleSlider = createSlider(0, 180, 0, 0.01);
	createP("");

	rotateAngleSlider.size(640, 10);
}

function drawBase(base){
	for(let y = 0; y < width; y += squareSize * 2){
		for(let x = 0; x < height; x += squareSize * 2){
			rect(x - width/2, y - height/2, squareSize, squareSize);
		}
	}
}