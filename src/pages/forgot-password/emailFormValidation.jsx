import * as Yup from 'yup'
import { showVerificationModal, setVerificationModal, setInputPasswords } from 'src/store/users/reducer'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { LOGIN_LOCALE } from 'src/utils/constants'
import { yupResolver } from '@hookform/resolvers/yup'
import {useForm, Controller} from 'react-hook-form'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import VerifyCodeModal from 'src/components/modals/VerificationCode/verifyCode'

const EmailFormValidation = props => {
  const theme = useTheme(),
    dispatch = useDispatch(),
    imageSource = props.imageSource;
    const defaulValues = {
      email: ''
    }
    const loginSchema = Yup.object().shape({
      email: Yup.string().email(LOGIN_LOCALE.INVALID_EMAIL).required(LOGIN_LOCALE.EMAIL_REQUIRED)
    })
    const { showVerificationModal } = useSelector(state => state.users)

    const BASIC_ERRORS = {
      email: {
        value: '',
        msg: 'El correo electrónico ingresado es una dirección invalida.',
        param: 'email',
        location: 'body'
      }
    }

    const handleCloseModal = () => {
      dispatch(setVerificationModal(false));
      dispatch(setInputPasswords(false));
    }

    const onSendRecoveryNumber = values => {
      const {email} = values
      const errors = []


      if (!email) {
        errors.push(BASIC_ERRORS.email)
        //dispatch(setErrors(errors))
        //return
      } else {
        dispatch(setVerificationModal(true))
      }
    }


    const {
        control: loginControl,
        handleSubmit,
        formState: {errors: loginErrors}
      } = useForm({
        defaultValues: defaulValues,
        resolver: yupResolver(loginSchema)
      })

  return (
    <>
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSendRecoveryNumber)}>
      <FormControl fullWidth>
        <Controller
          name='email'
          control={loginControl}
          rules={{required: true}}
          render={({field: {value, onChange}}) => (
            <>
              <TextField
                value={value}
                onChange={onChange}
                autoFocus
                type='email'
                label={LOGIN_LOCALE.EMAIL}
                sx={{display: 'flex', mb: 2}}
              />
              {loginErrors.email && (
                <Typography variant='caption' color='error' sx={{display: 'flex', mb: 4}}>
                  {loginErrors.email.message}
                </Typography>
              )}
            </>
          )}
        />
      </FormControl>
      <Button fullWidth size='large' type='submit' variant='contained' sx={{mb: 5.25}} onClick={onSendRecoveryNumber}>
        {LOGIN_LOCALE.RESET_LINK}
      </Button>
    </form>
    {
      showVerificationModal && <VerifyCodeModal open={showVerificationModal} email={loginSchema.email} handleClose={handleCloseModal} />
    }
    </>
  )
}

export default EmailFormValidation
