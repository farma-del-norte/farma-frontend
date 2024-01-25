import React, {useEffect, useState} from 'react' // ** Next Imports
import Link from 'next/link'
import Image from 'next/image'
import {useRouter} from 'next/router'
import {useForm, Controller} from 'react-hook-form'
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'
import {CircularProgress} from '@mui/material'
import Typography from '@mui/material/Typography'
import Router from 'next/router'

import {styled, useTheme} from '@mui/material/styles'

import useMediaQuery from '@mui/material/useMediaQuery'
import {LOGIN_LOCALE} from 'src/utils/constants'
import {getUsersLogin} from 'src/store/users/actions'
import CustomSnackbar from 'src/components/snackbar/CustomSnackbar'
import {closeSnackBar} from 'src/store/notifications'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import {useDispatch, useSelector} from 'react-redux'

//actions
// import {loginCall, setErrors} from 'src/store/session'

// ** Hooks
import {useSettings} from 'src/@core/hooks/useSettings'

import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

const defaulValues = {
  email: '',
  password: ''
}

const loginSchema = Yup.object().shape({
  email: Yup.string().email(LOGIN_LOCALE.INVALID_EMAIL).required(LOGIN_LOCALE.EMAIL_REQUIRED),
  password: Yup.string().min(8, LOGIN_LOCALE.PASSWORD_MIN).required(LOGIN_LOCALE.PASSWORD_REQUIRED)
})

const Form = () => {
  const dispatch = useDispatch()

  // const {isLoading} = useSelector(state => state.session)
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

  const submitLogin = values => {
    dispatch(getUsersLogin(values))
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
                {LOGIN_LOCALE.LOG_IN}
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
                      <TextField value={value} onChange={onChange} type='text' label={LOGIN_LOCALE.EMAIL} />
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
                        label={LOGIN_LOCALE.PASSWORD}
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
            <Link passHref href='/pages/auth/forgot-password-v2'>
              <Button variant='outlined' color='secondary' sx={{marginRight: 'auto'}} disabled={isLoading}>
                {LOGIN_LOCALE.FORGOT_PASSWORD}
              </Button>
            </Link>
            {isLoading ? (
              <CircularProgress size={24} />
            ) : (
              <Button type='submit' variant='contained' sx={{marginLeft: 'auto'}}>
                {LOGIN_LOCALE.SIGN_IN}
              </Button>
            )}
          </Box>
        </form>
        <CustomSnackbar
          open={open}
          message={message}
          severity={severity}
          handleClose={() => dispatch(closeSnackBar())}
        />
      </Box>
    </>
  )
}
export default Form
