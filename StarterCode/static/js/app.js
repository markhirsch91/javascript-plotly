// Setting up the metadata and area in the HTML to build the table off of
function metadataTable(sampleMetadata) {
    d3.json("samples.json").then((data) => {
        var metaData = data.metadata;
        var arr = metaData.filter(sampleTest => sampleTest.id == sample);
        var output = arr[0]
        var PANEL = d3.select("#sample-metadata");
        PANEL.html("");
        Object.defineProperties(output).forEach(([k,v])=> {
            PANEL.append("h5").text(`${k}: ${v}`);
        })
    })
}

// Loading in the JSON using D3

function tableData(sampleMetadata) {
    d3.json("samples.json").then((data) => {
        var samples= data.samples;
        var dataArray= samples.filter(object => object.id == sample);
        var result= dataArray[0]
        var samplesids = result.otu_ids;
        var sampleslables = result.otu_lables;
        var samplesvalues = result.sample_values;
    });
}

// python -m http.server
// http://localhost:8000/