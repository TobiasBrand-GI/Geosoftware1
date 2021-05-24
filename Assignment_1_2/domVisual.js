let txtAreaReturn;
let tmpInputMemory;

/**
 * Taking an array and creating a HTML table object with the array data
 * @param {*} reversedArray 
 */
 function creatingTable(reversedArray){

    // Table for path coordinates and path length
    let tablePath = document.createElement('table');
    tablePath.id = "data";
    // Creting heading row
    let rowHeader = tablePath.insertRow();
    rowHeader.id="headerRow";
    let header1 = rowHeader.insertCell();
    header1.textContent = "ID";
    let header2 = rowHeader.insertCell();
    header2.textContent = "Startpunkt";
    let header3 = rowHeader.insertCell();
    header3.textContent = "Endpunkt";
    let header4 = rowHeader.insertCell();
    header4.textContent = "Abschnittslänge in Meter";

    // Creating a row for each entry in the array
    for (let tr=0; tr<reversedArray.length; tr++){
        let row = tablePath.insertRow();
        row.id = "dataRow";
        // Creating 4 cells for ID, start and end point aswell as the path length
        let idCell = row.insertCell();
        idCell.textContent = (tr+1);
        let startPCell = row.insertCell();
        startPCell.textContent = reversedArray[tr][0][0]+" °E"+"\n"+reversedArray[tr][0][1]+" °N ";
        let endPCell = row.insertCell();
        endPCell.textContent = reversedArray[tr][1][0]+" °E"+"\n"+reversedArray[tr][1][1]+" °N";
        let lenCell = row.insertCell();
        lenCell.textContent = reversedArray[tr][2];
    }
    document.body.appendChild(tablePath);

    // Table for the summ of all path length
    let summDistance = getPathSummLength(reversedArray);
    let tableSumm = document.createElement('table');
    tableSumm.id="summTab";
    let row = tableSumm.insertRow();
    let summCell = row.insertCell();
        summCell.textContent = "Gesamtlänge der Strecke beträgt: "+summDistance+" Meter, oder umgerechnet etwa: "+(Math.round((summDistance/1000)*100)/100)+" Kilometer!";
    document.body.appendChild(tableSumm);
}

/**
 * Method to create a div container for showing error messages from the input
 */
function errorVisualize(){
    let errorDIV=document.createElement('div');
    errorDIV.id="errorDIV";
    var newContent = document.createTextNode("That did not work: For further information look into the error message down below!");
    var newContent1 = document.createTextNode("Error: " + error[0].message);
    var linebreak = document.createElement('br');
    errorDIV.appendChild(newContent);
    errorDIV.appendChild(linebreak);
    errorDIV.appendChild(newContent1);
    document.body.appendChild(errorDIV);
}

/**
 * Function to fill input with example route
 */
function fillInputWExample(){
    route=routeExample;
    var textarea = document.getElementById("routeInput");
    txtAreaReturn = parseIntoJSON(route);
    textarea.value = JSON.stringify(txtAreaReturn);
    oldRoute=1;
}

/**
 * function to show the formatted data which was used
 */
function showUsedGeoJSON(){
    let usedJSONdiv=document.createElement('div');
    usedJSONdiv.id="JSONDIV";
    var routeTxt = document.createElement('textarea');
    routeTxt.id="routeJSONOut";
    var polyTxt = document.createElement('textarea');
    var routeHeader = document.createElement('h4');
    routeHeader.id="routeHeader";
    var polyHeader = document.createElement('h4');
    polyHeader.id="polyHeader";
    var linebreak1 = document.createElement('br');
    routeTxt.value=tmpInputMemory;
    polyTxt.value=JSON.stringify(parseIntoJSON(polygon));
    routeHeader.textContent="GeoJSON of route";
    polyHeader.textContent="GeoJSON of polygon";
    usedJSONdiv.appendChild(routeHeader);
    usedJSONdiv.appendChild(routeTxt);
    usedJSONdiv.appendChild(linebreak1);
    usedJSONdiv.appendChild(polyHeader);
    usedJSONdiv.appendChild(polyTxt);
    document.body.appendChild(usedJSONdiv);
}

/**
 * function to clear the input
 */
function clearInputField(){
    document.getElementById("routeInput").value="";
}