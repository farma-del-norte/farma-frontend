import React from 'react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import InputMask from 'react-input-mask'

const PhoneField = ({input, value, onChange, error}) => {
  const handlePhoneChange = event => {
    onChange(event.target.value)
  }

  return (
    <InputMask mask='99 9999 9999' value={value} onChange={handlePhoneChange}>
      {() => (
        <TextField
          label={input.headerName + (input.isRequired ? '*' : '')}
          value={value}
          onChange={handlePhoneChange}
          error={!!error}
          helperText={error ? error.message : ' '}
          InputProps={{
            startAdornment: <InputAdornment position='start'>+52</InputAdornment>
          }}
        />
      )}
    </InputMask>
  )
}

export default PhoneField
