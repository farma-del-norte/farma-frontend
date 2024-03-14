import {useDispatch} from 'react-redux'
import {useTheme} from '@mui/material/styles'
import {useSettings} from 'src/@core/hooks/useSettings'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import BackToLogin from './backToLogin'
import InformationText from './informationText'
import PasswordIlustration from './passwordIlustration'
import EmailFormValidation from './emailFormValidation'
import {RightWrapper, BoxWrapper, mainBoxStyling, boxWrapperStyling} from '../../utils/styles'
import {t} from 'i18next'

const ForgotPassword = () => {
  const theme = useTheme(),
    dispatch = useDispatch(),
    hidden = useMediaQuery(theme.breakpoints.down('md')),
    {settings} = useSettings(),
    {skin} = settings,
    imageSource =
      skin === 'bordered' ? 'auth-v2-forgot-password-illustration-bordered' : 'auth-v2-forgot-password-illustration'

  return (
    <>
      <Box className='content-right'>
        {!hidden ? <PasswordIlustration hidden={hidden} imageSource={imageSource} /> : null}
        <RightWrapper sx={skin === 'bordered' && !hidden ? {borderLeft: `1px solid ${theme.palette.divider}`} : {}}>
          <Box sx={mainBoxStyling}>
            <BoxWrapper>
              <InformationText forgetPassword={t('Do_you_forget_password')} resetPassword={t('Reset_password')} />
              {<EmailFormValidation />}
              <BackToLogin loginText={t('Back_login')} />
            </BoxWrapper>
          </Box>
        </RightWrapper>
      </Box>
    </>
  )
}
ForgotPassword.getLayout = page => <BlankLayout>{page}</BlankLayout>
ForgotPassword.guestGuard = true

export default ForgotPassword
