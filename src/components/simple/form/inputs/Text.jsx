import TextField from '@mui/material/TextField'

const Text = ({input, value, onChange, error}) => {
  const defaultValue = input.value || value || ''
  return (
    <TextField
      label={input.headerName}
      value={defaultValue}
      onChange={onChange}
      type={input.type}
      error={!!error}
      helperText={error ? error.message : ' '}
    />
  )
}

export default Text
