let board;

function setup(){
	createCanvas(640,640);

	board = new TicTacToeBoard();
}

function draw(){
	background(50);

	board.drawBoard();
}

function mousePressed(){
	board.makeMove(board.canvasToBoard(mouseX, mouseY));
}