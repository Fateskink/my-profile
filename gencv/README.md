# GenCV

Generate a PDF CV from JSON data using HTML/CSS templates.

## Setup

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Usage

```bash
# Generate PDF (default: data/cv_data.json → output/cv.pdf)
python generate.py

# Custom input/output
python generate.py --input data/cv_data.json --output ../assets/Nguyen-Trong-Thang-2026.pdf

# HTML preview (debug layout in browser)
python generate.py --html-only

# Use a different template
python generate.py --template default.html
```

## Project Structure

```
gencv/
├── generate.py          # CLI entry point
├── requirements.txt     # Python dependencies
├── data/
│   └── cv_data.json     # CV content (edit this to update your CV)
├── templates/
│   └── default.html     # HTML/CSS template
└── output/              # Generated PDF/HTML output
```

## How to Update Your CV

Edit `data/cv_data.json` then run `python generate.py`.

## Tech Stack

- **Jinja2** - Template rendering
- **WeasyPrint** - HTML/CSS to PDF conversion
- **Click** - CLI interface
