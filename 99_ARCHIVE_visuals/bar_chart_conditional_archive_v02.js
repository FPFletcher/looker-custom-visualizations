/**
 * Conditional Bar Chart for Looker
 * Highcharts implementation with enhanced features
 */

looker.plugins.visualizations.add({
  id: "conditional_bar_chart",
  label: "Bar Chart (Conditional)",
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

    // FORMATTING SUBSECTION IN PLOT
    conditional_formatting_enabled: {
      type: "boolean",
      label: "Enable Conditional Formatting",
      default: false,
      section: "Plot",
      order: 9
    },

    conditional_formatting_help: {
      type: "string",
      label: "ℹ️ Top/Bottom N use Value 1 as N, Between uses both, Gradient uses both colors",
      display: "divider",
      section: "Plot",
      default: "",
      order: 10
    },

    // Rule 1
      rule1_enabled: {
        type: "boolean",
        label: "Rule 1: Enabled",
        default: false,
        section: "Plot",
        order: 11
      },
      rule1_type: {
        type: "string",
        label: "Type",  // ← REMOVED "Rule 1:"
        display: "select",
        values: [
          {"Greater Than": "gt"},
          {"Less Than": "lt"},
          {"Equal To": "eq"},
          {"Between": "between"},
          {"Top N": "topn"},
          {"Bottom N": "bottomn"},
          {"Color Gradient": "gradient"}
        ],
        default: "gt",
        section: "Plot",
        order: 12
      },
      rule1_value: {
        type: "number",
        label: "Value 1",  // ← SIMPLIFIED
        placeholder: "Enter value or N",
        default: 0,
        section: "Plot",
        order: 13
      },
      rule1_value2: {
        type: "number",
        label: "Value 2 (Between only)",  // ← SIMPLIFIED
        default: 100,
        section: "Plot",
        order: 14
      },
      rule1_color: {
        type: "string",
        label: "Color (or Gradient Start)",  // ← SIMPLIFIED
        default: "#EA4335",
        display: "color",
        section: "Plot",
        order: 15
      },
      rule1_color2: {
        type: "string",
        label: "Gradient End Color",  // ← SIMPLIFIED
        default: "#34A853",
        display: "color",
        section: "Plot",
        order: 16
      },

    // Rule 2
    rule2_enabled: {
      type: "boolean",
      label: "Rule 2: Enabled",
      default: false,
      section: "Plot",
      order: 21
    },
    rule2_type: {
      type: "string",
      label: "Rule 2: Type",
      display: "select",
      values: [
        {"Greater Than": "gt"},
        {"Less Than": "lt"},
        {"Equal To": "eq"},
        {"Between": "between"},
        {"Top N": "topn"},
        {"Bottom N": "bottomn"}
      ],
      default: "lt",
      section: "Plot",
      order: 22
    },
    rule2_value: {
      type: "number",
      label: "Rule 2: Value",
      default: 0,
      section: "Plot",
      order: 23
    },
    rule2_value2: {
      type: "number",
      label: "Rule 2: Value 2",
      default: 100,
      section: "Plot",
      order: 24
    },
    rule2_color: {
      type: "string",
      label: "Rule 2: Color",
      default: "#FBBC04",
      display: "color",
      section: "Plot",
      order: 25
    },

    // Rule 3
    rule3_enabled: {
      type: "boolean",
      label: "Rule 3: Enabled",
      default: false,
      section: "Plot",
      order: 31
    },
    rule3_type: {
      type: "string",
      label: "Rule 3: Type",
      display: "select",
      values: [
        {"Greater Than": "gt"},
        {"Less Than": "lt"},
        {"Equal To": "eq"},
        {"Between": "between"},
        {"Top N": "topn"},
        {"Bottom N": "bottomn"}
      ],
      default: "gt",
      section: "Plot",
      order: 32
    },
    rule3_value: {
      type: "number",
      label: "Rule 3: Value",
      default: 0,
      section: "Plot",
      order: 33
    },
    rule3_value2: {
      type: "number",
      label: "Rule 3: Value 2",
      default: 100,
      section: "Plot",
      order: 34
    },
    rule3_color: {
      type: "string",
      label: "Rule 3: Color",
      default: "#4285F4",
      display: "color",
      section: "Plot",
      order: 35
    },

    default_color: {
      type: "string",
      label: "Default Color (No Rule Match)",
      default: "#9AA0A6",
      display: "color",
      section: "Plot",
      order: 40
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
        {"Red Scale": "red_scale"},
        {"Purple Scale": "purple_scale"},
        {"Orange Scale": "orange_scale"},
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
      label: "Custom Colors (comma-separated)",
      placeholder: "#4285F4,#EA4335,#FBBC04",
      section: "Series",
      order: 2
    },
    series_labels: {
      type: "string",
      label: "Custom Series Labels",
      placeholder: "Q1,Q2,Q3,Q4",
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
        {"Outside End": "outside"},
        {"Inside End": "inside"},
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

    // ========== X AXIS SECTION ==========
    show_x_axis: {
      type: "boolean",
      label: "Show Axis",
      default: true,
      section: "X",
      order: 1
    },
    x_axis_scale_type: {
      type: "string",
      label: "Scale Type",
      display: "select",
      values: [
        {"Automatic": "auto"},
        {"Time": "time"},
        {"Categorical": "categorical"}
      ],
      default: "auto",
      section: "X",
      order: 2
    },
    x_axis_label: {
      type: "string",
      label: "Axis Title",
      placeholder: "Category",
      section: "X",
      order: 3
    },
    x_axis_label_rotation: {
      type: "number",
      label: "Label Rotation",
      default: 0,
      min: -90,
      max: 90,
      step: 15,
      section: "X",
      order: 4
    },
    x_axis_values_format: {
      type: "string",
      label: "Values Format",
      display: "select",
      values: [
        {"Auto": "auto"},
        {"Number": "number"},
        {"Compact": "compact"},
        {"Custom": "custom"}
      ],
      default: "auto",
      section: "X",
      order: 5
    },
    show_x_gridlines: {
      type: "boolean",
      label: "Show Gridlines",
      default: false,
      section: "X",
      order: 6
    },
    x_axis_tick_density: {
      type: "string",
      label: "Tick Density",
      display: "select",
      values: [
        {"Default": "default"},
        {"Compact": "compact"},
        {"Comfortable": "comfortable"},
        {"Custom": "custom"}
      ],
      default: "default",
      section: "X",
      order: 7
    },
    x_axis_tick_count: {
      type: "number",
      label: "Tick Count (if Custom)",
      default: 10,
      min: 2,
      max: 50,
      section: "X",
      order: 8
    },

    // ========== Y AXIS SECTION ==========
    show_y_axis: {
      type: "boolean",
      label: "Show Axis",
      default: true,
      section: "Y",
      order: 1
    },
    y_axis_label: {
      type: "string",
      label: "Axis Title",
      placeholder: "Value",
      section: "Y",
      order: 2
    },
    y_axis_values_format: {
      type: "string",
      label: "Values Format",
      display: "select",
      values: [
        {"Auto": "auto"},
        {"Number": "number"},
        {"Currency": "currency"},
        {"Percent": "percent"},
        {"Compact": "compact"}
      ],
      default: "auto",
      section: "Y",
      order: 3
    },
    y_axis_prefix: {
      type: "string",
      label: "Value Prefix",
      placeholder: "$",
      section: "Y",
      order: 4
    },
    y_axis_suffix: {
      type: "string",
      label: "Value Suffix",
      placeholder: "%",
      section: "Y",
      order: 5
    },
    y_axis_min: {
      type: "number",
      label: "Min Value",
      placeholder: "auto",
      section: "Y",
      order: 6
    },
    y_axis_max: {
      type: "number",
      label: "Max Value",
      placeholder: "auto",
      section: "Y",
      order: 7
    },
    show_y_gridlines: {
      type: "boolean",
      label: "Show Gridlines",
      default: true,
      section: "Y",
      order: 8
    },
    y_axis_scale: {
      type: "string",
      label: "Scale Type",
      display: "select",
      values: [
        {"Linear": "linear"},
        {"Logarithmic": "logarithmic"}
      ],
      default: "linear",
      section: "Y",
      order: 9
    },

    // Reference Lines
    ref_line_enabled: {
      type: "boolean",
      label: "Show Reference Line",
      default: false,
      section: "Y",
      order: 10
    },
    ref_line_type: {
      type: "string",
      label: "Reference Type",
      display: "select",
      values: [
        {"Custom": "custom"},
        {"Average": "average"},
        {"Median": "median"},
        {"Min": "min"},
        {"Max": "max"}
      ],
      default: "custom",
      section: "Y",
      order: 11
    },
    ref_line_value: {
      type: "number",
      label: "Reference Value",
      default: 0,
      section: "Y",
      order: 12
    },
    ref_line_label: {
      type: "string",
      label: "Reference Label",
      placeholder: "Target",
      section: "Y",
      order: 13
    },
    ref_line_color: {
      type: "string",
      label: "Reference Color",
      default: "#EA4335",
      display: "color",
      section: "Y",
      order: 14
    },

    // Trend Line
    trend_line_enabled: {
      type: "boolean",
      label: "Show Trend Line",
      default: false,
      section: "Y",
      order: 20
    },
    trend_line_type: {
      type: "string",
      label: "Trend Type",
      display: "select",
      values: [
        {"Linear": "linear"},
        {"Moving Average": "moving_avg"},
        {"Average Line": "average"}
      ],
      default: "linear",
      section: "Y",
      order: 21
    },
    trend_line_period: {
      type: "number",
      label: "Period (Moving Avg)",
      default: 3,
      min: 2,
      max: 20,
      section: "Y",
      order: 22
    },
    trend_line_color: {
      type: "string",
      label: "Trend Color",
      default: "#4285F4",
      display: "color",
      section: "Y",
      order: 23
    }
  },

  create: function(element, config) {
    element.innerHTML = '<div id="chart-container" style="width:100%; height:100%;"></div>';
    this.chart = null;
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

    // Color palettes
    const palettes = {
      google: ['#4285F4', '#EA4335', '#FBBC04', '#34A853', '#FF6D00', '#46BDC6', '#AB47BC'],
      looker: ['#7FCDAE', '#7ED09C', '#7DD389', '#85D67C', '#9AD97B', '#B1DB7A'],
      green_scale: ['#F1F8E9', '#C5E1A5', '#9CCC65', '#7CB342', '#558B2F', '#33691E'],
      blue_scale: ['#E3F2FD', '#90CAF9', '#42A5F5', '#1E88E5', '#1565C0', '#0D47A1'],
      red_scale: ['#FFEBEE', '#FFCDD2', '#EF9A9A', '#E57373', '#EF5350', '#F44336', '#E53935', '#D32F2F'],
      purple_scale: ['#F3E5F5', '#CE93D8', '#AB47BC', '#8E24AA', '#6A1B9A', '#4A148C'],
      orange_scale: ['#FFF3E0', '#FFE0B2', '#FFCC80', '#FFB74D', '#FFA726', '#FF9800', '#FB8C00', '#F57C00'],
      viridis: ['#440154', '#414487', '#2A788E', '#22A884', '#7AD151', '#FDE725'],
      warm: ['#FFF5EB', '#FDD0A2', '#FD8D3C', '#E6550D', '#A63603'],
      cool: ['#F0F9FF', '#9ECAE1', '#4292C6', '#08519C', '#08306B']
    };

    // Get colors with rule priority
    const getColors = () => {
      if (!config.conditional_formatting_enabled) {
        const palette = palettes[config.color_collection] || palettes.google;
        if (config.series_colors) {
          const custom = config.series_colors.split(',').map(c => c.trim());
          return values.map((v, i) => custom[i % custom.length]);
        }
        return values.map((v, i) => palette[i % palette.length]);
      }

      // Handle gradient separately
      if (config.rule1_enabled && config.rule1_type === 'gradient') {
        const min = Math.min(...values);
        const max = Math.max(...values);
        return values.map(v => {
          const ratio = (max === min) ? 0.5 : (v - min) / (max - min);
          return this.interpolateColor(
            config.rule1_color || '#F1F8E9',
            config.rule1_color2 || '#33691E',
            ratio
          );
        });
      }

      if (config.rule2_enabled && config.rule2_type === 'gradient') {
        const min = Math.min(...values);
        const max = Math.max(...values);
        return values.map(v => {
          const ratio = (max === min) ? 0.5 : (v - min) / (max - min);
          return this.interpolateColor(
            config.rule2_color || '#FBBC04',
            config.rule2_color2 || '#4285F4',
            ratio
          );
        });
      }

      // Apply other rules in priority
      return values.map(v => {
        if (config.rule1_enabled && this.checkRule(v, values, config, 1)) {
          return config.rule1_color;
        }
        if (config.rule2_enabled && this.checkRule(v, values, config, 2)) {
          return config.rule2_color;
        }
        if (config.rule3_enabled && this.checkRule(v, values, config, 3)) {
          return config.rule3_color;
        }
        return config.default_color || '#9AA0A6';
      });
    };

    const colors = getColors();
    const seriesData = values.map((v, i) => ({ y: v, color: colors[i] }));

    // Calculate reference value
    let refValue = config.ref_line_value || 0;
    if (config.ref_line_enabled && config.ref_line_type !== 'custom') {
      if (config.ref_line_type === 'average') refValue = values.reduce((a, b) => a + b, 0) / values.length;
      else if (config.ref_line_type === 'median') {
        const sorted = [...values].sort((a, b) => a - b);
        refValue = sorted[Math.floor(sorted.length / 2)];
      }
      else if (config.ref_line_type === 'min') refValue = Math.min(...values);
      else if (config.ref_line_type === 'max') refValue = Math.max(...values);
    }

    // Chart options
    const chartOptions = {
      chart: {
        type: config.chart_type === 'bar' ? 'bar' : 'column',
        backgroundColor: null,
        reflow: true
      },
      title: { text: null },
      xAxis: {
        categories: categories,
        visible: config.show_x_axis !== false,
        title: { text: config.x_axis_label || null },
        labels: {
          rotation: config.x_axis_label_rotation || 0,
          step: config.x_axis_tick_density === 'compact' ? Math.ceil(categories.length / 10) :
          config.x_axis_tick_density === 'comfortable' ? Math.ceil(categories.length / 20) :
          config.x_axis_tick_density === 'custom' ? Math.ceil(categories.length / (config.x_axis_tick_count || 10)) :
          undefined
        },
        gridLineWidth: config.show_x_gridlines ? 1 : 0,
        type: config.x_axis_scale_type === 'time' ? 'datetime' : 'category'
      },
      yAxis: {
        visible: config.show_y_axis !== false,
        title: { text: config.y_axis_label || null },
        min: config.y_axis_min,
        max: config.y_axis_max,
        type: config.y_axis_scale === 'logarithmic' ? 'logarithmic' : 'linear',
        gridLineWidth: config.show_y_gridlines !== false ? 1 : 0,
        plotLines: config.ref_line_enabled ? [{
          value: refValue,
          color: config.ref_line_color || '#EA4335',
          width: 2,
          dashStyle: 'Dash',
          label: {
            text: config.ref_line_label || '',
            align: 'right',
            style: { color: config.ref_line_color || '#EA4335' }
          }
        }] : []
      },
      plotOptions: {
        column: {
          stacking: config.stacking === 'none' ? undefined : config.stacking,
          groupPadding: config.group_padding || 0.1,
          pointPadding: config.point_padding || 0.1,
          colorByPoint: true,
          dataLabels: {
            enabled: config.show_labels !== false,
            align: config.label_position === 'center' ? 'center' :
            config.label_position === 'inside' ? 'center' : 'center',
            verticalAlign: config.label_position === 'center' ? 'middle' :
            config.label_position === 'inside' ? 'top' : null,
            inside: config.label_position === 'inside' || config.label_position === 'center',
            rotation: config.label_rotation || 0,
            style: {
              fontSize: (config.label_font_size || 11) + 'px',
              color: config.label_color || '#000000',
              fontWeight: 'normal'
            },
            formatter: function() {
              const format = config.value_format || 'auto';
              const value = this.y;
              if (!value && value !== 0) return '';

              if (format === 'currency') return '$' + (value >= 1000 ? (value/1000).toFixed(1) + 'K' : value.toFixed(0));
              if (format === 'percent') return (value * 100).toFixed(1) + '%';
              if (format === 'decimal1') return value.toFixed(1);
              if (format === 'decimal2') return value.toFixed(2);
              if (format === 'number') return value.toFixed(0);

              if (value >= 1e9) return (value / 1e9).toFixed(1) + 'B';
              if (value >= 1e6) return (value / 1e6).toFixed(1) + 'M';
              if (value >= 1e3) return (value / 1e3).toFixed(1) + 'K';
              return value.toFixed(0);
            }
          }
        },  // ← CLOSE column with comma
        bar: {
          stacking: config.stacking === 'none' ? undefined : config.stacking,
          groupPadding: config.group_padding || 0.1,
          pointPadding: config.point_padding || 0.1,
          colorByPoint: true,
          dataLabels: {
            enabled: config.show_labels !== false,
            align: config.label_position === 'center' ? 'center' :
            config.label_position === 'inside' ? 'center' : 'center',
            verticalAlign: config.label_position === 'center' ? 'middle' :
            config.label_position === 'inside' ? 'top' : null,
            inside: config.label_position === 'inside' || config.label_position === 'center',
            rotation: config.label_rotation || 0,
            style: {
              fontSize: (config.label_font_size || 11) + 'px',
              color: config.label_color || '#000000',
              fontWeight: 'normal'
            },
            formatter: function() {
              const format = config.value_format || 'auto';
              const value = this.y;
              if (!value && value !== 0) return '';

              if (format === 'currency') return '$' + (value >= 1000 ? (value/1000).toFixed(1) + 'K' : value.toFixed(0));
              if (format === 'percent') return (value * 100).toFixed(1) + '%';
              if (format === 'decimal1') return value.toFixed(1);
              if (format === 'decimal2') return value.toFixed(2);
              if (format === 'number') return value.toFixed(0);

              if (value >= 1e9) return (value / 1e9).toFixed(1) + 'B';
              if (value >= 1e6) return (value / 1e6).toFixed(1) + 'M';
              if (value >= 1e3) return (value / 1e3).toFixed(1) + 'K';
              return value.toFixed(0);
            }
          }
        }  // ← CLOSE bar, NO comma (last property)
      },  // ← CLOSE plotOptions with comma
      legend: { enabled: false },
      tooltip: {
        formatter: function() {
          const format = config.value_format || 'auto';
          const value = this.y;
          if (!value && value !== 0) return `<b>${this.x}</b><br/>`;

          let formattedValue = '';
          if (format === 'currency') formattedValue = '$' + (value >= 1000 ? (value/1000).toFixed(1) + 'K' : value.toFixed(0));
          else if (format === 'percent') formattedValue = (value * 100).toFixed(1) + '%';
          else if (format === 'decimal1') formattedValue = value.toFixed(1);
          else if (format === 'decimal2') formattedValue = value.toFixed(2);
          else if (format === 'number') formattedValue = value.toFixed(0);
          else if (value >= 1e9) formattedValue = (value / 1e9).toFixed(1) + 'B';
          else if (value >= 1e6) formattedValue = (value / 1e6).toFixed(1) + 'M';
          else if (value >= 1e3) formattedValue = (value / 1e3).toFixed(1) + 'K';
          else formattedValue = value.toFixed(0);

          return `<b>${this.x}</b><br/>${formattedValue}`;
        }
      },
      series: [{ name: queryResponse.fields.measures[0].label || measure, data: seriesData }]
    };  // ← SEMICOLON here to end const declaration

    // Add trend line AFTER chartOptions is defined
    if (config.trend_line_enabled) {
      let trendData = [];

      if (config.trend_line_type === 'linear') {
        const n = values.length;
        const sumX = values.reduce((sum, v, i) => sum + i, 0);
        const sumY = values.reduce((sum, v) => sum + v, 0);
        const sumXY = values.reduce((sum, v, i) => sum + i * v, 0);
        const sumX2 = values.reduce((sum, v, i) => sum + i * i, 0);
        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;
        trendData = values.map((v, i) => slope * i + intercept);
      } else if (config.trend_line_type === 'moving_avg') {
        const period = config.trend_line_period || 3;
        trendData = values.map((v, i) => {
          const start = Math.max(0, i - period + 1);
          const subset = values.slice(start, i + 1);
          return subset.reduce((a, b) => a + b, 0) / subset.length;
        });
      } else if (config.trend_line_type === 'average') {
        const avg = values.reduce((a, b) => a + b, 0) / values.length;
        trendData = values.map(() => avg);
      }

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
      this.chart.update(chartOptions, true);
    }

    done();
  },

    checkRule: function(value, allValues, config, ruleNum) {
      const type = config[`rule${ruleNum}_type`];
      const val1 = config[`rule${ruleNum}_value`] || 0;
      const val2 = config[`rule${ruleNum}_value2`] || 100;

      if (type === 'gt') return value > val1;
      if (type === 'lt') return value < val1;
      if (type === 'eq') return value === val1;
      if (type === 'between') return value >= val1 && value <= val2;

      if (type === 'topn') {
        const n = Math.floor(val1);  // ← USE val1 as N
        if (n <= 0) return false;
        const sorted = [...allValues].sort((a, b) => b - a);
        const threshold = sorted[Math.min(n - 1, sorted.length - 1)];
        return value >= threshold;
      }

      if (type === 'bottomn') {
        const n = Math.floor(val1);  // ← USE val1 as N
        if (n <= 0) return false;
        const sorted = [...allValues].sort((a, b) => a - b);
        const threshold = sorted[Math.min(n - 1, sorted.length - 1)];
        return value <= threshold;
      }

      return false;
    },

  formatValue: function(value, config) {
      if (value === undefined || value === null || isNaN(value)) {
      return '';
    }
    const format = config.value_format || 'auto';
    if (format === 'currency') return '$' + (value >= 1000 ? (value/1000).toFixed(1) + 'K' : value.toFixed(0));
    if (format === 'percent') return (value * 100).toFixed(1) + '%';
    if (format === 'decimal1') return value.toFixed(1);
    if (format === 'decimal2') return value.toFixed(2);
    if (format === 'number') return value.toFixed(0);

    if (value >= 1e9) return (value / 1e9).toFixed(1) + 'B';
    if (value >= 1e6) return (value / 1e6).toFixed(1) + 'M';
    if (value >= 1e3) return (value / 1e3).toFixed(1) + 'K';
    return value.toFixed(0);
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
    return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
  }
});
