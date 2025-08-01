# 🐄 Farmart Frontend  
**React | Vite | JavaScript | JWT | CSS | Render**

A responsive, token-authenticated React frontend for **Farmart**, a fictional livestock marketplace. This interface connects seamlessly with a backend (e.g., Flask or Node.js) and supports both user and admin roles with protected views, routing, and dynamic navigation.

---

## ✨ Features

- ✅ User Registration & Login  
- ✅ Role Selection (Admin / User during signup)  
- ✅ Access Token Storage Only (no refresh token)  
- ✅ Token-based Route Protection  
- ✅ Product Listing (Livestock)  
- ✅ Product Detail View  
- ✅ Add to Cart Functionality  
- ✅ Admin & User Dashboards (Optional)  
- ✅ Responsive Layout and UI  
- 🚧 More features planned (cart logic, order flow, admin controls)

---

## 🔗 Live Demo & Repository

- 🔴 Live site: **[Farmart Live](https://your-live-site-link.com)**  
- 📁 Repository: [Farmart Frontend](https://github.com/your-repo-link)

---

## ⚙️ Setup & Installation

### Pre-Requisites

- Node.js (v18 or higher)  
- npm (v9 or higher)  
- Internet connection  

### Installation Steps

```bash
# Clone the repo
git clone https://github.com/your-username/farmart-frontend.git

# Move into the project directory
cd farmart-frontend

# Install dependencies
npm install

# Start the development server
npm run dev

🧭 Navigation & Routing Overview
Route	Description	Access
/login	Login page	Public
/register	Register page	Public
/animals	List of livestock	Public
/product/:id	Product detail view	Public
/profile	User profile page	Protected
/admin	Admin dashboard (optional)	Protected

🛡️ Authentication Details
Uses JWT access tokens only

Tokens are stored in localStorage

ProtectedRoute component checks token presence & expiration

Role-based redirection for /admin vs /profile

js
Copy
Edit
const token = localStorage.getItem('token');
const isTokenValid = token && Date.now() < tokenExpiration;
🧩 Component Overview
🔐 CombineAuth.jsx
Unified login & registration form

Validates input fields

Handles login/register logic

Stores token & user info on success

🐄 Productcard.jsx
Renders list of livestock (products)

"Add to cart" and "View details" buttons

Passes product to detail page via route state

🔍 ProductDetail.jsx
Displays product info (image, price, description)

Uses useLocation() to get product passed via state

Fallback shown if no data is passed

🛑 ProtectedRoute.jsx
Wraps protected pages (e.g., /admin, /profile)

Redirects to login if token is missing/expired

Optional role-based access via props

📦 Application Flow
User signs up / logs in

Access token saved to localStorage

User is redirected to /profile or /admin

Products listed on /animals

Product detail navigated via state

Add to cart button triggers cart logic (to be expanded)

🧪 Tech Stack
Category	Tech
Frontend	React, Vite
Routing	React Router
Authentication	JWT (access tokens only)
Styling	CSS (custom styles)
Deployment	Render

📱 Responsive Design
Farmart is fully responsive and optimized for:

💻 Laptop

📱 Mobile

📟 Tablet

👥 Authors

Brian Njuguna

Nevil Oporo

Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

 License
This project is open-source and available under the MIT License.

yaml
Copy
Edit

---

Just create a new file called `README.md` in your frontend project root folder and paste this whole content inside.

If you want, I can help you add badges or screenshots next!