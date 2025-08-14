# Production Deployment Guide

## 📁 Required Files for Deployment

When deploying to a remote server, ensure these files are uploaded:

### **Essential Files:**
```
prismaticDemo/
├── docker-compose.prod.yml          # Production compose file
├── Dockerfile                       # Multi-stage build
├── nginx-reverse-proxy.conf         # Nginx reverse proxy config
├── nginx.conf                       # Nginx config for React app
├── package.json                     # Node.js dependencies
├── package-lock.json                # Locked dependencies
├── vite.config.ts                   # Vite configuration
├── tsconfig.json                    # TypeScript config
├── tailwind.config.js               # Tailwind CSS config
├── postcss.config.js                # PostCSS config
├── index.html                       # Entry HTML file
├── src/                             # React source code
└── public/                          # Static assets
```

### **Optional Files (for SSL):**
```
prismaticDemo/
└── ssl/                             # SSL certificates (when ready)
    ├── cert.pem
    └── key.pem
```

## 🚀 Deployment Commands

### **1. Upload Files to Server**
```bash
# Upload all required files to your server
scp -r . user@your-server:/path/to/deployment/
```

### **2. Deploy Production Setup**
```bash
# Navigate to deployment directory
cd /path/to/deployment/

# Start production deployment
docker compose -f docker-compose.prod.yml up -d
```

### **3. Check Deployment Status**
```bash
# Check running containers
docker ps

# Check logs
docker logs prismatic-nginx
docker logs prismatic-nomad-app
```

## 🔧 Troubleshooting

### **Missing nginx-reverse-proxy.conf**
If you get the error "cannot create subdirectories in /etc/nginx/nginx.conf", ensure:
- `nginx-reverse-proxy.conf` file is uploaded to the server
- File has correct permissions

### **Missing SSL Directory**
If you need SSL later, create the directory:
```bash
mkdir -p ssl
# Then add your SSL certificates
```

## 🌐 Access Your Application

After successful deployment:
- **URL:** http://your-server-ip
- **Health Check:** http://your-server-ip/health

## 📊 Monitoring

### **Check Container Health:**
```bash
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
```

### **View Logs:**
```bash
# Nginx proxy logs
docker logs prismatic-nginx

# React app logs
docker logs prismatic-nomad-app
```

### **Restart Services:**
```bash
# Restart all services
docker compose -f docker-compose.prod.yml restart

# Restart specific service
docker compose -f docker-compose.prod.yml restart nginx
```

## 🔒 SSL Setup (Future)

When ready for HTTPS:

1. **Add SSL certificates to `ssl/` directory**
2. **Uncomment SSL section in `nginx-reverse-proxy.conf`**
3. **Add SSL volume back to `docker-compose.prod.yml`**
4. **Restart services**

## 🎯 Quick Deploy Checklist

- [ ] All source files uploaded
- [ ] `nginx-reverse-proxy.conf` uploaded
- [ ] `docker-compose.prod.yml` uploaded
- [ ] `Dockerfile` uploaded
- [ ] Run `docker compose -f docker-compose.prod.yml up -d`
- [ ] Verify containers are running: `docker ps`
- [ ] Test application: `curl http://localhost/health`
