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
