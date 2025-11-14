![Project_Picasso_banner](./99_ASSETS/Project_Picasso_Edited_banner.png)

# Introduction

**The objective of this repository is to provide the combined Javascript code of custom visualizations** to improve Looker's 40-visual portfolio available natively or within its marketplace.

For context, the end goal is to enable any Looker customers to benefit from most of **the visual capabilities of Studio/ PowerBI/ Tableau or any other BI providers directly within Looker** by leveraging its extensive API endpoints (more info [here](https://github.com/looker-open-source/custom_visualizations_v2/blob/master/docs/api_reference.md)) with a list of production ready visualizations which can be imported within a few clicks!! 💎  

In terms of process used, a detailed guide can be found in our community platform [here](https://discuss.google.dev/t/create-a-custom-visualization-without-development-skills-using-generative-ai/163652).

**To help us do better,**  
- _[Fill this form](https://docs.google.com/forms/d/1JL2mMq-hGUeVc_rmASJu6MCviJQ-F8ToU_x84jI29Xc/edit?resourcekey=0-MNibdyKXv4NcHX3w3N6e4A)_ to let the Google team know if you have a **true need for a visual you can't find** in this repository or in our native offering.  
- _[Fill this form](https://docs.google.com/forms/d/1JL2mMq-hGUeVc_rmASJu6MCviJQ-F8ToU_x84jI29Xc/edit?resourcekey=0-MNibdyKXv4NcHX3w3N6e4A)_ to confirm that this project is useful to you and your team so we can gather more internal resources to work on it.

---

# Set Up

## Step 1: Fork or Clone the Repository

### Option A: Fork to Your GitHub Account
1. Navigate to [this repository](https://github.com/FPFletcher/looker-custom-visualizations-picasso-project)
2. Click the **"Fork"** button in the top-right corner
3. This creates a copy of the repository in your GitHub account that you can modify

### Option B: Clone Directly
```bash
git clone https://github.com/FPFletcher/looker-custom-visualizations-picasso-project.git
cd looker-custom-visualizations-picasso-project
```

---

## Step 2: Connect Your Repository to Looker

### Using SSH (Recommended)
1. Generate an SSH key pair in Looker (if you haven't already):
   - Go to **Admin** → **Git** → **Configure Git**
   - Copy the public SSH key provided by Looker
2. Add the SSH key to your GitHub repository:
   - Go to your repository → **Settings** → **Deploy keys**
   - Click **Add deploy key**
   - Paste the public key from Looker
   - Check **"Allow write access"** if you want to commit from Looker
3. In Looker, use the SSH URL when importing:
```
   git@github.com:YOUR-USERNAME/looker-custom-visualizations-picasso-project.git
```
### Using HTTPS
1. In Looker, navigate to **Develop** → **Manage LookML Projects**
2. Click **New LookML Project**
3. Select **"Import from Git Repository"**
4. Enter your repository URL:
```
   https://github.com/YOUR-USERNAME/looker-custom-visualizations-picasso-project.git
```
5. Configure authentication:
   - For public repos: No authentication needed
   - For private repos: Use a GitHub Personal Access Token

---

## Step 3: Configure the Manifest File

Open `manifest.lkml` in your Looker project and configure which visualizations you want to enable.

**Example manifest configuration:**
```lkml
project_name: "custom_viz_picasso"

# ========================================
# STUDIO VISUALS
# ========================================

visualization: {
  id: "treemap_viz"
  label: "Treemap (Studio)"
  file: "STUDIO_visuals/treemap.js"
  # No external dependencies - works on all Looker deployments
}

# ========================================
# DISABLE VISUALS BY COMMENTING OUT
# ========================================

# visualization: {
#   id: "example_disabled_viz"
#   label: "Disabled Visualization"
#   file: "EXAMPLE_visuals/example.js"
# }
```

**To disable a visualization:** Comment out its entire block using `#` at the start of each line.  
CTRL + / should be the keyboard shortcut to comment out a block of code.

---

## Step 4: Network Configuration (If Using External Dependencies)

**Most visualizations in this repository have NO external dependencies** and will work on any Looker deployment including:
- ✅ Private IP deployments
- ✅ Self-hosted instances
- ✅ Restricted network environments

**However, some visualizations require external libraries:**

| Visualization | External Dependency | Required Domain |
|--------------|---------------------|-----------------|
| Bar Chart (Conditional) | Highcharts | `code.highcharts.com` |
| - | - | - |

**If your Looker instance has network restrictions:**
1. Contact your network/security team
2. Request whitelisting for the required domains
3. Test connectivity from your Looker instance before deploying

---

## Step 5: Deploy and Use

1. **Commit your manifest changes** in Looker's IDE
2. **Deploy to production** when ready
3. **Access visualizations** in any Explore or Dashboard by:
   - Opening the visualization picker (chart icon)
   - Scrolling to find your custom visualizations
   - Selecting the desired visualization

---

# 01. STUDIO Visuals

## Scorecard with Sparkline
![STUDIO Scorecard visualization](./99_ASSETS/STUDIO_scorecard.gif)

<details>
<summary><b>📊 What it does</b></summary>
<br>
Displays a primary metric with a secondary comparison value, percentage variance, and an inline sparkline trend chart. Perfect for executive dashboards and KPI monitoring.
</details>

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

<details>
<summary><b>📊 What it does</b></summary>
<br>
Hierarchical visualization that displays nested data as proportionally-sized rectangles. Supports multi-level drill-down navigation through dimension hierarchies with automatic grouping of small values into an "Others" category.
</details>

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

<details>
<summary><b>📊 What it does</b></summary>
<br>
Enhanced column/bar chart with advanced conditional formatting capabilities. Supports multiple chart types (column, bar, area, line) with comprehensive formatting rules and reference/trend lines.
</details>

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

<details>
<summary><b>📊 What it does</b></summary>
<br>
Displays two key metrics overlaid on customizable water drop images with a percentage comparison indicator. Ideal for visual storytelling in executive dashboards where brand imagery matters.
</details>

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

---

# Support

For questions, issues, or feature requests:
- 🐛 Open an issue on this GitHub repository
- 💬 Visit the [Looker Community](https://community.looker.com/)
- 📚 Check the [Custom Visualizations API documentation](https://github.com/looker-open-source/custom_visualizations_v2/blob/master/docs/api_reference.md)
- 📝 Review the [step-by-step guide](https://discuss.google.dev/t/create-a-custom-visualization-without-development-skills-using-generative-ai/163652) for creating custom visualizations

---

**Happy visualizing! 🎨**
