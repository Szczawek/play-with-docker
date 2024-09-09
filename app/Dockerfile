# Set the Dockerfile syntax and node version
# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.3.0

# Stage 1: Base image for installing dependencies
FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci 

COPY . .

RUN npm run build

# Stage 4: Serve the built app using Nginx
FROM nginx:alpine AS production

# Set the working directory in Nginx
WORKDIR /usr/share/nginx/html

# Copy the built files from the previous build stage to Nginx's default public directory
COPY --from=base /app/dist .

# Copy the custom Nginx configuration file
COPY server.* /etc/nginx/

COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 443 for HTTPS
EXPOSE 443

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]