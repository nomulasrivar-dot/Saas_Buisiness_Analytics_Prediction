# SaaS Business Analytics & Prediction Platform

A comprehensive, full-stack web application designed for business managers to upload live SaaS data, view real-time metrics, and forecast future business performance using AI linear regression models.

## Project Overview

This platform was built to solve the need for instant, data-driven business intelligence. It provides a secure environment where users can authenticate via Google OAuth, upload raw financial datasets (Excel/CSV), and immediately receive parsed visualizations and AI-driven predictions regarding revenue, user growth, and churn rates.

## Core Features

*   **Predictive AI Engine**: Implements mathematical linear regression algorithms on uploaded historical data to generate forecasts for the upcoming month's Expected Revenue, Expected Churn, and User Subscriptions.
*   **Live Data Parsing**: Users can upload `.csv` or `.xlsx` files. The backend seamlessly extracts the data, normalizes it, stores it in MongoDB, and serves it to the frontend in real-time.
*   **Dynamic Data Visualization**: Utilizes Recharts to render interactive Pie Charts, Bar Charts, and Dual-Axis Line Charts. Key metrics visualized include ARPU (Average Revenue Per User), Subscriptions vs Churn Rate, and User Demographics.
*   **Secure Authentication**: Integrated Google OAuth 2.0 via Google Cloud Console, issuing JWT (JSON Web Tokens) for secure, stateless session management.
*   **Premium User Interface**: Features a fully responsive, modern glassmorphism design system built with React, Vanilla CSS, and Lucide React icons.
*   **Unified Deployment**: Configured as a monorepo where the Node.js/Express backend serves the compiled React static build, deployed as a single Web Service on Render.

## Technology Stack

*   **Frontend**: React, Vite, Recharts, Lucide React
*   **Backend**: Node.js, Express, Mongoose, Multer, XLSX
*   **Database**: MongoDB Atlas
*   **Authentication**: Google OAuth 2.0, JWT, bcrypt
*   **Deployment**: Render

## Local Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/nomulasrivar-dot/Saas_Buisiness_Analytics_Prediction.git
    ```

2.  **Configure Environment Variables:**
    Create a `.env` file in the `/backend` directory:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=5000
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    NODE_ENV=development
    ```
    Create a `.env` file in the `/frontend` directory:
    ```env
    VITE_GOOGLE_CLIENT_ID=your_google_client_id
    VITE_API_URL=http://localhost:5000/api
    ```

3.  **Install Dependencies:**
    ```bash
    cd backend
    npm install
    cd ../frontend
    npm install
    ```

4.  **Run the Application:**
    Start the backend server (from the `/backend` directory):
    ```bash
    npm run dev
    ```
    Start the frontend server (from the `/frontend` directory):
    ```bash
    npm run dev
    ```
    Access the application at `http://localhost:5173`.
