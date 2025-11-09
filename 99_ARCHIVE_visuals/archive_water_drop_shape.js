/**
 * Water Drop Visualization for Looker
 * Combined JavaScript file with embedded HTML and CSS
 * Displays two values in water drop shapes with a percentage indicator
 */

looker.plugins.visualizations.add({
  id: "water_drop_viz",
  label: "Water Drop Visualization",
  options: {
    // Primary drop settings
    primary_label: {
      type: "string",
      label: "Primary Drop Label",
      default: "Send By WTCO",
      section: "Primary Drop"
    },
    primary_color: {
      type: "string",
      label: "Primary Drop Color",
      default: "#4DD0E1",
      display: "color",
      section: "Primary Drop"
    },
    primary_text_color: {
      type: "string",
      label: "Primary Text Color",
      default: "#FFFFFF",
      display: "color",
      section: "Primary Drop"
    },

    // Secondary drop settings
    secondary_label: {
      type: "string",
      label: "Secondary Drop Label",
      default: "Distribution Variance",
      section: "Secondary Drop"
    },
    secondary_color: {
      type: "string",
      label: "Secondary Drop Color",
      default: "#B3E5FC",
      display: "color",
      section: "Secondary Drop"
    },
    secondary_text_color: {
      type: "string",
      label: "Secondary Text Color",
      default: "#E53935",
      display: "color",
      section: "Secondary Drop"
    },

    // Percentage settings
    show_percentage: {
      type: "boolean",
      label: "Show Percentage",
      default: true,
      section: "Percentage"
    },
    percentage_color: {
      type: "string",
      label: "Percentage Color",
      default: "#E53935",
      display: "color",
      section: "Percentage"
    },

    // Format settings
    value_format: {
      type: "string",
      label: "Value Format",
      default: "0.00a",
      placeholder: "0.00a",
      section: "Format"
    },
    percentage_decimals: {
      type: "number",
      label: "Percentage Decimals",
      default: 1,
      display: "number",
      section: "Format"
    },

    // Background
    background_color: {
      type: "string",
      label: "Background Color",
      default: "#5C6BC0",
      display: "color",
      section: "Style"
    },

    // Font settings
    font_size_primary: {
      type: "number",
      label: "Primary Value Font Size",
      default: 52,
      section: "Style"
    },
    font_size_secondary: {
      type: "number",
      label: "Secondary Value Font Size",
      default: 44,
      section: "Style"
    },
    font_size_percentage: {
      type: "number",
      label: "Percentage Font Size",
      default: 28,
      section: "Style"
    }
  },

  /**
   * Create the visualization container with embedded styles
   */
  create: function(element, config) {
    // Inject CSS styles
    const style = document.createElement('style');
    style.innerHTML = `
      .water-drop-container {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Open Sans', 'Noto Sans JP', 'Noto Sans', 'Noto Sans CJK KR', Helvetica, Arial, sans-serif;
        position: relative;
        overflow: hidden;
      }

      .water-drop-svg {
        width: 100%;
        height: 100%;
        max-width: 800px;
        max-height: 600px;
      }

      .drop-value {
        font-weight: 700;
        text-anchor: middle;
        dominant-baseline: middle;
        user-select: none;
      }

      .drop-label {
        font-weight: 400;
        text-anchor: middle;
        dominant-baseline: middle;
        user-select: none;
      }

      .percentage-indicator {
        font-weight: 700;
        text-anchor: middle;
        dominant-baseline: middle;
        user-select: none;
      }

      .water-drop {
        filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.2));
        transition: all 0.3s ease;
      }

      .water-drop:hover {
        filter: drop-shadow(0px 6px 12px rgba(0, 0, 0, 0.3));
      }

      .error-message {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        color: #666;
        font-size: 14px;
        font-family: 'Open Sans', Arial, sans-serif;
      }
    `;

    // Append style to document head
    if (!document.getElementById('water-drop-viz-styles')) {
      style.id = 'water-drop-viz-styles';
      document.head.appendChild(style);
    }

    // Create HTML structure
    element.innerHTML = `
      <div class="water-drop-container" id="water-drop-container-${Date.now()}">
        <svg class="water-drop-svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
        </svg>
      </div>
    `;

    // Store references
    this._container = element.querySelector('.water-drop-container');
    this._svg = element.querySelector('.water-drop-svg');
  },

  /**
   * Update the visualization with new data
   */
  updateAsync: function(data, element, config, queryResponse, details, done) {
    // Clear any errors
    this.clearErrors();

    if (!this._svg || !this._container) {
      this.addError({title: "Initialization Error", message: "Visualization not properly initialized"});
      return;
    }

    // Clear previous content
    this._svg.innerHTML = '';

    // Set background color
    this._container.style.backgroundColor = config.background_color || '#5C6BC0';

    // Validate data
    if (!queryResponse || !data || data.length === 0) {
      this.showError('No data available');
      done();
      return;
    }

    // Get measures from query
    const measures = queryResponse.fields.measure_like;
    if (measures.length < 2) {
      this.showError('At least 2 measures required (Primary Value, Secondary Value, Optional: Percentage)');
      done();
      return;
    }

    // Extract values
    const row = data[0];
    const primaryField = measures[0].name;
    const secondaryField = measures[1].name;
    const percentageField = measures.length > 2 ? measures[2].name : null;

    let primaryValue = row[primaryField].value;
    let secondaryValue = row[secondaryField].value;
    let percentageValue;

    // Calculate or get percentage
    if (percentageField) {
      percentageValue = row[percentageField].value;
    } else {
      // Auto-calculate percentage from the two values
      percentageValue = primaryValue !== 0 ? (secondaryValue / primaryValue) : 0;
    }

    // Format values
    const primaryFormatted = this.formatValue(primaryValue);
    const secondaryFormatted = this.formatValue(secondaryValue);
    const percentageFormatted = this.formatPercentage(percentageValue, config.percentage_decimals || 1);

    // Get labels
    const primaryLabel = config.primary_label || measures[0].label_short || measures[0].label || "Primary Value";
    const secondaryLabel = config.secondary_label || measures[1].label_short || measures[1].label || "Secondary Value";

    // Draw visualization
    this.drawWaterDrops(
      primaryFormatted,
      secondaryFormatted,
      percentageFormatted,
      primaryLabel,
      secondaryLabel,
      config
    );

    done();
  },

  /**
   * Show error message in the visualization
   */
  showError: function(message) {
    this._svg.innerHTML = `
      <g>
        <text x="400" y="280" text-anchor="middle" fill="#666" font-size="16" font-family="Arial, sans-serif">
          ${message}
        </text>
        <text x="400" y="310" text-anchor="middle" fill="#999" font-size="12" font-family="Arial, sans-serif">
          Please check your query configuration
        </text>
      </g>
    `;
  },

  /**
   * Format numeric values with M/K suffixes
   */
  formatValue: function(value) {
    const absValue = Math.abs(value);
    const sign = value < 0 ? '-' : '';

    if (absValue >= 1000000) {
      return sign + (absValue / 1000000).toFixed(2) + 'M';
    } else if (absValue >= 1000) {
      return sign + (absValue / 1000).toFixed(2) + 'K';
    }
    return sign + absValue.toFixed(2);
  },

  /**
   * Format percentage values
   */
  formatPercentage: function(value, decimals) {
    const percentage = value * 100;
    const sign = percentage > 0 ? '+' : '';
    return sign + percentage.toFixed(decimals) + '%';
  },

  /**
   * Draw the water drop shapes and text
   */
  drawWaterDrops: function(primaryValue, secondaryValue, percentage, primaryLabel, secondaryLabel, config) {
    const svg = this._svg;
    const svgNS = "http://www.w3.org/2000/svg";

    // Create gradient definitions
    const defs = document.createElementNS(svgNS, 'defs');

    // Primary drop gradient
    const primaryGradient = document.createElementNS(svgNS, 'linearGradient');
    primaryGradient.setAttribute('id', 'primaryGradient');
    primaryGradient.setAttribute('x1', '0%');
    primaryGradient.setAttribute('y1', '0%');
    primaryGradient.setAttribute('x2', '0%');
    primaryGradient.setAttribute('y2', '100%');

    const primaryStop1 = document.createElementNS(svgNS, 'stop');
    primaryStop1.setAttribute('offset', '0%');
    primaryStop1.setAttribute('stop-color', this.lightenColor(config.primary_color || '#4DD0E1', 20));
    primaryStop1.setAttribute('stop-opacity', '0.95');

    const primaryStop2 = document.createElementNS(svgNS, 'stop');
    primaryStop2.setAttribute('offset', '100%');
    primaryStop2.setAttribute('stop-color', config.primary_color || '#4DD0E1');
    primaryStop2.setAttribute('stop-opacity', '1');

    primaryGradient.appendChild(primaryStop1);
    primaryGradient.appendChild(primaryStop2);
    defs.appendChild(primaryGradient);

    // Secondary drop gradient
    const secondaryGradient = document.createElementNS(svgNS, 'linearGradient');
    secondaryGradient.setAttribute('id', 'secondaryGradient');
    secondaryGradient.setAttribute('x1', '0%');
    secondaryGradient.setAttribute('y1', '0%');
    secondaryGradient.setAttribute('x2', '0%');
    secondaryGradient.setAttribute('y2', '100%');

    const secondaryStop1 = document.createElementNS(svgNS, 'stop');
    secondaryStop1.setAttribute('offset', '0%');
    secondaryStop1.setAttribute('stop-color', '#FFFFFF');
    secondaryStop1.setAttribute('stop-opacity', '0.9');

    const secondaryStop2 = document.createElementNS(svgNS, 'stop');
    secondaryStop2.setAttribute('offset', '50%');
    secondaryStop2.setAttribute('stop-color', this.lightenColor(config.secondary_color || '#B3E5FC', 10));
    secondaryStop2.setAttribute('stop-opacity', '0.85');

    const secondaryStop3 = document.createElementNS(svgNS, 'stop');
    secondaryStop3.setAttribute('offset', '100%');
    secondaryStop3.setAttribute('stop-color', config.secondary_color || '#B3E5FC');
    secondaryStop3.setAttribute('stop-opacity', '0.8');

    secondaryGradient.appendChild(secondaryStop1);
    secondaryGradient.appendChild(secondaryStop2);
    secondaryGradient.appendChild(secondaryStop3);
    defs.appendChild(secondaryGradient);

    svg.appendChild(defs);

    // Primary water drop (left/bottom) - larger drop
    const primaryDrop = this.createWaterDrop(280, 350, 180, 'primaryGradient');
    svg.appendChild(primaryDrop);

    // Primary value text
    const primaryValueText = document.createElementNS(svgNS, 'text');
    primaryValueText.setAttribute('x', '280');
    primaryValueText.setAttribute('y', '330');
    primaryValueText.setAttribute('class', 'drop-value');
    primaryValueText.setAttribute('fill', config.primary_text_color || '#FFFFFF');
    primaryValueText.setAttribute('font-size', config.font_size_primary || '52');
    primaryValueText.textContent = primaryValue;
    svg.appendChild(primaryValueText);

    // Primary label text
    const primaryLabelText = document.createElementNS(svgNS, 'text');
    primaryLabelText.setAttribute('x', '280');
    primaryLabelText.setAttribute('y', '390');
    primaryLabelText.setAttribute('class', 'drop-label');
    primaryLabelText.setAttribute('fill', config.primary_text_color || '#FFFFFF');
    primaryLabelText.setAttribute('font-size', '18');
    primaryLabelText.setAttribute('opacity', '0.9');
    primaryLabelText.textContent = primaryLabel;
    svg.appendChild(primaryLabelText);

    // Secondary water drop (right/top) - smaller drop
    const secondaryDrop = this.createWaterDrop(520, 250, 140, 'secondaryGradient');
    svg.appendChild(secondaryDrop);

    // Percentage indicator (at top of secondary drop)
    if (config.show_percentage !== false) {
      const percentageText = document.createElementNS(svgNS, 'text');
      percentageText.setAttribute('x', '520');
      percentageText.setAttribute('y', '175');
      percentageText.setAttribute('class', 'percentage-indicator');
      percentageText.setAttribute('fill', config.percentage_color || '#E53935');
      percentageText.setAttribute('font-size', config.font_size_percentage || '28');
      percentageText.textContent = percentage;
      svg.appendChild(percentageText);
    }

    // Secondary value text
    const secondaryValueText = document.createElementNS(svgNS, 'text');
    secondaryValueText.setAttribute('x', '520');
    secondaryValueText.setAttribute('y', '235');
    secondaryValueText.setAttribute('class', 'drop-value');
    secondaryValueText.setAttribute('fill', config.secondary_text_color || '#E53935');
    secondaryValueText.setAttribute('font-size', config.font_size_secondary || '44');
    secondaryValueText.textContent = secondaryValue;
    svg.appendChild(secondaryValueText);

    // Secondary label text
    const secondaryLabelText = document.createElementNS(svgNS, 'text');
    secondaryLabelText.setAttribute('x', '520');
    secondaryLabelText.setAttribute('y', '285');
    secondaryLabelText.setAttribute('class', 'drop-label');
    secondaryLabelText.setAttribute('fill', config.secondary_text_color || '#666666');
    secondaryLabelText.setAttribute('font-size', '16');
    secondaryLabelText.setAttribute('opacity', '0.85');
    secondaryLabelText.textContent = secondaryLabel;
    svg.appendChild(secondaryLabelText);
  },

  /**
   * Create a water drop SVG path
   */
  createWaterDrop: function(cx, cy, size, gradientId) {
    const svgNS = "http://www.w3.org/2000/svg";
    const path = document.createElementNS(svgNS, 'path');

    // Water drop shape using bezier curves
    const width = size;
    const height = size * 1.3;

    const x = cx - width / 2;
    const y = cy - height / 2;

    // Create smooth water drop shape
    const d = `
      M ${cx} ${y}
      C ${x + width * 0.15} ${y + height * 0.15},
        ${x - width * 0.05} ${y + height * 0.45},
        ${x} ${y + height * 0.68}
      C ${x} ${y + height * 0.92},
        ${x + width * 0.25} ${y + height * 1.02},
        ${cx} ${y + height}
      C ${x + width * 0.75} ${y + height * 1.02},
        ${x + width} ${y + height * 0.92},
        ${x + width} ${y + height * 0.68}
      C ${x + width * 1.05} ${y + height * 0.45},
        ${x + width * 0.85} ${y + height * 0.15},
        ${cx} ${y}
      Z
    `;

    path.setAttribute('d', d);
    path.setAttribute('fill', `url(#${gradientId})`);
    path.setAttribute('class', 'water-drop');

    return path;
  },

  /**
   * Lighten a color by a percentage
   */
  lightenColor: function(color, percent) {
    // Handle undefined or invalid colors
    if (!color || typeof color !== 'string') {
      return '#CCCCCC';
    }

    // Remove # if present
    color = color.replace("#", "");

    // Convert to RGB
    const num = parseInt(color, 16);
    const amt = Math.round(2.55 * percent);

    const R = Math.min(255, Math.max(0, (num >> 16) + amt));
    const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amt));
    const B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));

    return "#" + (0x1000000 + (R * 0x10000) + (G * 0x100) + B).toString(16).slice(1).toUpperCase();
  }
});
