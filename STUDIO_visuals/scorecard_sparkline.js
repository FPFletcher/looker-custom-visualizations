/**
 * Scorecard with Sparkline Visualization for Looker
 * Combined JavaScript file with embedded HTML and CSS
 * Displays a single value with a sparkline trend chart
 *
 * NOTE: Sparkline always displays visible rows only. The main metric value
 * respects the Calculation Mode setting (Totals vs Visible Rows).
 */

looker.plugins.visualizations.add({
  id: "scorecard_sparkline_viz",
  label: "Scorecard with Sparkline",
  options: {
    // ========== CONTENT SECTION (includes Font settings) ==========
    title_text: {
      type: "string",
      label: "Title",
      default: "Metric Title",
      section: "Plot"
    },
    show_title: {
      type: "boolean",
      label: "Show Title",
      default: true,
      section: "Plot"
    },
    title_font_size: {
      type: "number",
      label: "Title Font Size",
      default: 14,
      section: "Plot"
    },
    value_prefix: {
      type: "string",
      label: "Value Prefix",
      placeholder: "$",
      section: "Plot"
    },
    value_suffix: {
      type: "string",
      label: "Value Suffix",
      placeholder: "",
      section: "Plot"
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
      section: "Plot"
    },
    decimal_places: {
      type: "number",
      label: "Decimal Places",
      default: 2,
      section: "Plot"
    },
    value_font_size: {
      type: "number",
      label: "Value Font Size",
      default: 48,
      section: "Plot"
    },
    font_family: {
      type: "string",
      label: "Font Family",
      default: "Roboto, Arial, sans-serif",
      section: "Plot"
    },
    calculation_mode: {
      type: "string",
      label: "Calculation Mode",
      display: "select",
      values: [
        {"Use Totals (Recommended)": "use_totals"},
        {"Sum Visible Rows Only": "sum_visible_rows"}
      ],
      default: "use_totals",
      section: "Plot",
      order: 1
    },
    calculation_mode_help: {
      type: "string",
      label: "ℹ️ Use Totals: Accurate across all data (requires Totals enabled in Data menu). May have minor rounding with large datasets. Note: Sparkline always shows visible rows trend only.",
      display: "divider",
      section: "Plot",
      default: "",
      order: 2
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
      section: "Formatting"
    },
    title_color: {
      type: "string",
      label: "Title Color",
      default: "#5F6368",
      display: "color",
      section: "Formatting"
    },
    value_color: {
      type: "string",
      label: "Value Color",
      default: "#202124",
      display: "color",
      section: "Formatting"
    },
    border_enabled: {
      type: "boolean",
      label: "Show Border",
      default: false,
      section: "Formatting"
    },
    border_color: {
      type: "string",
      label: "Border Color",
      default: "#DADCE0",
      display: "color",
      section: "Formatting"
    },
    border_radius: {
      type: "number",
      label: "Border Radius (px)",
      default: 8,
      section: "Formatting"
    },
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

      /* Hide the input field for help text, show only label */
      input[type="text"][value=""]:read-only {
        display: none;
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

      .vis-option-label:has(+ [placeholder*="ℹ️"]) + input {
        font-size: 11px !important;
        font-style: italic !important;
        color: #5F6368 !important;
        background-color: transparent !important;
        border: none !important;
        pointer-events: none !important;
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

      .warning-message {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px 12px;
        margin-bottom: 12px;
        background-color: #FFF4E5;
        border: 1px solid #FFE0B2;
        border-radius: 4px;
        color: #E65100;
        font-size: 12px;
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
        <div class="scorecard-warning" style="display: none;"></div>
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
    this._warning = element.querySelector('.scorecard-warning');
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

    // Get calculation mode
    const calculationMode = config.calculation_mode || 'use_totals';

    // Detect if row limit was reached
    // Check against common row limits: 10, 50, 100, 500, 5000, 50000
    const commonRowLimits = [10, 50, 100, 500, 5000, 50000];
    const rowLimit = queryResponse.row_limit || 500;
    const rowLimitReached = commonRowLimits.includes(data.length) || data.length >= rowLimit;

    // ============================================
    // ENHANCED TOTALS DETECTION
    // ============================================
    let totalValue = 0;
    let usingTotals = false;
    let totalsMethod = 'none';

    // Enhanced debugging - log everything about details
    console.log('=== TOTALS DEBUG INFO ===');
    console.log('Calculation Mode:', calculationMode);
    console.log('Row Limit:', rowLimit);
    console.log('Row Count:', data.length);
    console.log('Row Limit Reached:', rowLimitReached);
    console.log('Details object:', details);
    console.log('Details type:', typeof details);
    console.log('Has totals_data?', details && 'totals_data' in details);

    if (details) {
      console.log('Details keys:', Object.keys(details));
      if (details.totals_data) {
        console.log('Totals data:', details.totals_data);
        console.log('Totals data type:', typeof details.totals_data);
        console.log('Totals data keys:', Object.keys(details.totals_data));
      }
    }

    // Only attempt to use totals if in "use_totals" mode
    if (calculationMode === 'use_totals') {
      // METHOD 1: Check details.totals_data (most reliable when totals are enabled)
      if (details && details.totals_data) {
        console.log('Checking totals_data for measure:', primaryMeasure);

        // Try to get the total value from totals_data
        if (details.totals_data[primaryMeasure]) {
          console.log('Found measure in totals_data:', details.totals_data[primaryMeasure]);

          // The value might be directly available or in a nested structure
          if (typeof details.totals_data[primaryMeasure] === 'object') {
            if (details.totals_data[primaryMeasure].value !== undefined) {
              totalValue = details.totals_data[primaryMeasure].value;
              usingTotals = true;
              totalsMethod = 'totals_data.value';
            } else if (details.totals_data[primaryMeasure].rendered !== undefined) {
              // Sometimes only rendered value is available - try to parse it
              totalValue = this.parseRenderedValue(details.totals_data[primaryMeasure].rendered);
              usingTotals = true;
              totalsMethod = 'totals_data.rendered';
            }
          } else if (typeof details.totals_data[primaryMeasure] === 'number') {
            // Sometimes it's just a direct number
            totalValue = details.totals_data[primaryMeasure];
            usingTotals = true;
            totalsMethod = 'totals_data.direct';
          }
        }
      }

      // METHOD 2: Check if query_response has totals (alternative structure)
      if (!usingTotals && queryResponse && queryResponse.totals_data) {
        console.log('Checking queryResponse.totals_data');
        if (queryResponse.totals_data[primaryMeasure]) {
          if (typeof queryResponse.totals_data[primaryMeasure] === 'object') {
            totalValue = queryResponse.totals_data[primaryMeasure].value || 0;
          } else {
            totalValue = queryResponse.totals_data[primaryMeasure];
          }
          usingTotals = true;
          totalsMethod = 'queryResponse.totals_data';
        }
      }

      // METHOD 3: Check data object for totals row (some Looker versions add a totals row)
      if (!usingTotals && data && data.length > 0) {
        const lastRow = data[data.length - 1];
        console.log('Checking last row for totals marker:', lastRow);

        // Check if last row is a totals row (Looker sometimes adds this)
        if (lastRow.$$$_row_total_$$$ ||
            (dimensions.length > 0 && lastRow[dimensions[0].name]?.value === 'Totals')) {
          console.log('Found totals row in data');
          totalValue = lastRow[primaryMeasure]?.value || 0;
          usingTotals = true;
          totalsMethod = 'data.totals_row';
          // Remove the totals row from sparkline data
          data = data.slice(0, -1);
        }
      }
    }

    // FALLBACK: Calculate from visible rows if totals not available OR if in sum_visible_rows mode
    if (!usingTotals) {
      console.log('Calculating from visible rows (mode:', calculationMode, ')');
      data.forEach(row => {
        const value = row[primaryMeasure]?.value || 0;
        totalValue += value;
      });
      totalsMethod = 'calculated_from_rows';

      // Show warning if in "use_totals" mode but totals not available
      if (calculationMode === 'use_totals') {
        if (rowLimitReached) {
          this.showWarning('⚠️ Row limit reached. Enable "Totals" in Data menu or switch to "Sum Visible Rows" mode.');
        } else {
          // Even if limit not reached, if using use_totals mode without actual totals, give gentle reminder
          this.showWarning('ℹ️ Enable "Totals" in Data menu for accurate aggregates across all data.');
        }
      } else {
        // In sum_visible_rows mode, never show warning
        this.hideWarning();
      }
    } else {
        this.hideWarning();
    }

    console.log('=== FINAL TOTALS RESULT ===');
    console.log('Using Totals:', usingTotals);
    console.log('Totals Method:', totalsMethod);
    console.log('Total Value:', totalValue);
    console.log('========================');

    // For sparkline, we use the row-level data (trend over time)
    // NOTE: Sparkline ALWAYS uses visible rows, regardless of calculation mode
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
   * Show warning message
   */
  showWarning: function(message) {
    this._warning.textContent = message;
    this._warning.className = 'warning-message';
    this._warning.style.display = 'block';
  },

  /**
   * Hide warning message
   */
  hideWarning: function() {
    this._warning.style.display = 'none';
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
   * Parse a rendered value string to extract numeric value
   * Handles formats like "105.2K", "$1,234.56", "42.5%", etc.
   */
  parseRenderedValue: function(renderedString) {
    if (!renderedString) return 0;

    // Remove currency symbols, commas, and spaces
    let cleanString = renderedString.toString()
      .replace(/[$£€¥,\s]/g, '')
      .replace(/%$/, ''); // Remove trailing %

    // Handle K, M, B suffixes
    let multiplier = 1;
    if (cleanString.endsWith('K')) {
      multiplier = 1000;
      cleanString = cleanString.slice(0, -1);
    } else if (cleanString.endsWith('M')) {
      multiplier = 1000000;
      cleanString = cleanString.slice(0, -1);
    } else if (cleanString.endsWith('B')) {
      multiplier = 1000000000;
      cleanString = cleanString.slice(0, -1);
    }

    const numValue = parseFloat(cleanString);
    return isNaN(numValue) ? 0 : numValue * multiplier;
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
