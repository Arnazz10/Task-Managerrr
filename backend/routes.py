import logging
from flask import Blueprint, request, jsonify
from .models import db, Task
from .schemas import task_schema, tasks_schema
from .utils import categorize_task

tasks_bp = Blueprint('tasks', __name__)
logger = logging.getLogger(__name__)

@tasks_bp.route('/tasks', methods=['POST'])
def create_task():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No input data provided'}), 400
            
        errors = task_schema.validate(data)
        if errors:
            logger.warning(f"Validation error: {errors}")
            return jsonify({'errors': errors}), 400
        
        new_task = Task(
            title=data['title'],
            description=data.get('description'),
            status=data.get('status', 'pending'),
            category=data.get('category')
        )
        db.session.add(new_task)
        db.session.commit()
        
        logger.info(f"Task created: {new_task.id}")
        return task_schema.jsonify(new_task), 201
    except Exception as e:
        logger.error(f"Error creating task: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@tasks_bp.route('/tasks', methods=['GET'])
def get_tasks():
    try:
        all_tasks = Task.query.all()
        return tasks_schema.jsonify(all_tasks), 200
    except Exception as e:
        logger.error(f"Error fetching tasks: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@tasks_bp.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    try:
        task = Task.query.get_or_404(id)
        data = request.get_json()
        
        errors = task_schema.validate(data, partial=True)
        if errors:
            logger.warning(f"Validation error update task {id}: {errors}")
            return jsonify({'errors': errors}), 400

        if 'title' in data:
            task.title = data['title']
        if 'description' in data:
            task.description = data['description']
        if 'status' in data:
            task.status = data['status']
        if 'category' in data:
            task.category = data['category']

        db.session.commit()
        logger.info(f"Task updated: {id}")
        return task_schema.jsonify(task), 200
    except Exception as e:
        logger.error(f"Error updating task {id}: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@tasks_bp.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    try:
        task = Task.query.get_or_404(id)
        db.session.delete(task)
        db.session.commit()
        logger.info(f"Task deleted: {id}")
        return jsonify({'message': 'Task deleted successfully'}), 200
    except Exception as e:
        logger.error(f"Error deleting task {id}: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@tasks_bp.route('/tasks/<int:id>/categorize', methods=['POST'])
def categorize_task_endpoint(id):
    try:
        task = Task.query.get_or_404(id)
        category = categorize_task(task.title, task.description)
        task.category = category
        db.session.commit()
        logger.info(f"Task categorized: {id} -> {category}")
        return jsonify({'id': task.id, 'category': category}), 200
    except Exception as e:
        logger.error(f"Error categorizing task {id}: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500
