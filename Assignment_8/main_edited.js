'use strict'
let oldRoute = 0;

/**
 * The main function called in the webpage
 * Called by Button on Webpage
 */
function main(routeData){
    let routeString = routeData.value;
    let optionString = "precisionWarning:false";
    //Check if its a valid GeoJSON
    if(validationCheck(routeString, optionString)==true){
        tmpInputMemory=routeString;
        //Check if it is a new GeoJSON
        if(oldRoute==0){
            let tmpJsonObj = JSON.parse(routeString);
            //Check if JSON is a linestring
            if(tmpJsonObj.features[0].geometry.type==="LineString"){
                route=tmpJsonObj.features[0].geometry.coordinates;
                // Starting intersection point algorithm
                intersectionCheck();

                // Sorting and rearranging the array containing the results from the intersection algorithm
                let sortedArray = sortArray(allPathLength);
                let reversedArray = sortedArray.reverse();

                // Calling method to create the HTML table
                creatingTable(reversedArray);
                showUsedGeoJSON();
            }
            
        } else{
            //Check if JSON is a linestring
            if(txtAreaReturn.features[0].geometry.type==="LineString"){
                route=txtAreaReturn.features[0].geometry.coordinates;
                // Starting intersection point algorithm
                intersectionCheck();

                // Sorting and rearranging the array containing the results from the intersection algorithm
                let sortedArray = sortArray(allPathLength);
                let reversedArray = sortedArray.reverse();

                // Calling method to create the HTML table
                 showUsedGeoJSON();
                 console.log(reversedArray);
                return(reversedArray)
               
            }
            
        }
        
    }else{
        // Catch errors
        errorVisualize();
    }

   
}


/**
 * sorting an array by using BubbleSort
 * @param {*} sortObject 
 * @returns {*} sorted array
 */
function sortArray(sortObject){
    for (let s = 0; s < sortObject.length; s++) {
        for (let t = 0; t < sortObject.length-1; t++) {
            if (sortObject[t][2] > sortObject[t + 1][2]) {
                let tmp = sortObject[t][2];
                sortObject[t][2] = sortObject[t + 1][2];
                sortObject[t + 1][2] = tmp;
            }
        }
    }
    return allPathLength;
}