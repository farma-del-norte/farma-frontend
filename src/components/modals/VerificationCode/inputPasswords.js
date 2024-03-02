import React, { useState } from 'react'
import { Modal, Stack } from '@mui/material'
import { LOGIN_LOCALE } from 'src/utils/constants'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import Alert from '@mui/material/Alert'

const PasswordInputs = ({ open }) => {

  const [showInputs, setShowInputs] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [passwords, setPasswords] = useState({
    password: LOGIN_LOCALE.EMPTY_STRING,
    reWritedPassword: LOGIN_LOCALE.EMPTY_STRING
  })
  const [error, setError] = useState(LOGIN_LOCALE.EMPTY_STRING)

  const handleUpdatePassword = () => {
    if (!verifyPasswords()) return
    const body = {
      email: userData.email,
      code: recoveryCode,
      password: passwords.password
    }
  
    dispatch(updatePassword(body))
    dispatch(setShowConfirmModal(false))
  }
  
  const verifyPasswords = () => {
    if (passwords.password === LOGIN_LOCALE.EMPTY_STRING || passwords.reWritedPassword === LOGIN_LOCALE.EMPTY_STRING) {
      setError(LOGIN_LOCALE.EMPTY_FIELDS)
      return false
    }
  
    if (passwords.password != passwords.reWritedPassword) {
      setError(LOGIN_LOCALE.PASSWORDS_NOT_MATCH)
      return false
    }
  
    setError(LOGIN_LOCALE.EMPTY_STRING)
    return true
  }
  
  const handlePasswordInput = e => {
    if (e.target.id === LOGIN_LOCALE.PASSWORD_ENG) setPasswords({ ...passwords, password: e.target.value })
    if (e.target.id === LOGIN_LOCALE.REWRITED_PASSWORD) setPasswords({ ...passwords, reWritedPassword: e.target.value })
  }
  
    return (
      <>
        <Card>
          <CardHeader title={LOGIN_LOCALE.UPDATE_PASSWORD} titleTypographyProps={{ variant: 'h6' }} />
          <CardContent>
            <Stack spacing={2}>
              ´<InputLabel htmlFor={LOGIN_LOCALE.PASSWORD_ENG}>{LOGIN_LOCALE.ENTER_NEW_PASSWORD}</InputLabel>
              <TextField
                id={LOGIN_LOCALE.PASSWORD_ENG}
                label={LOGIN_LOCALE.PASSWORD}
                variant='outlined'
                onChange={e => handlePasswordInput(e)}
                type={LOGIN_LOCALE.PASSWORD_ENG}
                required
              />
              <InputLabel htmlFor={LOGIN_LOCALE.REWRITED_PASSWORD}>{LOGIN_LOCALE.ENTER_NEW_PASSWORD_AGAIN}</InputLabel>
              <TextField
                id={LOGIN_LOCALE.REWRITED_PASSWORD}
                label={LOGIN_LOCALE.PASSWORD}
                variant='outlined'
                onChange={e => handlePasswordInput(e)}
                type={LOGIN_LOCALE.PASSWORD_ENG}
                required
              />
              <Button variant='contained' onClick={handleUpdatePassword}>
                {LOGIN_LOCALE.UPDATE_PASSWORD}
              </Button>
            </Stack>
            {error && (
              <Alert variant='outlined' sx={{ mt: 3 }} severity='error'>
                {error}
              </Alert>
            )}
          </CardContent>
        </Card>
      </>
    )
  }

  export default PasswordInputs