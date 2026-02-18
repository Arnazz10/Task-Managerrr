export const API_BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';

export const api = {
  fetchTasks: async () => {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return response.json();
  },

  createTask: async (taskData) => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) throw new Error('Failed to create task');
    return response.json();
  },

  updateTask: async (id, taskData) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) throw new Error('Failed to update task');
    return response.json();
  },

  deleteTask: async (id) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete task');
    return response.json();
  },

  categorizeTask: async (id) => {
    // Note: implementation requirement was POST /tasks/<id>/categorize
    const response = await fetch(`${API_BASE_URL}/tasks/${id}/categorize`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to categorize task');
    return response.json();
  }
};
