import pytest
import json

def test_create_task(client):
    """Test creating a new task"""
    data = {
        'title': 'Test Task',
        'description': 'Test Description',
        'category': 'General'
    }
    response = client.post('/tasks', json=data)
    assert response.status_code == 201
    assert response.json['title'] == 'Test Task'
    assert response.json['status'] == 'pending'
    assert 'id' in response.json

def test_create_task_validation(client):
    """Test creating a task with missing title (validation error)"""
    data = {'description': 'Missing Title'}
    response = client.post('/tasks', json=data)
    assert response.status_code == 400
    assert 'errors' in response.json

def test_get_tasks(client):
    """Test retrieving tasks list"""
    # Create a task first
    client.post('/tasks', json={'title': 'Task 1'})
    client.post('/tasks', json={'title': 'Task 2'})

    response = client.get('/tasks')
    assert response.status_code == 200
    assert len(response.json) >= 2
    assert response.json[0]['title'] == 'Task 1'

def test_update_task(client):
    """Test updating an existing task"""
    # Create
    create_resp = client.post('/tasks', json={'title': 'Original'})
    task_id = create_resp.json['id']

    # Update
    update_data = {
        'title': 'Updated Title',
        'status': 'completed'
    }
    response = client.put(f'/tasks/{task_id}', json=update_data)
    
    assert response.status_code == 200
    assert response.json['title'] == 'Updated Title'
    assert response.json['status'] == 'completed'

def test_delete_task(client):
    """Test deleting a task"""
    create_resp = client.post('/tasks', json={'title': 'To Delete'})
    task_id = create_resp.json['id']

    response = client.delete(f'/tasks/{task_id}')
    assert response.status_code == 200
    
    # Verify deletion
    get_resp = client.get('/tasks')
    ids = [t['id'] for t in get_resp.json]
    assert task_id not in ids

def test_delete_nonexistent_task(client):
    """Test deleting a task that doesn't exist"""
    response = client.delete('/tasks/999')
    assert response.status_code == 404

def test_categorize_task(client):
    """Test AI categorization logic endpoint"""
    # Case 1: Study
    create_resp = client.post('/tasks', json={'title': 'Learn Python', 'description': 'Study hard'})
    task_id = create_resp.json['id']
    
    response = client.post(f'/tasks/{task_id}/categorize')
    assert response.status_code == 200
    assert response.json['category'] == 'Study'

    # Case 2: Work
    create_resp_2 = client.post('/tasks', json={'title': 'Build App'})
    task_id_2 = create_resp_2.json['id']
    
    response_2 = client.post(f'/tasks/{task_id_2}/categorize')
    assert response_2.json['category'] == 'Work'
