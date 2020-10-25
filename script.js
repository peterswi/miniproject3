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

let returnRaces = function(data) {
    return data.race;
}

let race_freq = [];
let countNum = function(data) {
    //let data_arr = Object.entries(data)
    let races = returnRaces(data)
    let races_arr = Object.entries(races)
    console.log(races_arr)
    races.forEach((r) => {
            counter = 0;
            data.forEach((data) => {
                    if (data.race === r) {
                    //    console.log(data.race)
                        counter++;
                    }
                });
            race_freq.push('Race:', r, 'Num_Victims', counter);
        })
  //  console.log(race_freq) 
};

let makeBars = function makeStaticBar(data) {
    let data_arr = Object.entries(data)
    console.log(data_arr)
    xScaleStatic.domain(data_arr.map(d => returnRaces(d)))
    console.log(data_arr.map(d => returnRaces(d)))
    yScaleStatic.domain(data_arr.map(d => countNum(d)))

    const staticbars = barSVG.append('rect')
        .data(data)
        .enter()
}



let info = d3.csv('data-police-shootings-master/fatal-police-shootings-data.csv', d3.autoType).then( data => {
    console.log(data);
    makeBars(data);
});

