import os
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

from models.regression import predict_revenue
from models.clustering import segment_customers
from models.classification import predict_loyalty
from models.association import market_basket

from models.ecommerce import db
from routes.ecommerce_routes import ecommerce_bp

app = Flask(__name__)
CORS(app)

# Database Configuration
db_uri = os.environ.get("DB_URI", "sqlite:///ecommerce.db")
app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Register E-Commerce API Routes
app.register_blueprint(ecommerce_bp, url_prefix='/api/ecommerce')

# Data Mining API Routes
@app.route('/api/predict-revenue', methods=['GET'])
def api_predict_revenue():
    try:
        data = predict_revenue()
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/segment-customers', methods=['GET'])
def api_segment_customers():
    try:
        data = segment_customers()
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/predict-loyalty', methods=['GET'])
def api_predict_loyalty():
    try:
        data = predict_loyalty()
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/market-basket', methods=['GET'])
def api_market_basket():
    try:
        data = market_basket()
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    with app.app_context():
        # Create all tables (Operational DB)
        db.create_all()
    app.run(debug=True, port=5000)
