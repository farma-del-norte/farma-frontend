import {Grid, FormControl, TextField} from '@mui/material'
import {useFormContext, Controller} from 'react-hook-form'

const Units = props => {
  const {register, setValue } = useFormContext(),
    units = props.units

  if (units) {
    setValue('units', units)
  }

  return (
    <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
      <FormControl fullWidth>
        <Controller
          name='units'
          render={() => (
            <TextField
              {...register('units', {
                required: true
              })}
              label='Unidades'
            />
          )}
        />
      </FormControl>
    </Grid>
  )
}

export default Units