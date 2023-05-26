import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import ListReducer from './reducers/ListReducer'

const Store = createStore(ListReducer, applyMiddleware(thunk))

export default Store
