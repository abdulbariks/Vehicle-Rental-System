# 🚗 Vehicle Rental System

A complete backend system for managing a vehicle rental service, built with Node.js, TypeScript, Express, and PostgreSQL.
This API supports role-based authentication, vehicle management, customer management, and booking operations.

---

## Live API URL:

## GitHub Repository: https://github.com/abdulbariks/Vehicle-Rental-System

---

## ✨ Features

## 🔐 Authentication & Authorization

- User registration and login with JWT.
- Role-based access: Admin and Customer.
- Password hashing with bcrypt.

## 🚗 Vehicle Management

- Admin can add, update, delete vehicles.
- Public can view available vehicles.
- Availability tracking for each vehicle.

## 👥 User Management

- Admin can view all users.
- Admin or user (self) can update profile.
- Admin can delete users (if no active bookings).

## 📅 Booking Management

- Create new rental bookings.
- Auto price calculation based on rental duration.
- Customers see only their own bookings.
- Admin sees all bookings.
- Cancel, return, or complete bookings.

---

## 🛠️ Technology Stack

- **Node.js** + **TypeScript**
- **Express.js** (web framework)
- **PostgreSQL** (database)
- **bcrypt** (password hashing)
- **jsonwebtoken** (JWT authentication)

---

## 📁 Project Structure

```ts
src/
├── config/
│   └── db.ts
├── modules/
│   ├── auth/
│   ├── users/
│   ├── vehicles/
│   ├── bookings/
├── middleware/
│   ├── auth.ts
├── app.ts
└── server.ts
```

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```ts
git clone https://github.com/abdulbariks/Vehicle-Rental-System.git
cd vehicle-rental-system
```

### 2️⃣ Install Dependencies

```ts
npm install
```

### 3️⃣ Create Environment Variables

```ts
DATABASE_URL = your_database_url;
JWT_SECRET = your_jwt_secret;
PORT = 5000;
```

### 5️⃣ Start Development Server

```ts
npm run dev
```

## ▶️ Usage Instructions

### Base URL

````ts
``` /api/v1 ``
````

### Authentication

- POST /auth/signup
- POST /auth/signin

### Vehicles

- POST /vehicles (Admin)
- GET /vehicles
- GET /vehicles/:vehicleId
- PUT /vehicles/:vehicleId (Admin)
- DELETE /vehicles/:vehicleId (Admin)

### Users

- GET /users (Admin)
- PUT /users/:userId (Admin or Self)
- DELETE /users/:userId (Admin)

### Bookings

- POST /bookings
- GET /bookings (Admin or Self)
- PUT /bookings/:bookingId (Admin or Self)

## 🚀 Deployment

- Vercel
