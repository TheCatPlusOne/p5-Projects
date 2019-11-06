function KruskalPath(){
	this.nodes = [];
	this.path = [];
	this.connectionsTable;
}

KruskalPath.prototype.addNode = function(x, y){
	this.nodes.push({
		x : x,
		y : y
	});

	this.setNodes();
}

KruskalPath.prototype.setNodes = function(){
	this.connectionsTable = new ConnectionsTable(this.nodes);
}

KruskalPath.prototype.searchPath = function(){
	this.path = [];
	let allConnections = this.setAllPossibleConnections();

	allConnections = this.orderAllConnectionsByDistance(allConnections);

	for(let i = 0; i < allConnections.length; i++){
		let nodeBase = allConnections[i][0];
		let nodeOther = allConnections[i][1];

		if(nodeBase != nodeOther){
			if(!this.connectionsTable.existsConnection(nodeBase, nodeOther)){
				this.connectionsTable.makeConnection(nodeBase, nodeOther);

				this.path.push([nodeBase, nodeOther]);
			}
		}
	}
}

KruskalPath.prototype.setAllPossibleConnections = function(){
	let allConnections = Array(Math.pow(this.nodes.length, 2)).fill();

	for(let i = 0; i < this.nodes.length; i++){
		for(let j = 0; j < this.nodes.length; j++){
			let distance = distPoints(this.nodes[i], this.nodes[j], true);
			allConnections[i*this.nodes.length + j] = [this.nodes[i], this.nodes[j], distance];
		}
	}

	return allConnections;
}

KruskalPath.prototype.orderAllConnectionsByDistance = function(arr){
	if(arr.length <= 1)
		return arr;

	let middle = arr.pop();

	return [
		...this.orderAllConnectionsByDistance(arr.filter(e => e[2] <= middle[2])),
		middle,
		...this.orderAllConnectionsByDistance(arr.filter(e => e[2] > middle[2]))
	];
}

KruskalPath.prototype.showPath = function(color){
	this.path.forEach(e => {
		linePointToPoint(e[0], e[1], color);
	});
}

KruskalPath.prototype.showNodes = function(color){
	push();
	if(color)
		fill(color);

	this.nodes.forEach(e => ellipse(e.x, e.y, 5));
	pop();
}

function linePointToPoint(point1, point2, color){
	push();
	if(color)
		stroke(color);

	line(point1.x, point1.y, point2.x, point2.y);
	pop();
}

function distPoints(point1, point2, doSqrt){
	let xDiff = point1.x - point2.x;
	let yDiff = point1.y - point2.y;
	let dist = Math.pow(xDiff, 2) + Math.pow(yDiff, 2);

	if(doSqrt)
		return Math.sqrt(dist);

	return dist;
}