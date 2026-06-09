# 🌾 Northern Colorado (NoCo) Foodshed Project Dashboard

### Interactive Data Visualization for Local Food System Assessment & Community Voice
[![Status](https://img.shields.io/badge/Status-Complete-brightgreen.svg?style=flat-square)](#)
[![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20JavaScript%20(ES6)-darkgreen.svg?style=flat-square)](#)
[![Visualization](https://img.shields.io/badge/Library-Chart.js%20v4-blue.svg?style=flat-square)](#)
[![Deployment](https://img.shields.io/badge/Deployed-GitHub%20Pages-blueviolet.svg?style=flat-square)](#)

---

## 📊 Project Overview

The **Northern Colorado Foodshed Project Dashboard** is a responsive, interactive data visualization platform built to present key findings, survey data, and action items from the **Poudre Food Partnership (PFP)**.

Spanning over two years of assessment and coalition work funded by a **USDA Regional Food System Partnership (RFSP) Planning Grant**, the dashboard translates a 156-page report into digestible, engaging charts, stats, and roadmap goals to build a more resilient, equitable, and vibrant local food system in Larimer County.

### 💡 The Core Challenge
- Locally grown food accounts for **just 1% of what Larimer County residents buy**, down from previous periods.
- The PPF has set a **10% goal by 2027**, which would redirect over **$15 million** into the local agricultural economy.
- This dashboard maps out the structural barriers (land/water access, distribution, labor conditions) and resident perspectives to align action.

---

## 🛠️ Tech Stack & Libraries

- **Frontend Structure**: HTML5 (semantic layout)
- **Styling & UI Systems**: Vanilla CSS3 (custom variables/tokens, flexbox/grid layout, premium dark-forest accents)
- **Visualization**: [Chart.js (v4.4.4)](https://www.chartjs.org/) + [Chartjs-Plugin-Datalabels](https://chartjs-plugin-datalabels.netlify.app/)
- **Data Engine**: Modular ES6 JavaScript (`data.js` for assessment metrics, `charts.js` for rendering logic)

---

## ⚡ Key Features

1. **Local Food Snapshot (KPI Panel)**: Highlighting Direct-to-Consumer sales declines, peer county benchmarks (Larimer at 1% vs. Missoula at 15%), and local food security metrics.
2. **Community Voice (Resident Surveys, n=313)**: Interactive multi-dataset charts showing how income correlates to food access, and how resident values (working conditions, sustainability) prioritize over simple "buy local" labels.
3. **Producer Landscape (Farmer Surveys, n=48)**: Visualizing demographic data and mapping top operational barriers, including land/water access and local processing capacity.
4. **Coalition Engagement Tracker**: Showing the reach of community listening sessions and coalition working groups.
5. **Interactive Action Plan**: Details on the priority areas (Access, Production, Infrastructure, Advocacy) with progress metrics.
6. **Data Portability**: Support for exporting dashboard metrics directly to PDF and structured Excel spreadsheets.

---

## 📁 Project Structure

```
noco-foodshed-dashboard/
│
├── index.html            # Main dashboard structural markup & SEO metadata
├── styles.css            # Custom CSS design system (earthy palettes, grid systems)
├── data.js               # Structured JSON data extracted from RFSP Report
└── charts.js             # Chart.js configurations, triggers, and export logic
```

---

## 🚀 Getting Started

To run the dashboard locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/aditi-reddy/noco-foodshed-dashboard.git
   cd noco-foodshed-dashboard
   ```

2. **Open index.html**:
   Simply open the `index.html` file in your browser of choice, or run a local development server:
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   ```
   Then navigate to `http://localhost:8000`.

---

## 📂 Data Attribution
All survey results and statistics visualized in this dashboard are compiled from the Poudre Food Partnership's USDA Regional Food System Partnership (RFSP) Assessment Final Report.
