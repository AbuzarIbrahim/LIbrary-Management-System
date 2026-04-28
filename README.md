# Library Management System

A professional Library Management System built with a Node.js/Express backend and a Next.js frontend. The system features strict TypeScript typing, Zod-based validation, and a premium UI with dark/light mode support.

## Getting Started

Follow these steps to initialize and run the project locally.

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or a cluster URI)
- npm or yarn

---

### 2. Backend Setup
The backend handles the API, database connections, and authentication.

```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Configure Environment Variables
# Create a .env file based on .env.example
# Ensure MONGODB_URI and JWT_SECRET are set

# Start the Backend Server
npm run start
```
*The backend will run on `http://localhost:5001`.*

---

### 3. Frontend Setup
The frontend provides the user interface for librarians and library users.

```bash
# Navigate to frontend directory
cd Frontend

# Install dependencies
npm install

# Start the Development Server
npm run dev
```
*The frontend will be accessible at `http://localhost:3000`.*

---

### 4. Project Features
- **Strict Typing**: Full TypeScript coverage across the frontend.
- **RBAC**: Role-Based Access Control (Admins can manage books/members; Users can only view).
- **Zod Validation**: Centralized validation schemas for all forms.
- **Dynamic Dashboard**: Real-time stats for collections, members, and transactions.
- **Modern UI**: Dark/Light mode toggle, smooth animations with Framer Motion, and Shadcn UI components.

## 📁 Project Structure
- `/Backend`: Express API, Mongoose Models, and Security Middleware.
- `/Frontend`: Next.js App Router, TanStack Query hooks, and Zod validation layers.

---

## 🔒 Security Note
Critical operations like **Issuing** and **Returning** books are strictly restricted to the `admin` role at the API level. Regular users can browse the catalog but cannot modify transaction states.
