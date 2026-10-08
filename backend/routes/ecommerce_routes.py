from flask import Blueprint, jsonify, request
from models.ecommerce import db, User, Product, Category, Order, OrderItem, Payment
from werkzeug.security import generate_password_hash, check_password_hash

ecommerce_bp = Blueprint('ecommerce', __name__)

@ecommerce_bp.route('/products', methods=['GET'])
def get_products():
    category_id = request.args.get('category')
    search = request.args.get('search')
    
    query = Product.query
    if category_id:
        query = query.filter_by(category_id=category_id)
    if search:
        query = query.filter(Product.name.ilike(f'%{search}%'))
        
    products = query.all()
    result = []
    for p in products:
        result.append({
            'id': p.id,
            'stock_code': p.stock_code,
            'name': p.name,
            'price': p.price,
            'image_url': p.image_url,
            'category_id': p.category_id,
            'stock_quantity': p.stock_quantity
        })
    return jsonify(result)

@ecommerce_bp.route('/products/<int:id>', methods=['GET'])
def get_product(id):
    p = Product.query.get_or_404(id)
    return jsonify({
        'id': p.id,
        'stock_code': p.stock_code,
        'name': p.name,
        'description': p.description,
        'price': p.price,
        'image_url': p.image_url,
        'category_id': p.category_id,
        'stock_quantity': p.stock_quantity
    })

@ecommerce_bp.route('/products', methods=['POST'])
def create_product():
    data = request.json
    new_product = Product(
        stock_code=data.get('stock_code', f"SKU-{__import__('uuid').uuid4().hex[:6].upper()}"),
        name=data.get('name'),
        description=data.get('description', ''),
        price=float(data.get('price', 0.0)),
        category_id=data.get('category_id'),
        image_url=data.get('image_url', ''),
        stock_quantity=int(data.get('stock_quantity', 100))
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify({'message': 'Product created successfully', 'id': new_product.id}), 201

@ecommerce_bp.route('/products/<int:id>', methods=['PUT'])
def update_product(id):
    p = Product.query.get_or_404(id)
    data = request.json
    if 'stock_code' in data: p.stock_code = data['stock_code']
    if 'name' in data: p.name = data['name']
    if 'description' in data: p.description = data['description']
    if 'price' in data: p.price = float(data['price'])
    if 'category_id' in data: p.category_id = data['category_id']
    if 'image_url' in data: p.image_url = data['image_url']
    if 'stock_quantity' in data: p.stock_quantity = int(data['stock_quantity'])
    db.session.commit()
    return jsonify({'message': 'Product updated successfully'})

@ecommerce_bp.route('/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    p = Product.query.get_or_404(id)
    db.session.delete(p)
    db.session.commit()
    return jsonify({'message': 'Product deleted successfully'})

@ecommerce_bp.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([{'id': c.id, 'name': c.name, 'description': c.description} for c in categories])

@ecommerce_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already exists'}), 400
        
    hashed_pw = generate_password_hash(data['password'], method='pbkdf2:sha256')
    new_user = User(
        username=data['username'],
        email=data['email'],
        password=hashed_pw,
        role=data.get('role', 'customer')
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully', 'user_id': new_user.id}), 201

@ecommerce_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'error': 'Invalid credentials'}), 401
    
    return jsonify({
        'message': 'Login successful',
        'user': {'id': user.id, 'username': user.username, 'email': user.email, 'role': user.role}
    })

@ecommerce_bp.route('/orders', methods=['POST'])
def create_order():
    data = request.json
    user_id = data.get('user_id')
    items = data.get('items') # list of dicts: {'product_id': 1, 'quantity': 2, 'price': 100}
    payment_method = data.get('payment_method', 'Credit Card')
    
    if not user_id or not items:
        return jsonify({'error': 'Missing user_id or items'}), 400
        
    total_amount = sum(item['price'] * item['quantity'] for item in items)
    
    new_order = Order(user_id=user_id, total_amount=total_amount, status='Completed')
    db.session.add(new_order)
    db.session.commit()
    
    for item in items:
        order_item = OrderItem(
            order_id=new_order.id,
            product_id=item['product_id'],
            quantity=item['quantity'],
            price=item['price']
        )
        db.session.add(order_item)
        
        # update stock
        product = Product.query.get(item['product_id'])
        if product:
            product.stock_quantity -= item['quantity']
            
    # Add payment
    payment = Payment(order_id=new_order.id, amount=total_amount, payment_method=payment_method, status='Completed')
    db.session.add(payment)
    
    db.session.commit()
    return jsonify({'message': 'Order placed successfully', 'order_id': new_order.id}), 201

@ecommerce_bp.route('/orders/user/<int:user_id>', methods=['GET'])
def get_user_orders(user_id):
    orders = Order.query.filter_by(user_id=user_id).order_by(Order.order_date.desc()).all()
    result = []
    for o in orders:
        items = OrderItem.query.filter_by(order_id=o.id).all()
        result.append({
            'id': o.id,
            'order_date': o.order_date,
            'total_amount': o.total_amount,
            'status': o.status,
            'items': [{'product_id': i.product_id, 'quantity': i.quantity, 'price': i.price} for i in items]
        })
    return jsonify(result)
