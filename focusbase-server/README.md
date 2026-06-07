
# FocusBase Task API

A robust, secure, and production-ready RESTful API backend built to manage personal user task workflows with explicit resource ownership.

## 🚀 Features
- **User Identity System:** Registration & secure authentication using hashed passwords and stateless JSON Web Tokens (JWT).
- **Resource Guardrails:** Complete CRUD operations (Create, Read, Update, Delete, Patch) where users can only manage their own tasks.
- **Enterprise Security:** Hardened with Helmet security headers and protection against brute-force login attacks using rate-limiting middleware.
- **Clean Architecture:** Strict separation of layers into Routes, Controllers, Data Models, and Validation Middlewares.

## 🛠️ Tech Stack
- **Runtime Environment:** Node.js
- **Web Framework:** Express.js
- **Database Layer:** MongoDB Atlas via Mongoose ODM
- **Security & Utilities:** `bcryptjs`, `jsonwebtoken`, `helmet`, `express-rate-limit`, `dotenv`

## ⚙️ Environment Variables
To execute this project locally, create a `.env` file in the root directory and specify the following variables:
```env

MONGO_URI=mongodb+srv://muhammadabdullah4974_db_user:abdullah_mgDB_123@cluster0.blqe06s.mongodb.net/
JWT_SECRET=mysupersecretkey123

```

When you try to GET tasks or create task, you would first need to authenticate your self and verfify that you have the ownership of the resource, so for that you would need to add bearer token in the Authorization tab.
<br>

The bearer token looks something like this: ` [ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTIzMTM3NzdkYTA1YmIyZDA5MTc3NGMiLCJyb2xlIjoidXNlciIsImlhdCI6MTc4MDY4MzkxMiwiZXhwIjoxNzgwNzcwMzEyfQ.EQpDIQorT8lJm_XkZrCm06anuFhaoFsgy0ZkXvrd0rk" ]` 

<br>
You can get yours token when you login.

Thanks!

<!-- ======================================================= -->

## Local Installation & Setup
1- Clone the repository down to your machine.

2- Install the necessary dependencies:
```env
npm install 
```
    
3- Boot up the server in development mode:
```env
 npm run dev 
```
    





