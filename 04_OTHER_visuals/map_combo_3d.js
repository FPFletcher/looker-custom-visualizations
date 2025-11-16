/**
 * 3D Combo Map Visualization for Looker
 * Advanced geospatial visualization with multiple layer types:
 * - Heatmap/Choropleth for state/region coloring
 * - 3D Column (Hexagon/Grid) layers
 * - Point/Bubble layers
 * - Interactive side panel with pie chart breakdown
 *
 * Inspired by Looker Studio Maps and Google Earth Engine visualizations
 *
 * External Dependencies (load via CDN in Looker):
 * - Deck.gl: https://unpkg.com/deck.gl@^8.9.0/dist.min.js
 * - Mapbox GL: https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js
 * - Mapbox CSS: https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css
 * - d3: https://d3js.org/d3.v7.min.js
 */

looker.plugins.visualizations.add({
  id: "3d_combo_map",
  label: "3D Combo Map",
  options: {
    // ========== MAP CONFIGURATION ==========
    map_style: {
      type: "string",
      label: "Map Style",
      display: "select",
      values: [
        {"Dark": "mapbox://styles/mapbox/dark-v11"},
        {"Light": "mapbox://styles/mapbox/light-v11"},
        {"Streets": "mapbox://styles/mapbox/streets-v12"},
        {"Satellite": "mapbox://styles/mapbox/satellite-streets-v12"},
        {"Outdoors": "mapbox://styles/mapbox/outdoors-v12"}
      ],
      default: "mapbox://styles/mapbox/dark-v11",
      section: "Map",
      order: 1
    },

    mapbox_token: {
      type: "string",
      label: "Mapbox Access Token",
      placeholder: "pk.eyJ1...",
      section: "Map",
      order: 2
    },

    initial_view_state: {
      type: "string",
      label: "Initial View",
      display: "select",
      values: [
        {"United States": "us"},
        {"World": "world"},
        {"Europe": "europe"},
        {"Asia": "asia"},
        {"Custom": "custom"}
      ],
      default: "us",
      section: "Map",
      order: 3
    },

    custom_longitude: {
      type: "number",
      label: "Custom Center Longitude",
      default: -95.7129,
      section: "Map",
      order: 4
    },

    custom_latitude: {
      type: "number",
      label: "Custom Center Latitude",
      default: 37.0902,
      section: "Map",
      order: 5
    },

    custom_zoom: {
      type: "number",
      label: "Custom Zoom Level",
      default: 4,
      min: 0,
      max: 20,
      section: "Map",
      order: 6
    },

    enable_rotation: {
      type: "boolean",
      label: "Enable Auto-Rotation",
      default: false,
      section: "Map",
      order: 7
    },

    rotation_speed: {
      type: "number",
      label: "Rotation Speed",
      default: 0.5,
      min: 0.1,
      max: 5,
      step: 0.1,
      section: "Map",
      order: 8
    },

    enable_3d_tilt: {
      type: "boolean",
      label: "Enable 3D Tilt",
      default: true,
      section: "Map",
      order: 9
    },

    tilt_angle: {
      type: "number",
      label: "Tilt Angle (degrees)",
      default: 45,
      min: 0,
      max: 60,
      section: "Map",
      order: 10
    },

    divider_map: {
      type: "string",
      label: "─────────────────────────────",
      display: "divider",
      section: "Map",
      order: 11
    },

    // ========== LAYER 1: HEATMAP/CHOROPLETH ==========
    layer1_enabled: {
      type: "boolean",
      label: "Enable Layer 1 (Heatmap/Choropleth)",
      default: true,
      section: "Layer 1",
      order: 1
    },

    layer1_type: {
      type: "string",
      label: "Layer Type",
      display: "select",
      values: [
        {"State/Region Fill": "geojson"},
        {"Heat Map": "heatmap"},
        {"Hexagon Grid": "hexagon"}
      ],
      default: "geojson",
      section: "Layer 1",
      order: 2
    },

    layer1_measure: {
      type: "string",
      label: "Measure Field (select from query)",
      placeholder: "e.g., order_items.count",
      section: "Layer 1",
      order: 3
    },

    layer1_color_mode: {
      type: "string",
      label: "Coloring Mode",
      display: "select",
      values: [
        {"Gradient": "gradient"},
        {"Steps": "steps"},
        {"Independent Rules": "rules"}
      ],
      default: "gradient",
      section: "Layer 1",
      order: 4
    },

    layer1_color_start: {
      type: "string",
      label: "Color Start (Gradient/Low)",
      default: "#E8F5E9",
      display: "color",
      section: "Layer 1",
      order: 5
    },

    layer1_color_end: {
      type: "string",
      label: "Color End (Gradient/High)",
      default: "#1B5E20",
      display: "color",
      section: "Layer 1",
      order: 6
    },

    layer1_opacity: {
      type: "number",
      label: "Opacity",
      default: 0.7,
      min: 0,
      max: 1,
      step: 0.05,
      section: "Layer 1",
      order: 7
    },

    // ========== LAYER 2: 3D COLUMNS ==========
    layer2_enabled: {
      type: "boolean",
      label: "Enable Layer 2 (3D Columns)",
      default: true,
      section: "Layer 2",
      order: 1
    },

    layer2_type: {
      type: "string",
      label: "Column Type",
      display: "select",
      values: [
        {"Column Grid": "column"},
        {"Hexagon": "hexagon"},
        {"H3 Hexagon": "h3"}
      ],
      default: "column",
      section: "Layer 2",
      order: 2
    },

    layer2_measure: {
      type: "string",
      label: "Measure Field (Height)",
      placeholder: "e.g., order_items.total_revenue",
      section: "Layer 2",
      order: 3
    },

    layer2_elevation_scale: {
      type: "number",
      label: "Elevation Scale",
      default: 1000,
      min: 1,
      max: 100000,
      section: "Layer 2",
      order: 4
    },

    layer2_radius: {
      type: "number",
      label: "Column Radius/Size",
      default: 50000,
      min: 1000,
      max: 200000,
      step: 1000,
      section: "Layer 2",
      order: 5
    },

    layer2_color_mode: {
      type: "string",
      label: "Coloring Mode",
      display: "select",
      values: [
        {"Single Color": "single"},
        {"Gradient by Height": "gradient"},
        {"Link to Layer 1": "linked"}
      ],
      default: "gradient",
      section: "Layer 2",
      order: 6
    },

    layer2_color_start: {
      type: "string",
      label: "Color Start",
      default: "#4285F4",
      display: "color",
      section: "Layer 2",
      order: 7
    },

    layer2_color_end: {
      type: "string",
      label: "Color End",
      default: "#1A73E8",
      display: "color",
      section: "Layer 2",
      order: 8
    },

    layer2_opacity: {
      type: "number",
      label: "Opacity",
      default: 0.8,
      min: 0,
      max: 1,
      step: 0.05,
      section: "Layer 2",
      order: 9
    },

    // ========== LAYER 3: POINTS/BUBBLES ==========
    layer3_enabled: {
      type: "boolean",
      label: "Enable Layer 3 (Points/Bubbles)",
      default: false,
      section: "Layer 3",
      order: 1
    },

    layer3_type: {
      type: "string",
      label: "Point Type",
      display: "select",
      values: [
        {"Scatter Points": "scatter"},
        {"Bubbles (Sized)": "bubble"},
        {"3D Columns": "column"}
      ],
      default: "bubble",
      section: "Layer 3",
      order: 2
    },

    layer3_measure: {
      type: "string",
      label: "Measure Field (Size/Height)",
      placeholder: "e.g., users.count",
      section: "Layer 3",
      order: 3
    },

    layer3_radius_scale: {
      type: "number",
      label: "Point Radius Scale",
      default: 10,
      min: 1,
      max: 100,
      section: "Layer 3",
      order: 4
    },

    layer3_color: {
      type: "string",
      label: "Point Color",
      default: "#EA4335",
      display: "color",
      section: "Layer 3",
      order: 5
    },

    layer3_opacity: {
      type: "number",
      label: "Opacity",
      default: 0.6,
      min: 0,
      max: 1,
      step: 0.05,
      section: "Layer 3",
      order: 6
    },

    // ========== PIE CHART PANEL ==========
    panel_enabled: {
      type: "boolean",
      label: "Enable Side Panel",
      default: true,
      section: "Panel",
      order: 1
    },

    panel_breakdown_field: {
      type: "string",
      label: "Breakdown Dimension",
      placeholder: "e.g., products.category",
      section: "Panel",
      order: 2
    },

    panel_position: {
      type: "string",
      label: "Panel Position",
      display: "select",
      values: [
        {"Right": "right"},
        {"Left": "left"}
      ],
      default: "right",
      section: "Panel",
      order: 3
    },

    panel_width: {
      type: "number",
      label: "Panel Width (%)",
      default: 25,
      min: 15,
      max: 40,
      section: "Panel",
      order: 4
    },

    panel_background: {
      type: "string",
      label: "Panel Background Color",
      default: "#1E1E1E",
      display: "color",
      section: "Panel",
      order: 5
    },

    panel_text_color: {
      type: "string",
      label: "Panel Text Color",
      default: "#FFFFFF",
      display: "color",
      section: "Panel",
      order: 6
    },

    // ========== TOOLTIP & INTERACTION ==========
    tooltip_background: {
      type: "string",
      label: "Tooltip Background",
      default: "#2C3E50",
      display: "color",
      section: "Tooltip",
      order: 1
    },

    tooltip_text_color: {
      type: "string",
      label: "Tooltip Text Color",
      default: "#FFFFFF",
      display: "color",
      section: "Tooltip",
      order: 2
    },

    enable_click_filter: {
      type: "boolean",
      label: "Enable Click to Filter",
      default: true,
      section: "Tooltip",
      order: 3
    }
  },

  /**
   * Create the visualization
   */
  create: function(element, config) {
    console.log('[3D MAP] Creating visualization...');

    // Create main container
    element.innerHTML = '';
    element.style.position = 'relative';
    element.style.overflow = 'hidden';

    // Container for deck.gl canvas
    this._mapContainer = document.createElement('div');
    this._mapContainer.id = 'map-container';
    this._mapContainer.style.position = 'absolute';
    this._mapContainer.style.top = '0';
    this._mapContainer.style.left = '0';
    this._mapContainer.style.width = '100%';
    this._mapContainer.style.height = '100%';
    element.appendChild(this._mapContainer);

    // Side panel container
    this._panelContainer = document.createElement('div');
    this._panelContainer.id = 'panel-container';
    this._panelContainer.style.position = 'absolute';
    this._panelContainer.style.top = '0';
    this._panelContainer.style.height = '100%';
    this._panelContainer.style.zIndex = '10';
    this._panelContainer.style.transition = 'all 0.3s ease';
    this._panelContainer.style.overflowY = 'auto';
    element.appendChild(this._panelContainer);

    // Tooltip container
    this._tooltip = document.createElement('div');
    this._tooltip.style.position = 'absolute';
    this._tooltip.style.padding = '12px';
    this._tooltip.style.borderRadius = '6px';
    this._tooltip.style.pointerEvents = 'none';
    this._tooltip.style.zIndex = '100';
    this._tooltip.style.display = 'none';
    this._tooltip.style.fontSize = '13px';
    this._tooltip.style.fontFamily = 'Google Sans, Arial, sans-serif';
    this._tooltip.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
    element.appendChild(this._tooltip);

    // Store for interaction state
    this._selectedRegion = null;
    this._deckgl = null;

    console.log('[3D MAP] Container created successfully');
  },

  /**
   * Update and render the visualization
   */
  updateAsync: function(data, element, config, queryResponse, details, done) {
    console.log('[3D MAP] ========== UpdateAsync START ==========');
    console.log('[3D MAP] Data rows:', data.length);
    console.log('[3D MAP] Config:', config);
    console.log('[3D MAP] Query response:', queryResponse);

    // Clear errors
    this.clearErrors();

    // Enhanced dependency checking with detailed logging
    console.log('[3D MAP] Checking dependencies...');
    console.log('[3D MAP] - deck.gl available?', typeof deck !== 'undefined');
    console.log('[3D MAP] - mapboxgl available?', typeof mapboxgl !== 'undefined');
    console.log('[3D MAP] - d3 available?', typeof d3 !== 'undefined');

    if (typeof deck !== 'undefined') {
      console.log('[3D MAP] - deck.gl version:', deck.VERSION || 'unknown');
    }
    if (typeof mapboxgl !== 'undefined') {
      console.log('[3D MAP] - mapboxgl version:', mapboxgl.version);
    }
    if (typeof d3 !== 'undefined') {
      console.log('[3D MAP] - d3 version:', d3.version);
    }

    // Check for required libraries
    if (typeof deck === 'undefined' || typeof mapboxgl === 'undefined' || typeof d3 === 'undefined') {
      const missing = [];
      if (typeof deck === 'undefined') missing.push('Deck.gl');
      if (typeof mapboxgl === 'undefined') missing.push('Mapbox GL JS');
      if (typeof d3 === 'undefined') missing.push('D3.js');

      console.error('[3D MAP] Missing dependencies:', missing);
      this.addError({
        title: "Missing Dependencies",
        message: `Missing required libraries: ${missing.join(', ')}. Please check your manifest file dependencies.`
      });
      done();
      return;
    }

    console.log('[3D MAP] All dependencies loaded successfully');

    // Validate Mapbox token
    console.log('[3D MAP] Checking Mapbox token...');
    console.log('[3D MAP] Token provided?', !!config.mapbox_token);
    if (config.mapbox_token) {
      console.log('[3D MAP] Token starts with:', config.mapbox_token.substring(0, 10) + '...');
    }

    if (!config.mapbox_token) {
      console.error('[3D MAP] No Mapbox token provided');
      this.addError({
        title: "Mapbox Token Required",
        message: "Please provide a Mapbox access token in the visualization settings."
      });
      done();
      return;
    }

    try {
      // Parse query response
      console.log('[3D MAP] Parsing query response...');
      const dimensions = queryResponse.fields.dimension_like;
      const measures = queryResponse.fields.measure_like;
      console.log('[3D MAP] Dimensions found:', dimensions.length);
      console.log('[3D MAP] Measures found:', measures.length);
      console.log('[3D MAP] Dimension fields:', dimensions.map(d => d.name));
      console.log('[3D MAP] Measure fields:', measures.map(m => m.name));

      // Find geo fields (lat/lng or location name)
      const latField = dimensions.find(d =>
        d.name.toLowerCase().includes('lat') ||
        d.type === 'latitude'
      );
      const lngField = dimensions.find(d =>
        d.name.toLowerCase().includes('lon') ||
        d.name.toLowerCase().includes('lng') ||
        d.type === 'longitude'
      );
      const locationField = dimensions.find(d =>
        d.name.toLowerCase().includes('state') ||
        d.name.toLowerCase().includes('country') ||
        d.name.toLowerCase().includes('region') ||
        d.name.toLowerCase().includes('location')
      );

      console.log('[3D MAP] Geo fields detected:', { latField, lngField, locationField });

      // Process data
      const processedData = this._processData(data, latField, lngField, locationField, measures, dimensions, config);

      // Update panel if enabled
      if (config.panel_enabled) {
        this._updatePanel(processedData, config);
      } else {
        this._panelContainer.style.display = 'none';
      }

      // Initialize or update map
      this._updateMap(processedData, config, element);

      done();

    } catch (error) {
      console.error('[3D MAP] Error in updateAsync:', error);
      this.addError({
        title: "Visualization Error",
        message: error.message
      });
      done();
    }
  },

  /**
   * Process and structure data for rendering
   */
  _processData: function(data, latField, lngField, locationField, measures, dimensions, config) {
    console.log('[3D MAP] Processing data...');

    const processed = {
      points: [],
      aggregated: {},
      bounds: { minLat: 90, maxLat: -90, minLng: 180, maxLng: -180 }
    };

    data.forEach((row, idx) => {
      let lat, lng, location;

      // Extract coordinates
      if (latField && lngField) {
        lat = parseFloat(row[latField.name].value);
        lng = parseFloat(row[lngField.name].value);
      } else if (locationField) {
        // Try to geocode location name (simplified - in production, use geocoding service)
        location = row[locationField.name].value;
        const coords = this._geocodeLocation(location);
        if (coords) {
          lat = coords.lat;
          lng = coords.lng;
        }
      }

      if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
        // Update bounds
        processed.bounds.minLat = Math.min(processed.bounds.minLat, lat);
        processed.bounds.maxLat = Math.max(processed.bounds.maxLat, lat);
        processed.bounds.minLng = Math.min(processed.bounds.minLng, lng);
        processed.bounds.maxLng = Math.max(processed.bounds.maxLng, lng);

        // Extract measure values
        const measureValues = {};
        measures.forEach(m => {
          const value = row[m.name]?.value;
          measureValues[m.name] = value !== null && value !== undefined ? parseFloat(value) : 0;
        });

        // Extract breakdown dimension for panel
        let breakdownValue = null;
        if (config.panel_breakdown_field) {
          const breakdownDim = dimensions.find(d => d.name === config.panel_breakdown_field);
          if (breakdownDim) {
            breakdownValue = row[breakdownDim.name]?.value;
          }
        }

        const point = {
          position: [lng, lat],
          location: location || `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
          measures: measureValues,
          breakdown: breakdownValue,
          rowIndex: idx
        };

        processed.points.push(point);

        // Aggregate by location for region-based layers
        if (location) {
          if (!processed.aggregated[location]) {
            processed.aggregated[location] = {
              position: [lng, lat],
              location: location,
              measures: {},
              count: 0,
              breakdown: {}
            };
          }

          processed.aggregated[location].count++;

          measures.forEach(m => {
            if (!processed.aggregated[location].measures[m.name]) {
              processed.aggregated[location].measures[m.name] = 0;
            }
            processed.aggregated[location].measures[m.name] += measureValues[m.name];
          });

          // Aggregate breakdown
          if (breakdownValue) {
            if (!processed.aggregated[location].breakdown[breakdownValue]) {
              processed.aggregated[location].breakdown[breakdownValue] = 0;
            }
            processed.aggregated[location].breakdown[breakdownValue]++;
          }
        }
      }
    });

    console.log('[3D MAP] Processed data:', {
      pointCount: processed.points.length,
      regionCount: Object.keys(processed.aggregated).length,
      bounds: processed.bounds
    });

    return processed;
  },

  /**
   * Simple geocoding lookup (expand with real geocoding service in production)
   */
  _geocodeLocation: function(location) {
    // US States center coordinates (simplified)
    const usStates = {
      'Alabama': { lat: 32.806671, lng: -86.791130 },
      'Alaska': { lat: 61.370716, lng: -152.404419 },
      'Arizona': { lat: 33.729759, lng: -111.431221 },
      'Arkansas': { lat: 34.969704, lng: -92.373123 },
      'California': { lat: 36.116203, lng: -119.681564 },
      'Colorado': { lat: 39.059811, lng: -105.311104 },
      'Connecticut': { lat: 41.597782, lng: -72.755371 },
      'Delaware': { lat: 39.318523, lng: -75.507141 },
      'Florida': { lat: 27.766279, lng: -81.686783 },
      'Georgia': { lat: 33.040619, lng: -83.643074 },
      'Hawaii': { lat: 21.094318, lng: -157.498337 },
      'Idaho': { lat: 44.240459, lng: -114.478828 },
      'Illinois': { lat: 40.349457, lng: -88.986137 },
      'Indiana': { lat: 39.849426, lng: -86.258278 },
      'Iowa': { lat: 42.011539, lng: -93.210526 },
      'Kansas': { lat: 38.526600, lng: -96.726486 },
      'Kentucky': { lat: 37.668140, lng: -84.670067 },
      'Louisiana': { lat: 31.169546, lng: -91.867805 },
      'Maine': { lat: 44.693947, lng: -69.381927 },
      'Maryland': { lat: 39.063946, lng: -76.802101 },
      'Massachusetts': { lat: 42.230171, lng: -71.530106 },
      'Michigan': { lat: 43.326618, lng: -84.536095 },
      'Minnesota': { lat: 45.694454, lng: -93.900192 },
      'Mississippi': { lat: 32.741646, lng: -89.678696 },
      'Missouri': { lat: 38.456085, lng: -92.288368 },
      'Montana': { lat: 46.921925, lng: -110.454353 },
      'Nebraska': { lat: 41.125370, lng: -98.268082 },
      'Nevada': { lat: 38.313515, lng: -117.055374 },
      'New Hampshire': { lat: 43.452492, lng: -71.563896 },
      'New Jersey': { lat: 40.298904, lng: -74.521011 },
      'New Mexico': { lat: 34.840515, lng: -106.248482 },
      'New York': { lat: 42.165726, lng: -74.948051 },
      'North Carolina': { lat: 35.630066, lng: -79.806419 },
      'North Dakota': { lat: 47.528912, lng: -99.784012 },
      'Ohio': { lat: 40.388783, lng: -82.764915 },
      'Oklahoma': { lat: 35.565342, lng: -96.928917 },
      'Oregon': { lat: 44.572021, lng: -122.070938 },
      'Pennsylvania': { lat: 40.590752, lng: -77.209755 },
      'Rhode Island': { lat: 41.680893, lng: -71.511780 },
      'South Carolina': { lat: 33.856892, lng: -80.945007 },
      'South Dakota': { lat: 44.299782, lng: -99.438828 },
      'Tennessee': { lat: 35.747845, lng: -86.692345 },
      'Texas': { lat: 31.054487, lng: -97.563461 },
      'Utah': { lat: 40.150032, lng: -111.862434 },
      'Vermont': { lat: 44.045876, lng: -72.710686 },
      'Virginia': { lat: 37.769337, lng: -78.169968 },
      'Washington': { lat: 47.400902, lng: -121.490494 },
      'West Virginia': { lat: 38.491226, lng: -80.954456 },
      'Wisconsin': { lat: 44.268543, lng: -89.616508 },
      'Wyoming': { lat: 42.755966, lng: -107.302490 }
    };

    // Normalize location string
    const normalized = location.trim();

    return usStates[normalized] || null;
  },

  /**
   * Update the map with layers
   */
  _updateMap: function(processedData, config, element) {
    console.log('[3D MAP] ========== _updateMap START ==========');
    console.log('[3D MAP] Processed data:', processedData);
    console.log('[3D MAP] Point count:', processedData.points.length);

    // Set Mapbox token
    console.log('[3D MAP] Setting Mapbox token...');
    mapboxgl.accessToken = config.mapbox_token;
    console.log('[3D MAP] Mapbox token set successfully');

    // Determine initial view state
    const viewPresets = {
      'us': { longitude: -95.7129, latitude: 37.0902, zoom: 4 },
      'world': { longitude: 0, latitude: 20, zoom: 1.5 },
      'europe': { longitude: 10, latitude: 50, zoom: 3.5 },
      'asia': { longitude: 100, latitude: 30, zoom: 3 }
    };

    let initialView = viewPresets[config.initial_view_state] || viewPresets['us'];

    if (config.initial_view_state === 'custom') {
      initialView = {
        longitude: config.custom_longitude,
        latitude: config.custom_latitude,
        zoom: config.custom_zoom
      };
    }

    console.log('[3D MAP] Initial view preset:', config.initial_view_state);
    console.log('[3D MAP] Initial view coords:', initialView);

    // Add pitch for 3D effect
    if (config.enable_3d_tilt) {
      initialView.pitch = config.tilt_angle || 45;
      console.log('[3D MAP] 3D tilt enabled, pitch:', initialView.pitch);
    }

    const INITIAL_VIEW_STATE = {
      ...initialView,
      bearing: 0,
      minZoom: 0,
      maxZoom: 20
    };

    console.log('[3D MAP] Final view state:', INITIAL_VIEW_STATE);

    // Build layers
    console.log('[3D MAP] Building layers...');
    const layers = [];

    // Layer 1: Heatmap/Choropleth
    if (config.layer1_enabled && config.layer1_measure) {
      console.log('[3D MAP] Creating Layer 1 (type:', config.layer1_type, ')');
      const layer1 = this._createLayer1(processedData, config);
      if (layer1) {
        console.log('[3D MAP] Layer 1 created successfully');
        layers.push(layer1);
      } else {
        console.warn('[3D MAP] Layer 1 returned null');
      }
    } else {
      console.log('[3D MAP] Layer 1 disabled or no measure specified');
    }

    // Layer 2: 3D Columns
    if (config.layer2_enabled && config.layer2_measure) {
      console.log('[3D MAP] Creating Layer 2 (type:', config.layer2_type, ')');
      const layer2 = this._createLayer2(processedData, config);
      if (layer2) {
        console.log('[3D MAP] Layer 2 created successfully');
        layers.push(layer2);
      } else {
        console.warn('[3D MAP] Layer 2 returned null');
      }
    } else {
      console.log('[3D MAP] Layer 2 disabled or no measure specified');
    }

    // Layer 3: Points
    if (config.layer3_enabled && config.layer3_measure) {
      console.log('[3D MAP] Creating Layer 3 (type:', config.layer3_type, ')');
      const layer3 = this._createLayer3(processedData, config);
      if (layer3) {
        console.log('[3D MAP] Layer 3 created successfully');
        layers.push(layer3);
      } else {
        console.warn('[3D MAP] Layer 3 returned null');
      }
    } else {
      console.log('[3D MAP] Layer 3 disabled or no measure specified');
    }

    console.log('[3D MAP] Total layers created:', layers.length);

    // TEST: Add a simple scatter layer to verify Deck.gl is working
    console.log('[3D MAP] Adding test scatter layer for debugging...');
    const testLayer = new deck.ScatterplotLayer({
      id: 'test-scatter-layer',
      data: [
        {position: [-95.7129, 37.0902]}, // Center of US
        {position: [-118.2437, 34.0522]}, // LA
        {position: [-73.9352, 40.7306]}, // NYC
        {position: [2.3522, 48.8566]} // Paris
      ],
      getPosition: d => d.position,
      getRadius: 100000,
      getFillColor: [255, 0, 0, 200],
      pickable: true
    });
    layers.push(testLayer);
    console.log('[3D MAP] Test layer added. Total layers now:', layers.length);

    // Create or update Deck.gl instance
    if (this._deckgl) {
      console.log('[3D MAP] Updating existing Deck.gl instance');
      this._deckgl.setProps({
        layers: layers,
        initialViewState: INITIAL_VIEW_STATE
      });
    } else {
      console.log('[3D MAP] Creating NEW Deck.gl instance');
      console.log('[3D MAP] Container element:', this._mapContainer);
      console.log('[3D MAP] Map style:', config.map_style);

      try {
        // Note: Deck.gl exposes DeckGL at top level, not deck.DeckGL
        const DeckGL = deck.DeckGL || window.DeckGL;
        console.log('[3D MAP] DeckGL constructor:', DeckGL);

        this._deckgl = new DeckGL({
          container: this._mapContainer,
          mapStyle: config.map_style,
          initialViewState: INITIAL_VIEW_STATE,
          controller: true,
          layers: layers,
          getTooltip: ({object}) => this._getTooltip(object, config),
          onClick: ({object}) => this._handleClick(object, config),
          onLoad: () => {
            console.log('[3D MAP] Deck.gl onLoad fired - map rendered successfully!');
          },
          onError: (error) => {
            console.error('[3D MAP] Deck.gl error:', error);
          }
        });

        console.log('[3D MAP] Deck.gl instance created:', this._deckgl);

        // Auto-rotation if enabled
        if (config.enable_rotation) {
          console.log('[3D MAP] Starting auto-rotation');
          this._startRotation(config.rotation_speed);
        }
      } catch (error) {
        console.error('[3D MAP] ERROR creating Deck.gl:', error);
        console.error('[3D MAP] Error stack:', error.stack);
      }
    }

    console.log('[3D MAP] ========== _updateMap END ==========');
  },

  /**
   * Create Layer 1: Heatmap/Choropleth
   */
  _createLayer1: function(data, config) {
    console.log('[3D MAP] _createLayer1 called, type:', config.layer1_type);
    const measureField = config.layer1_measure;

    if (config.layer1_type === 'heatmap') {
      // HeatmapLayer
      console.log('[3D MAP] Creating HeatmapLayer');
      return new deck.HeatmapLayer({
        id: 'heatmap-layer',
        data: data.points,
        getPosition: d => d.position,
        getWeight: d => d.measures[measureField] || 1,
        radiusPixels: 60,
        intensity: 1,
        threshold: 0.03,
        opacity: config.layer1_opacity
      });
    } else if (config.layer1_type === 'hexagon') {
      // HexagonLayer for aggregated heatmap
      console.log('[3D MAP] Creating HexagonLayer for heatmap');
      return new deck.HexagonLayer({
        id: 'hexagon-heatmap-layer',
        data: data.points,
        getPosition: d => d.position,
        getElevationWeight: d => d.measures[measureField] || 1,
        elevationScale: 0,
        radius: 10000,
        opacity: config.layer1_opacity,
        colorRange: this._getColorRange(config.layer1_color_start, config.layer1_color_end),
        pickable: true
      });
    } else {
      // GeoJsonLayer for state/region fills
      console.log('[3D MAP] GeoJSON layer requested but not implemented yet');
      return null;
    }
  },

  /**
   * Create Layer 2: 3D Columns
   */
  _createLayer2: function(data, config) {
    console.log('[3D MAP] _createLayer2 called, type:', config.layer2_type);
    const measureField = config.layer2_measure;

    if (config.layer2_type === 'hexagon') {
      // 3D Hexagon aggregation
      console.log('[3D MAP] Creating 3D HexagonLayer');
      return new deck.HexagonLayer({
        id: '3d-hexagon-layer',
        data: data.points,
        getPosition: d => d.position,
        getElevationWeight: d => d.measures[measureField] || 1,
        elevationScale: config.layer2_elevation_scale,
        radius: config.layer2_radius,
        extruded: true,
        opacity: config.layer2_opacity,
        colorRange: this._getColorRange(config.layer2_color_start, config.layer2_color_end),
        pickable: true,
        autoHighlight: true
      });
    } else {
      // Column Grid Layer
      console.log('[3D MAP] Creating ColumnLayer');
      return new deck.ColumnLayer({
        id: '3d-column-layer',
        data: data.points,
        diskResolution: 12,
        radius: config.layer2_radius,
        extruded: true,
        pickable: true,
        elevationScale: config.layer2_elevation_scale,
        getPosition: d => d.position,
        getFillColor: d => this._getColumnColor(d, measureField, config),
        getLineColor: [255, 255, 255, 80],
        getElevation: d => d.measures[measureField] || 0,
        opacity: config.layer2_opacity,
        autoHighlight: true
      });
    }
  },

  /**
   * Create Layer 3: Points/Bubbles
   */
  _createLayer3: function(data, config) {
    console.log('[3D MAP] _createLayer3 called, type:', config.layer3_type);
    const measureField = config.layer3_measure;

    if (config.layer3_type === 'bubble') {
      // ScatterplotLayer with variable radius
      console.log('[3D MAP] Creating ScatterplotLayer (bubbles)');
      return new deck.ScatterplotLayer({
        id: 'bubble-layer',
        data: data.points,
        getPosition: d => d.position,
        getRadius: d => (d.measures[measureField] || 1) * config.layer3_radius_scale,
        getFillColor: this._hexToRgb(config.layer3_color),
        opacity: config.layer3_opacity,
        pickable: true,
        radiusMinPixels: 3,
        radiusMaxPixels: 100,
        autoHighlight: true
      });
    } else if (config.layer3_type === 'column') {
      // 3D columns for points
      console.log('[3D MAP] Creating ColumnLayer for points');
      return new deck.ColumnLayer({
        id: 'point-column-layer',
        data: data.points,
        diskResolution: 12,
        radius: 10000,
        extruded: true,
        pickable: true,
        elevationScale: config.layer2_elevation_scale / 2,
        getPosition: d => d.position,
        getFillColor: this._hexToRgb(config.layer3_color),
        getElevation: d => d.measures[measureField] || 0,
        opacity: config.layer3_opacity,
        autoHighlight: true
      });
    } else {
      // Simple scatter points
      console.log('[3D MAP] Creating ScatterplotLayer (simple points)');
      return new deck.ScatterplotLayer({
        id: 'scatter-layer',
        data: data.points,
        getPosition: d => d.position,
        getRadius: 5000,
        getFillColor: this._hexToRgb(config.layer3_color),
        opacity: config.layer3_opacity,
        pickable: true,
        autoHighlight: true
      });
    }
  },

  /**
   * Get color for column based on measure value
   */
  _getColumnColor: function(d, measureField, config) {
    const value = d.measures[measureField] || 0;

    if (config.layer2_color_mode === 'single') {
      return this._hexToRgb(config.layer2_color_start);
    } else if (config.layer2_color_mode === 'gradient') {
      // Find min/max for normalization (would need to pass this in)
      // Simplified: use fixed scale
      const normalized = Math.min(value / 1000, 1);
      return this._interpolateColorRgb(
        config.layer2_color_start,
        config.layer2_color_end,
        normalized
      );
    }

    return this._hexToRgb(config.layer2_color_start);
  },

  /**
   * Generate color range for deck.gl layers
   */
  _getColorRange: function(startColor, endColor, steps = 6) {
    const range = [];
    for (let i = 0; i < steps; i++) {
      const ratio = i / (steps - 1);
      range.push(this._interpolateColorRgb(startColor, endColor, ratio));
    }
    return range;
  },

  /**
   * Interpolate between two colors (returns RGB array)
   */
  _interpolateColorRgb: function(color1, color2, ratio) {
    const c1 = this._hexToRgb(color1);
    const c2 = this._hexToRgb(color2);

    return [
      Math.round(c1[0] + (c2[0] - c1[0]) * ratio),
      Math.round(c1[1] + (c2[1] - c1[1]) * ratio),
      Math.round(c1[2] + (c2[2] - c1[2]) * ratio)
    ];
  },

  /**
   * Convert hex color to RGB array
   */
  _hexToRgb: function(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : [128, 128, 128];
  },

  /**
   * Generate tooltip content
   */
  _getTooltip: function(object, config) {
    if (!object) return null;

    const location = object.location || 'Location';
    let html = `<div style="font-weight: 600; margin-bottom: 6px;">${location}</div>`;

    // Add measure values
    if (object.measures) {
      for (const [key, value] of Object.entries(object.measures)) {
        const displayName = key.split('.').pop();
        html += `<div>${displayName}: <strong>${this._formatNumber(value)}</strong></div>`;
      }
    }

    return {
      html: html,
      style: {
        backgroundColor: config.tooltip_background,
        color: config.tooltip_text_color,
        fontSize: '13px',
        padding: '12px',
        borderRadius: '6px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
      }
    };
  },

  /**
   * Handle click interaction
   */
  _handleClick: function(object, config) {
    if (!object) return;

    console.log('[3D MAP] Clicked object:', object);

    this._selectedRegion = object.location;

    // Update panel with clicked region data
    if (config.panel_enabled) {
      this._updatePanelForRegion(object, config);
    }

    // Trigger Looker filter if enabled
    if (config.enable_click_filter && object.location) {
      // Would implement LookerCharts.Utils.openDrillMenu() here
      console.log('[3D MAP] Would filter to:', object.location);
    }
  },

  /**
   * Update side panel
   */
  _updatePanel: function(data, config) {
    if (!config.panel_enabled) {
      this._panelContainer.style.display = 'none';
      return;
    }

    // Position and size
    const width = config.panel_width;
    this._panelContainer.style.width = `${width}%`;
    this._panelContainer.style[config.panel_position] = '0';
    this._panelContainer.style[config.panel_position === 'right' ? 'left' : 'right'] = 'auto';
    this._panelContainer.style.backgroundColor = config.panel_background;
    this._panelContainer.style.color = config.panel_text_color;
    this._panelContainer.style.display = 'block';

    // Aggregate all breakdown data
    const breakdown = {};
    let total = 0;

    data.points.forEach(point => {
      if (point.breakdown) {
        breakdown[point.breakdown] = (breakdown[point.breakdown] || 0) + 1;
        total++;
      }
    });

    // Create content
    let html = `
      <div style="padding: 20px;">
        <h3 style="margin: 0 0 20px 0; font-size: 18px; font-weight: 600;">
          ${this._selectedRegion || 'Overall Summary'}
        </h3>
        <div style="font-size: 13px; color: ${config.panel_text_color}99; margin-bottom: 20px;">
          Total Locations: ${data.points.length}
        </div>
    `;

    if (Object.keys(breakdown).length > 0) {
      html += `<div id="pie-chart-container" style="margin-top: 20px;"></div>`;
    }

    html += `</div>`;

    this._panelContainer.innerHTML = html;

    // Render pie chart if breakdown data exists
    if (Object.keys(breakdown).length > 0) {
      this._renderPieChart(breakdown, total, config);
    }
  },

  /**
   * Update panel for specific region
   */
  _updatePanelForRegion: function(object, config) {
    if (!config.panel_enabled) return;

    const breakdown = object.breakdown || {};
    let total = 0;

    if (typeof breakdown === 'object') {
      total = Object.values(breakdown).reduce((sum, val) => sum + val, 0);
    }

    let html = `
      <div style="padding: 20px;">
        <h3 style="margin: 0 0 20px 0; font-size: 18px; font-weight: 600;">
          ${object.location}
        </h3>
    `;

    // Add measure values
    if (object.measures) {
      html += `<div style="margin-bottom: 20px;">`;
      for (const [key, value] of Object.entries(object.measures)) {
        const displayName = key.split('.').pop();
        html += `
          <div style="margin-bottom: 8px;">
            <span style="color: ${config.panel_text_color}99;">${displayName}:</span>
            <strong style="float: right;">${this._formatNumber(value)}</strong>
          </div>
        `;
      }
      html += `</div>`;
    }

    if (Object.keys(breakdown).length > 0) {
      html += `<div id="pie-chart-container" style="margin-top: 20px;"></div>`;
    }

    html += `</div>`;

    this._panelContainer.innerHTML = html;

    if (Object.keys(breakdown).length > 0) {
      this._renderPieChart(breakdown, total, config);
    }
  },

  /**
   * Render pie chart using D3
   */
  _renderPieChart: function(breakdown, total, config) {
    const container = document.getElementById('pie-chart-container');
    if (!container) return;

    const width = container.offsetWidth || 250;
    const height = 250;
    const radius = Math.min(width, height) / 2 - 20;

    // Prepare data
    const pieData = Object.entries(breakdown)
      .map(([key, value]) => ({
        label: key,
        value: value,
        percentage: (value / total * 100).toFixed(1)
      }))
      .sort((a, b) => b.value - a.value);

    // Color scale (using Google colors)
    const colors = ['#4285F4', '#34A853', '#FBBC04', '#EA4335', '#9AA0A6', '#5F6368'];

    // Create SVG
    const svg = d3.select(container)
      .html('')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width/2}, ${height/2})`);

    // Create pie
    const pie = d3.pie()
      .value(d => d.value)
      .sort(null);

    const arc = d3.arc()
      .innerRadius(radius * 0.5) // Donut chart
      .outerRadius(radius);

    const arcs = svg.selectAll('arc')
      .data(pie(pieData))
      .enter()
      .append('g');

    // Draw slices
    arcs.append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => colors[i % colors.length])
      .attr('stroke', config.panel_background)
      .attr('stroke-width', 2)
      .style('opacity', 0.9);

    // Add labels
    arcs.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .attr('fill', config.panel_text_color)
      .attr('font-size', '12px')
      .attr('font-weight', '600')
      .text(d => `${d.data.percentage}%`);

    // Add legend
    const legend = d3.select(container)
      .append('div')
      .style('margin-top', '15px')
      .style('font-size', '12px');

    pieData.forEach((d, i) => {
      const item = legend.append('div')
        .style('display', 'flex')
        .style('align-items', 'center')
        .style('margin-bottom', '6px');

      item.append('div')
        .style('width', '12px')
        .style('height', '12px')
        .style('background-color', colors[i % colors.length])
        .style('margin-right', '8px')
        .style('border-radius', '2px');

      item.append('span')
        .style('flex', '1')
        .text(d.label);

      item.append('span')
        .style('font-weight', '600')
        .text(d.value);
    });
  },

  /**
   * Start auto-rotation
   */
  _startRotation: function(speed) {
    if (this._rotationInterval) {
      clearInterval(this._rotationInterval);
    }

    let bearing = 0;
    this._rotationInterval = setInterval(() => {
      if (this._deckgl) {
        bearing = (bearing + speed) % 360;
        const viewState = this._deckgl.viewState;
        this._deckgl.setProps({
          initialViewState: {
            ...viewState,
            bearing: bearing
          }
        });
      }
    }, 50);
  },

  /**
   * Format number for display
   */
  _formatNumber: function(value) {
    if (value === null || value === undefined) return 'N/A';

    if (Math.abs(value) >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    } else if (Math.abs(value) >= 1000) {
      return (value / 1000).toFixed(1) + 'K';
    } else {
      return value.toFixed(0);
    }
  },

  /**
   * Cleanup
   */
  destroy: function() {
    console.log('[3D MAP] Destroying visualization...');

    if (this._rotationInterval) {
      clearInterval(this._rotationInterval);
    }

    if (this._deckgl) {
      this._deckgl.finalize();
      this._deckgl = null;
    }
  }
});
