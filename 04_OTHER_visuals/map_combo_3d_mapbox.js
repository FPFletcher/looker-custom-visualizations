/**
 * Multi-Layer 3D Map for Looker - Enhanced with Region Support
 *
 * Supports multiple data modes:
 * - Point data (lat/lng coordinates)
 * - Region data (choropleth with built-in or custom map layers)
 *
 * Layer Types:
 * - Layer 1: Heatmap/Hexagon/Choropleth (GeoJSON)
 * - Layer 2: 3D Columns
 * - Layer 3: Points/Bubbles
 */

looker.plugins.visualizations.add({
  id: "combo_map_3d",
  label: "Combo Map 3D",
  options: {
    // MAP
    mapbox_token: {
      type: "string",
      label: "Mapbox Token",
      section: "Map",
      placeholder: "Get free token at mapbox.com"
    },
    map_style: {
      type: "string",
      label: "Map Style",
      display: "select",
      values: [
        {"Dark": "mapbox://styles/mapbox/dark-v11"},
        {"Light": "mapbox://styles/mapbox/light-v11"},
        {"Streets": "mapbox://styles/mapbox/streets-v12"},
        {"Satellite": "mapbox://styles/mapbox/satellite-streets-v12"}
      ],
      default: "mapbox://styles/mapbox/dark-v11",
      section: "Map"
    },
    center_lat: {
      type: "number",
      label: "Center Latitude",
      default: 46.5,
      section: "Map"
    },
    center_lng: {
      type: "number",
      label: "Center Longitude",
      default: 2.5,
      section: "Map"
    },
    zoom: {
      type: "number",
      label: "Zoom",
      default: 6,
      section: "Map"
    },
    pitch: {
      type: "number",
      label: "3D Tilt (0-60)",
      default: 45,
      min: 0,
      max: 60,
      section: "Map"
    },

    // DATA MODE
    data_mode: {
      type: "string",
      label: "Data Mode",
      display: "select",
      values: [
        {"Point Data (Lat/Lng)": "points"},
        {"Region Data (Choropleth)": "regions"}
      ],
      default: "points",
      section: "Data"
    },

    // LAYER 1
    layer1_enabled: {
      type: "boolean",
      label: "Enable Layer 1",
      default: true,
      section: "Layer 1"
    },
    layer1_type: {
      type: "string",
      label: "Type",
      display: "select",
      values: [
        {"Heatmap": "heatmap"},
        {"Hexagon Grid": "hexagon"},
        {"Choropleth (GeoJSON)": "geojson"}
      ],
      default: "hexagon",
      section: "Layer 1"
    },

    // Region/GeoJSON Settings
    layer1_map_layer: {
      type: "string",
      label: "Built-in Map Layer",
      display: "select",
      values: [
        {"Custom (URL below)": "custom"},
        {"US States": "us_states"},
        {"US Counties": "us_counties"},
        {"Countries": "countries"},
        {"UK Postcode Areas": "uk_postcode_areas"},
        {"UK Postcode Districts": "uk_postcode_districts"},
        {"UK Postcode Sectors": "uk_postcode_sectors"},
        {"Canadian Provinces": "canada_provinces"},
        {"Canadian FSA": "canada_fsa"},
        {"French Departments": "france_departments"},
        {"French Regions": "france_regions"},
        {"German States": "germany_states"},
        {"Italian Regions": "italy_regions"},
        {"Italian Provinces": "italy_provinces"},
        {"Spanish Provinces": "spain_provinces"},
        {"Spanish Regions": "spain_regions"},
        {"Brazil States": "brazil_states"},
        {"Japan Prefectures": "japan_prefectures"},
        {"Australia States": "australia_states"},
        {"China Provinces": "china_provinces"},
        {"India States": "india_states"}
      ],
      default: "custom",
      section: "Layer 1"
    },
    layer1_geojson_url: {
      type: "string",
      label: "Custom GeoJSON/TopoJSON URL",
      section: "Layer 1",
      placeholder: "https://example.com/regions.json"
    },
    layer1_geojson_property: {
      type: "string",
      label: "GeoJSON Property to Match",
      default: "name",
      section: "Layer 1",
      placeholder: "Property name in GeoJSON (e.g., 'name', 'id', 'code')"
    },
    layer1_region_dimension: {
      type: "string",
      label: "Region Dimension Name",
      section: "Layer 1",
      placeholder: "Leave empty to auto-detect"
    },
    layer1_measure: {
      type: "string",
      label: "Measure for Color",
      section: "Layer 1",
      placeholder: "Leave empty to use first measure"
    },
    layer1_color_start: {
      type: "string",
      label: "Color Low",
      default: "#E8F5E9",
      display: "color",
      section: "Layer 1"
    },
    layer1_color_end: {
      type: "string",
      label: "Color High",
      default: "#1B5E20",
      display: "color",
      section: "Layer 1"
    },
    layer1_opacity: {
      type: "number",
      label: "Opacity",
      default: 0.7,
      min: 0,
      max: 1,
      step: 0.1,
      section: "Layer 1"
    },

    // LAYER 2
    layer2_enabled: {
      type: "boolean",
      label: "Enable 3D Columns",
      default: true,
      section: "Layer 2"
    },
    layer2_height_scale: {
      type: "number",
      label: "Height Scale",
      default: 1000,
      section: "Layer 2"
    },
    layer2_radius: {
      type: "number",
      label: "Column Radius",
      default: 50000,
      section: "Layer 2"
    },
    layer2_color: {
      type: "string",
      label: "Color",
      default: "#4285F4",
      display: "color",
      section: "Layer 2"
    },
    layer2_measure: {
      type: "string",
      label: "Measure for Height",
      section: "Layer 2",
      placeholder: "Leave empty to use second measure"
    },

    // LAYER 3
    layer3_enabled: {
      type: "boolean",
      label: "Enable Points",
      default: false,
      section: "Layer 3"
    },
    layer3_radius: {
      type: "number",
      label: "Point Size",
      default: 5000,
      section: "Layer 3"
    },
    layer3_color: {
      type: "string",
      label: "Color",
      default: "#EA4335",
      display: "color",
      section: "Layer 3"
    },
    layer3_measure: {
      type: "string",
      label: "Measure for Size",
      section: "Layer 3",
      placeholder: "Leave empty to use third measure"
    }
  },

  create: function(element, config) {
    console.log('[MAP] Creating visualization');
    element.innerHTML = '<div id="map" style="width:100%;height:100%;"></div>';
    this._container = element.querySelector('#map');
    this._geojsonCache = {};
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    console.log('[MAP] ========== UPDATE START ==========');
    console.log('[MAP] Data mode:', config.data_mode);

    this.clearErrors();

    // Validate dependencies
    if (typeof deck === 'undefined' || typeof mapboxgl === 'undefined') {
      this.addError({ title: "Missing Dependencies", message: "Deck.gl or Mapbox GL not loaded" });
      done();
      return;
    }

    if (!config.mapbox_token) {
      this.addError({ title: "Mapbox Token Required", message: "Add token in settings" });
      done();
      return;
    }

    try {
      const dims = queryResponse.fields.dimension_like;
      const measures = queryResponse.fields.measure_like;

      console.log('[MAP] Dimensions:', dims.map(d => d.name));
      console.log('[MAP] Measures:', measures.map(m => m.name));

      // Set Mapbox token
      mapboxgl.accessToken = config.mapbox_token;

      if (config.data_mode === 'regions') {
        this._updateRegionMode(data, config, queryResponse, done);
      } else {
        this._updatePointMode(data, config, queryResponse, done);
      }

    } catch (error) {
      console.error('[MAP] Error:', error);
      this.addError({ title: "Error", message: error.message });
      done();
    }
  },

  _updatePointMode: function(data, config, queryResponse, done) {
    console.log('[MAP] Point mode');

    const dims = queryResponse.fields.dimension_like;
    const measures = queryResponse.fields.measure_like;

    // Find lat/lng
    const latF = dims.find(d => d.type === 'latitude' || d.name.toLowerCase().includes('lat'));
    const lngF = dims.find(d => d.type === 'longitude' || d.name.toLowerCase().includes('lon'));

    if (!latF || !lngF) {
      this.addError({ title: "Need Lat/Lng", message: "Add latitude and longitude dimensions" });
      done();
      return;
    }

    // Process points
    const points = data.map(row => ({
      position: [parseFloat(row[lngF.name].value), parseFloat(row[latF.name].value)],
      values: measures.map(m => parseFloat(row[m.name]?.value) || 0)
    })).filter(p => !isNaN(p.position[0]) && !isNaN(p.position[1]));

    console.log('[MAP] Valid points:', points.length);

    const layers = this._buildPointLayers(points, config, measures);
    this._renderMap(layers, config, done);
  },

  _updateRegionMode: function(data, config, queryResponse, done) {
    console.log('[MAP] Region mode');

    const dims = queryResponse.fields.dimension_like;
    const measures = queryResponse.fields.measure_like;

    // Find region dimension
    let regionDim = null;
    if (config.layer1_region_dimension) {
      regionDim = dims.find(d => d.name === config.layer1_region_dimension);
    } else {
      // Auto-detect: first string dimension
      regionDim = dims.find(d => d.type === 'string');
    }

    if (!regionDim) {
      this.addError({ title: "No Region Dimension", message: "Add a region/location dimension" });
      done();
      return;
    }

    console.log('[MAP] Region dimension:', regionDim.name);

    // Get GeoJSON URL
    const geojsonUrl = this._getGeoJSONUrl(config);

    if (!geojsonUrl) {
      this.addError({
        title: "GeoJSON Required",
        message: "Select built-in map layer or provide custom GeoJSON URL"
      });
      done();
      return;
    }

    console.log('[MAP] Loading GeoJSON:', geojsonUrl);

    // Load GeoJSON and render
    this._loadGeoJSON(geojsonUrl).then(geojson => {
      const layers = this._buildRegionLayers(data, geojson, config, queryResponse, regionDim, measures);
      this._renderMap(layers, config, done);
    }).catch(error => {
      console.error('[MAP] GeoJSON load error:', error);
      this.addError({ title: "GeoJSON Error", message: error.message });
      done();
    });
  },

  _getGeoJSONUrl: function(config) {
    if (config.layer1_map_layer === 'custom') {
      return config.layer1_geojson_url;
    }

    // Built-in Looker map layers - using common public sources
    const builtInMaps = {
      'us_states': 'https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json',
      'us_counties': 'https://raw.githubusercontent.com/plotly/datasets/master/geojson-counties-fips.json',
      'countries': 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson',
      'uk_postcode_areas': 'https://raw.githubusercontent.com/missinglink/uk-postcode-polygons/master/geojson/postcode_areas.geojson',
      'france_departments': 'https://france-geojson.gregoiredavid.fr/repo/departements.geojson',
      'france_regions': 'https://france-geojson.gregoiredavid.fr/repo/regions.geojson',
      'germany_states': 'https://raw.githubusercontent.com/isellsoap/deutschlandGeoJSON/main/2_bundeslaender/4_niedrig.geo.json',
      'italy_regions': 'https://raw.githubusercontent.com/openpolis/geojson-italy/master/geojson/limits_IT_regions.geojson',
      'spain_provinces': 'https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/spain-provinces.geojson',
      'canada_provinces': 'https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/canada.geojson',
      'brazil_states': 'https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson',
      'japan_prefectures': 'https://raw.githubusercontent.com/dataofjapan/land/master/japan.geojson',
      'australia_states': 'https://raw.githubusercontent.com/tonywr71/GeoJson-Data/master/australian-states.json',
      'china_provinces': 'https://raw.githubusercontent.com/longwosion/geojson-map-china/master/china.json',
      'india_states': 'https://raw.githubusercontent.com/Subhash9325/GeoJson-Data-of-Indian-States/master/Indian_States'
    };

    return builtInMaps[config.layer1_map_layer] || config.layer1_geojson_url;
  },

  _loadGeoJSON: async function(url) {
    if (this._geojsonCache[url]) {
      console.log('[MAP] Using cached GeoJSON');
      return this._geojsonCache[url];
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to load: ${response.status}`);

    const data = await response.json();

    // Handle TopoJSON
    if (data.type === 'Topology') {
      if (typeof topojson === 'undefined') {
        throw new Error('TopoJSON library required but not loaded');
      }
      const objectKey = Object.keys(data.objects)[0];
      const geojson = topojson.feature(data, data.objects[objectKey]);
      this._geojsonCache[url] = geojson;
      return geojson;
    }

    this._geojsonCache[url] = data;
    return data;
  },

  _buildPointLayers: function(points, config, measures) {
    const layers = [];

    // Layer 1
    if (config.layer1_enabled && config.layer1_type !== 'geojson') {
      if (config.layer1_type === 'heatmap') {
        layers.push(new deck.HeatmapLayer({
          id: 'heatmap',
          data: points,
          getPosition: d => d.position,
          getWeight: d => d.values[0] || 1,
          radiusPixels: 60,
          opacity: 0.9
        }));
      } else {
        layers.push(new deck.HexagonLayer({
          id: 'hexagon',
          data: points,
          getPosition: d => d.position,
          getElevationWeight: d => d.values[0] || 1,
          elevationScale: 0,
          radius: 10000,
          colorRange: this._getColorRange(config.layer1_color_start, config.layer1_color_end),
          opacity: config.layer1_opacity || 0.7,
          pickable: true
        }));
      }
    }

    // Layer 2: Columns
    if (config.layer2_enabled) {
      const idx = measures.length > 1 ? 1 : 0;
      layers.push(new deck.ColumnLayer({
        id: 'columns',
        data: points,
        diskResolution: 12,
        radius: config.layer2_radius,
        extruded: true,
        pickable: true,
        elevationScale: config.layer2_height_scale,
        getPosition: d => d.position,
        getFillColor: this._hexToRgb(config.layer2_color),
        getLineColor: [255, 255, 255, 80],
        getElevation: d => d.values[idx] || 0,
        opacity: 0.8
      }));
    }

    // Layer 3: Points
    if (config.layer3_enabled) {
      const idx = measures.length > 2 ? 2 : 0;
      layers.push(new deck.ScatterplotLayer({
        id: 'points',
        data: points,
        getPosition: d => d.position,
        getRadius: config.layer3_radius,
        getFillColor: this._hexToRgb(config.layer3_color),
        opacity: 0.7,
        pickable: true
      }));
    }

    return layers;
  },

  _buildRegionLayers: function(data, geojson, config, queryResponse, regionDim, measures) {
    console.log('[MAP] Building region layers');

    const layers = [];

    // Create data lookup
    const dataMap = {};
    data.forEach(row => {
      const region = row[regionDim.name].value;
      const values = measures.map(m => parseFloat(row[m.name]?.value) || 0);
      dataMap[region] = values;
    });

    console.log('[MAP] Data map keys:', Object.keys(dataMap).slice(0, 5));
    console.log('[MAP] GeoJSON features:', geojson.features.length);

    // Get measure for coloring
    const measureIdx = config.layer1_measure ?
      measures.findIndex(m => m.name === config.layer1_measure) : 0;

    // Calculate value range for color scaling
    const allValues = Object.values(dataMap).map(v => v[measureIdx] || 0);
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);

    console.log('[MAP] Value range:', minValue, 'to', maxValue);

    // Layer 1: Choropleth
    if (config.layer1_enabled && config.layer1_type === 'geojson') {
      const property = config.layer1_geojson_property || 'name';

      layers.push(new deck.GeoJsonLayer({
        id: 'geojson',
        data: geojson,
        filled: true,
        stroked: true,
        pickable: true,
        opacity: config.layer1_opacity || 0.7,
        getLineColor: [255, 255, 255, 100],
        getLineWidth: 1,
        getFillColor: f => {
          const regionName = f.properties[property];
          const values = dataMap[regionName];

          if (!values) return [200, 200, 200, 100];

          const value = values[measureIdx] || 0;
          const ratio = maxValue > minValue ? (value - minValue) / (maxValue - minValue) : 0;

          return this._interpolateColorRgb(
            config.layer1_color_start,
            config.layer1_color_end,
            ratio
          );
        }
      }));
    }

    // For layers 2 & 3, we need centroids
    const centroids = this._calculateCentroids(geojson, dataMap, config.layer1_geojson_property);

    // Layer 2: Columns at centroids
    if (config.layer2_enabled && centroids.length > 0) {
      const idx = config.layer2_measure ?
        measures.findIndex(m => m.name === config.layer2_measure) :
        (measures.length > 1 ? 1 : 0);

      layers.push(new deck.ColumnLayer({
        id: 'columns',
        data: centroids,
        diskResolution: 12,
        radius: config.layer2_radius,
        extruded: true,
        pickable: true,
        elevationScale: config.layer2_height_scale,
        getPosition: d => d.position,
        getFillColor: this._hexToRgb(config.layer2_color),
        getLineColor: [255, 255, 255, 80],
        getElevation: d => d.values[idx] || 0,
        opacity: 0.8
      }));
    }

    // Layer 3: Points at centroids
    if (config.layer3_enabled && centroids.length > 0) {
      const idx = config.layer3_measure ?
        measures.findIndex(m => m.name === config.layer3_measure) :
        (measures.length > 2 ? 2 : 0);

      layers.push(new deck.ScatterplotLayer({
        id: 'points',
        data: centroids,
        getPosition: d => d.position,
        getRadius: config.layer3_radius,
        getFillColor: this._hexToRgb(config.layer3_color),
        opacity: 0.7,
        pickable: true
      }));
    }

    console.log('[MAP] Built', layers.length, 'layers');
    return layers;
  },

  _calculateCentroids: function(geojson, dataMap, property) {
    const centroids = [];

    geojson.features.forEach(feature => {
      const regionName = feature.properties[property || 'name'];
      const values = dataMap[regionName];

      if (!values) return;

      let centroid;
      if (feature.geometry.type === 'Polygon') {
        centroid = this._polygonCentroid(feature.geometry.coordinates[0]);
      } else if (feature.geometry.type === 'MultiPolygon') {
        centroid = this._polygonCentroid(feature.geometry.coordinates[0][0]);
      } else {
        return;
      }

      centroids.push({
        position: centroid,
        values: values,
        region: regionName
      });
    });

    return centroids;
  },

  _polygonCentroid: function(coordinates) {
    let x = 0, y = 0;
    coordinates.forEach(coord => {
      x += coord[0];
      y += coord[1];
    });
    return [x / coordinates.length, y / coordinates.length];
  },

  _renderMap: function(layers, config, done) {
    console.log('[MAP] Rendering', layers.length, 'layers');

    const viewState = {
      longitude: config.center_lng,
      latitude: config.center_lat,
      zoom: config.zoom,
      pitch: config.pitch,
      bearing: 0
    };

    if (!this._deck) {
      this._deck = new deck.DeckGL({
        container: this._container,
        mapStyle: config.map_style,
        initialViewState: viewState,
        controller: true,
        layers: layers
      });
    } else {
      this._deck.setProps({ layers, initialViewState: viewState });
    }

    done();
  },

  _getColorRange: function(start, end) {
    const steps = 6;
    const range = [];
    for (let i = 0; i < steps; i++) {
      const ratio = i / (steps - 1);
      range.push(this._interpolateColorRgb(start, end, ratio));
    }
    return range;
  },

  _interpolateColorRgb: function(color1, color2, ratio) {
    const c1 = this._hexToRgb(color1);
    const c2 = this._hexToRgb(color2);
    return [
      Math.round(c1[0] + (c2[0] - c1[0]) * ratio),
      Math.round(c1[1] + (c2[1] - c1[1]) * ratio),
      Math.round(c1[2] + (c2[2] - c1[2]) * ratio)
    ];
  },

  _hexToRgb: function(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : [128, 128, 128];
  },

  destroy: function() {
    if (this._deck) {
      this._deck.finalize();
      this._deck = null;
    }
  }
});
