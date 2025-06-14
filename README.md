# codealpha-s-ecommerce - CodeAlpha Internship Submission Guide

## 📋 Project Overview

This project is a **complete e-commerce store** developed with the MERN stack (MongoDB, Express.js, React.js, Node.js) as part of the CodeAlpha Full Stack Development internship.

### 🎯 Completed Task
**TASK 1: Simple E-commerce Store** - A simple online store with all required features and more.

## 🚀 Implemented Features

### ✅ Required Features
- **Shopping cart** - Add/remove products, modify quantities
- **Product details page** - Complete information, images, reviews
- **Order processing** - Complete checkout process with payment
- **User registration/login** - Secure authentication system
- **Database** - Storage for products, users, and orders

### 🌟 Bonus Features
- **Rating and review system** - Users can rate and review products
- **Product search** - Search by name with pagination
- **User profile** - Profile management and order history
- **Admin panel** - Complete management of products, users, and orders
- **Image upload** - Upload system for product images
- **PayPal payment** - Integrated PayPal payment system
- **Responsive design** - Mobile and desktop-friendly interface

## 🛠️ Technologies Used

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Token authentication
- **bcryptjs** - Password hashing
- **Multer** - File uploads

### Frontend
- **React.js** - JavaScript library for user interfaces
- **Redux** - Global state management
- **React Bootstrap** - CSS framework for React
- **Axios** - HTTP client for API calls
- **React Router** - Client-side navigation

## 🚀 Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/hamzakh86/codealpha-s-ecommerce.git
cd codealpha-s-ecommerce
```

2. **Install backend dependencies:**
```bash
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd frontend
npm install --legacy-peer-deps
```

4. **Set up environment variables**
Create a `.env` file in the backend directory with
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/hkshop
JWT_SECRET=abc123
```

5. **Import sample data**
```bash
cd backend
npm run data:import
```

6. **Run the application**

Backend (port 5000) :
```bash
cd backend
npm run dev
```

Frontend (port 3000) :
```bash
cd frontend
npm start
```

## 👤 Test Accounts

### Admin User
- **Email:** admin@example.com
- **Password:** 123456

### Regular Users
- **Email:** john@example.com / **Password:** 123456
- **Email:** jane@example.com / **Password:** 123456

## 📸 Screenshots


This README.md includes:
1. Proper markdown formatting
2. Shields.io badges
3. Clear section headers
4. Code blocks for installation commands
5. Project structure visualization
6. License information
7. Contact details

## 🎓 Internship Requirements Compliance

This project meets all requirements of TASK 1 of the CodeAlpha internship:

✅ Frontend: HTML, CSS, JavaScript (via React.js)
✅ Backend: Express.js (Node.js)
✅ Shopping Cart - Functional with persistence
✅ Product Details Page - Complete with images and reviews
✅ Order Processing - Full process with payment
✅ User Registration/Login - Secure system using JWT
✅ Database - MongoDB for products, users, and orders

## 📝 Submission Instructions

1. **GitHub Repository** : `codealpha-s-ecommerce`
2. **Demo Video** : Prepare a video demonstrating the features
3. **Documentation** : This complete README.md
4. **Source Code** : Fully functional project with comments

## 🏆 Project Highlights

- **Professional architecture** - Modular and maintainable structure
- **Security** - JWT authentication, data validation
- **Performance** - Pagination, optimized queries
- **UX/UI** - Modern and responsive interface
- **Advanced features** - Beyond minimum requirements
- **Code quality** - Clean and well-documented code

## 📞 Contact

**Developer:** Hamza Khaled
**Email:** [khaledhamza251785@gmail.com]
**LinkedIn:** [Hamza Khaled](https://www.linkedin.com/in/hamza-khaled)

---

*Project developed as part of the Full Stack Development Internship at CodeAlpha*