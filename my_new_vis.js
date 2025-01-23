looker.plugins.visualizations.add({
  id: "sum_and_trend_viz",
  label: "Sum and Trend Visualization",
  options: {
    color: {
      type: "string",
      label: "Chart Color",
      default: "#5A9BD4"
    }
  },
  create: function (element, config) {
    // Clear existing content
    element.innerHTML = `
      <div id="value-display" style="font-size: 36px; font-weight: bold; margin-bottom: 10px;"></div>
      <canvas id="trend-chart"></canvas>
    `;
  },
  updateAsync: function (data, element, config, queryResponse, details, done) {
    // Validate data structure
    if (!queryResponse || !queryResponse.fields.dimensions.length) {
      this.addError({ title: "No Data", message: "This visualization requires data." });
      return;
    }

    // Extract dimension and measure
    const dimension = queryResponse.fields.dimensions[0].name;
    const measure = queryResponse.fields.measures[0].name;

    // Prepare data for chart and sum calculation
    const labels = [];
    const values = [];
    let totalSum = 0;

    data.forEach((row) => {
      const label = row[dimension]?.value || "Unknown";
      const value = row[measure]?.value || 0;
      labels.push(label);
      values.push(value);
      totalSum += value; // Sum the measure values
    });

    // Display the total value
    const valueDisplay = document.getElementById("value-display");
    valueDisplay.innerHTML = `Total: ${totalSum.toLocaleString()}`;

    // Render the area chart
    const ctx = document.getElementById("trend-chart").getContext("2d");
    if (this.chart) {
      this.chart.destroy(); // Clear existing chart
    }
    this.chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Trend",
            data: values,
            backgroundColor: config.color + "33", // Transparent color for the area
            borderColor: config.color,
            borderWidth: 2,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { title: { display: true, text: "Month" } },
          y: { title: { display: true, text: "Orders Count" } }
        }
      }
    });

    done();
  }
});
