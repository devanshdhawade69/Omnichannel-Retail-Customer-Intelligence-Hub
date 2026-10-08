# Omnichannel Retail & Customer Intelligence Hub

A Flipkart-inspired E-Commerce Platform integrated with a full-stack Data Mining and Analytics System. This project manages operational e-commerce transactions and processes raw data through an ETL pipeline into a Star Schema Data Warehouse. It applies machine learning algorithms to uncover patterns and visualizes the results via a modern React dashboard.

## Tech Stack

*   **Database / Data Warehouse**: MySQL (Operational DB & Star Schema Data Warehouse)
*   **Backend API**: Python (Flask, Flask-SQLAlchemy)
*   **Data Processing & ETL**: Python (`pandas`, `SQLAlchemy`)
*   **Machine Learning Core**: `scikit-learn`, `mlxtend` (Apriori, FP-Growth)
*   **Frontend**: React, TypeScript, Tailwind CSS, Recharts

## Project Architecture & Modules

The platform is divided into two major components:

### A. E-Commerce System (Operational)
*   **User Management**: Registration and Login (featuring modern glassmorphism UI and browser autofill integration).
*   **Product Management**: Product catalogue, detailed product views, categories, and search functionality.
*   **Admin Product Management**: Full CRUD operations for products (Add, Update, Delete) via a dedicated Admin Dashboard.
*   **Shopping & Orders**: Modern cart management, checkout flows, and order history tracking.

### B. Data Warehouse and Analytics System (Analytical)
*   **ETL Pipeline**: Extracts data from the operational database, transforms/cleans it, and loads it into the Data Warehouse.
*   **Data Warehouse**: Implements a Star Schema featuring a Central Sales Fact table and Dimensions for Product, Customer, Time, Location, and Payment.
*   **Data Mining Engines**:
    1.  **Revenue Predictor (Regression)**: Uses Multiple Linear Regression to predict future transaction totals based on historical data.
    2.  **Customer Segments (Clustering)**: Calculates RFM (Recency, Frequency, Monetary) metrics and groups customers using K-Means clustering.
    3.  **Loyalty Classifier (Classification)**: Uses Decision Tree and Naïve Bayes classifiers to predict customer retention.
    4.  **Market Basket (Association)**: Uses the Apriori algorithm to uncover frequent itemsets and association rules.

---

## Folder Structure

```text
Omnichannel-Retail-Customer-Intelligence-Hub/
├── docs/
│   └── Online Retail.xlsx            <-- The source dataset
├── backend/
│   ├── app.py                        <-- Flask application entry point (Unified API)
│   ├── .env                          <-- Database URI configuration
│   ├── requirements.txt              <-- Python dependencies
│   ├── routes/
│   │   └── ecommerce_routes.py       <-- API routes for shop operations
│   ├── etl/
│   │   └── data_loader.py            <-- ETL pipeline script
│   ├── models/
│   │   ├── ecommerce.py              <-- SQLAlchemy operational database models
│   │   ├── regression.py             <-- Predictive revenue logic
│   │   ├── clustering.py             <-- Customer Segmentation logic
│   │   ├── classification.py         <-- Loyalty Prediction logic
│   │   └── association.py            <-- Market basket analysis logic
│   └── database/
│       └── schema.sql                <-- MySQL Star Schema DDL for Data Warehouse
└── frontend/
    ├── package.json                  <-- React/Tailwind dependencies
    └── src/
        ├── App.tsx                   <-- Main Layout with Router (Shop & Admin)
        ├── components/               <-- Reusable UI components (Navbar, Sidebar)
        └── pages/
            ├── shop/                 <-- E-Commerce storefront (Home, Login, Cart, ProductDetails)
            ├── AdminProducts.tsx     <-- Admin Product Management (CRUD)
            └── ...                   <-- Admin / ML Engine dashboard views
```

## Setup & Execution Instructions

### 1. Database Configuration
1.  Ensure you have **MySQL** installed and running.
2.  Open **MySQL Workbench** or your preferred SQL client and execute the `backend/database/schema.sql` file. This creates the `retail_hub` database and the Data Warehouse tables.
3.  In the `backend` folder, verify the `.env` file contains the correct connection string:
    ```env
    DB_URI="mysql+pymysql://<YOUR_USER>:<YOUR_PASSWORD>@localhost:3306/retail_hub"
    ```

### 2. Backend Environment & Initialization
1.  Open a terminal and navigate to the `backend` folder:
    ```bash
    cd backend
    ```
2.  Install the required Python dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3.  **Run the ETL script:** This process will read `docs/Online Retail.xlsx`, clean the data, and populate your MySQL Star Schema Data Warehouse.
    ```bash
    python etl/data_loader.py
    ```
4.  **Start the Flask server:** Starting the server for the first time will automatically run SQLAlchemy's `db.create_all()` to generate the operational e-commerce tables inside the database.
    ```bash
    python app.py
    ```
    *The unified API will run on `http://localhost:5000`.*

### 3. Frontend E-Commerce & Dashboard Setup
1.  Open a second terminal and navigate to the `frontend` folder:
    ```bash
    cd frontend
    ```
2.  Install the Node.js dependencies:
    ```bash
    npm install
    ```
3.  Start the Vite development server:
    ```bash
    npm run dev
    ```
4.  Open the provided local link (usually `http://localhost:5173`) in your web browser. 
    *   **Public Storefront:** Available at `/`
    *   **Analytics Dashboard:** Available at `/admin`
