# restaurant-

🍔 Food App (Backend)

A Node.js + Express.js + MongoDB based backend API for a Food Delivery / Restaurant Management system.
It includes authentication, restaurant and category management, and secure data handling with JWT & bcrypt.

🚀 Features

User authentication (Register, Login, JWT protected routes)

Email verification & password reset via SMTP

Restaurant management (CRUD operations with foods, coords, ratings, etc.)

Category management (CRUD with images)

Secure password hashing using bcrypt

RESTful API design, ready to integrate with frontend

🛠️ Tech Stack

Node.js + Express.js

MongoDB + Mongoose

JWT Authentication

Bcrypt for password hashing

Nodemailer for sending emails (SMTP)

Multer / Cloudinary (optional) for image handling

Postman for API testing

vironment Variables

Create a .env file in the root of your project with the following:

# Server

PORT=5000

# Database

MONGO_URI=mongodb://localhost:27017/foodapp

# JWT

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# Bcrypt

BCRYPT_SALT=10

# SMTP (Email)

SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_email_password
SMTP_FROM="Food App <no-reply@foodapp.com>"

📦 Installation & Setup

# Clone repo

git clone https://github.com/jeettamang/food-app.git
cd food-app

# Install dependencies

npm install

# Run in dev mode

npm run dev

# Run in production

npm start

📡 API Endpoints
🔑 Auth

POST /api/auth/register → Register user

POST /api/auth/login → Login user

POST /api/auth/verify-email → Verify email via OTP

POST /api/auth/forget-password → Send reset OTP

POST /api/auth/verify-otp → Verify reset OTP

POST /api/auth/reset-password → Reset password

🍴 Restaurants

POST /api/restaurants → Create restaurant

GET /api/restaurants → Get all restaurants

GET /api/restaurants/:id → Get single restaurant

PUT /api/restaurants/:id → Update restaurant

DELETE /api/restaurants/:id → Delete restaurant

🗂️ Categories

POST /api/categories → Create category

GET /api/categories → Get all categories

PUT /api/categories/:id → Update category

DELETE /api/categories/:id → Delete category

🧪 Testing with Postman

Import API routes into Postman

Set Content-Type: application/json

Add Authorization: Bearer <token> header for protected routes

Example payload for creating a restaurant:

{
"title": "Pizza Hut",
"imageUrl": "https://example.com/pizza.jpg",
"foods": [
{ "name": "Cheese Pizza", "price": 12 }
],
"openTime": "10:00",
"closeTime": "22:00"
}
