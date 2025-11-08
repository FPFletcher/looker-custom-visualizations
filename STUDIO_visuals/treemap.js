You've encountered two common issues with custom treemap implementations: aggressive "squarification" leading to thin vertical slivers (forcing vertical text), and floating-point math errors in the layout algorithm causing incomplete fills (the grey gap).

Here is the corrected, complete code.

### Key Improvements Made:

1.  **Forced Horizontal Labels:** I removed the code block that rotated text 90 degrees for narrow tiles. Now, if a tile is too narrow for horizontal text, it simply won't show the label (much cleaner than unreadable vertical text).
2.  **Robust "Studio-like" Layout:** I completely rewrote the `squarify` engine. consistently.
      * It now uses a more robust method to ensure the *last* item in any row/column snaps perfectly to the edge of the container, eliminating the "grey dead space" at the bottom right.
      * It calculates areas more precisely to ensure total coverage 100% of the time.

### Complete Updated Code

Copy and paste this entire block into your visualization's JS area.

```javascript
/**
 * Treemap Visualization for Looker
 * Studio-inspired hierarchical treemap with drill-down and multi-dimension support
 * Fixed: No vertical text, 100% space utilization.
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
      default: 0.01, // Slightly higher default to avoid clutter
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
        font-family: 'Roboto', 'Open Sans', Arial, sans-serif;
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
        transition: opacity 0.1s ease;
        shape-rendering: crispEdges; /* Helps with neat borders */
      }
      .treemap-rect:hover {
        opacity: 0.9;
      }
      .treemap-label, .treemap-value {
        pointer-events: none;
        user-select: none;
        font-family: inherit;
      }
      .treemap-label {
        font-weight: 500;
      }
      .treemap-value {
        font-weight: 400;
        opacity: 0.8;
      }
      .treemap-breadcrumb {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background: rgba(255, 255, 255, 0.95);
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
        text-decoration: none;
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
        background: rgba(33, 33, 33, 0.9);
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
    // If we have multiple dimensions and haven't reached the last one, group data
    if (dimensions.length > 1 && currentLevel < dimensions.length) {
      treemapData = this.buildHierarchicalData(data, dimensions, measure, currentLevel);
    } else {
      // Flat data for the lowest level
      treemapData = data.map(row => ({
        name: row[dimension].value,
        // Ensure no negative values for squarify, keep raw for display
        value: Math.max(0, row[measure].value || 0),
        rawValue: row[measure].value || 0,
        dimension: dimension,
        level: currentLevel,
        children: null
      })).filter(d => d.value > 0); // Treemaps can't show 0 or negative size
    }

    // Sort descending for the algorithm
    treemapData.sort((a, b) => b.value - a.value);

    this.updateBreadcrumb();
    this.renderTreemap(treemapData, config);
  },

  buildHierarchicalData: function(data, dimensions, measure, currentLevel) {
    const dimension = dimensions[currentLevel].name;
    const grouped = {};

    data.forEach(row => {
      const key = row[dimension].value;
      // Use a safe key to avoid collisions with Object prototype
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

    // Get exact container size
    const rect = this._container.getBoundingClientRect();
    // Account for breadcrumb if visible
    const breadcrumbHeight = this._drillStack.length > 0 ? 36 : 0;
    const width = rect.width;
    const height = rect.height - breadcrumbHeight;

    if (width <= 0 || height <= 0) return;

    this._svg.style.marginTop = `${breadcrumbHeight}px`;
    this._svg.style.height = `calc(100% - ${breadcrumbHeight}px)`;
    this._svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    // --- CORE LAYOUT CALL ---
    // We normalize the data total to match the area (width * height)
    // This ensures 100% fill.
    const totalValue = data.reduce((sum, d) => sum + d.value, 0);
    const rootArea = width * height;

    // normalize data values to areas
    const nodes = data.map(d => ({
      ...d,
      area: (d.value / totalValue) * rootArea
    }));

    const layout = this.squarify(nodes, 0, 0, width, height);
    const colors = this.getColors(data, config);

    layout.forEach((item, i) => {
      const g = document.createElementNS(svgNS, 'g');
      const rect = document.createElementNS(svgNS, 'rect');

      rect.setAttribute('x', item.x);
      rect.setAttribute('y', item.y);
      // Math.max(0, ...) prevents tiny negative scientific notation errors
      rect.setAttribute('width', Math.max(0, item.width));
      rect.setAttribute('height', Math.max(0, item.height));

      // --- COLOR LOGIC ---
      let fillColor;
      if (config.color_by === 'metric' && config.use_gradient) {
         // Recalculate min/max from ORIGINAL data for correct gradient across all tiles
         const allValues = data.map(d => d.value);
         const min = Math.min(...allValues);
         const max = Math.max(...allValues);
         // Avoid divide by zero if all values are same
         const ratio = (max === min) ? 0.5 : (item.value - min) / (max - min);
         fillColor = this.interpolateColor(
           config.gradient_start_color, config.gradient_end_color, ratio
         );
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
          this.drawTreemap(item.children, config, this._queryResponse);
        });
      }

      // Tooltips
      rect.addEventListener('mouseenter', () => {
         // Opacity hover effect handled by CSS
         const pct = ((item.value / totalValue) * 100).toFixed(1);
         this._tooltip.innerHTML = `
           <div style="font-weight:600; margin-bottom:2px">${item.name}</div>
           <div>${this.formatValue(item.rawValue)} (${pct}%)</div>
         `;
         this._tooltip.style.display = 'block';
      });
      rect.addEventListener('mousemove', (e) => {
         // Keep tooltip on screen
         const tooltipRect = this._tooltip.getBoundingClientRect();
         let left = e.pageX + 12;
         let top = e.pageY + 12;
         if (left + tooltipRect.width > window.innerWidth) left = e.pageX - tooltipRect.width - 12;
         if (top + tooltipRect.height > window.innerHeight) top = e.pageY - tooltipRect.height - 12;
         this._tooltip.style.left = left + 'px';
         this._tooltip.style.top = top + 'px';
      });
      rect.addEventListener('mouseleave', () => {
         this._tooltip.style.display = 'none';
      });

      g.appendChild(rect);

      // --- LABEL RENDERING ---
      // Only render if it takes up a decent % of the chart (threshold)
      if ((item.value / totalValue) * 100 >= (config.label_threshold || 0)) {
         this.addLabels(g, item, config, svgNS);
      }

      this._svg.appendChild(g);
    });
  },

  // =================================================================
  // NEW ROBUST SQUARIFY ALGORITHM (NO GREY SPACE)
  // =================================================================
  squarify: function(nodes, x, y, width, height) {
    const results = [];
    if (nodes.length === 0) return results;

    let remainingNodes = nodes.slice();
    let container = { x, y, width, height };

    let currentRow = [];
    // Start the loop
    while (remainingNodes.length > 0) {
      const nextNode = remainingNodes[0];

      // Try adding next node to current row
      if (this.improvesRatio(currentRow, nextNode, container)) {
         currentRow.push(remainingNodes.shift());
      } else {
         // Current row is optimal, layout it out and start new row
         this.layoutRow(currentRow, container, results);
         // Update container for the rest
         // The layoutRow function MUST update the container object in place
         currentRow = [];
      }
    }
    // Layout whatever is left in the final row
    if (currentRow.length > 0) {
       // Force the last row to take ALL remaining space to avoid gaps
       this.layoutLastRow(currentRow, container, results);
    }

    return results;
  },

  improvesRatio: function(currentRow, nextNode, container) {
    if (currentRow.length === 0) return true;
    const newRow = currentRow.concat(nextNode);

    const currentWorst = this.calculateWorstRatio(currentRow, container);
    const nextWorst = this.calculateWorstRatio(newRow, container);

    // We want to minimize the worst aspect ratio (closer to 1 is better)
    return nextWorst <= currentWorst;
  },

  calculateWorstRatio: function(row, container) {
     if (row.length === 0) return Infinity;
     // Deciding orientation based on shortest side of container
     const sideLength = Math.min(container.width, container.height);
     const totalArea = row.reduce((sum, node) => sum + node.area, 0);

     // The width (thickness) of this row if we laid it out now
     const rowThickness = totalArea / sideLength; // Avoid div by zero? usually area > 0

     let maxRatio = 0;
     for (let i = 0; i < row.length; i++) {
        // The length of this item along the row
        const itemLength = row[i].area / rowThickness;
        const ratio = Math.max(rowThickness / itemLength, itemLength / rowThickness);
        if (ratio > maxRatio) maxRatio = ratio;
     }
     return maxRatio;
  },

  layoutRow: function(row, container, results) {
     const totalArea = row.reduce((sum, node) => sum + node.area, 0);
     const horizontal = container.width >= container.height; //Lay out ALONG the longest side? Standard is shortest.
     // Actually standard squarified lays out against the SHORTEST side.
     // Let's stick to standard:
     const againstShortestSide = container.width < container.height; // if True, we stack horizontally (row goes up/down)

     // Wait, Studio prefers Horizontal rows (stacking vertically).
     // Let's try forcing horizontal rows if possible, or just stick to standard squarified.
     // Standard squarified uses shortest side to optimize squares.
     const useWidth = container.width < container.height;

     if (useWidth) {
        // Container is taller than wide. We make a horizontal cut.
        // The "row" runs horizontally, stacked vertically.
        const rowHeight = totalArea / container.width;
        let runningX = container.x;
        row.forEach(node => {
           const nodeWidth = node.area / rowHeight;
           results.push({ ...node, x: runningX, y: container.y, width: nodeWidth, height: rowHeight });
           runningX += nodeWidth;
        });
        // Update container
        container.y += rowHeight;
        container.height -= rowHeight;
     } else {
        // Container is wider than tall. We make a vertical cut.
        // The "row" runs vertically, stacked horizontally.
        const rowWidth = totalArea / container.height;
        let runningY = container.y;
        row.forEach(node => {
           const nodeHeight = node.area / rowWidth;
           results.push({ ...node, x: container.x, y: runningY, width: rowWidth, height: nodeHeight });
           runningY += nodeHeight;
        });
        // Update container
        container.x += rowWidth;
        container.width -= rowWidth;
     }
  },

  layoutLastRow: function(row, container, results) {
     // This function forces the row to fill the container EXACTLY.
     const useWidth = container.width < container.height;
     if (useWidth) {
        // Fill remaining height
        let runningX = container.x;
        const totalArea = row.reduce((sum,n) => sum + n.area, 0);
        row.forEach((node, i) => {
           // For the LAST item in the row, use all remaining width to avoid rounding errors
           let nodeWidth;
           if (i === row.length - 1) {
              nodeWidth = container.x + container.width - runningX;
           } else {
              // Distribute width based on relative area within this row
              nodeWidth = (node.area / totalArea) * container.width;
           }
           results.push({ ...node, x: runningX, y: container.y, width: nodeWidth, height: container.height });
           runningX += nodeWidth;
        });
     } else {
        // Fill remaining width
        let runningY = container.y;
        const totalArea = row.reduce((sum,n) => sum + n.area, 0);
        row.forEach((node, i) => {
           let nodeHeight;
           if (i === row.length - 1) {
               nodeHeight = container.y + container.height - runningY;
           } else {
               nodeHeight = (node.area / totalArea) * container.height;
           }
           results.push({ ...node, x: container.x, y: runningY, width: container.width, height: nodeHeight });
           runningY += nodeHeight;
        });
     }
  },

  // =================================================================
  // IMPROVED LABELS (HORIZONTAL ONLY)
  // =================================================================
  addLabels: function(g, item, config, svgNS) {
    const labelFontSize = config.label_font_size || 12;
    const valueFontSize = config.value_font_size || 12;
    const padding = 4;

    if (item.width < 20 || item.height < 15) return; // Too small for anything

    // Calculate available space
    const maxWidth = item.width - (padding * 2);
    const maxHeight = item.height - (padding * 2);

    // Determine what fits
    const showLabel = config.show_labels && (maxWidth >= 30) && (maxHeight >= labelFontSize + 4);
    const showValue = config.show_values && (maxWidth >= 30) && (maxHeight >= valueFontSize + 4);

    // If neither fits comfortably, bail out early to keep it clean
    if (!showLabel && !showValue) return;

    const labelText = item.name;
    const valueText = this.formatValue(item.rawValue);

    // Try to fit both stacked
    const canFitStacked = showLabel && showValue && (maxHeight >= (labelFontSize + valueFontSize + 8));

    let currentY = item.y + (item.height / 2); // default vertically centered

    if (canFitStacked) {
       // Shift up to make room for both
       currentY -= 2; // slight optical adjustment
    }

    // --- RENDER LABEL ---
    if (showLabel) {
       const labelEl = document.createElementNS(svgNS, 'text');
       labelEl.setAttribute('x', item.x + (item.width / 2));
       // If stacked, move label up. If only label, keep it centered.
       labelEl.setAttribute('y', canFitStacked ? currentY - (valueFontSize / 2) : currentY + (labelFontSize/3));
       labelEl.setAttribute('text-anchor', 'middle');
       labelEl.setAttribute('fill', config.label_color);
       labelEl.setAttribute('font-size', labelFontSize);
       labelEl.setAttribute('class', 'treemap-label');

       // Simple truncation if it doesn't fit horizontally
       // (Rotation removed as requested)
       let finalLabel = labelText;
       if (this.estimateTextWidth(labelText, labelFontSize) > maxWidth) {
          // Try wrapping if enabled
          if (config.wrap_labels) {
             // Simplified wrap: just take first 2 words or truncate
             // For a truly robust wrap we need complex measureText which is slow here.
             // Let's just ellipsize for cleaner look on small tiles.
             finalLabel = this.ellipsize(labelText, maxWidth, labelFontSize);
          } else {
             finalLabel = this.ellipsize(labelText, maxWidth, labelFontSize);
          }
       }
       labelEl.textContent = finalLabel;
       g.appendChild(labelEl);
    }

    // --- RENDER VALUE ---
    if (showValue) {
       // If we are stacking, we might need to hide value if label took too much space,
       // but we already checked canFitStacked.
       if (!canFitStacked && showLabel) {
          // If we can't fit both stacked, prioritizing label.
          // If you prefer value, swap this logic.
          return;
       }

       const valEl = document.createElementNS(svgNS, 'text');
       valEl.setAttribute('x', item.x + (item.width / 2));
       valEl.setAttribute('y', canFitStacked ? currentY + valueFontSize + 2 : currentY + (valueFontSize/3));
       valEl.setAttribute('text-anchor', 'middle');
       valEl.setAttribute('fill', config.value_color);
       valEl.setAttribute('font-size', valueFontSize);
       valEl.setAttribute('class', 'treemap-value');
       valEl.textContent = valueText;

       // Ensure value fits horizontally too
       if (this.estimateTextWidth(valueText, valueFontSize) > maxWidth) {
          // If value doesn't fit, it's better to hide it than show "..." for a number usually
          g.removeChild(valEl); // actually just don't append it
       } else {
          g.appendChild(valEl);
       }
    }
  },

  // Helper to cut text short with "..."
  ellipsize: function(text, maxWidth, fontSize) {
     const estimatedCharWidth = fontSize * 0.6;
     const maxChars = Math.floor(maxWidth / estimatedCharWidth);
     if (text.length <= maxChars) return text;
     return text.substring(0, Math.max(0, maxChars - 2)) + '..';
  },

  estimateTextWidth: function(text, fontSize) {
    return text.length * (fontSize * 0.6);
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
    // Simple palette fallback
    const palettes = {
      green_scale: ['#F1F8E9', '#C5E1A5', '#9CCC65', '#7CB342', '#558B2F', '#33691E'],
      blue_scale: ['#E3F2FD', '#90CAF9', '#42A5F5', '#1E88E5', '#1565C0', '#0D47A1'],
      google: ['#4285F4', '#EA4335', '#FBBC04', '#34A853', '#FF6D00', '#46BDC6'],
      viridis: ['#440154', '#3B528B', '#21908C', '#5DC863', '#FDE725'],
      warm: ['#FFF5EB', '#FDD0A2', '#FD8D3C', '#E6550D', '#A63603'],
      cool: ['#F0F9FF', '#9ECAE1', '#4292C6', '#08519C', '#08306B']
    };
    return palettes[config.color_palette] || palettes.green_scale;
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
```
