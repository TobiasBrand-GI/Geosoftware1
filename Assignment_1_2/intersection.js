'use strict'
/**
 * Wrapper method, which calls all different methods to calculate the intersection point
 * @param {Number} routeStartlat 
 * @param {Number} routeStartlong 
 * @param {Number} routeEndlat 
 * @param {Number} routeEndlong 
 * @param {Number} polyStartlat 
 * @param {Number} polyStartlong 
 * @param {Number} polyEndlat 
 * @param {Number} polyEndlong 
 * @returns {Array} intersectionPoint
 */
function calculateIntersection(routeStartlat, routeStartlong, routeEndlat, routeEndlong, polyStartlat, polyStartlong, polyEndlat, polyEndlong){
    var bearingRoutePart= bearingCalc(routeStartlat, routeStartlong, routeEndlat, routeEndlong);
    var bearingPolyPart= bearingCalc(polyStartlat, polyStartlong, polyEndlat, polyEndlong);
    var intersectionPoint = intersectCalc([routeStartlat, routeStartlong], bearingRoutePart, [polyStartlat, polyStartlong], bearingPolyPart);
    return intersectionPoint;
}

/**
 * Calculating the bearing of a given point on a spherical surface
 * @param {Number} startLat 
 * @param {Number} startLong 
 * @param {Number} endLat 
 * @param {Number} endLong 
 * @returns {Number} bearing
 * @author https://www.movable-type.co.uk/scripts/latlong.html
 */
function bearingCalc(startLat, startLong, endLat, endLong){
    // Converting degree data to radians
    const φ1 = toRadiant(startLat);
    const φ2 = toRadiant(endLat);
    const Δλ = toRadiant(endLong-startLong);
    // calculating bearing
    const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
    const y = Math.sin(Δλ) * Math.cos(φ2);
    const θ = Math.atan2(y, x);
    // in degrees
    const brng = toDegrees(θ);
    return brng;
}

/**
 * Convert degree values into radians
 * @param {Number} degree 
 * @returns {Number} angle in radians
 */
function toRadiant(degree){
    return (degree*(Math.PI/180));
}

/**
 * Convert radians to degrees
 * @param {Number} radiant 
 * @returns {Number} angle in degrees
 */
function toDegrees(radiant){
    return(radiant*(180/Math.PI));
}

/**
 * Calculating an intersection point of 2 points and their given bearings considering a spherical surface
 * @param {Array} p1 
 * @param {Number} brng1 
 * @param {Array} p2 
 * @param {Number} brng2 
 * @returns {Array} intersection point
 * @author https://www.movable-type.co.uk/scripts/latlong.html
 * @author www.edwilliams.org/avform.htm#Intersection
 */
function intersectCalc(p1, brng1, p2, brng2){
    // declaring variables
    let p1Lat = p1[0];
    let p1Long = p1[1];
    let p2Lat = p2[0];
    let p2Long = p2[1];
    // converting degree values to radians
    const φ1 = toRadiant(p1Lat), λ1 = toRadiant(p1Long);
    const φ2 = toRadiant(p2Lat), λ2 = toRadiant(p2Long);
    const θ13 = toRadiant(Number(brng1)), θ23 = toRadiant(Number(brng2));
    
    const Δφ = φ2 - φ1, Δλ = λ2 - λ1;

    // angular distance p1-p2
    const δ12 = 2 * Math.asin(Math.sqrt(Math.sin(Δφ/2) * Math.sin(Δφ/2)
        + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2)));
    if (Math.abs(δ12) < Number.EPSILON) return new LatLonSpherical(p1.lat, p1.lon); // coincident points

    // initial/final bearings between points
    const cosθa = (Math.sin(φ2) - Math.sin(φ1)*Math.cos(δ12)) / (Math.sin(δ12)*Math.cos(φ1));
    const cosθb = (Math.sin(φ1) - Math.sin(φ2)*Math.cos(δ12)) / (Math.sin(δ12)*Math.cos(φ2));
    const θa = Math.acos(Math.min(Math.max(cosθa, -1), 1)); // protect against rounding errors
    const θb = Math.acos(Math.min(Math.max(cosθb, -1), 1)); // protect against rounding errors

    const θ12 = Math.sin(λ2-λ1)>0 ? θa : 2*Math.PI-θa;
    const θ21 = Math.sin(λ2-λ1)>0 ? 2*Math.PI-θb : θb;

    const α1 = θ13 - θ12; // angle 2-1-3
    const α2 = θ21 - θ23; // angle 1-2-3

    if (Math.sin(α1) == 0 && Math.sin(α2) == 0) return null; // infinite intersections
    if (Math.sin(α1) * Math.sin(α2) < 0) return null;        // ambiguous intersection (antipodal?)

    const cosα3 = -Math.cos(α1)*Math.cos(α2) + Math.sin(α1)*Math.sin(α2)*Math.cos(δ12);

    const δ13 = Math.atan2(Math.sin(δ12)*Math.sin(α1)*Math.sin(α2), Math.cos(α2) + Math.cos(α1)*cosα3);

    const φ3 = Math.asin(Math.min(Math.max(Math.sin(φ1)*Math.cos(δ13) + Math.cos(φ1)*Math.sin(δ13)*Math.cos(θ13), -1), 1));

    const Δλ13 = Math.atan2(Math.sin(θ13)*Math.sin(δ13)*Math.cos(φ1), Math.cos(δ13) - Math.sin(φ1)*Math.sin(φ3));
    const λ3 = λ1 + Δλ13;
    
    // convertig radians to degree
    const lat = toDegrees(φ3);
    const lon = toDegrees(λ3);

    // returning intersection point
    return ([lon,lat]);
}


