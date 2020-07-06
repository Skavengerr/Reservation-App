import React, {useState} from 'react'
import GoogleMapReact from 'google-map-react'
import {useSelector} from 'react-redux'
import {format} from 'date-fns'

import Stepper from '../../components/Stepper'

const Marker = props => (
    <>
        <div
            style={{
                border: '5px solid red',
                borderRadius: 20,
                height: 20,
                width: 20
            }}
        />
        {props.show && (
            <div
                style={{
                    background: 'snow',
                    height: 100,
                    width: 255,
                    borderRadius: 16,
                    padding: 8,
                    fontSize: 14
                }}
                className="bg-yellow-lightest h-xs w-xs rounded-8 shadow-1"
            >
                <p className="w-full">Checkin: {format(props.checkinDate, 'MMMM d yyyy, h:mm:ss a')},</p>
                <p className="w-full my-2">Checkout: {format(props.checkoutDate, 'MMMM d yyyy, h:mm:ss a')},</p>
                <p className="w-full">City: {props.location.city},</p>
                <p className="w-full mt-2">Coords: {props.location.location.lat}, {props.location.location.lng}</p>
            </div>
        )}
    </>
)

function ThirdStep() {
    const [show, setShow] = useState(false)
    const location = useSelector(state => state.reservation.location)
    const city = useSelector(state => state.reservation.city)
    const checkoutDate = useSelector(state => state.reservation.checkoutDate)
    const checkinDate = useSelector(state => state.reservation.checkinDate)

    const center = {
        lat: location.lat,
        lng: location.lng
    }

    return (
        <div className="p-24 mt-256 max-w-6xl m-auto">
            <Stepper activeStep={2} />
            {location.lat && (
                <div style={{height: '60vh', width: '100%', marginTop: 'auto'}}>
                    <GoogleMapReact
                        bootstrapURLKeys={{key: 'AIzaSyB5V4WTa_wazEsEabos23QsoVM8RxKM08A'}}
                        defaultCenter={center}
                        defaultZoom={10}
                        onChildClick={() => setShow(!show)}
                    >
                        <Marker
                            checkoutDate={checkoutDate}
                            checkinDate={checkinDate}
                            location={{location: location, city: city}}
                            lat={location.lat}
                            lng={location.lng}
                            show={show}
                        />
                    </GoogleMapReact>
                </div>
            )}
        </div>
    )
}

export default ThirdStep
