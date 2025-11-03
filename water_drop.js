/**
 * Water Drop Visualization for Looker
 * Combined JavaScript file with embedded HTML and CSS
 * Displays two values in water drop images with a percentage indicator
 */

looker.plugins.visualizations.add({
  id: "water_drop_viz",
  label: "Water Drop Visualization",
  options: {
    // Image settings
    primary_image_url: {
      type: "string",
      label: "Primary Drop Image URL",
      default: "https://png.pngtree.com/png-clipart/20241208/original/pngtree-blue-water-drops-png-image_17736037.png",
      section: "Images"
    },
    secondary_image_url: {
      type: "string",
      label: "Secondary Drop Image URL",
      default: "https://png.pngtree.com/png-clipart/20241208/original/pngtree-blue-water-drops-png-image_17736037.png",
      section: "Images"
    },
    primary_image_opacity: {
      type: "number",
      label: "Primary Drop Opacity",
      default: 1.0,
      display: "range",
      min: 0,
      max: 1,
      step: 0.1,
      section: "Images"
    },
    secondary_image_opacity: {
      type: "number",
      label: "Secondary Drop Opacity",
      default: 0.9,
      display: "range",
      min: 0,
      max: 1,
      step: 0.1,
      section: "Images"
    },

    // Primary drop settings
    primary_label: {
      type: "string",
      label: "Primary Drop Label",
      default: "Send By WTCO",
      section: "Primary Drop"
    },
    primary_text_color: {
      type: "string",
      label: "Primary Text Color",
      default: "#FFFFFF",
      display: "color",
      section: "Primary Drop"
    },
    primary_drop_size: {
      type: "number",
      label: "Primary Drop Size",
      default: 240,
      section: "Primary Drop"
    },

    // Secondary drop settings
    secondary_label: {
      type: "string",
      label: "Secondary Drop Label",
      default: "Distribution Variance",
      section: "Secondary Drop"
    },
    secondary_text_color: {
      type: "string",
      label: "Secondary Text Color",
      default: "#E53935",
      display: "color",
      section: "Secondary Drop"
    },
    secondary_drop_size: {
      type: "number",
      label: "Secondary Drop Size",
      default: 190,
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
    percentage_decimals: {
      type: "number",
      label: "Percentage Decimals",
      default: 1,
      display: "number",
      section: "Percentage"
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
    font_size_primary_value: {
      type: "number",
      label: "Primary Value Font Size",
      default: 52,
      section: "Font Sizes"
    },
    font_size_primary_label: {
      type: "number",
      label: "Primary Label Font Size",
      default: 18,
      section: "Font Sizes"
    },
    font_size_secondary_value: {
      type: "number",
      label: "Secondary Value Font Size",
      default: 44,
      section: "Font Sizes"
    },
    font_size_secondary_label: {
      type: "number",
      label: "Secondary Label Font Size",
      default: 16,
      section: "Font Sizes"
    },
    font_size_percentage: {
      type: "number",
      label: "Percentage Font Size",
      default: 28,
      section: "Font Sizes"
    },

    // Advanced positioning
    primary_x_position: {
      type: "number",
      label: "Primary Drop X Position",
      default: 280,
      section: "Advanced"
    },
    primary_y_position: {
      type: "number",
      label: "Primary Drop Y Position",
      default: 350,
      section: "Advanced"
    },
    secondary_x_position: {
      type: "number",
      label: "Secondary Drop X Position",
      default: 520,
      section: "Advanced"
    },
    secondary_y_position: {
      type: "number",
      label: "Secondary Drop Y Position",
      default: 250,
      section: "Advanced"
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
        text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
      }

      .drop-label {
        font-weight: 400;
        text-anchor: middle;
        dominant-baseline: middle;
        user-select: none;
        text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
      }

      .percentage-indicator {
        font-weight: 700;
        text-anchor: middle;
        dominant-baseline: middle;
        user-select: none;
        text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
      }

      .water-drop-image {
        filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.25));
        transition: all 0.3s ease;
      }

      .water-drop-image:hover {
        filter: drop-shadow(0px 6px 16px rgba(0, 0, 0, 0.35));
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

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: scale(0.95);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      .water-drop-image {
        animation: fadeIn 0.5s ease-out;
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
      done();
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
   * Draw the water drop images and text
   */
  drawWaterDrops: function(primaryValue, secondaryValue, percentage, primaryLabel, secondaryLabel, config) {
    const svg = this._svg;
    const svgNS = "http://www.w3.org/2000/svg";

    // Get configuration values
    const primaryX = config.primary_x_position || 280;
    const primaryY = config.primary_y_position || 350;
    const secondaryX = config.secondary_x_position || 520;
    const secondaryY = config.secondary_y_position || 250;

    const primarySize = config.primary_drop_size || 240;
    const secondarySize = config.secondary_drop_size || 190;

    const primaryImageUrl = config.primary_image_url || "https://png.pngtree.com/png-clipart/20241208/original/pngtree-blue-water-drops-png-image_17736037.png";
    const secondaryImageUrl = config.secondary_image_url || "https://png.pngtree.com/png-clipart/20241208/original/pngtree-blue-water-drops-png-image_17736037.png";

    const primaryOpacity = config.primary_image_opacity !== undefined ? config.primary_image_opacity : 1.0;
    const secondaryOpacity = config.secondary_image_opacity !== undefined ? config.secondary_image_opacity : 0.9;

    // Create defs for filters if needed
    const defs = document.createElementNS(svgNS, 'defs');
    svg.appendChild(defs);

    // PRIMARY DROP IMAGE (larger, bottom-left)
    const primaryImage = document.createElementNS(svgNS, 'image');
    primaryImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', primaryImageUrl);
    primaryImage.setAttribute('x', primaryX - primarySize / 2);
    primaryImage.setAttribute('y', primaryY - primarySize / 2);
    primaryImage.setAttribute('width', primarySize);
    primaryImage.setAttribute('height', primarySize);
    primaryImage.setAttribute('class', 'water-drop-image');
    primaryImage.setAttribute('opacity', primaryOpacity);
    primaryImage.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.appendChild(primaryImage);

    // Primary value text
    const primaryValueText = document.createElementNS(svgNS, 'text');
    primaryValueText.setAttribute('x', primaryX);
    primaryValueText.setAttribute('y', primaryY - 10);
    primaryValueText.setAttribute('class', 'drop-value');
    primaryValueText.setAttribute('fill', config.primary_text_color || '#FFFFFF');
    primaryValueText.setAttribute('font-size', config.font_size_primary_value || '52');
    primaryValueText.textContent = primaryValue;
    svg.appendChild(primaryValueText);

    // Primary label text
    const primaryLabelText = document.createElementNS(svgNS, 'text');
    primaryLabelText.setAttribute('x', primaryX);
    primaryLabelText.setAttribute('y', primaryY + 50);
    primaryLabelText.setAttribute('class', 'drop-label');
    primaryLabelText.setAttribute('fill', config.primary_text_color || '#FFFFFF');
    primaryLabelText.setAttribute('font-size', config.font_size_primary_label || '18');
    primaryLabelText.setAttribute('opacity', '0.95');
    primaryLabelText.textContent = primaryLabel;
    svg.appendChild(primaryLabelText);

    // SECONDARY DROP IMAGE (smaller, top-right)
    const secondaryImage = document.createElementNS(svgNS, 'image');
    secondaryImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', secondaryImageUrl);
    secondaryImage.setAttribute('x', secondaryX - secondarySize / 2);
    secondaryImage.setAttribute('y', secondaryY - secondarySize / 2);
    secondaryImage.setAttribute('width', secondarySize);
    secondaryImage.setAttribute('height', secondarySize);
    secondaryImage.setAttribute('class', 'water-drop-image');
    secondaryImage.setAttribute('opacity', secondaryOpacity);
    secondaryImage.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.appendChild(secondaryImage);

    // Percentage indicator (at top of secondary drop)
    if (config.show_percentage !== false) {
      const percentageText = document.createElementNS(svgNS, 'text');
      percentageText.setAttribute('x', secondaryX);
      percentageText.setAttribute('y', secondaryY - 65);
      percentageText.setAttribute('class', 'percentage-indicator');
      percentageText.setAttribute('fill', config.percentage_color || '#E53935');
      percentageText.setAttribute('font-size', config.font_size_percentage || '28');
      percentageText.textContent = percentage;
      svg.appendChild(percentageText);
    }

    // Secondary value text
    const secondaryValueText = document.createElementNS(svgNS, 'text');
    secondaryValueText.setAttribute('x', secondaryX);
    secondaryValueText.setAttribute('y', secondaryY - 5);
    secondaryValueText.setAttribute('class', 'drop-value');
    secondaryValueText.setAttribute('fill', config.secondary_text_color || '#E53935');
    secondaryValueText.setAttribute('font-size', config.font_size_secondary_value || '44');
    secondaryValueText.textContent = secondaryValue;
    svg.appendChild(secondaryValueText);

    // Secondary label text
    const secondaryLabelText = document.createElementNS(svgNS, 'text');
    secondaryLabelText.setAttribute('x', secondaryX);
    secondaryLabelText.setAttribute('y', secondaryY + 45);
    secondaryLabelText.setAttribute('class', 'drop-label');
    secondaryLabelText.setAttribute('fill', config.secondary_text_color || '#666666');
    secondaryLabelText.setAttribute('font-size', config.font_size_secondary_label || '16');
    secondaryLabelText.setAttribute('opacity', '0.9');
    secondaryLabelText.textContent = secondaryLabel;
    svg.appendChild(secondaryLabelText);
  }
});
