import React from 'react'
import TextField from '@mui/material/TextField'

const EmailField = ({input, value, onChange, error}) => {
  const labelContent = input.headerName + (input.isRequired ? '*' : '')
  return (
    <TextField
      label={labelContent}
      value={value}
      defaultValue={input.value}
      onChange={onChange}
      type={input.type}
      error={!!error}
      helperText={error ? error.message : ' '}
    />
  )
}

export default EmailField
