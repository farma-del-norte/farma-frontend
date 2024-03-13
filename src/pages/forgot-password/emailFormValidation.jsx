import * as Yup from 'yup'
import {getVerificationCode} from 'src/store/users/actions'
import {setVerificationModal, setInputPasswords} from 'src/store/users/reducer'
import {useSelector, useDispatch} from 'react-redux'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm, Controller} from 'react-hook-form'
import { t } from 'i18next'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import VerifyCodeModal from 'src/components/modals/VerificationCode/verifyCode'
var currentEmail

const EmailFormValidation = props => {
  const dispatch = useDispatch(),
    defaulValues = {
      email: ''
    },
    loginSchema = Yup.object().shape({
      email: Yup.string().email(t('invalid_email')).required(t('email_required'))
    }),
    {showVerificationModal} = useSelector(state => state.users),
    {
      control,
      handleSubmit,
      formState: {errors: loginErrors}
    } = useForm({
      defaultValues: defaulValues,
      resolver: yupResolver(loginSchema)
    }),
    handleCloseModal = () => {
      dispatch(setVerificationModal(false))
      dispatch(setInputPasswords(false))
    },
    onSendRecoveryNumber = async values => {
      const {email} = values
      if (!email) {
        return
      } else {
        currentEmail = email
        let body = {
            email: email
          },
          response = await dispatch(getVerificationCode(body)),
          payload = response.payload
        if (payload !== t('Error_code')) {
          dispatch(setVerificationModal(true))
        }
      }
    }

  return (
    <>
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSendRecoveryNumber)}>
        <FormControl fullWidth>
          <Controller
            name={t('Email_eng')}
            control={control}
            rules={{required: true}}
            render={({field: {value, onChange}}) => (
              <>
                <TextField
                  value={value}
                  onChange={onChange}
                  autoFocus
                  type={t('Email_eng')}
                  label={t('Email')}
                  sx={{display: 'flex', mb: 2}}
                />
                {loginErrors.email && (
                  <Typography variant='caption' color={t('Error_code')} sx={{display: 'flex', mb: 4}}>
                    {loginErrors.email.message}
                  </Typography>
                )}
              </>
            )}
          />
        </FormControl>
        <Button
          fullWidth
          size='large'
          type='submit'
          variant='contained'
          sx={{mb: 5.25}}
          onClick={handleSubmit(onSendRecoveryNumber)}
        >
          {t('Reset_link')}
        </Button>
      </form>
      {showVerificationModal && (
        <VerifyCodeModal open={showVerificationModal} email={currentEmail} handleClose={handleCloseModal} />
      )}
    </>
  )
}

export default EmailFormValidation
