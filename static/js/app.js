// Use the D3 library to read in samples.json from the 
// URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


// Initialise the page with a default plot
function init() {
    // Use D3 to select/control the dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    // Getting the GeoJson Data
    d3.json(url).then(function (data) {
        // console.log data
        console.log("data");
        console.log(data);
        // Creata a variable for the NAMES data (array of IDs) from JSON data
        let names = data.names;
        // Use chaining to append every new element ("option") and set its text and property ("value") to the dropdown menu
        // names contains an array of IDs, loop through avery ID, so the dropdown menu has control over all the IDs.
        for (let i = 0; i < names.length; i++) {
            dropdownMenu
                .append("option")
                .text(names[i])
                .property("value", names[i]);
        };
        // Assign the default ID of the dropdown menu to plots/ table. 
        demographicInfo(names[0]);
        buildingPlot(names[0]);
        GaugeChart(names[0]);

    });

}


// Creat function for Demographic information display
function demographicInfo(ID) {
    // Use D3 to select/control the panel box of sample-metadata
    let panelBox = d3.select("#sample-metadata");
    // Getting the GeoJson Data   
    d3.json(url).then(function (data) {
        // Creata a variable for the METADATA data (array of demographic infos) to retrieve data
        let metadata = data.metadata
        // Filter out the metadata that has the matching ID
        let resultArray = metadata.filter(sampleObj => sampleObj.id == ID);
        // console.log resultArray of metadata slected ID
        console.log("resultArray");
        console.log(resultArray);
        // Get the first index from the array
        let result = resultArray[0];
        // Use ".html("")" to clear any existing metadata
        panelBox.html("");
        // Returns an array of key/values of the enumerable properties of an object
        Object.entries(result).forEach(([key, value]) => {
            // Use chaining to append every new element ("h6") and set its text
            panelBox.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });

    });

}


// Creat function for Plottings and slice the first top 10 OTUs for each ID 
function buildingPlot(ID) {
    // Getting the GeoJson Data
    d3.json(url).then(function (data) {
        // Retrieve all samples data
        let samples = data.samples
        // Filter out the samples data that has the matching ID
        let resultArray = samples.filter(sampleObj => sampleObj.id == ID);
        // console.log resultArray of metadata slected ID
        console.log("resultArray");
        console.log(resultArray);
        // Get the first index from the array
        let result = resultArray[0];
        // Get the otu_ids, lables, and sample values
        let sampleValues = result.sample_values;
        let OTUids = result.otu_ids;
        let OTUlabels = result.otu_labels;


        // Horizontal bar chart
        // Slice the first top 10 OTUs for plotting the bar chat
        let top10Values = sampleValues.slice(0, 10).reverse();
        let top10_ids = OTUids.slice(0, 10).map(id => `OTU ${id}`).reverse();
        let top10Labels = OTUlabels.slice(0, 10).reverse();
        // Set up trace for bar chart
        let barChart_data = {
            x: top10Values,
            y: top10_ids,
            text: top10Labels,
            type: "bar",
            orientation: "h"
        };
        // Data trace array
        let dataBar = [barChart_data];
        // Layout for Bar chat
        let layout1 = {
            title: "Top 10 OTUs Present"
        };
        //Plotting 
        Plotly.newPlot("bar", dataBar, layout1);


        // Bubble chart 
        // Set up trace for bubble chart
        let bubbleData = {
            x: OTUids,
            y: sampleValues,
            text: OTUlabels,
            mode: "markers",
            marker: {
                size: sampleValues,
                color: OTUids,
                colorscale: "Earth"
            }
        };
        // Set up layout
        let bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            margin: { t: 0 },
            hovermode: "closest",
            xaxis: { title: "OTU ID" },
            margin: { t: 30 }
        }
        // Plot Bubble Chart
        Plotly.newPlot("bubble", [bubbleData], bubbleLayout);

    });

};


// Call function to update the chart
function optionChanged(newid) {
    // Call all functions need updates
    demographicInfo(newid);
    buildingPlot(newid);
    GaugeChart(newid)
};


// Call the initilise function

init();

