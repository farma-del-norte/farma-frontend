import React, {useState} from 'react'
import {InputAdornment, IconButton, TextField} from '@mui/material'
import {EyeOutline, EyeOffOutline} from 'mdi-material-ui'
const Password = ({input, value, onChange, error}) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const labelContent = input.headerName + (input.isRequired ? '*' : '')
  return (
    <TextField
      label={labelContent}
      value={value}
      defaultValue={input.value}
      disabled={input.disabled}
      onChange={onChange}
      type={showPassword ? 'text' : 'password'}
      error={!!error}
      helperText={error ? error.message : ' '}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton edge='end' onClick={handleShowPassword} aria-label='toggle password visibility'>
              {showPassword ? <EyeOutline /> : <EyeOffOutline />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  )
}

export default Password
