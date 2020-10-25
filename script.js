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

const races = ['W', 'B', 'A', 'N', 'O', 'None'];
let countNum = function(data) {
    let races_object = {}
    let counts = []
    W_count = 0
    B_count = 0
    A_count = 0
    N_count = 0
    O_count = 0
    None_count = 0
    data.properties.forEach( d => {
        if (d.races === 'W') W_count++;
        if (d.races === 'B') B_count++;
        if (d.races === 'A') A_count++;
        if (d.races === 'N') N_count++;
        if (d.races === 'O') O_count++;
        else None_count++;
    });
    counts.push(W_count, B_count, A_count, N_count, O_count, None_count);
    for (i=0; i < races.length; i++) {
        console.log(races[i])
        console.log(counts[i])
        //races_object.races[i] = counts[i]
    }
    return races_object
   /* let races_arr = Object.entries(races)
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
  //  console.log(race_freq)  */
};

let makeBars = function makeStaticBar(data) {
    let data_arr = Object.entries(data)
    console.log(data_arr)
    xScaleStatic.domain(data_arr.map(d => returnRaces(d)))
 //   console.log(data_arr.map(d => returnRaces(d)))
    yScaleStatic.domain(data_arr.map(d => countNum(d)))

    const staticbars = barSVG.append('rect')
        .data(data)
        .enter()
}



let info = d3.csv('data-police-shootings-master/fatal-police-shootings-data.csv', d3.autoType).then( data => {
    console.log(data);
    makeBars(data);
});

