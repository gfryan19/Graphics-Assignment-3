//Greg Ryan
//September 29, 2017
//Assignment 3

var canvas;
var gl;
var vbuffer;
var triColor;
var vColorLoc;
var vertices = [];

window.onload = function init() {
	canvas = document.getElementById( "gl-canvas" );
	gl = WebGLUtils.setupWebGL( canvas );
	if (!gl ) {alert ("WebGL isn't available" ); }
	
	gl.viewport(0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
	
	//Load shaders and initialize attribute buffers
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );
	
	//Set up triangle vertices
	triColor = vec4(1.0, 0.0, 0.0, 1.0); 
	square_vertices( );
	
	//Create the vertex buffer and assign the vertices to it
	vBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
	
	//Set up the vPosition data for the shader
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPosition);
	
	//Get the color location for the vertex shader
	vColorLoc = gl.getUniformLocation( program, "vColor" );
	modelView = gl.getUniformLocation( program, "modelView" );
	
	render();
}

function render(){
	
	gl.clear( gl.COLOR_BUFFER_BIT);
	gl.uniform4fv(vColorLoc, triColor);
	
	var mvMatrix = [ ];
	var pythag = Math.sqrt(0.02);
	var angle = 0;
	
	mvMatrix = scalem(2.4, 2.4, 0);
	for (var x = 0; x < 12; x ++){ //Makes small petals
		mvMatrix = mult(mvMatrix, translate((Math.sin(angle) * pythag), -(Math.cos(angle) * pythag), 0));
		mvMatrix = mult(mvMatrix, rotate((x * 30) + 45, 0, 0, 1));
		mvMatrix = mult(mvMatrix, rotate(79, 1, 1, 0));
		
		gl.uniformMatrix4fv(modelView, false, flatten(mvMatrix));
		gl.drawArrays(gl.LINE_LOOP, 0, 4);
		
		mvMatrix = mult(mvMatrix, rotate(-79, 1, 1, 0));
		mvMatrix = mult(mvMatrix, rotate(-((x * 30) + 45), 0, 0, 1));
		mvMatrix = mult(mvMatrix, translate(-(Math.sin(angle) * pythag), (Math.cos(angle) * pythag), 0));
		angle += Math.PI/6;
	}
	
	mvMatrix = scalem(3, 3, 0);
	for (var x = 0; x < 12; x ++){ //Makes large petals
		mvMatrix = mult(mvMatrix, translate((Math.sin(angle) * pythag), -(Math.cos(angle) * pythag), 0));
		mvMatrix = mult(mvMatrix, rotate((x * 30) + 45, 0, 0, 1));
		mvMatrix = mult(mvMatrix, rotate(74, 1, 1, 0));
		
		gl.uniformMatrix4fv(modelView, false, flatten(mvMatrix));
		gl.drawArrays(gl.LINE_LOOP, 0, 4);
		
		mvMatrix = mult(mvMatrix, rotate(-74, 1, 1, 0));
		mvMatrix = mult(mvMatrix, rotate(-((x * 30) + 45), 0, 0, 1));
		mvMatrix = mult(mvMatrix, translate(-(Math.sin(angle) * pythag), (Math.cos(angle) * pythag), 0));
		angle += Math.PI/6;
	}
	
	angle = 15 * Math.PI/180
	mvMatrix = scalem(1, 1, 0);
	for (var x = 0; x < 12; x++){ //Makes boxes and diamonds
		mvMatrix = mult(mvMatrix, translate((Math.sin(angle) * 0.75), (Math.cos(angle) * 0.75), 0));
		mvMatrix = mult(mvMatrix, rotate(-(angle * (180/Math.PI)), 0, 0, 1));
		
		gl.uniformMatrix4fv(modelView, false, flatten(mvMatrix));
		gl.drawArrays(gl.LINE_LOOP, 0, 4);
		
		mvMatrix = mult(mvMatrix, rotate(-45, 0, 0, 1));
		mvMatrix = mult(mvMatrix, scalem(0.2/(Math.sqrt(0.08)), 0.2/(Math.sqrt(0.08)), 1.0));
		
		gl.uniformMatrix4fv(modelView, false, flatten(mvMatrix));
		gl.drawArrays(gl.LINE_LOOP, 0, 4);
		
		mvMatrix = mult(mvMatrix, rotate((angle * (180/Math.PI)), 0, 0, 1));
		mvMatrix = mult(mvMatrix, scalem(1/(0.2/(Math.sqrt(0.08))), 1/(0.2/(Math.sqrt(0.08))), 1.0));
		mvMatrix = mult(mvMatrix, rotate(45.0, 0, 0, 1));
		mvMatrix = mult(mvMatrix, translate(-(Math.sin(angle) * 0.75), -(Math.cos(angle) * 0.75), 0));
		angle += Math.PI/6;
	}
	
	window.requestAnimFrame(render);
}

function square_vertices(){
	var x=-0.1;	//Lower left corner
	var y=-0.1;
	var side = 0.2;
	
	vertices.push(vec2(x, y));
	vertices.push(vec2(x+side, y));
	vertices.push(vec2(x+side, y+side));
	vertices.push(vec2(x, y+side));
}
