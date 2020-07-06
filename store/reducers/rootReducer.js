import reservation from './reservation'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    reservation: reservation
})

export default rootReducer
