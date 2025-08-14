# Next.js Production Deployment Guide

## 📁 Required Files for Deployment

When deploying to a remote server, ensure these files are uploaded:

### **Essential Files:**
```
prismaticDemo/
├── docker-compose.prod.yml          # Production compose file
├── docker-compose.yml               # Basic compose file
├── Dockerfile                       # Multi-stage build for Next.js
├── package.json                     # Next.js dependencies
├── package-lock.json                # Locked dependencies
├── next.config.js                   # Next.js configuration
├── tsconfig.json                    # TypeScript config
├── tailwind.config.js               # Tailwind CSS config
├── postcss.config.js                # PostCSS config
├── src/                             # Next.js source code
│   ├── app/                         # App Router
│   └── components/                  # React components
└── public/                          # Static assets
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

# Start production deployment (Next.js only)
docker compose -f docker-compose.prod.yml up -d

# Or use basic deployment
docker compose up -d
```

### **3. Check Deployment Status**
```bash
# Check running containers
docker ps

# Check logs
docker logs prismatic-nomad-app
```

## 🔧 Troubleshooting

### **Port Already in Use**
If you get the error "port is already allocated", stop existing containers:
```bash
# Stop all containers
docker compose down
docker stop $(docker ps -q)

# Then deploy again
docker compose -f docker-compose.prod.yml up -d
```

### **Build Issues**
If the build fails, check:
- All source files are uploaded
- `package.json` and `package-lock.json` are present
- `Dockerfile` is uploaded

## 🌐 Access Your Application

After successful deployment:
- **URL:** http://your-server-ip:3000
- **Health Check:** http://your-server-ip:3000/api/health

## 📊 Monitoring

### **Check Container Health:**
```bash
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
```

### **View Logs:**
```bash
# Next.js app logs
docker logs prismatic-nomad-app

# Follow logs in real-time
docker logs -f prismatic-nomad-app
```

### **Restart Services:**
```bash
# Restart all services
docker compose -f docker-compose.prod.yml restart

# Restart specific service
docker compose -f docker-compose.prod.yml restart prismatic-app
```

## 🎯 Quick Deploy Checklist

- [ ] All source files uploaded
- [ ] `docker-compose.prod.yml` uploaded
- [ ] `Dockerfile` uploaded
- [ ] `package.json` and `package-lock.json` uploaded
- [ ] Run `docker compose -f docker-compose.prod.yml up -d`
- [ ] Verify container is running: `docker ps`
- [ ] Test application: `curl http://localhost:3000/api/health`

## 🚀 Deployment Options

### **Option 1: Basic Deployment**
```bash
docker compose up -d
# Access at: http://your-server-ip:3000
```

### **Option 2: Production Deployment**
```bash
docker compose -f docker-compose.prod.yml up -d
# Access at: http://your-server-ip:3000
```

Both options deploy the same Next.js application - the production version just has additional environment variables and health checks.
