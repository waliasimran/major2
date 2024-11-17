// Authentication builds upon Krunal's guide:
// https://appdividend.com/2018/07/18/react-redux-node-mongodb-jwt-authentication/#React_Redux_Node_MongoDB_JWT_Authentication

import axios from 'axios';
// axios is used for making HTTP requests.
import jwtDecode from 'jwt-decode';
// jwtDecode is used to decode JWT tokens.
//JWT stands for JSON Web Token. It's a compact, URL-safe means of representing claims to be transferred between two parties securely. JWTs are commonly used for authentication and information exchange in web applications.
import setAuthToken from '../setAuthToken';
import {
  INDICATE_NO_ERRORS,
  GET_ERRORS,
  SET_CURRENT_USER
} from './actionTypes';

export const registerUser = user => (dispatch) => {
  axios
    .post('/users/signup', user)
    .then((res) => {
      dispatch({
        type: INDICATE_NO_ERRORS,
        payload: {
          success: true
        }
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};


// It makes a POST request to /users/login endpoint with user credentials.
// If the login is successful, it stores the JWT token in local storage, sets it as the authorization token in Axios headers, decodes the token, and dispatches SET_CURRENT_USER action with the decoded user data.
// If there's an error, it dispatches GET_ERRORS action with the error response data.

//If the login is successful, it stores the JWT token in local storage, sets it as the authorization token in Axios headers, decodes the token, and dispatches SET_CURRENT_USER action with the decoded user data.
export const loginUser = user => (dispatch) => {
  axios
    .post('/users/login', user)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//It takes the decoded JWT token as input and returns an action with type SET_CURRENT_USER and payload as the decoded user data.
export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded
});

export const updateCurrentUser = (
  avatarColor,
  bio,
  email,
  name,
  userId,
  showEmail
) => dispatch =>
  axios
    .patch(`/users/${userId}`, { avatarColor, bio, email, name, showEmail })
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => console.log(err));

    //logoutUser is an action creator function that dispatches actions for user logout.
// It removes the JWT token from local storage, removes the authorization token from Axios headers, sets the current user to an empty object, and redirects the user to the login page.

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  window.location.href = '/login';
};
