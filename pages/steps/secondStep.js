import React, {useState, useEffect, useRef} from 'react'
import {Button, Typography} from '@material-ui/core'
import Stepper from '../../components/Stepper'
import Link from 'next/link'
import {useDispatch, useSelector} from 'react-redux'

import * as Actions from '../../store/actions/reservation'

let autoComplete

const loadScript = (url, callback) => {
    let script = document.createElement('script')
    script.type = 'text/javascript'

    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState === 'loaded' || script.readyState === 'complete') {
                script.onreadystatechange = null
                callback()
            }
        }
    } else {
        script.onload = () => callback()
    }

    script.src = url
    document.getElementsByTagName('head')[0].appendChild(script)
}

function handleScriptLoad(updateQuery, autoCompleteRef, onSubmit) {
    autoComplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current, {
        types: ['(cities)']
    })
    autoComplete.setFields(['address_components', 'formatted_address'])
    autoComplete.addListener('place_changed', () => handlePlaceSelect(updateQuery, onSubmit))
}

async function handlePlaceSelect(updateQuery, onSubmit) {
    const addressObject = autoComplete.getPlace()
    const query = addressObject.formatted_address
    updateQuery(query)
    onSubmit(addressObject.address_components[0].long_name)
}

export default function secondStep() {
    const [query, setQuery] = useState('')
    const autoCompleteRef = useRef(null)
    const dispatch = useDispatch()
    const location = useSelector(state => state.reservation.location)

    const onSubmit = address => {
        dispatch(Actions.getAddress(address))
    }

    useEffect(() => {
        loadScript(
            `https://maps.googleapis.com/maps/api/js?key=AIzaSyB5V4WTa_wazEsEabos23QsoVM8RxKM08A&libraries=places,geometry`,
            () => handleScriptLoad(setQuery, autoCompleteRef, onSubmit)
        )
    }, [])

    return (
        <div className="p-24 flex-col max-w-5xl mt-256 m-auto text-center">
            <Stepper activeStep={1} />
            <Typography variant="body1" className="text-2xl mb-8">
                Select address of checkout
            </Typography>
            <input
                className="max-w-xl search-location-input outline-none m-auto"
                ref={autoCompleteRef}
                onChange={event => setQuery(event.target.value)}
                placeholder="Enter a City"
                value={query}
            />
            <div className="mt-4 text-center">
                <Button className="w-200 mr-10 text-white rounded-8 bg-gray-800" variant="contained">
                    <Link href="/steps/firstStep">Back</Link>
                </Button>
                <Button
                    disabled={!location.lat}
                    variant="contained"
                    className={location.lat ? 'w-200 text-white rounded-8 bg-gray-800' : 'w-200 text-gray rounded-8'}
                >
                    <Link href="/steps/thirdStep">
                        <a>Next</a>
                    </Link>
                </Button>
            </div>
        </div>
    )
}
