
/**
 * @file functions to compute model/view/projection matrices
 *
 * @copyright The Board of Trustees of the Leland Stanford Junior University
 * @version 2025/03/18

 */

/**
 * MVPmat
 *
 * @class MVPmat
 * @classdesc Class for holding and computing model/view/projection matrices.
 *
 * @param  {DisplayParameters} dispParams    display parameters
 */
var MVPmat = function ( dispParams ) {

	// Alias for accessing this from a closure
	var _this = this;


	// A model matrix
	this.modelMat = new THREE.Matrix4();

	// A view matrix
	this.viewMat = new THREE.Matrix4();

	// A projection matrix
	this.projectionMat = new THREE.Matrix4();


	var topViewMat = new THREE.Matrix4().set(
		1, 0, 0, 0,
		0, 0, - 1, 0,
		0, 1, 0, - 1500,
		0, 0, 0, 1 );

	/* Functions */

	// A function to compute a model matrix based on the current state
	//
	// INPUT
	// state: state of StateController
	function computeModelTransform( state ) {

		var modelTranslation = state.modelTranslation;

		var modelRotation = state.modelRotation;

		var translationMat
			= new THREE.Matrix4().makeTranslation(
				modelTranslation.x,	modelTranslation.y, modelTranslation.z );

		var rotationMatX =
			new THREE.Matrix4().makeRotationX(
				modelRotation.x * THREE.MathUtils.DEG2RAD );

		var rotationMatY =
			new THREE.Matrix4().makeRotationY(
				modelRotation.y * THREE.MathUtils.DEG2RAD );

		var modelMatrix = new THREE.Matrix4().
			premultiply( rotationMatY ).
			premultiply( rotationMatX ).
			premultiply( translationMat );

		return modelMatrix;

	}

	// A function to compute a view matrix based on the current state
	//
	// NOTE
	// Do not use lookAt().
	//
	// INPUT
	// state: state of StateController
	function computeViewTransform( state ) {

		var upVector = new THREE.Vector3( 0, 1, 0 );

		var viewerPosition = state.viewerPosition;

		var viewerTarget = state.viewerTarget;

		var translationMat
			= new THREE.Matrix4().makeTranslation(
				- viewerPosition.x, - viewerPosition.y, - viewerPosition.z );

		var z_c = new THREE.Vector3().
			subVectors( viewerPosition, viewerTarget ).normalize();

		var x_c = new THREE.Vector3().
			crossVectors( upVector, z_c ).normalize();

		var y_c = new THREE.Vector3().crossVectors( z_c, x_c );

		var rotationMat =
			new THREE.Matrix4().makeBasis( x_c, y_c, z_c ).transpose();

		return new THREE.Matrix4().
			premultiply( translationMat ).premultiply( rotationMat );

	}

	// A function to compute a perspective projection matrix based on the
	// current state
	//
	// NOTE
	// Do not use makePerspective().
	//
	// INPUT
	// Notations for the input is the same as in the class.
	function computePerspectiveTransform(
		left, right, top, bottom, clipNear, clipFar ) {

		var p11 = 2 * clipNear / ( right - left );

		var p13 = ( right + left ) / ( right - left );

		var p22 = 2 * clipNear / ( top - bottom );

		var p23 = ( top + bottom ) / ( top - bottom );

		var p33 = - ( clipFar + clipNear ) / ( clipFar - clipNear );

		var p34 = - 2 * clipFar * clipNear / ( clipFar - clipNear );

		var p43 = - 1;


		return new THREE.Matrix4().set(
			p11, 0, p13, 0,
			0, p22, p23, 0,
			0, 0, p33, p34,
			0, 0, p43, 0 );

	}

	// A function to compute a orthographic projection matrix based on the
	// current state
	//
	// NOTE
	// Do not use makeOrthographic().
	//
	// INPUT
	// Notations for the input is the same as in the class.
	function computeOrthographicTransform(
		left, right, top, bottom, clipNear, clipFar ) {

		var p11 = 2 / ( right - left );

		var p14 = - ( right + left ) / ( right - left );

		var p22 = 2 / ( top - bottom );

		var p24 = - ( top + bottom ) / ( top - bottom );

		var p33 = - 2 / ( clipFar - clipNear );

		var p34 = - ( clipFar + clipNear ) / ( clipFar - clipNear );

		var p44 = 1;

		return new THREE.Matrix4().set(
			p11, 0, 0, p14,
			0, p22, 0, p24,
			0, 0, p33, p34,
			0, 0, 0, p44 );

	}

	// Update the model/view/projection matrices
	// This function is called in every frame (animate() function in render.js).
	function update( state ) {

		// Compute model matrix
		this.modelMat.copy( computeModelTransform( state ) );

		// Use the hard-coded view and projection matrices for top view
		if ( state.topView ) {

			this.viewMat.copy( topViewMat );

			var right = ( dispParams.canvasWidth * dispParams.pixelPitch / 2 )
				* ( state.clipNear / dispParams.distanceScreenViewer );

			var left = - right;

			var top = ( dispParams.canvasHeight * dispParams.pixelPitch / 2 )
				* ( state.clipNear / dispParams.distanceScreenViewer );

			var bottom = - top;

			this.projectionMat.makePerspective( left, right, top, bottom, 1, 10000 );

		} else {

			// Compute view matrix
			this.viewMat.copy( computeViewTransform( state ) );

			// Compute projection matrix
			if ( state.perspectiveMat ) {

				var right = ( dispParams.canvasWidth * dispParams.pixelPitch / 2 )
				* ( state.clipNear / dispParams.distanceScreenViewer );

				var left = - right;

				var top = ( dispParams.canvasHeight * dispParams.pixelPitch / 2 )
				* ( state.clipNear / dispParams.distanceScreenViewer );

				var bottom = - top;

				this.projectionMat.copy( computePerspectiveTransform(
					left, right, top, bottom, state.clipNear, state.clipFar ) );

			} else {

				var right = dispParams.canvasWidth * dispParams.pixelPitch / 2;

				var left = - right;

				var top = dispParams.canvasHeight * dispParams.pixelPitch / 2;

				var bottom = - top;

				this.projectionMat.copy( computeOrthographicTransform(
					left, right, top, bottom, state.clipNear, state.clipFar ) );

			}

		}

	}



	/* Expose as public functions */

	this.computeModelTransform = computeModelTransform;

	this.computeViewTransform = computeViewTransform;

	this.computePerspectiveTransform = computePerspectiveTransform;

	this.computeOrthographicTransform = computeOrthographicTransform;

	this.update = update;

};
