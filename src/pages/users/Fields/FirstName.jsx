import {Grid, FormControl, TextField, FormHelperText} from '@mui/material'
import {useFormContext, Controller} from 'react-hook-form'

const FirstName = props => {
  const {register, setValue, formState: { errors } } = useFormContext(),
    FirstName = props.firstname

  if (FirstName) {
    setValue('firstname', FirstName)
  }

  return (
    <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
      <FormControl fullWidth>
        <Controller
          name='firstname'
          render={() => (
            <TextField
              {...register('firstname', {
                required: true,
                maxLength: {
                  value: 50,
                  message: "Menos de 50 carácteres"
                }
              })}
              label='Nombre'
              color={errors.firstname ? 'error' : ''}
              focused={errors.firstname}
            />
          )}
        />
        {errors.firstname && <FormHelperText error>{errors.firstname.message}</FormHelperText>}
      </FormControl>
    </Grid>
  )
}

export default FirstName
