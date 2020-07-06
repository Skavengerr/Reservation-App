import * as Actions from '../actions/reservation'

const initialState = {
    checkoutDate: '',
    checkinDate: '',
    location: {},
    city: ''
}

const reservation = function (state = initialState, action) {
    switch (action.type) {
        case Actions.SET_DATES: {
            return {
                ...state,
                checkinDate: action.payload.checkinDate,
                checkoutDate: action.payload.checkoutDate
            }
        }
        case Actions.GET_ADDRESS: {
            return {
                ...state,
                location: action.payload.location,
                city: action.payload.city
            }
        }
        default: {
            return state
        }
    }
}

export default reservation
