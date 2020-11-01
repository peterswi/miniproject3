
function StaticPie(container){
    
    
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


    // const pieSVG = d3.select('.pie')
    //     .append('svg')
    //     .attr('width', width + margin.left + margin.right)
    //     .attr('height', height + margin.top + margin.bottom)
    //     .append("g")
    //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    

    function update(data) {
        let returnRaces = function(data) {
            return data.race;
        }
        var armedDataArray = [];
        var gunCount = 0;
        var unarmedCount = 0;
        var toyCount=0;
        var knifeCount=0;
        var otherCount=0;

        for (let step = 0; step < 5701; step++) { 
            if (data[step].armed == "gun") {
                gunCount += 1;
            } else if(data[step].armed=="knife") {
                knifeCount += 1;
            } else if (data[step].armed_type=="Toy"){
                toyCount+= 1;
            } else if (data[step].armed=="unarmed"){
                unarmedCount+=1;
            }else{
                otherCount+=1;
            }
        };
        armedDataArray.push({"label": "gun", "value": gunCount})
        armedDataArray.push({"label": "unarmed", "value": unarmedCount})
        armedDataArray.push({"label": "toy weapon", "value": toyCount})
        armedDataArray.push({"label": "knife", "value": knifeCount})
        armedDataArray.push({"label": "other weapon", "value": otherCount})
        console.log(armedDataArray)

        const size = 500;
        const fourth = size / 4;
        const half = size / 2;
        const labelOffset = fourth * 1.4;
        const total = armedDataArray.reduce((acc, cur) => acc + cur.value, 0);


        var pieChart = d3.select(container).append('svg')
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

    return{
        update
    }
}

export default StaticPie