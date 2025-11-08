/**
 * Conditional Bar Chart for Looker
 * Studio-inspired bar chart with rule-based conditional formatting
 */

looker.plugins.visualizations.add({
  id: "conditional_bar_viz",
  label: "Conditional Bar Chart",
  options: {
    // ========== CHART SECTION ==========
    orientation: {
      type: "string",
      label: "Orientation",
      display: "select",
      values: [
        {"Vertical": "vertical"},
        {"Horizontal": "horizontal"}
      ],
      default: "vertical",
      section: "Chart"
    },
    bar_width: {
      type: "number",
      label: "Bar Width (%)",
      default: 80,
      section: "Chart"
    },
    show_values: {
      type: "boolean",
      label: "Show Data Labels",
      default: false,
      section: "Chart"
    },
    value_position: {
      type: "string",
      label: "Label Position",
      display: "select",
      values: [
        {"Inside": "inside"},
        {"Outside": "outside"},
        {"Center": "center"}
      ],
      default: "outside",
      section: "Chart"
    },

    // ========== CONDITIONAL FORMATTING ==========
    enable_conditional: {
      type: "boolean",
      label: "Enable Conditional Formatting",
      default: true,
      section: "Conditional"
    },
    rule_count: {
      type: "number",
      label: "Number of Rules",
      default: 3,
      section: "Conditional"
    },

    // Rule 1
    rule1_condition: {
      type: "string",
      label: "Rule 1: Condition",
      display: "select",
      values: [
        {"Greater than": "gt"},
        {"Less than": "lt"},
        {"Between": "between"},
        {"Top N": "topn"},
        {"Bottom N": "bottomn"}
      ],
      default: "gt",
      section: "Conditional"
    },
    rule1_value: {
      type: "number",
      label: "Rule 1: Value",
      default: 100000,
      section: "Conditional"
    },
    rule1_value2: {
      type: "number",
      label: "Rule 1: Value 2 (for Between)",
      default: 200000,
      section: "Conditional"
    },
    rule1_color: {
      type: "string",
      label: "Rule 1: Color",
      default: "#34A853",
      display: "color",
      section: "Conditional"
    },
    rule1_apply_to: {
      type: "string",
      label: "Rule 1: Apply To",
      display: "select",
      values: [
        {"Bar": "bar"},
        {"Label": "label"},
        {"Both": "both"}
      ],
      default: "bar",
      section: "Conditional"
    },

    // Rule 2
    rule2_condition: {
      type: "string",
      label: "Rule 2: Condition",
      display: "select",
      values: [
        {"Greater than": "gt"},
        {"Less than": "lt"},
        {"Between": "between"},
        {"Top N": "topn"},
        {"Bottom N": "bottomn"}
      ],
      default: "lt",
      section: "Conditional"
    },
    rule2_value: {
      type: "number",
      label: "Rule 2: Value",
      default: 50000,
      section: "Conditional"
    },
    rule2_value2: {
      type: "number",
      label: "Rule 2: Value 2 (for Between)",
      default: 100000,
      section: "Conditional"
    },
    rule2_color: {
      type: "string",
      label: "Rule 2: Color",
      default: "#EA4335",
      display: "color",
      section: "Conditional"
    },
    rule2_apply_to: {
      type: "string",
      label: "Rule 2: Apply To",
      display: "select",
      values: [
        {"Bar": "bar"},
        {"Label": "label"},
        {"Both": "both"}
      ],
      default: "bar",
      section: "Conditional"
    },

    // Rule 3
    rule3_condition: {
      type: "string",
      label: "Rule 3: Condition",
      display: "select",
      values: [
        {"Greater than": "gt"},
        {"Less than": "lt"},
        {"Between": "between"},
        {"Top N": "topn"},
        {"Bottom N": "bottomn"}
      ],
      default: "between",
      section: "Conditional"
    },
    rule3_value: {
      type: "number",
      label: "Rule 3: Value",
      default: 50000,
      section: "Conditional"
    },
    rule3_value2: {
      type: "number",
      label: "Rule 3: Value 2 (for Between)",
      default: 100000,
      section: "Conditional"
    },
    rule3_color: {
      type: "string",
      label: "Rule 3: Color",
      default: "#FBBC04",
      display: "color",
      section: "Conditional"
    },
    rule3_apply_to: {
      type: "string",
      label: "Rule 3: Apply To",
      display: "select",
      values: [
        {"Bar": "bar"},
        {"Label": "label"},
        {"Both": "both"}
      ],
      default: "bar",
      section: "Conditional"
    },

    // ========== STYLE SECTION ==========
    default_bar_color: {
      type: "string",
      label: "Default Bar Color",
      default: "#4285F4",
      display: "color",
      section: "Style"
    },
    bar_gradient: {
      type: "boolean",
      label: "Enable Bar Gradient",
      default: false,
      section: "Style"
    },
    background_color: {
      type: "string",
      label: "Background Color",
      default: "#FFFFFF",
      display: "color",
      section: "Style"
    },
    label_color: {
      type: "string",
      label: "Default Label Color",
      default: "#202124",
      display: "color",
      section: "Style"
    },
    label_font_size: {
      type: "number",
      label: "Label Font Size",
      default: 12,
      section: "Style"
    },
    axis_label_color: {
      type: "string",
      label: "Axis Label Color",
      default: "#5F6368",
      display: "color",
      section: "Style"
    }
  },

  create: function(element, config) {
    const style = document.createElement('style');
    style.innerHTML = `
      .conditional-bar-container {
        width: 100%;
        height: 100%;
        position: relative;
        font-family: 'Roboto', Arial, sans-serif;
      }

      .conditional-bar-svg {
        width: 100%;
        height: 100%;
      }

      .bar-rect {
        transition: opacity 0.2s ease;
      }

      .bar-rect:hover {
        opacity: 0.8;
      }

      .bar-label {
        font-weight: 500;
        user-select: none;
      }

      .axis-label {
        font-weight: 400;
        user-select: none;
      }
    `;

    if (!document.getElementById('conditional-bar-styles')) {
      style.id = 'conditional-bar-styles';
      document.head.appendChild(style);
    }

    element.innerHTML = `
      <div class="conditional-bar-container">
        <svg class="conditional-bar-svg"></svg>
      </div>
    `;

    this._container = element.querySelector('.conditional-bar-container');
    this._svg = element.querySelector('.conditional-bar-svg');
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    this.clearErrors();

    if (!data || data.length === 0) {
      this._svg.innerHTML = '<text x="50%" y="50%" text-anchor="middle" fill="#666">No data</text>';
      done();
      return;
    }

    const dimensions = queryResponse.fields.dimension_like;
    const measures = queryResponse.fields.measure_like;

    if (dimensions.length === 0 || measures.length === 0) {
      this._svg.innerHTML = '<text x="50%" y="50%" text-anchor="middle" fill="#666">Need 1 dimension and 1 measure</text>';
      done();
      return;
    }

    this._container.style.backgroundColor = config.background_color || '#FFFFFF';

    const dimension = dimensions[0].name;
    const measure = measures[0].name;

    const chartData = data.map(row => ({
      label: row[dimension].value,
      value: row[measure].value || 0
    }));

    this.drawBarChart(chartData, config);
    done();
  },

  drawBarChart: function(data, config) {
    const svgNS = "http://www.w3.org/2000/svg";
    this._svg.innerHTML = '';

    const rect = this._svg.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    if (width === 0 || height === 0) return;

    const orientation = config.orientation || 'vertical';
    const margin = { top: 20, right: 20, bottom: 60, left: 80 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    this._svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    // Calculate scales
    const maxValue = Math.max(...data.map(d => Math.abs(d.value)));
    const minValue = Math.min(...data.map(d => d.value), 0);

    // Apply conditional formatting
    const formattedData = this.applyConditionalFormatting(data, config);

    // Draw bars
    if (orientation === 'vertical') {
      this.drawVerticalBars(formattedData, chartWidth, chartHeight, margin, maxValue, minValue, config);
    } else {
      this.drawHorizontalBars(formattedData, chartWidth, chartHeight, margin, maxValue, minValue, config);
    }
  },

  drawVerticalBars: function(data, chartWidth, chartHeight, margin, maxValue, minValue, config) {
    const svgNS = "http://www.w3.org/2000/svg";
    const barCount = data.length;
    const barSpacing = chartWidth / barCount;
    const barWidth = (barSpacing * (config.bar_width || 80)) / 100;

    const valueScale = chartHeight / (maxValue - minValue || 1);
    const zeroY = margin.top + chartHeight - (0 - minValue) * valueScale;

    data.forEach((item, i) => {
      const x = margin.left + i * barSpacing + (barSpacing - barWidth) / 2;
      const barHeight = Math.abs(item.value * valueScale);
      const y = item.value >= 0 ? zeroY - barHeight : zeroY;

      // Bar
      const rect = document.createElementNS(svgNS, 'rect');
      rect.setAttribute('x', x);
      rect.setAttribute('y', y);
      rect.setAttribute('width', barWidth);
      rect.setAttribute('height', barHeight);
      rect.setAttribute('fill', item.barColor);
      rect.setAttribute('class', 'bar-rect');

      if (config.bar_gradient) {
        const gradient = this.createGradient(item.barColor, i);
        rect.setAttribute('fill', `url(#gradient${i})`);
      }

      this._svg.appendChild(rect);

      // Label
      if (config.show_values) {
        const label = document.createElementNS(svgNS, 'text');
        label.setAttribute('x', x + barWidth / 2);

        const position = config.value_position || 'outside';
        if (position === 'inside') {
          label.setAttribute('y', y + (item.value >= 0 ? barHeight - 5 : 15));
        } else if (position === 'center') {
          label.setAttribute('y', y + barHeight / 2 + 4);
        } else {
          label.setAttribute('y', y - 5);
        }

        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('fill', item.labelColor);
        label.setAttribute('font-size', config.label_font_size || 12);
        label.setAttribute('class', 'bar-label');
        label.textContent = this.formatValue(item.value);
        this._svg.appendChild(label);
      }

      // Axis label
      const axisLabel = document.createElementNS(svgNS, 'text');
      axisLabel.setAttribute('x', x + barWidth / 2);
      axisLabel.setAttribute('y', margin.top + chartHeight + 20);
      axisLabel.setAttribute('text-anchor', 'middle');
      axisLabel.setAttribute('fill', config.axis_label_color || '#5F6368');
      axisLabel.setAttribute('font-size', 11);
      axisLabel.setAttribute('class', 'axis-label');
      axisLabel.textContent = this.truncate(item.label, 15);
      this._svg.appendChild(axisLabel);
    });
  },

  drawHorizontalBars: function(data, chartWidth, chartHeight, margin, maxValue, minValue, config) {
    const svgNS = "http://www.w3.org/2000/svg";
    const barCount = data.length;
    const barSpacing = chartHeight / barCount;
    const barHeight = (barSpacing * (config.bar_width || 80)) / 100;

    const valueScale = chartWidth / (maxValue - minValue || 1);
    const zeroX = margin.left + (0 - minValue) * valueScale;

    data.forEach((item, i) => {
      const y = margin.top + i * barSpacing + (barSpacing - barHeight) / 2;
      const barWidth = Math.abs(item.value * valueScale);
      const x = item.value >= 0 ? zeroX : zeroX - barWidth;

      // Bar
      const rect = document.createElementNS(svgNS, 'rect');
      rect.setAttribute('x', x);
      rect.setAttribute('y', y);
      rect.setAttribute('width', barWidth);
      rect.setAttribute('height', barHeight);
      rect.setAttribute('fill', item.barColor);
      rect.setAttribute('class', 'bar-rect');

      if (config.bar_gradient) {
        const gradient = this.createGradient(item.barColor, i);
        rect.setAttribute('fill', `url(#gradient${i})`);
      }

      this._svg.appendChild(rect);

      // Label
      if (config.show_values) {
        const label = document.createElementNS(svgNS, 'text');
        label.setAttribute('y', y + barHeight / 2 + 4);

        const position = config.value_position || 'outside';
        if (position === 'inside') {
          label.setAttribute('x', x + (item.value >= 0 ? barWidth - 5 : 5));
          label.setAttribute('text-anchor', item.value >= 0 ? 'end' : 'start');
        } else if (position === 'center') {
          label.setAttribute('x', x + barWidth / 2);
          label.setAttribute('text-anchor', 'middle');
        } else {
          label.setAttribute('x', x + (item.value >= 0 ? barWidth + 5 : -5));
          label.setAttribute('text-anchor', item.value >= 0 ? 'start' : 'end');
        }

        label.setAttribute('fill', item.labelColor);
        label.setAttribute('font-size', config.label_font_size || 12);
        label.setAttribute('class', 'bar-label');
        label.textContent = this.formatValue(item.value);
        this._svg.appendChild(label);
      }

      // Axis label
      const axisLabel = document.createElementNS(svgNS, 'text');
      axisLabel.setAttribute('x', margin.left - 10);
      axisLabel.setAttribute('y', y + barHeight / 2 + 4);
      axisLabel.setAttribute('text-anchor', 'end');
      axisLabel.setAttribute('fill', config.axis_label_color || '#5F6368');
      axisLabel.setAttribute('font-size', 11);
      axisLabel.setAttribute('class', 'axis-label');
      axisLabel.textContent = this.truncate(item.label, 15);
      this._svg.appendChild(axisLabel);
    });
  },

  applyConditionalFormatting: function(data, config) {
    if (!config.enable_conditional) {
      return data.map(d => ({
        ...d,
        barColor: config.default_bar_color || '#4285F4',
        labelColor: config.label_color || '#202124'
      }));
    }

    const ruleCount = config.rule_count || 3;
    const values = data.map(d => d.value);

    return data.map(item => {
      let barColor = config.default_bar_color || '#4285F4';
      let labelColor = config.label_color || '#202124';

      for (let i = 1; i <= ruleCount; i++) {
        const condition = config[`rule${i}_condition`];
        const value = config[`rule${i}_value`];
        const value2 = config[`rule${i}_value2`];
        const color = config[`rule${i}_color`];
        const applyTo = config[`rule${i}_apply_to`] || 'bar';

        if (this.evaluateCondition(item.value, condition, value, value2, values)) {
          if (applyTo === 'bar' || applyTo === 'both') {
            barColor = color;
          }
          if (applyTo === 'label' || applyTo === 'both') {
            labelColor = color;
          }
          break; // First matching rule wins
        }
      }

      return { ...item, barColor, labelColor };
    });
  },

  evaluateCondition: function(itemValue, condition, value, value2, allValues) {
    switch (condition) {
      case 'gt':
        return itemValue > value;
      case 'lt':
        return itemValue < value;
      case 'between':
        return itemValue >= value && itemValue <= value2;
      case 'topn':
        const topN = [...allValues].sort((a, b) => b - a).slice(0, value);
        return topN.includes(itemValue);
      case 'bottomn':
        const bottomN = [...allValues].sort((a, b) => a - b).slice(0, value);
        return bottomN.includes(itemValue);
      default:
        return false;
    }
  },

  createGradient: function(color, index) {
    const svgNS = "http://www.w3.org/2000/svg";
    const defs = this._svg.querySelector('defs') || document.createElementNS(svgNS, 'defs');
    if (!this._svg.querySelector('defs')) {
      this._svg.appendChild(defs);
    }

    const gradient = document.createElementNS(svgNS, 'linearGradient');
    gradient.setAttribute('id', `gradient${index}`);
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '0%');
    gradient.setAttribute('y2', '100%');

    const stop1 = document.createElementNS(svgNS, 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', this.lightenColor(color, 30));

    const stop2 = document.createElementNS(svgNS, 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', color);

    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);

    return gradient;
  },

  lightenColor: function(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return "#" + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
  },

  formatValue: function(value) {
    const absValue = Math.abs(value);
    const sign = value < 0 ? '-' : '';

    if (absValue >= 1000000) {
      return sign + (absValue / 1000000).toFixed(1) + 'M';
    } else if (absValue >= 1000) {
      return sign + (absValue / 1000).toFixed(1) + 'K';
    }
    return sign + absValue.toFixed(0);
  },

  truncate: function(text, length) {
    return text.length > length ? text.substring(0, length) + '...' : text;
  }
});
