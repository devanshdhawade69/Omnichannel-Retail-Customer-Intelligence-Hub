CREATE DATABASE IF NOT EXISTS retail_hub;
USE retail_hub;

-- Dimension: Product
CREATE TABLE Product_Dim (
    product_key INT AUTO_INCREMENT PRIMARY KEY,
    stock_code VARCHAR(50),
    description VARCHAR(255),
    unit_price DECIMAL(10, 2)
);

-- Dimension: Customer
CREATE TABLE Customer_Dim (
    customer_key INT AUTO_INCREMENT PRIMARY KEY,
    customer_id VARCHAR(50),
    country VARCHAR(100)
);

-- Dimension: Time
CREATE TABLE Time_Dim (
    time_key INT AUTO_INCREMENT PRIMARY KEY,
    invoice_date DATETIME,
    year INT,
    quarter INT,
    month INT,
    day INT,
    hour INT,
    day_of_week INT
);

-- Dimension: Store
CREATE TABLE Store_Dim (
    store_key INT AUTO_INCREMENT PRIMARY KEY,
    store_name VARCHAR(100),
    region VARCHAR(100)
);

-- Fact: Sales
CREATE TABLE Sales_Fact (
    fact_id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_no VARCHAR(50),
    product_key INT,
    customer_key INT,
    time_key INT,
    store_key INT,
    quantity INT,
    total_amount DECIMAL(10, 2),
    FOREIGN KEY (product_key) REFERENCES Product_Dim(product_key),
    FOREIGN KEY (customer_key) REFERENCES Customer_Dim(customer_key),
    FOREIGN KEY (time_key) REFERENCES Time_Dim(time_key),
    FOREIGN KEY (store_key) REFERENCES Store_Dim(store_key)
);
