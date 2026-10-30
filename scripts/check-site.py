#!/usr/bin/env python3
"""빌드한 HTML에서 로컬 이미지, 스크립트, 스타일 파일이 있는지 확인한다."""

import argparse
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


class AssetParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.assets = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in {"img", "script"} and attrs.get("src"):
            self.assets.append(attrs["src"])
        if tag == "link" and "stylesheet" in attrs.get("rel", "").split():
            if attrs.get("href"):
                self.assets.append(attrs["href"])


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("directory", type=Path, help="Jekyll 빌드 결과 경로")
    parser.add_argument("--site-url", default="https://hiki-pedia.github.io")
    args = parser.parse_args()
    root = args.directory.resolve()
    pages = sorted(root.rglob("*.html"))
    if not (root / "index.html").is_file():
        parser.error("빌드 결과의 index.html을 찾을 수 없습니다.")

    hostname = urlsplit(args.site_url).hostname
    errors = []
    checked = 0
    for page in pages:
        document = AssetParser()
        document.feed(page.read_text(encoding="utf-8"))
        for asset in document.assets:
            url = urlsplit(asset)
            if url.scheme not in {"", "http", "https"}:
                continue
            if url.netloc and url.hostname != hostname:
                continue
            path = unquote(url.path)
            if not path:
                continue
            target = root / path.lstrip("/") if path.startswith("/") else page.parent / path
            checked += 1
            if not target.resolve().is_relative_to(root) or not target.is_file():
                errors.append(f"{page.relative_to(root)}: {asset}")

    if errors:
        print("누락된 로컬 자산:")
        print("\n".join(errors))
        return 1
    print(f"HTML {len(pages)}개, 로컬 자산 참조 {checked}개 확인")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
