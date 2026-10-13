"""Probe shop sites with Scrapling: status, title, app-store links, shipping lines.
Usage: .venv/bin/python probe_shop.py URL [URL ...]
"""
import re, sys
from urllib.parse import urljoin
from scrapling.fetchers import Fetcher

KEYS = re.compile(r"(shipping|delivery|free|€|αποστολ|μεταφορ|παράδοσ|παραδοσ|δωρεάν|courier|pickup|collect)", re.I)
LINKKEYS = re.compile(r"(shipping|delivery|αποστολ|παράδοσ|παραδοσ|μεταφορ|courier|faq|help|εξυπηρ|όροι|terms)", re.I)
APP = re.compile(r"(play\.google\.com|apps\.apple\.com|itunes\.apple\.com|appgallery\.huawei)")

def lines(page, limit=18):
    out, seen = [], set()
    for l in page.get_all_text(separator="\n").split("\n"):
        l = " ".join(l.split())
        if 8 < len(l) < 260 and KEYS.search(l) and l not in seen:
            seen.add(l); out.append(l)
            if len(out) >= limit: break
    return out

def get(url):
    return Fetcher.get(url, stealthy_headers=True, timeout=30, follow_redirects=True)

for url in sys.argv[1:]:
    print(f"\n##### {url}")
    try:
        p = get(url)
    except Exception as e:
        print("  error:", str(e)[:150]); continue
    print("  status:", p.status, "| final:", getattr(p, "url", url))
    t = p.css("title")
    print("  title:", t[0].get_all_text().strip()[:100] if t else "-")
    apps = sorted({a.attrib.get("href") for a in p.css("a[href]") if APP.search(a.attrib.get("href",""))})
    print("  apps:", apps or "none found")
    for l in lines(p, 8): print("   -", l)
    cands, seen = [], set()
    for a in p.css("a[href]"):
        href, txt = a.attrib.get("href",""), a.get_all_text().strip()
        if LINKKEYS.search(txt) or LINKKEYS.search(href):
            full = urljoin(url, href)
            if full not in seen and full.startswith("http"):
                seen.add(full); cands.append((txt[:40], full))
    for txt, full in cands[:3]:
        try:
            sp = get(full)
            print(f"  >> {txt} | {full} [{sp.status}]")
            for l in lines(sp, 12): print("     -", l)
        except Exception as e:
            print("  >> fail", full, str(e)[:80])
