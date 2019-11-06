// NEURAL NETWORK
function OGNeuralNetwork(){
	this.inputLayer;
	this.hiddenLayers = [];
	this.outputLayer;
	this.setLayers(arguments);

	this.layers = [this.inputLayer, ...this.hiddenLayers, this.outputLayer];

	this.drawX = 0;
	this.drawY = 0;
}

OGNeuralNetwork.prototype.setLayers = function(layersInfo){
	this.inputLayer = new OGNeuralNetworkLayer(layersInfo[0]);

	for(let i = 1; i < layersInfo.length-1; i++){
		let newHiddenLayer = new OGNeuralNetworkLayer(layersInfo[i]);
		newHiddenLayer.addWeights(layersInfo[i-1]);
		newHiddenLayer.addBias();

		this.hiddenLayers.push(newHiddenLayer);
	}

	this.outputLayer = new OGNeuralNetworkLayer(layersInfo[layersInfo.length-1]);
	this.outputLayer.addWeights(layersInfo[layersInfo.length-2]);
	this.outputLayer.addBias();
}

OGNeuralNetwork.prototype.sendInput = function(inputArray){
	// FEEDFORWARD
	let input = OGMatrix.fromArray(inputArray);
	this.inputLayer.values = input;

	let layerBeforeValues = this.inputLayer.values;
	this.hiddenLayers.forEach(layer => {
		layer.values = layer.passThru(layerBeforeValues);
		layerBeforeValues = layer.values;
	});

	let output = this.outputLayer.passThru(layerBeforeValues);
	this.outputLayer.values = output;

	return OGMatrix.toArray(output);
}

OGNeuralNetwork.prototype.train = function(inputArray, answerArray, learningRate){
	// FEEDFORWARD
	this.sendInput(inputArray);

	// BACKPROPAGATION
	let answer = OGMatrix.fromArray(answerArray);
	let outputError = OGMatrix.sub(answer, this.outputLayer.values);
	this.outputLayer.updateWeightAndBias(outputError, this.hiddenLayers[0], learningRate);

	let hiddenError = this.hiddenLayers[0].calculateError(this.outputLayer.weights, outputError);
	this.hiddenLayers[0].updateWeightAndBias(hiddenError, this.inputLayer, learningRate);
}

// NEURAL NETWORK LAYER
function OGNeuralNetworkLayer(nNodes){
	this.nNodes = nNodes;
	this.values;
	this.weights;
	this.bias;
}

OGNeuralNetworkLayer.prototype.addWeights = function(nNodesLayerBefore){
	this.weights = new OGMatrix(this.nNodes, nNodesLayerBefore);
	this.weights.randomize(-1, 1);
}

OGNeuralNetworkLayer.prototype.addBias = function(){
	this.bias = new OGMatrix(this.nNodes, 1);
	this.bias.randomize(-1, 1);
}

OGNeuralNetworkLayer.prototype.passThru = function(input){
	let output = OGMatrix.dotProduct(this.weights, input);
	output.setValues(OGMatrix.add(output, this.bias));
	output.map(sigmoid);

	return output;
}

OGNeuralNetworkLayer.prototype.updateWeightAndBias = function(error, nextLayer, learningRate){
	let gradient = OGMatrix.map(this.values, dsigmoid);
	gradient.scalarByMatrix(error);
	gradient.scalar(learningRate);

	this.bias = OGMatrix.add(this.bias, gradient);

	let nextLayerValuesTransposed = OGMatrix.transpose(nextLayer.values);
	let weightDeltas = OGMatrix.dotProduct(gradient, nextLayerValuesTransposed);

	this.weights = OGMatrix.add(this.weights, weightDeltas);
}

OGNeuralNetworkLayer.prototype.calculateError = function(weightsLayerBefore, errorLayerBefore){
	let transposedWeightsLayerBefore = OGMatrix.transpose(weightsLayerBefore);

	let error = OGMatrix.dotProduct(transposedWeightsLayerBefore, errorLayerBefore);

	return error;
}

// MATRIX MATH
function OGMatrix(nRows, nCols){
	this.nRows = nRows;
	this.nCols = nCols;

	this.values = Array(this.nRows).fill().map(e => Array(this.nCols).fill(0));
}

OGMatrix.prototype.setValues = function(matrix){
	if(matrix instanceof OGMatrix){
		for(let i = 0; i < this.nRows; i++){
			for(let j = 0; j < this.nCols; j++){
				this.values[i][j] = matrix.values[i][j];
			}
		}
	}else{
		this.values = matrix;
	}
}

OGMatrix.prototype.scalar = function(n){
	for(let i = 0; i < this.nRows; i++){
		for(let j = 0; j < this.nCols; j++){
			this.values[i][j] *= n;
		}
	}
}

OGMatrix.prototype.scalarByMatrix = function(ogMatrix){
	for(let i = 0; i < this.nRows; i++){
		for(let j = 0; j < this.nCols; j++){
			this.values[i][j] *= ogMatrix.values[i][j];
		}
	}
}

OGMatrix.prototype.randomize = function(min, max, floor){
	for(let i = 0; i < this.nRows; i++){
		for(let j = 0; j < this.nCols; j++){
			let randNumber = Math.random() * (max - min) + min;
			
			if(floor)
				this.values[i][j] = Math.floor(randNumber);
			else
				this.values[i][j] = randNumber;
		}
	}
}

OGMatrix.prototype.map = function(callback){
	for(let i = 0; i < this.nRows; i++){
		for(let j = 0; j < this.nCols; j++){
			this.values[i][j] = callback(this.values[i][j]);
		}
	}
}

OGMatrix.prototype.log = function(){
	console.table(this.values);
}

// STATIC FUNCTIONS
OGMatrix.dotProduct = function(ogMatrix1, ogMatrix2){
	let result = new OGMatrix(ogMatrix1.nRows, ogMatrix2.nCols);

	for(let i = 0; i < ogMatrix1.nRows; i++){
		for(let j = 0; j < ogMatrix2.nCols; j++){

			for(let k = 0; k < ogMatrix1.nCols; k++){
				result.values[i][j] += ogMatrix1.values[i][k] * ogMatrix2.values[k][j];
			}

		}
	}

	return result;
}

OGMatrix.add = function(ogMatrix1, ogMatrix2){
	let result = new OGMatrix(ogMatrix1.nRows, ogMatrix1.nCols);

	for(let i = 0; i < result.nRows; i++){
		for(let j = 0; j < result.nCols; j++){
			result.values[i][j] = ogMatrix1.values[i][j] + ogMatrix2.values[i][j];
		}
	}

	return result;
}

OGMatrix.sub = function(ogMatrix1, ogMatrix2){
	let result = new OGMatrix(ogMatrix1.nRows, ogMatrix1.nCols);

	for(let i = 0; i < result.nRows; i++){
		for(let j = 0; j < result.nCols; j++){
			result.values[i][j] = ogMatrix1.values[i][j] - ogMatrix2.values[i][j];
		}
	}

	return result;
}

OGMatrix.map = function(ogMatrix, callback){
	let result = new OGMatrix(ogMatrix.nRows, ogMatrix.nCols);

	for(let i = 0; i < result.nRows; i++){
		for(let j = 0; j < result.nCols; j++)
			result.values[i][j] = callback(ogMatrix.values[i][j]);
	}

	return result;
}

OGMatrix.fromArray = function(arr){
	let matrix = new OGMatrix(arr.length, 1);

	for(let i = 0; i < arr.length; i++)
		matrix.values[i][0] = arr[i];

	return matrix;
}

OGMatrix.toArray = function(ogMatrix){
	let arr = [];

	for(let i = 0; i < ogMatrix.nRows; i++){
		for(let j = 0; j < ogMatrix.nCols; j++){
			arr.push(ogMatrix.values[i][j]);
		}
	}

	return arr;
}

OGMatrix.transpose = function(ogMatrix){
	let transposeMatrix = new OGMatrix(ogMatrix.nCols, ogMatrix.nRows);

	for(let i = 0; i < transposeMatrix.nRows; i++){
		for(let j = 0; j < transposeMatrix.nCols; j++){
			transposeMatrix.values[i][j] = ogMatrix.values[j][i];
		}
	}

	return transposeMatrix;
}

// ACTIVATION FUNCTION
function sigmoid(x){
	return 1 / (1 + Math.exp(-x));
}

function dsigmoid(x){
	return x * (1-x);
}

function reLU(x){
	if(x > 0)
		return x;
	else
		return 0;
}

// DRAW NETWORK
OGNeuralNetwork.prototype.setDrawSize = function(x, y){
	this.drawX = x;
	this.drawY = y;
}

OGNeuralNetwork.prototype.draw = function(){
	for(let i = 0; i < this.layers.length; i++){
		for(let j = 0; j < this.layers[i].nNodes; j++){
			let nodeSizeX = this.drawX / this.layers.length;
			let nodeSizeY = this.drawY / this.layers[i].nNodes;

			push();

			stroke(255);
			noFill();

			let x = i * nodeSizeX;
			let y = j * nodeSizeY;
			rect(x, y, nodeSizeX, nodeSizeY);

			let texto = this.layers[i].values.values[j];
			text(texto, x, y+16);

			pop();
		}
	}
}