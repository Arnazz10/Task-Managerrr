import os
import logging
import logging.handlers
from flask import Flask, jsonify, render_template
from .models import db
from .schemas import task_schema
from .routes import tasks_bp
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def create_app():
    app = Flask(__name__)
    
    # Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///tasks.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize extensions
    db.init_app(app)
    from flask_compress import Compress
    Compress(app)

    # Routes
    @app.route('/')
    def index():
        return render_template('index.html')

    # Register blueprints
    app.register_blueprint(tasks_bp)

    # Setup logging
    if not os.path.exists('logs'):
        os.mkdir('logs')
    
    file_handler = logging.handlers.RotatingFileHandler('logs/backend.log', maxBytes=10240, backupCount=10)
    file_handler.setFormatter(logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
    ))
    file_handler.setLevel(logging.INFO)
    
    app.logger.addHandler(file_handler)
    app.logger.setLevel(logging.INFO)
    app.logger.info('AI Task Manager startup')
    
    logger = logging.getLogger(__name__) # Keep module logger if used elsewhere


    # Create tables
    with app.app_context():
        db.create_all()
        logger.info("Database tables created.")

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Resource not found'}), 404

    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({'error': 'Internal server error'}), 500

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)
