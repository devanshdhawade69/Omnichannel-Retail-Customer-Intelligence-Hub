from flask import Flask, jsonify
from flask_cors import CORS

from models.regression import predict_revenue
from models.clustering import segment_customers
from models.classification import predict_loyalty
from models.association import market_basket

app = Flask(__name__)
CORS(app)

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
    app.run(debug=True, port=5000)
