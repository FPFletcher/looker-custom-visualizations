/**
 * Conditional Bar Chart for Looker
 * Highcharts implementation with enhanced features
 * FINAL VERSION - All value labels fixed
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
        {"Bar": "bar"},
        {"Area": "area"},
        {"Line": "line"}
      ],
      default: "column",
      section: "Plot",
      order: 1
    },
    series_positioning: {
      type: "string",
      label: "Series Positioning",
      display: "select",
      values: [
        {"Grouped": "grouped"},
        {"Stacked": "stacked"},
        {"Stacked Percentage": "percent"}
      ],
      default: "grouped",
      section: "Plot",
      order: 2
    },
    group_padding: {
      type: "number",
      label: "Group Padding (%)",
      default: 10,
      min: 0,
      max: 50,
      step: 1,
      section: "Plot",
      order: 3
    },
    point_padding: {
      type: "number",
      label: "Point Padding (%)",
      default: 10,
      min: 0,
      max: 50,
      step: 1,
      section: "Plot",
      order: 4
    },

    default_color: {
      type: "string",
      label: "Default Color (No Rule Match)",
      default: "#9AA0A6",
      display: "color",
      section: "Plot",
      order: 5
    },

    conditional_formatting_enabled: {
      type: "boolean",
      label: "Enable Conditional Formatting",
      default: false,
      section: "Plot",
      order: 9
    },

    conditional_formatting_apply_to: {
      type: "string",
      label: "Apply Formatting To",
      display: "select",
      values: [
        {"First Measure Only": "first"},
        {"All Measures": "all"}
      ],
      default: "first",
      section: "Plot",
      order: 10
    },

    conditional_formatting_help: {
      type: "string",
      label: "ℹ️ Top/Bottom N use Value 1 as N, Between uses both, Gradient uses both colors",
      display: "text",
      section: "Plot",
      default: "",
      order: 11
    },

    // Rule 1
    rule1_enabled: {
      type: "boolean",
      label: "Rule 1: Enabled",
      default: false,
      section: "Plot",
      order: 12
    },
    rule1_type: {
      type: "string",
      label: "Type",
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
      order: 13
    },
    rule1_value: {
      type: "number",
      label: "Value 1",
      placeholder: "Enter value or N",
      default: 5,
      section: "Plot",
      order: 14
    },
    rule1_value2: {
      type: "number",
      label: "Value 2 (Between only)",
      default: 100,
      section: "Plot",
      order: 15
    },
    rule1_color: {
      type: "string",
      label: "Color (or Gradient Start)",
      default: "#EA4335",
      display: "color",
      section: "Plot",
      order: 16
    },
    rule1_color2: {
      type: "string",
      label: "Gradient End Color",
      default: "#34A853",
      display: "color",
      section: "Plot",
      order: 17
    },
    rule1_legend_label: {
      type: "string",
      label: "Legend Label (optional)",
      placeholder: "e.g., High Performers",
      section: "Plot",
      order: 18
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
      label: "Type",
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
      default: "lt",
      section: "Plot",
      order: 22
    },
    rule2_value: {
      type: "number",
      label: "Value 1",
      placeholder: "Enter value or N",
      default: 5,
      section: "Plot",
      order: 23
    },
    rule2_value2: {
      type: "number",
      label: "Value 2 (Between only)",
      default: 100,
      section: "Plot",
      order: 24
    },
    rule2_color: {
      type: "string",
      label: "Color (or Gradient Start)",
      default: "#FBBC04",
      display: "color",
      section: "Plot",
      order: 25
    },
    rule2_color2: {
      type: "string",
      label: "Gradient End Color",
      default: "#4285F4",
      display: "color",
      section: "Plot",
      order: 26
    },
    rule2_legend_label: {
      type: "string",
      label: "Legend Label (optional)",
      placeholder: "e.g., Medium Performers",
      section: "Plot",
      order: 27
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
      label: "Type",
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
      order: 32
    },
    rule3_value: {
      type: "number",
      label: "Value 1",
      placeholder: "Enter value or N",
      default: 5,
      section: "Plot",
      order: 33
    },
    rule3_value2: {
      type: "number",
      label: "Value 2 (Between only)",
      default: 100,
      section: "Plot",
      order: 34
    },
    rule3_color: {
      type: "string",
      label: "Color (or Gradient Start)",
      default: "#4285F4",
      display: "color",
      section: "Plot",
      order: 35
    },
    rule3_color2: {
      type: "string",
      label: "Gradient End Color",
      default: "#34A853",
      display: "color",
      section: "Plot",
      order: 36
    },
    rule3_legend_label: {
      type: "string",
      label: "Legend Label (optional)",
      placeholder: "e.g., Low Performers",
      section: "Plot",
      order: 37
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
      label: "Custom Series Labels (comma-separated)",
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
    show_total_labels: {
      type: "boolean",
      label: "Show Total Labels (Stacked)",
      default: false,
      section: "Values",
      order: 7
    },
    total_label_color: {
      type: "string",
      label: "Total Label Color",
      default: "#000000",
      display: "color",
      section: "Values",
      order: 8
    },

    // ========== X AXIS SECTION ==========
    show_x_axis: {
      type: "boolean",
      label: "Show Axis",
      default: true,
      section: "X",
      order: 1
    },
    x_axis_label: {
      type: "string",
      label: "Axis Title",
      placeholder: "Category",
      section: "X",
      order: 2
    },
    x_axis_label_rotation: {
      type: "number",
      label: "Label Rotation",
      default: -45,
      min: -90,
      max: 90,
      step: 15,
      section: "X",
      order: 3
    },
    show_x_gridlines: {
      type: "boolean",
      label: "Show Gridlines",
      default: false,
      section: "X",
      order: 4
    },
    x_axis_scale_type: {
      type: "string",
      label: "Scale Type",
      display: "select",
      values: [
        {"Automatic": "auto"},
        {"Time": "datetime"},
        {"Categorical": "category"}
      ],
      default: "auto",
      section: "X",
      order: 5
    },
    x_axis_datetime_format: {
      type: "string",
      label: "Date Format",
      display: "select",
      values: [
        {"Auto": "auto"},
        {"Year (2024)": "%Y"},
        {"Month-Year (Jan 2024)": "%b %Y"},
        {"Month (January)": "%B"},
        {"Month Short (Jan)": "%b"},
        {"Day-Month (15 Jan)": "%d %b"},
        {"Full Date (2024-01-15)": "%Y-%m-%d"},
        {"Custom": "custom"}
      ],
      default: "%b",
      section: "X",
      order: 6
    },
    x_axis_custom_format: {
      type: "string",
      label: "Custom Format String",
      placeholder: "%Y-%m",
      section: "X",
      order: 7
    },
    x_axis_tick_density: {
      type: "string",
      label: "Tick Density",
      display: "select",
      values: [
        {"Default": "default"},
        {"Compact": "compact"},
        {"Comfortable": "comfortable"}
      ],
      default: "default",
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
    y_axis_min: {
      type: "number",
      label: "Min Value",
      placeholder: "auto",
      section: "Y",
      order: 3
    },
    y_axis_max: {
      type: "number",
      label: "Max Value",
      placeholder: "auto",
      section: "Y",
      order: 4
    },
    show_y_gridlines: {
      type: "boolean",
      label: "Show Gridlines",
      default: true,
      section: "Y",
      order: 5
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
      order: 6
    },

    // Reference Lines
    ref_line_enabled: {
      type: "boolean",
      label: "Show Reference Line",
      default: false,
      section: "Y",
      order: 10
    },
    ref_line_apply_to: {
      type: "string",
      label: "Calculate From",
      display: "select",
      values: [
        {"First Measure": "first"},
        {"All Measures": "all"},
        {"Stacked Measures": "stacked"}
      ],
      default: "first",
      section: "Y",
      order: 11
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
      order: 12
    },
    ref_line_value: {
      type: "number",
      label: "Reference Value",
      default: 0,
      section: "Y",
      order: 13
    },
    ref_line_title: {
      type: "string",
      label: "Reference Title",
      placeholder: "Target",
      section: "Y",
      order: 14
    },
    ref_line_color: {
      type: "string",
      label: "Reference Color",
      default: "#EA4335",
      display: "color",
      section: "Y",
      order: 15
    },
    ref_line_title_bg: {
      type: "string",
      label: "Title Background Color",
      default: "#FFFFFF",
      display: "color",
      section: "Y",
      order: 16
    },

    // Trend Line
    trend_line_enabled: {
      type: "boolean",
      label: "Show Trend Line",
      default: false,
      section: "Y",
      order: 20
    },
    trend_line_apply_to: {
      type: "string",
      label: "Calculate From",
      display: "select",
      values: [
        {"First Measure": "first"},
        {"All Measures": "all"},
        {"Stacked Measures": "stacked"}
      ],
      default: "first",
      section: "Y",
      order: 21
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
      order: 22
    },
    trend_line_period: {
      type: "number",
      label: "Period (Moving Avg)",
      default: 3,
      min: 2,
      max: 20,
      section: "Y",
      order: 23
    },
    trend_line_color: {
      type: "string",
      label: "Trend Line Color",
      default: "#4285F4",
      display: "color",
      section: "Y",
      order: 24
    },
    trend_line_label_color: {
      type: "string",
      label: "Label Color",
      default: "#4285F4",
      display: "color",
      section: "Y",
      order: 25
    },
    trend_line_title: {
      type: "string",
      label: "Trend Line Title",
      placeholder: "Trend",
      default: "Trend",
      section: "Y",
      order: 26
    },
    trend_line_title_bg: {
      type: "string",
      label: "Title Background Color",
      default: "#FFFFFF",
      display: "color",
      section: "Y",
      order: 27
    },
    trend_line_show_label: {
      type: "boolean",
      label: "Show Value Labels",
      default: false,
      section: "Y",
      order: 28
    }
  },

  create: function(element, config) {
    element.style.height = '100%';
    element.style.width = '100%';
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.innerHTML = '<div id="chart-container" style="width:100%; height:100%;"></div>';
    this._chartContainer = element.querySelector('#chart-container');
    this.chart = null;
    this._resizeObserver = new ResizeObserver(() => {
      if (this.chart) this.chart.reflow();
    });
    this._resizeObserver.observe(element);
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    this.clearErrors();

    if (!queryResponse || queryResponse.fields.dimensions.length < 1 || queryResponse.fields.measures.length < 1) {
      this.addError({ title: 'Invalid Data', message: 'Chart requires 1 dimension and at least 1 measure.' });
      done();
      return;
    }

    const dimension = queryResponse.fields.dimensions[0].name;
    const categories = data.map(row => LookerCharts.Utils.textForCell(row[dimension]));
    const measures = queryResponse.fields.measures.map(m => m.name);
    const hasPivot = queryResponse.fields.pivots && queryResponse.fields.pivots.length > 0;

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
      cool: ['#F0F9FF', '#DEEBF7', '#C6DBEF', '#9ECAE1', '#6BAED6', '#4292C6', '#2171B5', '#08519C', '#08306B']
    };

    const customLabels = config.series_labels ? String(config.series_labels).split(',').map(l => l.trim()) : null;
    const palette = palettes[config.color_collection] || palettes.google;
    const customColors = config.series_colors ? String(config.series_colors).split(',').map(c => c.trim()) : null;

    // Create inline formatter function
    const createFormatter = (valueFormat) => {
      return function() {
        const num = this.y;
        if (num === undefined || num === null || isNaN(num)) return '';
        const format = valueFormat || 'auto';
        if (format === 'currency') return '$' + (num >= 1000 ? (num / 1000).toFixed(1) + 'K' : num.toFixed(0));
        if (format === 'percent') return (num * 100).toFixed(1) + '%';
        if (format === 'decimal1') return num.toFixed(1);
        if (format === 'decimal2') return num.toFixed(2);
        if (format === 'number') return num.toLocaleString();
        if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
        if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
        if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
        return num.toLocaleString();
      };
    };

    let seriesData = [];
    if (hasPivot) {
      const pivotValues = queryResponse.pivots;
      pivotValues.forEach((pivotValue, pivotIndex) => {
        measures.forEach((measure, measureIndex) => {
          const values = data.map((row, i) => {
            const cell = row[measure][pivotValue.key];
            return { y: cell && cell.value !== null ? Number(cell.value) : null, drillLinks: cell ? cell.links : [], categoryIndex: i };
          });
          const seriesIndex = pivotIndex * measures.length + measureIndex;
          seriesData.push({
            name: customLabels && customLabels[seriesIndex] ? customLabels[seriesIndex] : `${queryResponse.fields.measures[measureIndex].label_short || queryResponse.fields.measures[measureIndex].label} - ${pivotValue.key}`,
            data: values,
            color: customColors ? customColors[seriesIndex % customColors.length] : palette[seriesIndex % palette.length]
          });
        });
      });
    } else {
      measures.forEach((measure, index) => {
        const values = data.map((row, i) => {
          const cell = row[measure];
          return { y: cell && cell.value !== null ? Number(cell.value) : null, drillLinks: cell ? cell.links : [], categoryIndex: i };
        });

        const applyFormatting = config.conditional_formatting_enabled && (config.conditional_formatting_apply_to === 'all' || index === 0);
        const baseColor = customColors ? customColors[index % customColors.length] : palette[index % palette.length];

        if (applyFormatting) {
          const rawValues = values.map(v => v.y);
          const colors = this.getColors(rawValues, config);
          seriesData.push({
            name: customLabels && customLabels[index] ? customLabels[index] : queryResponse.fields.measures[index].label_short || queryResponse.fields.measures[index].label,
            data: values.map((v, i) => ({ ...v, color: colors[i] })),
            colorByPoint: true
          });
        } else {
          seriesData.push({
            name: customLabels && customLabels[index] ? customLabels[index] : queryResponse.fields.measures[index].label_short || queryResponse.fields.measures[index].label,
            data: values,
            color: baseColor
          });
        }
      });
    }

    // Calculate stacked totals
    const stackedTotals = categories.map((cat, i) => {
      return seriesData.reduce((sum, series) => {
        const val = series.data[i] && typeof series.data[i].y === 'number' ? series.data[i].y : 0;
        return sum + val;
      }, 0);
    });

    // Calculate reference value
    let refValue = config.ref_line_value || 0;
    if (config.ref_line_enabled && config.ref_line_type !== 'custom') {
      let valuesToConsider;
      if (config.ref_line_apply_to === 'stacked') {
        valuesToConsider = stackedTotals.filter(v => v > 0);
      } else if (config.ref_line_apply_to === 'all') {
        valuesToConsider = seriesData.flatMap(s => s.data.map(d => d.y)).filter(v => typeof v === 'number');
      } else {
        valuesToConsider = seriesData[0].data.map(d => d.y).filter(y => typeof y === 'number');
      }

      if (valuesToConsider.length > 0) {
        if (config.ref_line_type === 'average') refValue = valuesToConsider.reduce((a, b) => a + b, 0) / valuesToConsider.length;
        else if (config.ref_line_type === 'median') {
          valuesToConsider.sort((a, b) => a - b);
          const mid = Math.floor(valuesToConsider.length / 2);
          refValue = valuesToConsider.length % 2 !== 0 ? valuesToConsider[mid] : (valuesToConsider[mid - 1] + valuesToConsider[mid]) / 2;
        } else if (config.ref_line_type === 'min') refValue = Math.min(...valuesToConsider);
        else if (config.ref_line_type === 'max') refValue = Math.max(...valuesToConsider);
      }
    }

    const formattedRefValue = this.formatValue(refValue, config);

    // Stacking & Chart Type
    let stackingMode = undefined;
    if (config.series_positioning === 'stacked') stackingMode = 'normal';
    else if (config.series_positioning === 'percent') stackingMode = 'percent';

    const isBar = config.chart_type === 'bar';
    const baseType = config.chart_type || 'column';
    const groupPadding = (config.group_padding || 10) / 100;
    const pointPadding = (config.point_padding || 10) / 100;

    let tickInterval = undefined;
    if (config.x_axis_tick_density === 'compact') tickInterval = Math.ceil(categories.length / 10);
    if (config.x_axis_tick_density === 'comfortable') tickInterval = Math.ceil(categories.length / 5);

    // Build legend items for rules
    const ruleLegendItems = [];
    if (config.conditional_formatting_enabled) {
      [1, 2, 3].forEach(ruleNum => {
        if (config[`rule${ruleNum}_enabled`] && config[`rule${ruleNum}_type`] !== 'gradient') {
          ruleLegendItems.push({
            name: config[`rule${ruleNum}_legend_label`] || `Rule ${ruleNum}`,
            color: config[`rule${ruleNum}_color`],
            type: 'dummy'
          });
        }
      });
    }

    const chartOptions = {
      chart: { type: baseType, backgroundColor: 'transparent', spacing: [10, 10, 10, 10] },
      title: { text: null },
      credits: { enabled: false },
      xAxis: {
        categories: categories,
        type: 'category',
        title: { text: config.x_axis_label || null },
        labels: { rotation: isBar ? 0 : (config.x_axis_label_rotation || -45) },
        tickInterval: tickInterval,
        gridLineWidth: config.show_x_gridlines ? 1 : 0,
        tickmarkPlacement: 'on'
      },
      yAxis: {
        title: { text: config.y_axis_label || null },
        min: config.y_axis_min !== undefined ? config.y_axis_min : null,
        max: config.y_axis_max !== undefined ? config.y_axis_max : null,
        gridLineWidth: config.show_y_gridlines !== false ? 1 : 0,
        stackLabels: {
          enabled: config.show_total_labels === true && !!stackingMode,
          style: {
            fontWeight: 'bold',
            color: config.total_label_color || '#000000',
            textOutline: 'none'
          },
          formatter: function() {
            const num = this.total;
            const format = config.value_format || 'auto';
            if (format === 'currency') return '$' + (num >= 1000 ? (num / 1000).toFixed(1) + 'K' : num.toFixed(0));
            if (format === 'percent') return (num * 100).toFixed(1) + '%';
            if (format === 'decimal1') return num.toFixed(1);
            if (format === 'decimal2') return num.toFixed(2);
            if (format === 'number') return num.toLocaleString();
            if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
            if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
            if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
            return num.toLocaleString();
          }
        },
        plotLines: config.ref_line_enabled ? [{
          value: refValue,
          color: config.ref_line_color || '#EA4335',
          width: 2,
          zIndex: 5,
          dashStyle: 'Dash',
          label: {
            useHTML: true,
            text: `<span style="background-color: ${config.ref_line_title_bg || '#FFFFFF'};
                           color: ${config.ref_line_color || '#EA4335'};
                           padding: 4px;
                           border: 1px solid ${config.ref_line_color || '#EA4335'};
                           border-radius: 3px;
                           font-weight: bold;
                           white-space: nowrap;">${config.ref_line_title || 'Reference'}: ${formattedRefValue}</span>`,
            align: isBar ? 'left' : 'right',
            verticalAlign: isBar ? 'middle' : 'bottom',
            rotation: 0,
            y: isBar ? 0 : -5,
            x: isBar ? 10 : -10,
            style: {
              textOutline: 'none'
            }
          }
        }] : []
      },
      plotOptions: {
        series: {
          stacking: stackingMode,
          cursor: 'pointer',
          point: {
            events: {
              click: function (e) {
                if (this.drillLinks) LookerCharts.Utils.openDrillMenu({ links: this.drillLinks, event: e });
              }
            }
          },
          dataLabels: {
            enabled: config.show_labels === true,
            align: config.label_position === 'outside' ? 'center' :
                   config.label_position === 'inside' ? 'center' : 'center',
            verticalAlign: config.label_position === 'outside' ? null :
                            config.label_position === 'inside' ? 'top' : 'middle',
            inside: config.label_position === 'inside' || config.label_position === 'center',
            rotation: config.label_rotation || 0,
            style: {
              color: config.label_color || '#000000',
              fontSize: (config.label_font_size || 11) + 'px',
              textOutline: 'none',
              fontWeight: 'normal'
            },
            formatter: createFormatter(config.value_format)
          }
        },
        column: { groupPadding, pointPadding, borderWidth: 0 },
        bar: { groupPadding, pointPadding, borderWidth: 0 },
        area: { marker: { enabled: false } },
        line: { marker: { enabled: true, radius: 3 } }
      },
      legend: {
        enabled: seriesData.length > 1 || ruleLegendItems.length > 0,
        align: 'center',
        verticalAlign: 'bottom'
      },
      series: [...seriesData, ...ruleLegendItems.map(item => ({
        name: item.name,
        color: item.color,
        type: 'line',
        data: [],
        showInLegend: true,
        enableMouseTracking: false
      }))]
    };

    // TRENDLINE
    if (config.trend_line_enabled && seriesData.length > 0) {
      let trendSourceData;
      if (config.trend_line_apply_to === 'stacked') {
        trendSourceData = stackedTotals;
      } else if (config.trend_line_apply_to === 'all') {
        trendSourceData = [];
        for (let i = 0; i < categories.length; i++) {
          let sum = 0, count = 0;
          seriesData.forEach(s => {
            if (typeof s.data[i].y === 'number') {
              sum += s.data[i].y;
              count++;
            }
          });
          trendSourceData.push(count > 0 ? sum / count : null);
        }
      } else {
        trendSourceData = seriesData[0].data.map(d => d.y);
      }

      let trendSeriesData = [];
      const validPoints = trendSourceData.map((y, x) => ({ x, y })).filter(p => typeof p.y === 'number');

      if (validPoints.length > 1) {
        if (config.trend_line_type === 'linear') {
          const n = validPoints.length;
          const sumX = validPoints.reduce((a, p) => a + p.x, 0);
          const sumY = validPoints.reduce((a, p) => a + p.y, 0);
          const sumXY = validPoints.reduce((a, p) => a + p.x * p.y, 0);
          const sumX2 = validPoints.reduce((a, p) => a + p.x * p.x, 0);
          const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
          const intercept = (sumY - slope * sumX) / n;
          trendSeriesData = categories.map((_, x) => slope * x + intercept);
        } else if (config.trend_line_type === 'moving_avg') {
          const period = config.trend_line_period || 3;
          trendSeriesData = trendSourceData.map((val, i, arr) => {
            if (i < period - 1) return null;
            const subset = arr.slice(i - period + 1, i + 1).filter(v => typeof v === 'number');
            return subset.length > 0 ? subset.reduce((a, b) => a + b, 0) / subset.length : null;
          });
        } else {
          const avg = validPoints.reduce((a, p) => a + p.y, 0) / validPoints.length;
          trendSeriesData = categories.map(() => avg);
        }
      }

      // Find last valid point
      let lastValidIndex = -1;
      for (let i = trendSeriesData.length - 1; i >= 0; i--) {
        if (trendSeriesData[i] !== null && trendSeriesData[i] !== undefined) {
          lastValidIndex = i;
          break;
        }
      }

      const finalTrendData = trendSeriesData.map((y, i) => {
        const basePoint = { y };

        // Add value label if enabled
        if (config.trend_line_show_label && y !== null) {
          basePoint.dataLabels = {
            enabled: true,
            formatter: createFormatter(config.value_format),
            style: {
              color: config.trend_line_label_color || config.trend_line_color || '#4285F4',
              fontSize: '11px',
              textOutline: 'none',
              fontWeight: 'normal'
            }
          };
        }

        // Add title label on last point
        if (i === lastValidIndex && y !== null) {
          if (!basePoint.dataLabels) basePoint.dataLabels = { enabled: true };
          basePoint.dataLabels.useHTML = true;
          basePoint.dataLabels.align = 'right';
          basePoint.dataLabels.x = isBar ? 10 : -35;
          basePoint.dataLabels.y = 0;
          basePoint.dataLabels.verticalAlign = 'middle';
          basePoint.dataLabels.overflow = 'allow';
          basePoint.dataLabels.crop = false;
          basePoint.dataLabels.formatter = function() {
            let html = `<span style="background-color: ${config.trend_line_title_bg || '#FFFFFF'};
                               color: ${config.trend_line_label_color || config.trend_line_color || '#4285F4'};
                               padding: 4px;
                               border: 1px solid ${config.trend_line_color || '#4285F4'};
                               border-radius: 3px;
                               font-weight: bold;
                               white-space: nowrap;">${config.trend_line_title || 'Trend'}</span>`;
            if (config.trend_line_show_label) {
              const num = this.y;
              const format = config.value_format || 'auto';
              let formatted = '';
              if (format === 'currency') formatted = '$' + (num >= 1000 ? (num / 1000).toFixed(1) + 'K' : num.toFixed(0));
              else if (format === 'percent') formatted = (num * 100).toFixed(1) + '%';
              else if (format === 'decimal1') formatted = num.toFixed(1);
              else if (format === 'decimal2') formatted = num.toFixed(2);
              else if (format === 'number') formatted = num.toLocaleString();
              else if (num >= 1e9) formatted = (num / 1e9).toFixed(1) + 'B';
              else if (num >= 1e6) formatted = (num / 1e6).toFixed(1) + 'M';
              else if (num >= 1e3) formatted = (num / 1e3).toFixed(1) + 'K';
              else formatted = num.toLocaleString();
              html += ` <span style="color: ${config.trend_line_label_color || config.trend_line_color || '#4285F4'};">${formatted}</span>`;
            }
            return html;
          };
          basePoint.dataLabels.style = { textOutline: 'none' };
        }

        return basePoint;
      });

      chartOptions.series.push({
        type: 'line',
        name: config.trend_line_title || 'Trend',
        data: finalTrendData,
        color: config.trend_line_color || '#4285F4',
        dashStyle: 'ShortDash',
        marker: { enabled: false },
        enableMouseTracking: true,
        zIndex: 10,
        showInLegend: false,
        tooltip: {
          pointFormatter: function() {
            const num = this.y;
            const format = config.value_format || 'auto';
            let formatted = '';
            if (format === 'currency') formatted = '$' + (num >= 1000 ? (num / 1000).toFixed(1) + 'K' : num.toFixed(0));
            else if (format === 'percent') formatted = (num * 100).toFixed(1) + '%';
            else if (format === 'decimal1') formatted = num.toFixed(1);
            else if (format === 'decimal2') formatted = num.toFixed(2);
            else if (format === 'number') formatted = num.toLocaleString();
            else if (num >= 1e9) formatted = (num / 1e9).toFixed(1) + 'B';
            else if (num >= 1e6) formatted = (num / 1e6).toFixed(1) + 'M';
            else if (num >= 1e3) formatted = (num / 1e3).toFixed(1) + 'K';
            else formatted = num.toLocaleString();
            return `<b>${config.trend_line_title || 'Trend'}</b>: ${formatted}`;
          }
        }
      });
    }

    if (!this.chart) {
      this.chart = Highcharts.chart(this._chartContainer, chartOptions);
    } else {
      this.chart.update(chartOptions, true, true);
      this.chart.reflow();
    }
    done();
  },

  getColors: function(values, config) {
    const palettes = {
      google: ['#4285F4', '#EA4335', '#FBBC04', '#34A853', '#FF6D00', '#46BDC6', '#AB47BC'],
      looker: ['#7FCDAE', '#7ED09C', '#7DD389', '#85D67C', '#9AD97B', '#B1DB7A'],
      green_scale: ['#F1F8E9', '#C5E1A5', '#9CCC65', '#7CB342', '#558B2F', '#33691E'],
      blue_scale: ['#E3F2FD', '#90CAF9', '#42A5F5', '#1E88E5', '#1565C0', '#0D47A1'],
      red_scale: ['#FFEBEE', '#FFCDD2', '#EF9A9A', '#E57373', '#EF5350', '#F44336'],
      purple_scale: ['#F3E5F5', '#CE93D8', '#AB47BC', '#8E24AA', '#6A1B9A'],
      orange_scale: ['#FFF3E0', '#FFE0B2', '#FFCC80', '#FFB74D', '#FFA726'],
      viridis: ['#440154', '#414487', '#2A788E', '#22A884', '#7AD151', '#FDE725'],
      warm: ['#FFF5EB', '#FDD0A2', '#FD8D3C', '#E6550D', '#A63603'],
      cool: ['#F0F9FF', '#9ECAE1', '#4292C6', '#08519C', '#08306B']
    };

    if (!config.conditional_formatting_enabled) {
      const palette = palettes[config.color_collection] || palettes.google;
      const customColors = config.series_colors ? String(config.series_colors).split(',').map(c => c.trim()) : null;
      return values.map((v, i) => customColors ? customColors[i % customColors.length] : palette[i % palette.length]);
    }

    const check = (val, ruleNum, allVals) => {
      if (!config[`rule${ruleNum}_enabled`]) return false;
      const type = config[`rule${ruleNum}_type`];
      const v1 = config[`rule${ruleNum}_value`];
      const v2 = config[`rule${ruleNum}_value2`];
      if (type === 'gt') return val > v1;
      if (type === 'lt') return val < v1;
      if (type === 'eq') return val == v1;
      if (type === 'between') return val >= v1 && val <= v2;
      if (type === 'topn' || type === 'bottomn') {
        const numericVals = allVals.filter(v => typeof v === 'number');
        const n = Math.max(1, Math.floor(v1 || 5));
        const sorted = [...numericVals].sort((a, b) => type === 'topn' ? b - a : a - b);
        const threshold = sorted[Math.min(n - 1, sorted.length - 1)];
        return type === 'topn' ? val >= threshold : val <= threshold;
      }
      return false;
    };

    if (config.rule1_enabled && config.rule1_type === 'gradient') {
      const numericValues = values.filter(v => typeof v === 'number');
      const min = Math.min(...numericValues);
      const max = Math.max(...numericValues);
      return values.map(v => {
        if (typeof v !== 'number') return config.default_color;
        const ratio = (max === min) ? 0.5 : (v - min) / (max - min);
        return this.interpolateColor(config.rule1_color || '#F1F8E9', config.rule1_color2 || '#33691E', ratio);
      });
    }

    return values.map(val => {
      if (typeof val !== 'number') return config.default_color;
      if (check(val, 1, values)) return config.rule1_color;
      if (check(val, 2, values)) return config.rule2_color;
      if (check(val, 3, values)) return config.rule3_color;
      return config.default_color;
    });
  },

  formatValue: function(value, config) {
    if (value === undefined || value === null || isNaN(value)) return '';
    const num = Number(value);
    const format = config.value_format || 'auto';
    if (format === 'currency') return '$' + (num >= 1000 ? (num / 1000).toFixed(1) + 'K' : num.toFixed(0));
    if (format === 'percent') return (num * 100).toFixed(1) + '%';
    if (format === 'decimal1') return num.toFixed(1);
    if (format === 'decimal2') return num.toFixed(2);
    if (format === 'number') return num.toLocaleString();
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toLocaleString();
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
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  },

  destroy: function() {
    if (this._resizeObserver) this._resizeObserver.disconnect();
    if (this.chart) this.chart.destroy();
  }
});
