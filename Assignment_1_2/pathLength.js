'use strict'
// global variables
let allPathLength = new Array();

/**
 * Requesting an array with coordinates and adding the partial path length between them
 * @param {Array} pathList 
 */
function summPathLength(pathList){
    var currPathLength=0;
    // summing up all path length
    for(var p=0; p<pathList.length-1;p++){
        currPathLength += calcPathLength(pathList[p],pathList[p+1]);
    }
    // adding the summ to global array together with the start and end point for later visualization
    allPathLength.push([pathList[0],pathList[pathList.length-1],currPathLength]);
}

/**
 * 
 * @param {Array} pathPoint1 
 * @param {Array} pathPoint2 
 * @returns {Number}  distance between 2 points
 */
function calcPathLength(pathPoint1, pathPoint2){
    // declaring variables for point coordinates
    let lon1 = pathPoint1[0];
    let lon2 = pathPoint2[0];
    let lat1 = pathPoint1[1];
    let lat2 = pathPoint2[1];
    
    // declaring variables for distance algorithm
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    /**
     * calculating distance between 2 points on a spherical surface
     * @author https://www.movable-type.co.uk/scripts/latlong.html
     */
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // in metres

    // returning distance
    return d;
}

/**
 * Calculating summ of all existing paths on the route
 * @param {Array} pathArray 
 * @returns {Number}
 */
function getPathSummLength(pathArray){
    let tmpSumm = 0;
    // iterating through given array and adding everything up
    for (let i=0; i<pathArray.length; i++){
        tmpSumm = tmpSumm+pathArray[i][2];
    }
    return tmpSumm;
}