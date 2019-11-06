function TicTacToeBoard(){
	this.scale = 3;
	this.board = Array(this.scale*this.scale).fill(0);

	this.turn = 1;
	this.turns = 0;
}

TicTacToeBoard.prototype.reset = function(){
	this.turn = 1;
	this.turns = 0;
	this.board.fill(0);
};

TicTacToeBoard.prototype.changeScale = function(newScale){
	this.scale = newScale;
	this.board = Array(newScale*newScale).fill(0);
};

TicTacToeBoard.prototype.positionExists = function(boardPosition){
	if(boardPosition.x < 0 || boardPosition.x-1 > this.scale)
		return false;

	if(boardPosition.y < 0 || boardPosition.y-1 > this.scale)
		return false;

	return true;
}

TicTacToeBoard.prototype.makeMove = function(boardPosition){
	let index = this.scale * boardPosition.y + boardPosition.x;
	
	if(this.board[index] == 0 && this.positionExists(boardPosition)){
		this.board[index] = this.turn;

		this.turn *= -1;
		this.turns++;
	}else{
		console.log("spot unavailable");
	}

	let result = this.getWinner();
	if(result != null){
		console.log(result);
		this.reset();
	}
};

TicTacToeBoard.prototype.getWinner = function(){
	let winner = null;

	for(let i = 0; i < this.scale; i++){
		let sumH = 0;
		let sumV = 0;

		for(let j = 0; j < this.scale; j++){
			sumH += this.board[this.scale * j + i];
			sumV += this.board[this.scale * i + j];
		}

		if(sumH == this.scale || sumH == -this.scale)
			return sumH/this.scale;

		if(sumV == this.scale || sumV == -this.scale)
			return sumV/this.scale;
	}

	//Diagonal Down & Diagonal Up
	let sumDD = 0;
	let sumDU = 0;

	for(let i = 0; i < this.scale; i++){
		sumDD += this.board[this.scale * i + i];
		sumDU += this.board[this.scale * i + this.scale-i-1];
	}

	if(sumDD == this.scale || sumDD == -this.scale)
		return sumDD/this.scale;

	if(sumDU == this.scale || sumDU == -this.scale)
		return sumDU/this.scale;

	if(this.turns == this.scale*this.scale)
		return 0;

	return null;
};

TicTacToeBoard.prototype.canvasToBoard = function(x, y){
	let size = width/this.scale;

	return pos = {
		x: Math.floor(x/size), 
		y: Math.floor(y/size)
	};
}

TicTacToeBoard.prototype.drawBoard = function(){
	push();
	noFill();
	stroke(255);
	strokeWeight(5);

	let size = width/this.scale;

	for(let i = 1; i < this.scale; i++){
		line(i*size, 0, i*size, height);
		line(0, i*size, width, i*size);
	}

	for(let i = 0; i < this.scale; i++){
		for(let j = 0; j < this.scale; j++){
			let value = this.board[this.scale * j + i];
			let x = size*i + size/2;
			let y = size*j + size/2;

			let n = size/3;

			if(value == 1){
				line(x-n/2, y-n/2, x+n/2, y+n/2);
				line(x-n/2, y+n/2, x+n/2, y-n/2);
			}else if(value == -1){
				ellipse(x, y, n);
			}
		}
	}

	pop();
};