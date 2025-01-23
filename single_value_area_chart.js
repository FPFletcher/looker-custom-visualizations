// Save this as custom_visualization.js

looker.plugins.visualizations.add({
  id: "custom_bar_chart",
  label: "Custom Bar Chart",
  options: {
    barColor: {
      type: "string",
      label: "Bar Color",
      default: "#1f77b4",
    },
    fontSize: {
      type: "number",
      label: "Font Size",
      default: 12,
    },
  },
  create: function (element, config) {
    element.innerHTML = "<h1>Custom Bar Chart</h1>";
    this.container = element.appendChild(document.createElement("div"));
    this.container.style.margin = "20px";
  },
  updateAsync: function (data, element, config, queryResponse, details, done) {
    // Clear previous chart if any
    this.container.innerHTML = "";

    // Validate that we have the correct data structure
    if (queryResponse.fields.dimensions.length == 0) {
      this.addError({ title: "No Dimensions", message: "This chart requires a dimension." });
      return;
    }

    // Prepare the data for the bar chart
    const labels = data.map(row => row[queryResponse.fields.dimensions[0].name].value);
    const values = data.map(row => row[queryResponse.fields.measures[0].name].value);

    // Create the bar chart using a simple HTML approach
    labels.forEach((label, index) => {
      const bar = document.createElement("div");
      bar.style.width = values[index] + "px";
      bar.style.height = "30px";
      bar.style.backgroundColor = config.barColor;
      bar.style.marginBottom = "10px";
      bar.style.lineHeight = "30px";
      bar.style.color = "#fff";
      bar.style.fontSize = config.fontSize + "px";
      bar.style.padding = "0 10px";
      bar.innerText = label + " (" + values[index] + ")";
      this.container.appendChild(bar);
    });

    done(); // Let Looker know rendering is done
  },
});
