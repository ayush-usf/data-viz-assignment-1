var tableVar
function preload() {
    tableVar = loadTable("airlines.csv", "csv", "header");
}

var leftMargin = 50;
var rightMargin = 100;
var topMargin = 50;
var plotHeight = 600;
var plotWidth = 800;

var from;
var to;

var monthsMap = {
    1 : "Jan",
    2 : "Feb",
    3 : "Mar",
    4 : "Apr",
    5 : "May",
    6 : "Jun",
    7 : "Jul",
    8 : "Aug",
    9 : "Sep",
    10 : "Oct",
    11 : "Nov",
    12 : "Dec"
}

var citiesMap = {
    "ATL": "Atlanta",
    "BOS": "Boston",
    "BWI": "Baltimore",
    "CLT": "Charlotte",
    "DCA": "Washington"
}

var airportCode = ["ATL","BOS","BWI","CLT","DCA"]
var spacing = 40

var minVal = Number.MAX_SAFE_INTEGER
var maxVal = 0

function setup(){
    createCanvas(plotWidth,plotHeight)
    myMap = {}
    tableVar.rows.forEach(i => {
        // Fetching data for 5 cities for year 2007
        if(i.obj["Time.Year"] == 2007){
            if(airportCode.includes(i.obj["Airport.Code"])){
                if(!(i.obj["Airport.Code"] in myMap))
                    myMap[i.obj["Airport.Code"]] = []
                myMap[i.obj["Airport.Code"]].push({[i.obj["Time.Month"]] : i.obj["Statistics.Minutes Delayed.Weather"]})
            }
        }
    })
    from = color(255, 0, 0);
    to = color(0,0,0);
}

function draw() {
    background(255, 255, 255);
    fill(0);

    // Y axis
    Object.keys(myMap).forEach((i,idx) => text(monthsMap[i],leftMargin, idx * spacing + topMargin + 20))

    Object.keys(myMap).forEach((i,idx) => {
        myMap[i].forEach((monthData, idx2) =>{
            monthData = +Object.values(monthData)[0]
            if (monthData < minVal){
                minVal = monthData;
            }
            if (monthData > maxVal){
                maxVal = monthData;
            }
        })
        // Y Axis
        fill(0);
        textAlign(RIGHT)
        text(citiesMap[i] + ' (' + i + ')', leftMargin  + 60, idx * spacing + topMargin + 22);
    })

    // Plotting sqaures for heatmap
    Object.keys(myMap).forEach((i,idx) => {
        myMap[i].forEach((monthData, idx2) =>{
            let val = Object.values(monthData)[0]
            stroke(255, 255, 255);
            let interA = lerpColor(from, to,  val / (maxVal ));
            fill(interA);
            square(leftMargin + 80 + idx2 * spacing, idx * spacing + topMargin , 35);
        })
    })

    // Adding Months to x axis
    myMap["ATL"].forEach((i,idx) =>{
        fill(0);
        text(monthsMap[idx+1], idx * spacing + leftMargin + 95 , 270);
    })

    // Creating Text and Linear Gradient on Right
    setGradient(plotWidth - 140, topMargin + 40, 15, 2 * spacing + 15 + topMargin , from, to);
    fill(1);
    stroke(0, 0, 0);
    text(minVal, 15 * spacing  + leftMargin + 60 , topMargin + 50);
    text(maxVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), 15 * spacing  + leftMargin + 70 , topMargin + 182);
    textAlign(CENTER);
    text("Flight Delayed Minutes", 14 * spacing + leftMargin , topMargin, 120, 80);

    textAlign(CENTER);
    fill(0)
    // textStyle(BOLD)
    text('Flight Delayed Minutes in 5 Cities in 2007', plotWidth/2 -40 , topMargin + 270);
}

// Definition of windowResized Function
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setGradient(x, y, w, h, c1, c2) {
    noFill();
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
        var inter = map(i, y, y + h, 0, 1);
        var c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, i, x + w, i);
    }
}
