# Library Management System

A comprehensive Library Management System built with Node.js/Express backend and Next.js frontend. This application provides complete management of library books, members, transactions, and user authentication with role-based access control.

## Features

### Authentication & Authorization
- JWT-based authentication with email and password
- Role-based access control (Admin and User roles)
- Token verification middleware for protected routes
- Role-based restrictions (Admins manage operations, Users view data)
- Secure password hashing with bcryptjs

### Book & Media Management
- Add, update, and view books and movies in the library
- Track availability status for each item
- Serial number tracking for inventory management
- View complete list of all library media
- Support for both books and movies with unified interface

### Member Management
- Create and manage member profiles
- Generate unique membership numbers
- Set membership duration (6 months, 1 year, 2 years)
- Track membership status (active/cancelled)
- Monitor membership expiry dates

### Transaction Module
- Issue books/movies to members with due dates
- Track issued and returned transactions
- Record return dates and completion of transactions
- Mark fines as paid or pending
- Add remarks for special cases
- Comprehensive transaction history with statuses

### User Interface
- Clean, responsive design with dark/light mode toggle
- Real-time data updates with TanStack Query
- Interactive dashboard with statistics
- Framer Motion animations for smooth UI transitions
- Shadcn UI components with Radix UI primitives
- React Hook Form with Zod validation
- Lucide React icons throughout the interface

## Tech Stack

### Backend
- **Node.js & Express.js**: Fast, scalable server framework
- **MongoDB & Mongoose**: NoSQL database with schema validation
- **JWT (jsonwebtoken)**: Secure token-based authentication
- **Bcryptjs**: Password hashing and security
- **Helmet.js**: HTTP security headers middleware
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: Express rate limit for API protection
- **HTTP Server**: Native Node.js http module

### Frontend
- **Next.js**: Modern React framework with App Router
- **React 19**: Latest React features
- **TypeScript**: Strict type checking across the application
- **TanStack Query**: Server state management and data fetching
- **Axios**: HTTP client for API requests
- **React Hook Form**: Efficient form state management
- **Zod**: Runtime schema validation for data validation
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn UI**: High-quality, accessible UI component library
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Beautiful icon library
- **Next-themes**: Dark/light mode implementation
- **Radix UI**: Accessible UI component primitives

## Project Structure

```
Library-Management-System/
├── Backend/
│   ├── App.js
│   ├── server.js
│   ├── package.json
│   ├── config/
│   │   ├── database.js
│   │   └── index.js
│   ├── Controllers/
│   │   ├── bookController.js
│   │   ├── memberController.js
│   │   ├── transactionController.js
│   │   └── userController.js
│   ├── Models/
│   │   ├── books.js
│   │   ├── members.js
│   │   ├── transactions.js
│   │   └── users.js
│   ├── Routes/
│   │   ├── bookRoute.js
│   │   ├── memberRoute.js
│   │   ├── transactionRoute.js
│   │   └── userRoute.js
│   └── middleware/
│       ├── tokenAuth.js
│       └── validation.js
└── Frontend/
    ├── src/
    │   ├── app/
    │   │   ├── books/
    │   │   ├── chart/
    │   │   ├── login/
    │   │   ├── register/
    │   │   ├── transactions/
    │   │   ├── reports/
    │   │   └── maintenance/
    │   ├── components/
    │   ├── hooks/
    │   ├── actions/
    │   ├── providers/
    │   └── utils/
    ├── package.json
    ├── next.config.ts
    └── tsconfig.json
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or Atlas cluster)
- npm or yarn

### Backend Setup

1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the Backend directory with:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/library_db
   JWT_SECRET=your_super_secret_key_here
   JWT_EXPIRES_IN=7d
   NODE_ENV=development
   ```

4. Start the server:
   ```bash
   npm run start
   ```
   The backend API will be running on `http://localhost:3000`
   API endpoints will be available at `http://localhost:3000/api/v1/`

### Frontend Setup

1. Open a new terminal and navigate to the Frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be accessible at `http://localhost:3000`

## Available Scripts

### Backend
- `npm start`: Run the server in production/development mode

### Frontend
- `npm run dev`: Start the Next.js development server
- `npm run build`: Create an optimized production build
- `npm start`: Start the production server
- `npm run lint`: Run ESLint for code quality checks

## API Endpoints

### User Routes (`/api/v1/users`)
- `POST /signup` - Register a new user
- `POST /login` - Login and get JWT token
- `GET /` - Get all users (admin only)
- `PATCH /:id` - Update user details
- `DELETE /:id` - Delete user (admin only)

### Book Routes (`/api/v1/books`)
- `GET /` - Get all books
- `POST /` - Add a new book (admin only)
- `PATCH /:id` - Update book details (admin only)
- `DELETE /:id` - Delete a book (admin only)

### Member Routes (`/api/v1/members`)
- `GET /` - Get all members
- `POST /` - Create a new member (admin only)
- `PATCH /:id` - Update member details (admin only)
- `DELETE /:id` - Delete member (admin only)

### Transaction Routes (`/api/v1/transactions`)
- `GET /` - Get all transactions
- `POST /` - Issue a book to member (admin only)
- `PATCH /:id` - Update transaction status (admin only)
- `GET /:memberId` - Get member's transaction history

## Usage

1. **Register/Login**: Create an account or login with your credentials
2. **Dashboard**: View statistics for books, members, and pending returns
3. **Book Management** (Admin only): Add and manage books/movies in maintenance section
4. **Member Management** (Admin only): Create and manage member profiles
5. **Transactions**: Issue books to members and track returns
6. **Reports**: View transaction history and member activity

## Key Features Explained

### Role-Based Access Control
- **Admin**: Can add/update/delete books and members, approve transactions, manage users
- **User**: Can view available books and members, see transaction history

### Security
- All API endpoints are protected with JWT token verification
- Critical operations (issue/return books) are restricted to admin role
- Passwords are hashed using bcryptjs before storage
- Rate limiting applied to prevent abuse
- Helmet.js secures HTTP headers

## License

This project is open source and available under the MIT License.
