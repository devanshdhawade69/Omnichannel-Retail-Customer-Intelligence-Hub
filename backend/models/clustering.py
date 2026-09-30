import pandas as pd
from sklearn.cluster import KMeans
from sqlalchemy import create_engine

DB_URI = "mysql+pymysql://root:password@localhost:3306/retail_hub"

def segment_customers():
    engine = create_engine(DB_URI)
    # RFM Query
    query = """
    SELECT 
        c.customer_id,
        MAX(t.invoice_date) as last_purchase_date,
        COUNT(DISTINCT s.invoice_no) as frequency,
        SUM(s.total_amount) as monetary
    FROM Sales_Fact s
    JOIN Customer_Dim c ON s.customer_key = c.customer_key
    JOIN Time_Dim t ON s.time_key = t.time_key
    GROUP BY c.customer_id
    """
    df = pd.read_sql(query, engine)
    if df.empty:
        return {"error": "No data found"}
        
    # Calculate Recency
    max_date = df['last_purchase_date'].max()
    df['recency'] = (max_date - df['last_purchase_date']).dt.days
    
    rfm = df[['recency', 'frequency', 'monetary']].fillna(0)
    
    # K-Means
    kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
    df['cluster'] = kmeans.fit_predict(rfm)
    
    centroids = kmeans.cluster_centers_.tolist()
    
    # Summary stats
    summary = df.groupby('cluster')[['recency', 'frequency', 'monetary']].mean().reset_index().to_dict(orient='records')
    
    return {
        "centroids": centroids,
        "summary": summary,
        "labels": df['cluster'].tolist()[:100] # Return a subset to avoid huge payload on frontend
    }
