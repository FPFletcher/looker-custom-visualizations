/**
 * Treemap Visualization for Looker
 * Studio-inspired hierarchical treemap with drill-down
 */

looker.plugins.visualizations.add({
  id: "treemap_viz",
  label: "Treemap",
  options: {
    // ========== PLOT SECTION ==========
    background_color: {
      type: "string",
      label: "Background Color",
      default: "#FFFFFF",
      display: "color",
      section: "Plot"
    },
    border_color: {
      type: "string",
      label: "Border Color",
      default: "#FFFFFF",
      display: "color",
      section: "Plot"
    },
    border_width: {
      type: "number",
      label: "Border Width",
      default: 1,
      section: "Plot"
    },
    enable_drill_down: {
      type: "boolean",
      label: "Enable Drill Down",
      default: true,
      section: "Plot"
    },
    others_toggle: {
      type: "boolean",
      label: "Group Small Items into 'Others'",
      default: true,
      section: "Plot"
    },
    others_threshold: {
      type: "number",
      label: "Others Threshold %",
      default: 0.5,
      min: 0.1,
      max: 10,
      step: 0.1,
      section: "Plot"
    },

    // ========== SERIES SECTION ==========
    color_by: {
      type: "string",
      label: "Color By",
      display: "select",
      values: [
        {"Dimension Values": "dimension"},
        {"Metric Value": "metric"}
      ],
      default: "metric",
      section: "Series"
    },
    color_palette: {
      type: "string",
      label: "Color Palette",
      display: "select",
      values: [
        {"Green Scale": "green_scale"},
        {"Blue Scale": "blue_scale"},
        {"Google Colors": "google"},
        {"Viridis": "viridis"},
        {"Warm": "warm"},
        {"Cool": "cool"}
      ],
      default: "green_scale",
      section: "Series"
    },
    use_gradient: {
      type: "boolean",
      label: "Use Gradient",
      default: true,
      section: "Series"
    },
    reverse_palette: {
      type: "boolean",
      label: "Reverse Palette",
      default: false,
      section: "Series"
    },
    gradient_start_color: {
      type: "string",
      label: "Gradient Start",
      default: "#F1F8E9",
      display: "color",
      section: "Series"
    },
    gradient_end_color: {
      type: "string",
      label: "Gradient End",
      default: "#33691E",
      display: "color",
      section: "Series"
    },

    // ========== VALUES SECTION ==========
    show_labels: {
      type: "boolean",
      label: "Show Labels",
      default: true,
      section: "Values"
    },
    show_values: {
      type: "boolean",
      label: "Show Values",
      default: true,
      section: "Values"
    },
    label_threshold: {
      type: "number",
      label: "Min % to Show Label",
      default: 0.01,
      section: "Values"
    },
    label_font_size: {
      type: "number",
      label: "Label Font Size",
      default: 12,
      section: "Values"
    },
    value_font_size: {
      type: "number",
      label: "Value Font Size",
      default: 12,
      section: "Values"
    },
    label_color: {
      type: "string",
      label: "Label Color",
      default: "#000000",
      display: "color",
      section: "Values"
    },
    value_color: {
      type: "string",
      label: "Value Color",
      default: "#000000",
      display: "color",
      section: "Values"
    }
  },

  create: function(element, config) {
    const style = document.createElement('style');
    style.innerHTML = `
      .treemap-container {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        font-family: 'Roboto', Arial, sans-serif;
        overflow: hidden;
        padding: 0;
        margin: 0;
      }
      .treemap-svg {
        width: 100%;
        height: 100%;
        display: block;
      }
      .treemap-rect {
        cursor: pointer;
        transition: opacity 0.1s;
      }
      .treemap-rect:hover {
        opacity: 0.85;
      }
      .treemap-label, .treemap-value {
        pointer-events: none;
        user-select: none;
      }
      .treemap-label {
        font-weight: 500;
      }
      .treemap-value {
        font-weight: 400;
      }
      .treemap-breadcrumb {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background: rgba(255,255,255,0.95);
        padding: 8px 12px;
        border-bottom: 1px solid #ddd;
        font-size: 13px;
        z-index: 10;
        display: none;
        box-sizing: border-box;
      }
      .breadcrumb-item {
        cursor: pointer;
        color: #1976D2;
        font-weight: 500;
      }
      .breadcrumb-item:hover {
        text-decoration: underline;
      }
      .breadcrumb-separator {
        margin: 0 8px;
        color: #999;
      }
      .treemap-tooltip {
        position: absolute;
        background: rgba(33,33,33,0.9);
        color: white;
        padding: 6px 10px;
        border-radius: 4px;
        font-size: 12px;
        pointer-events: none;
        z-index: 1000;
        display: none;
        white-space: nowrap;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      }
    `;

    if (!document.getElementById('treemap-styles')) {
      style.id = 'treemap-styles';
      document.head.appendChild(style);
    }

    element.innerHTML = `
      <div class="treemap-container">
        <div class="treemap-breadcrumb"></div>
        <svg class="treemap-svg"></svg>
        <div class="treemap-tooltip"></div>
      </div>
    `;

    this._container = element.querySelector('.treemap-container');
    this._svg = element.querySelector('.treemap-svg');
    this._tooltip = element.querySelector('.treemap-tooltip');
    this._breadcrumb = element.querySelector('.treemap-breadcrumb');
    this._drillStack = [];
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    this.clearErrors();

    if (!data || data.length === 0) {
      this._svg.innerHTML = '<text x="50%" y="50%" text-anchor="middle" fill="#999">No data to display</text>';
      done();
      return;
    }

    const dimensions = queryResponse.fields.dimension_like;
    const measures = queryResponse.fields.measure_like;

    if (dimensions.length === 0 || measures.length === 0) {
      this._svg.innerHTML = '<text x="50%" y="50%" text-anchor="middle" fill="#999">Treemap requires 1 Dimension and 1 Measure</text>';
      done();
      return;
    }

    this._container.style.backgroundColor = config.background_color;
    this._queryResponse = queryResponse;
    this._config = config;
    this._allData = data;

    // Reset drill if Others toggle or threshold changed
    const othersChanged = this._lastOthersToggle !== config.others_toggle ||
    this._lastOthersThreshold !== config.others_threshold;

    if (othersChanged) {
      this._drillStack = [];
      this._lastOthersToggle = config.others_toggle;
      this._lastOthersThreshold = config.others_threshold;
    }

    // Reset drill if dimensions changed
    if (this._lastDimensionCount !== dimensions.length) {
      this._drillStack = [];
      this._lastDimensionCount = dimensions.length;
    }

    this.drawTreemap(data, config, queryResponse);
    done();
  },

  drawTreemap: function(data, config, queryResponse) {
    const dimensions = queryResponse.fields.dimension_like;
    const measures = queryResponse.fields.measure_like;
    const currentLevel = this._drillStack.length;
    const dimension = dimensions[Math.min(currentLevel, dimensions.length - 1)].name;
    const measure = measures[0].name;

    let treemapData;
    // Build hierarchical or flat data based on drill level
    if (dimensions.length > 1 && currentLevel < dimensions.length) {
      treemapData = this.buildHierarchicalData(data, dimensions, measure, currentLevel);
    } else {
      treemapData = data.map(row => ({
        name: row[dimension].value,
        value: Math.max(0, row[measure].value || 0),
        rawValue: row[measure].value || 0,
        dimension: dimension,
        level: currentLevel,
        children: null
      })).filter(d => d.value > 0);
    }

    // --- GROUPING LOGIC ---
    // Only group if toggle is ON and there are enough items to justify it
    if (config.others_toggle && treemapData.length > 5) {
      // Convert percentage input (e.g., 0.5) to decimal (0.005)
      const threshold = (config.others_threshold || 0.5) / 100;
      treemapData = this.groupSmallItems(treemapData, threshold);
    }

    // --- SORTING LOGIC ---
    // Sort descending (b.value - a.value) so largest items are top-left.
    // Explicitly force the "Others" node to the end of the list so it renders bottom-right.
    treemapData.sort((a, b) => {
      if (a.isOthers) return 1;  // 'a' is Others, push it to the end
      if (b.isOthers) return -1; // 'b' is Others, keep it at the end
      return b.value - a.value;  // Standard descending sort for the rest
    });

    this.updateBreadcrumb();
    this.renderTreemap(treemapData, config);
  },

  groupSmallItems: function(data, threshold) {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    const visible = [];
    const others = [];

    data.forEach(d => {
      if (d.isOthers || (d.value / total) >= threshold) {
        visible.push(d);
      } else {
        others.push(d);
      }
    });

    if (others.length > 1) {
      visible.push({
        name: "Others",
        value: others.reduce((s, d) => s + d.value, 0),
        rawValue: others.reduce((s, d) => s + d.rawValue, 0),
        children: others.map(o => ({...o})),
        isOthers: true,
        level: others[0].level,
        dimension: others[0].dimension
      });
    }

    return visible.length > 0 ? visible : data;
  },

  buildHierarchicalData: function(data, dimensions, measure, currentLevel) {
    const dimension = dimensions[currentLevel].name;
    const grouped = {};

    data.forEach(row => {
      const key = row[dimension].value;
      const safeKey = "k_" + key;
      if (!grouped[safeKey]) {
        grouped[safeKey] = {
          name: key,
          value: 0,
          rawValue: 0,
          children: [],
          level: currentLevel
        };
      }
      const val = row[measure].value || 0;
      grouped[safeKey].value += Math.max(0, val);
      grouped[safeKey].rawValue += val;

      if (dimensions[currentLevel + 1]) {
        grouped[safeKey].children.push(row);
      }
    });

    return Object.values(grouped).filter(d => d.value > 0);
  },

  renderTreemap: function(data, config) {
    const svgNS = "http://www.w3.org/2000/svg";
    this._svg.innerHTML = '';

    const rect = this._container.getBoundingClientRect();
    const breadcrumbHeight = this._drillStack.length > 0 ? 36 : 0;
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height - breadcrumbHeight);

    if (width <= 0 || height <= 0) return;

    this._svg.style.marginTop = `${breadcrumbHeight}px`;
    this._svg.style.height = `calc(100% - ${breadcrumbHeight}px)`;
    this._svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    // CRITICAL FIX: Calculate colors from CURRENT data, not this._allData
    const colors = this.getColors(data, config);
    const total = data.reduce((sum, d) => sum + d.value, 0);

    // Simple squarified layout
    const layout = this.squarify(data, 0, 0, width, height, total);

    layout.forEach((item, i) => {
      const g = document.createElementNS(svgNS, 'g');
      const rect = document.createElementNS(svgNS, 'rect');

      rect.setAttribute('x', Math.round(item.x));
      rect.setAttribute('y', Math.round(item.y));
      rect.setAttribute('width', Math.max(1, Math.round(item.width)));
      rect.setAttribute('height', Math.max(1, Math.round(item.height)));

      // CRITICAL FIX: Use colors calculated from CURRENT data
      let fillColor;
      if (config.color_by === 'metric' && config.use_gradient) {
        const allValues = data.map(d => d.value);
        const min = Math.min(...allValues);
        const max = Math.max(...allValues);
        const ratio = (max === min) ? 0.5 : (item.value - min) / (max - min);

        let startColor = config.gradient_start_color || '#F1F8E9';
        let endColor = config.gradient_end_color || '#33691E';

        if (config.reverse_palette) {
          [startColor, endColor] = [endColor, startColor];
        }

        fillColor = this.interpolateColor(startColor, endColor, ratio);
      } else {
        fillColor = colors[i % colors.length];
      }

      rect.setAttribute('fill', fillColor);
      rect.setAttribute('stroke', config.border_color);
      rect.setAttribute('stroke-width', config.border_width);
      rect.setAttribute('class', 'treemap-rect');

      if (config.enable_drill_down && item.children && item.children.length > 0) {
        rect.addEventListener('click', () => {
          this._drillStack.push(item.name);

          let childData = item.children;
          if (item.isOthers) {
            const currentLevel = this._drillStack.length;
            const dimensions = this._queryResponse.fields.dimension_like;
            if (currentLevel < dimensions.length) {
              childData = this.buildHierarchicalData(
                childData,
                dimensions,
                this._queryResponse.fields.measure_like[0].name,
                currentLevel
              );
            }
          }

          // CRITICAL: Pass childData, not this._allData
          this.drawTreemap(childData, this._config, this._queryResponse);
        });
      }

      rect.addEventListener('mouseenter', () => {
        const pct = ((item.value / total) * 100).toFixed(1);
        this._tooltip.innerHTML = `
          <div style="font-weight:600">${item.name}</div>
          <div>${this.formatValue(item.rawValue)} (${pct}%)</div>
          ${item.children && item.children.length > 0 ? '<div style="font-size:10px">(Click to drill)</div>' : ''}
        `;
        this._tooltip.style.display = 'block';
      });

      rect.addEventListener('mousemove', (e) => {
        this._tooltip.style.left = (e.pageX + 12) + 'px';
        this._tooltip.style.top = (e.pageY + 12) + 'px';
      });

      rect.addEventListener('mouseleave', () => {
        this._tooltip.style.display = 'none';
      });

      g.appendChild(rect);

      if ((item.value / total) * 100 >= (config.label_threshold || 0)) {
        this.addLabels(g, item, config, svgNS);
      }

      this._svg.appendChild(g);
    });
  },

  squarify: function(data, x, y, width, height, total) {
    const result = [];
    if (data.length === 0) return result;

    const items = data.slice();
    let currentX = x;
    let currentY = y;
    let remainingWidth = width;
    let remainingHeight = height;

    while (items.length > 0) {
      const horizontal = remainingWidth >= remainingHeight;

      if (items.length === 1) {
        // Last item fills exactly
        result.push({
          ...items[0],
          x: currentX,
          y: currentY,
          width: remainingWidth,
          height: remainingHeight
        });
        break;
      }

      // Take first item
      const item = items.shift();
      const ratio = item.value / total;

      if (horizontal) {
        const itemWidth = remainingWidth * ratio;
        result.push({
          ...item,
          x: currentX,
          y: currentY,
          width: itemWidth,
          height: remainingHeight
        });
        currentX += itemWidth;
        remainingWidth -= itemWidth;
      } else {
        const itemHeight = remainingHeight * ratio;
        result.push({
          ...item,
          x: currentX,
          y: currentY,
          width: remainingWidth,
          height: itemHeight
        });
        currentY += itemHeight;
        remainingHeight -= itemHeight;
      }

      total -= item.value;
    }

    return result;
  },

  addLabels: function(g, item, config, svgNS) {
    const labelFontSize = config.label_font_size || 12;
    const valueFontSize = config.value_font_size || 12;
    const padding = 6;

    if (item.width < 30 || item.height < 20) return;

    const centerX = item.x + item.width / 2;
    const centerY = item.y + item.height / 2;

    if (config.show_labels) {
      const label = document.createElementNS(svgNS, 'text');
      label.setAttribute('x', centerX);
      label.setAttribute('y', centerY - 4);
      label.setAttribute('text-anchor', 'middle');
      label.setAttribute('fill', config.label_color);
      label.setAttribute('font-size', labelFontSize);
      label.setAttribute('class', 'treemap-label');

      const maxChars = Math.floor((item.width - padding * 2) / (labelFontSize * 0.6));
      const labelText = item.name.length > maxChars ? item.name.substring(0, maxChars - 2) + '..' : item.name;
      label.textContent = labelText;
      g.appendChild(label);
    }

    if (config.show_values) {
      const value = document.createElementNS(svgNS, 'text');
      value.setAttribute('x', centerX);
      value.setAttribute('y', centerY + valueFontSize);
      value.setAttribute('text-anchor', 'middle');
      value.setAttribute('fill', config.value_color);
      value.setAttribute('font-size', valueFontSize);
      value.setAttribute('class', 'treemap-value');
      value.textContent = this.formatValue(item.rawValue);
      g.appendChild(value);
    }
  },

  updateBreadcrumb: function() {
    if (this._drillStack.length === 0) {
      this._breadcrumb.style.display = 'none';
      return;
    }
    this._breadcrumb.style.display = 'block';
    let html = '<span class="breadcrumb-item" data-level="-1">All</span>';
    this._drillStack.forEach((item, idx) => {
      html += '<span class="breadcrumb-separator">/</span>';
      html += `<span class="breadcrumb-item" data-level="${idx}">${item}</span>`;
    });
    this._breadcrumb.innerHTML = html;
    this._breadcrumb.querySelectorAll('.breadcrumb-item').forEach(elem => {
      elem.addEventListener('click', (e) => {
        const level = parseInt(e.target.getAttribute('data-level'));
        this._drillStack = (level === -1) ? [] : this._drillStack.slice(0, level + 1);
        this.drawTreemap(this._allData, this._config, this._queryResponse);
      });
    });
  },

  getColors: function(data, config) {
    const palettes = {
      green_scale: ['#F1F8E9', '#DCEDC8', '#C5E1A5', '#AED581', '#9CCC65', '#8BC34A', '#7CB342', '#689F38', '#558B2F', '#33691E', '#1B5E20'],
      blue_scale: ['#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1', '#0A3D91'],
      google: ['#4285F4', '#EA4335', '#FBBC04', '#34A853', '#FF6D00', '#46BDC6', '#AB47BC', '#7BAAF7', '#F07B72', '#FCD04F', '#71C287'],
      viridis: ['#440154', '#482475', '#414487', '#355F8D', '#2A788E', '#21908C', '#22A884', '#42BE71', '#7AD151', '#BDDF26', '#FDE725'],
      warm: ['#FFF5EB', '#FEE6CE', '#FDD0A2', '#FDAE6B', '#FD8D3C', '#F16913', '#E6550D', '#D94801', '#A63603', '#7F2704'],
      cool: ['#F0F9FF', '#DEEBF7', '#C6DBEF', '#9ECAE1', '#6BAED6', '#4292C6', '#2171B5', '#08519C', '#08306B', '#041E42']
    };

    let palette = palettes[config.color_palette] || palettes.green_scale;

    if (config.reverse_palette) {
      palette = [...palette].reverse();
    }

    const count = data.length;

    if (count <= palette.length) {
      return palette.slice(0, count);
    }

    const colors = [];
    for (let i = 0; i < count; i++) {
      const pos = i / Math.max(1, count - 1);
      const idx = pos * (palette.length - 1);
      const lower = Math.floor(idx);
      const upper = Math.min(palette.length - 1, Math.ceil(idx));
      const blend = idx - lower;
      colors.push(this.interpolateColor(palette[lower], palette[upper], blend));
    }

    return colors;
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

  formatValue: function(value) {
    if (value >= 1e9) return (value / 1e9).toFixed(1) + 'B';
    if (value >= 1e6) return (value / 1e6).toFixed(1) + 'M';
    if (value >= 1e3) return (value / 1e3).toFixed(1) + 'K';
    return value.toFixed(0);
  }
});
