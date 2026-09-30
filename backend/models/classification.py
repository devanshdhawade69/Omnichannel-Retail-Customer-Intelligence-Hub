import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
from sqlalchemy import create_engine

DB_URI = "mysql+pymysql://root:password@localhost:3306/retail_hub"

def predict_loyalty():
    engine = create_engine(DB_URI)
    # Create a proxy for "Loyalty" (e.g., > 2 purchases) and features
    query = """
    SELECT 
        c.customer_id,
        COUNT(DISTINCT s.invoice_no) as frequency,
        SUM(s.total_amount) as total_spent,
        SUM(s.quantity) as total_items
    FROM Sales_Fact s
    JOIN Customer_Dim c ON s.customer_key = c.customer_key
    GROUP BY c.customer_id
    """
    df = pd.read_sql(query, engine)
    if df.empty:
        return {"error": "No data found"}
        
    df['is_loyal'] = (df['frequency'] > 2).astype(int)
    
    X = df[['total_spent', 'total_items']]
    y = df['is_loyal']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
    
    # Decision Tree
    dt = DecisionTreeClassifier(random_state=42)
    dt.fit(X_train, y_train)
    dt_preds = dt.predict(X_test)
    
    # Naive Bayes
    nb = GaussianNB()
    nb.fit(X_train, y_train)
    nb_preds = nb.predict(X_test)
    
    def get_metrics(y_true, y_pred):
        return {
            "accuracy": float(accuracy_score(y_true, y_pred)),
            "precision": float(precision_score(y_true, y_pred, zero_division=0)),
            "recall": float(recall_score(y_true, y_pred, zero_division=0)),
            "f1_score": float(f1_score(y_true, y_pred, zero_division=0)),
            "confusion_matrix": confusion_matrix(y_true, y_pred).tolist()
        }
        
    return {
        "decision_tree": get_metrics(y_test, dt_preds),
        "naive_bayes": get_metrics(y_test, nb_preds)
    }
