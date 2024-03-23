import { Grid, FormControl, TextField } from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'

const Name = props => {
  const { register, setValue } = useFormContext(),
    name = props.name

  if (name) {
    setValue('name', name)
  }

  return (
    <Grid item xs={12} md={6} sx={{ marginTop: '6px' }}>
      <FormControl fullWidth>
        <Controller
          name='name'
          render={() => (
            <TextField
              {...register('name', {
                required: true
              })}
              label='Material'
            />
          )}
        />
      </FormControl>
    </Grid>
  )
}

export default Name