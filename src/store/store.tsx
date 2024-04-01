import { configureStore, combineReducers } from '@reduxjs/toolkit'
import axios from 'axios'

const userInitialState = {}
const LOGOUT = 'LOGOUT'

function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case LOGOUT: {
      // remove session, so set state as null
      return {}
    }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user: userReducer,
});

// call server api to perform logout
// dispatch action to store to remove sessions
export function logout() {
  console.log('----------------- store logout ------------------------------')
  return dispatch => {
    axios.post('/logout')
      .then(res => {
        if (res.status === 200) {
          dispatch({
            type: LOGOUT
          })
        } else {
          console.log('logout failed', res)
        }
      }).catch(err => {
        console.log('logout failed', err)
      })
  }
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

export default function initializeStore(state: any) {
  console.log('-------------- store initializeStore -------------')
  const store = configureStore({
    reducer: rootReducer,
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
