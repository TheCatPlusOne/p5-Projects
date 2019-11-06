function BodyPart(x, y){
	this.position = createVector(x, y);
	this.bodyPartBehind = null;
}

BodyPart.prototype.passPosToNext = function(){
	if(this.bodyPartBehind != null){
		this.bodyPartBehind.passPosToNext();
		this.bodyPartBehind.position.x = this.position.x;
		this.bodyPartBehind.position.y = this.position.y;
	}
}