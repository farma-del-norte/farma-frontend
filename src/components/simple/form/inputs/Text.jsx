import TextField from '@mui/material/TextField'

const Text = ({input, value, onChange, error}) => {
  const defaultValue = input.value || ''
  const label = input.isRequired ? `${input.headerName}* ` : input.headerName

  return (
    <TextField
      label={label}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      type={input.type}
      error={!!error}
      helperText={error ? error.message : ' '}
    />
  )
}

export default Text
