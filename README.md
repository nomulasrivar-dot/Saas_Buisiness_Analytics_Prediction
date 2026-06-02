# SaaS Business Analytics & Prediction Platform

Analyze SaaS platform data and generate insights that help management make business decisions regarding user growth, subscriptions, revenue, customer retention, and churn prediction.

## 🚀 Project Status

**What has been completed so far:**
- **Frontend (React + Vite)**: 
  - Complete premium UI design with glassmorphism and modern aesthetics.
  - Login and Signup authentication pages.
  - Interactive Dashboard featuring Recharts (Revenue Area Chart, User/Churn Line Chart, Subscription Bar Chart).
  - React Router setup and Axios configured for API communication.
- **Backend (Node.js + Express)**:
  - MongoDB database connection (Mongoose).
  - Custom email & password authentication flow using bcrypt and JWT.
  - Mock SaaS metrics generator that seeds the database on the first run.
  - Protected API routes via JWT middleware.

**What still needs to be done:**
- Implement Google OAuth fully (the frontend buttons and backend routes are prepared, but it requires the actual `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to be configured).
- Final Deployment to production (e.g., Vercel/Render).

## 💻 Tech Stack
- **Frontend**: React, Vite, React Router, Recharts, Vanilla CSS, Lucide React
- **Backend**: Node.js, Express.js, Mongoose, bcryptjs, jsonwebtoken, google-auth-library
- **Database**: MongoDB Atlas

## 🛠️ How to run locally

### Backend
1. Navigate to the `backend` directory.
2. Create a `.env` file based on `.env.example`.
3. Run `npm install`
4. Run `npm run dev` (starts on localhost:5000)

### Frontend
1. Navigate to the `frontend` directory.
2. Run `npm install`
3. Run `npm run dev` (starts on localhost:5173)
