import TextField from '@mui/material/TextField'
import {useEffect} from 'react'

const Text = ({input, value, onChange, error}) => {
  const defaultValue = input.value || ''
  const label = input.isRequired ? `${input.headerName}* ` : input.headerName

  useEffect(() => {
    if (input.value) onChange(input.value)
  }, [input.value])

  return (
    <TextField
      label={label}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      disabled={input.disabled}
      type={input.type}
      error={!!error}
      helperText={error ? error.message : ' '}
    />
  )
}

export default Text
