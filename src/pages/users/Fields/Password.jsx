import {Grid, FormControl, TextField, FormHelperText} from '@mui/material'
import {useFormContext, Controller} from 'react-hook-form'

const Password = ({ isOpen }) => {
  const {
      register,
      setValue,
      getValues,
      formState: {errors}
    } = useFormContext();

    if(isOpen) {
      setValue('password', '')
      setValue('confirmPassword', '')
    }

  return (
    <>
      <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
        <FormControl fullWidth>
          <Controller
            name='password'
            render={() => (
              <TextField
                {...register('password', {
                  required: true,
                  maxLength: {
                    value: 50,
                    message: "Menos de 50 carácteres"
                  },
                  minLength: {
                    value: 6,
                    message: "Más de 6 carácteres" 
                  },
                  validate: (value) =>
                    value === getValues("confirmPassword") || "Contraseñas no coinciden",
                })}
                label='Contraseña'
                color={errors.password ? 'error' : ''}
                focused={errors.password}
              />
            )}
          />
          {errors.password && <FormHelperText error>{errors.password.message}</FormHelperText>}
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
        <FormControl fullWidth>
          <Controller
            name='confirmPassword'
            render={() => (
              <TextField
                {...register('confirmPassword', {
                  required: true,
                  maxLength: {
                    value: 50,
                    message: "Menos de 50 carácteres"
                  },
                  minLength: {
                    value: 6,
                    message: "Más de 6 carácteres"
                  },
                  validate: (value) =>
                    value === getValues("password") || "Contraseñas no coinciden",
                })}
                label='Confirmar Contraseña'
                color={errors.confirmPassword ? 'error' : ''}
                focused={errors.confirmPassword}
              />
            )}
          />
          {errors.confirmPassword && <FormHelperText error>{errors.confirmPassword.message}</FormHelperText>}
        </FormControl>
      </Grid>
    </>
  )
}

export default Password
