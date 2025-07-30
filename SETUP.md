# Nuclear Energy Education Platform - Setup Guide

## 🚀 Quick Start

This is an interactive nuclear energy education platform with authentication, dynamic language switching, and 3D interactive elements.

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

## 🛠️ Installation Steps

### 1. Backend Setup

```bash
# Navigate to backend directory
cd "HackAtom copy/backend"

# Install dependencies
npm install

# Create .env file (copy the content below)
```

Create a `.env` file in the backend directory with:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hackatom
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:5173
```

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd "../HackAtom"

# Install dependencies
npm install
```

### 3. Start the Application

#### Start Backend (Terminal 1):
```bash
cd "HackAtom copy/backend"
npm run dev
```

#### Start Frontend (Terminal 2):
```bash
cd "HackAtom copy/HackAtom"
npm run dev
```

## 🌐 Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 🎯 Features

### ✅ Authentication System
- User registration with name, email, password
- Secure login with JWT tokens
- Password hashing with bcrypt
- Protected routes

### ✅ Interactive Learning Modules
- **General Public**: Basic nuclear energy concepts
- **Medical Professionals**: Nuclear medicine applications
- **Nuclear Engineers**: Advanced reactor design concepts

### ✅ Dynamic Language Support
- English ↔ Russian toggle
- All content dynamically translated
- Real-time language switching

### ✅ Interactive 3D Elements
- Clickable atom model with rotating electrons
- Detailed particle information
- Animated nuclear reactions
- Interactive quiz system

### ✅ Quiz System
- Multiple choice questions
- Score tracking
- Progress indicators
- Bilingual quiz content

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Example Usage:
```bash
# Register a user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

## 🎨 Interactive Features

### 3D Atom Model
- Click on particles (Neutron, Proton, Electron, Nucleus)
- View detailed information popups
- Control rotation and animations
- Learn particle properties and functions

### Learning Modules
- Step-by-step guided learning
- Interactive animations
- Progress tracking
- Category-specific content

### Quiz System
- 5 questions per quiz
- Real-time scoring
- Bilingual support
- Nuclear energy focused questions

## 🗂️ Project Structure

```
HackAtom copy/
├── backend/
│   ├── models/
│   │   └── User.js              # User model with password hashing
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── routes/
│   │   └── auth.js              # Authentication routes
│   ├── db.js                    # MongoDB connection
│   ├── server.js                # Express server setup
│   └── package.json
└── HackAtom/
    ├── src/
    │   ├── components/
    │   │   ├── Login.jsx        # Login form
    │   │   ├── Signup.jsx       # Registration form
    │   │   ├── Navbar.jsx       # Navigation with user info
    │   │   ├── LearningModule.jsx # Interactive learning content
    │   │   └── InteractiveAtom3D.jsx # 3D atom model
    │   ├── context/
    │   │   ├── AuthContext.jsx  # Authentication state management
    │   │   └── LanguageContext.jsx # Language switching
    │   ├── pages/
    │   │   ├── Auth.jsx         # Combined login/signup page
    │   │   └── HomePage.jsx     # Main interactive homepage
    │   └── App.jsx              # Main app with routing
    └── package.json
```

## 🎮 How to Use

### 1. Authentication
- Visit http://localhost:5173
- You'll be redirected to `/auth` if not logged in
- Register with name, email, and password
- Or login with existing credentials

### 2. Interactive Learning
- Choose from three learning modules:
  - **General Public**: Basic concepts
  - **Medical Professionals**: Medical applications
  - **Nuclear Engineers**: Advanced engineering

### 3. 3D Atom Interaction
- Click on the interactive atom model
- Explore different particles (Neutron, Proton, Electron, Nucleus)
- View detailed information and facts
- Control animations with play/pause buttons

### 4. Quiz System
- Take the nuclear energy quiz
- Answer 5 multiple-choice questions
- View your score and try again

### 5. Language Switching
- Use the language toggle button
- Switch between English and Russian
- All content updates dynamically

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure session management
- **Input Validation**: Server-side validation
- **CORS Protection**: Configured for frontend
- **Protected Routes**: Authentication required

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB (if not running)
mongod
```

### Port Conflicts
- Backend: Change PORT in .env file
- Frontend: Change port in vite.config.js

### CORS Errors
- Verify FRONTEND_URL in backend .env
- Check if frontend is running on correct port

### JWT Issues
- Ensure JWT_SECRET is set in .env
- Check token in browser localStorage

## 🚀 Production Deployment

### Environment Variables
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-secure-jwt-secret
JWT_EXPIRE=30d
FRONTEND_URL=https://your-domain.com
```

### Security Checklist
- [ ] Change JWT_SECRET to secure random string
- [ ] Use HTTPS in production
- [ ] Set up proper CORS origins
- [ ] Use production MongoDB instance
- [ ] Enable rate limiting
- [ ] Set up monitoring

## 📚 Learning Content

The platform includes comprehensive content about:

### Nuclear Physics
- Atomic structure
- Nuclear reactions
- Radioactivity
- Fission and fusion

### Nuclear Energy Applications
- Power generation
- Medical imaging
- Cancer treatment
- Space exploration

### Safety and Regulation
- Nuclear safety systems
- Radiation protection
- Environmental impact
- Regulatory frameworks

## 🎯 Target Audience

1. **General Public**: Basic understanding of nuclear energy
2. **Medical Professionals**: Nuclear medicine applications
3. **Nuclear Engineers**: Advanced technical concepts
4. **Students**: Educational content for learning
5. **Researchers**: Reference material and concepts

## 🔄 Updates and Maintenance

### Adding New Content
- Update content in LearningModule.jsx
- Add new quiz questions in HomePage.jsx
- Extend language support in text objects

### Adding New Features
- Create new components in src/components/
- Add routes in App.jsx
- Update authentication as needed

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Verify all dependencies are installed
3. Ensure MongoDB is running
4. Check console for error messages

## 🎉 Enjoy Learning!

This platform provides an engaging way to learn about nuclear energy through:
- Interactive 3D models
- Step-by-step learning modules
- Dynamic language support
- Comprehensive quiz system
- Secure user authentication

Start exploring the fascinating world of nuclear energy today! 