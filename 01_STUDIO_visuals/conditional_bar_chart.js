/**
 * Conditional Bar Chart for Looker
 * Advanced column chart with conditional formatting and gradient options
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
      label: "Series Colors Override (comma-separated hex)",
      placeholder: "#4285F4,#EA4335,#FBBC04",
      section: "Series",
      order: 2
    },
    series_labels: {
      type: "string",
      label: "Series Labels Override (comma-separated)",
      placeholder: "Sales,Returns,Profit",
      section: "Series",
      order: 3
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
      label: "Label Rotation (degrees)",
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
    // Gradient options
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
    // Top/Bottom N options
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
    // Rules based
    num_rules: {
      type: "number",
      label: "Number of Rules",
      default: 1,
      min: 1,
      max: 5,
      section: "Formatting",
      order: 9
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
      order: 10
    },
    rule1_value: {
      type: "number",
      label: "Rule 1: Value",
      default: 0,
      section: "Formatting",
      order: 11
    },
    rule1_value2: {
      type: "number",
      label: "Rule 1: Value 2 (for Between)",
      default: 100,
      section: "Formatting",
      order: 12
    },
    rule1_color: {
      type: "string",
      label: "Rule 1: Color",
      default: "#EA4335",
      display: "color",
      section: "Formatting",
      order: 13
    },
    // Background formatting
    background_enabled: {
      type: "boolean",
      label: "Enable Background Formatting",
      default: false,
      section: "Formatting",
      order: 20
    },
    background_color: {
      type: "string",
      label: "Background Color",
      default: "#FFFFFF",
      display: "color",
      section: "Formatting",
      order: 21
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
      default: 1,
      min: 0,
      max: 10,
      section: "Formatting",
      order: 24
    },

    // ========== AXIS SECTION ==========
    // X Axis
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
    // Y Axis
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
    // Reference Lines
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
    // Trend Line
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
        {"Polynomial": "polynomial"},
        {"Exponential": "exponential"}
      ],
      default: "linear",
      section: "Axis",
      order: 16
    },
    trend_line_color: {
      type: "string",
      label: "Trend Line Color",
      default: "#4285F4",
      display: "color",
      section: "Axis",
      order: 17
    }
  },

  create: function(element, config) {
    const style = document.createElement('style');
    style.innerHTML = `
      .conditional-chart-container {
        width: 100%;
        height: 100%;
        position: relative;
        font-family: 'Roboto', Arial, sans-serif;
      }
      #chart-container {
        width: 100%;
        height: 100%;
      }
    `;

    if (!document.getElementById('conditional-chart-styles')) {
      style.id = 'conditional-chart-styles';
      document.head.appendChild(style);
    }

    element.innerHTML = `
      <div class="conditional-chart-container">
        <div id="chart-container"></div>
      </div>
    `;

    this.chart = null;
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    this.clearErrors();

    if (!queryResponse || queryResponse.fields.dimensions.length < 1 || queryResponse.fields.measures.length < 1) {
      this.addError({
        title: 'Invalid Data',
        message: 'This chart requires at least 1 dimension and 1 measure.'
      });
      done();
      return;
    }

    // Extract data
    const dimension = queryResponse.fields.dimensions[0].name;
    const measure = queryResponse.fields.measures[0].name;
    const categories = data.map(row => row[dimension].value);
    const values = data.map(row => row[measure].value);

    // Color palettes
    const palettes = {
      google: ['#4285F4', '#EA4335', '#FBBC04', '#34A853', '#FF6D00', '#46BDC6', '#AB47BC'],
      looker: ['#7FCDAE', '#7ED09C', '#7DD389', '#85D67C', '#9AD97B', '#B1DB7A'],
      green_scale: ['#F1F8E9', '#DCEDC8', '#C5E1A5', '#AED581', '#9CCC65', '#8BC34A', '#7CB342', '#689F38', '#558B2F', '#33691E'],
      blue_scale: ['#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1'],
      viridis: ['#440154', '#482475', '#414487', '#355F8D', '#2A788E', '#21908C', '#22A884', '#42BE71', '#7AD151', '#BDDF26', '#FDE725'],
      warm: ['#FFF5EB', '#FEE6CE', '#FDD0A2', '#FDAE6B', '#FD8D3C', '#F16913', '#E6550D', '#D94801', '#A63603', '#7F2704'],
      cool: ['#F0F9FF', '#DEEBF7', '#C6DBEF', '#9ECAE1', '#6BAED6', '#4292C6', '#2171B5', '#08519C', '#08306B', '#041E42']
    };

    // Get colors based on conditional formatting
    const getColors = () => {
      if (!config.conditional_formatting_enabled) {
        // Use series colors
        const basePalette = palettes[config.color_collection] || palettes.google;
        if (config.series_colors) {
          const customColors = config.series_colors.split(',').map(c => c.trim());
          return values.map((v, i) => customColors[i % customColors.length]);
        }
        return values.map((v, i) => basePalette[i % basePalette.length]);
      }

      const type = config.conditional_type;

      if (type === 'gradient') {
        // Color gradient
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
        // Top N
        const n = config.topbottom_n || 5;
        const sorted = [...values].sort((a, b) => b - a);
        const threshold = sorted[Math.min(n - 1, sorted.length - 1)];
        return values.map(v => v >= threshold ? (config.topn_color || '#34A853') : (config.other_color || '#9AA0A6'));
      } else if (type === 'bottomn') {
        // Bottom N
        const n = config.topbottom_n || 5;
        const sorted = [...values].sort((a, b) => a - b);
        const threshold = sorted[Math.min(n - 1, sorted.length - 1)];
        return values.map(v => v <= threshold ? (config.bottomn_color || '#EA4335') : (config.other_color || '#9AA0A6'));
      } else if (type === 'rules') {
        // Rules based
        return values.map(v => {
          const operator = config.rule1_operator;
          const value1 = config.rule1_value || 0;
          const value2 = config.rule1_value2 || 100;

          let match = false;
          if (operator === 'gt') match = v > value1;
          else if (operator === 'lt') match = v < value1;
          else if (operator === 'eq') match = v === value1;
          else if (operator === 'between') match = v >= value1 && v <= value2;

          return match ? (config.rule1_color || '#EA4335') : (config.other_color || '#9AA0A6');
        });
      }

      return palettes.google;
    };

    // Format value
    const formatValue = (value) => {
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
    };

    const colors = getColors();
    const seriesData = values.map((v, i) => ({
      y: v,
      color: colors[i]
    }));

    // Chart options
    const chartOptions = {
      chart: {
        type: config.chart_type === 'bar' ? 'bar' : 'column',
        backgroundColor: config.background_enabled ? config.background_color : null,
        borderColor: config.border_enabled ? config.border_color : null,
        borderWidth: config.border_enabled ? (config.border_width || 0) : 0,
        reflow: true
      },
      title: { text: null },
      xAxis: {
        categories: categories,
        visible: config.show_x_axis !== false,
        title: {
          text: config.x_axis_label || null
        },
        labels: {
          rotation: config.x_axis_label_rotation || 0
        },
        gridLineWidth: config.show_x_gridlines ? 1 : 0
      },
      yAxis: {
        visible: config.show_y_axis !== false,
        title: {
          text: config.y_axis_label || null
        },
        min: config.y_axis_min !== undefined ? config.y_axis_min : undefined,
        max: config.y_axis_max !== undefined ? config.y_axis_max : undefined,
        type: config.y_axis_scale === 'logarithmic' ? 'logarithmic' : 'linear',
        gridLineWidth: config.show_y_gridlines !== false ? 1 : 0,
        plotLines: config.show_reference_line ? [{
          value: config.reference_line_value || 0,
          color: config.reference_line_color || '#EA4335',
          width: 2,
          label: {
            text: config.reference_line_label || '',
            align: 'right'
          }
        }] : []
      },
      plotOptions: {
        column: {
          stacking: config.stacking === 'none' ? undefined : config.stacking,
          groupPadding: config.group_padding !== undefined ? config.group_padding : 0.1,
          pointPadding: config.point_padding !== undefined ? config.point_padding : 0.1,
          colorByPoint: true,
          dataLabels: {
            enabled: config.show_labels !== false,
            rotation: config.label_rotation || 0,
            style: {
              fontSize: (config.label_font_size || 11) + 'px',
              color: config.label_color || '#000000',
              fontWeight: 'normal'
            },
            formatter: function() {
              return formatValue(this.y);
            }
          }
        },
        bar: {
          stacking: config.stacking === 'none' ? undefined : config.stacking,
          groupPadding: config.group_padding !== undefined ? config.group_padding : 0.1,
          pointPadding: config.point_padding !== undefined ? config.point_padding : 0.1,
          colorByPoint: true,
          dataLabels: {
            enabled: config.show_labels !== false,
            rotation: config.label_rotation || 0,
            style: {
              fontSize: (config.label_font_size || 11) + 'px',
              color: config.label_color || '#000000',
              fontWeight: 'normal'
            },
            formatter: function() {
              return formatValue(this.y);
            }
          }
        }
      },
      legend: { enabled: false },
      tooltip: {
        formatter: function() {
          return `<b>${this.x}</b><br/>${formatValue(this.y)}`;
        }
      },
      series: [{
        name: queryResponse.fields.measures[0].label || measure,
        data: seriesData
      }]
    };

    // Add trend line if enabled
    if (config.show_trend_line) {
      // Simple linear regression
      const n = values.length;
      const sumX = values.reduce((sum, v, i) => sum + i, 0);
      const sumY = values.reduce((sum, v) => sum + v, 0);
      const sumXY = values.reduce((sum, v, i) => sum + i * v, 0);
      const sumX2 = values.reduce((sum, v, i) => sum + i * i, 0);

      const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
      const intercept = (sumY - slope * sumX) / n;

      const trendData = values.map((v, i) => slope * i + intercept);

      chartOptions.series.push({
        type: 'line',
        name: 'Trend',
        data: trendData,
        color: config.trend_line_color || '#4285F4',
        marker: { enabled: false },
        enableMouseTracking: false,
        dashStyle: 'Dash'
      });
    }

    // Create or update chart
    if (!this.chart) {
      this.chart = Highcharts.chart('chart-container', chartOptions);
    } else {
      this.chart.update(chartOptions, true, true);
    }

    done();
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
  }
});
