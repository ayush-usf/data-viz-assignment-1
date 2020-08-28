var tableVar
function preload() {
    tableVar = loadTable("airlines.csv", "csv", "header");
}

var leftMargin = 100;
var rightMargin = 100;
var topMargin = 50;
var plotHeight = window.innerHeight - topMargin  - 100;
var plotWidth = window.innerWidth - leftMargin - rightMargin;
var barWidth = 40;

function setup(){
    createCanvas(window.innerWidth,window.innerHeight)
    myMap = {}
    // Fetching data for flights delayed count per year
    tableVar.rows.forEach(i => {
        if(!(i.obj["Time.Year"] in myMap))
            myMap[i.obj["Time.Year"]] = 0
        myMap[i.obj["Time.Year"]] += +(i.obj["Statistics.Flights.Delayed"])
    })
}

function draw() {
    background(777);
    fill(0);
    const len = Object.keys(myMap).length

    // X axis
    // Mutliplier for x-axis label positioning (for responsive design)
    barWidthConst = window.innerWidth / 1000
    var xLen = plotWidth;
    const spacing = xLen / len - 10
    line(leftMargin, topMargin + plotHeight, xLen + 30, topMargin + plotHeight);

    // X axis label
    textAlign(LEFT);
    text('Years', xLen/2, topMargin + plotHeight + 50);

    //place years - x axis
    Object.keys(myMap).forEach((i,idx) => text(i, idx * spacing + 60 + (barWidthConst * 10) + leftMargin, topMargin + plotHeight + 20))
    line( xLen + 20 , topMargin + plotHeight - 10,  xLen + 30, topMargin + plotHeight);
    line( xLen + 20, topMargin + plotHeight + 10,  xLen + 30, topMargin + plotHeight);

    // Y axis
    line(leftMargin, topMargin + plotHeight, leftMargin, topMargin);
    // Y axis arrow at the top
    line(leftMargin - 10, topMargin + 10, leftMargin, topMargin);
    line(leftMargin + 10, topMargin + 10, leftMargin, topMargin);

    // Y axis label
    angleMode(DEGREES);
    rotate(-90);
    textAlign(CENTER);
    text('Flight Delays Count', 0 - (topMargin + plotHeight/2), leftMargin - 50);
    rotate(90);

    // Y axis ticks
    // bottom tick
    var surplus = 10; // extra pixels on Y axis inside plot for spacing
    textAlign(RIGHT);
    var minFlightY = topMargin + plotHeight - surplus;
    var verticalSpacing = plotHeight / 13
    for(i=1; i < 13; i++){
        text(i+"00K", leftMargin - 12, minFlightY - (verticalSpacing * i ) +5); // + 5 to center text vertically
        line(leftMargin - 5, minFlightY - (verticalSpacing * i ) , leftMargin + 5, minFlightY - (verticalSpacing * i ) );
    }

    // var pixelsPerYear = (plotHeight - surplus * 2) / (maxCnt - minCnt);
    Object.values(myMap).forEach((i,idx) => {
        fill(54, 150, 209);
        rect(idx * spacing + leftMargin + 60, topMargin + plotHeight - surplus - (i/100000 * verticalSpacing), barWidth * barWidthConst, (i/100000 * verticalSpacing)+surplus)
    })

    textAlign(CENTER);
    fill(0)
    textStyle(BOLD)
    text('Total Flights Delays (2003-2016)', xLen/2 * 1.1 , topMargin );
}

// Definition of windowResized Function
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
