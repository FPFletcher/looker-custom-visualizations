/**
 * Conditional Column Chart for Looker
 * Pure SVG implementation - no external dependencies
 */

looker.plugins.visualizations.add({
  id: "conditional_column_chart",
  label: "Conditional Column Chart",
  options: {
    // ========== PLOT SECTION ==========
    chart_type: {
      type: "string",
      label: "Chart Type",
      display: "select",
      values: [
        {"Column": "column"},
        {"Bar": "bar"}
      ],
      default: "column",
      section: "Plot",
      order: 1
    },
    stacking: {
      type: "string",
      label: "Stacking",
      display: "select",
      values: [
        {"None": "none"},
        {"Normal": "normal"},
        {"Percent": "percent"}
      ],
      default: "none",
      section: "Plot",
      order: 2
    },
    group_padding: {
      type: "number",
      label: "Group Padding",
      default: 0.1,
      min: 0,
      max: 0.5,
      step: 0.05,
      section: "Plot",
      order: 3
    },
    point_padding: {
      type: "number",
      label: "Point Padding",
      default: 0.1,
      min: 0,
      max: 0.5,
      step: 0.05,
      section: "Plot",
      order: 4
    },

    // ========== SERIES SECTION ==========
    color_collection: {
      type: "string",
      label: "Color Collection",
      display: "select",
      values: [
        {"Google": "google"},
        {"Looker Classic": "looker"},
        {"Green Scale": "green_scale"},
        {"Blue Scale": "blue_scale"},
        {"Viridis": "viridis"},
        {"Warm": "warm"},
        {"Cool": "cool"}
      ],
      default: "google",
      section: "Series",
      order: 1
    },
    series_colors: {
      type: "string",
      label: "Series Colors Override",
      placeholder: "#4285F4,#EA4335,#FBBC04",
      section: "Series",
      order: 2
    },

    // ========== VALUES SECTION ==========
    show_labels: {
      type: "boolean",
      label: "Show Value Labels",
      default: true,
      section: "Values",
      order: 1
    },
    label_position: {
      type: "string",
      label: "Label Position",
      display: "select",
      values: [
        {"Inside": "inside"},
        {"Outside": "outside"},
        {"Center": "center"}
      ],
      default: "outside",
      section: "Values",
      order: 2
    },
    label_rotation: {
      type: "number",
      label: "Label Rotation",
      default: 0,
      min: -90,
      max: 90,
      step: 15,
      section: "Values",
      order: 3
    },
    label_font_size: {
      type: "number",
      label: "Label Font Size",
      default: 11,
      min: 8,
      max: 24,
      section: "Values",
      order: 4
    },
    label_color: {
      type: "string",
      label: "Label Color",
      default: "#000000",
      display: "color",
      section: "Values",
      order: 5
    },
    value_format: {
      type: "string",
      label: "Value Format",
      display: "select",
      values: [
        {"Auto": "auto"},
        {"Number": "number"},
        {"Currency": "currency"},
        {"Percent": "percent"},
        {"Decimal (1)": "decimal1"},
        {"Decimal (2)": "decimal2"}
      ],
      default: "auto",
      section: "Values",
      order: 6
    },

    // ========== FORMATTING SECTION ==========
    conditional_formatting_enabled: {
      type: "boolean",
      label: "Enable Conditional Formatting",
      default: false,
      section: "Formatting",
      order: 1
    },
    conditional_type: {
      type: "string",
      label: "Formatting Type",
      display: "select",
      values: [
        {"Color Gradient": "gradient"},
        {"Rules Based": "rules"},
        {"Top N": "topn"},
        {"Bottom N": "bottomn"}
      ],
      default: "gradient",
      section: "Formatting",
      order: 2
    },
    gradient_start_color: {
      type: "string",
      label: "Gradient Start Color",
      default: "#F1F8E9",
      display: "color",
      section: "Formatting",
      order: 3
    },
    gradient_end_color: {
      type: "string",
      label: "Gradient End Color",
      default: "#33691E",
      display: "color",
      section: "Formatting",
      order: 4
    },
    topbottom_n: {
      type: "number",
      label: "N Value",
      default: 5,
      min: 1,
      max: 50,
      section: "Formatting",
      order: 5
    },
    topn_color: {
      type: "string",
      label: "Top N Color",
      default: "#34A853",
      display: "color",
      section: "Formatting",
      order: 6
    },
    bottomn_color: {
      type: "string",
      label: "Bottom N Color",
      default: "#EA4335",
      display: "color",
      section: "Formatting",
      order: 7
    },
    other_color: {
      type: "string",
      label: "Other Values Color",
      default: "#9AA0A6",
      display: "color",
      section: "Formatting",
      order: 8
    },
    rule1_operator: {
      type: "string",
      label: "Rule 1: Operator",
      display: "select",
      values: [
        {"Greater Than": "gt"},
        {"Less Than": "lt"},
        {"Equal To": "eq"},
        {"Between": "between"}
      ],
      default: "gt",
      section: "Formatting",
      order: 9
    },
    rule1_value: {
      type: "number",
      label: "Rule 1: Value",
      default: 0,
      section: "Formatting",
      order: 10
    },
    rule1_value2: {
      type: "number",
      label: "Rule 1: Value 2",
      default: 100,
      section: "Formatting",
      order: 11
    },
    rule1_color: {
      type: "string",
      label: "Rule 1: Color",
      default: "#EA4335",
      display: "color",
      section: "Formatting",
      order: 12
    },
    background_enabled: {
      type: "boolean",
      label: "Enable Background",
      default: false,
      section: "Formatting",
      order: 20
    },
    background_color: {
      type: "string",
      label: "Background Color",
      default: "transparent",  // Changed from "#FFFFFF"
      display: "color",
      section: "Format"
    },
    border_enabled: {
      type: "boolean",
      label: "Enable Border",
      default: false,
      section: "Formatting",
      order: 22
    },
    border_color: {
      type: "string",
      label: "Border Color",
      default: "#E0E0E0",
      display: "color",
      section: "Formatting",
      order: 23
    },
    border_width: {
      type: "number",
      label: "Border Width",
      default: 0,  // Changed from 1
      min: 0,
      max: 10,
      section: "Format"
    },

    // ========== AXIS SECTION ==========
    show_x_axis: {
      type: "boolean",
      label: "Show X Axis",
      default: true,
      section: "Axis",
      order: 1
    },
    x_axis_label: {
      type: "string",
      label: "X Axis Title",
      placeholder: "Category",
      section: "Axis",
      order: 2
    },
    x_axis_label_rotation: {
      type: "number",
      label: "X Axis Label Rotation",
      default: 0,
      min: -90,
      max: 90,
      step: 15,
      section: "Axis",
      order: 3
    },
    show_x_gridlines: {
      type: "boolean",
      label: "Show X Gridlines",
      default: false,
      section: "Axis",
      order: 4
    },
    show_y_axis: {
      type: "boolean",
      label: "Show Y Axis",
      default: true,
      section: "Axis",
      order: 5
    },
    y_axis_label: {
      type: "string",
      label: "Y Axis Title",
      placeholder: "Value",
      section: "Axis",
      order: 6
    },
    y_axis_min: {
      type: "number",
      label: "Y Axis Min",
      placeholder: "auto",
      section: "Axis",
      order: 7
    },
    y_axis_max: {
      type: "number",
      label: "Y Axis Max",
      placeholder: "auto",
      section: "Axis",
      order: 8
    },
    show_y_gridlines: {
      type: "boolean",
      label: "Show Y Gridlines",
      default: true,
      section: "Axis",
      order: 9
    },
    y_axis_scale: {
      type: "string",
      label: "Y Axis Scale",
      display: "select",
      values: [
        {"Linear": "linear"},
        {"Logarithmic": "logarithmic"}
      ],
      default: "linear",
      section: "Axis",
      order: 10
    },
    reference_line_type: {
      type: "string",
      label: "Reference Line Type",
      display: "select",
      values: [
        {"Line": "line"},
        {"Range": "range"},
        {"Line with Margins": "margins"}
      ],
      default: "line",
      section: "Axis"
    },
    reference_line_value_type: {
      type: "string",
      label: "Reference Value Type",
      display: "select",
      values: [
        {"Custom": "custom"},
        {"Average": "average"},
        {"Median": "median"},
        {"Min": "min"},
        {"Max": "max"}
      ],
      default: "custom",
      section: "Axis"
    },
    show_reference_line: {
      type: "boolean",
      label: "Show Reference Line",
      default: false,
      section: "Axis",
      order: 11
    },
    reference_line_value: {
      type: "number",
      label: "Reference Line Value",
      default: 0,
      section: "Axis",
      order: 12
    },
    reference_line_label: {
      type: "string",
      label: "Reference Line Label",
      placeholder: "Target",
      section: "Axis",
      order: 13
    },
    reference_line_color: {
      type: "string",
      label: "Reference Line Color",
      default: "#EA4335",
      display: "color",
      section: "Axis",
      order: 14
    },
    show_trend_line: {
      type: "boolean",
      label: "Show Trend Line",
      default: false,
      section: "Axis",
      order: 15
    },
    trend_line_type: {
      type: "string",
      label: "Trend Line Type",
      display: "select",
      values: [
        {"Linear": "linear"},
        {"Moving Average": "moving_avg"},
        {"Running Total": "running_total"},
        {"Average": "average"}
      ],
      default: "linear",
      section: "Axis"
    },
    trend_line_period: {
      type: "number",
      label: "Period (for Moving Avg)",
      default: 3,
      min: 2,
      max: 10,
      section: "Axis"
    },
    trend_line_color: {
      type: "string",
      label: "Trend Line Color",
      default: "#4285F4",
      display: "color",
      section: "Axis",
      order: 16
    }
  },

  create: function(element, config) {
    const style = document.createElement('style');
    style.innerHTML = `
      .conditional-chart-container {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        font-family: 'Roboto', Arial, sans-serif;
        overflow: hidden;
      }
      .chart-svg {
        width: 100%;
        height: 100%;
        display: block;
      }
      .chart-bar {
        transition: opacity 0.1s;
      }
      .chart-bar:hover {
        opacity: 0.85;
      }
      .chart-tooltip {
        position: absolute;
        background: rgba(33,33,33,0.9);
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 12px;
        pointer-events: none;
        z-index: 1000;
        display: none;
        white-space: nowrap;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      }
    `;

    if (!document.getElementById('conditional-chart-styles')) {
      style.id = 'conditional-chart-styles';
      document.head.appendChild(style);
    }

    element.innerHTML = `
      <div class="conditional-chart-container">
        <svg class="chart-svg"></svg>
        <div class="chart-tooltip"></div>
      </div>
    `;

    this._container = element.querySelector('.conditional-chart-container');
    this._svg = element.querySelector('.chart-svg');
    this._tooltip = element.querySelector('.chart-tooltip');
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    this.clearErrors();

    if (!queryResponse || queryResponse.fields.dimensions.length < 1 || queryResponse.fields.measures.length < 1) {
      this.addError({
        title: 'Invalid Data',
        message: 'Chart requires 1 dimension and 1 measure.'
      });
      done();
      return;
    }

    const dimension = queryResponse.fields.dimensions[0].name;
    const measure = queryResponse.fields.measures[0].name;
    const categories = data.map(row => row[dimension].value);
    const values = data.map(row => row[measure].value || 0);

    this.renderChart(categories, values, config);
    done();
  },

  renderChart: function(categories, values, config) {
    const svgNS = "http://www.w3.org/2000/svg";
    this._svg.innerHTML = '';

    // Set background and border
    if (config.background_enabled) {
      this._container.style.backgroundColor = config.background_color || '#FFFFFF';
    }
    if (config.border_enabled) {
      this._container.style.border = `${config.border_width || 1}px solid ${config.border_color || '#E0E0E0'}`;
    }

    const rect = this._container.getBoundingClientRect();
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);

    // Margins for axes
    const margin = {
      top: 20,
      right: 20,
      bottom: config.show_x_axis !== false ? 60 : 20,
      left: config.show_y_axis !== false ? 60 : 20
    };

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    this._svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    // Calculate Y scale
    const minValue = config.y_axis_min !== undefined ? config.y_axis_min : Math.min(...values, 0);
    const maxValue = config.y_axis_max !== undefined ? config.y_axis_max : Math.max(...values, 0);
    const yScale = (value) => {
      if (config.y_axis_scale === 'logarithmic') {
        const logMin = Math.log10(Math.max(0.1, minValue));
        const logMax = Math.log10(Math.max(0.1, maxValue));
        const logValue = Math.log10(Math.max(0.1, value));
        return chartHeight - ((logValue - logMin) / (logMax - logMin)) * chartHeight;
      }
      return chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;
    };

    // Get colors
    const colors = this.getColors(values, config);

    // Draw Y gridlines
    if (config.show_y_gridlines !== false) {
      const gridLines = 5;
      for (let i = 0; i <= gridLines; i++) {
        const value = minValue + (maxValue - minValue) * (i / gridLines);
        const y = margin.top + yScale(value);
        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('x1', margin.left);
        line.setAttribute('y1', y);
        line.setAttribute('x2', margin.left + chartWidth);
        line.setAttribute('y2', y);
        line.setAttribute('stroke', '#E0E0E0');
        line.setAttribute('stroke-width', 1);
        this._svg.appendChild(line);
      }
    }

    // Draw bars
    const isBar = config.chart_type === 'bar';
    const barCount = values.length;
    const groupPadding = config.group_padding || 0.1;
    const pointPadding = config.point_padding || 0.1;

    const totalPadding = groupPadding * 2 + pointPadding * (barCount - 1);
    const availableSpace = isBar ? chartHeight : chartWidth;
    const barWidth = (availableSpace * (1 - totalPadding)) / barCount;
    const gapWidth = availableSpace * pointPadding / (barCount - 1 || 1);

   values.forEach((value, i) => {
    const g = document.createElementNS(svgNS, 'g');
    const rect = document.createElementNS(svgNS, 'rect');

    if (isBar) {
      // Horizontal bars
      const barHeight = barWidth;
      const x = margin.left;
      const y = margin.top + (availableSpace * groupPadding) + i * (barHeight + gapWidth);
      const barLength = Math.abs((value - minValue) / (maxValue - minValue)) * chartWidth;

      rect.setAttribute('x', value >= 0 ? x : x + ((value - minValue) / (maxValue - minValue)) * chartWidth);
      rect.setAttribute('y', y);
      rect.setAttribute('width', Math.max(1, barLength));
      rect.setAttribute('height', barHeight);
    } else {
      // Vertical columns - FIX HERE
      const x = margin.left + (availableSpace * groupPadding) + i * (barWidth + gapWidth);
      const zeroY = margin.top + yScale(0);
      const valueY = margin.top + yScale(value);
      const barHeight = Math.abs(zeroY - valueY);
      const y = Math.min(zeroY, valueY);

      rect.setAttribute('x', x);
      rect.setAttribute('y', y);
      rect.setAttribute('width', Math.max(1, barWidth));
      rect.setAttribute('height', Math.max(1, barHeight));
    }

    // Draw X axis
    if (config.show_x_axis !== false) {
      const axisLine = document.createElementNS(svgNS, 'line');
      axisLine.setAttribute('x1', margin.left);
      axisLine.setAttribute('y1', margin.top + chartHeight);
      axisLine.setAttribute('x2', margin.left + chartWidth);
      axisLine.setAttribute('y2', margin.top + chartHeight);
      axisLine.setAttribute('stroke', '#333');
      axisLine.setAttribute('stroke-width', 1);
      this._svg.appendChild(axisLine);

      // X axis labels
      categories.forEach((cat, i) => {
        const label = document.createElementNS(svgNS, 'text');
        const x = margin.left + (availableSpace * groupPadding) + i * (barWidth + gapWidth) + barWidth / 2;
        const y = margin.top + chartHeight + 20;

        label.setAttribute('x', x);
        label.setAttribute('y', y);
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('font-size', '12px');
        label.textContent = cat.length > 15 ? cat.substring(0, 12) + '..' : cat;

        if (config.x_axis_label_rotation) {
          label.setAttribute('transform', `rotate(${config.x_axis_label_rotation}, ${x}, ${y})`);
          label.setAttribute('text-anchor', config.x_axis_label_rotation < 0 ? 'end' : 'start');
        }

        this._svg.appendChild(label);
      });

      // X axis title
      if (config.x_axis_label) {
        const title = document.createElementNS(svgNS, 'text');
        title.setAttribute('x', margin.left + chartWidth / 2);
        title.setAttribute('y', height - 5);
        title.setAttribute('text-anchor', 'middle');
        title.setAttribute('font-size', '14px');
        title.setAttribute('font-weight', 'bold');
        title.textContent = config.x_axis_label;
        this._svg.appendChild(title);
      }
    }

    // Draw Y axis
    if (config.show_y_axis !== false) {
      const axisLine = document.createElementNS(svgNS, 'line');
      axisLine.setAttribute('x1', margin.left);
      axisLine.setAttribute('y1', margin.top);
      axisLine.setAttribute('x2', margin.left);
      axisLine.setAttribute('y2', margin.top + chartHeight);
      axisLine.setAttribute('stroke', '#333');
      axisLine.setAttribute('stroke-width', 1);
      this._svg.appendChild(axisLine);

      // Y axis labels
      const gridLines = 5;
      for (let i = 0; i <= gridLines; i++) {
        const value = minValue + (maxValue - minValue) * (i / gridLines);
        const y = margin.top + yScale(value);

        const label = document.createElementNS(svgNS, 'text');
        label.setAttribute('x', margin.left - 10);
        label.setAttribute('y', y + 4);
        label.setAttribute('text-anchor', 'end');
        label.setAttribute('font-size', '11px');
        label.textContent = this.formatValue(value, config);
        this._svg.appendChild(label);
      }

      // Y axis title
      if (config.y_axis_label) {
        const title = document.createElementNS(svgNS, 'text');
        title.setAttribute('x', 15);
        title.setAttribute('y', margin.top + chartHeight / 2);
        title.setAttribute('text-anchor', 'middle');
        title.setAttribute('font-size', '14px');
        title.setAttribute('font-weight', 'bold');
        title.setAttribute('transform', `rotate(-90, 15, ${margin.top + chartHeight / 2})`);
        title.textContent = config.y_axis_label;
        this._svg.appendChild(title);
      }
    }

    // Reference line
    if (config.show_reference_line) {
      const refValue = config.reference_line_value || 0;
      const refY = margin.top + yScale(refValue);

      const line = document.createElementNS(svgNS, 'line');
      line.setAttribute('x1', margin.left);
      line.setAttribute('y1', refY);
      line.setAttribute('x2', margin.left + chartWidth);
      line.setAttribute('y2', refY);
      line.setAttribute('stroke', config.reference_line_color || '#EA4335');
      line.setAttribute('stroke-width', 2);
      line.setAttribute('stroke-dasharray', '5,5');
      this._svg.appendChild(line);

      if (config.reference_line_label) {
        const label = document.createElementNS(svgNS, 'text');
        label.setAttribute('x', margin.left + chartWidth - 5);
        label.setAttribute('y', refY - 5);
        label.setAttribute('text-anchor', 'end');
        label.setAttribute('font-size', '11px');
        label.setAttribute('fill', config.reference_line_color || '#EA4335');
        label.textContent = config.reference_line_label;
        this._svg.appendChild(label);
      }
    }

    // Trend line
    if (config.show_trend_line) {
      const n = values.length;
      const sumX = values.reduce((sum, v, i) => sum + i, 0);
      const sumY = values.reduce((sum, v) => sum + v, 0);
      const sumXY = values.reduce((sum, v, i) => sum + i * v, 0);
      const sumX2 = values.reduce((sum, v, i) => sum + i * i, 0);

      const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
      const intercept = (sumY - slope * sumX) / n;

      const path = document.createElementNS(svgNS, 'path');
      let pathData = '';

      values.forEach((v, i) => {
        const trendValue = slope * i + intercept;
        const x = margin.left + (availableSpace * groupPadding) + i * (barWidth + gapWidth) + barWidth / 2;
        const y = margin.top + yScale(trendValue);
        pathData += (i === 0 ? 'M' : 'L') + x + ',' + y + ' ';
      });

      path.setAttribute('d', pathData);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', config.trend_line_color || '#4285F4');
      path.setAttribute('stroke-width', 2);
      path.setAttribute('stroke-dasharray', '5,5');
      this._svg.appendChild(path);
      }
    });
  },

  getColors: function(values, config) {
    const palettes = {
      google: ['#4285F4', '#EA4335', '#FBBC04', '#34A853', '#FF6D00', '#46BDC6', '#AB47BC'],
      looker: ['#7FCDAE', '#7ED09C', '#7DD389', '#85D67C', '#9AD97B', '#B1DB7A'],
      green_scale: ['#F1F8E9', '#DCEDC8', '#C5E1A5', '#AED581', '#9CCC65', '#8BC34A', '#7CB342', '#689F38', '#558B2F', '#33691E'],
      blue_scale: ['#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1'],
      viridis: ['#440154', '#482475', '#414487', '#355F8D', '#2A788E', '#21908C', '#22A884', '#42BE71', '#7AD151', '#BDDF26', '#FDE725'],
      warm: ['#FFF5EB', '#FEE6CE', '#FDD0A2', '#FDAE6B', '#FD8D3C', '#F16913', '#E6550D', '#D94801', '#A63603', '#7F2704'],
      cool: ['#F0F9FF', '#DEEBF7', '#C6DBEF', '#9ECAE1', '#6BAED6', '#4292C6', '#2171B5', '#08519C', '#08306B', '#041E42']
    };

    if (!config.conditional_formatting_enabled) {
      const palette = palettes[config.color_collection] || palettes.google;
      if (config.series_colors) {
        const custom = config.series_colors.split(',').map(c => c.trim());
        return values.map((v, i) => custom[i % custom.length]);
      }
      return values.map((v, i) => palette[i % palette.length]);
    }

    const type = config.conditional_type;

    if (type === 'gradient') {
      const min = Math.min(...values);
      const max = Math.max(...values);
      return values.map(v => {
        const ratio = (max === min) ? 0.5 : (v - min) / (max - min);
        return this.interpolateColor(
          config.gradient_start_color || '#F1F8E9',
          config.gradient_end_color || '#33691E',
          ratio
        );
      });
    } else if (type === 'topn') {
      const n = config.topbottom_n || 5;
      const sorted = [...values].sort((a, b) => b - a);
      const threshold = sorted[Math.min(n - 1, sorted.length - 1)];
      return values.map(v => v >= threshold ? (config.topn_color || '#34A853') : (config.other_color || '#9AA0A6'));
    } else if (type === 'bottomn') {
      const n = config.topbottom_n || 5;
      const sorted = [...values].sort((a, b) => a - b);
      const threshold = sorted[Math.min(n - 1, sorted.length - 1)];
      return values.map(v => v <= threshold ? (config.bottomn_color || '#EA4335') : (config.other_color || '#9AA0A6'));
    } else if (type === 'rules') {
      return values.map(v => {
        const op = config.rule1_operator;
        const val1 = config.rule1_value || 0;
        const val2 = config.rule1_value2 || 100;

        let match = false;
        if (op === 'gt') match = v > val1;
        else if (op === 'lt') match = v < val1;
        else if (op === 'eq') match = v === val1;
        else if (op === 'between') match = v >= val1 && v <= val2;

        return match ? (config.rule1_color || '#EA4335') : (config.other_color || '#9AA0A6');
      });
    }

    return palettes.google;
  },

  interpolateColor: function(color1, color2, ratio) {
    const hex = (c) => {
      c = c.replace('#', '');
      return {
        r: parseInt(c.substring(0, 2), 16),
        g: parseInt(c.substring(2, 4), 16),
        b: parseInt(c.substring(4, 6), 16)
      };
    };
    const c1 = hex(color1), c2 = hex(color2);
    const r = Math.round(c1.r + (c2.r - c1.r) * ratio);
    const g = Math.round(c1.g + (c2.g - c1.g) * ratio);
    const b = Math.round(c1.b + (c2.b - c1.b) * ratio);
    return `rgb(${r}, ${g}, ${b})`;
  },

  formatValue: function(value, config) {
    const format = config.value_format || 'auto';
    if (format === 'currency') {
      return '$' + (value >= 1000 ? (value/1000).toFixed(1) + 'K' : value.toFixed(0));
    } else if (format === 'percent') {
      return (value * 100).toFixed(1) + '%';
    } else if (format === 'decimal1') {
      return value.toFixed(1);
    } else if (format === 'decimal2') {
      return value.toFixed(2);
    } else if (format === 'number') {
      return value.toFixed(0);
    }
    // Auto
    if (value >= 1e9) return (value / 1e9).toFixed(1) + 'B';
    if (value >= 1e6) return (value / 1e6).toFixed(1) + 'M';
    if (value >= 1e3) return (value / 1e3).toFixed(1) + 'K';
    return value.toFixed(0);
  }
});
