const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function fetchData(endpoint: string) {
  const response = await fetch(`${API_URL}/${endpoint}`);
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  return response.json();
}

export async function postData(endpoint: string, data: any) {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  return response.json();
}

export async function updateData(endpoint: string, data: any) {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  return response.json();
}

export async function deleteData(endpoint: string) {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  return response.json();
}