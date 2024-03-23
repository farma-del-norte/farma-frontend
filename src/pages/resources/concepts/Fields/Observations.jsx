import { Grid, FormControl, TextField } from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'

const Observations = props => {
  const { register, setValue } = useFormContext(),
    observations = props.observations

  if (observations) {
    setValue('observations', observations)
  }

  return (
    <Grid item xs={12} md={6} sx={{ marginTop: '6px' }}>
      <FormControl fullWidth>
        <Controller
          name='observations'
          render={() => (
            <TextField
              {...register('observations', {
                required: true
              })}
              label='Observations'
            />
          )}
        />
      </FormControl>
    </Grid>
  )
}

export default Observations


























