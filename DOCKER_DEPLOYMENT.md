# Docker Deployment Guide

This guide explains how to deploy the Prismatic Nomad Next.js application using Docker.

## Quick Start

### Basic Deployment

1. **Build and run the application:**
   ```bash
   docker compose up -d
   ```

2. **Access the application:**
   - Open your browser and navigate to `http://localhost:3000`

3. **Stop the application:**
   ```bash
   docker compose down
   ```

### Production Deployment

For production deployment with optimized settings:

1. **Deploy with production configuration:**
   ```bash
   docker compose -f docker-compose.prod.yml up -d
   ```

2. **Access the application:**
   - Open your browser and navigate to `http://localhost:3000`

## Docker Commands

### Build the image manually:
```bash
docker build -t prismatic-nomad .
```

### Run the container manually:
```bash
docker run -p 3000:3000 prismatic-nomad
```

### View logs:
```bash
docker compose logs -f
```

### Rebuild and restart:
```bash
docker compose down
docker compose up --build -d
```

## Configuration

### Environment Variables

The application uses the following environment variables:
- `NODE_ENV`: Set to `production` for production builds

### Port Configuration

- **Default**: Port 3000
- **Custom**: Modify the `ports` section in `docker-compose.yml`

### Health Checks

The application includes health checks that monitor:
- Application availability at `/api/health` endpoint
- Automatic restart on failure

## File Structure

```
├── Dockerfile                 # Multi-stage build configuration for Next.js
├── docker-compose.yml         # Basic deployment configuration
├── docker-compose.prod.yml    # Production deployment configuration
├── .dockerignore             # Files to exclude from Docker build
└── DOCKER_DEPLOYMENT.md      # This file
```

## Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   # Check what's using port 3000
   sudo lsof -i :3000
   # Or change the port in docker-compose.yml
   ```

2. **Build fails:**
   ```bash
   # Clean up and rebuild
   docker compose down
   docker system prune -f
   docker compose up --build
   ```

3. **Container won't start:**
   ```bash
   # Check logs
   docker compose logs prismatic-app
   ```

### Performance Optimization

- The Dockerfile uses multi-stage builds to minimize image size
- Next.js includes built-in optimization and caching
- Static assets are automatically optimized
- Health checks ensure application availability

## Security Considerations

- Next.js includes built-in security features
- Content Security Policy can be configured in `next.config.js`
- XSS protection is active by default
- Frame options can be set in headers

## Monitoring

The application includes:
- Health check endpoint at `/api/health`
- Next.js application logs
- Container health monitoring

## API Endpoints

- **Health Check**: `GET /api/health`
- **Main Application**: `GET /`

## Deployment Options

### Option 1: Basic Deployment
```bash
docker compose up -d
# Access at: http://localhost:3000
```

### Option 2: Production Deployment
```bash
docker compose -f docker-compose.prod.yml up -d
# Access at: http://localhost:3000
```

Both options deploy the same Next.js application - the production version includes additional environment variables and health checks.
