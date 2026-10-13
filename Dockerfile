# ============================================================================
# Dockerfile — CloudPulse Dynamic Web Application
# Tool #4: Docker Containerization for AWS EC2 Deployment
# ============================================================================
FROM node:20-alpine

# Create application directory inside container
WORKDIR /app

# Copy package manifests first (leverages Docker layer caching)
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy application source code
COPY . .

# Accept CI/CD metadata from Jenkins during `docker build`
ARG BUILD_NUMBER=1
ARG GIT_COMMIT=main-latest
ARG GIT_BRANCH=main
ARG CLOUD_PROVIDER="AWS EC2 (Docker Container)"
ARG AWS_REGION="ap-south-1"

# Set environment variables inside container so the web app displays them live
ENV PORT=3000
ENV BUILD_NUMBER=${BUILD_NUMBER}
ENV GIT_COMMIT=${GIT_COMMIT}
ENV GIT_BRANCH=${GIT_BRANCH}
ENV CLOUD_PROVIDER=${CLOUD_PROVIDER}
ENV AWS_REGION=${AWS_REGION}

# Expose application port
EXPOSE 3000

# Container Healthcheck (verifies app is responding on /health)
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Start dynamic web application
CMD ["npm", "start"]
