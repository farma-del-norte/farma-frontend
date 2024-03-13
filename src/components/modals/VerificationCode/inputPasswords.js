import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Stack } from '@mui/material'
import { useDispatch } from 'react-redux'
import { updatePassword } from 'src/store/users/actions'
import { setVerificationModal, setInputPasswords } from 'src/store/users/reducer'
import { t } from 'i18next'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import Alert from '@mui/material/Alert'

const PasswordInputs = ({email, code}) => {
  const dispatch = useDispatch(),
    router = useRouter(),
    [passwords, setPasswords] = useState({
      password: t('empty_string'),
      reWritedPassword: t('empty_string')
    }),
    [error, setError] = useState(t('empty_string')),
    [updated, setUpdated] = useState(t('empty_string')),
    handleUpdatePassword = async () => {
      if (!verifyPasswords()) return
      const body = {
          email: email,
          code: code,
          password: passwords.password
        },
        response = await dispatch(updatePassword(body)),
        payload = response.payload
      if (payload === t('Error_code')) {
        setError(t('Not_updated_password'))
      } else {
        setUpdated(t('Updated_password'))
        dispatch(setVerificationModal(false));
        dispatch(setInputPasswords(false))
        router.replace('/')
      }
    },
    verifyPasswords = () => {
      if (passwords.password === t('empty_string') || passwords.reWritedPassword === t('empty_string')) {
        setError(t('empty_fields'))
        return false
      }

      if (passwords.password != passwords.reWritedPassword) {
        setError(t('Passwords_not_match'))
        return false
      }

      setError(t('empty_string'))
      return true
    },
    handlePasswordInput = e => {
      if (e.target.id === t('Password_eng')) setPasswords({...passwords, password: e.target.value})
      if (e.target.id === t('Re_writed_password')) setPasswords({...passwords, reWritedPassword: e.target.value})
    }

  return (
    <>
      <Card>
        <CardHeader title={t('Password')} titleTypographyProps={{variant: 'h6'}} />
        <CardContent>
          <Stack spacing={2}>
            ´<InputLabel htmlFor={t('Password_eng')}>{t('Enter_new_password')}</InputLabel>
            <TextField
              id={t('Password_eng')}
              label={t('Password')}
              variant='outlined'
              onChange={e => handlePasswordInput(e)}
              type={t('Password_eng')}
              required
            />
            <InputLabel htmlFor={t('Re_writed_password')}>{t('Enter_new_password_again')}</InputLabel>
            <TextField
              id={t('Re_writed_password')}
              label={t('Password')}
              variant='outlined'
              onChange={e => handlePasswordInput(e)}
              type={t('Password_eng')}
              required
            />
            <Button variant='contained' onClick={handleUpdatePassword}>
              {t('Update_password')}
            </Button>
          </Stack>
          {error && (
            <Alert variant='outlined' sx={{mt: 3}} severity='error'>
              {error}
            </Alert>
          )}
          {updated && (
            <Alert variant='outlined' sx={{mt: 3}} severity='success'>
              {updated}
            </Alert>
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default PasswordInputs
