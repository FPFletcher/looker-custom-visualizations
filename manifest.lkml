project_name: "custom_viz_artefact_demo"

visualization: {
  id: "table_vis"
  label: "Test"
  file: "table-viz.js"
  # Define the visualization parameters
}

visualization: {
  id: "my_new_vis"
  label: "My new vis - Guillaume"
  file: "my_new_vis.js"

  dependencies: [
    "https://d3js.org/d3.v6.min.js",
"https://www.gstatic.com/charts/loader.js",
"https://code.highcharts.com/highcharts.js",
"https://code.highcharts.com/highcharts-more.js",
"https://code.highcharts.com/modules/solid-gauge.js",
"https://code.highcharts.com/modules/sankey.js"
  ]

}

visualization: {
  id: "water_drop_viz"
  label: "Water Drop Visualization"
  file: "water_drop.js"

  dependencies: [
    "https://d3js.org/d3.v6.min.js",
    "https://www.gstatic.com/charts/loader.js",
    "https://code.highcharts.com/highcharts.js",
    "https://code.highcharts.com/highcharts-more.js",
    "https://code.highcharts.com/modules/solid-gauge.js",
    "https://code.highcharts.com/modules/sankey.js",
    "https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"
  ]

}

visualization: {
  id: "scorecard_sparkline_viz"
  label: "Scorecard with Sparkline"
  file: "scorecard_sparkline.js"

  # No external dependencies needed
  dependencies: []
}


# project_name: "looker_dashboard_sandbox"

# ## Use local_dependency: To enable referencing of another project
# ## on this instance with include: statements
# ## TEST

# ### LOCAL VARIABLES ###

# constant: project {
#   value: "marketingview-eo-prod"
#   export: override_required
# }
# constant: dataset {
#   value: "marketingview_bqd_04_dm_eo"
#   export: override_required
# }
# constant: scope_sub {
#   value: "regional"
#   export: override_required
# }
# constant: scope_country {
#   value: "'EO Regional'"
#   export: override_required
# }

# constant: looker_region {
#   value: "artefactfrance"
#   export: override_required
# }

# constant: region {
#   value: "EO"
#   export: override_required
# }

# ### CURRENCY VARIABLES ###

# constant: currency_crm {

#   value: "
#   {% if aaxhybris_crm.currency_selector._parameter_value == 'eur' %}
#   €
#   {% elsif aaxhybris_crm.currency_selector._parameter_value == 'usd' %}
#   $
#   {% else %}
#   {% if ac_crm.country._in_query or ac_crm.subsidiary._in_query %}
#   {{ ac_crm.currency._value }}
#   {% else %}
#   €
#   {% endif %}
#   {% endif %}"
#   export: override_optional
# }

# constant: currency_aaxhybris_pm {

#   value: "
#   {% if aaxhybris_for_pm.currency_selector._parameter_value == 'eur' %}
#   €
#   {% elsif aaxhybris_for_pm.currency_selector._parameter_value == 'usd' %}
#   $
#   {% else %}
#   {% if aaxhybris_for_pm.market._in_query or aaxhybris_for_pm.subsidiary._in_query %}
#   {{ aaxhybris_for_pm.currency._value }}
#   {% else %}
#   €
#   {% endif %}
#   {% endif %}"
#   export: override_optional
# }

# constant: currency_aaxestore_pm {

#   value: "
#   {% if aa_estore_titan.currency_selector._parameter_value == 'eur' %}
#   €
#   {% elsif aa_estore_titan.currency_selector._parameter_value == 'usd' %}
#   $
#   {% else %}
#   {% if aa_estore_titan.market._in_query or aa_estore_titan.subsidiary._in_query %}
#   {{ aa_estore_titan.currency._value }}
#   {% else %}
#   €
#   {% endif %}
#   {% endif %}"
#   export: override_optional
# }

# constant: currency_exe {
#   value: "
#   {% if executive_overview_prod_new.currency_selector._parameter_value == 'eur' %}
#   €
#   {% elsif executive_overview_prod_new.currency_selector._parameter_value == 'usd' %}
#   $
#   {% else %}
#   €
#   {% endif %}"
#   export: override_optional
# }

# constant: currency_affiliate_transac {

#   value: "
#   {% if affiliate.currency_selector._parameter_value == 'eur' %}
#   €
#   {% elsif affiliate.currency_selector._parameter_value == 'usd' %}
#   $
#   {% else %}
#   {% if affiliate.market._in_query or affiliate.subsidiary._in_query %}
#   {{ affiliate.currency._value }}
#   {% else %}
#   €
#   {% endif %}
#   {% endif %}"
#   export: override_optional
# }

# constant: currency_affiliate_transac_w_awareness {

#   value: "
#   {% if affiliate_with_awareness.currency_selector._parameter_value == 'eur' %}
#   €
#   {% elsif affiliate_with_awareness.currency_selector._parameter_value == 'usd' %}
#   $
#   {% else %}
#   {% if affiliate_with_awareness.market._in_query or affiliate.subsidiary._in_query %}
#   {{ affiliate_with_awareness.currency._value }}
#   {% else %}
#   €
#   {% endif %}
#   {% endif %}"
#   export: override_optional
# }

# ### this constant used to have

# #     {% else %}
# #      {% if executive_overview_prod_new.country._in_query or executive_overview_prod_new.subsidiary._in_query %}
# #        {{ executive_overview_prod_new.currency._value }} this is case 3
# #      {% else %}
# #        €
# #      {% endif %}

# constant: currency_aaxestore_qa {
#   value: " {% if aa_estore_full_join_qa.currency_selector_aaxhybris._parameter_value == 'eur' %}
#   €
#   {% elsif aa_estore_full_join_qa.currency_selector_aaxhybris._parameter_value == 'usd' %}
#   $
#   {% else %}
#   {% if aa_estore_full_join_qa.subsidiary._in_query %}
#   {{ aa_estore_full_join_qa.currency._value }}
#   {% else %}
#   €
#   {% endif %}
#   {% endif %}"
#   export: override_optional
# }

# constant: currency_default {
#   value: "eur"
#   export: override_optional
# }
