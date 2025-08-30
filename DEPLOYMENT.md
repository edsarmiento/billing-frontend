# Railway Deployment Guide

## Environment Variables

Set the following environment variables in Railway:

### Required Variables

1. **BACKEND_API_URL**
   - **Production**: `https://api.technicaltest.xyz/api/v1`
   - **Local Development**: `http://localhost:3000/api/v1`

2. **NEXT_PUBLIC_API_BASE_URL**
   - **Production**: `/api`
   - **Local Development**: `/api`

## Setting Environment Variables in Railway

1. Go to your Railway project dashboard
2. Navigate to the Variables tab
3. Add the following variables:
   ```
   BACKEND_API_URL=https://api.technicaltest.xyz/api/v1
   NEXT_PUBLIC_API_BASE_URL=/api
   ```

## Deployment Commands

The project uses the following scripts:
- `npm run build` - Builds the Next.js application
- `npm start` - Starts the production server

## Health Check

The application includes a health check endpoint at `/` that Railway will use to verify the deployment is successful.

## Build Configuration

- **Builder**: Nixpacks
- **Node.js Version**: Latest LTS
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
