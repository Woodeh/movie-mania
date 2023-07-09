import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


export const mockStore = (initialState = {}) => {
  return createStore(async (state) => state, initialState, applyMiddleware(thunk));
};