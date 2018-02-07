import { applyMiddleware, createStore } from 'redux';

const reducer = (state, action) => {
  if      (action.type === "INC") return state + action.payload;
  else if (action.type === "DEC") return state - action.payload;
  else if (action.type === "ERR") throw new Error('AHHHH!');
  return state;
}

const logger = (store) => (next) => (action) => { // Listens to when actions is fired, if next is not called reducer will not fire

  console.log('action fired', action);
  //action.type = 'DEC'; // Could modify so action is always DEC
  next(action); // Fires reducer after each action

}

const error = (store) => (next) => (action) => { // Tries to fire action, if Error is returned it will not call reducer but console log the error

  try {
    next(action)
  } catch(e) {
    console.log('ERROR!', e);
  }

}

const middleware = applyMiddleware(logger, error);

const store = createStore(reducer, 1, middleware);

store.subscribe(() => { //Listens when reducer is fired and store changes
  console.log('store changed', store.getState());
})

store.dispatch({type: 'INC', payload: 1});
store.dispatch({type: 'INC', payload: 2});
store.dispatch({type: 'INC', payload: 22});
store.dispatch({type: 'DEC', payload: 1000});
store.dispatch({type: 'ERR'});
