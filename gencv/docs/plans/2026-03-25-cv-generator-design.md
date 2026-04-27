# CV Generator Tool - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** CLI tool that generates a PDF CV from a JSON data file using HTML/CSS templates.

**Architecture:** JSON data → Jinja2 renders into an HTML/CSS template → WeasyPrint converts to PDF. Single entry point `generate.py` with Click for CLI args.

**Tech Stack:** Python 3.10+, Jinja2, WeasyPrint, Click

---

### Task 1: Project Setup

**Files:**
- Create: `requirements.txt`
- Create: `.gitignore`

**Step 1: Create requirements.txt**

```
jinja2>=3.1
weasyprint>=62.0
click>=8.1
```

**Step 2: Create .gitignore**

```
__pycache__/
*.pyc
.venv/
output/*.pdf
```

**Step 3: Create virtual env and install deps**

Run:
```bash
cd /Users/thangnt/work/test/gencv
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```
Expected: All packages install successfully.

**Step 4: Commit**

```bash
git add requirements.txt .gitignore
git commit -m "chore: project setup with dependencies"
```

---

### Task 2: Create JSON Data File

**Files:**
- Create: `data/cv_data.json`

**Step 1: Create the full CV data JSON**

Create `data/cv_data.json` with all content extracted from the PDF template. The JSON structure:

```json
{
  "name": "Nguyen Trong Thang",
  "title": "Backend | Frontend Developer",
  "contact": {
    "phone": "0358045997",
    "email": "shaynenguyen9@gmail.com",
    "website": "https://thangnt.vercel.app",
    "location": "Hanoi, Vietnam"
  },
  "objective": "Long term goal: Fullstack developer",
  "education": [
    {
      "school": "Aptech Vietnam",
      "degree": "ADSE (Aptech Certified Computer Professional)",
      "start": "2022",
      "end": "2024"
    }
  ],
  "work_experience": [
    {
      "company": "Behemoth co.ltd",
      "role": "Backend & Frontend Developer",
      "start": "8/2022",
      "end": "Now",
      "description": "I wear multiple hats as a developer, driving impact across both backend and frontend architectures."
    }
  ],
  "skills": [
    {
      "category": "Language",
      "items": "Ruby, Golang, PHP, Python, MQL5, Typescript, Javascript, SQL"
    },
    {
      "category": "Data & Streaming",
      "items": "PostgreSql, MySql, MongoDB, Redis, ClickHouse, DynamoDB, Apache Airflow, MQTT, Apache Spark"
    },
    {
      "category": "Framework",
      "items": "Ruby on Rails, Gin, Fiber, FastAPI, Vuejs, Flutter, React, NextJs, Tailwind CSS, Pydantic, Celery, Scrapy, Selenium, Playwright, NumPy, Pandas, gRPC, GraphQL, WebSocket"
    },
    {
      "category": "Infrastructure",
      "items": "Docker, Kubernetes, RackSpace, Helm Chart, Linux, GCP, AWS"
    },
    {
      "category": "Tool & Workflow",
      "items": "Git, GitHub, Linear, VS Code, Claude Code, Make"
    }
  ],
  "projects": [
    {
      "name": "Mei-wa",
      "role": "BE & FE Developer",
      "start": "12/2025",
      "end": "Now",
      "description": "A social welfare management platform designed to support elderly and disabled individuals within the community efficiently and transparently (Ruby on Rails, React)"
    },
    {
      "name": "Bottos",
      "role": "BE & FE Developer - Golang, Vuejs, Line",
      "start": "12/2025",
      "end": "Now",
      "description": "A LINE LIFF-powered web app that lets customers book seats, check in, and access co-working café services directly within LINE chat"
    },
    {
      "name": "Smart Invoice",
      "role": "BE & FE Developer - Ruby on Rails, React",
      "start": "09/2025",
      "end": "Now",
      "description": "An electronic invoicing management platform that enables businesses to create, store, and track invoices online quickly, accurately, and in compliance with regulations"
    },
    {
      "name": "AI FinanceHub",
      "role": "BE & FE Developer - Pydantic, Celery, Scrapy, Selenium, Playwright, NumPy, Pandas, Celery, React, Nextjs, Apache Airflow, Apache Spark",
      "start": "06/2025",
      "end": "Now",
      "description": "Intelligent trading tool that unifies symbol mapping across brokers, streamlining trading workflow with AI-powered automation"
    },
    {
      "name": "Yobimori",
      "role": "BE, FE, Devops - AWS, Golang, React",
      "start": "07/2025",
      "end": "Now",
      "description": "A mutual aid service that protects precious lives and families from marine accidents"
    },
    {
      "name": "Vibico System",
      "role": "BE & FE Developer - Golang, Vuejs, rGPC",
      "start": "01/2025",
      "end": "Now",
      "description": "A premier website dedicated to organizing professional billiards tournaments"
    },
    {
      "name": "Redaiku",
      "role": "BE & FE Developer - Golang, Vuejs, Flutter",
      "start": "07/2024",
      "end": "04/2025",
      "description": "This is a side job matching service specialized for the construction industry that connects workers looking for work with clients looking for laborers"
    },
    {
      "name": "Tence",
      "role": "BE & FE Developer - Ruby on Rails, Vuejs",
      "start": "05/2023",
      "end": "02/2026",
      "description": "Tence is a high performance data processing system designed for fire protection management"
    },
    {
      "name": "Eco Crawler",
      "role": "BE Developer - Python - Scrapy, Playwright, Selenium",
      "start": "12/2023",
      "end": "04/2024",
      "description": "Crawl trading data from domestic and foreign news sites"
    },
    {
      "name": "Posiwill",
      "role": "BE & FE Developer - PHP Laravel, Vuejs",
      "start": "05/2023",
      "end": "11/2023",
      "description": "A administration page, an important part of a website system developed towards microservices"
    },
    {
      "name": "All In One",
      "role": "BE & FE Developer - Ruby on Rails, Vuejs, Flutter",
      "start": "08/2023",
      "end": "12/2023",
      "description": "Management website, developed according to the Jira Atlassian model. Thirst party service: Slack api, github api. Crawling data from Jira"
    },
    {
      "name": "SongPhuongFood",
      "role": "BE & FE Developer - PHP",
      "start": "08/2023",
      "end": "10/2023",
      "description": "Ecommerce web site, the website is built using pure PHP and Soft UI Dashboard PRO"
    },
    {
      "name": "UnicornCart",
      "role": "BE Developer - Ruby on Rails, Vuejs, Nuxt",
      "start": "08/2022",
      "end": "06/2023",
      "description": "UnicornCart is a comprehensive order management platform with a landing page feature. Users can create multiple domains for different customers and manage product listings on each landing page. The platform also supports various shipping carriers, product restocking, and multiple payment gateways including PayJP, PayPal, and GMO."
    }
  ]
}
```

**Step 2: Verify JSON is valid**

Run: `python3 -c "import json; json.load(open('data/cv_data.json'))"`
Expected: No error.

**Step 3: Commit**

```bash
git add data/cv_data.json
git commit -m "feat: add CV data JSON with full content"
```

---

### Task 3: Create HTML/CSS Template

**Files:**
- Create: `templates/default.html`

**Step 1: Create the HTML/CSS template**

The template must replicate the CV layout from the PDF:
- A4 page size with appropriate margins
- Clean sans-serif font (Arial/Helvetica)
- Black & white color scheme
- Section headers: bold, uppercase-ish, with bottom border
- Contact info row with unicode icons: phone (&#9742;), email (&#9993;), link (&#128279;), location (&#9679;)
- Skills: 2-column layout (category left ~25%, items right ~75%)
- Projects/Work: flex row with name left, dates right-aligned
- Role on a new line, description below

Key CSS considerations:
- `@page { size: A4; margin: 15mm 20mm; }` for print layout
- `page-break-inside: avoid` on project entries
- Line-height and spacing to match the original CV density
- Jinja2 loops: `{% for project in projects %}` etc.

**Step 2: Verify template renders**

Run:
```bash
python3 -c "
from jinja2 import Environment, FileSystemLoader
import json
env = Environment(loader=FileSystemLoader('templates'))
tmpl = env.get_template('default.html')
data = json.load(open('data/cv_data.json'))
html = tmpl.render(**data)
with open('output/preview.html', 'w') as f:
    f.write(html)
print('HTML rendered successfully')
"
```
Expected: `output/preview.html` created, opens in browser showing CV layout.

**Step 3: Commit**

```bash
git add templates/default.html
git commit -m "feat: add HTML/CSS template matching CV layout"
```

---

### Task 4: Create CLI Generator Script

**Files:**
- Create: `generate.py`

**Step 1: Write generate.py**

```python
#!/usr/bin/env python3
"""Generate a PDF CV from JSON data and HTML template."""

import json
import sys
from pathlib import Path

import click
from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML


@click.command()
@click.option("--input", "input_path", default="data/cv_data.json", help="Path to JSON data file")
@click.option("--output", "output_path", default="output/cv.pdf", help="Path for output PDF")
@click.option("--template", "template_name", default="default.html", help="Template filename")
@click.option("--html-only", is_flag=True, help="Output HTML instead of PDF (for preview)")
def generate(input_path, output_path, template_name, html_only):
    """Generate a PDF CV from JSON data."""
    # Load data
    data_file = Path(input_path)
    if not data_file.exists():
        click.echo(f"Error: {input_path} not found", err=True)
        sys.exit(1)

    with open(data_file) as f:
        data = json.load(f)

    # Render template
    env = Environment(loader=FileSystemLoader(Path(__file__).parent / "templates"))
    template = env.get_template(template_name)
    html_content = template.render(**data)

    # Ensure output directory exists
    output_file = Path(output_path)
    output_file.parent.mkdir(parents=True, exist_ok=True)

    if html_only:
        html_path = output_file.with_suffix(".html")
        html_path.write_text(html_content)
        click.echo(f"HTML preview saved to {html_path}")
    else:
        HTML(string=html_content).write_pdf(output_file)
        click.echo(f"PDF generated: {output_file}")


if __name__ == "__main__":
    generate()
```

**Step 2: Test HTML preview**

Run: `python3 generate.py --html-only`
Expected: `output/cv.html` created.

**Step 3: Test PDF generation**

Run: `python3 generate.py`
Expected: `output/cv.pdf` created, layout matches the original CV.

**Step 4: Test custom paths**

Run: `python3 generate.py --input data/cv_data.json --output output/test.pdf`
Expected: `output/test.pdf` created.

**Step 5: Commit**

```bash
git add generate.py
git commit -m "feat: add CLI generator script"
```

---

### Task 5: Verify & Polish

**Step 1: Generate final PDF and compare with original**

Run: `python3 generate.py --output output/Nguyen-Trong-Thang-2026-generated.pdf`

Open both the original (`docs/Nguyen-Trong-Thang-2026.pdf`) and generated PDF side by side.

Check:
- All sections present and in correct order
- All projects listed with correct dates
- Skills table formatted correctly
- Contact info with icons
- 2-page layout fits properly
- No text overflow or cut-off

**Step 2: Fix any layout issues in template**

Adjust CSS in `templates/default.html` as needed.

**Step 3: Final commit**

```bash
git add -A
git commit -m "feat: CV generator tool complete"
```
