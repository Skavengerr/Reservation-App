import {createMuiTheme} from '@material-ui/core/styles'

export default createMuiTheme({
    overrides: {
        MuiPickersBasePicker: {
            pickerView: {
                margin: 'auto'
            }
        }
    }
})
