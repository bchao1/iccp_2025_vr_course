#include "OrientationMath.h"


/** 
 * (3.2.1)
 * TODO: see documentation in header file 
 * */
double computeFlatlandRollGyr(double flatlandRollGyrPrev, double gyr[3], double deltaT) {

  return 0.0;

}

/** 
 * (3.2.2)
 * TODO: see documentation in header file 
 * */
double computeFlatlandRollAcc(double acc[3]) {

  return 0.0;

}

/**
 * (3.2.3) 
 * TODO: see documentation in header file 
 * */
double computeFlatlandRollComp(double flatlandRollCompPrev, double gyr[3], double flatlandRollAcc, double deltaT, double alpha) {

  return 0.0;

}

/* QUATERNION-BASED TRACKING. NOT COVERED! */

/** TODO: see documentation in header file */
double computeAccPitch(double acc[3]) {

  return 0.0;

}

/** TODO: see documentation in header file */
double computeAccRoll(double acc[3]) {

  return 0.0;

}

void updateQuaternionGyr(Quaternion& q, double gyr[3], double deltaT) {
  // q is the previous quaternion estimate
  // update it to be the new quaternion estimate

}


void updateQuaternionComp(Quaternion& q, double gyr[3], double acc[3], double deltaT, double alpha) {
  // q is the previous quaternion estimate
  // update it to be the new quaternion estimate


}