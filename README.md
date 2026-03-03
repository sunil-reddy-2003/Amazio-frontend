# 🛒 Amazio – Full Stack E-Commerce Application

🔗 **Live Demo:** https://amazio-frontend.vercel.app/

A production-style full stack e-commerce web application built using **React.js and Spring Boot**, implementing authentication, cart management, order processing, and admin product control.

---

## 🚀 Features

### 👤 User Features
- JWT-based Authentication
- Product browsing with category filtering
- Search functionality
- Add to Cart / Remove from Cart
- Shipping address management
- Cash on Delivery (COD)
- Order placement
- Order history & detailed order tracking
- Protected routes for authenticated users

### 🛠️ Admin Features
- Admin login authentication
- Add new products
- Update existing products
- Delete products
- View all products
- Protected admin routes

---

## 🧱 Tech Stack

### Frontend
- React.js
- React Router DOM
- Context API
- Tailwind CSS
- Axios
- Vite

### Backend
- Spring Boot
- REST APIs
- JWT Authentication
- PostgreSQL

---

## 🔐 Authentication Flow

1. User logs in  
2. Backend returns JWT token  
3. Token stored in localStorage  
4. Token attached in Authorization header for protected APIs  
5. ProtectedRoute and AdminProtectedRoute guard private pages  

---

## 🛍️ Order Flow

Cart → Shipping → Payment (Cash on Delivery) → Order Creation → Orders Page → Order Details

---

## 📂 Project Structure (Frontend)

```bash
src/
├── assets/        
├── components/    
├── context/       
├── layouts/       
├── pages/         
├── App.css        
├── App.jsx        
├── index.css      
└── main.jsx       
```

---

## ⚙️ Run Locally

Clone the repository:

```bash
git clone https://github.com/sunil-reddy-2003/Amazio-frontend
cd amazio

Install dependencies:
npm install

Create a .env file:
VITE_API_BASE_URL=http://localhost:9090

Run the project:
npm run dev
