/**
 * @file EE267 Virtual Reality
 * Homework 1 - Getting Started with WebGL and Transformations
 *
 * In our homework, we heavily rely on THREE.js library for rendering.
 * THREE.js is a wonderful library to render a complicated scene without
 * cumbersome raw WebGL/OpenGL programming related to GPU use. Furthermore,
 * it also hides most of the math of computer graphics to allow designers to
 * focus on the scene creation. However, this homework does not use such
 * capabilities. We will compute them manually to understand the mathematics
 * behind the rendering pipeline!
 *
 * Instructor: Gordon Wetzstein <gordon.wetzstein@stanford.edu>,
 * 			   Robert Konrad <rkkonrad@stanford.edu>,
 * 			   Hayato Ikoma <hikoma@stanford.edu>,
 * 			   Marcus Pan <mpanj@stanford.edu>
 *
 * @copyright The Board of Trustees of the Leland Stanford Junior University
 * @version 2025/03/18

 * This version uses Three.js (r175), stats.js (r17) and jQuery (3.2.1).
 *
 */

// Set up display parameters.
// Please use the parameters of your own environment.
// Length of the monitor's diagonal in [inch]
// (ex. Macbook Pro 13" => 13.3 inch
//      Macbook Pro 15" => 15.4 inch
var screenDiagonal = 23.75;

// Distance between the viewer and the monitor in [mm]
var distanceScreenViewer = 800.0;

var dispParams = new DisplayParameters( distanceScreenViewer, screenDiagonal );


// Create an instance for Javascript performance monitor.
// In our class, we would like to visualize the number of frames rendered
// in every second. For this purpose, stats.js is a handy tool to achieve it.
// https://github.com/mrdoob/stats.js/
var stats = new Stats();


// Add a DOM element of the performance monitor to HTML.
$( ".renderCanvas" ).prepend( stats.dom );


// Create a THREE's WebGLRenderer instance.
// Since we are not going to use stencil and depth buffers in this
// homework, those buffers are turned off. These two buffers are commonly
// used for more advanced rendering.
var webglRenderer = new THREE.WebGLRenderer( {
	antialias: true,
	stencil: false,
	depth: true,
} );


// Add a DOM element of the renderer to HTML.
$( ".renderCanvas" ).prepend( webglRenderer.domElement );


// Set the size of the renderer based on the current window size.
webglRenderer.setSize( dispParams.canvasWidth, dispParams.canvasHeight );


// Define three teapots
var teapots = [];

var leftTeapot = new Teapot(
	new THREE.Vector3( - 50, 0, - 100 ),
	$( "#vShader" ).text(), $( "#fShader" ).text() );

teapots.push( leftTeapot );


var centerTeapot = new Teapot(
	new THREE.Vector3( 0, 0, 0 ),
	$( "#vShader" ).text(), $( "#fShader" ).text() );

teapots.push( centerTeapot );


var rightTeapot = new Teapot(
	new THREE.Vector3( 50, 0, 100 ),
	$( "#vShader" ).text(), $( "#fShader" ).text() );

teapots.push( rightTeapot );


// Create an instance of our StateCoontroller class.
// By using this class, we store the mouse movement to change the scene to be
// rendered.
var sc = new StateController( dispParams );


// Set the teapots to the renderer
var renderer = new StandardRenderer( webglRenderer, teapots, dispParams );


// Instantiate our MVPmat class
var mat = new MVPmat( dispParams );


// Start rendering!
animate();



// animate
// This function is the main function to render the scene repeatedly.
//
// Note:
// This function uses some global variables.
//
// Advanced note:
// requestAnimationFrame() is a WebAPI which is often used to perform animation.
// Importantly, requestAnimationFrame() is asynchronous, which makes this
// rendering loop not recursive. requestAnimationFrame immediately returns, and
// the following codes are executed continuously. After a certain amount of
// time, which is determined by a refresh rate of a monitor, the passed callback
// function is executed. In addition, when the window is not displayed (i.e.
// another tab of your browser is displayed), requestAnimationFrame
// significantly reduces its refresh rate to save computational resource and
// battery.
//
// If you are interested, please check out the documentation of
// requestAnimationFrame().
// https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
function animate() {

	requestAnimationFrame( animate );

	// Start performance monitoring
	stats.begin();

	// update model/view/projection matrices
	mat.update( sc.state );

	// Render with the current model/view/projection matrices
	renderer.render( mat.modelMat, mat.viewMat, mat.projectionMat );

	// End performance monitoring
	stats.end();

	// Display parameters used for rendering.
	sc.display();

}
