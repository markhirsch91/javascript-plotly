//Function to build the metadata on the page
function buildMetadata (sample) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var idArray = metadata.filter(sampleObject => sampleObject.id == sample);
        var resultIDs = idArray[0];
        var panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(resultIDs).forEach(([key, value]) => {
            panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    })
}

//Function to build the bubble and bar charts
function buildCharts(sample) {
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var idArray = samples.filter(sampleObject => sampleObject.id == sample);
        var resultIDs = idArray[0];

        var otu_ids = resultIDs.otu_ids;
        var otu_labels = resultIDs.otu_labels;
        var sample_values = resultIDs.sample_values;

        //Bubble Chart Setup
        var layoutBubble = {
            title: "BUBBLE CHART",
            margin: { t: 20},
            hovermode: "closest",
            xaxis: { title: "OTU ID"},
            margin: { t: 50}
        };
        var dataBubble = [
            {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: "markers",
                marker: {
                    size: sample_values,
                    color: otu_ids,
                    colorscale: "Electric"
                }
            }
        ];
        Plotly.newPlot("bubble", dataBubble, layoutBubble); //Creating the Bubble chart
        
        // Bar Chart Setup
        var ticksY = otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();
        var dataBar = [
            {
                y: ticksY,
                x: sample_values.slice(0,10).reverse(),
                text: otu_labels.slice(0,10).reverse(),
                type: "bar",
                orientation: "h"
            }
        ];
        var layoutBar = {
            title: "BAR CHART",
            margin: {t: 40, l: 100}
        };
        Plotly.newPlot("bar", dataBar, layoutBar); //Creating the Bar chart


        // // Gauge Chart Setup
        // var dataGauge = [
        //     {
        //         domain: { x: [0,1], y: [0,1] },
        //         value: 270,
        //         title: { text: "GAUGE CHART"},
        //         type: "indicator",
        //         mode: "gauge+number"
        //     }
        // ];
        // var layoutGauge = {
        //     width: 600,
        //     height: 500,
        //     margin: { t: 0, b: 0 }
        // };
        // Plotly.newPlot("gauge", dataGauge, layoutGauge);


    });
}


//Initialize the data within the dropbown
function init() {
    var dropdownSelector = d3.select("#selDataset");
    
    d3.json("samples.json").then((data) => {
        var sample_names = data.names;
        
        sample_names.forEach((sample) => {
            dropdownSelector
                .append("option")
                .text(sample)
                .property("value", sample);
        });

        var originalSample = sample_names[0];
        buildCharts(originalSample);
        buildMetadata(originalSample);
    });
}


function optionChanged(nextSameple) {
    buildCharts(nextSameple);
    buildMetadata(nextSameple)
}

init();