import axios from 'axios';

export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';

const API_URL = 'https://gorest.co.in/public/v1/users';

// Action to fetch users with pagination
export const fetchUsers = (page = 1) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}`);
    const users = response.data.data;

    // Sort users by ID (smallest ID == latest message)
    users.sort((a, b) => a.id - b.id);

    dispatch({
      type: FETCH_USERS_SUCCESS,
      payload: { users, page },
    });
  } catch (error) {
    dispatch({
      type: FETCH_USERS_ERROR,
      payload: error.message,
    });
  }
};


