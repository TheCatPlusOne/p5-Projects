let network;

let MAX_WORD_LENGTH = 15;

let englishWords;
let japaneseWords;
let languages;
let languagesNames;

let i = 5000;
let current = 0;

function preload(){
	japaneseWords = loadStrings("japaneseWords.txt");
	englishWords = loadStrings("englishWords.txt");

	languages = [japaneseWords, englishWords];
	languagesNames = ["Japanese", "English"];
}

function setup(){
	createCanvas(640,640);

	network = new OGNeuralNetwork(MAX_WORD_LENGTH*26, MAX_WORD_LENGTH, 2);

	train();

	network.setDrawSize(width, height);
}

function draw(){
	background(50);
	network.draw();

	for(let x = 0; x < 1000; x++){
		if(current < i){
			train();
			current++;
		}
	}
}

function getRandomWordObject(){
	let randomLanguage = Math.floor(Math.random() * languages.length);
	let randomWord = Math.floor(Math.random() * languages[randomLanguage].length);
	let word = (randomLanguage == 0) ? japaneseWords[randomWord] : englishWords[randomWord];

	return {
		word: word,
		language: randomLanguage
	};
}

function train(){
	// GET RANDOM WORD
	let wordObject = getRandomWordObject();
	let word = wordObject.word;
	let language = wordObject.language;

	// GENERATE INPUT ARRAY
	let input = wordToArray(word);

	// GENERATE EXPECTED OUTPUT ARRAY
	let expectedOutput = Array(languages.length).fill(0);
	expectedOutput[language] = 1;

	network.train(input, expectedOutput, 0.1);
}

function test(word){
	// GENERATE INPUT ARRAY
	let input = wordToArray(word);
	let output = network.sendInput(input);

	let sum = output.reduce((maintain, e) => maintain+e, 0);
	for(let i = 0; i < output.length; i++){
		output[i] = Math.round((output[i] / sum) * 100);
	}
	// output.map(e => Math.floor((e / sum) * 100));

	for(let i = 0; i < output.length; i++){
		console.log(languagesNames[i] + " " + output[i] + "%");
	}
}

function wordToArray(word){
	let array = Array(MAX_WORD_LENGTH*26).fill(0);

	if(word.length > MAX_WORD_LENGTH)
		word = word.substring(0, MAX_WORD_LENGTH);

	for(let i = 0; i < word.length; i++){
		let charCode = word.charCodeAt(i) % 97;
		array[i*26 + charCode] = 1;
	}

	return array;
}