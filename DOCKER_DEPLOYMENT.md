# Docker Deployment Guide

This guide explains how to deploy the Prismatic Nomad application using Docker.

## Quick Start

### Basic Deployment

1. **Build and run the application:**
   ```bash
   docker-compose up -d
   ```

2. **Access the application:**
   - Open your browser and navigate to `http://localhost`

3. **Stop the application:**
   ```bash
   docker-compose down
   ```

### Production Deployment

For production deployment with reverse proxy and SSL support:

1. **Create SSL directory (optional):**
   ```bash
   mkdir ssl
   # Place your SSL certificates in this directory
   ```

2. **Deploy with production configuration:**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

## Docker Commands

### Build the image manually:
```bash
docker build -t prismatic-nomad .
```

### Run the container manually:
```bash
docker run -p 80:80 prismatic-nomad
```

### View logs:
```bash
docker-compose logs -f
```

### Rebuild and restart:
```bash
docker-compose down
docker-compose up --build -d
```

## Configuration

### Environment Variables

The application uses the following environment variables:
- `NODE_ENV`: Set to `production` for production builds

### Port Configuration

- **Default**: Port 80
- **Custom**: Modify the `ports` section in `docker-compose.yml`

### Health Checks

The application includes health checks that monitor:
- Application availability at `/health` endpoint
- Automatic restart on failure

## File Structure

```
├── Dockerfile                 # Multi-stage build configuration
├── docker-compose.yml         # Basic deployment configuration
├── docker-compose.prod.yml    # Production deployment with reverse proxy
├── nginx.conf                 # Nginx configuration for the app container
├── nginx-reverse-proxy.conf   # Nginx reverse proxy configuration (for prod)
├── .dockerignore             # Files to exclude from Docker build
└── DOCKER_DEPLOYMENT.md      # This file
```

## Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   # Check what's using port 80
   sudo lsof -i :80
   # Or change the port in docker-compose.yml
   ```

2. **Build fails:**
   ```bash
   # Clean up and rebuild
   docker-compose down
   docker system prune -f
   docker-compose up --build
   ```

3. **Container won't start:**
   ```bash
   # Check logs
   docker-compose logs prismatic-app
   ```

### Performance Optimization

- The Dockerfile uses multi-stage builds to minimize image size
- Nginx configuration includes gzip compression and caching
- Static assets are cached for 1 year
- Health checks ensure application availability

## Security Considerations

- Security headers are configured in nginx
- Content Security Policy is enabled
- XSS protection is active
- Frame options are set to prevent clickjacking

## Monitoring

The application includes:
- Health check endpoint at `/health`
- Nginx access and error logs
- Container health monitoring
