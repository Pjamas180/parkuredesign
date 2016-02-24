/* File is currently deprecated */
'use strict';

// Call this function when the page loads (the "ready" event)
window.onload = function() {
    //alert($('cd-dropdown'));
    initializePage();
};


/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    console.log("Initialized first page");
    $.get("/vehicles", displayVehicles);
    console.log("Calling URL for: /vehicles");
}

function displayVehicles(result) {
    //console.log(result);
    //var element = document.getElementById("cd-dropdown3");
    //console.log(element);

    for (var i = 0; i < result.length; i++ ) {
        // Creates 'option' element
        // var vehicleNode = document.createElement("option");
        // Setting the value attribute for display
        // vehicleNode.setAttribute("value", i+1);
        // Adding the name of the vehicle to the element
        // var vehicleName = document.createTextNode(result[i].vehicleName);
        // vehicleNode.appendChild(vehicleName);
        // Adding vehicle to cd-dropdown3
        console.log($('.cd-dropdown').text());
        $('.cd-dropdown').append($('<option>', {
            value: i+1,
            text: result[i].vehicleName
        }));
        console.log($('.cd-dropdown'));

    }

}



