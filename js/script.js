

import StaticBar from './staticbar_erin.js'
import StaticPie from './pie.js'
//import WillPie from './staticpie_will.js'

d3.csv('data-police-shootings-master/fatal-police-shootings-data.csv', d3.autoType).then( data => {

   
    const uploadData=data

    const bar=StaticBar('.erin-bar')
    bar.update(uploadData);

    
    const pie1=StaticPie('.pie')
    pie1.update(uploadData)
    
    bar.on("raceSelected", (race) => {
        pie1.filterByRace(race)
    })
    //const pie2=WillPie('.will-pie')
    //pie2.update(uploadData)

    
});


