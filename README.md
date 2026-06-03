# SaaS Business Analytics & Prediction Platform

A full-stack, data-driven platform that allows business managers to upload live SaaS data (Excel/CSV), view instant metrics, and forecast future revenue, user growth, and churn using AI linear regression models.

## 🚀 Project Status: COMPLETELY FINISHED
The application is now 100% complete and ready for deployment.

### Features Implemented:
*   **Fully Responsive React Frontend**: Beautifully designed Dashboard, Users, Billing, and Analytics pages with glassmorphism UI and animations.
*   **Live Excel/CSV Upload**: Users can upload their own financial spreadsheets. The backend automatically parses the data, saves it to the database, and instantly updates all frontend charts and tables.
*   **AI Predictive Engine**: Runs a mathematical linear regression algorithm on the uploaded historical data to predict next month's Expected Revenue, Expected Churn, and User Subscriptions.
*   **Dynamic Recharts**: Integrated Pie Charts, Bar Charts, and Dual-Axis Line Charts to visualize ARPU, Subscriptions vs Churn, and Demographics.
*   **Google OAuth Authentication**: Secure login integrated with Google Cloud Console and `@react-oauth/google` for seamless user access.
*   **Node.js / Express Backend**: robust REST API securely connected to a MongoDB Atlas cluster.
*   **Security & Env**: `.env` files are properly configured and completely hidden from the GitHub repository via `.gitignore`.

## 🛠️ Tech Stack
*   **Frontend**: React, Vite, Lucide React (Icons), Recharts (Data Visualization), Vanilla CSS (Custom Design System).
*   **Backend**: Node.js, Express, Mongoose, Multer (File parsing), XLSX (Excel data extraction).
*   **Database**: MongoDB Atlas.
*   **Authentication**: Google OAuth 2.0, JWT (JSON Web Tokens), bcrypt.

## 🏃 How to Run Locally

### 1. Configure Environment Variables
You must create two `.env` files (they are hidden from this repository for security).
**In the `/backend` folder (`backend/.env`):**
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

**In the `/frontend` folder (`frontend/.env`):**
```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### 2. Install Dependencies
Open two terminals. In the first terminal, install the backend packages:
```bash
cd backend
npm install
```
In the second terminal, install the frontend packages:
```bash
cd frontend
npm install
```

### 3. Start the Servers
In the backend terminal:
```bash
npm run dev
```
In the frontend terminal:
```bash
npm run dev
```

Your app will be running at `http://localhost:5173`. You can log in using Google OAuth and upload a CSV file to see the live AI predictions!
