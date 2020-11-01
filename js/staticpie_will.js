
function WillPie(container){
    console.log('static pie')
    const margin = ({top: 20, right: 35, bottom: 20, left: 40});
    const width = 500 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
   
   
    var radius = Math.min(width, height) / 2 - margin

    var svg = d3.select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var armScale = d3.scaleOrdinal()
        .range(d3.schemeDark2)

    function update(data){
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
        var pie = d3.pie()
            .value(function(armedDataArray) {return armedDataArray.value; })
            .sort(function(a, b) { console.log(a) ; return d3.ascending(a.key, b.key);} ) // This make sure that group order remains the same in the pie chart
        var data_ready = pie(d3.entries(armedDataArray))

        var u = svg.selectAll("path")
            .data(data_ready)

        u
            .enter()
            .append('path')
            .merge(u)
            .transition()
            .duration(1000)
            .attr('d', d3.arc()
            .innerRadius(0)
            .outerRadius(radius)
            )
            .attr('fill', function(d){ return(color(d.data.key)) })
            .attr("stroke", "white")
            .style("stroke-width", "2px")
            .style("opacity", 1)
        
    // remove the group that is not present anymore
        u
            .exit()
            .remove()

    }
    return{
        update
    }
} 

export default WillPie