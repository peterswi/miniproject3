const margin = ({top: 20, right: 35, bottom: 20, left: 40});
const width = 750 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

const barSVG = d3.select('.static-bar').append('svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

// MAKING STATIC BAR
const xScaleStatic = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.10)

const yScaleStatic = d3.scaleLinear()
    .range([height, 0])

const xAxisStatic = d3.axisBottom()
    .scale(xScaleStatic)

const yAxisStatic = d3.axisLeft()
    .scale(yScaleStatic)

barSVG.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxisStatic)

barSVG.append("g")
    .attr("class", "axis y-axis")
    .call(yAxisStatic)


let returnRaces = function(data) {
    return data.label
}

let raceFreq = function(data) {
    return Math.round( ( (data.value/5701)*100)*100 ) /100
}

let makeBars = function makeStaticBar(data) {

        var racesDataArray = [];
        let white = 0;
        let asian = 0;
        let black = 0;
        let hispanic = 0;
        let native_american = 0;
        let other = 0;
        for (let step = 0; step < 5701; step++) { 
            if (data[step].race == "White") {
                white += 1;
            } 
            else if (data[step].race == 'Black') {
                black += 1;
            }
            else if (data[step].race == 'Asian') {
                asian+=1;
            }
            else if (data[step].race == 'Hispanic') {
                hispanic +=1;
            }
            else if (data[step].race == 'Native American') {
                native_american += 1;
            }
            else other += 1;
        
        }
            racesDataArray.push({"label": "White", "value": white})
            racesDataArray.push({"label": "Black", "value": black})
            racesDataArray.push({"label": "Asian", "value": asian})
            racesDataArray.push({"label": "Hispanic", "value": hispanic})
            racesDataArray.push({"label": "Native American", "value": native_american})
            racesDataArray.push({"label": "Other/Not Specified", "value": other})

        console.log(racesDataArray)       

        xScaleStatic.domain(racesDataArray.map(d => returnRaces(d)))
        yScaleStatic.domain([0, d3.max(racesDataArray.map(d => raceFreq(d)))]) // gives us the percentage each racial group makes up

        console.log(d3.max(racesDataArray.map(d => raceFreq(d))))
        console.log(racesDataArray.map(d => returnRaces(d)))
        console.log(racesDataArray.map(d => raceFreq(d)))

       let staticbars = barSVG.selectAll('rect')
          .data(racesDataArray)
          .enter()
          .append('rect')
          .attr('x', d => xScaleStatic(d.label))
          .attr('y', d => yScaleStatic(d.value))
          .attr('width', xScaleStatic.bandwidth())
          .attr('height', d => height - yScaleStatic(d.value))
          .attr('fill', 'blue')
};

let info = d3.csv('data-police-shootings-master/fatal-police-shootings-data.csv', d3.autoType).then( data => {
    console.log(data);
    makeBars(data);
});