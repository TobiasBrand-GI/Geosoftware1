'use strict'
    // constants and global variables
    const rightBotLon = polygon[1][0];
    const rightBotLat = polygon[1][1];
    const leftTopLon = polygon[3][0];
    const leftTopLat = polygon[3][1];
    let tempPathList = new Array();

    /**
     * Check for every partial path if it intersects with the given polygon
     */
    function intersectionCheck(){
        // iterating through given route array
        for(var i=0; i<route.length-1;i++){
            // declaring variables
            let intersectPointCalc = 0;
            let point1=[route[i][0],route[i][1]];
            let point2=[route[i+1][0],route[i+1][1]];
            
            // if-clause using return value of method insidePolygon, if true intersection point calculation is called
            if (insidePolygon(point1, point2)==true) { 
                // requesting intersection point
                intersectPointCalc = chooseCalculation(point1, point2);

                // adding start point and intersection point to the current path
                tempPathList.push(point1);
                tempPathList.push(intersectPointCalc);

                // calculating path length and resetting temporary array
                summPathLength(tempPathList);
                tempPathList.splice(0, tempPathList.length);
                tempPathList.push(intersectPointCalc);
            }else{
                // adding point to temporary path
                tempPathList.push(point1);
            }
        }
    }

    /**
     * Requesting 2 points and check which border of a polygon the path between them is intersecting and calling the calculation
     * @param {Array} point1 
     * @param {Array} point2 
     * @returns {Array} intersection point of given path with polygon border
     */
    function chooseCalculation(point1, point2){
        // declaring variables
        let point1Lat = point1[1];
        let point1Lon = point1[0];
        let point2Lat = point2[1];
        let point2Lon = point2[0];

        // if-clause deciding which border is intersected
        if (point1Lat>=leftTopLat && point2Lat<=leftTopLat){    // cutting top edge outside inwards
            return calculateIntersection(point1Lat, point1Lon, point2Lat, point2Lon, polygon[2][1], polygon[2][0], polygon[3][1], polygon[3][0]);
        }
        else if (point1Lat<=rightBotLat && point2Lat>=rightBotLat){ // cutting bottom edge outside inwards
            return calculateIntersection(point1Lat, point1Lon, point2Lat, point2Lon, polygon[0][1], polygon[0][0], polygon[1][1], polygon[1][0]);
        }
        else if (point1Lat<=leftTopLat && point2Lat>=leftTopLat){ // cutting top edge oinside outwards
            return calculateIntersection(point1Lat, point1Lon, point2Lat, point2Lon, polygon[2][1], polygon[2][0], polygon[3][1], polygon[3][0]);
        }
        else if (point1Lat>=rightBotLat && point2Lat<=rightBotLat){ // cutting bottom edge inside outwards
            return calculateIntersection(point1Lat, point1Lon, point2Lat, point2Lon, polygon[0][1], polygon[0][0], polygon[1][1], polygon[1][0]);
        }
        else if (point1Lon<=leftTopLon && point2Lon>=leftTopLon){ // cutting left edge outside inwards
            return calculateIntersection(point1Lat, point1Lon, point2Lat, point2Lon, polygon[3][1], polygon[3][0], polygon[4][1], polygon[4][0]);
        }
        else if (point1Lon<=rightBotLon && point2Lon>=rightBotLon){ // cutting right edge inside outwards
            return calculateIntersection(point1Lat, point1Lon, point2Lat, point2Lon, polygon[1][1], polygon[1][0], polygon[2][1], polygon[2][0]);
        }
        else if (point1Lon>=leftTopLon && point2Lon<=leftTopLon){   // cutting left edge inside outwards
            return calculateIntersection(point1Lat, point1Lon, point2Lat, point2Lon, polygon[3][1], polygon[3][0], polygon[4][1], polygon[4][0]);
        }
        else if (point1Lon>=rightBotLon && point2Lon<=rightBotLon){ // cutting right edge outside inwards
            return calculateIntersection(point1Lat, point1Lon, point2Lat, point2Lon, polygon[1][1], polygon[1][0], polygon[2][1], polygon[2][0]);
        }
        else return console.error("Non-valid intersection point!"); // error handling if no clause is true

    }

    /**
     * Checks if exactly one out of the start and end point of a path is inside the polygon
     * @param {Array} routePoint1 
     * @param {Array} routePoint2 
     * @returns {Boolean}
     */
    function insidePolygon(routePoint1, routePoint2){
        // declaring variables
        let p1Lon = routePoint1[0];
        let p1Lat = routePoint1[1];
        let p2Lon = routePoint2[0];
        let p2Lat = routePoint2[1];
        
        // if-clause to check wether a point is inside the polygon
        if( (!insideCheck(p1Lat, p1Lon)) && ((insideCheck(p2Lat, p2Lon)))
            ||  
            ((insideCheck(p1Lat, p1Lon)) && !(insideCheck(p2Lat, p2Lon)))
        ){
            return true;
        }else return false;
    }
    
    /**
     * Ckecking if a point is inside a rectangle
     * @param {Number} pCheckLat 
     * @param {Number} pCheckLon 
     * @returns {Boolean}
     */
    function insideCheck(pCheckLat, pCheckLon){
        
        // looking if a point lies between top left and bottom right corner
        if((checkTopLeft(pCheckLat, pCheckLon)) && (checkBotRight(pCheckLat, pCheckLon))){
            return true;
        }else return false;
    }

    /**
     * Comparing point coordinates to rectangles left top corner
     * @param {Number} pCheckLat 
     * @param {Number} pCheckLon 
     * @returns {Boolean}
     */
    function checkTopLeft(pCheckLat, pCheckLon){
        if((pCheckLat<=leftTopLat)&&(pCheckLon>=leftTopLon)){
            return true;
        }else return false;
    }

    /**
     * Comparing point coordinates to rectangles bottom right corner
     * @param {Number} pCheckLat 
     * @param {NUmber} pCheckLon 
     * @returns {Boolean}
     */
    function checkBotRight(pCheckLat, pCheckLon){
        if((pCheckLat>=rightBotLat)&&(pCheckLon<=rightBotLon)){
            return true;
        }else return false;
    }
