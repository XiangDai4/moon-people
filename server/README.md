# Moon People Backend Server

Backend API server for the Moon People web platform built with Node.js, Express, and MongoDB.

## 🚀 Features (Phase 1 & 2)

- **User Authentication System**
  - User registration and login
  - JWT token-based authentication
  - Password hashing with bcrypt
  - User profile management
  - Role-based access (user, volunteer, admin)

- **Support Services Directory**
  - Category management system
  - Service listings with filtering
  - Admin controls for content management
  - Active/inactive status control

- **API Endpoints**
  - RESTful API structure
  - Health check endpoint
  - Authentication routes
  - Category and service management
  - Comprehensive error handling middleware

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

## 🔌 Frontend Integration

### Base URL
```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

### Authentication Header
```javascript
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

### CORS Configuration
- Enabled for `http://localhost:3000` (React dev server)
- Supports credentials and all standard headers
- Allows GET, POST, PUT, DELETE methods

## 📡 API Endpoints

### Health Check
- **GET** `/api/health` - Check server and database status

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "database": "connected",
  "timestamp": "2025-05-25T10:30:00.000Z"
}
```

### Authentication

#### Register User
- **POST** `/api/auth/register` - Register new user

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "city": "Helsinki",
  "role": "user"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "fullName": "John Doe",
      "email": "john@example.com",
      "city": "Helsinki",
      "role": "user",
      "createdAt": "2025-05-25T10:30:00.000Z"
    }
  }
}
```

#### Login User
- **POST** `/api/auth/login` - Login user

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "fullName": "John Doe",
      "email": "john@example.com",
      "city": "Helsinki",
      "role": "user"
    }
  }
}
```

#### Get User Profile
- **GET** `/api/auth/profile` - Get user profile (Protected)

**Headers Required:**
```
Authorization: Bearer <jwt_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "city": "Helsinki",
    "role": "user",
    "createdAt": "2025-05-25T10:30:00.000Z",
    "updatedAt": "2025-05-25T10:30:00.000Z"
  }
}
```

#### Update User Profile
- **PUT** `/api/auth/profile` - Update user profile (Protected)

**Request Body:**
```json
{
  "fullName": "John Smith",
  "city": "Tampere"
}
```

### Categories

#### Get All Categories
- **GET** `/api/categories` - Get all active categories

**Query Parameters:**
- `active` (boolean) - Filter by active status (default: true for public, all for admin)

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Medical Support",
      "description": "Healthcare and medical assistance services",
      "icon": "medical",
      "isActive": true,
      "createdAt": "2025-05-25T10:30:00.000Z",
      "updatedAt": "2025-05-25T10:30:00.000Z"
    }
  ]
}
```

#### Create Category
- **POST** `/api/categories` - Create new category (Admin Only)

**Request Body:**
```json
{
  "name": "Transportation",
  "description": "Transport and mobility assistance",
  "icon": "transport"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Category created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "name": "Transportation",
    "description": "Transport and mobility assistance",
    "icon": "transport",
    "isActive": true,
    "createdAt": "2025-05-25T10:30:00.000Z",
    "updatedAt": "2025-05-25T10:30:00.000Z"
  }
}
```

#### Update Category
- **PUT** `/api/categories/:id` - Update category (Admin Only)

#### Delete Category
- **DELETE** `/api/categories/:id` - Delete category (Admin Only)

### Services

#### Get All Services
- **GET** `/api/services` - Get services with filtering

**Query Parameters:**
- `active` (boolean) - Filter by active status (default: true)
- `category` (string) - Filter by category ID
- `city` (string) - Filter by city
- `language` (string) - Filter by supported language

**Example:**
```
GET /api/services?category=507f1f77bcf86cd799439012&city=Helsinki&active=true
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "title": "Cancer Support Group Helsinki",
      "description": "Weekly support group meetings for cancer patients",
      "provider": "Helsinki Health Center",
      "contactEmail": "support@helsinkihealth.fi",
      "contactPhone": "+358 40 123 4567",
      "website": "https://helsinkihealth.fi/cancer-support",
      "address": "Mannerheimintie 123, Helsinki",
      "city": "Helsinki",
      "languages": ["Finnish", "English"],
      "category": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Medical Support",
        "icon": "medical"
      },
      "isActive": true,
      "createdAt": "2025-05-25T10:30:00.000Z",
      "updatedAt": "2025-05-25T10:30:00.000Z"
    }
  ]
}
```

#### Get Service by ID
- **GET** `/api/services/:id` - Get specific service details

#### Create Service
- **POST** `/api/services` - Create new service (Admin Only)

**Request Body:**
```json
{
  "title": "Nutrition Counseling",
  "description": "Professional nutrition guidance for cancer patients",
  "provider": "Tampere Wellness Center",
  "contactEmail": "nutrition@tampere-wellness.fi",
  "contactPhone": "+358 40 987 6543",
  "website": "https://tampere-wellness.fi",
  "address": "Hämeenkatu 456, Tampere",
  "city": "Tampere",
  "languages": ["Finnish", "English", "Swedish"],
  "category": "507f1f77bcf86cd799439012"
}
```

#### Update Service
- **PUT** `/api/services/:id` - Update service (Admin Only)

#### Delete Service
- **DELETE** `/api/services/:id` - Delete service (Admin Only)

## 📊 Data Models

### User Schema
```javascript
{
  _id: ObjectId,
  fullName: String (required, min: 2, max: 100),
  email: String (required, unique, lowercase),
  password: String (required, min: 6, hashed),
  city: String (max: 50),
  role: String (enum: ['user', 'volunteer', 'admin'], default: 'user'),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Category Schema
```javascript
{
  _id: ObjectId,
  name: String (required, unique, trim, max: 100),
  description: String (max: 500),
  icon: String (max: 50),
  isActive: Boolean (default: true),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Service Schema
```javascript
{
  _id: ObjectId,
  title: String (required, trim, max: 200),
  description: String (required, max: 2000),
  provider: String (required, max: 200),
  contactEmail: String (required, email format),
  contactPhone: String (max: 20),
  website: String (URL format),
  address: String (max: 300),
  city: String (required, max: 100),
  languages: [String] (array of supported languages),
  category: ObjectId (ref: 'Category', required),
  isActive: Boolean (default: true),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 📥 API Response Formats

### Success Response Structure
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { /* response data */ }
}
```

### Error Response Structure
```json
{
  "success": false,
  "error": "Error type",
  "message": "Human readable error message",
  "details": { /* validation errors if applicable */ }
}
```

### Validation Error Example
```json
{
  "success": false,
  "error": "Validation Error",
  "message": "Please check the provided data",
  "details": {
    "email": "Email is required",
    "password": "Password must be at least 6 characters"
  }
}
```

## 🔢 HTTP Status Codes

| Code | Description | Usage |
|------|-------------|-------|
| 200 | OK | Successful GET, PUT requests |
| 201 | Created | Successful POST requests |
| 400 | Bad Request | Invalid request data/validation errors |
| 401 | Unauthorized | Missing or invalid authentication token |
| 403 | Forbidden | User doesn't have required permissions |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate resource (e.g., email already exists) |
| 500 | Internal Server Error | Server-side errors |

## 🔐 Authentication

### JWT Token Details
- **Algorithm**: HS256
- **Expiration**: 24 hours
- **Payload includes**: user ID, email, role
- **Header format**: `Authorization: Bearer <token>`

### Token Payload Structure
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "email": "john@example.com",
  "role": "user",
  "iat": 1643723400,
  "exp": 1643809800
}
```

### Role-Based Access
- **Public routes**: Health check, login, register, get categories/services
- **User routes**: Profile management
- **Admin routes**: Category/service CRUD operations, user management

## 🧪 API Testing Examples

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

### Get User Profile (with token)
```bash
curl -X GET http://localhost:8080/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### Create Category (Admin)
```bash
curl -X POST http://localhost:8080/api/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN_HERE" \
  -d '{
    "name": "Transportation",
    "description": "Transport and mobility assistance",
    "icon": "transport"
  }'
```

### Get Services with Filters
```bash
curl "http://localhost:8080/api/services?city=Helsinki&active=true"
```

## 🏗️ Project Structure

```
server/
├── app.js                 # Express app configuration
├── server.js             # Server entry point
├── package.json          # Dependencies and scripts
├── .env.example          # Environment variables template
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

- **Password Security**: Bcrypt hashing with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Mongoose schema validation and sanitization
- **CORS Configuration**: Controlled cross-origin access
- **Error Handling**: Comprehensive error middleware
- **Role-Based Access**: Admin/user permission levels
- **MongoDB Security**: Connection error handling and validation

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
- Automatic server restart on file changes in development mode

### Creating Admin Users

To create an admin user for testing, use MongoDB directly:

```javascript
// Connect to MongoDB
use moon-people

// Update existing user to admin
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)

// Or create new admin user (after registering normally)
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## 🚀 Deployment

The server is configured for production deployment with:
- Static file serving for React frontend build
- Environment-based configuration
- Production error handling
- Process management ready
- CORS configured for production domains

### Production Environment Variables
```env
NODE_ENV=production
PORT=8080
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/moon-people
JWT_SECRET=your_secure_production_jwt_secret
```

## 🐛 Common Errors & Troubleshooting

### Authentication Errors

**401 Unauthorized - Invalid Token**
```json
{
  "success": false,
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```
- Check token format in Authorization header
- Verify token hasn't expired (24-hour limit)
- Ensure JWT_SECRET matches between token creation and verification

**403 Forbidden - Insufficient Permissions**
```json
{
  "success": false,
  "error": "Forbidden",
  "message": "Admin access required"
}
```
- User doesn't have admin role
- Check user role in database

### Validation Errors

**400 Bad Request - Missing Required Fields**
```json
{
  "success": false,
  "error": "Validation Error",
  "message": "Please check the provided data",
  "details": {
    "email": "Email is required",
    "password": "Password must be at least 6 characters"
  }
}
```

**409 Conflict - Duplicate Email**
```json
{
  "success": false,
  "error": "Conflict",
  "message": "User with this email already exists"
}
```

### Database Errors

**500 Internal Server Error - Database Connection**
```json
{
  "success": false,
  "error": "Database Error",
  "message": "Unable to connect to database"
}
```
- Check MongoDB connection string
- Verify database is running
- Check network connectivity

### Common Setup Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running locally or connection string is correct
   - Check firewall settings for remote databases
   - Server will continue running without DB connection

2. **JWT Token Error**
   - Ensure JWT_SECRET is set in .env file
   - Check token format: `Bearer <token>`
   - Verify token hasn't expired

3. **Port Already in Use**
   - Change PORT in .env file
   - Kill existing process: `lsof -ti:8080 | xargs kill -9`

4. **CORS Issues**
   - Frontend URL must match CORS configuration
   - Check browser console for CORS errors
   - Verify API calls include proper headers

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Follow existing code patterns and naming conventions
3. Add appropriate error handling and validation
4. Update API documentation if adding new endpoints
5. Test all endpoints before committing
6. Commit changes: `git commit -m 'Add some feature'`
7. Push to branch: `git push origin feature/your-feature`
8. Create merge request

## 📝 Next Steps (Future Phases)

- [ ] **Phase 3**: Resource Library endpoints
- [ ] **Phase 4**: Volunteer registration system
- [ ] **Phase 5**: Community features (forums, messaging)
- [ ] **Phase 6**: Booking system for services
- [ ] Add comprehensive test suite
- [ ] Implement file upload functionality
- [ ] Add email verification system
- [ ] Implement password reset functionality
- [ ] Add rate limiting middleware
- [ ] Add API documentation with Swagger
- [ ] Implement structured logging system
- [ ] Add caching strategy (Redis)
- [ ] Add API versioning
- [ ] Implement real-time features (Socket.io)

## 📞 Support

For questions or issues:
- Create an issue in the GitLab repository
- Contact the development team
- Check the troubleshooting section above

---

**Phase 1 & 2 Complete** ✅
- ✅ User authentication system implemented
- ✅ Role-based authorization working
- ✅ Support services directory functional
- ✅ Category management system complete
- ✅ Service filtering and management operational
- ✅ Admin interfaces fully functional
- ✅ Error handling and validation comprehensive
- ✅ Frontend integration ready