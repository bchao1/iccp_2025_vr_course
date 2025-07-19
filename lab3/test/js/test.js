// Instantiate another MVPmat to check solution
var dispParams_test = new DisplayParameters();
dispParams_test.canvasWidth = 1920;
dispParams_test.canvasHeight = 1080;
var sc_test = new StateController( dispParams_test );
var mat_test = new MVPmat( dispParams_test );
sc_test.state.imuQuaternion = new THREE.Quaternion( - 0.6, 0.3, - 0.2, 1 ).normalize();
sc_test.state.viewerPosition = new THREE.Vector3( - 10, 15, 800 );


console.log( '\n\n\n' );
console.log( '2.5.i: ' );
console.log( 'Checking computeViewTransformFromQuatertion for stereo rendering...' );

sc_test.state.hnmodel = false;
mat_test.update( sc_test.state );

var viewL_test = mat_test.stereoViewMat.L.clone();
var viewR_test = mat_test.stereoViewMat.R.clone();
var viewL_exp = new THREE.Matrix4();
viewL_exp.elements = [ 0.825503355704698, - 0.02684563758389269, 0.5637583892617449, 0, 0.5100671140939598, 0.46308724832214765, - 0.7248322147651006, 0, - 0.2416107382550335, 0.8859060402684563, 0.3959731543624161, 0, 225.89261744966439, - 715.9395973154361, - 300.2684563758389, 1 ];
var viewR_exp = new THREE.Matrix4();
viewR_exp.elements = [ 0.825503355704698, - 0.02684563758389269, 0.5637583892617449, 0, 0.5100671140939598, 0.46308724832214765, - 0.7248322147651006, 0, - 0.2416107382550335, 0.8859060402684563, 0.3959731543624161, 0, 161.89261744966439, - 715.9395973154361, - 300.2684563758389, 1 ];
var view_sol = approxeq_mat4( viewL_exp, viewL_test ) && approxeq_mat4( viewR_exp, viewR_test );
console.log( "Solution: \n Left" );
console.log( viewL_exp.elements );
console.log( "Right" );
console.log( viewR_exp.elements );
console.log( "Student answer: \n Left" );
console.log( viewL_test.elements );
console.log( "Right" );
console.log( viewR_test.elements );
console.log( 'Solution check: ' + checkSol( view_sol ) );


console.log( '2.5.ii: ' );
console.log( 'Checking computeViewTransformFromQuatertionWithHeadNeckmodel for stereo rendering...' );

sc_test.state.hnmodel = true;
mat_test.update( sc_test.state );

var viewLhn_test = mat_test.stereoViewMat.L.clone();
var viewRhn_test = mat_test.stereoViewMat.R.clone();
var viewLhn_exp = new THREE.Matrix4();
viewLhn_exp.elements = [ 0.825503355704698, - 0.02684563758389269, 0.5637583892617449, 0, 0.5100671140939598, 0.46308724832214765, - 0.7248322147651006, 0, - 0.2416107382550335, 0.8859060402684563, 0.3959731543624161, 0, 279.58389261744964, - 646.1409395973154, - 566.0402684563758, 1 ];
var viewRhn_exp = new THREE.Matrix4();
viewRhn_exp.elements = [ 0.825503355704698, - 0.02684563758389269, 0.5637583892617449, 0, 0.5100671140939598, 0.46308724832214765, - 0.7248322147651006, 0, - 0.2416107382550335, 0.8859060402684563, 0.3959731543624161, 0, 215.58389261744964, - 646.1409395973154, - 566.0402684563758, 1 ];
var viewhn_sol = approxeq_mat4( viewLhn_exp, viewLhn_test ) && approxeq_mat4( viewRhn_exp, viewRhn_test );
console.log( "Solution: \n Left" );
console.log( viewLhn_exp.elements );
console.log( "Right" );
console.log( viewRhn_exp.elements );
console.log( "Student answer: \n Left" );
console.log( viewLhn_test.elements );
console.log( "Right" );
console.log( viewRhn_test.elements );
console.log( 'Solution check: ' + checkSol( viewhn_sol ) );
