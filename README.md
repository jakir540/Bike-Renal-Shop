# TechMart API

TechMart is an API for managing products in an store management application. It provides endpoints for creating, updating, deleting, and searching for products.

## Features

- Create a new product
- Get all products
- Get a single product by ID
- Update a product by ID
- Delete a product by ID
- Search for products by name
- Create order
- Get all orders
- Get a specific order search using email

## Technologies Used

- Node.js
- Express.js
- Mongoose (MongoDB)
- Joi (Validation)
- TypeScript

## Getting Started

### Prerequisites

- Node.js (version 12 or higher)
- MongoDB

### Installation

1. Clone the repository:

```bash
git clone https://github.com/jakir540/techmart

live cite: https://techmart-three.vercel.app/

```

2. Install dependencies:

### npm install

3. Start the server:

### npm run start:dev

4. API Endpoints: post api

### POST /api/products

5.Get All Products:

### GET /api/products/:productId

6. Update product:

### PUT /api/products/:productId

7. Delete specific product:

### DELETE /api/products/:productId

8.searce product using by name:

### GET /api/products?searchTerm=searchTerm

9. create order:

### POST /api/orders

10. Get Order:

### GET /api/orders

11. Install Vercel CLI:
