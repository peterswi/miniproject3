
function StaticBar(container){

    const listeners = {raceSelected: null}
    let currentSelection = null

    const margin = ({top: 20, right: 35, bottom: 20, left: 40});
    const width = 500 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const barSVG = d3.select(container)
        .append('svg')
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
    
    const raceScale = d3.scaleOrdinal()
        .range(d3.schemeAccent);

    const xAxisStatic = d3.axisBottom()
        .scale(xScaleStatic)

    const yAxisStatic = d3.axisLeft()
        .scale(yScaleStatic)
        .ticks(10)

    barSVG.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxisStatic)

    barSVG.append("g")
        .attr("class", "axis y-axis")
        .call(yAxisStatic)
    
    barSVG.append('text')
        .attr('class','graphTitle')
        .attr('x',250)
        .attr('y',10)
        .style('text-anchor','middle')
        .text("Victims of Shootings by Race")
        .attr('font-size',24)
    
    function raceSelected(event,data){
        if (currentSelection != data.label){
            console.log(data.label)
            currentSelection = data.label
            listeners['raceSelected'](data.label)
        }
        else{
            console.log('null')
            currentSelection = null;
            listeners['raceSelected'](null)
        }
        
    }
    

    function update(data) {

        let returnRaces = function(data) {
            return data.label
        }
        console.log(data)
        
        var racesDataArray = [];

        let white = 0;
        let wProp
        let asian = 0;
        let aProp
        let black = 0;
        let bProp
        let hispanic = 0;
        let hProp
        let native_american = 0;
        let nProp
        let other = 0;
        for (let step = 0; step < 5701; step++) { 
            if (data[step].race == "White") {
                white += 1;
                wProp=data[step].race_pop_proportion
            } 
            else if (data[step].race == 'Black') {
                black += 1;
                bProp=data[step].race_pop_proportion
            }
            else if (data[step].race == 'Asian') {
                asian+=1;
                aProp=data[step].race_pop_proportion
            }
            else if (data[step].race == 'Hispanic') {
                hispanic +=1;
                hProp=data[step].race_pop_proportion
                
            }
            else if (data[step].race == 'Native American') {
                native_american += 1;
                nProp=data[step].race_pop_proportion
            }
            else other += 1;

        
        }
            racesDataArray.push({"label": "White", "value": Math.round((white/5701) * 100, 4),"proportion": Math.round((wProp*100),4)})
            racesDataArray.push({"label": "Black", "value": Math.round((black/5701)*100),"proportion": Math.round((bProp*100),4)})
            racesDataArray.push({"label": "Hispanic", "value": Math.round((hispanic/5701)*100),"proportion": Math.round((hProp*100),4)})
            racesDataArray.push({"label": "Asian", "value": Math.round((asian/5701)*100),"proportion": Math.round((aProp*100),4)})
            racesDataArray.push({"label": "Native American", "value": Math.round((native_american/5701)*100),"proportion": Math.round((nProp*100),4)})
            racesDataArray.push({"label": "Other", "value": Math.round((other/5701)*100),"proportion":'N/a '})

     /*
        racesDataArray.sort(function(a, b) {
            let raceA = a.value
            let raceB = b.value
            if (raceA < raceB) return 1;
            if (raceA > raceB) return -1;
            return 0;
        })
*/
        raceScale.domain(racesDataArray.map(d => returnRaces(d)))
        xScaleStatic.domain(racesDataArray.map(d => returnRaces(d)))
        yScaleStatic.domain([0, d3.max(racesDataArray, function(d) {
            return d.value
        })])
    

    let staticbars = barSVG.selectAll('rect')
        .data(racesDataArray)
        .enter()
        .append('rect')
        // .on("click", (event,d)=>onclick(event,d))
        .on("click", raceSelected)
        .attr('x', racesDataArray => xScaleStatic(racesDataArray.label))
        .attr('y', racesDataArray => yScaleStatic(racesDataArray.value))
        .attr('width', xScaleStatic.bandwidth())
        .attr('height', racesDataArray => height - yScaleStatic(racesDataArray.value))
        .attr('fill', racesDataArray => raceScale(racesDataArray.label));
        

        let tip = d3.selectAll('rect')
        .on("mouseleave", (event, d) => {
            // hide tooltip
            d3.select('#erin-tooltip')
                .style('display', 'none');
            
           //set listener to null
           
        })
        .on('mouseenter', (event, d) => {
            let racial_group = d;
            
            //setting listener to the mouseenter group
          
            
            const pos = d3.pointer(event, window);
            
            d3.select('#erin-tooltip')
                .style('display', 'inline-block')
                .style('position', 'fixed')
                .style('left', pos[0]-5+'px')
                .style('top', pos[1]+5+'px')
                .html(d.label + '<br>' + d.value + '% of Victims'+'<br>'+d.proportion +'% of US Population') 
            })

            let xAxisGroup = barSVG.append("g").attr("class", "x-axis axis");

            let yAxisGroup = barSVG.append("g").attr("class", "y-axis axis");
            
            xAxisGroup = barSVG
            .select(".x-axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxisStatic);
    
            yAxisGroup = barSVG.select(".y-axis").call(yAxisStatic);
    
            barSVG.select("text.axis-title").remove();
            barSVG
            .append("text")
            .attr("class", "axis-title")
            .attr("transform", "rotate(-90)")
            .attr("x", -200)
            .attr("y", -25)
            .attr("dy", ".1em")
            .text("Percentage of Total Victims");
    
            let labels = barSVG.selectAll('text')
                .data(racesDataArray)
                .enter()
                .attr('text-anchor', 'middle')
                .attr('class', 'x-axis-label')
                .text("hello")
    
            labels.select('x-axis-label')
                .attr('x', width)
                .attr('y', height)
                .text(racesDataArray => `${racesDataArray.label}`)
    
        

           
        };

    function on(event, listener) {
        listeners[event] = listener;
    }

    return{
        update,
        on
    };
} 
export default StaticBar