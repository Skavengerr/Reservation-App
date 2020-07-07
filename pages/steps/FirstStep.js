import React, {useState} from 'react'
import {Typography, Button} from '@material-ui/core'
import DatePicker from 'react-datepicker'
import {Formik, Form} from 'formik'
import {useDispatch} from 'react-redux'
import {useRouter} from 'next/router'
// import * as Yup from 'yup'

import Stepper from '../../components/Stepper'
import * as Actions from '../../store/actions/reservation'

// const DateSchema = Yup.object().shape({
//     checkoutDate: date().min(new Date()).required(),
//     checkinDate: date().min(new Date()).required()
// })

function FirstStep() {
    const router = useRouter()
    const dispatch = useDispatch()
    const dateNow = new Date()
    const [flag, setFlag] = useState(false)

    const minTime = dateNow.setHours(dateNow.getHours())
    const maxTime = dateNow.setHours(dateNow.getHours() + 2)

    return (
        <Formik
            initialValues={{checkinDate: new Date(), checkoutDate: dateNow.setDate(dateNow.getDate() + 1)}}
            // validationSchema={DateSchema}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    setSubmitting(false)
                    dispatch(Actions.setDates(values))
                    if (flag) {
                        router.push({
                            pathname: '/steps/secondStep'
                        })
                    }
                }, 400)
            }}
        >
            {({isSubmitting, values, setFieldValue}) => (
                <div className="p-24 mt-256 max-w-5xl m-auto">
                    <Stepper activeStep={0} />
                    <Form>
                        <div className="justify-between flex">
                            <div>
                                <Typography className="text-center mb-6" variant="h5">
                                    Select time of checkin
                                </Typography>
                                <DatePicker
                                    showTimeSelect
                                    selected={values.checkinDate}
                                    name="checkinDate"
                                    onChange={date => {
                                        setFieldValue('checkinDate', date)
                                    }}
                                    minDate={dateNow}
                                    maxDate={maxTime}
                                    minTime={minTime}
                                    maxTime={maxTime}
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                />
                            </div>
                            <div>
                                <Typography className="text-center mb-6" variant="h5">
                                    Select time of checkout
                                </Typography>
                                <DatePicker
                                    selected={values.checkoutDate}
                                    name="checkoutDate"
                                    onChange={date => {
                                        setFlag(true)
                                        setFieldValue('checkoutDate', date)
                                    }}
                                    showTimeSelect
                                    minDate={dateNow}
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                />
                            </div>
                        </div>
                        <div className="w-full text-center">
                            <Button
                                disabled={!isSubmitting && !flag}
                                type="submit"
                                variant="contained"
                                className={
                                    flag && !isSubmitting
                                        ? 'w-200 mt-10 text-white rounded-8 bg-gray-800'
                                        : 'w-200 mt-10 text-white rounded-8'
                                }
                            >
                                Next
                            </Button>
                        </div>
                    </Form>
                </div>
            )}
        </Formik>
    )
}

export default FirstStep
