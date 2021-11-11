'use strict'
let error;
/**
 * Method to call validation check from external library
 * @param {*} input takes a string or object to check if it is in valid GeoJSON format
 * @param {*} options string with options for the check
 * @returns boolean
 */
function validationCheck(input, options){
    // calling validation method from author: https://github.com/mapbox/geojsonhint
    error=geojsonhint.hint(input, options);
    if (error.length==0){
        return true;
    }else{return false;} 
}

/**
 * Function to parse a string to a GeoJSON object
 * @param {*} data accepts an array of coordinates and parses it into a GeoJSON object
 * @returns object
 */
function parseIntoJSON(data){
    let lineStringData=[{line:data}]
    // calling parsing method from geojson.min.js, author: https://github.com/caseycesari/GeoJSON.js
    return GeoJSON.parse(lineStringData, {'LineString': 'line' });
}