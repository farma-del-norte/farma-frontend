import {Grid, FormControl, TextField, FormHelperText} from '@mui/material'
import {useFormContext, Controller} from 'react-hook-form'

const Email = props => {
  const {register, setValue, formState: { errors } } = useFormContext(),
    email = props.email

  if (email) {
    setValue('email', email)
  }

  return (
    <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
      <FormControl fullWidth>
        <Controller
          name='email'
          render={() => (
            <TextField
              {...register('email', {
                required: true,
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Formato Inválido'
                }
              })}
              label='Email'
              color={errors.email ? 'error' : ''}
              focused={errors.email}
            />
          )}
        />
        {errors.email && <FormHelperText error>{errors.email.message}</FormHelperText>}
      </FormControl>
    </Grid>
  )
}

export default Email
