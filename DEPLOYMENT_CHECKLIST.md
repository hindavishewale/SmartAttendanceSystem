# Quick Deployment Checklist

## ✅ Pre-Deployment

- [ ] Test backend locally: `cd backend && mvn spring-boot:run`
- [ ] Test frontend locally: `cd frontend && npm start`
- [ ] Verify MySQL connection works locally
- [ ] Push code to GitHub

## 🗄️ Database Setup (Choose One)

### Railway
```bash
1. Go to https://railway.app
2. New Project → Provision MySQL
3. Copy credentials from Variables tab
```

### PlanetScale
```bash
1. Go to https://planetscale.com
2. Create database: smart-attendance-db
3. Get connection string (Java format)
```

## 🚀 Backend Deployment (Render)

```bash
1. Go to https://render.com
2. New → Web Service
3. Connect GitHub repo
4. Configure:
   - Root Directory: backend
   - Build: mvn clean install
   - Start: java -jar target/smart-attendance-system-1.0.0.jar
5. Add Environment Variables:
   - DB_HOST
   - DB_PORT=3306
   - DB_USERNAME
   - DB_PASSWORD
6. Deploy
7. Copy backend URL
```

## 🌐 Frontend Deployment (Vercel)

```bash
1. Go to https://vercel.com
2. Import GitHub repo
3. Configure:
   - Root Directory: frontend
   - Framework: Create React App
4. Add Environment Variable:
   - REACT_APP_API_URL=https://your-backend.onrender.com/api
5. Deploy
```

## ✅ Verification

- [ ] Backend API works: `https://your-backend.onrender.com/api/students`
- [ ] Frontend loads: `https://your-app.vercel.app`
- [ ] Can add student
- [ ] Can add attendance
- [ ] Database stores data

## 🎉 Done!

Your app is live:
- Frontend: https://your-app.vercel.app
- Backend: https://your-backend.onrender.com
- Database: Railway/PlanetScale

## 🔄 Future Updates

```bash
git add .
git commit -m "Your changes"
git push origin main
```

Auto-deploys in 2-5 minutes! 🚀
