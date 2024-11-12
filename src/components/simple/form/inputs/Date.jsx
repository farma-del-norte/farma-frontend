import TextField from '@mui/material/TextField'
import {useEffect, useState} from 'react'

const Text = ({input, value, onChange, error}) => {
  const label = input.isRequired ? `${input.headerName}* ` : input.headerName
  const [dateValue, setDateValue] = useState(value?.split('T')[0] || '')
  const defaultValue = input?.value || ''

  useEffect(() => {
    if (input.value) {
      setDateValue(input.value.split('T')[0])
      onChange(input.value)
    }
  }, [input.value, onChange])

  return (
    <TextField
      type='date'
      label={label}
      InputLabelProps={{shrink: true}}
      disabled={input.disabled}
      value={dateValue}
      defaultValue={defaultValue}
      onChange={onChange}
      error={!!error}
      helperText={error ? error.message : ' '}
    />
  )
}

export default Text
