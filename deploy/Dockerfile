# Production image for the VPS: the site is built on the dev machine
# (npm run build) and only the finished dist/ ships. Build context is a release
# folder holding dist/, nginx.conf and this file (see scripts/deploy-vps.sh).
FROM nginx:stable-alpine

# empty default so the envsubst template always resolves; without a key the
# chat widget falls back to its WhatsApp link
ENV OLLAMA_API_KEY=""

COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/templates/default.conf.template

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD wget -qO- http://127.0.0.1/health || exit 1
