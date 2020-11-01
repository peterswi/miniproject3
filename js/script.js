//IMPORT statements here

//import pie from './pie'

import StaticBar from './staticbar_erin.js'

d3.csv('data-police-shootings-master/fatal-police-shootings-data.csv', d3.autoType).then( data => {

    console.log(data);
    const uploadData=data
   // const staticPie=pie('.pie')
    const bar=StaticBar('.erin-bar')
    bar.update(uploadData);
});

