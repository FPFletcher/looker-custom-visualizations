project_name: "custom_viz_artefact_demo"


########################################################################################
# 01. STUDIO visuals
########################################################################################

visualization: {
  id: "scorecard_sparkline_viz"
  label: "Scorecard"
  file: "01_STUDIO_visuals/scorecard_sparkline.js"

  # No external dependencies needed
  dependencies: []
}

visualization: {
  id: "treemap_studio_viz"
  label: "Treemap (Studio)"
  file: "01_STUDIO_visuals/treemap.js"
  dependencies: []
}

visualization: {
  id: "bar_chart_conditional_formatting_viz"
  label: "Bar Chart (Conditional formatting)"
  file: "01_STUDIO_visuals/bar_chart_conditional.js"
  dependencies: [
    "https://code.highcharts.com/highcharts.js"
  ]
}


########################################################################################
# 04. OTHER visuals
########################################################################################

visualization: {
  id: "single_value_picture_background"
  label: "Single Value (Picture)"
  file: "04_OTHER_visuals/single_value_picture.js"

  dependencies: [
  ]
}

visualization: {
  id: "combo_map_3d"
  label: "Combo Map 3D"
  file: "04_OTHER_visuals/map_combo_3d_mapbox.js"

  dependencies: [
    "https://unpkg.com/deck.gl@latest/dist.min.js",
    "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js",
    "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css",
    "https://unpkg.com/topojson-client@3"
  ]
}

visualization: {
  id: "combo_map_3d_googlemap"
  label: "Combo Map 3D - Google"
  file: "04_OTHER_visuals/map_combo_3d_googlemap.js"

# No dependencies - uses Google Maps already loaded by Looker!
  dependencies: []
}

#"https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css"

visualization: {
  id: "table_vis"
  label: "Test"
  file: "table-viz.js"
  # Define the visualization parameters
}


########################################################################################
# 10. APPLICATIONS Dashboard or AI focus
########################################################################################

application: dashboard_tabs {
  label: "Dashboard Tabs"
  url: "https://cdn.lkr.dev/apps/dashboard-tabs/latest/bundle.js"
  entitlements: {
    core_api_methods: [
      "me",
      "dashboard",
      "search_dashboards",
      "folder_dashboards",
      "board",
      "search_boards",
      "folder",
      "search_folders",
      "create_board",
      "create_board_section",
      "create_board_item",
      "create_content_favorite"
    ]
    navigation: yes
    use_embeds: yes
    use_iframes: yes
    new_window: yes
    use_form_submit: yes
  }
}
