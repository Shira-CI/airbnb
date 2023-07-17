import { storageService } from '../services/storage.service'
export const SET_STAYS = 'SET_STAYS'
export const REMOVE_STAY = 'REMOVE_STAY'
export const ADD_STAY = 'ADD_STAY'
export const UPDATE_STAY = 'UPDATE_STAY'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const REQUEST_STAYS = 'REQUEST_STAYS'
export const SET_STAY_ID = 'SET_STAY_ID'
export const SET_FOOTER_DISPLAY = 'SET_FOOTER_DISPLAY'
// export const UNDO_REMOVE_STAY = 'UNDO_REMOVE_STAY'

const initialState = {
  stays: [],
  isLoading: false,
  stayId: null,
  isFooterShown: true
  // lastRemovedStay: null
}

export function stayReducer(state = initialState, action) {
  let stays
  // let shoppingStayt

  switch (action.type) {
    // Stays
    case SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading }
    case REQUEST_STAYS:
      const staysFromCache = storageService.loadFromStorage('stays')
      if (staysFromCache) {
        return { ...state, stays: staysFromCache, isLoading: false }
      }
      if (stays && stays.length) {
        return { ...state, stays, isLoading: false }
      }
      return { ...state, isLoading: true }

    case SET_STAYS:
      storageService.saveToStorage('stays', action.stays)
      return { ...state, stays: action.stays }

    case REMOVE_STAY:
      stays = state.stays.filter(s => s._id !== action.stayId)
      return { ...state, stays }

    case ADD_STAY:
      stays = [...state.stays, action.stay]
      return { ...state, stays }

    case UPDATE_STAY:
      stays = state.stays.map(stay =>
        stay._id === action.stay._id ? action.stay : stay
      )
      return { ...state, stays }

    case SET_STAY_ID:
      return { ...state, stayId: action.stayId }

    case SET_FOOTER_DISPLAY:
      return { ...state, isFooterShown: action.val }

    default:
      return state
  }
}










