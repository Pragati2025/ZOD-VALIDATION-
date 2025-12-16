# ZOD Validation Project

A simple project using **Next.js, React, and Zod** to validate user registration forms.

---

## Features

- User registration with fields: Name, Email, Password, Age  
- Frontend validation with Zod  
- Backend validation with Zod  
- Shows error messages if data is invalid  

---
## How to Run

1. Clone the repo:

```bash
git clone https://github.com/Pragati2025/ZOD-VALIDATION-.git
cd ZOD-VALIDATION-
Install dependency: npm install
Add .env file with your MongoDB URI: MONGO_URI=your_mongodb_connection_string
Start the development server: npm run dev
Open http://localhost:3000
 in your browser.

How it Works

Enter your details in the form

Frontend checks inputs using Zod

If valid, data is sent to backend

Backend also validates the data

Shows errors if any validation fails
