import pandas as pd
from mlxtend.frequent_patterns import apriori, association_rules
from sqlalchemy import create_engine

import os
DB_URI = os.environ.get("DB_URI")

def market_basket():
    engine = create_engine(DB_URI)
    # Fetch a subset to avoid memory explosion for Apriori
    query = """
    SELECT s.invoice_no, p.description, s.quantity
    FROM Sales_Fact s
    JOIN Product_Dim p ON s.product_key = p.product_key
    LIMIT 50000
    """
    df = pd.read_sql(query, engine)
    if df.empty:
        return {"error": "No data found"}
        
    # Create basket matrix
    basket = (df.groupby(['invoice_no', 'description'])['quantity']
              .sum().unstack().reset_index().fillna(0)
              .set_index('invoice_no'))
    
    # Encode as 0 or 1
    def encode_units(x):
        if x <= 0: return 0
        if x >= 1: return 1
        return 0
    
    # Instead of applymap which is deprecated in newer pandas versions, use map or DataFrame.map
    if hasattr(basket, 'map'):
        basket_sets = basket.map(encode_units)
    else:
        basket_sets = basket.applymap(encode_units)
    
    # Apriori
    frequent_itemsets = apriori(basket_sets, min_support=0.03, use_colnames=True)
    if frequent_itemsets.empty:
        return {"rules": [], "message": "No frequent itemsets found with given support."}
        
    rules = association_rules(frequent_itemsets, metric="lift", min_threshold=1.0)
    
    # Format rules
    formatted_rules = []
    for _, row in rules.head(20).iterrows():
        formatted_rules.append({
            "antecedents": list(row['antecedents']),
            "consequents": list(row['consequents']),
            "support": float(row['support']),
            "confidence": float(row['confidence']),
            "lift": float(row['lift'])
        })
        
    return {"rules": formatted_rules}
