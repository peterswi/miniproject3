//IMPORT statements here
//import pie from './pie'
import staticBar from './staticbar_erin.js'

d3.csv('data-police-shootings-master/fatal-police-shootings-data.csv', d3.autoType).then( data => {
    
    console.log(data);
    const uploadData=data
   // const staticPie=pie('.pie')
    const staticBar=staticBar('.erin-bar')
    staticBar.makeStaticBar(uploadData);
});

