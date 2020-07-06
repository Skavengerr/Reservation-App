import axios from 'axios'

export const GET_ADDRESS = 'GET_ADDRESS'
export const SET_DATES = 'SET_DATES'

/**
 * set dates of reservation
 */
export function setDates(dates) {
    return function action(dispatch) {
        return dispatch({
            type: SET_DATES,
            payload: dates
        })
    }
}

/**
 * set address and get lat & lng
 */
export function getAddress(city) {
    return function action(dispatch) {
        axios
            .get(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyB5V4WTa_wazEsEabos23QsoVM8RxKM08A`
            )
            .then(response => {
                const address = {
                    location: response.data.results[0].geometry.location,
                    city: city
                }
                return dispatch({
                    type: GET_ADDRESS,
                    payload: address
                })
            })
    }
}
