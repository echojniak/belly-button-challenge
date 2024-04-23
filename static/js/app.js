// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let sampleNames = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let newArray = sampleNames.filter(number => number.id == sample)[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    let selector = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
selector.html("")

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(newArray).forEach(entry => {
      const [key, value] = entry;
      console.log(key, value);
      selector
      .append("h6")
      .text(`${key}: ${value}`)
    });
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let sampleNames = data.samples;

    // Filter the samples for the object with the desired sample number
    let newArray = sampleNames.filter(number => number.id == sample)[0];

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = newArray.otu_ids
    let otu_labels = newArray.otu_labels
    let sample_values = newArray.sample_values
    // Build a Bubble Chart
    var bubble_data = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
      color: otu_ids,
       size: sample_values 
      }
    }];
    
    
    
    var bubble_layout = {
      title: 'Bacteria Cultures Per Sample',
      yaxis: { title: 'Number of Bacteria' },
      xaxis: { title: 'OTU ID' },
      showlegend: false,
      
    };
    
   
    

    // Render the Bubble Chart
    Plotly.newPlot('bubble', bubble_data, bubble_layout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
     // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart

    let yticks = otu_ids.map(id => `OTU ${id}`);

    let bar_data = [
      {
          x: sample_values.slice(0, 10).reverse(), 
          y: yticks.slice(0, 10).reverse(), 
          type: 'bar',
          orientation: 'h'
      }
    ]

    let barLayout = {
      title: " Top 10 Bacteria Cultures Found",
      margin : { t: 30, 1: 150},
      xaxis: { title: 'Number of Bacteria' }
      
    }

    Plotly.newPlot("bar", bar_data, barLayout)

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
 
    let sampleNames = data.names;
            
  

    // Use d3 to select the dropdown with id of `#selDataset`
    let selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    
    // Hint: Inside a loop, you will need to use d3 to append a new
        // option for each sample name.
    sampleNames.forEach((sample) => {
      selector
          .append("option")
          .text(sample)
          .property("value", sample);
  });


    // Get the first sample from the list
let first_sample=sampleNames[0]

    // Build charts and metadata panel with the first sample
    buildMetadata(first_sample) 
    buildCharts(first_sample)
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildMetadata(newSample) 
  buildCharts(newSample)
}

// Initialize the dashboard
init();
