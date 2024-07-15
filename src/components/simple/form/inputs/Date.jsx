import TextField from '@mui/material/TextField'

const Text = ({input, value, onChange, error}) => {
  const label = input.isRequired ? `${input.headerName}* ` : input.headerName
  const dateValue = value?.split('T')[0] || ''
  const defaultValue = input?.value || ''

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
