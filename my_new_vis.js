looker.plugins.visualizations.add({
  id: "sum_and_trend_viz",
  label: "Sum and Trend Visualization",
  options: {
    color: {
      type: "string",
      label: "Chart Color",
      default: "#5A9BD4",
    },
  },
  create: function (element, config) {
    // Clear existing content
    element.innerHTML = `
      <div id="value-display" style="
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 72px; /* 2x bigger */
        font-weight: bold;
      "></div>
      <canvas id="trend-chart" style="margin-top: 80px;"></canvas>
    `;

    // Load Chart.js if not already loaded
    if (!window.Chart) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/chart.js"; // Load Chart.js library
      script.async = true;
      script.onload = () => {
        console.log("Chart.js loaded successfully.");
      };
      script.onerror = () => {
        console.error("Failed to load Chart.js.");
      };
      document.head.appendChild(script);
    }
  },
  updateAsync: function (data, element, config, queryResponse, details, done) {
    // Wait for Chart.js to load before proceeding
    const waitForChartJs = () => {
      if (!window.Chart) {
        setTimeout(waitForChartJs, 100);
        return;
      }

      // Validate data structure
      if (!queryResponse || !queryResponse.fields.dimensions.length) {
        this.addError({
          title: "No Data",
          message: "This visualization requires data.",
        });
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
      valueDisplay.innerHTML = totalSum.toLocaleString(); // Display only the value

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
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          scales: {
            x: {
              grid: { display: false }, // Remove gridlines for x-axis
              ticks: { display: false }, // Remove x-axis ticks
            },
            y: {
              grid: { display: false }, // Remove gridlines for y-axis
              ticks: { display: false }, // Remove y-axis ticks
            },
          },
        },
      });

      done();
    };

    waitForChartJs();
  },
});
