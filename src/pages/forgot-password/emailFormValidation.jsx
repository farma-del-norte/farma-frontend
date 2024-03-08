import * as Yup from 'yup'
import { getVerificationCode } from 'src/store/users/actions'
import { setVerificationModal, setInputPasswords } from 'src/store/users/reducer'
import { useSelector, useDispatch } from 'react-redux'
import { LOGIN_LOCALE } from 'src/utils/constants'
import { yupResolver } from '@hookform/resolvers/yup'
import {useForm, Controller} from 'react-hook-form'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import VerifyCodeModal from 'src/components/modals/VerificationCode/verifyCode'
var currentEmail;

const EmailFormValidation = props => {
    const dispatch = useDispatch(),
    defaulValues = {
      email: LOGIN_LOCALE.EMPTY_STRING,
    },
    loginSchema = Yup.object().shape({
      email: Yup.string().email(LOGIN_LOCALE.INVALID_EMAIL).required(LOGIN_LOCALE.EMAIL_REQUIRED)
    }),
    { showVerificationModal } = useSelector(state => state.users),
    {
      control,
      handleSubmit,
      formState: {errors: loginErrors}
    } = useForm({
      defaultValues: defaulValues,
      resolver: yupResolver(loginSchema)
    }),
    handleCloseModal = () => {
      dispatch(setVerificationModal(false));
      dispatch(setInputPasswords(false));
    }, 
    onSendRecoveryNumber = async values => {
      const {email} = values
      if (!email) {
        return
      } else {
        currentEmail = email;
        let body = {
          email: email
        },
        response = await dispatch(getVerificationCode(body)),
        payload = response.payload;
        if(payload !== LOGIN_LOCALE.ERROR_CODE) {
          dispatch(setVerificationModal(true))
        }
      }
    };

  return (
    <>
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSendRecoveryNumber)}>
      <FormControl fullWidth>
        <Controller
          name={LOGIN_LOCALE.EMAIL_ENG}
          control={control}
          rules={{required: true}}
          render={({field: {value, onChange}}) => (
            <>
              <TextField
                value={value}
                onChange={onChange}
                autoFocus
                type={LOGIN_LOCALE.EMAIL_ENG}
                label={LOGIN_LOCALE.EMAIL}
                sx={{display: 'flex', mb: 2}}
              />
              {loginErrors.email && (
                <Typography variant='caption' color={LOGIN_LOCALE.ERROR_CODE} sx={{display: 'flex', mb: 4}}>
                  {loginErrors.email.message}
                </Typography>
              )}
            </>
          )}
        />
      </FormControl>
      <Button fullWidth size='large' type='submit' variant='contained' sx={{mb: 5.25}} onClick={handleSubmit(onSendRecoveryNumber)}>
        {LOGIN_LOCALE.RESET_LINK}
      </Button>
    </form>
    {
      showVerificationModal && <VerifyCodeModal open={showVerificationModal} email={currentEmail} handleClose={handleCloseModal} />
    }
    </>
  )
}

export default EmailFormValidation
