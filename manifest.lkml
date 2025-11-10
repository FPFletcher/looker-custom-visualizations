project_name: "custom_viz_artefact_demo"

visualization: {
  id: "table_vis"
  label: "Test"
  file: "table-viz.js"
  # Define the visualization parameters
}


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
# 04. CUSTOM visuals
########################################################################################

visualization: {
  id: "single_value_picture_background"
  label: "Single Value (Picture)"
  file: "04_CUSTOM_visuals/single_value_picture.js"

  dependencies: [
  ]
  #"https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"
}
