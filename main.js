'use strict'

/**
 * The main function called in the webpage
 * Automatically loaded when the page is loaded
 */
function main(){
    // Starting intersection point algorithm
    intersectionCheck();

    // Sorting and rearranging the array containing the results from the intersection algorithm
    let sortedArray = sortArray(allPathLength);
    let reversedArray = sortedArray.reverse();

    // Calling method to create the HTML table
    creatingTable(reversedArray);
}
window.onload=main;

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