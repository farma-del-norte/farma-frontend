import {Grid, FormControl, TextField, InputAdornment} from '@mui/material'
import {useFormContext, Controller} from 'react-hook-form'
import {LocalizationProvider, DatePicker} from '@mui/x-date-pickers'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
const dayjs = require("dayjs");

const Date = () => {
  const {control, register} = useFormContext();

  return (
    <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
      <FormControl fullWidth>
        <Controller
          name='currentDate'
          render={({field}) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Fecha'
                onChange={(date) =>  field.onChange(date.format('DD/MM/YYYY')) }
                selected={field.value}
              />
            </LocalizationProvider>
          )}
        />
      </FormControl>
    </Grid>
  )
}

export default Date
