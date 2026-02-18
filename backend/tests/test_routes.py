import pytest
import json

def test_get_tasks_empty(client):
    response = client.get('/tasks')
    assert response.status_code == 200
    assert response.json == []

def test_create_task(client):
    data = {
        'title': 'Test Task',
        'description': 'Test Description'
    }
    response = client.post('/tasks', json=data)
    assert response.status_code == 201
    assert response.json['title'] == 'Test Task'
    assert response.json['status'] == 'pending'

def test_create_task_validation_error(client):
    response = client.post('/tasks', json={})
    assert response.status_code == 400

def test_update_task(client):
    # Create a task first
    client.post('/tasks', json={'title': 'Original'})
    
    # Update it
    response = client.put('/tasks/1', json={'title': 'Updated', 'status': 'completed'})
    assert response.status_code == 200
    assert response.json['title'] == 'Updated'
    assert response.json['status'] == 'completed'

def test_delete_task(client):
    client.post('/tasks', json={'title': 'To Delete'})
    response = client.delete('/tasks/1')
    assert response.status_code == 200
    
    response = client.get('/tasks')
    assert response.json == []

def test_categorize_task(client):
    client.post('/tasks', json={'title': 'Buy groceries', 'description': 'Need milk'})
    response = client.post('/tasks/1/categorize')
    assert response.status_code == 200
    assert response.json['category'] == 'Personal'

    # Check persistence
    response = client.get('/tasks')
    assert response.json[0]['category'] == 'Personal'
