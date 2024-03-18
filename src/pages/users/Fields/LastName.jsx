import {Grid, FormControl, TextField, FormHelperText} from '@mui/material'
import {useFormContext, Controller} from 'react-hook-form'

const LastName = props => {
  const {register, setValue, formState: { errors }} = useFormContext(),
    lastName = props.lastname

  if (lastName) {
    setValue('lastname', lastName)
  }

  return (
    <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
      <FormControl fullWidth>
        <Controller
          name='lastname'
          render={() => (
            <TextField
              {...register('lastname', {
                required: true,
                maxLength: {
                  value: 50,
                  message: "Menos de 50 carácteres"
                }
              })}
              label='Apellido'
              color={errors.lastname ? 'error' : ''}
              focused={errors.lastname}
            />
          )}
        />
        {errors.lastname && <FormHelperText error>{errors.lastname.message}</FormHelperText>}
      </FormControl>
    </Grid>
  )
}

export default LastName
