import pandas as pd
from sqlalchemy import create_engine
import os

DB_URI = "mysql+pymysql://root:password@localhost:3306/retail_hub"
# Base path relative to current script assuming it's run from the project root
EXCEL_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'docs', 'Online Retail.xlsx')

def load_data():
    print("Connecting to MySQL Database...")
    engine = create_engine(DB_URI)
    
    print(f"Reading dataset from {EXCEL_PATH}...")
    df = pd.read_excel(EXCEL_PATH)
    
    # 1. Clean the Data
    print("Cleaning data...")
    df = df.dropna(subset=['CustomerID']) # Drop missing customers
    df['CustomerID'] = df['CustomerID'].astype(int).astype(str) # Normalize ID
    df = df[df['Quantity'] > 0] # Keep only actual sales (no returns)
    df['Description'] = df['Description'].fillna("Unknown")
    
    # 2. Build and Load Product_Dim
    print("Building Product_Dim...")
    product_df = df[['StockCode', 'Description', 'UnitPrice']].drop_duplicates(subset=['StockCode']).reset_index(drop=True)
    product_df.rename(columns={'StockCode': 'stock_code', 'Description': 'description', 'UnitPrice': 'unit_price'}, inplace=True)
    product_df.to_sql('Product_Dim', engine, if_exists='append', index=False)
    db_products = pd.read_sql("SELECT product_key, stock_code FROM Product_Dim", engine)
    
    # 3. Build and Load Customer_Dim
    print("Building Customer_Dim...")
    customer_df = df[['CustomerID', 'Country']].drop_duplicates(subset=['CustomerID']).reset_index(drop=True)
    customer_df.rename(columns={'CustomerID': 'customer_id', 'Country': 'country'}, inplace=True)
    customer_df.to_sql('Customer_Dim', engine, if_exists='append', index=False)
    db_customers = pd.read_sql("SELECT customer_key, customer_id FROM Customer_Dim", engine)
    
    # 4. Build and Load Time_Dim
    print("Building Time_Dim...")
    time_df = df[['InvoiceDate']].drop_duplicates().reset_index(drop=True)
    time_df['year'] = time_df['InvoiceDate'].dt.year
    time_df['quarter'] = time_df['InvoiceDate'].dt.quarter
    time_df['month'] = time_df['InvoiceDate'].dt.month
    time_df['day'] = time_df['InvoiceDate'].dt.day
    time_df['hour'] = time_df['InvoiceDate'].dt.hour
    time_df['day_of_week'] = time_df['InvoiceDate'].dt.dayofweek
    time_df.rename(columns={'InvoiceDate': 'invoice_date'}, inplace=True)
    time_df.to_sql('Time_Dim', engine, if_exists='append', index=False)
    db_time = pd.read_sql("SELECT time_key, invoice_date FROM Time_Dim", engine)
    
    # 5. Build and Load Store_Dim
    print("Building Store_Dim...")
    store_df = pd.DataFrame({'store_name': ['Online Retail'], 'region': ['Global']})
    store_df.to_sql('Store_Dim', engine, if_exists='append', index=False)
    db_store = pd.read_sql("SELECT store_key FROM Store_Dim", engine)
    default_store_key = db_store['store_key'].iloc[0]

    # 6. Build and Load Sales_Fact
    print("Building Sales_Fact...")
    fact_df = df.copy()
    fact_df['total_amount'] = fact_df['Quantity'] * fact_df['UnitPrice']
    
    # Map foreign keys
    fact_df = fact_df.merge(db_products, left_on='StockCode', right_on='stock_code', how='left')
    fact_df = fact_df.merge(db_customers, left_on='CustomerID', right_on='customer_id', how='left')
    fact_df = fact_df.merge(db_time, left_on='InvoiceDate', right_on='invoice_date', how='left')
    
    sales_fact = fact_df[['InvoiceNo', 'product_key', 'customer_key', 'time_key', 'Quantity', 'total_amount']].copy()
    sales_fact['store_key'] = default_store_key
    sales_fact.rename(columns={'InvoiceNo': 'invoice_no', 'Quantity': 'quantity'}, inplace=True)
    
    print("Loading Sales_Fact to database (this might take a minute)...")
    sales_fact.to_sql('Sales_Fact', engine, if_exists='append', index=False, chunksize=10000)
    print("ETL complete! Database is fully populated.")

if __name__ == "__main__":
    load_data()
