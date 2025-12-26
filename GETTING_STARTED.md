# 🚀 School Management System - Quick Start Guide (MongoDB Edition)

## ✅ What's Been Set Up

### Backend (Express + Mongoose + MongoDB)
- ✅ Complete Express server with security middleware
- ✅ JWT authentication system
- ✅ Mongoose ODM with comprehensive database models
- ✅ Role-based access control (ADMIN, TEACHER, STUDENT, PARENT)
- ✅ Authentication routes (register, login, profile)
- ✅ All dependencies installed
- ✅ **CONVERTED TO MONGODB** (from PostgreSQL/Prisma)

### Frontend (Next.js 15 + TypeScript + Tailwind CSS)
- ✅ Next.js 15 with App Router
- ✅ TypeScript configuration
- ✅ Tailwind CSS with custom theme
- ✅ Beautiful landing page
- ✅ API client with auto token refresh
- ✅ All dependencies installed

---

## 🎯 Current Status

### ✅ **BACKEND IS RUNNING**
- Server: http://localhost:5000
- Health Check: http://localhost:5000/health
- API Base: http://localhost:5000/api

### ✅ **FRONTEND IS RUNNING**
- URL: http://localhost:3000
- Beautiful landing page with role-based login buttons

### ⚠️ **MONGODB SETUP NEEDED**
The backend will connect to MongoDB when you set it up. You have two options:

---

## 🗄️ MongoDB Setup Options

### Option A: Local MongoDB (Recommended for Development)

1. **Download MongoDB Community Server**
   - Visit: https://www.mongodb.com/try/download/community
   - Download and install for Windows
   - During installation, select "Install MongoDB as a Service"

2. **Verify MongoDB is Running**
   ```bash
   mongosh
   ```
   If you see the MongoDB shell, you're good!

3. **Your backend is already configured for local MongoDB**
   - Connection string: `mongodb://localhost:27017/school_management`
   - No changes needed!

### Option B: MongoDB Atlas (Cloud - Free Tier)

1. **Create Account**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up for free

2. **Create Cluster**
   - Choose FREE tier (M0)
   - Select a region close to you
   - Click "Create Cluster"

3. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password

4. **Update Backend .env**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/school_management
   ```

5. **Restart Backend**
   - Stop the backend (Ctrl+C)
   - Run `npm run dev` again

---

## 🧪 Test the System

### 1. Check Backend Health
Visit: http://localhost:5000/health

You should see:
```json
{
  "status": "OK",
  "message": "School Management System API is running",
  "timestamp": "2025-12-25T15:53:36.125Z"
}
```

### 2. Test User Registration

**Using Browser (Recommended):**
- Install a REST client extension (like Thunder Client for VS Code)
- Or use Postman

**Using PowerShell:**
```powershell
$body = @{
    email = "admin@school.com"
    password = "admin123"
    name = "Admin User"
    role = "ADMIN"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" `
    -Method Post `
    -Body $body `
    -ContentType "application/json"
```

### 3. Test Login
```powershell
$body = @{
    email = "admin@school.com"
    password = "admin123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" `
    -Method Post `
    -Body $body `
    -ContentType "application/json"
```

### 4. Visit Frontend
Go to: http://localhost:3000

You should see the beautiful landing page!

---

## 📁 Project Structure

```
Brokenshell/
├── backend/
│   ├── src/
│   │   ├── app.js                 # Express server
│   │   ├── config/
│   │   │   └── database.js        # MongoDB connection
│   │   ├── controllers/
│   │   │   └── auth.controller.js # Auth logic
│   │   ├── middleware/
│   │   │   └── auth.middleware.js # JWT verification
│   │   ├── models/
│   │   │   ├── User.js            # User model
│   │   │   ├── Student.js         # Student model
│   │   │   ├── Attendance.js      # Attendance model
│   │   │   ├── Fee.js             # Fee model
│   │   │   └── Class.js           # Class model
│   │   └── routes/
│   │       └── auth.routes.js     # Auth endpoints
│   ├── .env                       # Environment variables
│   └── package.json
│
└── frontend/
    ├── app/
    │   ├── layout.tsx             # Root layout
    │   ├── page.tsx               # Landing page
    │   └── globals.css            # Global styles
    ├── lib/
    │   └── api.ts                 # API client
    ├── .env.local                 # Frontend env
    └── package.json
```

---

## 🎨 Available Features

### Current (Ready to Use)
- ✅ User registration & login
- ✅ JWT authentication with refresh tokens
- ✅ Role-based access control
- ✅ Beautiful landing page
- ✅ API client with auto token refresh
- ✅ **MongoDB database with Mongoose models**

### Database Models Created
- ✅ Users (with roles)
- ✅ Students
- ✅ Attendance
- ✅ Fees
- ✅ Classes
- 📝 Parents (model ready, needs controller)
- 📝 Teachers (model ready, needs controller)
- 📝 Results (model ready, needs controller)
- 📝 Homework (model ready, needs controller)

### Next to Build
- 📝 Login page (frontend)
- 📝 Dashboard for each role
- 📝 Student management CRUD
- 📝 Attendance marking interface
- 📝 Fee management interface
- 📝 Results & homework modules

---

## 🔧 Useful Commands

### Backend
```bash
cd backend
npm run dev          # Start development server
npm run start        # Start production server
```

### Frontend
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### MongoDB (if installed locally)
```bash
mongosh              # Open MongoDB shell
mongosh --eval "show dbs"  # List databases
```

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
**If using local MongoDB:**
- Make sure MongoDB service is running
- Check Windows Services for "MongoDB Server"
- Try: `net start MongoDB`

**If using MongoDB Atlas:**
- Check your connection string in `.env`
- Make sure you whitelisted your IP (0.0.0.0/0 for development)
- Verify your database password

### "Port already in use"
**Backend:**
- Change PORT in `.env` to 5001 or another port
- Kill the process: `netstat -ano | findstr :5000`

**Frontend:**
- Run: `npm run dev -- -p 3001`

### "Module not found"
- Run `npm install` in the respective directory
- Delete `node_modules` and run `npm install` again

---

## 📚 Tech Stack

### Backend
- **Express.js** - Web framework
- **Mongoose** - MongoDB ODM
- **MongoDB** - NoSQL database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Helmet** - Security headers
- **CORS** - Cross-origin requests

### Frontend
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Lucide React** - Icons

---

## 🎯 What to Build Next

I recommend building in this order:

1. **Login Page** - Frontend form for authentication
2. **Admin Dashboard** - Overview with stats
3. **Student Module** - CRUD operations
4. **Attendance Module** - Mark and view attendance
5. **Fee Module** - Manage payments
6. **Parent Portal** - View child's information
7. **Teacher Portal** - Manage classes

---

## 🔥 Key Differences from PostgreSQL Version

### What Changed:
- ✅ **Prisma** → **Mongoose**
- ✅ **PostgreSQL** → **MongoDB**
- ✅ **Relational Schema** → **Document-based Models**
- ✅ **SQL Queries** → **MongoDB Queries**

### Why MongoDB?
- ✅ Easier setup (no SQL server needed)
- ✅ Flexible schema (easier to modify)
- ✅ Free cloud hosting (MongoDB Atlas)
- ✅ JSON-like documents (natural for JavaScript)
- ✅ Great for rapid development

---

## 💡 Pro Tips

1. **Use MongoDB Compass** (GUI for MongoDB):
   - Download: https://www.mongodb.com/products/compass
   - Connect to: `mongodb://localhost:27017`
   - View and edit data visually

2. **Test APIs** with Thunder Client (VS Code extension):
   - Install from VS Code marketplace
   - Create requests easily
   - Save collections

3. **Check logs** - Both servers show helpful logs in the terminal

4. **Environment variables** - Never commit `.env` files to git!

---

## 🚀 Ready to Go!

Your system is now running with:
- ✅ Backend on http://localhost:5000
- ✅ Frontend on http://localhost:3000
- ✅ MongoDB ready to connect

**Next step:** Set up MongoDB (local or Atlas) and start building features!

Want me to build the login page or any other module? Just say the word! 🔥
