import { combineReducers, applyMiddleware } from 'redux'
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

const reducers = {
  user: userReducer,
}

const preloadedState = {
  user: [
    {
      text: 'Eat food',
      completed: true,
    },
    {
      text: 'Exercise',
      completed: false,
    },
  ],
}

export default function initializeStore(state) {
  console.log('-------------- store initializeStore -------------')
  console.log(state)

  const store = configureStore({
    reducer: reducers,
    preloadedState: Object.assign(
      {},
      {
        user: userInitialState,
      },
      state
    )
  })

  return store
}
