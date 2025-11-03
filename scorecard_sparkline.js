/**
 * Scorecard with Sparkline Visualization for Looker
 * Combined JavaScript file with embedded HTML and CSS
 * Displays a single value with a sparkline trend chart
 */

looker.plugins.visualizations.add({
  id: "scorecard_sparkline_viz",
  label: "Scorecard with Sparkline",
  options: {
    // ========== CONTENT SECTION ==========
    title_text: {
      type: "string",
      label: "Title",
      default: "Metric Title",
      section: "Content"
    },
    show_title: {
      type: "boolean",
      label: "Show Title",
      default: true,
      section: "Content"
    },
    value_prefix: {
      type: "string",
      label: "Value Prefix",
      placeholder: "$",
      section: "Content"
    },
    value_suffix: {
      type: "string",
      label: "Value Suffix",
      placeholder: "",
      section: "Content"
    },
    value_format: {
      type: "string",
      label: "Value Format",
      display: "select",
      values: [
        {"Auto": "auto"},
        {"Number (1,234.56)": "number"},
        {"Compact (1.23M)": "compact"},
        {"Percentage (12.34%)": "percentage"},
        {"Currency ($1,234.56)": "currency"}
      ],
      default: "auto",
      section: "Content"
    },
    decimal_places: {
      type: "number",
      label: "Decimal Places",
      default: 2,
      section: "Content"
    },

    // ========== SPARKLINE SECTION ==========
    show_sparkline: {
      type: "boolean",
      label: "Show Sparkline",
      default: true,
      section: "Sparkline"
    },
    sparkline_color: {
      type: "string",
      label: "Sparkline Color",
      default: "#1A73E8",
      display: "color",
      section: "Sparkline"
    },
    sparkline_fill: {
      type: "boolean",
      label: "Fill Under Sparkline",
      default: true,
      section: "Sparkline"
    },
    sparkline_fill_opacity: {
      type: "number",
      label: "Fill Opacity",
      default: 0.2,
      display: "range",
      min: 0,
      max: 1,
      step: 0.1,
      section: "Sparkline"
    },
    sparkline_line_width: {
      type: "number",
      label: "Line Width",
      default: 2,
      section: "Sparkline"
    },
    sparkline_height: {
      type: "number",
      label: "Sparkline Height (%)",
      default: 40,
      section: "Sparkline"
    },
    show_sparkline_points: {
      type: "boolean",
      label: "Show Data Points",
      default: false,
      section: "Sparkline"
    },

    // ========== STYLE SECTION ==========
    background_color: {
      type: "string",
      label: "Background Color",
      default: "#FFFFFF",
      display: "color",
      section: "Style"
    },
    title_color: {
      type: "string",
      label: "Title Color",
      default: "#5F6368",
      display: "color",
      section: "Style"
    },
    value_color: {
      type: "string",
      label: "Value Color",
      default: "#202124",
      display: "color",
      section: "Style"
    },
    border_enabled: {
      type: "boolean",
      label: "Show Border",
      default: false,
      section: "Style"
    },
    border_color: {
      type: "string",
      label: "Border Color",
      default: "#DADCE0",
      display: "color",
      section: "Style"
    },
    border_radius: {
      type: "number",
      label: "Border Radius (px)",
      default: 8,
      section: "Style"
    },

    // ========== FONT SECTION ==========
    title_font_size: {
      type: "number",
      label: "Title Font Size",
      default: 14,
      section: "Font"
    },
    value_font_size: {
      type: "number",
      label: "Value Font Size",
      default: 48,
      section: "Font"
    },
    font_family: {
      type: "string",
      label: "Font Family",
      default: "Roboto, Arial, sans-serif",
      section: "Font"
    }
  },

  /**
   * Create the visualization container with embedded styles
   */
  create: function(element, config) {
    // Inject CSS styles
    const style = document.createElement('style');
    style.innerHTML = `
      .scorecard-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 24px;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
      }

      .scorecard-title {
        font-weight: 500;
        margin: 0 0 12px 0;
        letter-spacing: 0.1px;
      }

      .scorecard-value {
        font-weight: 400;
        margin: 0 0 16px 0;
        line-height: 1.2;
      }

      .scorecard-sparkline-container {
        flex: 1;
        min-height: 0;
        position: relative;
        margin-top: auto;
      }

      .scorecard-sparkline-svg {
        width: 100%;
        height: 100%;
      }

      .sparkline-path {
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .sparkline-fill {
        opacity: 0.2;
      }

      .sparkline-point {
        transition: all 0.2s ease;
      }

      .sparkline-point:hover {
        r: 5;
      }

      .error-message {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        color: #666;
        font-size: 14px;
        text-align: center;
        padding: 20px;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      .scorecard-container {
        animation: fadeIn 0.3s ease-out;
      }
    `;

    // Append style to document head
    if (!document.getElementById('scorecard-sparkline-styles')) {
      style.id = 'scorecard-sparkline-styles';
      document.head.appendChild(style);
    }

    // Create HTML structure
    element.innerHTML = `
      <div class="scorecard-container" id="scorecard-container-${Date.now()}">
        <div class="scorecard-title"></div>
        <div class="scorecard-value"></div>
        <div class="scorecard-sparkline-container">
          <svg class="scorecard-sparkline-svg" preserveAspectRatio="none">
          </svg>
        </div>
      </div>
    `;

    // Store references
    this._container = element.querySelector('.scorecard-container');
    this._title = element.querySelector('.scorecard-title');
    this._value = element.querySelector('.scorecard-value');
    this._sparklineContainer = element.querySelector('.scorecard-sparkline-container');
    this._sparklineSvg = element.querySelector('.scorecard-sparkline-svg');
  },

  /**
   * Update the visualization with new data
   */
  updateAsync: function(data, element, config, queryResponse, details, done) {
    // Clear any errors
    this.clearErrors();

    if (!this._container) {
      this.addError({title: "Initialization Error", message: "Visualization not properly initialized"});
      done();
      return;
    }

    // Validate data
    if (!queryResponse || !data || data.length === 0) {
      this.showError('No data available');
      done();
      return;
    }

    // Get fields from query
    const dimensions = queryResponse.fields.dimension_like;
    const measures = queryResponse.fields.measure_like;

    if (measures.length === 0) {
      this.showError('At least 1 measure required for the value');
      done();
      return;
    }

    // Apply styles
    this.applyStyles(config);

    // Get the primary measure for the main value
    const primaryMeasure = measures[0].name;

    // Calculate the aggregated value (sum of all rows for the measure)
    let totalValue = 0;
    data.forEach(row => {
      totalValue += (row[primaryMeasure].value || 0);
    });

    // For sparkline, we need dimension + measure data
    const sparklineData = [];
    if (dimensions.length > 0) {
      const dimension = dimensions[0].name;
      data.forEach(row => {
        sparklineData.push({
          label: row[dimension].value,
          value: row[primaryMeasure].value || 0
        });
      });
    }

    // Format and display the primary value
    const formattedValue = this.formatValue(totalValue, config);
    const prefix = config.value_prefix || '';
    const suffix = config.value_suffix || '';

    // Update title
    const titleText = config.title_text || measures[0].label_short || measures[0].label || "Metric";
    if (config.show_title !== false) {
      this._title.textContent = titleText;
      this._title.style.display = 'block';
    } else {
      this._title.style.display = 'none';
    }

    // Update value
    this._value.textContent = prefix + formattedValue + suffix;

    // Draw sparkline if enabled and we have data
    if (config.show_sparkline !== false && sparklineData.length > 1) {
      this._sparklineContainer.style.display = 'block';
      this.drawSparkline(sparklineData, config);
    } else {
      this._sparklineContainer.style.display = 'none';
    }

    // Debug logging
    console.log('Scorecard Debug Info:');
    console.log('Total Value:', totalValue, '→', formattedValue);
    console.log('Sparkline Data Points:', sparklineData.length);

    done();
  },

  /**
   * Apply styles to the container and elements
   */
  applyStyles: function(config) {
    // Background
    this._container.style.backgroundColor = config.background_color || '#FFFFFF';

    // Border
    if (config.border_enabled) {
      this._container.style.border = `1px solid ${config.border_color || '#DADCE0'}`;
    } else {
      this._container.style.border = 'none';
    }
    this._container.style.borderRadius = (config.border_radius || 8) + 'px';

    // Font family
    const fontFamily = config.font_family || 'Roboto, Arial, sans-serif';
    this._container.style.fontFamily = fontFamily;

    // Title styles
    this._title.style.fontSize = (config.title_font_size || 14) + 'px';
    this._title.style.color = config.title_color || '#5F6368';

    // Value styles
    this._value.style.fontSize = (config.value_font_size || 48) + 'px';
    this._value.style.color = config.value_color || '#202124';

    // Sparkline container height
    const sparklineHeight = config.sparkline_height || 40;
    this._sparklineContainer.style.height = sparklineHeight + '%';
  },

  /**
   * Show error message
   */
  showError: function(message) {
    this._container.innerHTML = `
      <div class="error-message">
        ${message}
      </div>
    `;
  },

  /**
   * Format numeric values
   */
  formatValue: function(value, config) {
    const format = config.value_format || 'auto';
    const decimals = config.decimal_places !== undefined ? config.decimal_places : 2;

    switch (format) {
      case 'number':
        return value.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals
        });

      case 'compact':
        const absValue = Math.abs(value);
        const sign = value < 0 ? '-' : '';
        if (absValue >= 1000000000) {
          return sign + (absValue / 1000000000).toFixed(decimals) + 'B';
        } else if (absValue >= 1000000) {
          return sign + (absValue / 1000000).toFixed(decimals) + 'M';
        } else if (absValue >= 1000) {
          return sign + (absValue / 1000).toFixed(decimals) + 'K';
        }
        return sign + absValue.toFixed(decimals);

      case 'percentage':
        return (value * 100).toFixed(decimals) + '%';

      case 'currency':
        return value.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals
        });

      case 'auto':
      default:
        // Auto-detect best format
        if (Math.abs(value) >= 1000) {
          return this.formatValue(value, {...config, value_format: 'compact'});
        }
        return value.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals
        });
    }
  },

  /**
   * Draw sparkline chart
   */
  drawSparkline: function(data, config) {
    const svg = this._sparklineSvg;
    const svgNS = "http://www.w3.org/2000/svg";

    // Clear previous content
    svg.innerHTML = '';

    // Get SVG dimensions
    const rect = svg.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    if (width === 0 || height === 0) {
      return; // SVG not yet rendered
    }

    // Set viewBox
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    // Extract values
    const values = data.map(d => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const valueRange = maxValue - minValue || 1; // Avoid division by zero

    // Calculate points
    const points = [];
    const stepX = width / (data.length - 1);

    data.forEach((d, i) => {
      const x = i * stepX;
      const normalizedValue = (d.value - minValue) / valueRange;
      const y = height - (normalizedValue * height * 0.9) - (height * 0.05); // 5% padding top/bottom
      points.push({x, y, value: d.value});
    });

    // Create path data
    let pathData = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      pathData += ` L ${points[i].x} ${points[i].y}`;
    }

    // Draw filled area under the line
    if (config.sparkline_fill !== false) {
      const fillPath = document.createElementNS(svgNS, 'path');
      const fillData = pathData + ` L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;
      fillPath.setAttribute('d', fillData);
      fillPath.setAttribute('fill', config.sparkline_color || '#1A73E8');
      fillPath.setAttribute('opacity', config.sparkline_fill_opacity || 0.2);
      fillPath.setAttribute('class', 'sparkline-fill');
      svg.appendChild(fillPath);
    }

    // Draw the line
    const linePath = document.createElementNS(svgNS, 'path');
    linePath.setAttribute('d', pathData);
    linePath.setAttribute('stroke', config.sparkline_color || '#1A73E8');
    linePath.setAttribute('stroke-width', config.sparkline_line_width || 2);
    linePath.setAttribute('class', 'sparkline-path');
    svg.appendChild(linePath);

    // Draw points if enabled
    if (config.show_sparkline_points) {
      points.forEach(point => {
        const circle = document.createElementNS(svgNS, 'circle');
        circle.setAttribute('cx', point.x);
        circle.setAttribute('cy', point.y);
        circle.setAttribute('r', 3);
        circle.setAttribute('fill', config.sparkline_color || '#1A73E8');
        circle.setAttribute('class', 'sparkline-point');

        // Add tooltip
        const title = document.createElementNS(svgNS, 'title');
        title.textContent = this.formatValue(point.value, config);
        circle.appendChild(title);

        svg.appendChild(circle);
      });
    }
  }
});
