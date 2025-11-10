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
      order: 3
    },
    group_padding: {
      type: "number",
      label: "Group Padding (%)",
      default: 10,
      min: 0,
      max: 50,
      step: 1,
      section: "Plot",
      order: 4
    },
    point_padding: {
      type: "number",
      label: "Point Padding (%)",
      default: 10,
      min: 0,
      max: 50,
      step: 1,
      section: "Plot",
      order: 5
    },

    default_color: {
      type: "string",
      label: "Default Color (No Rule Match)",
      default: "#9AA0A6",
      display: "color",
      section: "Plot",
      order: 6
    },

    // FORMATTING SUBSECTION IN PLOT
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
        {"Data Granularity (1 per row)": "data_granularity"},
        {"Compact": "compact"},
        {"Comfortable": "comfortable"},
        {"Custom": "custom"}
      ],
      default: "default",
      section: "X",
      order: 8
    },
    x_axis_tick_count: {
      type: "number",
      label: "Tick Count (if Custom)",
      default: 10,
      min: 2,
      max: 50,
      section: "X",
      order: 9
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
    trend_line_label: {
      type: "string",
      label: "Trend Line Label",
      placeholder: "Trend",
      default: "Trend",
      section: "Y",
      order: 23
    },
    trend_line_color: {
      type: "string",
      label: "Trend Color",
      default: "#4285F4",
      display: "color",
      section: "Y",
      order: 24
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

    // Add resize observer for responsiveness
    this._resizeObserver = new ResizeObserver(() => {
      if (this.chart) {
        this.chart.reflow();
      }
    });
    this._resizeObserver.observe(element);
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    this.clearErrors();

    if (!queryResponse || queryResponse.fields.dimensions.length < 1 || queryResponse.fields.measures.length < 1) {
      this.addError({
        title: 'Invalid Data',
        message: 'Chart requires 1 dimension and at least 1 measure.'
      });
      done();
      return;
    }

    const dimension = queryResponse.fields.dimensions[0].name;
    const measures = queryResponse.fields.measures.map(m => m.name);
    const categories = data.map(row => row[dimension].value);

    // Handle pivots
    const hasPivot = queryResponse.fields.pivots && queryResponse.fields.pivots.length > 0;

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
      cool: ['#F0F9FF', '#DEEBF7', '#C6DBEF', '#9ECAE1', '#6BAED6', '#4292C6', '#2171B5', '#08519C', '#08306B']
    };

    // Parse custom series labels
    const customLabels = config.series_labels ? config.series_labels.split(',').map(l => l.trim()) : null;

    // Build series data
    let seriesData = [];
    const palette = palettes[config.color_collection] || palettes.google;
    const customColors = config.series_colors ? config.series_colors.split(',').map(c => c.trim()) : null;

    if (hasPivot) {
      const pivotValues = queryResponse.pivots;
      pivotValues.forEach((pivotValue, pivotIndex) => {
        measures.forEach((measure, measureIndex) => {
          const values = data.map(row => {
            const cell = row[measure][pivotValue.key];
            return cell ? cell.value : 0;
          });

          const seriesIndex = pivotIndex * measures.length + measureIndex;
          const color = customColors ? customColors[seriesIndex % customColors.length] : palette[seriesIndex % palette.length];
          const label = customLabels && customLabels[seriesIndex] ? customLabels[seriesIndex] : `${queryResponse.fields.measures[measureIndex].label} - ${pivotValue.key}`;

          seriesData.push({
            name: label,
            data: values,
            color: color
          });
        });
      });
    } else {
      measures.forEach((measure, index) => {
        const values = data.map(row => row[measure] ? row[measure].value || 0 : 0);

        let colors;
        const applyFormatting = config.conditional_formatting_enabled &&
                               (config.conditional_formatting_apply_to === 'all' || index === 0);

        if (applyFormatting) {
          colors = this.getColors(values, config);
        } else {
          const color = customColors ? customColors[index % customColors.length] : palette[index % palette.length];
          colors = values.map(() => color);
        }

        const label = customLabels && customLabels[index] ? customLabels[index] : queryResponse.fields.measures[index].label || measure;

        seriesData.push({
          name: label,
          data: values.map((v, i) => ({ y: v, color: colors[i] })),
          colorByPoint: applyFormatting
        });
      });
    }

    // Calculate reference value
    let refValue = config.ref_line_value || 0;
    if (config.ref_line_enabled && config.ref_line_type !== 'custom') {
      const allValues = seriesData.flatMap(s => s.data.map(d => typeof d === 'object' ? d.y : d));
      if (config.ref_line_type === 'average') refValue = allValues.reduce((a, b) => a + b, 0) / allValues.length;
      else if (config.ref_line_type === 'median') {
        const sorted = [...allValues].sort((a, b) => a - b);
        refValue = sorted[Math.floor(sorted.length / 2)];
      }
      else if (config.ref_line_type === 'min') refValue = Math.min(...allValues);
      else if (config.ref_line_type === 'max') refValue = Math.max(...allValues);
    }

    // Determine X axis formatting
    let xAxisType = 'category';
    let xAxisLabelsFormat = null;

    if (config.x_axis_scale_type === 'datetime' || config.x_axis_scale_type === 'auto') {
      const firstCat = String(categories[0]);
      const isDate = firstCat.match(/^\d{4}/) && !isNaN(Date.parse(firstCat));

      if (config.x_axis_scale_type === 'datetime' || isDate) {
        xAxisType = 'datetime';

        // Determine format
        let formatString = config.x_axis_datetime_format || 'auto';
        if (formatString === 'auto') {
          if (firstCat.match(/^\d{4}$/)) formatString = '%Y';
          else if (firstCat.match(/^\d{4}-\d{2}$/)) formatString = '%b %Y';
          else formatString = '%b';
        } else if (formatString === 'custom') {
          formatString = config.x_axis_custom_format || '%Y-%m';
        }

        xAxisLabelsFormat = `{value:${formatString}}`;

        // Convert categories to timestamps
        const parsedCategories = categories.map(cat => {
          const date = new Date(cat);
          return isNaN(date.getTime()) ? cat : date.getTime();
        });

        // Update series data with x values
        seriesData = seriesData.map(series => ({
          ...series,
          data: series.data.map((point, i) => {
            const yValue = typeof point === 'object' ? point.y : point;
            const color = typeof point === 'object' ? point.color : undefined;
            return {
              x: parsedCategories[i],
              y: yValue,
              color: color
            };
          })
        }));
      }
    }

    // Calculate tick step
    let tickStep = undefined;
    if (config.x_axis_tick_density === 'compact') {
      tickStep = Math.ceil(categories.length / 10);
    } else if (config.x_axis_tick_density === 'comfortable') {
      tickStep = Math.ceil(categories.length / 20);
    } else if (config.x_axis_tick_density === 'custom') {
      tickStep = Math.ceil(categories.length / (config.x_axis_tick_count || 10));
    }

    // Determine stacking
    let stackingMode = undefined;
    if (config.series_positioning === 'stacked') {
      stackingMode = 'normal';
    } else if (config.series_positioning === 'percent') {
      stackingMode = 'percent';
    }

    // Convert padding from percentage to decimal
    // When group padding is 0, maximize bar width by minimizing point padding
    const groupPadding = (config.group_padding || 10) / 100;
    const pointPadding = config.group_padding === 0 ? 0.02 : (config.point_padding || 10) / 100;

    // Chart options
    const chartOptions = {
      chart: {
        type: config.chart_type === 'bar' ? 'bar' : 'column',
        backgroundColor: null,
        animation: false,
        spacing: [10, 10, 10, 10]
      },
      title: { text: null },
      xAxis: {
        categories: xAxisType === 'category' ? categories : undefined,
        type: xAxisType,
        tickmarkPlacement: 'on',
        visible: config.show_x_axis !== false,
        title: { text: config.x_axis_label || null },
        labels: {
          rotation: config.x_axis_label_rotation !== undefined ? config.x_axis_label_rotation : -45,
          step: xAxisType === 'category' ? (
          config.x_axis_tick_density === 'data_granularity' ? 1 :
          config.x_axis_tick_density === 'compact' ? Math.max(1, Math.ceil(categories.length / 10)) :
          config.x_axis_tick_density === 'comfortable' ? Math.max(1, Math.ceil(categories.length / 20)) :
          config.x_axis_tick_density === 'custom' ? Math.max(1, Math.ceil(categories.length / (config.x_axis_tick_count || 10))) :
          undefined
          ) : undefined,
          format: xAxisLabelsFormat,
          style: { fontSize: '11px' }
        },
        tickInterval: xAxisType === 'datetime' ? (
        config.x_axis_tick_density === 'compact' ? 30 * 24 * 3600 * 1000 : // ~1 month
        config.x_axis_tick_density === 'comfortable' ? 90 * 24 * 3600 * 1000 : // ~3 months
        undefined
        ) : undefined,
        gridLineWidth: config.show_x_gridlines ? 1 : 0
      },
      yAxis: {
        visible: config.show_y_axis !== false,
        title: { text: config.y_axis_label || null },
        min: config.y_axis_min !== undefined ? config.y_axis_min : null,
        max: config.y_axis_max !== undefined ? config.y_axis_max : null,
        type: config.y_axis_scale === 'logarithmic' ? 'logarithmic' : 'linear',
        gridLineWidth: config.show_y_gridlines !== false ? 1 : 0,
        endOnTick: false,
        maxPadding: 0.05,
        plotLines: config.ref_line_enabled ? [{
          value: refValue,
          color: config.ref_line_color || '#EA4335',
          width: 2,
          dashStyle: 'Dash',
          zIndex: 5,
          label: {
            text: config.ref_line_label || 'Reference',
            align: 'left',
            x: 10,
            style: {
              color: config.ref_line_color || '#EA4335',
              fontWeight: 'bold'
            }
          }
        }] : []
      },
      plotOptions: {
        column: {
          stacking: stackingMode,
          groupPadding: groupPadding,
          pointPadding: pointPadding,
          dataLabels: {
            enabled: config.show_labels !== false,
            align: config.label_position === 'outside' ? 'center' :
            config.label_position === 'inside' ? 'center' : 'center',
            verticalAlign: config.label_position === 'outside' ? null :
            config.label_position === 'inside' ? 'top' : 'middle',
            inside: config.label_position === 'inside' || config.label_position === 'center',
            rotation: config.label_rotation || 0,
            style: {
              fontSize: (config.label_font_size || 11) + 'px',
              color: config.label_color || '#000000',
              fontWeight: 'normal',
              textOutline: 'none'
            },
            formatter: function() {
              const value = this.y;
              if (value === undefined || value === null || isNaN(value)) return '';

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
            }
          }
        },
        bar: {
          stacking: stackingMode,
          groupPadding: groupPadding,
          pointPadding: pointPadding,
          dataLabels: {
            enabled: config.show_labels !== false,
            align: config.label_position === 'outside' ? 'left' :
            config.label_position === 'inside' ? 'center' : 'center',
            verticalAlign: 'middle',
            inside: config.label_position === 'inside' || config.label_position === 'center',
            rotation: config.label_rotation || 0,
            style: {
              fontSize: (config.label_font_size || 11) + 'px',
              color: config.label_color || '#000000',
              fontWeight: 'normal',
              textOutline: 'none'
            },
            formatter: function() {
              const value = this.y;
              if (value === undefined || value === null || isNaN(value)) return '';

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
            }
          }
        },
        series: {
          animation: false,
          turboThreshold: 10000
        }
      },
      legend: {
        enabled: seriesData.length > 1,
        align: 'center',
        verticalAlign: 'bottom'
      },
      tooltip: {
        formatter: function() {
          const value = this.y;
          let formattedValue = '';
          const format = config.value_format || 'auto';

          if (format === 'currency') formattedValue = '$' + (value >= 1000 ? (value/1000).toFixed(1) + 'K' : value.toFixed(0));
          else if (format === 'percent') formattedValue = (value * 100).toFixed(1) + '%';
          else if (format === 'decimal1') formattedValue = value.toFixed(1);
          else if (format === 'decimal2') formattedValue = value.toFixed(2);
          else if (format === 'number') formattedValue = value.toFixed(0);
          else if (value >= 1e9) formattedValue = (value / 1e9).toFixed(1) + 'B';
          else if (value >= 1e6) formattedValue = (value / 1e6).toFixed(1) + 'M';
          else if (value >= 1e3) formattedValue = (value / 1e3).toFixed(1) + 'K';
          else formattedValue = value.toFixed(0);

          const xLabel = xAxisType === 'datetime' ? Highcharts.dateFormat('%b %Y', this.x) : this.x;
          return `<b>${this.series.name}</b><br/>${xLabel}: ${formattedValue}`;
        }
      },
      series: seriesData,
      credits: { enabled: false }
    };

   // Add trend line
    if (config.trend_line_enabled && seriesData.length > 0) {
      // Get values from first series, handling both object and primitive data
      const firstSeriesData = seriesData[0].data;
      const firstSeriesValues = firstSeriesData.map(d => typeof d === 'object' ? d.y : d);

      let trendData = [];

      if (config.trend_line_type === 'linear') {
        const n = firstSeriesValues.length;
        const sumX = firstSeriesValues.reduce((sum, v, i) => sum + i, 0);
        const sumY = firstSeriesValues.reduce((sum, v) => sum + v, 0);
        const sumXY = firstSeriesValues.reduce((sum, v, i) => sum + i * v, 0);
        const sumX2 = firstSeriesValues.reduce((sum, v, i) => sum + i * i, 0);
        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;

        // Build trend data matching the x-axis type
        if (xAxisType === 'datetime') {
          trendData = firstSeriesData.map((d, i) => ({
            x: typeof d === 'object' ? d.x : undefined,
            y: slope * i + intercept
          }));
        } else {
          trendData = firstSeriesValues.map((v, i) => slope * i + intercept);
        }
      } else if (config.trend_line_type === 'moving_avg') {
        const period = config.trend_line_period || 3;
        trendData = firstSeriesValues.map((v, i) => {
          const start = Math.max(0, i - period + 1);
          const subset = firstSeriesValues.slice(start, i + 1);
          const avg = subset.reduce((a, b) => a + b, 0) / subset.length;

          if (xAxisType === 'datetime') {
            return {
              x: typeof firstSeriesData[i] === 'object' ? firstSeriesData[i].x : undefined,
              y: avg
            };
          }
          return avg;
        });
      } else if (config.trend_line_type === 'average') {
        const avg = firstSeriesValues.reduce((a, b) => a + b, 0) / firstSeriesValues.length;
        trendData = firstSeriesValues.map((v, i) => {
          if (xAxisType === 'datetime') {
            return {
              x: typeof firstSeriesData[i] === 'object' ? firstSeriesData[i].x : undefined,
              y: avg
            };
          }
          return avg;
        });
      }

      chartOptions.series.push({
        type: 'line',
        name: config.trend_line_label || 'Trend',
        data: trendData,
        color: config.trend_line_color || '#4285F4',
        marker: { enabled: false },
        enableMouseTracking: true,
        dashStyle: 'Dash',
        lineWidth: 2,
        zIndex: 10
      });
    }

    // Create or update chart
    if (!this.chart) {
      this.chart = Highcharts.chart(this._chartContainer, chartOptions);
    } else {
      this.chart.update(chartOptions, true, true);
    }

    // Force reflow
    setTimeout(() => {
      if (this.chart) {
        this.chart.reflow();
      }
    }, 100);

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
      if (config.series_colors) {
        const custom = config.series_colors.split(',').map(c => c.trim());
        return values.map((v, i) => custom[i % custom.length]);
      }
      return values.map((v, i) => palette[i % palette.length]);
    }

    // Handle gradient rules first
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

    if (config.rule3_enabled && config.rule3_type === 'gradient') {
      const min = Math.min(...values);
      const max = Math.max(...values);
      return values.map(v => {
        const ratio = (max === min) ? 0.5 : (v - min) / (max - min);
        return this.interpolateColor(
          config.rule3_color || '#4285F4',
          config.rule3_color2 || '#34A853',
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
      const n = Math.floor(val1);
      if (n <= 0) return false;
      const sorted = [...allValues].sort((a, b) => b - a);
      const threshold = sorted[Math.min(n - 1, sorted.length - 1)];
      return value >= threshold;
    }

    if (type === 'bottomn') {
      const n = Math.floor(val1);
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
  },

  destroy: function() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
    }
    if (this.chart) {
      this.chart.destroy();
    }
  }
});
