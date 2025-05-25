# Moon People Backend Server

Backend API server for the Moon People web platform built with Node.js, Express, and MongoDB.

## 🚀 Features (Phase 1 & 2)

- **User Authentication System**
  - User registration and login
  - JWT token-based authentication
  - Password hashing with bcrypt
  - User profile management
  - Role-based access (user, volunteer, admin)

- **API Endpoints**
  - RESTful API structure
  - Health check endpoint
  - Authentication routes
  - Category and service management
  - Error handling middleware

- **Database Integration**
  - MongoDB with Mongoose ODM
  - User data models
  - Category and service models
  - Data validation and schema enforcement

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone ssh://git@gitlab.tamk.cloud:1022/tamk-projects/summer-projects/2025/013-web-platform-moon-people.git
   cd 013-web-platform-moon-people/server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables**
   ```env
   PORT=8080
   MONGODB_URI=mongodb://localhost:27017/moon-people
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

5. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 🔑 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 8080 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/moon-people |
| `JWT_SECRET` | Secret key for JWT tokens | Required |
| `NODE_ENV` | Environment mode | development |

## 📡 API Endpoints

### Health Check
- **GET** `/api/health` - Check server and database status

### Authentication
- **POST** `/api/auth/register` - Register new user
- **POST** `/api/auth/login` - Login user
- **GET** `/api/auth/profile` - Get user profile (Protected)
- **PUT** `/api/auth/profile` - Update user profile (Protected)

### Categories
- **GET** `/api/categories` - Get all categories
- **POST** `/api/categories` - Create new category (Protected)
- **PUT** `/api/categories/:id` - Update category (Protected)
- **DELETE** `/api/categories/:id` - Delete category (Protected)

### Services
- **GET** `/api/services` - Get all services
- **POST** `/api/services` - Create new service (Protected)
- **PUT** `/api/services/:id` - Update service (Protected)
- **DELETE** `/api/services/:id` - Delete service (Protected)

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 📊 Data Models

### User Schema
```javascript
{
  fullName: String (required),
  email: String (required, unique),
  password: String (required, min: 6),
  city: String,
  role: String (enum: ['user', 'volunteer', 'admin']),
  createdAt: Date,
  updatedAt: Date
}
```

### Category Schema
```javascript
{
  name: String (required),
  description: String,
  // Additional fields as per your implementation
}
```

### Service Schema
```javascript
{
  title: String (required),
  description: String,
  category: ObjectId (ref: Category),
  // Additional fields as per your implementation
}
```

## 🧪 API Testing

### Register User
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "city": "Helsinki",
    "role": "user"
  }'
```

### Login User
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Health Check
```bash
curl http://localhost:8080/api/health
```

## 🏗️ Project Structure

```
server/
├── app.js                 # Express app configuration
├── server.js             # Server entry point
├── package.json          # Dependencies and scripts
├── config/
│   └── db.js            # Database configuration
├── controllers/
│   ├── auth.js          # Authentication controllers
│   ├── categories.js    # Category controllers
│   ├── services.js      # Service controllers
│   └── healthCheck.js   # Health check controller
├── middleware/
│   └── auth.js          # Authentication middleware
├── models/
│   ├── User.js          # User data model
│   ├── Category.js      # Category data model
│   └── Service.js       # Service data model
├── routes/
│   ├── api.js           # Main API routes
│   ├── auth.js          # Authentication routes
│   ├── categories.js    # Category routes
│   └── services.js      # Service routes
└── utils/
    └── jwt.js           # JWT utility functions
```

## 🛡️ Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- CORS configuration
- Error handling middleware
- MongoDB connection error handling

## 🔄 Development

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (to be implemented)

### Development Notes

- Server runs on port 8080 by default
- MongoDB connection is gracefully handled (server continues without DB if connection fails)
- CORS is enabled for frontend integration
- Morgan logger for request logging in development

## 🚀 Deployment

The server is configured for production deployment with:
- Static file serving for React frontend
- Environment-based configuration
- Error handling for production
- Process management ready

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add some feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Create merge request

## 📝 Next Steps (Future Phases)

- [ ] Add comprehensive test suite
- [ ] Implement file upload functionality
- [ ] Add email verification
- [ ] Implement password reset
- [ ] Add rate limiting
- [ ] Add API documentation with Swagger
- [ ] Add logging system
- [ ] Implement caching strategy

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check MongoDB is running
   - Verify MONGODB_URI in .env file
   - Server will continue running without DB connection

2. **JWT Token Error**
   - Ensure JWT_SECRET is set in .env
   - Check token format in Authorization header

3. **Port Already in Use**
   - Change PORT in .env file
   - Kill existing process on port 8080

## 📞 Support

For questions or issues, please create an issue in the GitLab repository or contact the development team.

---

**Phase 1 & 2 Complete** ✅
- User authentication system implemented
- Basic API structure established
- Database models created
- Error handling and middleware configured