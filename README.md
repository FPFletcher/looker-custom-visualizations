![Project_Picasso_banner](./99_ASSETS/Project_Picasso_Edited_banner.png)

# Introduction

**The objective of this repository is to provide the combined Javascript code of custom visualizations** to improve Looker's 40-visual native portfolio/ marketplace.

For context, the end goal is to enable any Looker customers to benefit from most of **the visual capabilities of Studio/ PowerBI/ Tableau or any other BI providers directly within Looker** by leveraging its extensive API endpoints (more info [here](https://github.com/looker-open-source/custom_visualizations_v2/blob/master/docs/api_reference.md)) with a list of production ready visualizations which can be imported within a few clicks!! 💎  

In terms of process used, a detailed guide can be found in our community platform [here](https://discuss.google.dev/t/create-a-custom-visualization-without-development-skills-using-generative-ai/163652).  

**📢 You have a visualization request?** [Fill this form](https://forms.gle/5XfUnQsxpyVnBbBo8) to let the Google team know if you have a **true need for a visual you can't find** in this repository or in our Looker native portfolio/marketplace.

---

# Set Up
5min required to import 20+ production ready custom visuals 🎁    

**One-line step by step:** Fork this repo → Connect to Looker via Git → Disable some visuals as needed on `manifest.lkml` → Deploy  

**Detailed step by step:**  
1. **Fork or Clone the Repository**
   - Fork [this repository](https://github.com/FPFletcher/looker-custom-visualizations-picasso-project) to your GitHub account, OR clone it directly:
```bash
     git clone https://github.com/FPFletcher/looker-custom-visualizations-picasso-project.git
```

2. **Configure Git in Looker**
   - Click path in Looker: **Develop** → **Projects** → **New Model** → create a **BLANK Project** → **Configure Git** → Import this Git repo using one of the methods below

   > <details>
   > <summary>🔐 Using SSH <i>(Recommended)</i></summary>
   > <br>
   > 
   > - Generate SSH key in Looker: **Admin** → **Git** → **Configure Git** → Copy public key
   > - Add to GitHub: Your repo → **Settings** → **Deploy keys** → **Add deploy key** → Paste key
   > - Import in Looker using SSH URL:
   > 
   > ```
   > git@github.com:YOUR-USERNAME/looker-custom-visualizations-picasso-project.git
   > ```
   > 
   > </details>
   
   > <details>
   > <summary>🔗 Using HTTPS</summary>
   > <br>
   > 
   > - Use HTTPS URL when importing:
   > 
   > ```
   > https://github.com/YOUR-USERNAME/looker-custom-visualizations-picasso-project.git
   > ```
   > 
   > - For private repos, configure a GitHub Personal Access Token.
   > 
   > </details>

3. **Configure `manifest.lkml`**
   - Edit the manifest to **disable visualizations as needed** by commenting them out using `#` (shortcut: `Ctrl + /`)

4. **Network Requirements** *(Optional)*
   
   > <details>
   > <summary>⚠️ Only a few visualizations have external dependencies which may require <b>external libraries to be whitelisted</b> <i>(private IP, self-hosted, and restricted environments)</i></summary>
   > <br>
   > 
   > | Visualization | Domain to Whitelist |
   > |--------------|---------------------|
   > | Bar Chart (Conditional) | `code.highcharts.com` |
   > 
   > - If needed, contact your network team to whitelist these domains before deploying.
   > 
   > </details>

5. **Deploy and Use**
   - Commit changes in Looker's IDE and deploy to production
   - Access visualizations via the visualization picker (chart icon) in any Explore or Dashboard
   
---

# 01. STUDIO Visuals

## Scorecard with Sparkline
![STUDIO Scorecard visualization](./99_ASSETS/STUDIO_scorecard.gif)

**📊 What it does**  
Displays a primary metric with a secondary comparison value, percentage variance, and an inline sparkline trend chart. Perfect for executive dashboards and KPI monitoring.

<details>
<summary><b>✨ Unique value</b></summary>
<br>
<ul>
<li><b>Accurate sparkline rendering</b> with proper time-series visualization</li>
<li><b>Customizable metric positioning</b> for flexible dashboard layouts</li>
<li><b>Dual-measure comparison</b> with automatic percentage calculation</li>
<li><b>Visual variance indicators</b> with color-coded positive/negative changes</li>
<li><b>Compact design</b> that fits more KPIs per dashboard tile</li>
<li><b>No external dependencies</b> - works on all Looker deployments</li>
</ul>
</details>

---

## Treemap
![STUDIO Treemap visualization](./99_ASSETS/STUDIO_treemap.gif)

**📊 What it does**  
Hierarchical visualization that displays nested data as proportionally-sized rectangles. Supports multi-level drill-down navigation through dimension hierarchies with automatic grouping of small values into an "Others" category.

<details>
<summary><b>✨ Unique value</b></summary>
<br>
<ul>
<li><b>Native LookML drill fields integration</b> - seamlessly opens Looker's drill menu at the last hierarchy level (works independently from drill-down navigation)</li>
<li><b>Intelligent "Others" grouping</b> with configurable threshold to reduce clutter</li>
<li><b>Multi-level drill-down</b> through dimension hierarchies with breadcrumb navigation</li>
<li><b>Gap-free layout algorithm</b> ensures no wasted space in the visualization</li>
<li><b>Flexible color schemes</b> with gradient or categorical coloring options</li>
<li><b>Smart label positioning</b> with automatic text wrapping and truncation</li>
<li><b>No external dependencies</b> - works on all Looker deployments</li>
</ul>
</details>

---

## Bar Chart (Conditional Formatting)
![STUDIO Bar Chart visualization](./99_ASSETS/STUDIO_bar_chart.gif)

**📊 What it does**  
Enhanced column/bar chart with advanced conditional formatting capabilities. Supports multiple chart types (column, bar, area, line) with comprehensive formatting rules and reference/trend lines.

<details>
<summary><b>✨ Unique value</b></summary>
<br>
<ul>
<li><b>3 levels of conditional formatting rules</b> (Rule 1, 2, 3) with priority-based application</li>
<li><b>7 rule types available:</b> Greater Than, Less Than, Equal To, Between, Top N, Bottom N, and Color Gradient</li>
<li><b>Stacked measures support</b> for conditional formatting and trend calculations</li>
<li><b>Native LookML drill fields</b> on all data points</li>
<li><b>Dual reference systems:</b> Reference lines (custom/average/median/min/max) and trend lines (linear/moving average)</li>
<li><b>Customizable trend line titles</b> with smart positioning that adapts to chart orientation</li>
<li><b>Advanced stacking modes:</b> Grouped, Stacked, and Stacked Percentage</li>
<li><b>Total labels for stacked charts</b> with customizable styling</li>
<li><b>Professional color palettes</b> including Google, Looker Classic, Viridis, and custom options</li>
<li><b>⚠️ External dependency:</b> Requires <code>code.highcharts.com</code> domain access</li>
</ul>
</details>

---

# 02. POWERBI Visuals

*(Coming soon)*

---

# 03. TABLEAU Visuals

*(Coming soon)*

---

# 04. OTHER Visuals

## Single Value with Picture
![Single Value with Picture visualization](./99_ASSETS/STUDIO_single_value_picture.gif)

**📊 What it does**  
Displays two key metrics overlaid on customizable water drop images with a percentage comparison indicator. Ideal for visual storytelling in executive dashboards where brand imagery matters.

<details>
<summary><b>✨ Unique value</b></summary>
<br>
<ul>
<li><b>Native LookML drill fields</b> on both primary and secondary values</li>
<li><b>Customizable background and drop images</b> via URL for complete brand alignment</li>
<li><b>Dual-metric display</b> with automatic or manual percentage calculation</li>
<li><b>Flexible positioning controls</b> for both drops with independent sizing</li>
<li><b>Image opacity controls</b> for layered visual effects</li>
<li><b>Non-clickable images</b> to prevent accidental navigation - only metrics are interactive</li>
<li><b>Responsive design</b> that scales beautifully across dashboard sizes</li>
<li><b>Multiple calculation modes:</b> Secondary/Primary ratio or use a third measure for percentages</li>
<li><b>No external dependencies</b> - works on all Looker deployments</li>
</ul>
</details>

---

# Contributing

We welcome contributions! If you've built a custom visualization that could benefit the Looker community, please submit a pull request with:
- The `.js` file in the appropriate category folder
- A GIF demonstrating the visualization (add to `99_ASSETS/`)
- Documentation of unique features and configuration options
- Update to this README with your visualization details

**Have a visualization request?** [Fill this form](https://forms.gle/5XfUnQsxpyVnBbBo8) to let the Google team know if you have a **true need for a visual you can't find** in this repository or in our Looker native portfolio/marketplace.

---

# Support

**For questions, issues, or feature requests:**
- 🐛 [Open an issue](https://github.com/FPFletcher/looker-custom-visualizations-picasso-project/issues) on this GitHub repository
- 💬 Visit the [Looker Community](https://community.looker.com/)
- 📚 Check the [Custom Visualizations API documentation](https://github.com/looker-open-source/custom_visualizations_v2/blob/master/docs/api_reference.md)
- 📝 Review the [step-by-step guide](https://discuss.google.dev/t/create-a-custom-visualization-without-development-skills-using-generative-ai/163652) for creating custom visualizations

**Finding this project useful?** [Fill this form](https://forms.gle/RNjQvsHpTsp9pUn38) to let the Google team know **this project is particularly useful to you and your team** so we can gather more internal resources to work on it.

---

**Happy visualizing! 🎨**
