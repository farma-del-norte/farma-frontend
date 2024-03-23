import { Grid, FormControl, TextField } from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'

const Performance = props => {
  const { register, setValue } = useFormContext(),
    performance = props.performance

  if (performance) {
    setValue('performance', performance)
  }

  return (
    <Grid item xs={12} md={6} sx={{ marginTop: '6px' }}>
      <FormControl fullWidth>
        <Controller
          name='performance'
          render={() => (
            <TextField
              {...register('performance', {
                required: true
              })}
              label='Rendimiento'
            />
          )}
        />
      </FormControl>
    </Grid>
  )
}

export default Performance