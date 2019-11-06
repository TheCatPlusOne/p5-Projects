function ConnectionsTable(elements){
	this.table = Array(elements.length).fill().map(e => Array(elements.length).fill(0));
	this.order = elements;
}

ConnectionsTable.prototype.makeConnection = function(element1, element2){
	let indexElement1, indexElement2;

	for(let i = 0; i < this.order.length; i++){
		if(this.order[i] == element1){
			indexElement1 = i;
		}

		if(this.order[i] == element2){
			indexElement2 = i;
		}
	}

	this.table[indexElement1][indexElement2] = 1;
	this.table[indexElement2][indexElement1] = 1;
}

ConnectionsTable.prototype.existsConnection = function(start, end){
	let tableCopy = copyTable(this.table);
	let startIndex = this.findIndexInOrder(start);
	let endIndex = this.findIndexInOrder(end);

	return this.findPath(startIndex, endIndex, tableCopy);
}

ConnectionsTable.prototype.findPath = function(start, end, tableCopy){
	if(this.hasCommonNode(start, end))
		return true;
	
	let childHasConnection = false;

	for(let i = 0; i < tableCopy[start].length; i++){
		if(tableCopy[start][i] == 1){
			tableCopy[start][i] = 0;
			childHasConnection = childHasConnection || this.findPath(i, end, tableCopy);
		}
	}

	return childHasConnection;
}

ConnectionsTable.prototype.hasCommonNode = function(node1, node2){
	for(let i = 0; i < this.table[node1].length; i++){
		if(this.table[node1][i] == 1 && this.table[node2][i] == 1)
			return true;
	}

	return false;
}

ConnectionsTable.prototype.findIndexInOrder = function(element){
	for(let i = 0; i < this.order.length; i++){
		if(this.order[i] == element)
			return i;
	}

	return null;
}

function copyTable(table){
	let copy = Array(table.length).fill();

	for(let i = 0; i < copy.length; i++)
		copy[i] = table[i].slice();

	return copy;
}