import TextField from '@mui/material/TextField'

export default function TextArea({input, value, onChange, error}) {
  const rows = input.rows ? input.rows : 4
  const label = input.isRequired ? `${input.headerName}* ` : input.headerName
  const defaultValue = input.value || ''

  return (
    <TextField
      label={label}
      value={value}
      defaultValue={defaultValue}
      disabled={input.disabled}
      onChange={onChange}
      type={input.type}
      multiline
      rows={rows}
      error={!!error}
      helperText={error ? error.message : ' '}
    />
  )
}
