// Test for checking solutions
var	distanceScreenViewer = 800.0;
var	pixelPitch = 0.277;
var dispParams = new DisplayParameters( distanceScreenViewer, pixelPitch );
var sc = new StateController( dispParams );
var mat = new MVPmat( sc, dispParams );


console.log( 'Task 2.1.A.i: Mouse Movement ' );

var prevPos = new THREE.Vector2( 1.1, 3.2 );
var movement = sc.computeMovement( 1.0, 2.1, prevPos );

console.log( 'Checking computeMovement() function...' );

console.log( 'Mouse movement: ' );
console.log( 'Solution: x = -0.1, y = 1.1' );
console.log(
  'Answer: x = ' + movement.x + ', y = ' + movement.y );
var sol1 = approxeq( - 0.1, movement.x ) * approxeq( 1.1, movement.y );
console.log( 'Solution check: ' + checkSol( sol1 ) );
console.log( '\n' );

console.log( 'Update of prevPos: ' );
console.log( 'Solution: x = 1.0, y = 2.1' );
console.log(
  'Answer: x = ' + prevPos.x + ', y = ' + prevPos.y );
var sol2 = approxeq( 1.0, prevPos.x ) * approxeq( 2.1, prevPos.y );
console.log( 'Solution check: ' + checkSol( sol2 ) );
console.log( '\n\n\n' );




console.log( 'Task 2.1.A.ii: Matrix update' );
// console.log( 'Checking x,y mouse movement...' );
// var e = {};
// e.shiftKey = true;
// e.metaKey = false;
// var mv = new THREE.Vector2( 4.2, 1.9 );
// sc.state.modelTranslation.set( 2.1, 6.2, 1.0 );
// var vec0_xy = new THREE.Vector3( 4.2 + 2.1, 1.9 + 6.2, 1.0 );
// sc.updateModelParams( e, mv );
// var ans0_xy = sc.state.modelTranslation;
// var sol0_xy = approxeq_vec3( vec0_xy, ans0_xy );
// console.log( "Solution: " );
// console.log( vec0_xy );
// console.log( "Student answer: " );
// console.log( ans0_xy );
// console.log( 'Solution check: ' + checkSol( sol0_xy ) );

// console.log( '\n' );
// console.log( 'Checking z mouse movement...' );
// e.shiftKey = false;
// e.metaKey = true;
// var mv = new THREE.Vector2( 4.2, 1.9 );
// sc.state.modelTranslation.set( 2.1, 6.2, 1.0 );
// var vec0_z = new THREE.Vector3( 2.1, 6.2, 1.0 + 1.9 );
// sc.updateModelParams( e, mv );
// var ans0_z = sc.state.modelTranslation;
// var sol0_z = approxeq_vec3( vec0_z, ans0_z );
// console.log( "Solution: " );
// console.log( vec0_z );
// console.log( "Student answer: " );
// console.log( ans0_z );
// console.log( 'Solution check: ' + checkSol( sol0_z ) );

console.log( '\n' );
console.log( 'Checking matrix update...' );
sc.state.modelTranslation.x = - 10;
sc.state.modelTranslation.y = 2;
sc.state.modelTranslation.z = 10;
sc.state.modelRotation.x = 0;
sc.state.modelRotation.y = 0;
var ans3 = mat.computeModelTransform( sc.state );
var mat3 = new THREE.Matrix4();
mat3.set( 1, 0, 0, - 10,
	0, 1, 0, 2,
	0, 0, 1, 10,
	0, 0, 0, 1 );
var sol3 = approxeq_mat4( mat3, ans3 );
console.log( "Solution: " );
console.log( mat3.elements );
console.log( "Student answer: " );
console.log( ans3.elements );
console.log( 'Solution check: ' + checkSol( sol3 ) );




console.log( '\n\n\n' );
console.log( 'Task 2.1.B: Model Rotation ' );
// console.log( 'Checking x,y mouse movement...' );
// var e = {};
// e.shiftKey = false;
// e.metaKey = false;
// var mv = new THREE.Vector2( 4.2, 1.9 );
// sc.state.modelRotation.set( 2.1, 6.2 );
// var vec4_xy = new THREE.Vector2( 2.1 - 1.9, 6.2 + 4.2 );
// sc.updateModelParams( e, mv );
// var ans4_xy = sc.state.modelRotation;
// var sol4_xy = approxeq_vec2( vec4_xy, ans4_xy );
// console.log( "Solution: " );
// console.log( vec4_xy );
// console.log( "Student answer: " );
// console.log( ans4_xy );
// console.log( 'Solution check: ' + checkSol( sol4_xy ) );

console.log( '\n' );
console.log( 'Checking rotation around X' );
sc.state.modelTranslation.x = - 10;
sc.state.modelTranslation.y = 2;
sc.state.modelTranslation.z = 10;
sc.state.modelRotation.x = 45;
sc.state.modelRotation.y = 0;
var ans4 = mat.computeModelTransform( sc.state );
var mat4 = new THREE.Matrix4();
var v = Math.sqrt( 2 ) / 2;
mat4.set( 1, 0, 0, - 10,
	0, v, - v, 2,
	0, v, v, 10,
	0, 0, 0, 1 );
var sol4 = approxeq_mat4( mat4, ans4 );
console.log( "Solution: " );
console.log( mat4.elements );
console.log( "Student answer: " );
console.log( ans4.elements );
console.log( 'Solution check: ' + checkSol( sol4 ) );

console.log( '\n' );
console.log( 'Checking rotation around Y' );
sc.state.modelTranslation.x = - 10;
sc.state.modelTranslation.y = 2;
sc.state.modelTranslation.z = 10;
sc.state.modelRotation.x = 0;
sc.state.modelRotation.y = 45;
var ans5 = mat.computeModelTransform( sc.state );
var mat5 = new THREE.Matrix4();
var v = Math.sqrt( 2 ) / 2;
mat5.set( v, 0, v, - 10,
	 0, 1, 0, 2,
	- v, 0, v, 10,
	0, 0, 0, 1 );
var sol5 = approxeq_mat4( mat5, ans5 );
console.log( "Solution: " );
console.log( mat5.elements );
console.log( "Student answer: " );
console.log( ans5.elements );
console.log( 'Solution check: ' + checkSol( sol5 ) );

console.log( '\n' );
console.log( 'Checking rotation around X, Y' );
sc.state.modelTranslation.x = - 10;
sc.state.modelTranslation.y = 2;
sc.state.modelTranslation.z = 10;
sc.state.modelRotation.x = 10;
sc.state.modelRotation.y = 20;
var ans5_xy = mat.computeModelTransform( sc.state );
var mat5_xy = new THREE.Matrix4();
mat5_xy.elements = [ 0.9396926164627075, 0.05939117819070816, - 0.33682408928871155, 0, 0, 0.9848077297210693, 0.1736481785774231, 0, 0.3420201539993286, - 0.16317591071128845, 0.9254165291786194, 0, - 10, 2, 10, 1 ];
var sol5_xy = approxeq_mat4( mat5_xy, ans5_xy );
console.log( "Solution: " );
console.log( mat5_xy.elements );
console.log( "Student answer: " );
console.log( ans5_xy.elements );
console.log( 'Solution check: ' + checkSol( sol5_xy ) );


console.log( '\n\n\n' );
console.log( 'Task 2.2.A: Implement View Transform ' );
sc.state.viewerTarget.x = 50;
sc.state.viewerTarget.y = 0;
sc.state.viewerTarget.z = 100;
sc.state.viewerPosition.x = 200;
sc.state.viewerPosition.y = 0;
sc.state.viewerPosition.z = 400;
var v = Math.sqrt( 2 ) / 2;
var ans6 = mat.computeViewTransform( sc.state );
var tran = new THREE.Matrix4().makeTranslation( - 200, 0, - 400 );
var viewerUp = new THREE.Vector3( 0, 1, 0 );
var rot = new THREE.Matrix4().lookAt(
	sc.state.viewerPosition, sc.state.viewerTarget, viewerUp ).transpose();
var mat6 = new THREE.Matrix4().premultiply( tran ).premultiply( rot );
var sol6 = approxeq_mat4( mat6, ans6 );
console.log( "Solution: " );
console.log( mat6.elements );
console.log( "Student answer: " );
console.log( ans6.elements );
console.log( 'Solution check: ' + checkSol( sol6 ) );




// console.log( '\n\n\n' );
// console.log( 'Task 2.2.B: Move Viewer Position ' );
// console.log( 'Checking x,y movement...' );
// var e = {};
// e.shiftKey = false;
// var mv = new THREE.Vector2( 4.2, 1.9 );
// sc.state.viewerPosition.set( 2.1, 6.2, 1.0 );
// var vec7 = new THREE.Vector3( 4.2 + 2.1, 1.9 + 6.2, 1.0 );
// sc.updateViewPosition( e, mv );
// var ans7 = sc.state.viewerPosition;
// var sol7 = approxeq_vec3( vec7, ans7 );
// console.log( "Solution: " );
// console.log( vec7 );
// console.log( "Student answer: " );
// console.log( ans7 );
// console.log( 'Solution check: ' + checkSol( sol7 ) );

// console.log( '\n' );
// console.log( 'Checking z movement...' );
// var e = {};
// e.ctrlKey = true;
// var mv = new THREE.Vector2( 4.2, 1.9 );
// sc.state.viewerPosition.set( 2.1, 6.2, 1.0 );
// var vec8 = new THREE.Vector3( 2.1, 6.2, 1.0 + 1.9 );
// sc.updateViewPosition( e, mv );
// var ans8 = sc.state.viewerPosition;
// var sol8 = approxeq_vec3( vec8, ans8 );
// console.log( "Solution: " );
// console.log( vec8 );
// console.log( "Student answer: " );
// console.log( ans8 );
// console.log( 'Solution check: ' + checkSol( sol8 ) );




// console.log( '\n\n\n' );
// console.log( 'Task 2.2.B: Move Viewer Target ' );
// console.log( 'Checking x,y movement...' );
// var e = {};
// e.shiftKey = false;
// var mv = new THREE.Vector2( 4.2, 1.9 );
// sc.state.viewerTarget.set( 2.1, 6.2, 1.0 );
// var vec9 = new THREE.Vector3( 4.2 + 2.1, 1.9 + 6.2, 1.0 );
// sc.updateViewTarget( e, mv );
// var ans9 = sc.state.viewerTarget;
// var sol9 = approxeq_vec3( vec9, ans9 );
// console.log( "Solution: " );
// console.log( vec9 );
// console.log( "Student answer: " );
// console.log( ans9 );
// console.log( 'Solution check: ' + checkSol( sol9 ) );

// console.log( '\n' );
// console.log( 'Checking z movement...' );
// var e = {};
// e.ctrlKey = true;
// var mv = new THREE.Vector2( 4.2, 1.9 );
// sc.state.viewerTarget.set( 2.1, 6.2, 1.0 );
// var vec10 = new THREE.Vector3( 2.1, 6.2, 1.0 + 1.9 );
// sc.updateViewTarget( e, mv );
// var ans10 = sc.state.viewerTarget;
// var sol10 = approxeq_vec3( vec10, ans10 );
// console.log( "Solution: " );
// console.log( vec10 );
// console.log( "Student answer: " );
// console.log( ans10 );
// console.log( 'Solution check: ' + checkSol( sol10 ) );




console.log( '\n\n\n' );
console.log( 'Task 3.A: Implement Perspective Transform ' );
// console.log( 'Checking the mouse movement' );
// var e = {};
// var mv = new THREE.Vector2( 4.2, 1.9 );
// sc.state.clipNear = 100;
// sc.updateProjectionParams( e, mv );
// var sol11_c = sc.state.clipNear == 100 + 1.9;
// console.log( "Solution: " );
// console.log( 100 + 1.9 );
// console.log( "Student answer: " );
// console.log( sc.state.clipNear );
// console.log( 'Solution check: ' + checkSol( sol11_c ) );


console.log( '\n' );
console.log( 'Checking the projection matrix' );
var t = 0.2;
var b = - 0.2;
var r = 0.15;
var l = - 0.3;
var clipNear = 1;
var clipFar = 1000;
var ans11 = mat.computePerspectiveTransform( l, r, t, b, clipNear, clipFar );
var mat11 = new THREE.Matrix4().makePerspective(
	l, r, t, b, clipNear, clipFar );
var sol11 = approxeq_mat4( ans11, mat11 );
console.log( "Solution: " );
console.log( mat11.elements );
console.log( "Student answer: " );
console.log( ans11.elements );
console.log( 'Solution check: ' + checkSol( sol11 ) );




console.log( '\n\n\n' );
console.log( 'Task 3.B: Implement Orthographic Transform ' );
var t = 0.2;
var b = - 0.2;
var r = 0.15;
var l = - 0.3;
var clipNear = 1;
var clipFar = 1000;
var ans12 = mat.computeOrthographicTransform( l, r, t, b, clipNear, clipFar );
var mat12 = new THREE.Matrix4().makeOrthographic(
	l, r, t, b, clipNear, clipFar );
var sol12 = approxeq_mat4( ans12, mat12 );
console.log( "Solution: " );
console.log( mat12.elements );
console.log( "Student answer: " );
console.log( ans12.elements );
console.log( 'Solution check: ' + checkSol( sol12 ) );
