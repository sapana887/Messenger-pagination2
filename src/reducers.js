import { FETCH_USERS_SUCCESS, FETCH_USERS_ERROR } from './actions';

const initialState = {
  users: [], // List of users (paginated)
  error: null,
  page: 1, // Current page for pagination
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: [...action.payload.users.reverse(), ...state.users], // Append new users at the top
        page: action.payload.page,
        error: null,
      };
    case FETCH_USERS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;

// const messageReducer = (state = { messages: [], loading: false }, action) => {
//   switch (action.type) {
//       case 'FETCH_MESSAGES_REQUEST':
//           return { ...state, loading: true };
//       case 'FETCH_MESSAGES_SUCCESS':
//           return {
//               ...state,
//               loading: false,
//               messages: [...state.messages, ...action.payload], // Append new messages
//           };
//       case 'FETCH_MESSAGES_FAILURE':
//           return { ...state, loading: false };
//       default:
//           return state;
//   }
// };

// export default messageReducer;

