CREATE DATABASE IF NOT EXISTS retail_hub;
USE retail_hub;

-- Dimension: Product
CREATE TABLE IF NOT EXISTS Product_Dim (
    product_key INT AUTO_INCREMENT PRIMARY KEY,
    stock_code VARCHAR(50),
    description VARCHAR(255),
    unit_price DECIMAL(10, 2),
    category VARCHAR(100)
);

-- Dimension: Customer
CREATE TABLE IF NOT EXISTS Customer_Dim (
    customer_key INT AUTO_INCREMENT PRIMARY KEY,
    customer_id VARCHAR(50),
    country VARCHAR(100),
    registration_date DATETIME
);

-- Dimension: Time
CREATE TABLE IF NOT EXISTS Time_Dim (
    time_key INT AUTO_INCREMENT PRIMARY KEY,
    invoice_date DATETIME,
    year INT,
    quarter INT,
    month INT,
    day INT,
    hour INT,
    day_of_week INT
);

-- Dimension: Location
CREATE TABLE IF NOT EXISTS Location_Dim (
    location_key INT AUTO_INCREMENT PRIMARY KEY,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    region VARCHAR(100)
);

-- Dimension: Payment
CREATE TABLE IF NOT EXISTS Payment_Dim (
    payment_key INT AUTO_INCREMENT PRIMARY KEY,
    payment_method VARCHAR(50),
    payment_status VARCHAR(50)
);

-- Fact: Sales
CREATE TABLE IF NOT EXISTS Sales_Fact (
    fact_id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_no VARCHAR(50),
    product_key INT,
    customer_key INT,
    time_key INT,
    location_key INT,
    payment_key INT,
    quantity INT,
    total_amount DECIMAL(10, 2),
    FOREIGN KEY (product_key) REFERENCES Product_Dim(product_key),
    FOREIGN KEY (customer_key) REFERENCES Customer_Dim(customer_key),
    FOREIGN KEY (time_key) REFERENCES Time_Dim(time_key),
    FOREIGN KEY (location_key) REFERENCES Location_Dim(location_key),
    FOREIGN KEY (payment_key) REFERENCES Payment_Dim(payment_key)
);
