#!/usr/bin/env python3
"""Read-only O01 evidence gate. Does not build, serve, deploy, or run browsers."""
import argparse
import hashlib
import json
import subprocess
import urllib.error
import urllib.request
from pathlib import Path

REVISION = "64ffedefdfd9bc9ddd9bf9c834bb8a284fdeebf3"


def git(repo, *args):
    return subprocess.check_output(["git", "-C", str(repo), *args], text=True).strip()


def probe(url):
    request = urllib.request.Request(url, method="HEAD")
    try:
        with urllib.request.urlopen(request, timeout=10) as response:
            return {"url": url, "status": response.status, "error": None}
    except urllib.error.HTTPError as error:
        return {"url": url, "status": error.code, "error": str(error)}
    except (urllib.error.URLError, TimeoutError, OSError) as error:
        return {"url": url, "status": None, "error": str(error)}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo", type=Path, required=True)
    parser.add_argument("--archive", type=Path, required=True)
    parser.add_argument("--prior-operation", type=Path, required=True)
    parser.add_argument("--url", required=True)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    if not args.archive.is_dir():
        parser.error("--archive must name an existing directory")
    files = {}
    for path in sorted(args.archive.rglob("*")):
        if path.is_file():
            files[path.relative_to(args.archive).as_posix()] = hashlib.sha256(path.read_bytes()).hexdigest()
    preview = probe(args.url)
    # File hashes identify the archive, not the source that produced its bundles.
    result = {
        "id": "O01",
        "expected_source_revision": REVISION,
        "expected_product_tree": git(args.repo, "rev-parse", f"{REVISION}:website/src"),
        "checkout_head": git(args.repo, "rev-parse", "HEAD"),
        "product_diff_from_expected": git(args.repo, "diff", REVISION, "--", "website/src"),
        "archive_path": str(args.archive.resolve()),
        "archive_sha256": files,
        "archive_source_revision_verified": False,
        "identity_note": "No build provenance receipt establishes the archive's source revision.",
        "preview": preview,
        "prior_army_files": {
            name: (args.prior_operation / "e2e-army" / name).is_file()
            for name in ("army.sh", "REPORT.md")
        },
        "new_browser_tests_executed": False,
        "qualification_complete": False,
    }
    args.output.write_text(json.dumps(result, indent=2) + "\n")
    print(json.dumps({"preview": preview, "archive_files": len(files),
                      "archive_source_revision_verified": False,
                      "qualification_complete": False}, indent=2))
    return 1  # Evidence-only collection must not pass the qualification gate.


if __name__ == "__main__":
    raise SystemExit(main())
