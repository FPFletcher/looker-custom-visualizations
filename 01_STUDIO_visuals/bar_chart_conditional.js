/**
 * Conditional Bar Chart for Looker
 * COMPLETE VERSION - All features restored
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

    conditional_formatting_divider_1: {
      type: "string",
      label: "─────────────────────────────",
      display: "divider",
      section: "Plot",
      default: "",
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
        {"All Measures": "all"},
        {"Stacked Measures": "stacked"}  // ← ADD THIS
      ],
      default: "first",
      section: "Plot",
      order: 10
    },

    conditional_formatting_help: {
      type: "string",
      label: "ℹ️ First Measure: colors only the first series | All Measures: colors each series independently | Stacked Measures: colors all bars based on their combined total.",
      display: "divider",
      section: "Plot",
      default: "",
      order: 11
    },

    conditional_formatting_help_2: {
      type: "string",
      label: "Top/Bottom N use Value 1 as N, Between uses both, Gradient uses both colors. Rule 1 overwrite Rule 2 that overwrite Rule 3.If your changes are not applied, try refreshing your page.",
      display: "divider",
      section: "Plot",
      default: "",
      order: 12
    },

    // Rule 1
    rule1_enabled: {
      type: "boolean",
      label: "Rule 1: Enabled",
      default: false,
      section: "Plot",
      order: 13
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
      order: 14
    },
    rule1_value: {
      type: "number",
      label: "Value 1",
      placeholder: "Enter value or N",
      default: 5,
      section: "Plot",
      order: 15
    },
    rule1_value2: {
      type: "number",
      label: "Value 2 (Between only)",
      default: 100,
      section: "Plot",
      order: 16
    },
    rule1_color: {
      type: "string",
      label: "Color (or Gradient Start)",
      default: "#EA4335",
      display: "color",
      section: "Plot",
      order: 17
    },
    rule1_color2: {
      type: "string",
      label: "Gradient End Color",
      default: "#34A853",
      display: "color",
      section: "Plot",
      order: 18
    },
    rule1_legend_label: {
      type: "string",
      label: "Legend Label (optional)",
      placeholder: "e.g., High Performers",
      section: "Plot",
      order: 19
    },

    conditional_formatting_divider_2: {
      type: "string",
      label: "─────────────────────────────",
      display: "divider",
      section: "Plot",
      default: "",
      order: 20
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

    conditional_formatting_divider_3: {
      type: "string",
      label: "─────────────────────────────",
      display: "divider",
      section: "Plot",
      default: "",
      order: 28
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
      default: "",
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

    total_label_bold: {
      type: "boolean",
      label: "Total Label Bold",
      default: true,
      section: "Values",
      order: 9
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

    reference_line_divider_1: {
      type: "string",
      label: "─────────────────────────────",
      display: "divider",
      section: "Y",
      default: "",
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
    reference_line_help: {
      type: "string",
      label: "ℹ️ First Measure: calculates from the first series only | All Measures: calculates from all series combined | Stacked Measures: calculates from the sum of all series at each point. If your changes are not applied, try refreshing your page.",
      display: "divider",
      section: "Y",
      default: "",
      order: 12
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
      order: 13
    },
    ref_line_value: {
      type: "number",
      label: "Reference Value",
      default: 0,
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
    ref_line_title: {
      type: "string",
      label: "Reference Title",
      placeholder: "Auto (based on type)",
      default: "",  // empty string (will be calculated dynamically)
      section: "Y",
      order: 16
    },
    ref_line_title_bg: {
      type: "string",
      label: "Title Background Color",
      default: "#FFFFFF",
      display: "color",
      section: "Y",
      order: 17
    },

    reference_line_divider_2: {
      type: "string",
      label: "─────────────────────────────",
      display: "divider",
      section: "Y",
      default: "",
      order: 18
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
    trend_line_help: {
      type: "string",
      label: "ℹ️ First Measure: trend follows the first series only | All Measures: trend follows the average of all series | Stacked Measures: trend follows the sum of all series. If your changes are not applied, try refreshing your page.",
      display: "divider",
      section: "Y",
      default: "",
      order: 22
    },
    trend_line_type: {
      type: "string",
      label: "Trend Type",
      display: "select",
      values: [
        {"Linear": "linear"},
        {"Moving Average": "moving_avg"},
      ],
      default: "linear",
      section: "Y",
      order: 23
    },
    trend_line_period: {
      type: "number",
      label: "Period (Moving Avg)",
      default: 3,
      min: 2,
      max: 20,
      section: "Y",
      order: 24
    },
    trend_line_color: {
      type: "string",
      label: "Trend Line Color",
      default: "#4285F4",
      display: "color",
      section: "Y",
      order: 25
    },
    trend_line_show_label: {
      type: "boolean",
      label: "Show Value Labels",
      default: false,
      section: "Y",
      order: 26
    },
    trend_line_label_color: {
      type: "string",
      label: "Label Color",
      default: "#4285F4",
      display: "color",
      section: "Y",
      order: 27
    },
    trend_line_title: {
      type: "string",
      label: "Trend Line Title",
      placeholder: "Auto (based on type)",  // placeholder
      default: "",  // empty string (will be calculated dynamically)
      section: "Y",
      order: 28
    },
    trend_line_title_bg: {
      type: "string",
      label: "Title Background Color",
      default: "#FFFFFF",
      display: "color",
      section: "Y",
      order: 29
    },
  },

  create: function(element, config) {
    element.style.height = '100%';
    element.style.width = '100%';
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.innerHTML = `
      <style>
        /* Hide scrollbars completely */
        ::-webkit-scrollbar {
          display: none;
          width: 0 !important;
          height: 0 !important;
        }
        * {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE/Edge */
        }
        .highcharts-container {
          width: 100% !important;
          height: 100% !important;
          overflow: hidden !important;
        }
        .highcharts-root {
          width: 100% !important;
          height: 100% !important;
        }
      </style>
      <div id="chart-container" style="width:100%; height:100%; position:absolute; overflow:hidden;"></div>
    `;
    this._chartContainer = element.querySelector('#chart-container');
    this.chart = null;
    this._resizeObserver = new ResizeObserver(() => {
      if (this.chart) { this.chart.reflow(); }
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

    // Handle series_labels - can be:
    // 1. A string from manual input: "Label1,Label2,Label3"
    // 2. An object from Looker UI: {"measure.name": "Custom Label"}
    let customLabels = null;
    if (config.series_labels) {
      if (typeof config.series_labels === 'string') {
        // Manual comma-separated input
        customLabels = config.series_labels.split(',').map(l => l.trim());
      } else if (typeof config.series_labels === 'object') {
        // Looker's built-in series_labels object
        customLabels = config.series_labels;
      }
    }
    const palette = palettes[config.color_collection] || palettes.google;
    const customColors = config.series_colors ? String(config.series_colors).split(',').map(c => c.trim()) : null;

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
          const measureName = measure;
          const defaultName = `${queryResponse.fields.measures[measureIndex].label_short || queryResponse.fields.measures[measureIndex].label} - ${pivotValue.key}`;

          let seriesName = defaultName;
          if (customLabels) {
            if (Array.isArray(customLabels)) {
              // Array format: use index
              seriesName = customLabels[seriesIndex] || defaultName;
            } else {
              // Object format: use measure name as key
              seriesName = customLabels[measureName] || defaultName;
            }
          }

          const baseColor = customColors ? customColors[seriesIndex % customColors.length] : palette[seriesIndex % palette.length];

          // Apply conditional formatting to pivots (but not in stacked mode - that's done later)
          const shouldApplyFormatting = config.conditional_formatting_enabled &&
                                        config.conditional_formatting_apply_to !== 'stacked' &&
                                        (config.conditional_formatting_apply_to === 'all' || seriesIndex === 0);

          if (shouldApplyFormatting) {
            const rawValues = values.map(v => v.y);
            const colors = this.getColors(rawValues, config, baseColor);

            seriesData.push({
              name: seriesName,
              data: values.map((v, i) => ({ ...v, color: colors[i] })),
              color: baseColor,  // Fallback color for legend and any points without explicit colors
              showInLegend: true
            });
          } else {
            seriesData.push({
              name: seriesName,
              data: values,
              color: baseColor,
              showInLegend: true
            });
          }
        });
      });
    } else {
      measures.forEach((measure, index) => {
        const values = data.map((row, i) => {
          const cell = row[measure];
          return { y: cell && cell.value !== null ? Number(cell.value) : null, drillLinks: cell ? cell.links : [], categoryIndex: i };
        });


        const shouldApplyFormatting = config.conditional_formatting_enabled &&
                                      config.conditional_formatting_apply_to !== 'stacked' &&
                                      (config.conditional_formatting_apply_to === 'all' || index === 0);

        const baseColor = customColors ? customColors[index % customColors.length] : palette[index % palette.length];

        console.log(`=== Series ${index}: ${measure} ===`);
        console.log(`  shouldApplyFormatting: ${shouldApplyFormatting}`);
        console.log(`  baseColor: ${baseColor}`);
        console.log(`  conditional_formatting_enabled: ${config.conditional_formatting_enabled}`);
        console.log(`  conditional_formatting_apply_to: ${config.conditional_formatting_apply_to}`);

        const measureName = measure;
        const defaultName = queryResponse.fields.measures[index].label_short || queryResponse.fields.measures[index].label;

        let seriesName = defaultName;
        if (customLabels) {
          if (Array.isArray(customLabels)) {
            // Array format: use index
            seriesName = customLabels[index] || defaultName;
          } else {
            // Object format: use measure name as key
            seriesName = customLabels[measureName] || defaultName;
          }
        }

        if (shouldApplyFormatting) {
          // Apply conditional formatting
          const rawValues = values.map(v => v.y);
          const colors = this.getColors(rawValues, config, baseColor);  // PASS baseColor

          console.log(`  First 5 raw values:`, rawValues.slice(0, 5));
          console.log(`  First 5 colors returned:`, colors.slice(0, 5));

          seriesData.push({
            name: seriesName,
            data: values.map((v, i) => ({ ...v, color: colors[i] })),
            color: baseColor,  // Fallback color for legend and any points without explicit colors
            showInLegend: true
          });

          console.log(`  First data point:`, values[0], '-> color:', colors[0]);
        } else {
          // No conditional formatting - use normal series color
          console.log(`  Using series color: ${baseColor} (no conditional formatting)`);

          seriesData.push({
            name: seriesName,
            data: values.map(v => ({ y: v.y, drillLinks: v.drillLinks, categoryIndex: v.categoryIndex })),  // Don't carry over any color property
            color: baseColor,
            showInLegend: true
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

    // Apply conditional formatting for stacked measures mode
    if (config.conditional_formatting_enabled && config.conditional_formatting_apply_to === 'stacked') {
      // Calculate colors based on stacked totals
      const stackedColors = this.getColors(stackedTotals, config, palette[0]);

      // Apply the same color to ALL series at each category position
      seriesData.forEach(series => {
        series.data = series.data.map((point, i) => {
          if (typeof point === 'object') {
            return { ...point, color: stackedColors[i] };
          } else {
            return { y: point, color: stackedColors[i] };
          }
        });
      });
    }

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

    // Add legend items for each enabled rule with a legend label
    if (config.conditional_formatting_enabled) {
      for (let ruleNum = 1; ruleNum <= 3; ruleNum++) {
        if (config[`rule${ruleNum}_enabled`] && config[`rule${ruleNum}_legend_label`] && config[`rule${ruleNum}_legend_label`].trim() !== '') {
          ruleLegendItems.push({
            name: config[`rule${ruleNum}_legend_label`],
            color: config[`rule${ruleNum}_color`] || '#EA4335'
          });
        }
      }
    }

    // Apply conditional formatting
    const chartOptions = {
      chart: {
        type: baseType,
        backgroundColor: 'transparent',
        spacing: [10, 10, 10, 10],
        reflow: false  // Prevent auto-reflow that causes width issues
      },
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
            fontWeight: config.total_label_bold !== false ? 'bold' : 'normal',  // CHANGE THIS LINE
            color: config.total_label_color || '#000000',
            textOutline: 'none'
          },
          formatter: function() {
            const num = this.total;
            if (num === undefined || num === null || isNaN(num)) return '';

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
            text: (() => {
              const num = refValue;
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

              // CALCULATE DEFAULT TITLE BASED ON TYPE
              let refTitle = config.ref_line_title;
              if (!refTitle || refTitle.trim() === '') {
                // Auto-generate title based on type
                const typeMap = {
                  'custom': 'Reference',
                  'average': 'Average',
                  'median': 'Median',
                  'min': 'Minimum',
                  'max': 'Maximum'
                };
                refTitle = typeMap[config.ref_line_type] || 'Reference';
              }

              return `<span style="background-color: ${config.ref_line_title_bg || '#FFFFFF'}; color: ${config.ref_line_color || '#EA4335'}; padding: 4px; border: 1px solid ${config.ref_line_color || '#EA4335'}; border-radius: 3px; font-weight: bold; white-space: nowrap;">${refTitle}: ${formatted}</span>`;
            })(),
            align: isBar ? 'left' : 'right',
            verticalAlign: isBar ? 'middle' : 'bottom',
            rotation: 0,
            y: isBar ? 0 : -5,
            x: isBar ? 10 : -20,
            style: { textOutline: 'none' }
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
            enabled: config.show_labels,
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
            formatter: function() {
              const num = this.y;
              if (num === undefined || num === null || isNaN(num)) return '';
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
          }
        },
        column: { groupPadding, pointPadding, borderWidth: 0 },
        bar: { groupPadding, pointPadding, borderWidth: 0 },

        // FIND THIS LINE:
        area: { marker: { enabled: false } },

        // REPLACE IT WITH THIS:
        area: {
          marker: {
            enabled: true,  // Enable markers so point colors show
            radius: 3
          },
          fillOpacity: 0.75,  // Makes the area slightly transparent
          lineWidth: 2,
          // This prevents individual point colors from affecting the area fill
          // The area fill will use the series color, but markers will show conditional colors
          zones: []  // Empty zones array ensures normal behavior
        },

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
    if (config.trend_line_enabled) {
      //console.log('=== TRENDLINE ENABLED ===');
      //console.log('seriesData length:', seriesData.length);
      //console.log('seriesData[0]:', seriesData[0]);

  if (seriesData.length > 0) {
    let trendSourceData;

    try {
      if (config.trend_line_apply_to === 'stacked') {
        //console.log('Using stacked totals for trend');
        trendSourceData = stackedTotals;
      } else if (config.trend_line_apply_to === 'all') {
        //console.log('Using all measures average for trend');
        trendSourceData = [];
        for (let i = 0; i < categories.length; i++) {
          let sum = 0, count = 0;
          seriesData.forEach(s => {
            if (s.data[i] && typeof s.data[i].y === 'number') {
              sum += s.data[i].y;
              count++;
            }
          });
          trendSourceData.push(count > 0 ? sum / count : null);
        }
      } else {
        //console.log('Using first measure for trend');
        trendSourceData = seriesData[0].data.map(d => d && d.y !== undefined ? d.y : null);
      }

      //console.log('trendSourceData:', trendSourceData);

      let trendSeriesData = [];
      const validPoints = trendSourceData.map((y, x) => ({ x, y })).filter(p => typeof p.y === 'number');

      //console.log('validPoints:', validPoints);

      if (validPoints.length > 1) {
        if (config.trend_line_type === 'linear') {
          //console.log('Calculating linear trend');
          const n = validPoints.length;
          const sumX = validPoints.reduce((a, p) => a + p.x, 0);
          const sumY = validPoints.reduce((a, p) => a + p.y, 0);
          const sumXY = validPoints.reduce((a, p) => a + p.x * p.y, 0);
          const sumX2 = validPoints.reduce((a, p) => a + p.x * p.x, 0);
          const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
          const intercept = (sumY - slope * sumX) / n;
          trendSeriesData = categories.map((_, x) => slope * x + intercept);
        } else if (config.trend_line_type === 'moving_avg') {
          //console.log('Calculating moving average trend');
          const period = config.trend_line_period || 3;
          trendSeriesData = trendSourceData.map((val, i, arr) => {
            if (i < period - 1) return null;
            const subset = arr.slice(i - period + 1, i + 1).filter(v => typeof v === 'number');
            return subset.length > 0 ? subset.reduce((a, b) => a + b, 0) / subset.length : null;
          });
        }

        //console.log('trendSeriesData calculated:', trendSeriesData);

        // Find last valid point
        let lastValidIndex = -1;
        for (let i = trendSeriesData.length - 1; i >= 0; i--) {
          if (trendSeriesData[i] !== null && trendSeriesData[i] !== undefined && typeof trendSeriesData[i] === 'number') {
            lastValidIndex = i;
            break;
          }
        }

        //console.log('TREND DEBUG - Apply to mode:', config.trend_line_apply_to);
        //console.log('TREND DEBUG - trendSeriesData length:', trendSeriesData.length);
        //console.log('TREND DEBUG - lastValidIndex:', lastValidIndex);
        //console.log('TREND DEBUG - trendSeriesData:', trendSeriesData);

        const finalTrendData = trendSeriesData.map((y, i) => {
          const point = { y: y };

          // Only add title label on last valid point
          if (i === lastValidIndex && y !== null && y !== undefined && typeof y === 'number') {
            //console.log('TREND DEBUG - Adding label at index:', i, 'with value:', y);

            point.dataLabels = {
              enabled: true,
              useHTML: true,
              align: 'right',
              x: isBar ? 5 : -5,
              y: 0,
              verticalAlign: 'middle',
              rotation: 0,
              overflow: 'allow',
              crop: false,
              inside: false,
              zIndex: 1000,
              formatter: function() {
                // CALCULATE DEFAULT TITLE BASED ON TYPE
                let trendTitle = config.trend_line_title;
                if (!trendTitle || trendTitle.trim() === '') {
                  // Auto-generate title based on type
                  const typeMap = {
                    'linear': 'Linear Trend',
                    'moving_avg': `Moving Avg (${config.trend_line_period || 3})`
                  };
                  trendTitle = typeMap[config.trend_line_type] || 'Trend';
                }

                return `<span style="background-color: ${config.trend_line_title_bg || '#FFFFFF'}; color: ${config.trend_line_label_color || config.trend_line_color || '#4285F4'}; padding: 4px; border: 1px solid ${config.trend_line_color || '#4285F4'}; border-radius: 3px; font-weight: bold; white-space: nowrap;">${trendTitle}</span>`;
              },
              style: { textOutline: 'none' }
            };
          }

          return point;
        });

        //console.log('TREND DEBUG - finalTrendData:', finalTrendData);

        //console.log('finalTrendData:', finalTrendData);

        const trendSeries = {
          type: 'line',
          name: (() => {
            let trendTitle = config.trend_line_title;
            if (!trendTitle || trendTitle.trim() === '') {
              const typeMap = {
                'linear': 'Linear Trend',
                'moving_avg': `Moving Avg (${config.trend_line_period || 3})`
              };
              trendTitle = typeMap[config.trend_line_type] || 'Trend';
            }
            return trendTitle;
          })(),
          data: finalTrendData,
          color: config.trend_line_color || '#4285F4',
          dashStyle: 'ShortDash',
          marker: { enabled: false },
          enableMouseTracking: true,
          zIndex: 10,
          showInLegend: false,
          stacking: undefined,  // Explicitly disable stacking
          stack: null,          // Ensure no stack assignment

          events: {
            afterAnimate: function() {
              // Force re-render the data labels after animation
              if (this.chart && this.chart.series) {
                const trendLine = this.chart.get('trend-line-series');
                if (trendLine && trendLine.points && trendLine.points.length > 0) {
                  const lastPoint = trendLine.points[trendLine.points.length - 1];
                  if (lastPoint && lastPoint.dataLabel) {
                    lastPoint.dataLabel.show();
                    lastPoint.dataLabel.attr({ zIndex: 1000 }); // Force to top
                  }
                }
              }
            }
          },

          dataLabels: {
            enabled: config.trend_line_show_label === true,
            formatter: function() {
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
              return formatted;
            },
            style: {
              color: config.trend_line_label_color || config.trend_line_color || '#4285F4',
              fontSize: '11px',
              textOutline: 'none',
              fontWeight: 'normal'
            }
          },
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
        };

        //console.log('Pushing trend series:', trendSeries);
        chartOptions.series.push(trendSeries);

      } else {
        //console.log('Not enough valid points for trendline');
      }
    } catch (error) {
      console.error('Error calculating trendline:', error);
    }
  } else {
    //console.log('No series data available for trendline');
  }
}

    // Check if Highcharts is available
    if (typeof Highcharts === 'undefined') {
      console.error('Highcharts not loaded');
      this.addError({ title: 'Highcharts Error', message: 'Highcharts library failed to load. Please refresh the page.' });
      done();
      return;
    }

    // Destroy existing chart to prevent memory leaks when switching modes rapidly
    if (this.chart) {
      try {
        this.chart.destroy();
        this.chart = null;
      } catch (e) {
        console.warn('Error destroying chart:', e);
      }
    }

    try {
      this.chart = Highcharts.chart(this._chartContainer, chartOptions);
    } catch (error) {
      console.error('Error creating chart:', error);
      this.addError({ title: 'Chart Error', message: 'Failed to create chart: ' + error.message });
    }

    done();
  },


  getColors: function(values, config, baseColor) {
  console.log(`[getColors] Called with baseColor: ${baseColor}`);
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

  // Use passed baseColor, or fallback to first color in palette
  if (!baseColor) {
    const palette = palettes[config.color_collection] || palettes.google;
    const customColors = config.series_colors ? String(config.series_colors).split(',').map(c => c.trim()) : null;
    baseColor = customColors ? customColors[0] : palette[0];
  }

  if (!config.conditional_formatting_enabled) {
    return values.map(() => baseColor);
  }

  // Helper function to check discrete rules (non-gradient)
  const checkDiscrete = (val, ruleNum, allVals) => {
    if (!config[`rule${ruleNum}_enabled`]) return false;
    const type = config[`rule${ruleNum}_type`];
    if (type === 'gradient') return false; // Skip gradients in discrete check

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

  // Helper function to apply gradient for a specific rule
  const applyGradient = (values, ruleNum, baseColor) => {
    const numericValues = values.filter(v => typeof v === 'number');
    if (numericValues.length === 0) {
      return values.map(() => baseColor);
    }

    const min = Math.min(...numericValues);
    const max = Math.max(...numericValues);
    const startColor = config[`rule${ruleNum}_color`] || '#F1F8E9';
    const endColor = config[`rule${ruleNum}_color2`] || '#33691E';

    return values.map(v => {
      if (typeof v !== 'number') return baseColor;
      const ratio = (max === min) ? 0.5 : (v - min) / (max - min);
      return this.interpolateColor(startColor, endColor, ratio);
    });
  };

  // Apply rules in priority order: Rule 1 > Rule 2 > Rule 3
  return values.map((val, index) => {
    if (typeof val !== 'number') return baseColor;

    // RULE 1 - Highest Priority
    if (config.rule1_enabled) {
      if (config.rule1_type === 'gradient') {
        // If Rule 1 is gradient, calculate gradient color
        const numericValues = values.filter(v => typeof v === 'number');
        const min = Math.min(...numericValues);
        const max = Math.max(...numericValues);
        const ratio = (max === min) ? 0.5 : (val - min) / (max - min);
        return this.interpolateColor(config.rule1_color || '#F1F8E9', config.rule1_color2 || '#33691E', ratio);
      } else if (checkDiscrete(val, 1, values)) {
        // Rule 1 discrete match
        return config.rule1_color;
      }
    }

    // RULE 2 - Medium Priority (only if Rule 1 didn't match)
    if (config.rule2_enabled) {
      if (config.rule2_type === 'gradient') {
        // If Rule 2 is gradient, calculate gradient color
        const numericValues = values.filter(v => typeof v === 'number');
        const min = Math.min(...numericValues);
        const max = Math.max(...numericValues);
        const ratio = (max === min) ? 0.5 : (val - min) / (max - min);
        return this.interpolateColor(config.rule2_color || '#F1F8E9', config.rule2_color2 || '#33691E', ratio);
      } else if (checkDiscrete(val, 2, values)) {
        // Rule 2 discrete match
        return config.rule2_color;
      }
    }

    // RULE 3 - Lowest Priority (only if Rules 1 & 2 didn't match)
    if (config.rule3_enabled) {
      if (config.rule3_type === 'gradient') {
        // If Rule 3 is gradient, calculate gradient color
        const numericValues = values.filter(v => typeof v === 'number');
        const min = Math.min(...numericValues);
        const max = Math.max(...numericValues);
        const ratio = (max === min) ? 0.5 : (val - min) / (max - min);
        return this.interpolateColor(config.rule3_color || '#F1F8E9', config.rule3_color2 || '#33691E', ratio);
      } else if (checkDiscrete(val, 3, values)) {
        // Rule 3 discrete match
        return config.rule3_color;
      }
    }

    // No rule matched - use base series color
    console.log(`[getColors] Value ${val} at index ${index} -> no rule matched, returning baseColor: ${baseColor}`);
    return baseColor;
  });

  console.log(`[getColors] Returning ${values.length} colors. First 5:`, values.slice(0, 5).map((val, i) => {
    const color = values.map((v, idx) => {
      if (typeof v !== 'number') return baseColor;
      if (config.rule1_enabled && config.rule1_type !== 'gradient' && checkDiscrete(v, 1, values)) return config.rule1_color;
      if (config.rule2_enabled && config.rule2_type !== 'gradient' && checkDiscrete(v, 2, values)) return config.rule2_color;
      if (config.rule3_enabled && config.rule3_type !== 'gradient' && checkDiscrete(v, 3, values)) return config.rule3_color;
      return baseColor;
    })[i];
    return `val:${val} -> color:${color}`;
  }));

  return values.map((val, index) => {
    if (typeof val !== 'number') return baseColor;
    if (config.rule1_enabled) {
      if (config.rule1_type === 'gradient') {
        const numericValues = values.filter(v => typeof v === 'number');
        const min = Math.min(...numericValues);
        const max = Math.max(...numericValues);
        const ratio = (max === min) ? 0.5 : (val - min) / (max - min);
        return this.interpolateColor(config.rule1_color || '#F1F8E9', config.rule1_color2 || '#33691E', ratio);
      } else if (checkDiscrete(val, 1, values)) {
        return config.rule1_color;
      }
    }
    if (config.rule2_enabled) {
      if (config.rule2_type === 'gradient') {
        const numericValues = values.filter(v => typeof v === 'number');
        const min = Math.min(...numericValues);
        const max = Math.max(...numericValues);
        const ratio = (max === min) ? 0.5 : (val - min) / (max - min);
        return this.interpolateColor(config.rule2_color || '#F1F8E9', config.rule2_color2 || '#33691E', ratio);
      } else if (checkDiscrete(val, 2, values)) {
        return config.rule2_color;
      }
    }
    if (config.rule3_enabled) {
      if (config.rule3_type === 'gradient') {
        const numericValues = values.filter(v => typeof v === 'number');
        const min = Math.min(...numericValues);
        const max = Math.max(...numericValues);
        const ratio = (max === min) ? 0.5 : (val - min) / (max - min);
        return this.interpolateColor(config.rule3_color || '#F1F8E9', config.rule3_color2 || '#33691E', ratio);
      } else if (checkDiscrete(val, 3, values)) {
        return config.rule3_color;
      }
    }
    return baseColor;
  });
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
