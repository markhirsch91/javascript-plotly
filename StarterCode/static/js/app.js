//The Dropdown actions
function grabMetadata(sample) {
    d3.json("samples.json").then((data) => {
        var panel = d3.select("#sample-metadata")
        panel.html("");
        Object.entries(data).forEach(([key,value]) => {
            panel.append("h6").text(`${key}:${value}`);
        })
        
    })
}

//Here we will build the charts and assign the proper data

function buildPlots(sample) {
    d3.json("samples.json").then((data) => {
        // @TODO: Build a Bubble Chart Using the Sample Data
        const otu_ids = data.otu_ids;
        const otu_labels = data.otu_labels;
        const sample_values = data.sample_values;
        // @TODO: Build a Pie Chart
        let bubbleLayout = {
          margin: { t: 0 },
          hovermode: "closests",
          xaxis: { title: "OTU ID"}
        }
        let bubbleData = [
            {
              x: otu_ids,
              y: sample_values,
              text: otu_labels,
              mode: "markers",
              marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
              }
            }
          ]
      
          Plotly.plot("bubble", bubbleData, bubbleLayout);


function init() {
    var subjectSelector = d3.select("#selDataset");
    d3.json("samples.json").then((data) => {
        var sampleNames = data.names;
        sampleNames.forEach((sample) => {
            subjectSelector
                .append("option")
                .text(sample)
                .property("value", sample);
        });
    
const firstSample = sampleNames[0];
buildPlots(firstSample);
grabMetadata(firstSample);
    });
}
function optionChanged(newSample) {
    buildPlots(newSample);
    grabMetadata(newSample);
}




init();







// d3.json("samples.json").then((data) => {
//     const otu_ids = data.otu_ids;
//     const otu_labels = data.otu_labels;
//     let layoutBubbles = {
//         margin: {t:0},
//         hovermode: "closests",
//         xaxis: {
//             title:"OTU ID"
//         }
//     }
//     var trace1 = {
//         x: otu_ids,
//         y: sample_values,
//         text: otu_labels,
//         mode: "markers",
//         marker: {size: sample_values, color: otu_ids, colorscale: "Earth"}
//             }
// bubbleData = [trace1];
// Plotly.plot("bubble", bubbleData, layoutBubbles);
//         }
