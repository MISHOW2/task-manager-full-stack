import axios from 'axios';

const BASE_URL = 'http://localhost:3000/tasks';

// Function to get all tasks

export const  getTasks = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data.data; // Update state with tasks
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return []
  }
};

//Adding new tasks

export const createTask = async (task) =>{
  try {
    const response = await axios.post(BASE_URL, task);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
}

