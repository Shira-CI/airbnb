import { combineReducers, legacy_createStore as createStore } from 'redux'

import { stayReducer } from './stay.reducer.js'
import { userReducer } from './user.reducer.js'
// import { reviewReducer } from './review.reducer'

const rootReducer = combineReducers({
    stayModule: stayReducer,
    userModule: userReducer,
    // reviewModule: reviewReducer,
})


// const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
// export const store = createStore(rootReducer, middleware)
export const store = createStore(rootReducer)


store.subscribe(() => {
    // console.log('**** Store state changed: ****')
    // console.log('storeState:\n', store.getState())
    // console.log('*******************************')
})



