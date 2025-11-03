looker.plugins.visualizations.add({
  id: 'water_drop_single_value',
  label: 'Water Drop Single Value',
  options: {
    minValue: {
      type: 'number',
      label: 'Minimum Value',
      display: 'number',
      default: 0,
      section: 'Scale',
      order: 1
    },
    maxValue: {
      type: 'number',
      label: 'Maximum Value (Required)',
      display: 'number',
      placeholder: 'Enter max value for 100%',
      section: 'Scale',
      order: 2
      // Note: No default, should be set by user or calculated if possible
    },
    waterColor: {
      type: 'string',
      label: 'Water Color',
      display: 'color',
      default: '#3498db', // A nice blue
      section: 'Style',
      order: 1
    },
    dropColor: {
      type: 'string',
      label: 'Drop Background Color',
      display: 'color',
      default: '#e0f2ff', // Lighter background
      section: 'Style',
      order: 2
    },
    textColor: {
      type: 'string',
      label: 'Text Color',
      display: 'color',
      default: '#ffffff', // White text often contrasts well
      section: 'Style',
      order: 3
    },
     textSize: {
      type: 'number',
      label: 'Text Size (px)',
      display: 'number',
      default: 24,
      section: 'Style',
      order: 4
    }
  },

  // Set up the initial state of the visualization
  create: function(element, config) {
    element.innerHTML = `
      <style>
        .water-drop-container {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden; /* Prevent SVG overflow if needed */
        }
        .water-drop-svg {
          width: 90%; /* Adjust as needed */
          height: 90%; /* Adjust as needed */
          max-width: 300px; /* Optional: Prevent becoming too large */
          max-height: 450px; /* Optional: Maintain aspect ratio */
        }
        .water-drop-text {
          font-family: "Arial", sans-serif;
          text-anchor: middle;
          dominant-baseline: middle;
          font-weight: bold;
           pointer-events: none; /* Prevent text from blocking hover effects if any */
        }
      </style>
      <div class="water-drop-container">
        <svg id="water-drop-svg" class="water-drop-svg" viewBox="0 0 100 150" preserveAspectRatio="xMidYMid meet">
          </svg>
      </div>
    `;
    this._svg = element.querySelector('#water-drop-svg');
  },

  // Render the visualization whenever data or configuration changes
  updateAsync: function(data, element, config, queryResponse, details, done) {
    // Clear any previous errors
    this.clearErrors();

    // === Input Validation ===
    if (!queryResponse.fields.measures || queryResponse.fields.measures.length === 0) {
      this.addError({ title: "No Measures", message: "This visualization requires one measure." });
      return done();
    }

    if (queryResponse.fields.measures.length > 1) {
      this.addError({ title: "Too Many Measures", message: "This visualization requires only one measure." });
      // Optionally, you could just use the first measure:
      // console.warn("Warning: Multiple measures found. Using the first one.");
      // return done(); // Or proceed using the first
      return done();
    }

     if (!data || data.length === 0) {
      this.addError({ title: "No Data", message: "Query returned no results." });
      // Display an empty state?
       this._svg.innerHTML = ''; // Clear SVG
      return done();
    }

    const measure = queryResponse.fields.measures[0];
    const firstRow = data[0];
    const cell = firstRow[measure.name];
    const value = LookerCharts.Utils.filterableValueForCell(cell); // Get raw numeric value

    // Check if value is numeric
    if (typeof value !== 'number' || isNaN(value)) {
        this.addError({ title: "Invalid Data Type", message: `Measure '${measure.label_short || measure.name}' must be numeric.` });
        this._svg.innerHTML = ''; // Clear SVG
        return done();
    }

    const formattedValue = LookerCharts.Utils.htmlForCell(cell); // Get formatted string value

    // === Configuration & Calculation ===
    const minValue = config.minValue || 0;
    const maxValue = config.maxValue; // Get user-defined max value

     // Crucial: Check if maxValue is defined and valid
    if (typeof maxValue !== 'number' || isNaN(maxValue)) {
      this.addError({
        title: "Max Value Not Set",
        message: "Please define a 'Maximum Value' in the visualization options."
      });
      this._svg.innerHTML = ''; // Clear SVG
      return done();
    }
     if (maxValue <= minValue) {
       this.addError({
         title: "Invalid Scale",
         message: "'Maximum Value' must be greater than 'Minimum Value'."
       });
       this._svg.innerHTML = ''; // Clear SVG
       return done();
     }


    // Clamp value within min/max for percentage calculation
    const clampedValue = Math.max(minValue, Math.min(value, maxValue));

    // Calculate fill percentage (handle division by zero if max == min, though checked above)
    const percentage = ((clampedValue - minValue) / (maxValue - minValue)) * 100;

    // === SVG Rendering ===
    const waterColor = config.waterColor || '#3498db';
    const dropColor = config.dropColor || '#e0f2ff';
    const textColor = config.textColor || '#ffffff';
    const textSize = config.textSize || 24;

    // Define the water drop path (adjust coordinates as needed for desired shape)
    // M = MoveTo, C = Cubic Bezier Curve, Z = Close Path
    // ViewBox is 0 0 100 150 (Width x Height)
    const dropPathD = "M 50 145 C 10 110 10 60 50 10 C 90 60 90 110 50 145 Z";

    // Calculate the Y coordinate for the top of the water fill
    // The drop visually spans roughly Y=10 to Y=145 (total height 135) in this path/viewBox
    const dropHeight = 135; // Approximate visual height of the drop path
    const fillHeight = dropHeight * (percentage / 100);
    const fillY = 145 - fillHeight; // Y coordinate starts from top (10) + remaining empty space

     // Ensure fillY doesn't go above the top point (Y=10) or below the bottom (Y=145)
    const clampedFillY = Math.max(10, Math.min(fillY, 145));

    // Center text vertically - roughly middle of the drop (adjust Y=80 as needed)
    const textY = 80;

    // Update the SVG content
    this._svg.innerHTML = `
      <defs>
        <clipPath id="dropClipPath">
          <path d="${dropPathD}" />
        </clipPath>
      </defs>

      <path d="${dropPathD}" fill="${dropColor}" stroke="${waterColor}" stroke-width="1" />

      <rect x="0" y="${clampedFillY}" width="100" height="${150 - clampedFillY}" fill="${waterColor}" clip-path="url(#dropClipPath)" />

      <text class="water-drop-text" x="50" y="${textY}" fill="${textColor}" font-size="${textSize}px">
        ${formattedValue}
      </text>
    `;

    // Signal Looker that rendering is complete
    done();
  }
});
