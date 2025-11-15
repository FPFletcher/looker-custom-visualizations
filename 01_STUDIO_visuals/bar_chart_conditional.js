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
        {"Stacked Measures": "stacked"}
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

    // RESTORED: Hide Legend with Formatting
    hide_legend_with_formatting: {
      type: "boolean",
      label: "Hide Series Legend (conditional only)",
      default: false,
      section: "Plot",
      order: 11.5
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
    // RESTORED: Custom Format String
    value_format_custom: {
      type: "string",
      label: "Custom Format String",
      placeholder: "e.g., $0.00, #,##0.0, 0.0%",
      section: "Values",
      order: 6.5
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
    // REINTRODUCED: x_axis_value_format_custom
    x_axis_value_format_custom: {
      type: "string",
      label: "Custom Format String",
      placeholder: "e.g., %Y-%m-%d, %b %Y, #,##0",
      section: "X",
      order: 2.6
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
    // RESTORED: Y-Axis Value Format Options
    y_axis_value_format: {
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
      section: "Y",
      order: 2.5
    },
    y_axis_value_format_custom: {
      type: "string",
      label: "Custom Format String",
      placeholder: "e.g., $0.00, #,##0.0",
      section: "Y",
      order: 2.6
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
    element.style.overflow = 'visible';
    element.innerHTML = `
      <style>
        .highcharts-container { width: 100% !important; height: 100% !important; }
      </style>
      <div id="chart-container" style="width:100%; height:100%; position:absolute;"></div>
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

    // Helper function to format values using LookML formats or custom
    const formatValue = (value, formatType, customFormat, field, renderedValue) => {
      if (value === null || value === undefined) return '';

      // PRIORITY 1: Custom format overrides everything
      if (customFormat && customFormat.trim() !== '') {
        // For dates - support strftime-style formats
        if (customFormat.includes('%')) {
          try {
            const date = new Date(value);
            if (isNaN(date.getTime())) return String(value);
            return customFormat
              .replace(/%Y/g, date.getFullYear())
              .replace(/%y/g, String(date.getFullYear()).slice(-2))
              .replace(/%m/g, String(date.getMonth() + 1).padStart(2, '0'))
              .replace(/%d/g, String(date.getDate()).padStart(2, '0'))
              .replace(/%b/g, date.toLocaleString('default', { month: 'short' }))
              .replace(/%B/g, date.toLocaleString('default', { month: 'long' }));
          } catch (e) {
            return String(value);
          }
        }
        // For numbers - basic support (user provides literal format string)
        if (!isNaN(value)) {
            // Simplified custom number format implementation
            if (customFormat.includes('$') || customFormat.includes('€') || customFormat.includes('£')) {
                let currency = customFormat.match(/[$€£]/)?.[0] || '';
                let decimals = (customFormat.match(/0\.([0#]+)/) || [])[1]?.length || 0;
                let scaledValue = value;
                let scaledSuffix = '';
                if (customFormat.includes(',')) {
                    // Check for thousand/million/etc abbreviation in custom string (e.g., $0.0," k")
                    if (customFormat.includes('," k"')) { scaledValue = value / 1000; scaledSuffix = ' k'; }
                    else if (customFormat.includes('," M"')) { scaledValue = value / 1000000; scaledSuffix = ' M'; }
                }
                const formattedNumber = scaledValue.toLocaleString('en-US', {
                    minimumFractionDigits: decimals,
                    maximumFractionDigits: decimals,
                    useGrouping: customFormat.includes(',') // Only use grouping if commas are requested in format
                });
                return `${currency}${formattedNumber}${scaledSuffix}`;

            } else if (customFormat.includes('%')) {
                const decimals = (customFormat.match(/0\.([0#]+)/) || [])[1]?.length || 0;
                return (value * 100).toFixed(decimals) + '%';
            }
            // Default number formatting for custom string if very generic
            const decimals = (customFormat.match(/0\.([0#]+)/) || [])[1]?.length || 0;
            return value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
        }
        return customFormat.replace(/0+/g, value.toLocaleString());
      }

      if (isNaN(value)) return String(value);

      // PRIORITY 2: AUTO uses LookML's rendered value if available
      if (formatType === 'auto') {
        // First try to use the rendered value passed from Looker data
        if (renderedValue !== null && renderedValue !== undefined) {
          return renderedValue;
        }

        // Fallback: This fallback logic needs to be more reliable for y-axis/tooltip when renderedValue isn't directly available.
        if (field && field.value_format) {
            const fmt = field.value_format;
            const num = Number(value);

            // Pattern: "$0.0," k"" or similar -> thousands with k suffix
            if (fmt.includes('," k"') || fmt.includes(",'k'")) {
                const decimals = (fmt.match(/0\.([0#]+)/) || [])[1]?.length || 0;
                const sign = (num < 0) ? '-' : '';
                const baseVal = Math.abs(num) / 1000;
                const formattedNum = baseVal.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: true });
                return `${sign}$${formattedNum} k`; // Hardcoded $ and k for common case
            }
            // Pattern: standard currency format (e.g. $#,##0.00)
            if (fmt.startsWith('$')) {
                const decimals = (fmt.match(/0\.([0#]+)/) || [])[1]?.length || 0;
                return '$' + num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
            }
            // Pattern: standard number format (e.g. #,##0.0)
            if (fmt.includes('#,##0')) {
                const decimals = (fmt.match(/0\.([0#]+)/) || [])[1]?.length || 0;
                return num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
            }
            // Pattern: percentage format
            if (fmt.includes('%')) {
                const decimals = (fmt.match(/0\.([0#]+)/) || [])[1]?.length || 0;
                return (num * 100).toFixed(decimals) + '%';
            }
        }
      }

      // PRIORITY 3: Preset formats
      if (formatType === 'currency') return '$' + (value >= 1000 ? (value / 1000).toFixed(1) + 'K' : value.toFixed(0));
      if (formatType === 'percent') return (value * 100).toFixed(1) + '%';
      if (formatType === 'decimal1') return value.toFixed(1);
      if (formatType === 'decimal2') return value.toFixed(2);
      if (formatType === 'number') return value.toLocaleString();

      // PRIORITY 4: Auto fallback - smart number formatting
      if (value >= 1e9) return (value / 1e9).toFixed(1) + 'B';
      if (value >= 1e6) return (value / 1e6).toFixed(1) + 'M';
      if (value >= 1e3) return (value / 1e3).toFixed(1) + 'K';
      return value.toLocaleString();
    };

    const dimension = queryResponse.fields.dimensions[0].name;
    const dimensionField = queryResponse.fields.dimensions[0];
    const categories = data.map(row => LookerCharts.Utils.textForCell(row[dimension]));
    // --- RESTORED: Raw Dimension Values for X-Axis Custom Format ---
    const rawDimensionValues = data.map(row => {
      const cell = row[dimension];
      // Extract the raw value for custom formatting if available
      return cell && cell.value !== undefined ? cell.value : LookerCharts.Utils.textForCell(row[dimension]);
    });
    // ---------------------------------------------------------------
    const measures = queryResponse.fields.measures.map(m => m.name);
    const measureFields = queryResponse.fields.measures;
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

    // Handle series_labels - Looker passes it as an object like {"measure.name": "Custom Label"}
    const customLabels = config.series_labels && typeof config.series_labels === 'object'
      ? config.series_labels
      : null;
    const palette = palettes[config.color_collection] || palettes.google;
    const customColors = config.series_colors ? String(config.series_colors).split(',').map(c => c.trim()) : null;

    let seriesData = [];
    if (hasPivot) {
      const pivotValues = queryResponse.pivots;
      pivotValues.forEach((pivotValue, pivotIndex) => {
        measures.forEach((measure, measureIndex) => {
          const values = data.map((row, i) => {
            const cell = row[measure][pivotValue.key];
            return {
              y: cell && cell.value !== null ? Number(cell.value) : null,
              rendered: cell && cell.rendered ? cell.rendered : null,
              drillLinks: cell ? cell.links : [],
              categoryIndex: i
            };
          });
          const seriesIndex = pivotIndex * measures.length + measureIndex;
          const measureName = measure;
          const defaultName = `${queryResponse.fields.measures[measureIndex].label_short || queryResponse.fields.measures[measureIndex].label} - ${pivotValue.key}`;
          const seriesName = (customLabels && customLabels[measureName]) || defaultName;

          // Determine series base color
          const baseColor = customColors ? customColors[seriesIndex % customColors.length] : palette[seriesIndex % palette.length];

          // Conditional formatting logic for pivoted data (only first measure/pivot combo is currently supported for 'first')
          const shouldApplyFormatting = config.conditional_formatting_enabled &&
                                        (config.conditional_formatting_apply_to === 'all' || (config.conditional_formatting_apply_to === 'first' && seriesIndex === 0));

          if (shouldApplyFormatting) {
            const rawValues = values.map(v => v.y);
            const colors = this.getColors(rawValues, config, baseColor);

            seriesData.push({
              name: seriesName,
              data: values.map((v, i) => ({ ...v, color: colors[i] })),
              showInLegend: true,
              // Do NOT set series color here, use point colors
              // color: baseColor // REMOVED: Rely on point colors
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
          return {
            y: cell && cell.value !== null ? Number(cell.value) : null,
            rendered: cell && cell.rendered ? cell.rendered : null,
            drillLinks: cell ? cell.links : [],
            categoryIndex: i
          };
        });


        const shouldApplyFormatting = config.conditional_formatting_enabled &&
                                      (config.conditional_formatting_apply_to === 'all' || config.conditional_formatting_apply_to === 'first' && index === 0);

        const baseColor = customColors ? customColors[index % customColors.length] : palette[index % palette.length];

        const measureName = measure;
        const defaultName = queryResponse.fields.measures[index].label_short || queryResponse.fields.measures[index].label;
        const seriesName = (customLabels && customLabels[measureName]) || defaultName;

        if (shouldApplyFormatting) {
          // Apply conditional formatting
          const rawValues = values.map(v => v.y);
          // Pass baseColor to getColors
          const colors = this.getColors(rawValues, config, baseColor);

          seriesData.push({
            name: seriesName,
            data: values.map((v, i) => ({ ...v, color: colors[i] })),
            // Add a base series color (needed for area/line fill), but point colors will override bars
            color: baseColor,
            showInLegend: true
          });
        } else {
          // No conditional formatting applied to this specific series/mode
          seriesData.push({
            name: seriesName,
            data: values,
            color: baseColor,
            showInLegend: true
          });
        }
      });
    }

    // Calculate stacked totals for trendline and total labels
    const stackedTotals = categories.map((cat, i) => {
      return seriesData.reduce((sum, series) => {
        const val = series.data[i] && typeof series.data[i].y === 'number' ? series.data[i].y : 0;
        return sum + val;
      }, 0);
    });

    // **Conditional Formatting Fix (Stacked Measures)**
    // If formatting applies to stacked measures, we need to apply coloring based on stackedTotals.
    if (config.conditional_formatting_enabled && config.conditional_formatting_apply_to === 'stacked') {
        const stackedColors = this.getStackedColors(stackedTotals, config);

        seriesData = seriesData.map(series => {
            const seriesBaseColor = series.color;

            return {
                ...series,
                data: series.data.map((point, index) => ({
                    ...point,
                    // Override point color with stacked conditional color, falling back to series color if no rule matched (color is null)
                    color: stackedColors[index] || seriesBaseColor
                }))
            }
        });
    } else if (config.conditional_formatting_enabled && config.conditional_formatting_apply_to === 'first') {
        // When switching back to 'first', ensure NON-first series points
        // revert to their original series color.

        seriesData = seriesData.map((series, index) => {
            // If this is the first measure, we leave it alone (it was colored above)
            if (index === 0) return series;

            // If this is *not* the first measure, and formatting is set to 'first',
            // we strip explicit point colors and rely on the base series color.
            const baseColor = customColors ? customColors[index % customColors.length] : palette[index % palette.length];

            return {
                ...series,
                data: series.data.map(point => ({
                    ...point,
                    color: baseColor // Explicitly reset point color to series default
                })),
                color: baseColor // Ensure series color is also the default
            };
        });
    }


    // Calculate reference value
    let refValue = config.ref_line_value || 0;
    if (config.ref_line_enabled && config.ref_line_type !== 'custom') {
      let valuesToConsider;
      if (config.ref_line_apply_to === 'stacked') {
        valuesToConsider = stackedTotals.filter(v => v !== null && v !== undefined); // Check for null/undefined as well
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

    // Determine if the series legend should be enabled
    let seriesLegendEnabled = seriesData.length > 1;
    // FIX 2: Correct legend visibility logic
    if (config.conditional_formatting_enabled && config.hide_legend_with_formatting) {
        // If conditional formatting is enabled AND the user chose to hide the series legend,
        // the series legend is explicitly disabled.
        seriesLegendEnabled = false;
    }
    // Final legend status: enabled if the series are visible OR if there are rule items to show.
    const finalLegendEnabled = seriesLegendEnabled || (ruleLegendItems.length > 0 && config.conditional_formatting_enabled);


    // Apply conditional formatting
    const chartOptions = {
      chart: {
        type: baseType,
        backgroundColor: 'transparent',
        spacing: [10, 10, 10, 10],
        // FIX 1: Add a simple reflow/redraw on animation complete to prevent trendline from being hidden by chart updates
        events: {
          load: function() {
            console.log('[HIGHCHARTS EVENT] Load. Checking trendline state...');
            // Ensure trendline title labels are visible after chart loads
            const trendSeries = this.get('trend-line-series');
            if (trendSeries && trendSeries.points) {
              trendSeries.points.forEach(point => {
                if (point.dataLabel && point.dataLabels) {
                  point.dataLabel.show();
                  point.dataLabel.toFront();
                }
              });
            }
          },
          redraw: function() {
              console.log('[HIGHCHARTS EVENT] Redraw. Forcing trendline to front.');
              const trendSeries = this.get('trend-line-series');
              if (trendSeries) {
                  // Ensure visibility and zIndex after redraw
                  trendSeries.setVisible(true, false);
                  trendSeries.update({ zIndex: 10 }, false);
                  if (trendSeries.points) {
                    trendSeries.points.forEach(point => {
                      if (point.dataLabel) {
                        point.dataLabel.toFront();
                      }
                    });
                  }
              }
          }
        }
      },
      title: { text: null },
      credits: { enabled: false },
      tooltip: {
        shared: false
      },
      xAxis: {
        categories: categories,
        type: 'category',
        title: { text: config.x_axis_label || null },
        labels: {
          rotation: isBar ? 0 : (config.x_axis_label_rotation || -45),
          formatter: function() {
            const customFormat = config.x_axis_value_format_custom || '';

            if (customFormat.trim() !== '') {
              // Use the raw dimension value for custom formatting
              const rawValue = rawDimensionValues[this.pos];
              if (rawValue === undefined || rawValue === null) {
                  return this.value;
              }
              // For X-axis, formatType is often null, forcing usage of customFormat
              // We pass 'number' type just as a hint, but rely on customFormat for output logic
              return formatValue(rawValue, 'number', customFormat, dimensionField);
            }

            return this.value; // Use Looker's default rendering
          }
        },
        tickInterval: tickInterval,
        gridLineWidth: config.show_x_gridlines ? 1 : 0,
        tickmarkPlacement: 'on'
      },
      yAxis: {
        title: { text: config.y_axis_label || null },
        min: config.y_axis_min !== undefined ? config.y_axis_min : null,
        max: config.y_axis_max !== undefined ? config.y_axis_max : null,
        gridLineWidth: config.show_y_gridlines !== false ? 1 : 0,
        labels: {
          formatter: function() {
            // Y-axis uses its own format options (which were restored) or falls back to main options
            const formatType = config.y_axis_value_format || config.value_format || 'auto';
            const customFormat = config.y_axis_value_format_custom || config.value_format_custom;
            return formatValue(this.value, formatType, customFormat, measureFields[0]);
          }
        },
        stackLabels: {
          enabled: config.show_total_labels === true && !!stackingMode,
          style: {
            fontWeight: config.total_label_bold !== false ? 'bold' : 'normal',
            color: config.total_label_color || '#000000',
            textOutline: 'none'
          },
          formatter: function() {
            const num = this.total;
            if (num === undefined || num === null) return '';
            // Stack labels use value_format and custom format
            const formatType = config.value_format || 'auto';
            const customFormat = config.value_format_custom;
            // Use the first measure field for total format logic
            return formatValue(num, formatType, customFormat, measureFields[0]);
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
              // Use Y axis format config for reference line label
              const formatType = config.y_axis_value_format || config.value_format || 'auto';
              const customFormat = config.y_axis_value_format_custom || config.value_format_custom;

              const formatted = formatValue(refValue, formatType, customFormat, measureFields[0]);

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
              if (num === undefined || num === null) return '';
              // Try to determine which measure this point belongs to
              const seriesIndex = this.series.index;
              const measureField = measureFields[seriesIndex % measureFields.length];
              // Access rendered value from the point's options
              const renderedValue = this.point && this.point.options && this.point.options.rendered ? this.point.options.rendered : null;
              return formatValue(num, config.value_format || 'auto', config.value_format_custom, measureField, renderedValue);
            }
          },
          tooltip: {
            pointFormatter: function() {
              const num = this.y;
              if (num === undefined || num === null) return '';
              // Determine which measure field this point belongs to
              const seriesIndex = this.series.index;
              const measureField = measureFields[seriesIndex % measureFields.length];
              const renderedValue = this.options && this.options.rendered ? this.options.rendered : null;
              const formatted = formatValue(num, config.value_format || 'auto', config.value_format_custom, measureField, renderedValue);
              return `<span style="color:${this.color}">●</span> ${this.series.name}: <b>${formatted}</b><br/>`;
            }
          }
        },
        column: { groupPadding, pointPadding, borderWidth: 0 },
        bar: { groupPadding, pointPadding, borderWidth: 0 },

        area: {
          marker: {
            enabled: true,
            radius: 3
          },
          fillOpacity: 0.75,
          lineWidth: 2,
          zones: []
        },

        line: { marker: { enabled: true, radius: 3 } }
      },
      legend: {
        // FIX 2: Only hide series legend if hide_legend_with_formatting is true, but always show if there are rule items.
        enabled: finalLegendEnabled,
        // If series legend is hidden, align should be based on rule items presence.
        // We'll keep it simple: if *anything* is in the legend, show it.
        // We ensure that the data for ruleLegendItems is always added to the chart options.
        align: 'center',
        verticalAlign: 'bottom'
      },
      series: [
        // Filter out series data if the series legend is disabled AND conditional formatting is active,
        // to prevent duplicate legend entries if rule labels are shown.
        // HACK: To hide the series legend visually while allowing the series objects (which carry data)
        // to exist, we control `showInLegend` for the individual series objects based on `seriesLegendEnabled`.
        ...seriesData.map(s => ({
            ...s,
            showInLegend: seriesLegendEnabled
        })),
        // Rule legend items are independent and always show in legend if enabled (showInLegend: true)
        ...ruleLegendItems.map(item => ({
          name: item.name,
          color: item.color,
          type: 'line', // Hack to display custom legend entry
          data: [],
          showInLegend: true, // Always show rule legend items
          enableMouseTracking: false
        }))
      ]
    };

    // TRENDLINE
    console.log('=== TRENDLINE CHECK START ===');
    console.log('config.trend_line_enabled:', config.trend_line_enabled);
    console.log('seriesData.length:', seriesData.length);

    if (config.trend_line_enabled) {
      if (seriesData.length > 0) {
        let trendSourceData;

        try {
          if (config.trend_line_apply_to === 'stacked') {
            trendSourceData = stackedTotals;
          } else if (config.trend_line_apply_to === 'all') {
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
            // First measure is default
            trendSourceData = seriesData[0].data.map(d => d && d.y !== undefined ? d.y : null);
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

              // Handle potential division by zero if all X values are the same (shouldn't happen with categories)
              const denominator = (n * sumX2 - sumX * sumX);
              const slope = denominator === 0 ? 0 : (n * sumXY - sumX * sumY) / denominator;
              const intercept = (sumY - slope * sumX) / n;

              trendSeriesData = categories.map((_, x) => slope * x + intercept);

            } else if (config.trend_line_type === 'moving_avg') {
              const period = config.trend_line_period || 3;
              trendSeriesData = trendSourceData.map((val, i, arr) => {
                if (i < period - 1) return null;
                const subset = arr.slice(i - period + 1, i + 1).filter(v => typeof v === 'number');
                return subset.length > 0 ? subset.reduce((a, b) => a + b, 0) / subset.length : null;
              });
            }

            // Find last valid point
            let lastValidIndex = -1;
            for (let i = trendSeriesData.length - 1; i >= 0; i--) {
              if (trendSeriesData[i] !== null && trendSeriesData[i] !== undefined && typeof trendSeriesData[i] === 'number') {
                lastValidIndex = i;
                break;
              }
            }

            const finalTrendData = trendSeriesData.map((y, i) => {
              const point = { y: y };

              // Only add title label on last valid point
              if (i === lastValidIndex && y !== null && y !== undefined && typeof y === 'number') {
                point.dataLabels = {
                  enabled: true,
                  useHTML: true,
                  align: isBar ? 'left' : 'right',
                  x: isBar ? 10 : -10,
                  y: isBar ? 0 : -10,
                  verticalAlign: isBar ? 'middle' : 'bottom',
                  rotation: 0,
                  overflow: 'allow',
                  crop: false,
                  inside: false,
                  zIndex: 1000,
                  style: {
                    textOutline: 'none',
                    zIndex: 1000
                  },
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

                    return `<span style="background-color: ${config.trend_line_title_bg || '#FFFFFF'}; color: ${config.trend_line_label_color || config.trend_line_color || '#4285F4'}; padding: 4px; border: 1px solid ${config.trend_line_color || '#4285F4'}; border-radius: 3px; font-weight: bold; white-space: nowrap; z-index: 1000;">${trendTitle}</span>`;
                  }
                };
              }
              return point;
            });

            const trendSeries = {
              id: 'trend-line-series',
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
              stacking: undefined,
              stack: null,

              dataLabels: {
                enabled: config.trend_line_show_label === true,
                allowOverlap: true,
                formatter: function() {
                  // Use the primary value format for trendline labels
                  return formatValue(this.y, config.value_format || 'auto', config.value_format_custom, measureFields[0]);
                },
                style: {
                  color: config.trend_line_label_color || config.trend_line_color || '#4285F4',
                  fontSize: '11px',
                  textOutline: 'none',
                  fontWeight: 'normal',
                  zIndex: 1000
                }
              },
              tooltip: {
                pointFormatter: function() {
                  const formatted = formatValue(this.y, config.value_format || 'auto', config.value_format_custom, measureFields[0]);
                  return `<b>${config.trend_line_title || 'Trend'}</b>: ${formatted}`;
                }
              }
            };

            console.log('[TRENDLINE DEBUG] Trend Series generated successfully. Pushing to chartOptions.');
            chartOptions.series.push(trendSeries);

          } else {
             console.log('[TRENDLINE DEBUG] Not enough valid points (<= 1) to draw trendline.');
          }
        } catch (error) {
          console.error('[TRENDLINE ERROR] Error calculating trendline:', error);
        }
      } else {
         console.log('[TRENDLINE DEBUG] No series data available.');
      }
    }

    if (!this.chart) {
      console.log('[CHART INIT] Creating new chart instance.');
      this.chart = Highcharts.chart(this._chartContainer, chartOptions);
    } else {
      console.log('[CHART UPDATE] Updating existing chart with new options (deep merge: true).');
      // FIX 1: We use (true, true) to ensure a deep update and immediate redraw.
      // Highcharts is known to have visibility issues if series are added/removed/updated frequently,
      // but this is the recommended way to handle Looker update cycles. The 'redraw' event handler should stabilize visibility.
      this.chart.update(chartOptions, true, true);
    }
    console.log('=== TRENDLINE CHECK END ===');
    done();
  },


  // FIX 1.2: Implement getStackedColors inspired by the provided file to ensure non-matched categories revert to their base color.
  getStackedColors: function(values, config) {
    // Note: Since the core series color is handled in updateAsync and passed in via `series.color`,
    // here we return `null` if no rule matches, signaling `updateAsync` to use the series default color.
    const defaultColor = '#EEEEEE';

    // Helper function to check discrete rules (non-gradient) - RE-COPIED from bar_chart_conditional (6).js
    const checkDiscrete = (val, ruleNum, allVals) => {
        if (!config[`rule${ruleNum}_enabled`]) return false;
        const type = config[`rule${ruleNum}_type`];
        if (type === 'gradient') return false; // Skip gradients in discrete check

        const v1 = config[`rule${ruleNum}_value`];
        const v2 = config[`rule${ruleNum}_value2`];

        if (val === null || val === undefined || isNaN(val)) return false;

        // Top N / Bottom N logic
        if (type === 'topn' || type === 'bottomn') {
            const numericVals = allVals.filter(v => typeof v === 'number');
            const n = Math.max(1, Math.floor(v1 || 5));
            const uniqueSorted = [...new Set(numericVals)].sort((a, b) => type === 'topn' ? b - a : a - b);

            if (uniqueSorted.length === 0) return false;
            if (n >= uniqueSorted.length) return true;

            const threshold = uniqueSorted[n - 1];
            return type === 'topn' ? val >= threshold : val <= threshold;
        }

        if (type === 'gt') return val > v1;
        if (type === 'lt') return val < v1;
        if (type === 'eq') return val == v1;
        if (type === 'between') return val >= v1 && val <= v2;

        return false;
    };

    // Apply rules in priority order: Rule 1 > Rule 2 > Rule 3
    return values.map((val, index) => {
        if (val === null || val === undefined || isNaN(val)) return null;

        // 1. Check discrete rules first (R1 > R2 > R3)
        for (let ruleNum = 1; ruleNum <= 3; ruleNum++) {
            if (config[`rule${ruleNum}_enabled`] && config[`rule${ruleNum}_type`] !== 'gradient') {
                if (checkDiscrete(val, ruleNum, values)) {
                    return config[`rule${ruleNum}_color`];
                }
            }
        }

        // 2. If no discrete rule matched, check gradient rules (R1 > R2 > R3)
        for (let ruleNum = 1; ruleNum <= 3; ruleNum++) {
            if (config[`rule${ruleNum}_enabled`] && config[`rule${ruleNum}_type`] === 'gradient') {
                const numericValues = values.filter(v => typeof v === 'number' && v !== null && v !== undefined);
                const min = Math.min(...numericValues);
                const max = Math.max(...numericValues);
                const ratio = (max === min) ? 0.5 : (val - min) / (max - min);
                return this.interpolateColor(config[`rule${ruleNum}_color`] || defaultColor, config[`rule${ruleNum}_color2`] || defaultColor, ratio);
            }
        }

        // No rule matched - return null (updateAsync handles fallback to series color)
        return null;
    });
  },

  getColors: function(values, config, baseColor, callerInfo = 'unknown') {
  console.log(`[getColors] Called from: ${callerInfo}, baseColor: ${baseColor}`);

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

    if (val === null || val === undefined || isNaN(val)) return false;

    // Top N / Bottom N logic
    if (type === 'topn' || type === 'bottomn') {
        const numericVals = allVals.filter(v => typeof v === 'number');
        const n = Math.max(1, Math.floor(v1 || 5));
        const uniqueSorted = [...new Set(numericVals)].sort((a, b) => type === 'topn' ? b - a : a - b);

        if (uniqueSorted.length === 0) return false;
        if (n >= uniqueSorted.length) return true;

        const threshold = uniqueSorted[n - 1];
        return type === 'topn' ? val >= threshold : val <= threshold;
    }


    if (type === 'gt') return val > v1;
    if (type === 'lt') return val < v1;
    if (type === 'eq') return val == v1;
    if (type === 'between') return val >= v1 && val <= v2;

    return false;
  };

  // Apply rules in priority order: Discrete (R1>R2>R3) -> Gradient (R1>R2>R3) -> Base Color
  return values.map((val, index) => {
    if (val === null || val === undefined || isNaN(val)) return baseColor;

    let matchedColor = null;

    // 1. Check Discrete Rules
    for (let ruleNum = 1; ruleNum <= 3; ruleNum++) {
        if (config[`rule${ruleNum}_enabled`] && config[`rule${ruleNum}_type`] !== 'gradient') {
            if (checkDiscrete(val, ruleNum, values)) {
                matchedColor = config[`rule${ruleNum}_color`];
                break;
            }
        }
    }

    if (matchedColor) return matchedColor;

    // 2. Check Gradient Rules (only if no discrete rule matched)
    for (let ruleNum = 1; ruleNum <= 3; ruleNum++) {
        if (config[`rule${ruleNum}_enabled`] && config[`rule${ruleNum}_type`] === 'gradient') {
            const numericValues = values.filter(v => typeof v === 'number' && v !== null && v !== undefined);
            const min = Math.min(...numericValues);
            const max = Math.max(...numericValues);
            const ratio = (max === min) ? 0.5 : (val - min) / (max - min);
            return this.interpolateColor(config[`rule${ruleNum}_color`] || baseColor, config[`rule${ruleNum}_color2`] || baseColor, ratio);
        }
    }

    // 3. No rule matched
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
