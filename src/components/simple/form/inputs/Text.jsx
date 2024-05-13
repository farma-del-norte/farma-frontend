import TextField from '@mui/material/TextField'

const Text = ({input, value, onChange, error}) => {
  return (
    <TextField
      label={input.label}
      value={value}
      defaultValue={input.value}
      onChange={onChange}
      type={input.type}
      error={!!error}
      helperText={error ? error.message : ' '}
    />
  )
}

export default Text
