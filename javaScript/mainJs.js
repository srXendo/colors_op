
//count lines in execution context
var count = 0;

//quest is the number enter on prompt
var quest;
//contain dom divs lines. Create for number inserted in var quest
var mainLines = new Array();

//value set interval 
var interv;

//output: random color on hex string
function randomColors(){

	var letters = "0123456789ABCDEF";

	var color = "#";

	for(var x = 0; x < 6; x++){

		color += letters[ Math.floor ( Math.random() * 16 )];

	}

	return color;

}

//return: percentage for line in static resolution (400px)
function heightUser( quest ){

	return ([400/quest]*100)/400+"%";

}

//moveColors function execute process that this process change the color of div in lines for the next line:
//moveColors is a avoid
function moveColors(){

	//save now color in porp oldbackground the first div in lines because oldbackground prop used in the next execution the moveColors 
	mainLines[0].style.oldbackground = mainLines[0].style.background
	
	//save now color in porp oldbackground the last div in lines because oldbackground prop used in the next execution the moveColors
	mainLines[quest-1].style.oldbackground = mainLines[quest-1].style.background

	//execute first move in divs
	mainLines[0].style.background  = mainLines[quest-1].style.background

	for(var i = 0; i < quest; i++){

		changeLine(
			mainLines[i],
			mainLines[getNewIdx(i)],
			mainLines[getOldIdx(i)],	
		)

	}

}
//return: number - get: get the last before div index of now div index
function getOldIdx(i){
	return i === 0 ? quest - 1 : i - 1
}
//return: number - get the last after div index of now div index
function getNewIdx(i){
	return i === quest - 1 ? 0 : i + 1
}
//aviod: change background now lines for oldBackground oldLines and save background next line in porp oldbackground
function changeLine (nowLine, nextLine ,oldLine) {
	nowLine.style.background = oldLine.style.oldbackground
	nextLine.style.oldbackground = nextLine.style.background 
}

//aviod: printLines
function createLines(){

	//count click button createLines
	count++

	if(count == 1){
		questAndPrint()
	}else{
		//stop execute moviment function 
		clearInterval(interv)

		//container have a array Lines
		var container = document.getElementById("container");

		//remove Lines in array

		for(var x = 0; x < quest; x++){

			container.removeChild( mainLines[x] );	

		}
	
		//new Linez
		questAndPrint()
	}
	//speed default
	setFps();
}

//aviod: question "Cuantas lineas deseas" Parse to number and save in array mainLines
function questAndPrint(){
	mainLines.length = 0;

	//question
	quest = parseInt( prompt( "Cuantas lineas deseas" ,10) );

	//create line
	for(var i = 0; i < quest; i++){

		mainLines.push(createLine(i));
		container.appendChild( mainLines[i]);

	}
}

function createLine(i){
	const aux = document.createElement("div");
	aux.setAttribute("class", "allLines");
	aux.setAttribute("id", "line-"+i);
	aux.style.width = "100%";
	aux.style.background = randomColors();
	aux.style.height = heightUser( quest );
	return aux;
}

function setFps(){
	clearInterval(interv)
	dSpeed = document.getElementById('fpsRange').value
	interv = setInterval( moveColors , 1000 / dSpeed);
	document.getElementById('showfps').innerHTML = dSpeed + ' fps';
	
}