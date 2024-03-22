import { Grid, FormControl, TextField } from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'

const Obligation = props => {
  const { register, setValue } = useFormContext(),
    obligation = props.obligation

  if (obligation) {
    setValue('obligation', obligation)
  }

  return (
    <Grid item xs={12} md={6} sx={{ marginTop: '6px' }}>
      <FormControl fullWidth>
        <Controller
          name='obligation'
          render={() => (
            <TextField
              {...register('obligation', {
                required: true
              })}
              label='Obligacion'
            />
          )}
        />
      </FormControl>
    </Grid>
  )
}

export default Obligation