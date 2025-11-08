/**
 * Treemap Visualization for Looker
 * Studio-inspired hierarchical treemap with drill-down and multi-dimension support
 */

looker.plugins.visualizations.add({
  id: "treemap_viz",
  label: "Treemap",
  options: {
    // ========== PLOT SECTION ==========
    background_color: {
      type: "string",
      label: "Background Color",
      default: "#F5F5F5",
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
      default: 2,
      section: "Plot"
    },
    enable_drill_down: {
      type: "boolean",
      label: "Enable Drill Down",
      default: true,
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
      label: "Use Gradient (Metric Color)",
      default: true,
      section: "Series"
    },
    gradient_start_color: {
      type: "string",
      label: "Gradient Start Color",
      default: "#F1F8E9",
      display: "color",
      section: "Series"
    },
    gradient_end_color: {
      type: "string",
      label: "Gradient End Color",
      default: "#33691E",
      display: "color",
      section: "Series"
    },
    series_title: {
      type: "string",
      label: "Series Title Override",
      placeholder: "Leave blank to use measure name",
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
      default: 0,
      section: "Values"
    },
    wrap_labels: {
      type: "boolean",
      label: "Wrap Long Labels",
      default: true,
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
      default: 11,
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

      # .treemap-container {
      #   width: 100%;
      #   height: 100%;
      #   position: relative;
      #   font-family: 'Roboto', Arial, sans-serif;
      #   overflow: hidden;
      # }

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
      }

      .treemap-rect {
        cursor: pointer;
        transition: opacity 0.2s ease, stroke-width 0.2s ease;
      }

      .treemap-rect:hover {
        opacity: 0.85;
        stroke-width: 3px !important;
      }

      .treemap-label {
        pointer-events: none;
        user-select: none;
        font-weight: 600;
      }

      .treemap-value {
        pointer-events: none;
        user-select: none;
        font-weight: 400;
      }

      .treemap-breadcrumb {
        position: absolute;
        top: 10px;
        left: 10px;
        background: rgba(255, 255, 255, 0.95);
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 12px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        z-index: 100;
        display: none;
      }

      .breadcrumb-item {
        cursor: pointer;
        color: #1A73E8;
        text-decoration: none;
      }

      .breadcrumb-item:hover {
        text-decoration: underline;
      }

      .breadcrumb-separator {
        margin: 0 6px;
        color: #666;
      }

      .treemap-tooltip {
        position: absolute;
        background: rgba(0, 0, 0, 0.85);
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 12px;
        pointer-events: none;
        z-index: 1000;
        display: none;
        max-width: 250px;
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
      this._svg.innerHTML = '<text x="50%" y="50%" text-anchor="middle" fill="#666">No data</text>';
      done();
      return;
    }

    const dimensions = queryResponse.fields.dimension_like;
    const measures = queryResponse.fields.measure_like;

    if (dimensions.length === 0 || measures.length === 0) {
      this._svg.innerHTML = '<text x="50%" y="50%" text-anchor="middle" fill="#666">Need 1+ dimensions and 1+ measures</text>';
      done();
      return;
    }

    this._container.style.backgroundColor = config.background_color || '#F5F5F5';
    this._queryResponse = queryResponse;
    this._config = config;
    this._allData = data;

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

    // Determine current dimension level
    const currentLevel = this._drillStack.length;
    const dimension = dimensions[Math.min(currentLevel, dimensions.length - 1)].name;
    const measure = measures[0].name;

    // Build hierarchical data
    let treemapData;
    if (dimensions.length > 1 && currentLevel < dimensions.length) {
      treemapData = this.buildHierarchicalData(data, dimensions, measure, currentLevel);
    } else {
      treemapData = data.map(row => ({
        name: row[dimension].value,
        value: Math.abs(row[measure].value || 0),
        rawValue: row[measure].value || 0,
        dimension: dimension,
        level: currentLevel
      })).filter(d => d.value > 0);
    }

    // Update breadcrumb
    this.updateBreadcrumb();

    // Draw
    this.renderTreemap(treemapData, config);
  },

  buildHierarchicalData: function(data, dimensions, measure, currentLevel) {
    const dimension = dimensions[currentLevel].name;
    const grouped = {};

    data.forEach(row => {
      const key = row[dimension].value;
      if (!grouped[key]) {
        grouped[key] = { name: key, value: 0, rawValue: 0, children: [], level: currentLevel };
      }
      const val = Math.abs(row[measure].value || 0);
      grouped[key].value += val;
      grouped[key].rawValue += (row[measure].value || 0);

      // Store child data if next dimension exists
      if (dimensions[currentLevel + 1]) {
        grouped[key].children.push(row);
      }
    });

    return Object.values(grouped).filter(d => d.value > 0);
  },

  renderTreemap: function(data, config) {
    const svgNS = "http://www.w3.org/2000/svg";
    this._svg.innerHTML = '';

    const rect = this._svg.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    if (width === 0 || height === 0) return;

    this._svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    // Full tile - no margins
    const layout = this.squarify(data, 0, 0, width, height);
    const colors = this.getColors(data, config);

    layout.forEach((item, i) => {
      const g = document.createElementNS(svgNS, 'g');

      // Rectangle
      const rect = document.createElementNS(svgNS, 'rect');
      rect.setAttribute('x', item.x);
      rect.setAttribute('y', item.y);
      rect.setAttribute('width', item.width);
      rect.setAttribute('height', item.height);

      // Recalculate color based on actual value for gradient
      let fillColor;
      if (config.color_by === 'metric' && config.use_gradient !== false) {
        const allValues = layout.map(d => d.value);
        const min = Math.min(...allValues);
        const max = Math.max(...allValues);
        const ratio = (item.value - min) / (max - min || 1);
        fillColor = this.interpolateColor(
          config.gradient_start_color || '#F1F8E9',
          config.gradient_end_color || '#33691E',
          ratio
        );
      } else {
        fillColor = colors[i % colors.length];
      }

      rect.setAttribute('fill', fillColor);
      rect.setAttribute('stroke', config.border_color || '#FFFFFF');
      rect.setAttribute('stroke-width', config.border_width || 2);
      rect.setAttribute('class', 'treemap-rect');

      // Click handler for drill-down
      if (config.enable_drill_down !== false && item.children && item.children.length > 0) {
        rect.style.cursor = 'pointer';
        rect.addEventListener('click', () => {
          this._drillStack.push(item.name);
          this.drawTreemap(item.children, config, this._queryResponse);
        });
      }

      // Tooltip
      rect.addEventListener('mouseenter', (e) => {
        const total = layout.reduce((sum, d) => sum + d.value, 0);
        const pct = ((item.value / total) * 100).toFixed(1);
        this._tooltip.innerHTML = `<strong>${item.name}</strong><br/>${this.formatValue(item.rawValue)} (${pct}%)`;
        this._tooltip.style.display = 'block';
      });

      rect.addEventListener('mousemove', (e) => {
        this._tooltip.style.left = (e.pageX + 10) + 'px';
        this._tooltip.style.top = (e.pageY + 10) + 'px';
      });

      rect.addEventListener('mouseleave', () => {
        this._tooltip.style.display = 'none';
      });

      g.appendChild(rect);

      // Labels
      const total = layout.reduce((sum, d) => sum + d.value, 0);
      const percentage = (item.value / total) * 100;
      const minThreshold = config.label_threshold || 0;

      if (percentage >= minThreshold) {
        this.addLabels(g, item, config, svgNS);
      }

      this._svg.appendChild(g);
    });
  },

  # addLabels: function(g, item, config, svgNS) {
  #   const padding = 6;
  #   const centerX = item.x + item.width / 2;
  #   const centerY = item.y + item.height / 2;

  #   const labelFontSize = config.label_font_size || 12;
  #   const valueFontSize = config.value_font_size || 11;

  #   // Estimate text sizes
  #   const labelText = item.name.toString();
  #   const valueText = config.show_values !== false ? this.formatValue(item.rawValue) : '';

  #   const labelWidth = this.estimateTextWidth(labelText, labelFontSize);
  #   const valueWidth = this.estimateTextWidth(valueText, valueFontSize);

  #   const availableWidth = item.width - (padding * 2);
  #   const availableHeight = item.height - (padding * 2);

  #   const totalTextHeight = (config.show_labels ? labelFontSize : 0) +
  #                         (config.show_values ? valueFontSize + 4 : 0);

  #   // Only show if fits
  #   if (availableWidth < 30 || availableHeight < totalTextHeight) return;

  #   let yOffset = centerY - totalTextHeight / 2;

  #   // Label
  #   if (config.show_labels !== false) {
  #     const wrappedLabel = config.wrap_labels !== false ?
  #       this.wrapText(labelText, availableWidth, labelFontSize) : [labelText];

  #     wrappedLabel.forEach((line, idx) => {
  #       const label = document.createElementNS(svgNS, 'text');
  #       label.setAttribute('x', centerX);
  #       label.setAttribute('y', yOffset + labelFontSize + (idx * (labelFontSize + 2)));
  #       label.setAttribute('text-anchor', 'middle');
  #       label.setAttribute('fill', config.label_color || '#000000');
  #       label.setAttribute('font-size', labelFontSize);
  #       label.setAttribute('class', 'treemap-label');
  #       label.textContent = line;
  #       g.appendChild(label);
  #     });

  #     yOffset += labelFontSize * wrappedLabel.length + 6;
  #   }

  #   // Value
  #   if (config.show_values !== false && valueText && availableWidth >= valueWidth) {
  #     const value = document.createElementNS(svgNS, 'text');
  #     value.setAttribute('x', centerX);
  #     value.setAttribute('y', yOffset + valueFontSize);
  #     value.setAttribute('text-anchor', 'middle');
  #     value.setAttribute('fill', config.value_color || '#000000');
  #     value.setAttribute('font-size', valueFontSize);
  #     value.setAttribute('class', 'treemap-value');
  #     value.textContent = valueText;
  #     g.appendChild(value);
  #   }
  # },

  addLabels: function(g, item, config, svgNS) {
    const padding = 4;
    const centerX = item.x + item.width / 2;
    const centerY = item.y + item.height / 2;

    const labelFontSize = config.label_font_size || 12;
    const valueFontSize = config.value_font_size || 11;
    const minFontSize = 8; // Minimum readable font size

    const availableWidth = item.width - (padding * 2);
    const availableHeight = item.height - (padding * 2);

    // Ultra-small tiles: show nothing
    if (availableWidth < 20 || availableHeight < 12) return;

    const labelText = item.name.toString();
    const valueText = this.formatValue(item.rawValue);

    // Strategy based on tile size
    if (availableWidth < 50) {
      // Very narrow: vertical text or value only
      if (availableHeight > 40 && config.show_values !== false) {
        const value = document.createElementNS(svgNS, 'text');
        value.setAttribute('x', centerX);
        value.setAttribute('y', centerY);
        value.setAttribute('text-anchor', 'middle');
        value.setAttribute('fill', config.value_color || '#000000');
        value.setAttribute('font-size', Math.max(minFontSize, Math.min(valueFontSize, availableWidth - 4)));
        value.setAttribute('class', 'treemap-value');
        value.setAttribute('transform', `rotate(-90 ${centerX} ${centerY})`);
        value.textContent = valueText;
        g.appendChild(value);
      }
      return;
    }

    // Calculate what fits
    const showBothLabels = availableHeight >= (labelFontSize + valueFontSize + 8);

    let yOffset = showBothLabels ?
    centerY - (labelFontSize + valueFontSize) / 2 :
    centerY;

    // Label
    if (config.show_labels !== false && showBothLabels) {
      const wrappedLabel = config.wrap_labels !== false ?
      this.wrapText(labelText, availableWidth, labelFontSize) : [labelText];

      wrappedLabel.slice(0, 2).forEach((line, idx) => { // Max 2 lines for small tiles
        const label = document.createElementNS(svgNS, 'text');
        label.setAttribute('x', centerX);
        label.setAttribute('y', yOffset + labelFontSize + (idx * (labelFontSize + 2)));
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('fill', config.label_color || '#000000');
        label.setAttribute('font-size', Math.max(minFontSize, labelFontSize));
        label.setAttribute('class', 'treemap-label');
        label.textContent = line;
        g.appendChild(label);
      });

      yOffset += labelFontSize * Math.min(2, wrappedLabel.length) + 6;
    }

    // Value - always try to show if enabled
    if (config.show_values !== false) {
      const adjustedValueSize = Math.max(minFontSize, Math.min(valueFontSize, availableHeight - 8));
      const value = document.createElementNS(svgNS, 'text');
      value.setAttribute('x', centerX);
      value.setAttribute('y', showBothLabels ? yOffset + adjustedValueSize : centerY + adjustedValueSize / 2);
      value.setAttribute('text-anchor', 'middle');
      value.setAttribute('fill', config.value_color || '#000000');
      value.setAttribute('font-size', adjustedValueSize);
      value.setAttribute('class', 'treemap-value');
      value.textContent = valueText;
      g.appendChild(value);
    }
  },

  wrapText: function(text, maxWidth, fontSize) {
    const maxCharsPerLine = Math.floor(maxWidth / (fontSize * 0.55));
    if (text.length <= maxCharsPerLine) return [text];

    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    words.forEach(word => {
      if ((currentLine + word).length <= maxCharsPerLine) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    });

    if (currentLine) lines.push(currentLine);
    return lines.slice(0, 3); // Max 3 lines
  },

  estimateTextWidth: function(text, fontSize) {
    return text.length * fontSize * 0.55;
  },

  updateBreadcrumb: function() {
    if (this._drillStack.length === 0) {
      this._breadcrumb.style.display = 'none';
      return;
    }

    this._breadcrumb.style.display = 'block';
    let html = '<span class="breadcrumb-item" data-level="-1">All</span>';

    this._drillStack.forEach((item, idx) => {
      html += '<span class="breadcrumb-separator">›</span>';
      html += `<span class="breadcrumb-item" data-level="${idx}">${item}</span>`;
    });

    this._breadcrumb.innerHTML = html;

    // Add click handlers
    this._breadcrumb.querySelectorAll('.breadcrumb-item').forEach(elem => {
      elem.addEventListener('click', () => {
        const level = parseInt(elem.getAttribute('data-level'));
        if (level === -1) {
          this._drillStack = [];
        } else {
          this._drillStack = this._drillStack.slice(0, level + 1);
        }
        this.drawTreemap(this._allData, this._config, this._queryResponse);
      });
    });
  },

  squarify: function(data, x, y, width, height) {
    if (data.length === 0) return [];

    const total = data.reduce((sum, d) => sum + d.value, 0);
    const sorted = [...data].sort((a, b) => b.value - a.value);

    return this.squarifyRecursive(sorted, x, y, width, height, total);
  },

  squarifyRecursive: function(items, x, y, width, height, total) {
    if (items.length === 0) return [];
    if (items.length === 1) {
      return [{...items[0], x, y, width, height}];
    }

    const result = [];
    const horizontal = width >= height;
    let current = 0;
    let remaining = items.slice();

    while (remaining.length > 0) {
      const row = [remaining.shift()];
      let rowValue = row[0].value;

      while (remaining.length > 0 && this.worstAspectRatio(row, width, height, total) >=
             this.worstAspectRatio([...row, remaining[0]], width, height, total)) {
        row.push(remaining.shift());
        rowValue += row[row.length - 1].value;
      }

      const ratio = rowValue / total;

      if (horizontal) {
        const rowWidth = width * ratio;
        row.forEach((item, i) => {
          const itemRatio = item.value / rowValue;
          const itemHeight = height * itemRatio;
          result.push({
            ...item,
            x: x + current,
            y: y + (i === 0 ? 0 : row.slice(0, i).reduce((sum, r) => sum + (height * r.value / rowValue), 0)),
            width: rowWidth,
            height: itemHeight
          });
        });
        current += rowWidth;
        width -= rowWidth;
      } else {
        const rowHeight = height * ratio;
        row.forEach((item, i) => {
          const itemRatio = item.value / rowValue;
          const itemWidth = width * itemRatio;
          result.push({
            ...item,
            x: x + (i === 0 ? 0 : row.slice(0, i).reduce((sum, r) => sum + (width * r.value / rowValue), 0)),
            y: y + current,
            width: itemWidth,
            height: rowHeight
          });
        });
        current += rowHeight;
        height -= rowHeight;
      }

      total -= rowValue;
    }

    return result;
  },

  worstAspectRatio: function(items, width, height, total) {
    const rowValue = items.reduce((sum, item) => sum + item.value, 0);
    const rowRatio = rowValue / total;
    const horizontal = width >= height;
    const size = horizontal ? width * rowRatio : height * rowRatio;
    const perp = horizontal ? height : width;

    let worst = 0;
    items.forEach(item => {
      const itemSize = (item.value / rowValue) * perp;
      const ratio = Math.max(size / itemSize, itemSize / size);
      worst = Math.max(worst, ratio);
    });

    return worst;
  },

  getColors: function(data, config) {
    const colorBy = config.color_by || 'metric';

    if (colorBy === 'metric' && config.use_gradient !== false) {
      const values = data.map(d => d.value);
      const min = Math.min(...values);
      const max = Math.max(...values);

      return data.map(d => {
        const ratio = (d.value - min) / (max - min || 1);
        return this.interpolateColor(
          config.gradient_start_color || '#F1F8E9',
          config.gradient_end_color || '#33691E',
          ratio
        );
      });
    }

    return this.getPalette(config.color_palette || 'green_scale', data.length);
  },

  getPalette: function(name, count) {
    const palettes = {
      green_scale: ['#F1F8E9', '#C5E1A5', '#9CCC65', '#7CB342', '#558B2F', '#33691E'],
      blue_scale: ['#E3F2FD', '#90CAF9', '#42A5F5', '#1E88E5', '#1565C0', '#0D47A1'],
      google: ['#4285F4', '#EA4335', '#FBBC04', '#34A853', '#FF6D00', '#46BDC6'],
      viridis: ['#440154', '#3B528B', '#21908C', '#5DC863', '#FDE725'],
      warm: ['#FFF5EB', '#FDD0A2', '#FD8D3C', '#E6550D', '#A63603'],
      cool: ['#F0F9FF', '#9ECAE1', '#4292C6', '#08519C', '#08306B']
    };

    const palette = palettes[name] || palettes.green_scale;

    // Interpolate to match data count
    if (count <= palette.length) return palette;

    const result = [];
    for (let i = 0; i < count; i++) {
      const ratio = i / (count - 1);
      const idx = ratio * (palette.length - 1);
      const lower = Math.floor(idx);
      const upper = Math.ceil(idx);
      const blend = idx - lower;

      result.push(this.interpolateColor(palette[lower], palette[upper], blend));
    }
    return result;
  },

  interpolateColor: function(color1, color2, ratio) {
    const hex = (c) => {
      const h = c.replace('#', '');
      return {
        r: parseInt(h.substr(0, 2), 16),
        g: parseInt(h.substr(2, 2), 16),
        b: parseInt(h.substr(4, 2), 16)
      };
    };

    const c1 = hex(color1);
    const c2 = hex(color2);

    const r = Math.round(c1.r + (c2.r - c1.r) * ratio);
    const g = Math.round(c1.g + (c2.g - c1.g) * ratio);
    const b = Math.round(c1.b + (c2.b - c1.b) * ratio);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
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
  }
});
