# Basic Authentication API

A Node.js authentication API with Express and MongoDB that provides user management and authentication functionality.

## Features

- User Registration (Signup)
- User Login with JWT Authentication
- Password Management (Change/Update/Forgot Password)
- Protected Routes with JWT Verification
- User Management (Get All Users, Delete User)

## API Endpoints

### Public Routes

- POST `/api/user/signup` - Register a new user
- POST `/api/user/login` - Login user
- POST `/api/user/forgot-password` - Request password reset

### Protected Routes (Requires JWT Token)

- GET `/api/user/users` - Get all users
- DELETE `/api/user/user/:id` - Delete a user
- POST `/api/user/change-password` - Change password with old password
- PUT `/api/user/update-password` - Update password

## Installation

1. Clone the repository
```bash
git clone https://github.com/AbuzarIbrahim/Basic-Authentication-
cd Basic-Authentication-
```

2. Install dependencies
```bash
npm install
```

3. Create .env file in the root directory with following variables:
```
PORT=3000
DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=90d
```

4. Start the server
```bash
npm start
```

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT)
- Bcrypt for password hashing

## API Documentation

### Signup
```json
POST /api/user/signup
{
    "name": "User Name",
    "email": "user@example.com",
    "password": "password123"
}
```

### Login
```json
POST /api/user/login
{
    "email": "user@example.com",
    "password": "password123"
}
```

### Change Password
```json
POST /api/user/change-password
{
    "email": "user@example.com",
    "oldPassword": "current-password",
    "newPassword": "new-password"
}
```

### Update Password
```json
PUT /api/user/update-password
{
    "newPassword": "new-password"
}
```

### Protected Routes
All protected routes require the JWT token in the Authorization header:
```
Authorization: Bearer your-jwt-token
# BackendAuth
