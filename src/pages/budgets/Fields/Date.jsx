import {Grid, FormControl} from '@mui/material'
import {useFormContext, Controller} from 'react-hook-form'
import {LocalizationProvider, DatePicker} from '@mui/x-date-pickers'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
const dayjs = require("dayjs");

const Date = (props) => {
  const {setValue} = useFormContext(),
  strDate = props.assignmentDate,
  currentDate = strDate ? strDate.substring(0,10) : '',
  date = currentDate ? currentDate : '';

  if(currentDate) {
    setValue('assignmentDate', currentDate)
  }

  return (
    <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
      <FormControl fullWidth>
        <Controller
          name='assignmentDate'
          render={({field}) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Fecha'
                onChange={(date) => field.onChange(date.format('YYYY-MM-DD')) }
                selected={field.value || dayjs(date)}
                defaultValue={dayjs(date)}
              />
            </LocalizationProvider>
          )}
        />
      </FormControl>
    </Grid>
  )
}

export default Date