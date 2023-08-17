import * as React from 'react'
// ** Next Imports
import Link from 'next/link'
import {useRouter} from 'next/router'
import {useSelector} from 'react-redux'
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

import {styled, useTheme} from '@mui/material/styles'

import useMediaQuery from '@mui/material/useMediaQuery'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

//actions
import {loginCall, setErrors} from 'src/store/session'

// ** Hooks
import {useSettings} from 'src/@core/hooks/useSettings'

import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Styled Components
const LoginIllustrationWrapper = styled(Box)(({theme}) => ({
  padding: theme.spacing(20),
  paddingRight: '0 !important',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(10)
  }
}))

const LoginIllustration = styled('img')(({theme}) => ({
  maxWidth: '48rem',
  [theme.breakpoints.down('lg')]: {
    maxWidth: '35rem'
  }
}))

const RightWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  }
}))

const BoxWrapper = styled(Box)(({theme}) => ({
  [theme.breakpoints.down('xl')]: {
    width: '100%'
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}))

const TypographyStyled = styled(Typography)(({theme}) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: {mt: theme.spacing(8)}
}))

const LinkStyled = styled('a')(({theme}) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const defaulValues = {
  username: '',
  password: ''
}

const loginSchema = Yup.object().shape({
  username: Yup.string().required('Nombre es requerido'),
  password: Yup.string().required('Contraseña es requerida')
})

const Form = () => {
  const router = useRouter()
  const {isLoading} = useSelector(state => state.session)

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
    const {username, password} = values
    if (username && password) router.push('/dashboards')
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'

  return (
    <Box className='content-right'>
      {hidden ? null : (
        <Box sx={{flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center'}}>
          <LoginIllustrationWrapper>
            <LoginIllustration
              alt='login-illustration'
              src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
            />
          </LoginIllustrationWrapper>
          <FooterIllustrationsV2 />
        </Box>
      )}
      <RightWrapper>
        <Box
          sx={{
            p: 12,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.paper'
          }}
        >
          <BoxWrapper>
            <Box
              sx={{
                top: 30,
                left: 40,
                display: 'flex',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg
                width={35}
                height={29}
                version='1.1'
                viewBox='0 0 30 23'
                xmlns='http://www.w3.org/2000/svg'
                xmlnsXlink='http://www.w3.org/1999/xlink'
              >
                <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                  <g id='Artboard' transform='translate(-95.000000, -51.000000)'>
                    <g id='logo' transform='translate(95.000000, 50.000000)'>
                      <path
                        id='Combined-Shape'
                        fill={theme.palette.primary.main}
                        d='M30,21.3918362 C30,21.7535219 29.9019196,22.1084381 29.7162004,22.4188007 C29.1490236,23.366632 27.9208668,23.6752135 26.9730355,23.1080366 L26.9730355,23.1080366 L23.714971,21.1584295 C23.1114106,20.7972624 22.7419355,20.1455972 22.7419355,19.4422291 L22.7419355,19.4422291 L22.741,12.7425689 L15,17.1774194 L7.258,12.7425689 L7.25806452,19.4422291 C7.25806452,20.1455972 6.88858935,20.7972624 6.28502902,21.1584295 L3.0269645,23.1080366 C2.07913318,23.6752135 0.850976404,23.366632 0.283799571,22.4188007 C0.0980803893,22.1084381 2.0190442e-15,21.7535219 0,21.3918362 L0,3.58469444 L0.00548573643,3.43543209 L0.00548573643,3.43543209 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 L15,9.19354839 L26.9548759,1.86636639 C27.2693965,1.67359571 27.6311047,1.5715689 28,1.5715689 C29.1045695,1.5715689 30,2.4669994 30,3.5715689 L30,3.5715689 Z'
                      />
                      <polygon
                        id='Rectangle'
                        opacity='0.077704'
                        fill={theme.palette.common.black}
                        points='0 8.58870968 7.25806452 12.7505183 7.25806452 16.8305646'
                      />
                      <polygon
                        id='Rectangle'
                        opacity='0.077704'
                        fill={theme.palette.common.black}
                        points='0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162'
                      />
                      <polygon
                        id='Rectangle'
                        opacity='0.077704'
                        fill={theme.palette.common.black}
                        points='22.7419355 8.58870968 30 12.7417372 30 16.9537453'
                        transform='translate(26.370968, 12.771227) scale(-1, 1) translate(-26.370968, -12.771227) '
                      />
                      <polygon
                        id='Rectangle'
                        opacity='0.077704'
                        fill={theme.palette.common.black}
                        points='22.7419355 8.58870968 30 12.6409734 30 15.2601969'
                        transform='translate(26.370968, 11.924453) scale(-1, 1) translate(-26.370968, -11.924453) '
                      />
                      <path
                        id='Rectangle'
                        fillOpacity='0.15'
                        fill={theme.palette.common.white}
                        d='M3.04512412,1.86636639 L15,9.19354839 L15,9.19354839 L15,17.1774194 L0,8.58649679 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 Z'
                      />
                      <path
                        id='Rectangle'
                        fillOpacity='0.35'
                        fill={theme.palette.common.white}
                        transform='translate(22.500000, 8.588710) scale(-1, 1) translate(-22.500000, -8.588710) '
                        d='M18.0451241,1.86636639 L30,9.19354839 L30,9.19354839 L30,17.1774194 L15,8.58649679 L15,3.5715689 C15,2.4669994 15.8954305,1.5715689 17,1.5715689 C17.3688953,1.5715689 17.7306035,1.67359571 18.0451241,1.86636639 Z'
                      />
                    </g>
                  </g>
                </g>
              </svg>
              <Typography
                variant='h6'
                sx={{
                  ml: 3,
                  lineHeight: 1,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  fontSize: '1.5rem !important'
                }}
              >
                {themeConfig.templateName}
              </Typography>
            </Box>
            <Box sx={{mb: 6}}>
              <TypographyStyled variant='h5'>Bienvenido a {themeConfig.templateName}! 👋🏻</TypographyStyled>
            </Box>
            <form onSubmit={handleSubmit(submitLogin)}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Controller
                      name='username'
                      control={loginControl}
                      rules={{required: true}}
                      render={({field: {value, onChange}}) => (
                        <TextField
                          value={value}
                          onChange={onChange}
                          type='text'
                          label='Cuenta o correo electrónico'
                          error={Boolean(loginErrors.username)}
                        />
                      )}
                    />
                    {loginErrors.username && (
                      <FormHelperText sx={{color: 'error.main'}} id='validation-schema-first-name'>
                        {loginErrors.username.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Controller
                      name='password'
                      control={loginControl}
                      rules={{required: true}}
                      render={({field: {value, onChange}}) => (
                        <TextField
                          label='Contraseña'
                          value={value}
                          id='form-layouts-basic-password'
                          onChange={onChange}
                          type={showPassword ? 'text' : 'password'}
                          aria-describedby='form-layouts-basic-password-helper'
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
                      )}
                    />
                    {loginErrors.password && (
                      <FormHelperText sx={{color: 'error.main'}} id='validation-schema-first-name'>
                        {loginErrors.password.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
              <Box
                sx={{mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between'}}
              >
                <Link passHref href='/pages/auth/forgot-password-v2'>
                  <LinkStyled>Forgot Password?</LinkStyled>
                </Link>
              </Box>
              <Grid item xs={12} sx={{mt: 4}}>
                <Box
                  sx={{
                    gap: 5,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={20} />
                  ) : (
                    <Button
                      fullWidth
                      type='submit'
                      variant='contained'
                      sx={{display: 'flex', justifyContent: 'center'}}
                    >
                      Acceder
                    </Button>
                  )}
                </Box>
              </Grid>
            </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  )
}
export default Form
