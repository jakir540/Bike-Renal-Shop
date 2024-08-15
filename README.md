# Bike Rental Shop

This project is the backend for a Bike Rental Reservation System built using TypeScript, Express.js, Mongoose, and Zod for validation. The system provides a way for tourists and locals to rent bikes, manage bookings, and handle user authentication and authorization.

## Features

- User authentication and authorization
- CRUD operations for bikes
- Booking management
- Data validation with Zod
- Error handling and middleware

## Technologies Used

- **Programming Language**: TypeScript
- **Web Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Validation Library**: Zod

## Getting Started

### Prerequisites

- Node.js (version 12 or higher)
- MongoDB

### Installation

1. Clone the repository:

```bash
git clone: https://github.com/jakir540/Bike-Renal-Shop

live cite: https://bike-rental-shop.vercel.app/

```

2. Install dependencies:

### npm install

3. Start the server:

### npm run start

4. API Endpoints: post api

### POST /api/auth/signup

5.Login api :

### POST /api/auth/login

6. Get Profile:

### GET /api/users/me

## Request Headers: Authorization: Bearer jwt_token

7. Update Profile:

### PUT: /api/users/me

## Request Headers: Authorization: Bearer jwt_token

8 Create Bike (Admin Only):

### POST /api/bikes

## Request Headers: Authorization: Bearer jwt_token

9.  Get All Bikes:

### GET /api/bikes

10. Update Bike (Admin Only):

### PUT /api/bikes/:id

## Request Headers: Authorization: Bearer jwt_token

11. Delete Bike (Admin Only):

### DELETE /api/bikes/:id

## Request Headers: Authorization: Bearer jwt_token

12. ### Rental Routes

Create Rental:

## POST /api/rentals

## Request Headers: Authorization: Bearer jwt_token

13. ### Get All Rentals (Admin Only)

## GET /api/rentals

## Request Headers: Authorization: Bearer jwt_token

14. ### Get Rental by ID

## GET /api/rentals/:id

## Request Headers: Authorization: Bearer jwt_token

15. ### Update Rental (Admin Only)

## PUT /api/rentals/:id

## Request Headers: Authorization: Bearer jwt_token

## Middleware and Error Handling

16. Install Vercel CLI:
