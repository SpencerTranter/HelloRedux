import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import axios from 'axios';

const initialState = {
  fetching: false,
  fetched: false,
  users: [],
  error: null
}

const reducer = (state=initialState, action) => {

  switch(action.type) {
    // case 'FETCH_USERS_START': {    THUNK METHOD
    case 'FETCH_USERS_PENDING': {// PROMISE METHOD
      return {
        ...state,
        fetching: true
      };
    }
    // case 'RECIEVE_USERS': {    THUNK METHOD
    case 'FETCH_USERS_FULFILLED': { // PROMISE METHOD
      return {
        ...state,
        fetching: false,
        fetched: true,
        users: action.payload
      };
    }
    // case 'FETCH_USERS_ERROR': {    THUNK METHOD
    case 'FETCH_USERS_REJECTED': {// PROMISE METHOD
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
    }
  }
  return state;
}

const middleware = applyMiddleware(promise(), thunk, logger);

const store = createStore(reducer, middleware);

// PROMISE METHOD

store.dispatch({
  type: 'FETCH_USERS',
  payload: axios.get('http://rest.learncode.academy/api/wstern/users')
})


// THUNK METHOD

// store.dispatch((dispatch) => {
//   dispatch({type: 'FETCH_USERS_START'})
//   axios.get('http://rest.learncode.academy/api/wstern/users') //rapid prototyping, can create whatever collection you want to then freely call
//   .then(res => {
//     dispatch({type: 'RECIEVE_USERS', payload: res.data})
//   })
//   .catch(err => {
//     dispatch({type: 'FETCH_USERS_ERROR', paload: err})
//   });
// });
