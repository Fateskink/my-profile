#!/usr/bin/env python3
"""Generate a PDF CV from JSON data and HTML template."""

import json
import os
import sys
from pathlib import Path

import click
from jinja2 import Environment, FileSystemLoader

# Fix for macOS: add Homebrew lib to DYLD_LIBRARY_PATH so cffi can find GTK libs.
# This must happen before weasyprint (or cffi) is imported.
_homebrew_lib = "/opt/homebrew/lib"
if os.path.exists(_homebrew_lib) and _homebrew_lib not in os.environ.get(
    "DYLD_LIBRARY_PATH", ""
):
    os.environ["DYLD_LIBRARY_PATH"] = (
        _homebrew_lib + ":" + os.environ.get("DYLD_LIBRARY_PATH", "")
    ).rstrip(":")

from weasyprint import HTML


@click.command()
@click.option("--input", "input_path", default="data/cv_data.json", help="Path to JSON data file")
@click.option("--output", "output_path", default="output/cv.pdf", help="Path for output PDF")
@click.option("--template", "template_name", default="default.html", help="Template filename")
@click.option("--html-only", is_flag=True, help="Output HTML instead of PDF (for preview)")
def generate(input_path, output_path, template_name, html_only):
    """Generate a PDF CV from JSON data."""
    data_file = Path(input_path)
    if not data_file.exists():
        click.echo(f"Error: {input_path} not found", err=True)
        sys.exit(1)

    with open(data_file) as f:
        data = json.load(f)

    env = Environment(loader=FileSystemLoader(Path(__file__).parent / "templates"))
    template = env.get_template(template_name)
    html_content = template.render(**data)

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
