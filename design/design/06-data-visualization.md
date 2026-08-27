# Data Visualization — Charts, Tables, Dashboards, and Infographics

Data visualization is about making invisible patterns visible. The goal is never to show data — it is to communicate a specific insight. Every design decision (chart type, color, label, axis scale) either supports or obscures that insight.

---

## The Fundamental Question: What Are You Saying?

Before choosing a chart type, answer: **"What is the one thing I want the audience to understand from this data?"**

- "Revenue is growing" → Line chart with upward trend highlighted
- "Division A outperforms Division B" → Bar chart with contrast color on the winner
- "70% of users drop off at step 3" → Funnel chart with step 3 highlighted in red
- "These three metrics are all improving" → Three big numbers (no chart at all)

If you cannot answer this question, you are not ready to visualize the data. Go back to the analysis.

---

## Chart Type Selection Guide

### Comparison across categories
| Chart | When to Use | Max Categories |
|---|---|---|
| **Column chart** (vertical bars) | ≤6 categories with short names | 6 |
| **Bar chart** (horizontal bars) | ≥5 categories with long names | 12 |
| **Lollipop chart** | Same as bar, cleaner look | 10 |
| **Grouped bar** | Comparing same categories across 2–3 groups | 3 groups |
| **Radar/Spider** | Comparing multiple attributes of 2–3 entities | 5–8 attributes |

**Never:** Pie chart for comparisons — humans are very bad at comparing angles.

### Change over time
| Chart | When to Use |
|---|---|
| **Line chart** | Continuous time series, 2+ series |
| **Area chart** | 1–2 series where volume is the message |
| **Step chart** | Discrete value changes (pricing, policy) |
| **Candlestick** | Financial OHLC data only |
| **Slope chart** | Comparing just two time points across categories |

**Rule:** X-axis must always be the time dimension. Never swap axes for time charts.

### Proportions and parts of a whole
| Chart | When to Use | Limit |
|---|---|---|
| **Donut chart** | 2–4 segments, total = 100% | 4 segments |
| **Pie chart** | 2–3 segments only | 3 segments |
| **Stacked bar** | Parts within categories over time | 4–5 stacks |
| **Treemap** | Hierarchical proportions | Works well at scale |
| **Waffle chart** | Showing a percentage out of 100 | Single metric |

**Critical:** Pie and donut charts have only 2–4 segments maximum. More than that, nobody can read them.

### Relationships and distributions
| Chart | When to Use |
|---|---|
| **Scatter plot** | Correlation between 2 continuous variables |
| **Bubble chart** | 3 variables (X, Y, bubble size) |
| **Histogram** | Distribution of a single variable |
| **Box plot** | Distribution with median, quartiles, outliers |
| **Heatmap** | Correlation matrix or time-based frequency |

### Process and flow
| Chart | When to Use |
|---|---|
| **Funnel chart** | Conversion funnels, sales pipeline stages |
| **Waterfall chart** | Cumulative changes (P&L, bridge analysis) |
| **Sankey diagram** | Flow/volume between nodes |
| **Gantt chart** | Project timelines and dependencies |

---

## Chart Design — The Principles

### Axes
- **Always start Y-axis at zero** for bar and column charts — truncating the axis exaggerates differences and misleads
- Exception: Line charts and scatter plots can start from a non-zero baseline when the range of change is the story (e.g., stock prices)
- Maximum **5–7 tick marks** on an axis — more is noise
- **Label units clearly:** "Revenue ($M)", "Conversion Rate (%)", "Sessions (thousands)"
- Remove the axis entirely when you have **data labels** on every bar — they provide the same information

### Data labels
- **Use data labels** when exact values matter, or when the chart will be printed
- Format: Bold for the highlighted/key value; Regular for all others
- Position: Outside-end for bars; Inside-end for stacked; Center for donut segments
- Avoid decimal places unless precision is genuinely needed (87% not 86.73%)
- For financial data: format consistently ($1.2M not $1,234,567)

### Legend placement
- **Ideal:** Eliminate the legend entirely — label series directly on the chart
- If legend is required: Place at top or bottom of chart, not on the right (wastes horizontal space)
- Maximum **5 series** in a single chart — if you have more, rethink the chart type
- Never use abbreviations in the legend that appear nowhere else

### Color in charts
| Scenario | Color Strategy |
|---|---|
| 1 series | Brand primary color |
| 2 series | Primary + Secondary |
| 3 series | Primary + Secondary + Neutral |
| Highlighting one bar | That bar = brand accent; all others = light gray |
| Positive/Negative | Green / Red (consistent with cultural expectations) |
| Sequential scale | Light to dark of one hue (low to high) |
| Diverging scale | Two complementary hues meeting at zero/neutral |

**Never:** Rainbow palette for related data (e.g., months of the year — do not use 12 different colors)

### Gridlines
- Only **horizontal gridlines** — vertical gridlines are almost never necessary
- Color: #E5E7EB (light gray), 0.5pt weight
- No border/frame around the chart plot area
- Gridlines should whisper, not shout — they provide reference, not structure

### Chart-to-slide ratio
- A chart should occupy **60–80% of the slide area**
- The title (insight) should be above, occupying about 15%
- White space and footnotes occupy the rest
- Never shrink a chart to make room for bullets — split into two slides

---

## Tables — Design for Reading

### Table anatomy
| Part | Design Treatment |
|---|---|
| **Header row** | Brand color background + light text + Bold |
| **Alternating rows (zebra)** | White + very light gray (#F9FAFB or #F3F4F6) |
| **Total / Summary row** | Slightly darker than zebra, Bold text |
| **Vertical borders** | Remove entirely (cleaner) |
| **Horizontal borders** | 0.5pt, light gray only |

### Alignment rules (non-negotiable)
- Text columns: **Left-aligned**
- Number columns: **Right-aligned** (decimal points line up)
- Header row: matches its column alignment (numbers → right; text → left)
- Vertical: **Middle** for all cells
- Never center-align numeric data

### Column width
- Size columns to content, not equal widths
- Narrow columns for IDs, dates, short values; Wide columns for descriptions
- Never let text be cut off inside a cell — either widen or reduce font size
- Use consistent padding: 8–12px horizontal, 6–10px vertical

### When to use tables vs. charts
| Use a Table When | Use a Chart When |
|---|---|
| Exact values matter | Patterns or trends matter |
| Multiple attributes per row | Single dimension comparison |
| Reader needs to look up specific data | Reader needs to grasp the big picture |
| ≤ 20 rows is readable | Large datasets need visual compression |

---

## Infographics — Rules for Density and Clarity

### Information density rule
- Maximum **5–7 key facts** per infographic
- Each fact: 1 visual element + 1 number/statistic + 1–2 lines of explanation
- If you have 15 facts, you have a report — not an infographic

### Infographic structure types
| Type | Description | Use Case |
|---|---|---|
| **Statistical** | Big numbers + context | Annual report highlights |
| **Process/Timeline** | Steps in sequence | How a service works |
| **Comparison** | Two options side by side | Product comparison |
| **Geographic** | Data on a map | Regional performance |
| **Hierarchical** | Org chart style | Team structure, taxonomy |
| **Narrative** | Story with data at key moments | Case study |

### Process and flow diagrams
- Maximum **6–7 steps** visible on one slide
- Direction: left → right (or top → bottom for vertical layouts)
- Arrows: thin (1–2pt), functional not decorative
- Each step: same box size (unless size itself carries meaning)
- Number each step clearly — do not rely on arrow direction alone

---

## Big Numbers — Formatting Key Metrics

When a single number is the entire message, format it as a hero:

```
Correct hierarchy:
    +127%              ← Number: 48–72pt, Bold, brand color
  Revenue Growth       ← Label: 14–16pt, Regular, neutral gray
  Q1 2026 vs Q1 2025   ← Context: 12pt, Light, lighter gray
```

### Formatting rules
| Element | Size | Weight | Color |
|---|---|---|---|
| The number | 48–72pt | Bold | Brand primary or accent |
| Unit (%, $, x) | 24–36pt | Regular | Secondary color or lighter brand shade |
| Label / description | 14–16pt | Regular | Neutral gray |
| Context / time period | 12pt | Light | Light gray |

- Stack vertically: number → unit → label → context
- Do not place label to the left of the number (forces eye to scan left-right)
- Use +/- prefix for change metrics; green/red for positive/negative
- Round aggressively: $1.2M not $1,237,482

---

## Dashboard Design

Dashboards are always-on data visualization. Unlike one-time reports, users look at dashboards repeatedly — design for scanning, not reading.

### Dashboard layout principles
1. **Most important metric: top-left** (F-pattern reading)
2. **Group related metrics** together with subtle separators
3. **Consistent chart heights** in a row — visual rhythm
4. **One insight per chart** — no multi-purpose charts on dashboards
5. **Empty states:** Design what the chart looks like with no data

### Dashboard hierarchy
| Level | Content |
|---|---|
| **Level 1 — KPIs** | 3–5 big numbers at the top (revenue, users, conversion) |
| **Level 2 — Trends** | Time series charts below KPIs (is it getting better?) |
| **Level 3 — Breakdown** | Detailed tables or category charts at the bottom |

### Color in dashboards
- All charts on the same dashboard should share the same color palette
- Use the same color for the same metric across all charts
- Reserve red for negative/alert states; green for positive/success
- Use neutral grays for non-essential data series

See [[08-saas-product-design]] for full dashboard design patterns.

---

## Accessibility in Data Visualization

- Never use color as the **only** differentiator — add patterns, labels, or shapes
- Test all charts in grayscale — if they lose meaning, fix the design
- For color blindness (8% of men): avoid red/green combinations without secondary encoding
- Add alt text to every chart in PDFs and web (describe the insight, not the elements)
- Provide the underlying data as a table alongside complex charts

See [[12-accessibility-design]] for full accessibility guidelines.

---

## Checklist — Data Visualization Quality Control

- [ ] Chart type matches the data relationship being shown
- [ ] Title states the insight, not just the data ("Revenue grew 23%" not "Revenue Chart")
- [ ] Y-axis starts at zero (for bar/column charts)
- [ ] Units are labeled on axes or in the title
- [ ] Maximum 5 series or segments per chart
- [ ] Legend eliminated or placed at top/bottom (not right)
- [ ] Colors not used as the only differentiator
- [ ] Data labels present for printed or high-precision contexts
- [ ] Gridlines are light gray and horizontal only
- [ ] No chart border or background box
- [ ] Tables: text left-aligned, numbers right-aligned, zebra rows
- [ ] Big numbers: correct hierarchy (number > unit > label > context)

---

## Do's and Don'ts

| Do | Don't |
|---|---|
| State the insight in the chart title | Label charts with "Chart 1" or "Revenue" |
| Use one chart per slide | Crowd multiple charts onto one slide |
| Start Y-axis at zero for bar charts | Truncate axis to exaggerate differences |
| Direct-label series on line charts | Use a legend when direct labels are possible |
| Use gray for non-key data | Color everything equally |
| Use donut charts for 2–4 segments | Use pie charts with 8 slices |
| Show big numbers for single-metric slides | Build complex charts for simple data |

---

## Related Notes

- [[07-visual-hierarchy-and-composition]] — Visual focus in chart and dashboard layouts
- [[03-color-and-branding]] — Color palettes and semantic colors for data
- [[08-saas-product-design]] — Dashboard design patterns and KPI displays
- [[04-powerpoint-design]] — Charts in presentation context
- [[05-pdf-document-design]] — Charts and tables in documents with captions
- [[12-accessibility-design]] — Accessible color use in visualizations
- [[marketing/11-analytics-attribution]] — Which metrics to visualize and why
