import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score
from sqlalchemy import create_engine

import os
DB_URI = os.environ.get("DB_URI")

def predict_revenue():
    engine = create_engine(DB_URI)
    query = """
    SELECT t.month, t.quarter, SUM(s.quantity) as total_quantity, SUM(s.total_amount) as total_revenue
    FROM Sales_Fact s
    JOIN Time_Dim t ON s.time_key = t.time_key
    GROUP BY t.month, t.quarter
    ORDER BY t.month
    """
    df = pd.read_sql(query, engine)
    if df.empty:
        return {"error": "No data found"}
        
    X = df[['month', 'quarter', 'total_quantity']]
    y = df['total_revenue']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = LinearRegression()
    model.fit(X_train, y_train)
    
    predictions = model.predict(X_test)
    r2 = r2_score(y_test, predictions)
    
    # Return predictions as JSON-friendly format
    results = []
    for i in range(len(y_test)):
        results.append({
            "actual": float(y_test.iloc[i]),
            "predicted": float(predictions[i])
        })
        
    return {
        "r2_score": float(r2),
        "predictions": results
    }
