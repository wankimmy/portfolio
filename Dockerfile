# Multi-stage Dockerfile for Vue 3 + Vite Portfolio

# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files (package-lock.json may be missing or out of sync)
COPY package*.json ./

# Install dependencies (npm install works with or without lockfile)
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Default empty so envsubst always resolves the template, even without a key
# (the chat widget then degrades gracefully to its WhatsApp fallback)
ENV OLLAMA_API_KEY=""

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration as a template: the image's entrypoint runs envsubst on it,
# injecting OLLAMA_API_KEY (pass with: docker run -e OLLAMA_API_KEY=... )
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
