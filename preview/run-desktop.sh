#!/usr/bin/env bash
set -euo pipefail

repo_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
coproc PREVIEW_SERVER {
  python3 -u - "$repo_dir/preview" <<'PY'
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import sys

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=sys.argv[1], **kwargs)

    def log_message(self, *args):
        pass

server = ThreadingHTTPServer(('127.0.0.1', 0), Handler)
print(server.server_port, flush=True)
server.serve_forever()
PY
}
server_pid=$PREVIEW_SERVER_PID
trap 'kill "$server_pid" 2>/dev/null || true' EXIT

if ! read -r port <&"${PREVIEW_SERVER[0]}"; then
  echo "Could not start the preview server" >&2
  exit 1
fi

gjs "$repo_dir/preview/window.js" "http://127.0.0.1:$port/"
