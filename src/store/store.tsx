import { combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { configureStore } from '@reduxjs/toolkit'

const userInitialState = {}
const LOGOUT = 'LOGOUT'

function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case LOGOUT: {
      return {}
    }
    default:
      return state
  }
}

const allReducers = combineReducers({
  userReducer
})

export default function initializeStore(state) {
  const store = configureStore({
    reducer: allReducers,
    preloadedState: Object.assign(
      {},
      {
        user: userInitialState
      },
      state
    ),
  })

  return store
}
