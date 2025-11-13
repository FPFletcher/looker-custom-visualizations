/**
 * Treemap Visualization for Looker
 * Studio-inspired hierarchical treemap with drill-down and multi-dimension support
 * Features: Robust layout (no gaps), horizontal-only labels, "Others" grouping.
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
    drill_levels: {
      type: "number",
      label: "Number of Drill Levels",
      default: 2,
      min: 1,
      max: 10,
      section: "Plot",
      order: 38
    },
    others_toggle: {
      type: "boolean",
      label: "Group Small Items into 'Others'",
      default: true,
      section: "Plot",
      order: 5
    },
    others_threshold: {
      type: "number",
      label: "Others Threshold % (0.1 - 10)",
      default: 0.5, // Much smaller default (0.5%)
      min: 0.1,
      max: 10,
      step: 0.1,
      section: "Plot",
      order: 6
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
    reverse_palette: {
      type: "boolean",
      label: "Reverse Palette",
      default: false,
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
        shape-rendering: crispEdges;
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
    // console.log("[INIT] updateAsync called. Rows:", data.length);
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

    // Auto-set drill levels based on dimensions if not manually configured
    if (!config.drill_levels || config.drill_levels === 2) {
      config.drill_levels = dimensions.length;
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

    // Reset drill if color settings changed
const colorChanged = this._lastColorBy !== config.color_by ||
                    this._lastColorPalette !== config.color_palette ||
                    this._lastUseGradient !== config.use_gradient ||
                    this._lastReversePalette !== config.reverse_palette ||
                    this._lastGradientStart !== config.gradient_start_color ||
                    this._lastGradientEnd !== config.gradient_end_color;

    if (colorChanged) {
      this._drillStack = [];
      this._lastColorBy = config.color_by;
      this._lastColorPalette = config.color_palette;
      this._lastUseGradient = config.use_gradient;
      this._lastReversePalette = config.reverse_palette;
      this._lastGradientStart = config.gradient_start_color;
      this._lastGradientEnd = config.gradient_end_color;
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
    // console.log("[DRAW] drawTreemap called. DrillStack:", JSON.stringify(this._drillStack));
    // console.log("[DRAW] Incoming data is:", data ? `Array(${data.length})` : "NULL (will re-filter)");

    const dimensions = queryResponse.fields.dimension_like;
    const measures = queryResponse.fields.measure_like;
    const currentLevel = this._drillStack.length;

    // 1. Determine Active Data
    // If data is null (from breadcrumb click), re-filter from global _allData
    let activeData = data;
    if (!activeData) {
      activeData = this._allData;
      // Re-apply all filters up to the current level
      for (let i = 0; i < currentLevel; i++) {
        const dimName = dimensions[i].name;
        const filterVal = this._drillStack[i];
        activeData = activeData.filter(row => row[dimName].value === filterVal);
      }
    }
    // console.log("[DRAW] activeData after filtering:", activeData.length, "rows");

    // Rest of the function...
    const dimIndex = Math.min(currentLevel, dimensions.length - 1);
    const dimension = dimensions[dimIndex].name;
    const measure = measures[0].name;

    let treemapData = this.groupData(activeData, dimension, measure, currentLevel, dimensions.length);

    if (config.others_toggle && treemapData.length > 5) {
      const threshold = (config.others_threshold || 0.5) / 100;
      treemapData = this.groupSmallItems(treemapData, threshold);
    }

    treemapData.sort((a, b) => {
      if (a.isOthers) return 1;
      if (b.isOthers) return -1;
      return b.value - a.value;
    });

    this.updateBreadcrumb();
    this.renderTreemap(treemapData, config, dimension, queryResponse);
  },

  // --- NEW GROUPING FUNCTION ---
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
      const othersNode = {
        name: "Others",
        value: others.reduce((s, d) => s + d.value, 0),
        rawValue: others.reduce((s, d) => s + d.rawValue, 0),
        rawData: others.flatMap(o => o.rawData || o.children || []),  // FIX THIS
        children: others.flatMap(o => o.rawData || o.children || []),
        isOthers: true,
        level: others[0].level,
        dimension: others[0].dimension
      };
      visible.push(othersNode);
      return visible;
    }

    return data;
  },

  // REPLACES buildHierarchicalData
  groupData: function(data, dimension, measure, level, maxDepth) {
    const grouped = {};
    data.forEach(row => {
      const key = row[dimension].value;
      const safeKey = "k_" + key;
      if (!grouped[safeKey]) {
        grouped[safeKey] = {
          name: key,
          value: 0,
          rawValue: 0,
          children: [], // Still needed for "Others" later
          level: level,
          isDrillable: level < maxDepth - 1
        };
      }
      const val = row[measure].value || 0;
      grouped[safeKey].value += Math.max(0, val);
      grouped[safeKey].rawValue += val;
      // We keep all matching rows for potential "Others" grouping later
      grouped[safeKey].children.push(row);
    });

    return Object.values(grouped).filter(d => d.value > 0);
  },

// This is the most important function by far as it dictates the treemap shaping logic. We made it "deterministic" for a cleaner output yet it could use a more flexible sizing if so desired
  renderTreemap: function(data, config, dimension, queryResponse) {
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

    const totalValue = data.reduce((sum, d) => sum + d.value, 0);
    const rootArea = width * height;

    const nodes = data.map(d => ({
      ...d,
      area: (d.value / totalValue) * rootArea,
      drillLinks: (d.children && d.children.length > 0 && dimension && d.children[0][dimension])
        ? (d.children[0][dimension].links || [])
        : [],
      rawData: d.children || []  // ADD THIS - store children for drill
    }));
    let layout = this.squarify(nodes, 0, 0, width, height);

    // CRITICAL FIX: Force last item to fill to edges
    if (layout.length > 0) {
      const lastItem = layout[layout.length - 1];
      lastItem.width = width - lastItem.x;
      lastItem.height = height - lastItem.y;
    }

    const colors = this.getColors(data, config);

    layout.forEach((item, i) => {
      const g = document.createElementNS(svgNS, 'g');
      const rect = document.createElementNS(svgNS, 'rect');

      // Round coordinates but keep last item forced to edge
      const isLast = (i === layout.length - 1);
      const x = Math.round(item.x);
      const y = Math.round(item.y);
      const w = isLast ? (width - x) : (Math.round(item.x + item.width) - x);
      const h = isLast ? (height - y) : (Math.round(item.y + item.height) - y);

      rect.setAttribute('x', x);
      rect.setAttribute('y', y);
      rect.setAttribute('width', Math.max(1, w));
      rect.setAttribute('height', Math.max(1, h));

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


      // SIMPLIFIED DRILL TEST - Show drill menu on ANY click

      if (this._config.enable_drill_down && (item.isDrillable || item.isOthers)) {
  rect.addEventListener('click', (e) => {
  console.log('=== TREEMAP CLICK DEBUG ===');
  console.log('Item clicked:', item.name);
  console.log('Current drill stack:', this._drillStack);
  console.log('Item rawData exists?', !!item.rawData);
  console.log('Item rawData length:', item.rawData ? item.rawData.length : 0);

  e.stopPropagation();

  // Check if drill-down is enabled
  if (!this._config.enable_drill_down) {
    console.log('✗ Drill down disabled');
    return;
  }

  // Check if we're at the configured drill level
  const maxDrillLevels = this._config.drill_levels || 2;
  const currentLevel = this._drillStack.length;
  const isLastLevel = currentLevel >= maxDrillLevels - 1;

  console.log('Current level:', currentLevel, '/ Max drill levels:', maxDrillLevels);
  console.log('Is last level?', isLastLevel);
  console.log('Is Others?', item.isOthers);
  console.log('Is Drillable?', item.isDrillable);

  // At last level: ONLY show LookML drill menu, do NOT drill down
  if (isLastLevel && !item.isOthers) {
    console.log('✓ AT LAST LEVEL - Looking for drill links');

    // Extract drill links from rawData
    let drillLinks = [];
    if (item.rawData && item.rawData.length > 0) {
      const firstRow = item.rawData[0];
      console.log('First row keys:', Object.keys(firstRow));

      // Find the measure field (it will have links)
      Object.keys(firstRow).forEach(key => {
        if (firstRow[key] && firstRow[key].links && firstRow[key].links.length > 0) {
          console.log(`✓ Found ${firstRow[key].links.length} drill links in field "${key}"`);
          drillLinks = firstRow[key].links;
        }
      });
    } else {
      console.log('✗ No rawData available');
    }

    console.log('Final drill links:', drillLinks);
    console.log('LookerCharts.Utils exists?', !!(LookerCharts && LookerCharts.Utils));

    if (drillLinks.length > 0 && LookerCharts && LookerCharts.Utils) {
      console.log('✓ Calling openDrillMenu...');
      try {
        LookerCharts.Utils.openDrillMenu({
          links: drillLinks,
          event: e
        });
        console.log('✓ Drill menu call completed');
      } catch (error) {
        console.error('✗ Error opening drill menu:', error);
      }
    } else {
      console.log('✗ Cannot open drill menu - missing links or LookerCharts.Utils');
    }

    // STOP HERE - do not drill down further
    return false;
  }

  // Not at last level OR is Others: Normal drill-down behavior
  if (item.isOthers) {
    console.log('→ Drilling into Others group');
    this.drawTreemap(item.rawData, this._config, this._queryResponse);
  } else if (item.isDrillable) {
    console.log('→ Drilling down to next level:', item.name);
    this._drillStack.push(item.name);
    this.drawTreemap(null, this._config, this._queryResponse);
  } else {
    console.log('✗ Item not drillable');
  }
});
}

      rect.addEventListener('mouseenter', () => {
        const pct = ((item.value / totalValue) * 100).toFixed(1);
        this._tooltip.innerHTML = `
        <div style="font-weight:600; margin-bottom:2px">${item.name}</div>
        <div>${this.formatValue(item.rawValue)} (${pct}%)</div>
        ${item.children && item.children.length > 0 ? '<div style="font-size:10px; opacity:0.8">(Click to drill down)</div>' : ''}
        `;
        this._tooltip.style.display = 'block';
      });
      rect.addEventListener('mousemove', (e) => {
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

      if ((item.value / totalValue) * 100 >= (config.label_threshold || 0)) {
        this.addLabels(g, item, config, svgNS);
      }

      this._svg.appendChild(g);
    });
  },

  squarify: function(nodes, x, y, width, height) {
    const results = [];
    if (nodes.length === 0) return results;

    let remainingNodes = nodes.slice();
    let container = { x, y, width, height };

    let currentRow = [];
    while (remainingNodes.length > 0) {
      const nextNode = remainingNodes[0];
      if (this.improvesRatio(currentRow, nextNode, container)) {
         currentRow.push(remainingNodes.shift());
      } else {
         this.layoutRow(currentRow, container, results);
         currentRow = [];
      }
    }
    if (currentRow.length > 0) {
       this.layoutLastRow(currentRow, container, results);
    }
    return results;
  },

  improvesRatio: function(currentRow, nextNode, container) {
    if (currentRow.length === 0) return true;
    const newRow = currentRow.concat(nextNode);
    const currentWorst = this.calculateWorstRatio(currentRow, container);
    const nextWorst = this.calculateWorstRatio(newRow, container);
    return nextWorst <= currentWorst;
  },

  calculateWorstRatio: function(row, container) {
     if (row.length === 0) return Infinity;
     const sideLength = Math.min(container.width, container.height);
     const totalArea = row.reduce((sum, node) => sum + node.area, 0);
     const rowThickness = totalArea / sideLength;
     let maxRatio = 0;
     for (let i = 0; i < row.length; i++) {
        const itemLength = row[i].area / rowThickness;
        const ratio = Math.max(rowThickness / itemLength, itemLength / rowThickness);
        if (ratio > maxRatio) maxRatio = ratio;
     }
     return maxRatio;
  },

  // --- ROBUST LAYOUT (No Grey Space) ---
  layoutRow: function(row, container, results) {
     const totalArea = row.reduce((sum, node) => sum + node.area, 0);
     const useWidth = container.width < container.height;

     if (useWidth) {
        const rowHeight = totalArea / container.width;
        let runningX = container.x;
        row.forEach((node, i) => {
           let nodeWidth;
           if (i === row.length - 1) {
              nodeWidth = Math.max(0, (container.x + container.width) - runningX);
           } else {
              nodeWidth = node.area / rowHeight;
           }
           results.push({ ...node, x: runningX, y: container.y, width: nodeWidth, height: rowHeight });
           runningX += nodeWidth;
        });
        container.y += rowHeight;
        container.height -= rowHeight;
     } else {
        const rowWidth = totalArea / container.height;
        let runningY = container.y;
        row.forEach((node, i) => {
           let nodeHeight;
           if (i === row.length - 1) {
             nodeHeight = Math.max(0, (container.y + container.height) - runningY);
           } else {
             nodeHeight = node.area / rowWidth;
           }
           results.push({ ...node, x: container.x, y: runningY, width: rowWidth, height: nodeHeight });
           runningY += nodeHeight;
        });
        container.x += rowWidth;
        container.width -= rowWidth;
     }
  },

  layoutLastRow: function(row, container, results) {
    const useWidth = container.width < container.height;

    if (useWidth) {
      const totalArea = row.reduce((sum, n) => sum + n.area, 0);
      let runningX = container.x;

      row.forEach((node, i) => {
        let nodeWidth;
        if (i === row.length - 1) {
          // ABSOLUTE FILL to edge
          nodeWidth = container.x + container.width - runningX;
        } else {
          nodeWidth = (node.area / totalArea) * container.width;
        }

        results.push({
          ...node,
          x: runningX,
          y: container.y,
          width: nodeWidth,
          height: container.height
        });
        runningX += nodeWidth;
      });
    } else {
      const totalArea = row.reduce((sum, n) => sum + n.area, 0);
      let runningY = container.y;

      row.forEach((node, i) => {
        let nodeHeight;
        if (i === row.length - 1) {
          // ABSOLUTE FILL to edge
          nodeHeight = container.y + container.height - runningY;
        } else {
          nodeHeight = (node.area / totalArea) * container.height;
        }

        results.push({
          ...node,
          x: container.x,
          y: runningY,
          width: container.width,
          height: nodeHeight
        });
        runningY += nodeHeight;
      });
    }
  },

  addLabels: function(g, item, config, svgNS) {
    const labelFontSize = config.label_font_size || 12;
    const valueFontSize = config.value_font_size || 12;
    const padding = 4;

    if (item.width < 20 || item.height < 15) return;

    const maxWidth = item.width - (padding * 2);
    const maxHeight = item.height - (padding * 2);

    const showLabel = config.show_labels && (maxWidth >= 30) && (maxHeight >= labelFontSize + 4);
    const showValue = config.show_values && (maxWidth >= 30) && (maxHeight >= valueFontSize + 4);

    if (!showLabel && !showValue) return;

    const labelText = item.name;
    const valueText = this.formatValue(item.rawValue);
    const canFitStacked = showLabel && showValue && (maxHeight >= (labelFontSize + valueFontSize + 8));
    let currentY = item.y + (item.height / 2);

    if (canFitStacked) currentY -= 2;

    if (showLabel) {
       const labelEl = document.createElementNS(svgNS, 'text');
       labelEl.setAttribute('x', item.x + (item.width / 2));
       labelEl.setAttribute('y', canFitStacked ? currentY - (valueFontSize / 2) : currentY + (labelFontSize/3));
       labelEl.setAttribute('text-anchor', 'middle');
       labelEl.setAttribute('fill', config.label_color);
       labelEl.setAttribute('font-size', labelFontSize);
       labelEl.setAttribute('class', 'treemap-label');

       let finalLabel = labelText;
       if (this.estimateTextWidth(labelText, labelFontSize) > maxWidth) {
          finalLabel = this.ellipsize(labelText, maxWidth, labelFontSize);
       }
       labelEl.textContent = finalLabel;
       g.appendChild(labelEl);
    }

    if (showValue) {
       if (!canFitStacked && showLabel) return;

       const valEl = document.createElementNS(svgNS, 'text');
       valEl.setAttribute('x', item.x + (item.width / 2));
       valEl.setAttribute('y', canFitStacked ? currentY + valueFontSize + 2 : currentY + (valueFontSize/3));
       valEl.setAttribute('text-anchor', 'middle');
       valEl.setAttribute('fill', config.value_color);
       valEl.setAttribute('font-size', valueFontSize);
       valEl.setAttribute('class', 'treemap-value');
       valEl.textContent = valueText;

       if (this.estimateTextWidth(valueText, valueFontSize) > maxWidth) {
          g.removeChild(valEl);
       } else {
          g.appendChild(valEl);
       }
    }
  },

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
        // Slice stack to go back to the clicked level
        this._drillStack = (level === -1) ? [] : this._drillStack.slice(0, level + 1);
        // CRITICAL FIX: Pass 'null' as data to force re-filtering based on new stack
        this.drawTreemap(null, this._config, this._queryResponse);
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

      // FIX: Use ALL data length, don't filter
      const itemCount = data.length;

      if (itemCount <= palette.length) {
        return palette.slice(0, itemCount);
      }

      // Interpolate for many items
      const colors = [];
      for (let i = 0; i < itemCount; i++) {
        const position = i / Math.max(1, itemCount - 1);
        const paletteIndex = position * (palette.length - 1);
        const lowerIndex = Math.floor(paletteIndex);
        const upperIndex = Math.min(palette.length - 1, Math.ceil(paletteIndex));
        const blend = paletteIndex - lowerIndex;

        colors.push(this.interpolateColor(palette[lowerIndex], palette[upperIndex], blend));
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
