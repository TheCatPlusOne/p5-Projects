function Stack(){
	this.stack = [];
}

Stack.prototype.add = function(element){
	this.stack.push(element);
}

Stack.prototype.pop = function(){
	return this.stack.pop();
}

Stack.prototype.getLast = function(){
	return this.stack[this.stack.length-1];
}

Stack.prototype.clear = function(){
	this.stack = [];
}