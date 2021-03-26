//global variables and arrays

var count = 0;
var quest;
var mainLines = new Array(); 
var interv;

function randomColors(){

	var letters = "0123456789ABCDEF";

	var color = "#";

	for(var x = 0; x < 6; x++){

		color += letters[ Math.floor ( Math.random() * 16 )];

	}

	return color;

}

function heightUser( quest ){

	return ([400/quest]*100)/400+"%";

}

function moveColors(){
	mainLines[0].style.oldbackground = mainLines[0].style.background 
	mainLines[quest-1].style.oldbackground = mainLines[quest-1].style.background
	mainLines[0].style.background  = mainLines[quest-1].style.background

	for(var i = 0; i < quest; i++){

		changeLine(
			mainLines[i],
			mainLines[getNewIdx(i)],
			mainLines[getOldIdx(i)],	
		)

	}

}
function getOldIdx(i){
	return i === 0 ? quest - 1 : i - 1
}
function getNewIdx(i){
	return i === quest - 1 ? 0 : i + 1
}
function changeLine (nowLine, nextLine ,oldLine) {
	nowLine.style.background = oldLine.style.oldbackground
	nextLine.style.oldbackground = nextLine.style.background 
}

function createLines(){

	count++

	if(count == 1){
		questAndPrint()

	}else{
		clearInterval(intrv)
		var container = document.getElementById("container");

		//remove divs in array

		for(var x = 0; x < quest; x++){

			container.removeChild( mainLines[x] );	

		}
	
		//new Linez
		questAndPrint()
	}
	//speed default
	const dSpeed = 2000
	intrv = setInterval( moveColors , dSpeed);	
}

function questAndPrint(){
	mainLines.length = 0;
	quest = parseInt( prompt( "Cuantas lineas deseas" ,10) );

	for(var i = 0; i < quest; i++){

		mainLines.push( document.createElement(  "div" ));

		mainLines[i].setAttribute("class", "allLines");

		mainLines[i].setAttribute("id", "line-"+i);

		mainLines[i].style.width = "100%";

		mainLines[i].style.background = randomColors();

		mainLines[i].style.height = heightUser( quest );

		mainLines[i].appendChild(document.createTextNode(i))

		container.appendChild( mainLines[i]);

	}
	originalLines = mainLines.map(i => i);
}

function startStop(){
	clearInterval(intrv)
} 
