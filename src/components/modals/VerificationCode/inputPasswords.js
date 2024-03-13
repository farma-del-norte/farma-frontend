import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Stack } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword } from 'src/store/users/actions'
import { setVerificationModal, setInputPasswords } from 'src/store/users/reducer'
import { modalContentStyle } from './styles'
import { Modal } from '@mui/material'
import { t } from 'i18next'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import Alert from '@mui/material/Alert'


const PasswordInputs = ({ email, code, openModal }) => {
    const dispatch = useDispatch(),
    router = useRouter(),
    [passwords, setPasswords] = useState({
      password: t('Empty_string'),
      reWritedPassword: t('Empty_string')
    }),
    [error, setError] = useState(t('Empty_string')),
    [updated, setUpdated] = useState(t('Empty_string')),
    handleUpdatePassword = async () => {
      if (!verifyPasswords()) return
      const body = {
        email: email,
        code: code,
        password: passwords.password
      },
        response = await dispatch(updatePassword(body)),
        payload = response.payload;
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
      if (passwords.password === t('Empty_string') || passwords.reWritedPassword === t('Empty_string')) {
        setError(t('Empty_fields'))
        return false
      }

      if (passwords.password != passwords.reWritedPassword) {
        setError(t('Passwords_not_match'))
        return false
      }

      setError(t('Empty_string'))
      return true
    },
    handlePasswordInput = e => {
      if (e.target.id === t('Password_eng')) setPasswords({ ...passwords, password: e.target.value })
      if (e.target.id === t('Re_writed_password')) setPasswords({ ...passwords, reWritedPassword: e.target.value })
    },
    handleCloseModal = () => {
      dispatch(setInputPasswords(false));
      dispatch(setVerificationModal(true));
    };

  return (
    <div>
      <Modal open={openModal} onClose={handleCloseModal}>
        <div style={modalContentStyle}>
          <Card>
            <CardHeader title={t('Update_password')} titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
              <Stack spacing={2}>
                <InputLabel htmlFor={t('Password_eng')}>{t('Enter_new_password')}</InputLabel>
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
                <Alert variant='outlined' sx={{ mt: 3 }} severity='error'>
                  {error}
                </Alert>
              )}
              {updated && (
                <Alert variant='outlined' sx={{ mt: 3 }} severity='success'>
                  {updated}
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </Modal>
    </div>
  )
}

export default PasswordInputs