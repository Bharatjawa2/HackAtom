# Backend Setup Guide

## Prerequisites

1. **Install Node.js** (if not already installed)
   - Download from: https://nodejs.org/
   - Choose LTS version (recommended)
   - Verify installation: `node --version` and `npm --version`

2. **Install MongoDB** (if not already installed)
   - Download from: https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (cloud): https://www.mongodb.com/atlas

## Quick Setup

### Step 1: Install Dependencies
```bash
# Navigate to backend directory
cd "HackAtom copy/backend"

# Install dependencies
npm install
```

### Step 2: Create Environment File
Create a `.env` file in the backend directory with:
```env
MONGODB_URI=mongodb://localhost:27017/hackatom
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### Step 3: Start MongoDB
**Option A: Local MongoDB**
```bash
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas (Cloud)**
- Create account at https://www.mongodb.com/atlas
- Create a cluster
- Get connection string
- Replace MONGODB_URI in .env file

### Step 4: Start the Server
```bash
# Development mode (with auto-restart)
npm run dev

# Or production mode
npm start
```

## Verification

The server should start and show:
```
Server running on port 5000
```

Test the API:
- Visit: http://localhost:5000
- Should see: `{"message":"HackAtom API is running"}`

## Troubleshooting

### Node.js not found
```bash
# Install Node.js from https://nodejs.org/
# Then verify installation
node --version
npm --version
```

### MongoDB connection failed
- Check if MongoDB is running
- Verify connection string in .env
- For local MongoDB: `mongod`
- For Atlas: Check network access settings

### Port already in use
- Change PORT in .env file
- Or kill process using port 5000

### Dependencies installation failed
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## API Endpoints

Once running, these endpoints will be available:

- `GET /` - Health check
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login  
- `GET /api/auth/me` - Get current user (requires auth)

## Security Notes

- Change JWT_SECRET to a secure random string
- Use HTTPS in production
- Set up proper CORS origins
- Enable rate limiting for production 