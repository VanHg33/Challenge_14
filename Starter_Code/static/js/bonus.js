// BONUS: Create Gauge Chart 
// Create a function for Gauge Chart
function GaugeChart(ID) {
    // Getting the GeoJson Data
    d3.json(url).then(function (data) {
        // Retrieve all samples data
        let metadata = data.metadata
        // Filter out the samples data that has the matching ID
        let resultArray = metadata.filter(sampleObj => sampleObj.id == ID);
        // Get the first index from the array
        let result = resultArray[0];
        // Get the otu_ids, lables, and sample values
        let washFrequency = result.wfreq;

        // Set up trace for gauge chart
        let gaugeChart_data = {
            value: washFrequency,
            domain: { x: [0, 1], y: [0, 1] },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [0, 9], tickmode: "linear" },
                steps: [
                    { range: [0, 1], color: 'rgb(248,243,236)' },
                    { range: [1, 2], color: 'rgb(244,241,228)' },
                    { range: [2, 3], color: 'rgb(233,230,201)' },
                    { range: [3, 4], color: 'rgb(229,232,176)' },
                    { range: [4, 5], color: 'rgb(213,229,153)' },
                    { range: [5, 6], color: 'rgb(183,205,143)' },
                    { range: [6, 7], color: 'rgb(138,192,134)' },
                    { range: [7, 8], color: 'rgb(137,188,141)' },
                    { range: [8, 9], color: 'rgb(132,181,137)' },
                ]
            },

            };


            let guageLayout = {
                title: "<b>Belly Button Washing Frequency</b> <br>Scrubs Per Week</br>",
                width: 500,
                height: 400
            };

            //Plotting 
            Plotly.newPlot("gauge", [gaugeChart_data], guageLayout);

        });
};
