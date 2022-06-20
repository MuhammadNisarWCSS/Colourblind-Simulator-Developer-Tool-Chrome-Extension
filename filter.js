//Creates the feColorMatrix filter once message from background.js is received
chrome.runtime.onMessage.addListener(

    function(request, sender, sendResponse) {

        if (request.greeting === "createFilter") {
            createFilter();
            sendResponse({farewell: "Filter created"});
        }
    }
);


//Creates the feColorMatrix filter
function createFilter() {

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", 0);
    svg.setAttribute("height", 0);

    var filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
    filter.setAttribute("id", "colorFilter");
    filter.setAttribute("color-interpolation-filters", "linearRGB");

    var feColorMatrix = document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix");
    feColorMatrix.setAttribute("in", "SourceGraphic");
    feColorMatrix.setAttribute("type", "matrix");
   
    document.body.appendChild(svg);
    svg.appendChild(filter);
    filter.appendChild(feColorMatrix);
    loadFilter();
}

//Loads the feColorMatrix filter in accordance to the selected mode
function loadFilter() {

    feColorMatrix = document.querySelector("feColorMatrix");
    
    chrome.storage.sync.get(['defaultMode', 'protanopiaMode', 'deuteranopiaMode', 'tritanopiaMode'], function(result) {

        if (result.protanopiaMode) {
            feColorMatrix.setAttribute("values", "0.10889 0.89111 -0.00000 0 0  0.10889 0.89111 0.00000 0 0  0.00447 -0.00447 1.00000 0 0  0 0 0 1 0");
        }

        else if (result.deuteranopiaMode) {
            feColorMatrix.setAttribute("values", "0.29031 0.70969 -0.00000 0 0  0.29031 0.70969 -0.00000 0 0  -0.02197 0.02197 1.00000 0 0  0 0 0 1 0");
        }

        else if (result.tritanopiaMode) {
            feColorMatrix.setAttribute("values", "1.01354 0.14268 -0.15622 0 0  -0.01181 0.87561 0.13619 0 0  0.07707 0.81208 0.11085 0 0  7.92482 -5.66475 -2.26007 1 -0.2");
        }

        else if (result.defaultMode){
            feColorMatrix.setAttribute("values", "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0")
        }

        document.documentElement.style["filter"] = `url(#colorFilter)`;
    })
}