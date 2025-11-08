project_name: "custom_viz_artefact_demo"

visualization: {
  id: "table_vis"
  label: "Test"
  file: "table-viz.js"
  # Define the visualization parameters
}

########################################################################################
# CUSTOM visuals
########################################################################################

visualization: {
  id: "water_drop_viz"
  label: "Water Drop"
  file: "CUSTOM_visuals/water_drop.js"

  dependencies: [
  ]
 #"https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"
}

########################################################################################
# STUDIO visuals
########################################################################################

visualization: {
  id: "scorecard_sparkline_viz"
  label: "Scorecard"
  file: "STUDIO_visuals/scorecard_sparkline.js"

  # No external dependencies needed
  dependencies: []
}

visualization: {
  id: "treemap_studio_viz"
  label: "Treemap (Studio)"
  file: "STUDIO_visuals/treemap.js"
  dependencies: []
}

visualization: {
  id: "bar_chart_conditional_formatting_viz"
  label: "Bar Chart (Conditional formatting)"
  file: "STUDIO_visuals/conditional_bar_chart.js"
  dependencies: []
}
