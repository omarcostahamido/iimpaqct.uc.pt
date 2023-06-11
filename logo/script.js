// script.js

// if i were to programmatically build elements, this would be helpful to blink: https://www.w3schools.in/html/blink-tag
// if i go the canvas route, here is how to resize it: https://stackoverflow.com/questions/39563033/how-to-resize-the-canvas-using-javascript
// this is how i learned to create logarithmic function: https://stackoverflow.com/questions/846221/logarithmic-slider
/* here is canvas ref pages:
- https://www.w3schools.com/tags/ref_canvas.asp
- https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage
*/
const inverse = false;
var bwColor = 0;
if (inverse) {
	bwColor = 255;
}
function r255(){
	return Math.floor(Math.random()*255);
}
function randomColor(){
	color = "rgb(";
	color += r255()+", ";
	color += r255()+", ";
	color += r255()+")";
	return color;
}
function randomBW(range=1){
	val = r255()*range;
	color = "rgba("+bwColor+", "+bwColor+", "+bwColor+", "+val+")";
	if (inverse) {
		color = "rgba("+bwColor+", "+bwColor+", "+bwColor+", "+val+")";
	}
	return color;	
}
function randomBWmono(dial=1){
	dice = Math.random();
	if (dice <= dial) {
		val = 255;
	} else {
		val = 0;
	}
	color = "rgba("+bwColor+", "+bwColor+", "+bwColor+", "+val+")";
	if (inverse) {
		color = "rgba("+bwColor+", "+bwColor+", "+bwColor+", "+val+")";
	}
	return color;	
}

const canvas = document.getElementById("logo");
// note that there might be a safer way to do this, see above
canvas.width = window.innerWidth;
canvas.height = window.innerWidth*6/40;
const unitSize = window.innerWidth/40;
// if (canvas.getContext) {
// 	const ctx = canvas.getContext("2d");
// }
const ctx = canvas.getContext("2d");
var f = 0; // frames
const h = 30; // half note
const q = h/2; // quarter note
const lettersArray = [ 
	// I
	[0,0], [0,1], [0,2], [0,3], [0,4],
	// I
	[3,0], [3,1], [3,2], [3,3], [3,4],
	// M
	[6,0], [6,1], [6,2], [6,3], [6,4],
	[7,1], [8,2], [9,1],
	[10,0], [10,1], [10,2], [10,3], [10,4],
	// P
	[13,0], [13,1], [13,2], [13,3], [13,4],
	[14,0], [14,2], [15,0], [15,2], [16,1],
	// A
	[19,1], [19,2], [19,3], [19,4],
	[20,0], [20,2], [21,0], [21,2],
	[22,1], [22,2], [22,3], [22,4],
	// Q
	[25,1], [25,2], [25,3],
	[26,0], [26,4], [27,0], [27,4],
	[28,1], [28,2], [28,3],
	// C
	[31,1], [31,2], [31,3],
	[32,0], [32,4], [33,0], [33,4],
	[34,1], [34,3],
	// T
	[37,0],
	[38,0], [38,1], [38,2], [38,3], [38,4],
	[39,0]
	];
function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	var fade = 0;
	if (f > 200 && f < 600) {
		var fadeposition = (200 - Math.abs( (200 - (f-200)) % 200 )) / 200;
		var minv = Math.log(1);
		var maxv = Math.log(2);
		var scale = (maxv-minv) / (200);
		fade = (Math.exp(minv + scale*(fadeposition))-1);
	}
  	// document.getElementById("fade").innerHTML = fade;
	// all other items
	for (i=0; i<canvas.width; i=i+unitSize){
   		for (j=0; j<canvas.height-unitSize; j=j+unitSize){
     		ctx.fillStyle = randomBW(fade);
     		// ctx.fillStyle = randomColor();
    		ctx.fillRect(i, j, unitSize, unitSize);
   		} 
  	}
  	// letters
  	if (f > 400) {
  		for (k=0; k < lettersArray.length; k++) {
  			// ctx.clearRect(lettersArray[k][0]*unitSize, lettersArray[k][1]*unitSize, unitSize, unitSize);
  			var position = (f-400)/200;
  			var minv = Math.log(1);
			var maxv = Math.log(1.25);
			var scale = (maxv-minv) / (200);
  			// ctx.fillStyle = randomBW((Math.exp(minv + scale*(position))-1)*4);
  			ctx.fillStyle = randomBWmono((f-400)/200);
  			// if (f > 600) {
  			// 	ctx.fillStyle = "rgb("+bwColor+", "+bwColor+", "+bwColor+")";
  			// }
  			// console.log((f-400)/200);
    		ctx.fillRect(lettersArray[k][0]*unitSize, lettersArray[k][1]*unitSize, unitSize, unitSize);
  		}
  	}
  	// dot at the bottom
  	if (// - - -
		(f >= h*1 && f < h*2) ||
		(f >= h*3 && f < h*4) ||
		(f >= h*5 && f < h*6) ||
		// space
		// - . - .
		(f >= h*9 && f < h*10) ||
		(f >= h*11 && f < h*11+q) ||
		(f >= h*12 && f < h*13) ||
		(f >= h*14 && f < h*14+q) ||
		// space
		// . . . .
		(f >= h*17 && f < h*17+q) ||
		(f >= h*18 && f < h*18+q) ||
		(f >= h*19 && f < h*19+q) ||
		(f >= h*20) ) {
  		ctx.fillStyle = "rgb("+bwColor+", "+bwColor+", "+bwColor+")";
  		ctx.fillRect(28*unitSize, 5*unitSize, unitSize, unitSize)
  	}
  	// document.getElementById("frame").innerHTML = f;
  	f++;
  	requestAnimationFrame(draw);
}

document.addEventListener('DOMContentLoaded', () => draw());

// studies for blinking:
// 1   2    3   4    5   6  
// 7   8    9   10   11  12
// 13  14   15  16
// 0 0 0 0  0 0 0 0  0 0 0 0  0 0 0 0 
// 1   -    1   -    1   -    1
// 1   -    1 - 1    -   1 -  1 
// 1 - 1 -  1 - 1 - 
// - - -
// (f >= h*1 && f < h*2) ||
// (f >= h*3 && f < h*4) ||
// (f >= h*5 && f < h*6) ||
// // - . - .
// (f >= h*7 && f < h*8) ||
// (f >= h*9 && f < h*9+q) ||
// (f >= h*10 && f < h*11) ||
// (f >= h*12 && f < h*12+q) ||
// // . . . .
// (f >= h*13 && f < h*13+q) ||
// (f >= h*14 && f < h*14+q) ||
// (f >= h*15 && f < h*15+q) ||
// (f >= h*16 && f < h*16+q)

// 1   2    3   4    5   6    7   8
// 9   10   11  12   13  14   15  16
// 17  18   19  20
// 0 0 0 0  0 0 0 0  0 0 0 0  0 0 0 0 
// 1   -    1   -    1   -    1
// 1   -    1 - 1    -   1 -  1 
// 1 - 1 -  1 - 1 - 
// // - - -
// (f >= h*1 && f < h*2) ||
// (f >= h*3 && f < h*4) ||
// (f >= h*5 && f < h*6) ||
// // space
// // - . - .
// (f >= h*9 && f < h*10) ||
// (f >= h*11 && f < h*11+q) ||
// (f >= h*12 && f < h*13) ||
// (f >= h*14 && f < h*14+q) ||
// // space
// // . . . .
// (f >= h*17 && f < h*17+q) ||
// (f >= h*18 && f < h*18+q) ||
// (f >= h*19 && f < h*19+q) ||
// (f >= h*20 && f < h*20+q) 


// studying fade mappings:
// document.getElementById("fadeposition").innerHTML = fadeposition;
// document.getElementById("fade").innerHTML = fade;
// f
// 200		400		600
// f-200
// 0		200		400
// (f-200) % 200
// 0		200/0	200
// (200 - (f-200)) % 200
// 200		0		-200
// Math.abs( (200 - (f-200)) % 200 )
// 200		0		200
// 200 - Math.abs( (200 - (f-200)) % 200 )
// 0		200		0