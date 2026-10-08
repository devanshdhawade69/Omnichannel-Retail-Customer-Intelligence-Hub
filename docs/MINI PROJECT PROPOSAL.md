
MINI PROJECT PROPOSAL
Title
E-Commerce Data Warehouse and Data Mining System
A Flipkart-Inspired E-Commerce Platform with Data Analytics and Mining

Introduction
E-commerce platforms generate large amounts of data through customer registrations, product browsing, purchases, payments, reviews, and order transactions. Merely storing this data in an operational database is not sufficient for extracting meaningful business insights.
The proposed project aims to develop a Flipkart-inspired e-commerce website integrated with Data Warehousing and Data Mining techniques. The system will provide basic e-commerce functionalities such as product browsing, searching, cart management, order placement, and order tracking.
Along with the e-commerce functionality, the system will collect and process transaction data through an ETL (Extract, Transform, Load) pipeline and store analytical data in a data warehouse based on a star schema.
Data mining techniques such as classification, regression, clustering, and association rule mining will then be applied to discover useful patterns from customer and transaction data.
The final system will provide an analytical dashboard for visualizing sales trends, customer segments, product performance, and purchasing patterns.

Problem Statement
Modern e-commerce platforms generate large volumes of customer and transaction data. However, raw transactional data is difficult to analyze directly and does not easily provide insights into customer behaviour, sales trends, product relationships, and business performance.
Therefore, there is a need for an integrated system that can:
•	Manage e-commerce transactions. 
•	Organize historical data efficiently. 
•	Clean and preprocess transaction data. 
•	Perform OLAP analysis. 
•	Identify customer groups. 
•	Predict sales-related values. 
•	Discover frequently purchased product combinations. 
•	Present analytical results through visual dashboards. 
The proposed system addresses these requirements by integrating an e-commerce platform with a data warehouse and data mining system.

Objectives
The major objectives of the project are:
1.	To develop a basic e-commerce platform similar to popular online shopping websites. 
2.	To design and implement a data warehouse using a star schema. 
3.	To implement an ETL process for extracting, transforming, and loading e-commerce data. 
4.	To perform data preprocessing on customer and transaction datasets. 
5.	To perform OLAP operations for multidimensional analysis. 
6.	To develop dashboards for visualizing sales and customer information. 
7.	To apply classification techniques to categorize customers based on their purchasing behaviour. 
8.	To use regression techniques for predicting numerical business values such as sales. 
9.	To perform customer segmentation using clustering algorithms. 
10.	To discover product relationships using association rule mining. 
11.	To implement/analyze Apriori and FP-Growth techniques. 
12.	To provide data-driven insights from e-commerce transaction data.

Scope of the Project
The project will cover two major areas:
A. E-Commerce System
The website will provide:
•	User registration and login 
•	Product catalogue 
•	Product categories 
•	Product search 
•	Product details 
•	Shopping cart 
•	Wishlist 
•	Order placement 
•	Order history 
•	Product ratings/reviews 
•	Admin product management 
•	Order management 
B. Data Warehouse and Data Mining System
The analytical component will include:
•	ETL pipeline 
•	Data preprocessing 
•	Data warehouse 
•	Star schema 
•	Sales data mart 
•	OLAP operations 
•	Data visualization 
•	Customer classification 
•	Sales prediction 
•	Customer clustering 
•	Association rule mining 
•	Market basket analysis

Proposed Methodology
The proposed methodology will follow these steps:
Step 1 — Data Generation
The e-commerce website generates transactional data through:
Customers
Products
Orders
Order Items
Payments
Reviews
Step 2 — Data Extraction
Data will be extracted from the operational database.
Step 3 — Data Transformation
The extracted data will be cleaned and transformed by:
•	Removing duplicate records 
•	Handling missing values 
•	Standardizing categorical values 
•	Handling invalid records 
•	Converting data types 
•	Generating calculated attributes 
Step 4 — Data Loading
The transformed data will be loaded into the data warehouse.
Step 5 — Data Warehouse Design
A star schema will be created containing:
Fact Sales
     +
Customer Dimension
Product Dimension
Date Dimension
Location Dimension
Payment Dimension
Step 6 — OLAP Analysis
OLAP operations including:
•	Roll-up 
•	Drill-down 
•	Slice 
•	Dice 
will be performed to analyze sales data.
Step 7 — Data Mining
The processed data will be used for:
Classification
Customer categorization using Decision Tree/Naïve Bayes.
Regression
Sales prediction using Simple or Multiple Linear Regression.
Clustering
Customer segmentation using:
•	K-Means 
•	Agglomerative clustering 
•	Divisive clustering 
Association Rule Mining
Product relationship discovery using:
•	Apriori 
•	FP-Growth 
•	Vertical data representation 
Step 8 — Visualization
The results will be presented through an analytical dashboard containing charts and graphs.

Proposed Modules
Module 1 — User Management
•	Registration 
•	Login 
•	User profile 
•	Customer information 
Module 2 — Product Management
•	Add products 
•	Update products 
•	Delete products 
•	Product categories 
•	Product search 
•	Product details 
Module 3 — Shopping and Order Management
•	Cart 
•	Wishlist 
•	Checkout 
•	Orders 
•	Payment information 
•	Order history 
Module 4 — Data Warehouse
•	Fact table 
•	Dimension tables 
•	Star schema 
•	Sales data mart 
Module 5 — ETL and Preprocessing
•	Data extraction 
•	Data cleaning 
•	Data transformation 
•	Data integration 
•	Data loading 
Module 6 — OLAP and Visualization
•	Sales analysis 
•	Category analysis 
•	Customer analysis 
•	Location analysis 
•	Time-based analysis 
•	Interactive charts 
Module 7 — Classification and Regression
•	Customer classification 
•	Sales prediction 
Module 8 — Clustering
•	K-Means 
•	Agglomerative clustering 
•	Divisive clustering 
•	Customer segmentation 
Module 9 — Association Rule Mining
•	Apriori 
•	Candidate generation 
•	FP-Growth 
•	Vertical data format 
•	Market basket analysis 

8. Expected Outcomes
The proposed system is expected to:
•	Provide a functional e-commerce platform. 
•	Organize e-commerce data using a data warehouse. 
•	Demonstrate ETL operations. 
•	Enable multidimensional analysis using OLAP. 
•	Provide visual representations of business data. 
•	Identify different customer segments. 
•	Predict sales-related values. 
•	Identify frequently purchased product combinations. 
•	Generate association rules from transaction data. 
•	Demonstrate practical applications of data mining techniques in e-commerce.


Technologies Proposed
Frontend
HTML, CSS, JavaScript / React
Backend
Python + Django/Flask
Database
MySQL
Data Processing
Python, Pandas, NumPy
Data Mining / Machine Learning
Scikit-learn
Association Mining
mlxtend / Python implementation
Visualization
Matplotlib / Plotly / Chart.js
Data Warehouse
MySQL

 



