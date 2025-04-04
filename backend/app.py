from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from config import Config
from models.item import db, Item


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize extensions
    db.init_app(app)
    CORS(app)
    
    # Create database tables
    with app.app_context():
        db.create_all()
    
    # Register blueprints
    from routes.items import items_bp
    app.register_blueprint(items_bp, url_prefix='/api')
    
    @app.route('/api/health')
    def health_check():
        return jsonify({"status": "ok"})
    
    @app.route('/')
    def index():
        return jsonify({"message": "Welcome to the Flask API"})
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)