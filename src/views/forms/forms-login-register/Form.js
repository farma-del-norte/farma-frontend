import React, {useEffect, useState} from 'react' // ** Next Imports
import Link from 'next/link'
import Image from 'next/image'
import {useForm, Controller} from 'react-hook-form'
// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import FallbackSpinner from 'src/@core/components/spinner'
import Typography from '@mui/material/Typography'
import Router from 'next/router'
import {useTheme} from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import {LOGIN} from 'src/utils/constants'
import {getUsersLogin} from 'src/store/users/actions'
import {setIsLoading} from 'src/store/users/reducer'
import {closeSnackBar} from 'src/store/notifications'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import {useDispatch, useSelector} from 'react-redux'

//actions

// ** Hooks
import {useSettings} from 'src/@core/hooks/useSettings'

import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {t} from 'i18next'

const defaulValues = {
  email: '',
  password: ''
}

const loginSchema = Yup.object().shape({
  email: Yup.string().email(t('invalid_email')).required(t('email_required')),
  password: Yup.string()
    .min(LOGIN.PASSWORD_MIN_CHARS, t('password_min', {chars: LOGIN.PASSWORD_MIN_CHARS}))
    .required(t('password_required'))
})

const Form = () => {
  const dispatch = useDispatch()
  const {isLoading} = useSelector(state => state.users)
  const {open, message, severity} = useSelector(state => state.notifications)

  const [showPassword, setShowPassword] = React.useState(false)

  const theme = useTheme()
  const {settings} = useSettings()

  const {skin} = settings
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const {
    control: loginControl,
    handleSubmit,
    formState: {errors: loginErrors}
  } = useForm({
    defaultValues: defaulValues,
    resolver: yupResolver(loginSchema)
  })

  const submitLogin = async values => {
    dispatch(setIsLoading(true))
    const response = await dispatch(getUsersLogin(values)),
      payload = response.payload

    if (payload !== t('Error_code')) {
      dispatch(setIsLoading(false))
      Router.push('/dashboards')
    } else {
      dispatch(setIsLoading(false))
    }
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  useEffect(() => {
    const usuarioLocalStorage = localStorage.getItem('im-user')
    if (usuarioLocalStorage) Router.push('/dashboards')
  }, [])

  return (
    <>
      <Box sx={{position: 'absolute', top: '30px', left: '30px'}}>
        <Image src='/images/logos/simiLogo.png' alt='Simi Logo' width={200} height={200} layout='fixed' />
      </Box>
      <Box className='content-center' maxWidth='400px' mx='auto' mt={-20}>
        <form onSubmit={handleSubmit(submitLogin)}>
          <Grid container spacing={3}>
            <Grid item xs={12} mb={10}>
              <Typography variant='h5' align='center' mb={4}>
                {t('Log_in')}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='email'
                  control={loginControl}
                  rules={{required: true}}
                  render={({field: {value, onChange}}) => (
                    <>
                      <TextField value={value} onChange={onChange} type='text' label={t('Email')} />
                      {loginErrors.email && (
                        <Typography variant='caption' color='error'>
                          {loginErrors.email.message}
                        </Typography>
                      )}
                    </>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='password'
                  control={loginControl}
                  rules={{required: true}}
                  render={({field: {value, onChange}}) => (
                    <>
                      <TextField
                        label={t('Password')}
                        value={value}
                        onChange={onChange}
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <IconButton
                                edge='end'
                                onClick={handleShowPassword}
                                aria-label='toggle password visibility'
                              >
                                {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                      {loginErrors.password && (
                        <Typography variant='caption' color='error'>
                          {loginErrors.password.message}
                        </Typography>
                      )}
                    </>
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Box mt={5} display='flex' alignItems='center'>
            <Link passHref href='/forgot-password'>
              <Button variant='outlined' color='secondary' sx={{marginRight: 'auto'}} disabled={isLoading}>
                {t('I_forgot_my_password')}
              </Button>
            </Link>
            {isLoading ? (
              <FallbackSpinner />
            ) : (
              <Button type='submit' variant='contained' sx={{marginLeft: 'auto'}}>
                {t('Sign_in')}
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </>
  )
}
export default Form
