
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

function moveColors(){
	const new_order = []
	let mainLines = document.getElementsByClassName('allLines')
	for(let idx = 0; idx < mainLines.length; idx++){

		if(idx === 0){
			new_order.push(mainLines[mainLines.length - 1].style.background)
		}
		if(idx > 0 && idx < mainLines.length){
			new_order.push(mainLines[idx-1].style.background)
		}
	}
	for(let idx = 0; idx < mainLines.length; idx++){
		mainLines[idx].style.background = new_order[idx]
	}
	
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
	interv = setInterval( moveColors.bind(this) , 1000 / dSpeed);
	document.getElementById('showfps').innerHTML = dSpeed + ' fps';
}