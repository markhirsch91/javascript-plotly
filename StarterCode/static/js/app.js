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
            margin: { t: 0},
            hovermode: "closest",
            xaxis: { title: "IDs"},
            margin: { t: 30}
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
        Plotly.newPlot("bubble", dataBubble, layoutBubble);
        
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
            margin: {t: 30, l: 150}
        };
        Plotly.newPlot("bar", dataBar, layoutBar);
    });
}

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

        var firstSample = sample_names[0];
        buildCharts(firstSample);
        buildMetadata(firstSample);
    });
}


function optionChanged(nextSameple) {
    buildCharts(nextSameple);
    buildMetadata(nextSameple)
}

init();