/**
 * Treemap Visualization for Looker
 * Studio-inspired hierarchical treemap with drill-down capabilities
 */

looker.plugins.visualizations.add({
  id: "treemap_viz",
  label: "Treemap",
  options: {
    // ========== DATA SECTION ==========
    color_by: {
      type: "string",
      label: "Color By",
      display: "select",
      values: [
        {"Dimension Values": "dimension"},
        {"Metric Value": "metric"},
        {"Custom Palette": "custom"}
      ],
      default: "dimension",
      section: "Data"
    },
    show_labels: {
      type: "boolean",
      label: "Show Labels",
      default: true,
      section: "Data"
    },
    show_values: {
      type: "boolean",
      label: "Show Values",
      default: true,
      section: "Data"
    },
    label_threshold: {
      type: "number",
      label: "Min % to Show Label",
      default: 2,
      section: "Data"
    },

    // ========== COLORS SECTION ==========
    color_palette: {
      type: "string",
      label: "Color Palette",
      display: "select",
      values: [
        {"Google Colors": "google"},
        {"Viridis": "viridis"},
        {"Blues": "blues"},
        {"Greens": "greens"},
        {"Warm": "warm"},
        {"Cool": "cool"},
        {"Custom": "custom"}
      ],
      default: "google",
      section: "Colors"
    },
    use_gradient: {
      type: "boolean",
      label: "Use Gradient (Metric Color)",
      default: false,
      section: "Colors"
    },
    gradient_start_color: {
      type: "string",
      label: "Gradient Start Color",
      default: "#E8F5E9",
      display: "color",
      section: "Colors"
    },
    gradient_end_color: {
      type: "string",
      label: "Gradient End Color",
      default: "#1B5E20",
      display: "color",
      section: "Colors"
    },
    custom_colors: {
      type: "string",
      label: "Custom Colors (comma-separated hex)",
      placeholder: "#FF6B6B,#4ECDC4,#45B7D1,#FFA07A",
      section: "Colors"
    },

    // ========== STYLE SECTION ==========
    border_color: {
      type: "string",
      label: "Border Color",
      default: "#FFFFFF",
      display: "color",
      section: "Style"
    },
    border_width: {
      type: "number",
      label: "Border Width",
      default: 2,
      section: "Style"
    },
    label_color: {
      type: "string",
      label: "Label Color",
      default: "#FFFFFF",
      display: "color",
      section: "Style"
    },
    label_font_size: {
      type: "number",
      label: "Label Font Size",
      default: 14,
      section: "Style"
    },
    value_font_size: {
      type: "number",
      label: "Value Font Size",
      default: 12,
      section: "Style"
    },
    background_color: {
      type: "string",
      label: "Background Color",
      default: "#F5F5F5",
      display: "color",
      section: "Style"
    }
  },

  create: function(element, config) {
    const style = document.createElement('style');
    style.innerHTML = `
      .treemap-container {
        width: 100%;
        height: 100%;
        position: relative;
        font-family: 'Roboto', Arial, sans-serif;
        overflow: hidden;
      }

      .treemap-svg {
        width: 100%;
        height: 100%;
      }

      .treemap-rect {
        cursor: pointer;
        transition: opacity 0.2s ease;
      }

      .treemap-rect:hover {
        opacity: 0.8;
        stroke-width: 3px;
      }

      .treemap-label {
        pointer-events: none;
        user-select: none;
        font-weight: 500;
      }

      .treemap-value {
        pointer-events: none;
        user-select: none;
        font-weight: 400;
        opacity: 0.9;
      }

      .treemap-tooltip {
        position: absolute;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 12px;
        pointer-events: none;
        z-index: 1000;
        display: none;
      }
    `;

    if (!document.getElementById('treemap-styles')) {
      style.id = 'treemap-styles';
      document.head.appendChild(style);
    }

    element.innerHTML = `
      <div class="treemap-container">
        <svg class="treemap-svg"></svg>
        <div class="treemap-tooltip"></div>
      </div>
    `;

    this._container = element.querySelector('.treemap-container');
    this._svg = element.querySelector('.treemap-svg');
    this._tooltip = element.querySelector('.treemap-tooltip');
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

    // Apply background
    this._container.style.backgroundColor = config.background_color || '#F5F5F5';

    // Prepare data
    const dimension = dimensions[0].name;
    const measure = measures[0].name;

    const treemapData = data.map(row => ({
      name: row[dimension].value,
      value: Math.abs(row[measure].value || 0),
      rawValue: row[measure].value || 0
    })).filter(d => d.value > 0);

    this.drawTreemap(treemapData, config);
    done();
  },

  drawTreemap: function(data, config) {
    const svgNS = "http://www.w3.org/2000/svg";
    this._svg.innerHTML = '';

    const rect = this._svg.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    if (width === 0 || height === 0) return;

    this._svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    // Calculate treemap layout using squarified algorithm
    const total = data.reduce((sum, d) => sum + d.value, 0);
    const layout = this.squarify(data, 0, 0, width, height, total);

    // Get colors
    const colors = this.getColors(data, config);

    // Draw rectangles
    layout.forEach((item, i) => {
      const g = document.createElementNS(svgNS, 'g');
      g.setAttribute('class', 'treemap-item');

      // Rectangle
      const rect = document.createElementNS(svgNS, 'rect');
      rect.setAttribute('x', item.x);
      rect.setAttribute('y', item.y);
      rect.setAttribute('width', item.width);
      rect.setAttribute('height', item.height);
      rect.setAttribute('fill', colors[i % colors.length]);
      rect.setAttribute('stroke', config.border_color || '#FFFFFF');
      rect.setAttribute('stroke-width', config.border_width || 2);
      rect.setAttribute('class', 'treemap-rect');

      // Tooltip
      rect.addEventListener('mouseenter', (e) => {
        this._tooltip.innerHTML = `<strong>${item.name}</strong><br/>${this.formatValue(item.rawValue)}`;
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
      const percentage = (item.value / total) * 100;
      const minThreshold = config.label_threshold || 2;

      if (percentage >= minThreshold && item.width > 50 && item.height > 30) {
        const centerX = item.x + item.width / 2;
        const centerY = item.y + item.height / 2;

        if (config.show_labels !== false) {
          const label = document.createElementNS(svgNS, 'text');
          label.setAttribute('x', centerX);
          label.setAttribute('y', centerY - 5);
          label.setAttribute('text-anchor', 'middle');
          label.setAttribute('fill', config.label_color || '#FFFFFF');
          label.setAttribute('font-size', config.label_font_size || 14);
          label.setAttribute('class', 'treemap-label');
          label.textContent = this.truncateText(item.name, item.width - 10);
          g.appendChild(label);
        }

        if (config.show_values !== false) {
          const value = document.createElementNS(svgNS, 'text');
          value.setAttribute('x', centerX);
          value.setAttribute('y', centerY + 15);
          value.setAttribute('text-anchor', 'middle');
          value.setAttribute('fill', config.label_color || '#FFFFFF');
          value.setAttribute('font-size', config.value_font_size || 12);
          value.setAttribute('class', 'treemap-value');
          value.textContent = this.formatValue(item.rawValue);
          g.appendChild(value);
        }
      }

      this._svg.appendChild(g);
    });
  },

  squarify: function(data, x, y, width, height, total) {
    if (data.length === 0) return [];

    const result = [];
    const sorted = [...data].sort((a, b) => b.value - a.value);

    let currentX = x;
    let currentY = y;
    let remainingWidth = width;
    let remainingHeight = height;

    sorted.forEach(item => {
      const area = (item.value / total) * (width * height);
      const aspectRatio = remainingWidth / remainingHeight;

      let itemWidth, itemHeight;

      if (aspectRatio > 1) {
        // Layout horizontally
        itemWidth = area / remainingHeight;
        itemHeight = remainingHeight;

        result.push({
          ...item,
          x: currentX,
          y: currentY,
          width: itemWidth,
          height: itemHeight
        });

        currentX += itemWidth;
        remainingWidth -= itemWidth;
      } else {
        // Layout vertically
        itemWidth = remainingWidth;
        itemHeight = area / remainingWidth;

        result.push({
          ...item,
          x: currentX,
          y: currentY,
          width: itemWidth,
          height: itemHeight
        });

        currentY += itemHeight;
        remainingHeight -= itemHeight;
      }
    });

    return result;
  },

  getColors: function(data, config) {
    const colorBy = config.color_by || 'dimension';

    if (colorBy === 'metric' && config.use_gradient) {
      // Gradient based on metric values
      const values = data.map(d => d.value);
      const min = Math.min(...values);
      const max = Math.max(...values);

      return data.map(d => {
        const ratio = (d.value - min) / (max - min || 1);
        return this.interpolateColor(
          config.gradient_start_color || '#E8F5E9',
          config.gradient_end_color || '#1B5E20',
          ratio
        );
      });
    }

    if (config.color_palette === 'custom' && config.custom_colors) {
      return config.custom_colors.split(',').map(c => c.trim());
    }

    return this.getPalette(config.color_palette || 'google');
  },

  getPalette: function(name) {
    const palettes = {
      google: ['#4285F4', '#EA4335', '#FBBC04', '#34A853', '#FF6D00', '#46BDC6', '#7BAAF7', '#F07B72', '#FCD04F', '#71C287'],
      viridis: ['#440154', '#3B528B', '#21908C', '#5DC863', '#FDE725'],
      blues: ['#EFF3FF', '#C6DBEF', '#9ECAE1', '#6BAED6', '#4292C6', '#2171B5', '#084594'],
      greens: ['#EDF8E9', '#C7E9C0', '#A1D99B', '#74C476', '#41AB5D', '#238B45', '#005A32'],
      warm: ['#FFF5EB', '#FEE6CE', '#FDD0A2', '#FDAE6B', '#FD8D3C', '#F16913', '#D94801'],
      cool: ['#F0F9FF', '#CCEBC5', '#A8DDB5', '#7BCCC4', '#4EB3D3', '#2B8CBE', '#08589E']
    };

    return palettes[name] || palettes.google;
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
  },

  truncateText: function(text, maxWidth) {
    const approxChars = Math.floor(maxWidth / 7);
    if (text.length <= approxChars) return text;
    return text.substring(0, approxChars - 3) + '...';
  }
});
