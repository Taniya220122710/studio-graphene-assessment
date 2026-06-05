import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

export const getTasks = async () => {
  return await axios.get(API_URL);
};

export const createTask = async (taskData) => {
  return await axios.post(API_URL, taskData);
};

export const deleteTask = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};

export const toggleTaskStatus = async (id) => {
  return await axios.patch(`${API_URL}/${id}`);
};

export const updateTask = async (id, taskData) => {
  return await axios.put(`${API_URL}/${id}`, taskData);
};