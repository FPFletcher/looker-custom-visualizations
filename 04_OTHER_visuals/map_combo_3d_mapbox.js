/**
 * Multi-Layer 3D Map for Looker - Fixed URLs & 2D Mode
 * * MANIFEST DEPENDENCIES:
 * {
 * "dependencies": {
 * "deck.gl": "https://unpkg.com/deck.gl@latest/dist.min.js",
 * "mapbox-gl": "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js",
 * "mapbox-gl-css": "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css",
 * "topojson": "https://unpkg.com/topojson-client@3"
 * }
 * }
 */

looker.plugins.visualizations.add({
  id: "combo_map_3d",
  label: "Combo Map 3D (v2 Fixed)",
  options: {
    // MAP SETTINGS
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
      default: 48,
      section: "Map"
    },
    center_lng: {
      type: "number",
      label: "Center Longitude",
      default: 10,
      section: "Map"
    },
    zoom: {
      type: "number",
      label: "Zoom",
      default: 4,
      section: "Map"
    },
    pitch: {
      type: "number",
      label: "3D Tilt (0 = 2D Mode)",
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
      default: "regions",
      section: "Data"
    },

    // LAYER 1 (Base Regions/Grid)
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
      default: "geojson",
      section: "Layer 1"
    },

    // Region/GeoJSON Settings
    layer1_map_layer: {
      type: "string",
      label: "Built-in Map Layer",
      display: "select",
      values: [
        {"Custom (URL below)": "custom"},
        // Global
        {"World Countries": "world_countries"},
        // Americas
        {"USA - States": "us_states"},
        {"USA - Counties": "us_counties"},
        {"Canada - Provinces": "canada_provinces"},
        {"Mexico - States": "mexico_states"},
        {"Brazil - States": "brazil_states"},
        // Europe
        {"France - Departments": "france_departments"},
        {"France - Regions": "france_regions"},
        {"UK - Regions": "uk_regions"},
        {"UK - Sub-units": "uk_subunits"},
        {"Germany - States (Bundesländer)": "germany_states"},
        {"Spain - Autonomous Communities": "spain_communities"},
        {"Italy - Regions": "italy_regions"},
        {"Netherlands - Provinces": "netherlands_provinces"},
        {"Switzerland - Cantons": "switzerland_cantons"},
        {"Austria - States": "austria_states"},
        {"Belgium - Provinces": "belgium_provinces"},
        // Combined / Super Layers
        {"COMBINED: Europe Major (Fr/De/Uk/Es/It)": "combined_europe_major"},
        {"COMBINED: DACH (De/Au/Ch)": "combined_dach"},
        {"COMBINED: Benelux": "combined_benelux"}
      ],
      default: "combined_europe_major",
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
      placeholder: "Property name in GeoJSON (e.g., 'name', 'id', 'NAME')"
    },
    layer1_region_dimension: {
      type: "string",
      label: "Region Dimension Name",
      section: "Layer 1",
      placeholder: "Leave empty to auto-detect"
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

    // LAYER 2 (3D Columns)
    layer2_enabled: {
      type: "boolean",
      label: "Enable Columns",
      default: true,
      section: "Layer 2"
    },
    layer2_height_scale: {
      type: "number",
      label: "Height Scale (3D Only)",
      default: 1000,
      section: "Layer 2"
    },
    layer2_radius: {
      type: "number",
      label: "Column Radius",
      default: 20000,
      section: "Layer 2"
    },
    layer2_color: {
      type: "string",
      label: "Color",
      default: "#4285F4",
      display: "color",
      section: "Layer 2"
    },

    // LAYER 3 (Points/Scatterplot) - RESTORED
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
    }
  },

  create: function(element, config) {
    console.log('[MAP] Creating');
    element.innerHTML = '<div id="map" style="width:100%;height:100%;"></div>';
    this._container = element.querySelector('#map');
    this._geojsonCache = {};
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    console.log('[MAP] ========== UPDATE ==========');

    this.clearErrors();

    // Check dependencies
    if (typeof deck === 'undefined' || typeof mapboxgl === 'undefined') {
      this.addError({ title: "Missing Dependencies", message: "Deck.gl or Mapbox GL not loaded" });
      done();
      return;
    }

    if (!config.mapbox_token) {
      this.addError({ title: "Mapbox Token Required", message: "Add token in Map settings" });
      done();
      return;
    }

    try {
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

  // -----------------------------------------------------------
  //  DATA PREP & NORMALIZATION
  // -----------------------------------------------------------

  REGION_ALIASES: {
      // Germany
      'nordrhein-westfalen': 'north rhine-westphalia',
      'baden-württemberg': 'baden-wurttemberg',
      'bayern': 'bavaria',
      'niedersachsen': 'lower saxony',
      'hessen': 'hesse',
      'rheinland-pfalz': 'rhineland-palatinate',
      'thüringen': 'thuringia',
      'sachsen': 'saxony',
      'sachsen-anhalt': 'saxony-anhalt',
      'mecklenburg-vorpommern': 'mecklenburg-western pomerania',

      // Spain
      'cataluña': 'catalonia',
      'andalucía': 'andalusia',
      'comunidad valenciana': 'valencian community',
      'país vasco': 'basque country',
      'aragón': 'aragon',
      'castilla y león': 'castile and leon',
      'castilla-la mancha': 'castile-la mancha',
      'islas baleares': 'balearic islands',
      'canarias': 'canary islands',
      'comunidad de madrid': 'madrid',
      'región de murcia': 'murcia',
      'principado de asturias': 'asturias',
      'navarra': 'navarre',

      // Belgium (Note: Map layers are often Provinces, Data might be Regions)
      'vlaanderen': 'flanders',
      'wallonie': 'wallonia',
      'bruxelles': 'brussels',

      // Countries
      'deutschland': 'germany',
      'españa': 'spain',
      'österreich': 'austria'
  },

  _normalizeName: function(name) {
      if (!name) return '';
      let clean = name.toString().toLowerCase().trim();
      if (this.REGION_ALIASES[clean]) {
          clean = this.REGION_ALIASES[clean];
      }
      // Remove accents: "Aragón" -> "aragon"
      return clean.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  },

  _updateRegionMode: function(data, config, queryResponse, done) {
    const dims = queryResponse.fields.dimension_like;
    const measures = queryResponse.fields.measure_like;

    let regionDim = config.layer1_region_dimension ?
      dims.find(d => d.name === config.layer1_region_dimension) :
      dims.find(d => d.type === 'string');

    if (!regionDim) {
      this.addError({ title: "No Region Dimension", message: "Add a location dimension" });
      done();
      return;
    }

    const geojsonSource = this._getGeoJSONUrl(config);

    this._loadGeoJSON(geojsonSource).then(geojson => {
      const layers = this._buildRegionLayers(data, geojson, config, queryResponse, regionDim, measures);
      this._renderMap(layers, config, done);
    }).catch(error => {
      this.addError({ title: "Load Error", message: error.message });
      done();
    });
  },

  _buildRegionLayers: function(data, geojson, config, queryResponse, regionDim, measures) {
    const layers = [];

    // 1. Pre-process Data
    const dataMap = {};
    data.forEach(row => {
      const rawName = row[regionDim.name].value;
      if(rawName) {
          const cleanName = this._normalizeName(rawName);
          const values = measures.map(m => parseFloat(row[m.name]?.value) || 0);
          dataMap[cleanName] = values;
          dataMap[rawName.toLowerCase()] = values; // Backup
      }
    });

    console.log('[MAP] Data Keys (sample):', Object.keys(dataMap).slice(0, 5));

    // 2. Feature Matcher
    let matchCount = 0;
    const measureIdx = 0;

    const getDataForFeature = (feature) => {
      const props = feature.properties;
      if (!props) return null;
      for (let key in props) {
          const propValue = props[key];
          if(!propValue) continue;
          const cleanProp = this._normalizeName(propValue);
          if (dataMap[cleanProp]) return dataMap[cleanProp];
      }
      return null;
    };

    // 3. Layer 1: Choropleth
    if (config.layer1_enabled && config.layer1_type === 'geojson') {
       const allValues = Object.values(dataMap).map(v => v[measureIdx] || 0);
       const minValue = Math.min(...allValues);
       const maxValue = Math.max(...allValues);

       layers.push(new deck.GeoJsonLayer({
        id: 'geojson',
        data: geojson,
        filled: true,
        stroked: true,
        pickable: true,
        opacity: config.layer1_opacity,
        getLineColor: [255, 255, 255, 100],
        getLineWidth: 1,
        getFillColor: f => {
          const values = getDataForFeature(f);
          if (!values) return [220, 220, 220, 50];

          matchCount++;
          const value = values[measureIdx] || 0;
          const ratio = maxValue > minValue ? (value - minValue) / (maxValue - minValue) : 0;
          return this._interpolateColorRgb(config.layer1_color_start, config.layer1_color_end, ratio);
        },
        updateTriggers: {
            getFillColor: [config.layer1_color_start, config.layer1_color_end]
        }
      }));
    }

    // 4. Centroids for Layers 2 & 3
    const centroids = [];
    geojson.features.forEach(feature => {
      const values = getDataForFeature(feature);
      if (values) {
          let centroid;
          if (feature.geometry) {
             if (feature.geometry.type === 'Polygon') {
                centroid = this._polygonCentroid(feature.geometry.coordinates[0]);
             } else if (feature.geometry.type === 'MultiPolygon') {
                centroid = this._polygonCentroid(feature.geometry.coordinates[0][0]);
             }
          }
          if (centroid) centroids.push({ position: centroid, values });
      }
    });

    // 2D vs 3D Logic
    const is2D = config.pitch === 0;

    // Layer 2: Columns
    if (config.layer2_enabled && centroids.length > 0) {
      const idx = measures.length > 1 ? 1 : 0;
      layers.push(new deck.ColumnLayer({
        id: 'columns',
        data: centroids,
        diskResolution: 12,
        radius: config.layer2_radius,
        // If 2D mode, disable extrusion so they look like flat circles
        extruded: !is2D,
        pickable: true,
        elevationScale: is2D ? 0 : config.layer2_height_scale,
        getPosition: d => d.position,
        getFillColor: this._hexToRgb(config.layer2_color),
        getLineColor: [255, 255, 255, 80],
        getElevation: d => d.values[idx] || 0,
        opacity: 0.9
      }));
    }

    // Layer 3: Points (Scatterplot) - RESTORED
    if (config.layer3_enabled && centroids.length > 0) {
      const idx = measures.length > 2 ? 2 : 0; // Use 3rd measure if available
      layers.push(new deck.ScatterplotLayer({
        id: 'points',
        data: centroids,
        getPosition: d => d.position,
        getRadius: config.layer3_radius,
        getFillColor: this._hexToRgb(config.layer3_color),
        opacity: 0.9,
        stroked: true,
        getLineColor: [255, 255, 255],
        pickable: true
      }));
    }

    if (matchCount === 0 && data.length > 0) {
        this.addError({ title: "No Matches", message: `Map loaded but 0 regions matched. Check console for keys.` });
    }

    return layers;
  },

  _getGeoJSONUrl: function(config) {
    if (config.layer1_map_layer === 'custom') return config.layer1_geojson_url;

    // FIXED URLS
    const URLS = {
        world: 'https://unpkg.com/world-atlas@2/countries-110m.json',
        us_states: 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json',
        us_counties: 'https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json',

        // France
        fr_dept: 'https://france-geojson.gregoiredavid.fr/repo/departements.geojson',
        fr_region: 'https://france-geojson.gregoiredavid.fr/repo/regions.geojson',

        // Americas
        canada: 'https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/canada.geojson',
        mexico: 'https://raw.githubusercontent.com/angelnmara/geojson/master/mexico/mexico.geojson',
        brazil: 'https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson',

        // Europe
        uk_regions: 'https://martinjc.github.io/UK-GeoJSON/json/eng/topo_eer.json',
        uk_subunits: 'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/united-kingdom/uk-subunits.json',
        germany: 'https://raw.githubusercontent.com/isellsoap/deutschlandGeoJSON/main/2_bundeslaender/3_mittel.geo.json',

        // SPAIN FIXED: Using click_that_hood for Autonomous Communities
        spain: 'https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/spain-communities.geojson',

        italy: 'https://raw.githubusercontent.com/openpolis/geojson-italy/master/geojson/limits_IT_regions.geojson',
        netherlands: 'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/netherlands/nl-provinces.json',
        switzerland: 'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/switzerland/switzerland-cantons.json',
        austria: 'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/austria/austria-states.json',

        // BELGIUM FIXED: Using click_that_hood for Provinces
        belgium: 'https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/belgium-provinces.geojson',
        ireland: 'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/ireland/ireland-counties.json'
    };

    const builtInMaps = {
      'world_countries': URLS.world,
      'us_states': URLS.us_states,
      'us_counties': URLS.us_counties,
      'canada_provinces': URLS.canada,
      'mexico_states': URLS.mexico,
      'brazil_states': URLS.brazil,
      'france_departments': URLS.fr_dept,
      'france_regions': URLS.fr_region,
      'uk_regions': URLS.uk_regions,
      'uk_subunits': URLS.uk_subunits,
      'germany_states': URLS.germany,
      'spain_communities': URLS.spain,
      'italy_regions': URLS.italy,
      'netherlands_provinces': URLS.netherlands,
      'switzerland_cantons': URLS.switzerland,
      'austria_states': URLS.austria,
      'belgium_provinces': URLS.belgium,

      // Combined
      'combined_europe_major': [URLS.fr_region, URLS.germany, URLS.uk_regions, URLS.spain, URLS.italy],
      'combined_dach': [URLS.germany, URLS.austria, URLS.switzerland],
      'combined_benelux': [URLS.belgium, URLS.netherlands]
    };

    return builtInMaps[config.layer1_map_layer] || config.layer1_geojson_url;
  },

  _loadGeoJSON: async function(urlOrList) {
    if (Array.isArray(urlOrList)) {
      const promises = urlOrList.map(url => this._loadGeoJSON(url));
      const results = await Promise.all(promises);
      const combinedFeatures = [];
      results.forEach(geo => {
        if (geo && geo.features) combinedFeatures.push(...geo.features);
      });
      return { type: "FeatureCollection", features: combinedFeatures };
    }

    const url = urlOrList;
    if (this._geojsonCache[url]) return this._geojsonCache[url];

    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`);

    const data = await response.json();
    let geojson = data;

    if (data.type === 'Topology') {
      if (typeof topojson === 'undefined') throw new Error('TopoJSON library not loaded');
      const keys = Object.keys(data.objects);
      geojson = topojson.feature(data, data.objects[keys[0]]);
    }

    this._geojsonCache[url] = geojson;
    return geojson;
  },

  _updatePointMode: function(data, config, queryResponse, done) {
      const dims = queryResponse.fields.dimension_like;
      const measures = queryResponse.fields.measure_like;
      const latF = dims.find(d => d.type === 'latitude' || d.name.toLowerCase().includes('lat'));
      const lngF = dims.find(d => d.type === 'longitude' || d.name.toLowerCase().includes('lon'));
      if (!latF || !lngF) { this.addError({ title: "Need Lat/Lng", message: "Add latitude/longitude" }); done(); return; }
      const points = data.map(row => ({
        position: [parseFloat(row[lngF.name].value), parseFloat(row[latF.name].value)],
        values: measures.map(m => parseFloat(row[m.name]?.value) || 0)
      })).filter(p => !isNaN(p.position[0]) && !isNaN(p.position[1]));
      const layers = this._buildPointLayers(points, config, measures);
      this._renderMap(layers, config, done);
  },

  _buildPointLayers: function(points, config, measures) {
      const layers = [];
      if (config.layer1_enabled && config.layer1_type !== 'geojson') {
        if (config.layer1_type === 'heatmap') {
            layers.push(new deck.HeatmapLayer({ id: 'heatmap', data: points, getPosition: d => d.position, getWeight: d => d.values[0] || 1, radiusPixels: 60 }));
        } else {
            layers.push(new deck.HexagonLayer({ id: 'hexagon', data: points, getPosition: d => d.position, getElevationWeight: d => d.values[0] || 1, elevationScale: 0, radius: 10000, colorRange: this._getColorRange(config.layer1_color_start, config.layer1_color_end), opacity: config.layer1_opacity, pickable: true }));
        }
      }
      // Add Layer 3 logic for Point Mode if needed, currently simplistic
      return layers;
  },

  _polygonCentroid: function(coordinates) {
    let x = 0, y = 0;
    if(!coordinates || coordinates.length === 0) return [0,0];
    coordinates.forEach(coord => { x += coord[0]; y += coord[1]; });
    return [x / coordinates.length, y / coordinates.length];
  },

  _renderMap: function(layers, config, done) {
    const is2D = config.pitch === 0;

    const viewState = {
        longitude: config.center_lng,
        latitude: config.center_lat,
        zoom: config.zoom,
        pitch: config.pitch,
        bearing: 0
    };

    // If pitch is 0, we disable dragRotate to keep it strictly 2D
    const controllerSettings = {
        dragRotate: !is2D,
        touchRotate: !is2D
    };

    if (!this._deck) {
      this._deck = new deck.DeckGL({
        container: this._container,
        mapStyle: config.map_style,
        mapboxApiAccessToken: config.mapbox_token,
        initialViewState: viewState,
        controller: controllerSettings,
        layers
      });
    } else {
      this._deck.setProps({
          layers,
          initialViewState: viewState,
          controller: controllerSettings,
          mapboxApiAccessToken: config.mapbox_token
      });
    }
    done();
  },

  _getColorRange: function(start, end) {
    const range = [];
    for (let i = 0; i < 6; i++) { range.push(this._interpolateColorRgb(start, end, i / 5)); }
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
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [128, 128, 128];
  },

  destroy: function() { if (this._deck) this._deck.finalize(); }
});
