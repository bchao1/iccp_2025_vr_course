checkSol = function ( sol ) {

	if ( sol ) {

		return 'Pass';

	} else {

		return 'Fail';

	}


};

approxeq = function ( v1, v2, epsilon ) {

	if ( epsilon == null ) {

		epsilon = 0.001;

	}

	return Math.abs( v1 - v2 ) < epsilon;

};


approxeq_mat4 = function ( m1, m2, epsilon ) {

	if ( epsilon == null ) {

		epsilon = 0.001;

	}

	var v1 = m1.elements;
	var v2 = m2.elements;

	for ( var i = 0; i < 16; i ++ ) {

		if ( Math.abs( v1[ i ] - v2[ i ] ) > epsilon ) {

			return false;

		}

	}

	return true;

};



approxeq_vec2 = function ( vec1, vec2, epsilon ) {

	if ( epsilon == null ) {

		epsilon = 0.001;

	}

	if ( vec1.x == vec2.x && vec1.y == vec2.y ) {

		return true;

	}

	return false;

};


approxeq_vec3 = function ( vec1, vec2, epsilon ) {

	if ( epsilon == null ) {

		epsilon = 0.001;

	}

	if ( vec1.x == vec2.x && vec1.y == vec2.y && vec1.z == vec2.z ) {

		return true;

	}

	return false;

};
