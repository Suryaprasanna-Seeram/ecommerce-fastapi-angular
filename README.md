**E-Commerce Application (Full Stack)**

A full-stack E-Commerce application built using FastAPI (backend) and Angular Standalone (frontend).
The project demonstrates JWT authentication, role-based access (User/Admin), REST APIs, MySQL with raw SQL, and Cypress end-to-end automation testing.

 **Tech Stack**
🔹 Backend
=> Python 3.12+
=> FastAPI
=> MySQL 8.x
=> Raw SQL (no ORM)
=> JWT Authentication
=> Pydantic Models
=> MySQL Connector

🔹 Frontend
=> Angular (Standalone – latest)
=> TypeScript
=> HTML & CSS

🔹 Testing
=> Cypress (E2E Automation)

**Project Structure**
ecommerce-project/
│
├── backend/
│   ├── main.py
│   ├── auth.py
│   ├── db.py
│   ├── models.py
│   ├── .env
│   └── venv/
│
└── frontend/
    ├── src/
    │   ├── app/
    │   └── ...
    ├── cypress/
    │   └── e2e/
    │       ├── login.cy.js
    │       ├── register.cy.js
    │       ├── products.cy.js
    │       ├── cart.cy.js
    │       ├── admin-login.cy.js
    │       ├── add-product.cy.js
    │       └── main.cy.js
    ├── cypress.config.js
    └── angular.json

**Features**
  1. User Features
   => User Registration
   => User Login (JWT authentication)
   => View Products
   => Add Product to Cart
   => Update Cart Quantity
   => Remove Product from Cart
   => User-specific cart using JWT

  2. Admin Features
   => Admin Login
   => Add New Products
   => Role-based UI 
   => Protected Admin APIs

**Database Setup (MySQL)**
   1. Create Database
      CREATE DATABASE ecommerce;
      USE ecommerce;

   2. Create Tables

     CREATE TABLE users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(20) DEFAULT 'user'
       );
  
     CREATE TABLE products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      description TEXT,
      price DECIMAL(10,2)
      );

    CREATE TABLE cart (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      product_id INT,
      quantity INT,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
      );

  3. Seed Sample Products
    INSERT INTO products (name, description, price) VALUES
    ('Laptop', 'High performance laptop', 75000),
    ('Phone', 'Smartphone with good camera', 30000),
    ('Headphones', 'Noise cancelling headphones', 5000);

  **Backend Setup & Run**
1. Create Virtual Environment
  cd backend
  python -m venv venv

2. Activate Virtual Environment
  Windows
  venv\Scripts\activate

3. Install Dependencies
  pip install fastapi uvicorn mysql-connector-python python-jose passlib[bcrypt] python-dotenv python-multipart

4. Configure Environment Variables
  Create .env inside backend/:
      DB_HOST=localhost
      DB_USER=root
      DB_PASSWORD=your_mysql_password
      DB_NAME=ecommerce_db
      SECRET_KEY=your_secret_key
   
5. Run Backend Server
 uvicorn main:app --reload
Backend runs at:
 http://127.0.0.1:8000
 Swagger UI: http://127.0.0.1:8000/docs

**Frontend Setup & Run**
1. Install Dependencies
cd frontend
npm install

 2. Run Angular App
 ng serve
  Frontend runs at:
  http://localhost:4200

**Cypress Automation Testing**
 Test Files
   - login.cy.js
   - register.cy.js
   - products.cy.js
   - cart.cy.js
   - admin-login.cy.js
   - add-product.cy.js
   - main.cy.js (full flow)

 **Run Cypress (Interactive)**
  npx cypress open

 **Run Cypress (Headless)**
  npx cypress run

 **Notes**
  - JWT is used for securing APIs
  - Role-based access for Admin & User
  - Raw SQL is used instead of ORM
  - Frontend uses Angular Standalone components
  - Cypress validates complete user & admin flows

 **Author**
Seeram Surya Prasanna







