
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
        armedDataArray.push({"label": "toy", "value": toyCount})
        armedDataArray.push({"label": "knife", "value": knifeCount})
        armedDataArray.push({"label": "other", "value": otherCount})
        console.log(armedDataArray)
        var pie = d3.pie()
            .value(function(armedDataArray) {return armedDataArray.value; })
            .sort(function(a, b) {return d3.ascending(a.key, b.key);} ) // This make sure that group order remains the same in the pie chart
        var data_ready = pie(armedDataArray)
        armScale.domain(armedDataArray.map(d => d.label))

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
            .attr('fill', function(armedDataArray){ return(armScale(armedDataArray.label)) })
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