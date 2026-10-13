"""Fetch a shop page with Scrapling and print lines mentioning shipping/delivery terms.
Usage: .venv/bin/python fetch_shipping.py URL [URL ...]
"""
import re, sys
from scrapling.fetchers import Fetcher

KEYS = re.compile(r"(shipping|delivery|free|€|eur|αποστολ|μεταφορ|παράδοσ|versand|lieferung|kostenlos)", re.I)

for url in sys.argv[1:]:
    print(f"\n=== {url}")
    try:
        page = Fetcher.get(url, stealthy_headers=True, timeout=30)
        print("status:", page.status)
        text = " ".join(page.get_all_text(separator="\n").split("\n"))
        seen = set()
        for line in page.get_all_text(separator="\n").split("\n"):
            line = line.strip()
            if 8 < len(line) < 300 and KEYS.search(line) and line not in seen:
                seen.add(line); print(" -", line)
                if len(seen) >= 25: break
    except Exception as e:
        print("error:", e)
