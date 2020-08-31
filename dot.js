var tableVar
function preload() {
    tableVar = loadTable("airlines.csv", "csv", "header");
}

var leftMargin = 100;
var rightMargin = 100;
var topMargin = 100;
var plotHeight = window.innerHeight - topMargin  - 100;
var plotWidth = window.innerWidth - leftMargin - rightMargin ;

function setup(){
    createCanvas(window.innerWidth,window.innerHeight)
    myMap = {}
    tableVar.rows.forEach(i => {
        if(!(i.obj["Time.Year"] in myMap))
            myMap[i.obj["Time.Year"]] = 0
        myMap[i.obj["Time.Year"]] += +(i.obj["Statistics.Flights.Total"])
    })
}

function draw() {
    background(777);
    fill(0);
    stroke(0, 0, 0);
    strokeWeight(0.5);
    const len = Object.keys(myMap).length

    // X axis
    barWidthConst = window.innerWidth / 1000
    var xLen = plotWidth;
    const spacing = xLen / len - 10
    line(leftMargin, topMargin + plotHeight, xLen + 30, topMargin + plotHeight);

    // X axis label
    textAlign(LEFT);
    text('Year', xLen/2, topMargin + plotHeight + 50);

    //place years - x axis
    Object.keys(myMap).forEach((i,idx) => text(i, idx * spacing + 60 + (barWidthConst * 10) + leftMargin, topMargin + plotHeight + 20))

    // Placing lines on x-axis to show dot location w.r.r x axis
    Object.keys(myMap).forEach((i,idx) => {
        stroke(125, 121, 121);
        line(idx * spacing + leftMargin + 85,  topMargin + plotHeight, idx * spacing + leftMargin + 85, topMargin)
    })
    line( xLen + 20 , topMargin + plotHeight - 10,  xLen + 30, topMargin + plotHeight);
    line( xLen + 20, topMargin + plotHeight + 10,  xLen + 30, topMargin + plotHeight);

    // Y axis
    line(leftMargin, topMargin + plotHeight, leftMargin, topMargin - 50);
    // Y axis arrow at the top
    line(leftMargin - 10, topMargin - 40, leftMargin, topMargin- 50);
    line(leftMargin + 10, topMargin - 40, leftMargin, topMargin- 50);

    // Y axis label
    angleMode(DEGREES);
    rotate(-90);
    textAlign(CENTER);
    text('Totlal Flight Count', 0 - (topMargin + plotHeight/2), leftMargin - 50);
    rotate(90);

    // Y axis ticks
    // bottom tick
    var surplus = 10; // extra pixels on Y axis inside plot for spacing
    textAlign(RIGHT);
    var minFlightY = topMargin + plotHeight - surplus;
    var verticalSpacing = plotHeight / 5
    for(i=1; i < 6; i++){
        text(i+"00K", leftMargin - 12, minFlightY - (verticalSpacing * i ) +5); // + 5 to center text vertically
        line(leftMargin - 5, minFlightY - (verticalSpacing * i ) , leftMargin + 5, minFlightY - (verticalSpacing * i ) );
    }

    // var pixelsPerYear = (plotHeight - surplus * 2) / (maxCnt - minCnt);
    Object.values(myMap).forEach((i,idx) => {
        fill(237, 34, 93);
        stroke(255, 255, 255);
        circle(idx * spacing + leftMargin + 83, topMargin + plotHeight - surplus - (i/1000000 * verticalSpacing), 20);
    })

    textAlign(CENTER);
    fill(0)
    textStyle(BOLD)
    text('Total Flights Count (2003-2016)', xLen/2 * 1.1 , topMargin - 50);
}

// Definition of windowResized Function
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
