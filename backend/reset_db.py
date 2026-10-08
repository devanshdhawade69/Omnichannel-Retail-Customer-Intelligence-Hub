import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()
DB_URI = os.environ.get("DB_URI")

def reset_database():
    print("Connecting to MySQL Database to reset schema...")
    engine = create_engine(DB_URI)
    
    with engine.connect() as conn:
        print("Dropping existing tables...")
        # Disable foreign key checks temporarily to drop tables in any order
        conn.execute(text("SET FOREIGN_KEY_CHECKS = 0;"))
        
        tables = ['Sales_Fact', 'Product_Dim', 'Customer_Dim', 'Time_Dim', 'Store_Dim', 'Location_Dim', 'Payment_Dim', 'order_items', 'payments', 'reviews', 'orders', 'products', 'categories', 'users']
        for table in tables:
            conn.execute(text(f"DROP TABLE IF EXISTS {table};"))
            
        conn.execute(text("SET FOREIGN_KEY_CHECKS = 1;"))
        print("Old tables dropped successfully.")

    print("Re-applying updated schema.sql...")
    schema_path = os.path.join(os.path.dirname(__file__), 'database', 'schema.sql')
    with open(schema_path, 'r') as f:
        schema_sql = f.read()

    # Split by semicolon and execute each statement
    with engine.connect() as conn:
        for statement in schema_sql.split(';'):
            if statement.strip():
                conn.execute(text(statement))
        conn.commit()
    print("New schema applied successfully! You can now run data_loader.py")

if __name__ == "__main__":
    reset_database()
