#!/usr/bin/env bash
# Build the site here and release it to the VPS behind Traefik.
#
#   DEPLOY_HOST=user@server DEPLOY_KEY=~/.ssh/key bash scripts/deploy-vps.sh
#
# Optional: TAG=name (default: UTC timestamp), SKIP_BUILD=1 to ship the dist/ already built,
# ACME=1 to keep the certificate setup even if the server's own resolver cannot see the domain yet
# (a release without it would swap the live certificate for an untrusted one).
# Releases live in /docker/portfolio/releases/<tag>; the previous image stays on
# the server, so rollback is:  cd /docker/portfolio && sudo TAG=<old> docker compose -f current/deploy/compose.yml up -d
set -euo pipefail
cd "$(dirname "$0")/.."

HOST="${DEPLOY_HOST:?set DEPLOY_HOST, e.g. user@server}"
KEY="${DEPLOY_KEY:?set DEPLOY_KEY to the SSH private key path}"
TAG="${TAG:-$(date -u +%Y%m%d-%H%M%S)}"
DOMAIN="safwanhakim.com"
ROOT="/docker/portfolio"
SSH=(ssh -i "$KEY" -o BatchMode=yes -o ConnectTimeout=15 "$HOST")

if [ "${SKIP_BUILD:-0}" != "1" ]; then
  npm run build
fi
test -f dist/index.html || { echo "dist/index.html missing: build first" >&2; exit 1; }
echo "== upload release $TAG"
# the shared-hosting leftovers (PHP proxy, .htaccess) never ship
tar --exclude=dist/api --exclude=dist/.htaccess -czf - dist nginx.conf deploy | "${SSH[@]}" "sudo mkdir -p $ROOT/releases/$TAG && sudo tar -xzf - -C $ROOT/releases/$TAG"

echo "== build image and switch"
"${SSH[@]}" "TAG='$TAG' DOMAIN='$DOMAIN' ROOT='$ROOT' ACME='${ACME:-0}' bash -s" <<'REMOTE'
set -euo pipefail
cd "$ROOT/releases/$TAG"
sudo docker build -q -t "portfolio-site:$TAG" -f deploy/Dockerfile . >/dev/null
sudo ln -sfn "releases/$TAG" "$ROOT/current"

files=(-f current/deploy/compose.yml)
# certificate only when the domain already points here (see compose.acme.yml)
here="$(ip -4 route get 1.1.1.1 2>/dev/null | awk '{for (i = 1; i < NF; i++) if ($i == "src") print $(i + 1)}')"
seen="$(getent ahostsv4 "$DOMAIN" | awk 'NR==1{print $1}')"
if [ "$ACME" = "1" ]; then
  files+=(-f current/deploy/compose.acme.yml)
  echo "certificate enabled (ACME=1)"
elif [ -n "$here" ] && [ "$here" = "$seen" ]; then
  files+=(-f current/deploy/compose.acme.yml)
  echo "DNS ok: $DOMAIN -> $seen, certificate enabled"
else
  echo "DNS NOT READY: $DOMAIN -> ${seen:-nothing}, this server is ${here:-unknown}. Site is up without a trusted certificate; re-run after DNS is fixed."
fi

cd "$ROOT"
sudo test -f .env || { sudo touch .env && sudo chmod 600 .env; }
sudo TAG="$TAG" docker compose --env-file .env "${files[@]}" up -d
for i in $(seq 1 20); do
  state="$(sudo docker inspect -f '{{.State.Health.Status}}' portfolio-site 2>/dev/null || echo starting)"
  [ "$state" = "healthy" ] && break
  sleep 2
done
echo "container health: $state"
[ "$state" = "healthy" ] || { sudo docker logs --tail 30 portfolio-site; exit 1; }
REMOTE

echo "== released $TAG"
