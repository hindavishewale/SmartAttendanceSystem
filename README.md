# Smart Attendance System

A full-stack web application for managing student attendance with Spring Boot backend and React frontend.

## 🚀 Live Demo

- **Frontend**: [Deploy on Vercel](https://vercel.com)
- **Backend**: [Deploy on Render](https://render.com)
- **Database**: Railway or PlanetScale

## 📋 Technology Stack

### Backend
- Java 21
- Spring Boot 3.2.0
- Maven
- MySQL
- JPA (Hibernate)
- REST APIs
- Global Exception Handling
- Bean Validation

### Frontend
- React 18
- React Router
- Axios
- Bootstrap 5
- Functional Components
- React Hooks

## 📁 Project Structure

```
SmartAttendanceSystem/
├── backend/
│   ├── src/main/java/com/attendance/
│   │   ├── controller/
│   │   ├── service/
│   │   ├── repository/
│   │   ├── model/
│   │   ├── dto/
│   │   ├── exception/
│   │   └── config/
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
├── DEPLOYMENT.md
└── README.md
```

## 🛠️ Local Setup

### Backend Setup

1. **Prerequisites**
   - Java 21
   - Maven
   - MySQL

2. **Configure Database**
   - Update `backend/src/main/resources/application.properties`
   ```properties
   spring.datasource.password=YOUR_MYSQL_PASSWORD
   ```

3. **Run Backend**
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```
   Backend runs on: http://localhost:8080

### Frontend Setup

1. **Prerequisites**
   - Node.js (v16+)
   - npm

2. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Configure Backend URL**
   - Update `.env` file
   ```
   REACT_APP_API_URL=http://localhost:8080/api
   ```

4. **Run Frontend**
   ```bash
   npm start
   ```
   Frontend runs on: http://localhost:3000

## 🚀 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy

1. **Database**: Railway or PlanetScale
2. **Backend**: Render
3. **Frontend**: Vercel

## 📡 API Endpoints

### Students
- `POST /api/students` - Add student
- `GET /api/students` - Get all students
- `GET /api/students/{id}` - Get student by ID
- `PUT /api/students/{id}` - Update student
- `DELETE /api/students/{id}` - Delete student

### Attendance
- `POST /api/attendance` - Add attendance
- `GET /api/attendance` - Get all attendance
- `GET /api/attendance/{id}` - Get attendance by ID
- `PUT /api/attendance/{id}` - Update attendance
- `DELETE /api/attendance/{id}` - Delete attendance

## ✨ Features

- ✅ Student Management (CRUD)
- ✅ Attendance Management (CRUD)
- ✅ Responsive UI with Bootstrap
- ✅ RESTful API architecture
- ✅ Global exception handling
- ✅ Bean validation
- ✅ Loading indicators
- ✅ Error handling
- ✅ Success messages
- ✅ CORS enabled
- ✅ Production-ready

## 🗄️ Database Schema

### students
- id (PK, Auto Increment)
- name (VARCHAR, NOT NULL)

### attendance
- attendance_id (PK, Auto Increment)
- student_id (FK → students.id)
- date (DATE, NOT NULL)
- status (VARCHAR: Present/Absent)

## 📝 Environment Variables

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

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Spring Boot Documentation
- React Documentation
- Bootstrap Documentation
