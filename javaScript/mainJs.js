
//count lines in execution context
var count = 0;

//quest is the number enter on prompt
var quest;

//value set interval 
var interv;

var originalStarted = [];
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
var row = 0 ;
function moveColors(mainLines){

	mainLines =  [...mainLines].map((line, idx) => appliColorInLine(line, originalStarted[
		idx + row < quest ? getOldIdx(idx + row) : getOldIdx( ((idx + row) - quest) )
	]))
	if(row >= quest){
		row = 0;
	}else{
		row = row + 1
	}
	
}


function appliColorInLine(line, oldColor){
	line.style.background = oldColor
	return line 
}
//return: number - get: get the last before div index of now div index
function getOldIdx(i){
	return i === 0 ? quest - 1 : i - 1
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
		const arr_dom = document.getElementsByClassName('allLines'); 
		for(var x = 0; x < arr_dom.length ; x++){

			container.removeChild( arr_dom[x] );	

		}
	
		//new Linez
		questAndPrint()
	}
	//speed default
	setFps();
}

//aviod: question "Cuantas lineas deseas" Parse to number and save in array mainLines
function questAndPrint(){
	//question
	quest = parseInt( prompt( "Cuantas lineas deseas" ,400) );

	//create line
	for(var i = 0; i < quest; i++){
		const aux = createLine(i);
		originalStarted.push(aux.style.background)
		container.appendChild( aux );
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
	interv = setInterval( moveColors.bind(this, document.getElementsByClassName('allLines')) , 1000 / dSpeed);
	document.getElementById('showfps').innerHTML = dSpeed + ' fps';
}