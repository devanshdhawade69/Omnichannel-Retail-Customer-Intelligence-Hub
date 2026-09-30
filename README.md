# Omnichannel Retail & Customer Intelligence Hub

A full-stack data mining and analytics platform built to extract intelligent insights from e-commerce datasets (specifically the `Online Retail.xlsx` dataset). It processes raw data into a Star Schema data warehouse, applies machine learning algorithms to uncover patterns, and visualizes the results via a modern React dashboard.

## Tech Stack

*   **Database / Data Warehouse**: MySQL (Star Schema)
*   **Data Processing & ETL**: Python (`pandas`, `SQLAlchemy`)
*   **Machine Learning Core**: `scikit-learn`, `mlxtend` (Apriori)
*   **Backend API**: Flask
*   **Frontend**: React, TypeScript, Tailwind CSS, Recharts

## Project Architecture

```text
dwm_project_sem_finale/
├── docs/
│   └── Online Retail.xlsx        <-- The source dataset
├── backend/
│   ├── app.py                    <-- Flask application entry point
│   ├── config.py                 <-- Configuration variables (if applicable)
│   ├── requirements.txt          <-- Python dependencies
│   ├── etl/
│   │   └── data_loader.py        <-- ETL script: loads XLSX data to MySQL
│   ├── models/
│   │   ├── regression.py         <-- Predictive revenue (Multiple Linear Regression)
│   │   ├── clustering.py         <-- RFM & Customer Segmentation (K-Means)
│   │   ├── classification.py     <-- Loyalty Prediction (Decision Tree & Naive Bayes)
│   │   └── association.py        <-- Market basket analysis (Apriori)
│   └── database/
│       └── schema.sql            <-- MySQL Star Schema DDL
└── frontend/
    ├── package.json              <-- React/Tailwind dependencies
    ├── src/
    │   ├── main.tsx              <-- React entry point
    │   ├── App.tsx               <-- Main Layout with Router
    │   ├── index.css             <-- Tailwind styles
    │   ├── components/           <-- Reusable UI components (e.g. Sidebar)
    │   ├── pages/                <-- Views for each ML Engine
    │   └── types/                <-- TypeScript interfaces matching Flask endpoints
    └── ...
```

## Features & Engines

1.  **Revenue Predictor (Regression Engine)**: Uses Multiple Linear Regression to predict future transaction totals based on historical time and volume features.
2.  **Customer Segments (Clustering Engine)**: Calculates RFM (Recency, Frequency, Monetary) metrics and groups customers using the K-Means algorithm.
3.  **Loyalty Classifier (Classification Engine)**: Uses Decision Tree and Naïve Bayes classifiers to predict whether a customer will become a repeat buyer, comparing both models' accuracy and confusion matrices.
4.  **Market Basket (Association Engine)**: Implements the Apriori algorithm to uncover frequent itemsets and association rules, answering the question: *"If a customer buys item X, what are they likely to buy next?"*

---

## Setup & Execution Instructions

### 1. Database Setup
1.  Open **MySQL Workbench**.
2.  Open and execute the `backend/database/schema.sql` file. This creates the `retail_hub` database along with the necessary Dimension and Fact tables.

### 2. Backend API & ETL
1.  Open a terminal and navigate to the `backend` folder:
    ```bash
    cd backend
    ```
2.  Install the required Python dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3.  Run the ETL script. **Note:** Before running, ensure your MySQL credentials (username/password) match the `DB_URI` string inside `backend/etl/data_loader.py` and the various `models/*.py` files.
    ```bash
    python etl/data_loader.py
    ```
    *This will read `Online Retail.xlsx`, clean the data, and populate your MySQL Star Schema. It may take a minute or two.*
4.  Start the Flask server:
    ```bash
    python app.py
    ```
    *The API will run on `http://localhost:5000`.*

### 3. Frontend Dashboard
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
4.  Open the provided `localhost` link (usually `http://localhost:5173`) in your web browser to explore the dashboard.
