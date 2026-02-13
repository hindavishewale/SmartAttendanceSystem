# Deployment Guide - Smart Attendance System

## 📋 Prerequisites
- GitHub account
- Render account (https://render.com)
- Vercel account (https://vercel.com)
- Railway account (https://railway.app) OR PlanetScale account (https://planetscale.com)

---

## 🗄️ Step 1: Deploy MySQL Database

### Option A: Railway (Recommended - Easier)

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Provision MySQL"
   - Wait for deployment

3. **Get Database Credentials**
   - Click on MySQL service
   - Go to "Variables" tab
   - Copy these values:
     ```
     MYSQLHOST
     MYSQLPORT
     MYSQLDATABASE
     MYSQLUSER
     MYSQLPASSWORD
     ```

4. **Connection String Format**
   ```
   jdbc:mysql://MYSQLHOST:MYSQLPORT/MYSQLDATABASE
   ```

### Option B: PlanetScale

1. **Create PlanetScale Account**
   - Go to https://planetscale.com
   - Sign up with GitHub

2. **Create Database**
   - Click "Create database"
   - Name: `smart-attendance-db`
   - Region: Choose closest to you
   - Click "Create database"

3. **Get Connection String**
   - Click "Connect"
   - Select "Java" from dropdown
   - Copy the JDBC URL
   - Format: `jdbc:mysql://aws.connect.psdb.cloud/smart-attendance-db?sslMode=VERIFY_IDENTITY`

4. **Get Credentials**
   - Username and Password will be shown
   - Save them securely

---

## 🚀 Step 2: Deploy Backend on Render

1. **Push Code to GitHub**
   ```bash
   cd SmartAttendanceSystem
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

3. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select "SmartAttendanceSystem" repo

4. **Configure Service**
   ```
   Name: smart-attendance-backend
   Region: Choose closest to you
   Branch: main
   Root Directory: backend
   Runtime: Java
   Build Command: mvn clean install
   Start Command: java -jar target/smart-attendance-system-1.0.0.jar
   Instance Type: Free
   ```

5. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable"
   
   **For Railway:**
   ```
   DB_HOST=your-railway-host.railway.app
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=your-railway-password
   ```
   
   **For PlanetScale:**
   ```
   DB_HOST=aws.connect.psdb.cloud
   DB_PORT=3306
   DB_USERNAME=your-planetscale-username
   DB_PASSWORD=your-planetscale-password
   ```

6. **Deploy**
   - Click "Create Web Service"
   - Wait 5-10 minutes for deployment
   - Copy your backend URL: `https://smart-attendance-backend.onrender.com`

7. **Test Backend**
   - Visit: `https://your-backend-url.onrender.com/api/students`
   - Should return: `{"success":true,"message":"Students retrieved successfully","data":[]}`

---

## 🌐 Step 3: Deploy Frontend on Vercel

### Method 1: Vercel Dashboard (Easiest)

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Select "SmartAttendanceSystem"

3. **Configure Project**
   ```
   Framework Preset: Create React App
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: build
   Install Command: npm install
   ```

4. **Add Environment Variable**
   - Click "Environment Variables"
   - Add:
     ```
     Name: REACT_APP_API_URL
     Value: https://your-backend-url.onrender.com/api
     ```
   - Select all environments (Production, Preview, Development)

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app will be live at: `https://your-app.vercel.app`

### Method 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd frontend
   vercel
   ```

4. **Add Environment Variable**
   ```bash
   vercel env add REACT_APP_API_URL
   # Enter: https://your-backend-url.onrender.com/api
   # Select: Production, Preview, Development
   ```

5. **Redeploy**
   ```bash
   vercel --prod
   ```

---

## ✅ Step 4: Verify Deployment

1. **Test Backend**
   ```bash
   curl https://your-backend-url.onrender.com/api/students
   ```

2. **Test Frontend**
   - Visit: `https://your-app.vercel.app`
   - Try adding a student
   - Try adding attendance

3. **Check Database**
   - Railway: Check "Data" tab in Railway dashboard
   - PlanetScale: Use PlanetScale console

---

## 🔧 Troubleshooting

### Backend Issues

**Problem: "Access denied for user"**
- Solution: Check DB_USERNAME and DB_PASSWORD in Render environment variables

**Problem: "Connection timeout"**
- Solution: Check DB_HOST and DB_PORT are correct

**Problem: "Database not found"**
- Solution: Database is auto-created. Check application.properties has `createDatabaseIfNotExist=true`

### Frontend Issues

**Problem: "Network Error" or "Failed to fetch"**
- Solution: Check REACT_APP_API_URL is correct (must include `/api`)
- Verify backend is running

**Problem: "CORS Error"**
- Solution: Backend already has CORS enabled. Clear browser cache.

### Database Issues

**Problem: Railway database sleeping**
- Solution: Free tier sleeps after inactivity. Upgrade to paid plan or use PlanetScale.

**Problem: PlanetScale connection issues**
- Solution: Ensure SSL mode is correct in connection string

---

## 📝 Environment Variables Summary

### Backend (Render)
```
DB_HOST=your-database-host
DB_PORT=3306
DB_USERNAME=your-username
DB_PASSWORD=your-password
```

### Frontend (Vercel)
```
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

---

## 🎉 Your App is Live!

- **Frontend**: https://your-app.vercel.app
- **Backend**: https://your-backend-url.onrender.com
- **Database**: Hosted on Railway/PlanetScale

---

## 💡 Tips

1. **Free Tier Limitations**
   - Render: Backend sleeps after 15 min inactivity (takes 30s to wake up)
   - Railway: 500 hours/month free
   - Vercel: Unlimited deployments

2. **Custom Domain**
   - Vercel: Settings → Domains → Add your domain
   - Render: Settings → Custom Domain

3. **Monitoring**
   - Render: Check logs in dashboard
   - Vercel: Check deployment logs
   - Railway: Monitor database usage

4. **Updates**
   - Push to GitHub → Auto-deploys on Vercel and Render

---

## 🔄 Continuous Deployment

Both Render and Vercel auto-deploy when you push to GitHub:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Your changes will be live in 2-5 minutes! 🚀
