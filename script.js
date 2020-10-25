const margin = ({top: 20, right: 35, bottom: 20, left: 40});
const width = 500 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// MAKING STATIC BAR

const xScaleStatic = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.05)

const yScaleStatic = d3.scaleLinear()
    .rangeRound([height, 0])

const xAxisStatic = d3.axisBottom()
    .scale(xScaleStatic)

const yAxisStatic = d3.axisLeft()
    .scale(yScaleStatic)

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin

const armedStatus = ["gun", "not gun"];

const colorScale = d3
    .scaleOrdinal()
    .domain(armedStatus)
    .range(d3.schemeSet2)


const barSVG = d3.select('.static-bar').append('svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

const pieSVG = d3.select('.pie')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let returnRaces = function(data) {
    return data.race;
}

/*let countNum = function(data) {
    let races = data.map(d => returnRaces(d))

} */

function makeStaticBar(data) {
    xScaleStatic.domain(data.map(d => returnRaces(d)))
    yScaleStatic.domain()

    const staticbars = barSVG.append('rect')
        .data(data)
        .enter()
}

function makeStaticPie(data) {
    var armedDataArray = [];
    var unarmedCount = 0;
    var armedCount = 0;
    for (let step = 0; step < 5701; step++) { 
        if (data[step].armed == "gun") {
            armedCount += 1;
        } else {
            unarmedCount += 1;
        }
    };
    armedDataArray.push({"label": "gun", "value": armedCount})
    armedDataArray.push({"label": "no gun", "value": unarmedCount})

    console.log(armedDataArray)

    var pie = d3.pie()
        .value(function(d) {return d.value; });
    var data_ready = pie(armedDataArray)

   pieSVG
        .selectAll('slices')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', d3.arc()
            .innerRadius(0)
            .outerRadius(radius)
        )
        // .attr('fill', function(d){ return(color(d.data.key)) })
        .attr('fill', 'blue')
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)

}

var arc = d3.svg.arc()
    .outerRadius(r);

var pie = d3.layout.pie()
    .value(function(d) { return d.value; });

var arcs = pieSVG.selectAll('slicies')
    .data()



let info = d3.csv('data-police-shootings-master/fatal-police-shootings-data.csv', d3.autoType).then( data => {
    console.log(data);
    makeStaticPie(data);
    
});

