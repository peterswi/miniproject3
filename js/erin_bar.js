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

// const pieSVG = d3.select('.pie')
//     .append('svg')
//     .attr('width', width + margin.left + margin.right)
//     .attr('height', height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let returnRaces = function(data) {
    return data.race;
}

/*let countNum = function(data) {
    let races = data.map(d => returnRaces(d))

} */


let makeBars = function makeStaticBar(data) {
    const unique_races = [... new Set(data.map(d => returnRaces(d)))]
    console.log(unique_races)
    xScaleStatic.domain(unique_races)
    yScaleStatic.domain(data.map(d => countNum(d,unique_races)))
 //   const staticbars = barSVG.append('rect')
  //      .data(data)
   //     .enter()
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

    const size = 500;const fourth = size / 4;const half = size / 2;const labelOffset = fourth * 1.4;const total = armedDataArray.reduce((acc, cur) => acc + cur.value, 0);


    var pieChart = d3.select('.pie').append('svg')
        .style('width', '100%')  
        .attr('viewBox', `0 0 ${size} ${size}`);

    const plotArea = pieChart.append('g')
        .attr('transform', `translate(${half}, ${half})`);

    const pieColorScale = d3.scaleOrdinal()
        .domain(armedDataArray.map(d => d.label))  
        .range(d3.schemeCategory10);

    const pie = d3.pie()
        .sort(null) 
        .value(d => d.value);

    const arcs = pie(armedDataArray);

    const arc = d3.arc()  
        .innerRadius(0)  
        .outerRadius(fourth);
    
    const arcLabel = d3.arc()
        .innerRadius(labelOffset) 
        .outerRadius(labelOffset);

    plotArea.selectAll('path')
        .data(arcs)
        .enter()
        .append('path')
        .attr('fill', d => pieColorScale(d.data.label))
        .attr('stroke', 'white')
        .attr('d', arc);

        const labels = plotArea.selectAll('text') 
        .data(arcs) 
        .enter() 
        .append('text') 
        .style('text-anchor', 'middle')
        .style('alignment-baseline', 'middle')
        .style('font-size', '20px')
        .attr('transform', d => `translate(${arcLabel.centroid(d)})`)

        labels.append('tspan') 
        .attr('y', '-0.6em')
        .attr('x', 0)
        .style('font-weight', 'bold')
        .text(d => `${d.data.label}`);
}




let info = d3.csv('data-police-shootings-master/fatal-police-shootings-data.csv', d3.autoType).then( data => {
    console.log(data);
    makeStaticPie(data);
    makeBars(data);
});

console.log(Object.prototype)