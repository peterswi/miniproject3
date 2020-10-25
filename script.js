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

const barSVG = d3.select('.static-bar').append('svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


let makeBars = function makeStaticBar(data) {
    const unique_races = [... new Set(data.map(d => returnRaces(d)))]
    console.log(unique_races)
    xScaleStatic.domain(unique_races)
    yScaleStatic.domain(data.map(d => countNum(d,unique_races)))
 //   const staticbars = barSVG.append('rect')
  //      .data(data)
   //     .enter()
}



let info = d3.csv('data-police-shootings-master/fatal-police-shootings-data.csv', d3.autoType).then( data => {
    console.log(data);
    makeBars(data);
});

console.log(Object.prototype)