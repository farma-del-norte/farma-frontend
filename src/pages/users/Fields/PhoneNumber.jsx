import {Grid, FormControl, TextField, FormHelperText} from '@mui/material'
import {useFormContext, Controller} from 'react-hook-form'

const PhoneNumber = props => {
  const {register, setValue, formState: { errors } } = useFormContext(),
    phone = props.phone

  if (phone) {
    setValue('phone', phone)
  }

  return (
    <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
      <FormControl fullWidth>
        <Controller
          name='phone'
          render={() => (
            <TextField
              {...register('phone', {
                required: true,
                pattern: {
                  value: /^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                  message: 'Formato Incorrecto'
                }
              })}
              label='Telefono'
              color={errors.phone ? 'error' : ''}
              focused={errors.phone}
            />
          )}
        />
        {errors.phone && <FormHelperText error>{errors.phone.message}</FormHelperText>}
      </FormControl>
    </Grid>
  )
}

export default PhoneNumber
